#!/usr/bin/env bash
# Build the real app from its separate source repository, then vendor its static
# release output so Cloudflare Pages does not need Flutter or GitHub credentials.
set -euo pipefail
landing_root="$(cd "$(dirname "$0")/.." && pwd)"
app_root="$(cd "${1:?Usage: scripts/update-app-demo.sh /path/to/morrow}" && pwd)"
flutter_bin="${FLUTTER_BIN:-flutter}"
if [[ ! -f "$app_root/lib/main_demo.dart" ]]; then
  echo 'The app checkout must contain lib/main_demo.dart.' >&2
  exit 1
fi
if [[ -n "$(git -C "$app_root" status --porcelain -- lib assets web pubspec.yaml pubspec.lock)" ]]; then
  echo 'Commit app source changes before exporting a traceable demo build.' >&2
  exit 1
fi
source_commit="$(git -C "$app_root" rev-parse HEAD)"
(
  cd "$app_root"
  "$flutter_bin" build web --release --target lib/main_demo.dart --base-href /app-demo/ --no-web-resources-cdn --no-wasm-dry-run
)
mkdir -p "$landing_root/public/app-demo"
rsync -a --delete --exclude='*.symbols' --exclude='*.map' "$app_root/build/web/" "$landing_root/public/app-demo/"
"$flutter_bin" --version --machine > "$landing_root/public/app-demo/flutter-version.json"
python3 - "$landing_root/public/app-demo" "$source_commit" <<'PY'
import hashlib, json, pathlib, sys
root = pathlib.Path(sys.argv[1])
required = ['index.html', 'main.dart.js', 'flutter_bootstrap.js', 'demo_bridge.js', 'canvaskit/canvaskit.wasm']
for name in required:
    if not (root / name).is_file():
        raise SystemExit(f'Missing required Flutter output: {name}')
files = [p for p in root.rglob('*') if p.is_file() and p.name != 'provenance.json']
for file in files:
    if file.stat().st_size > 25 * 1024 * 1024:
        raise SystemExit(f'Asset exceeds Cloudflare Pages 25 MiB limit: {file}')
provenance = {
    'repository': 'https://github.com/hiimisaac/morrow',
    'commit': sys.argv[2],
    'entrypoint': 'lib/main_demo.dart',
    'build': 'flutter build web --release --target lib/main_demo.dart --base-href /app-demo/ --no-web-resources-cdn --no-wasm-dry-run',
    'sha256': {p.relative_to(root).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(files)},
}
(root / 'provenance.json').write_text(json.dumps(provenance, indent=2) + '\n')
print(f'Exported the real Morrow app from {sys.argv[2][:7]} ({len(files)} files).')
PY

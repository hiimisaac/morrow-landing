// Only the embedding page on this origin can control the demo.
(() => {
  let connected = false;
  let pending;
  window.morrowDemoEmit = (json) => {
    if (window.parent !== window) window.parent.postMessage(JSON.parse(json), window.location.origin);
  };
  window.morrowDemoConnect = () => {
    connected = true;
    if (pending) { window.morrowDemoReceive(pending); pending = undefined; }
  };
  window.addEventListener('message', (event) => {
    if (event.source !== window.parent || event.origin !== window.location.origin) return;
    const data = event.data;
    if (!data || data.type !== 'morrow-demo:set' ||
        !['pittsburgh', 'seattle', 'santa-fe', 'after-hours'].includes(data.scenario) ||
        !['light', 'dark'].includes(data.appearance) ||
        !Number.isSafeInteger(data.revision) || data.revision < 0) return;
    const json = JSON.stringify(data);
    if (connected) window.morrowDemoReceive(json);
    else pending = json;
  });
})();

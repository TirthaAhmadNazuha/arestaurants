import * as WorkboxWindow from 'workbox-window';

const swRegister = async () => {
  const alertChip = document.querySelector('alert-chip');
  if (!('serviceWorker' in navigator)) {
    alertChip.error = 'Service Worker not Suported in the browser';
    return;
  }

  const wb = new WorkboxWindow.Workbox('./sw.bundle.js');

  try {
    await wb.register();
    alertChip.success = 'Service worker registered';
  } catch (err) {
    alertChip.error = 'Failed to register service worker';
  }
};

export default swRegister;

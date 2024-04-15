import { ElectronHandler, Sas } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: Sas
    // electron: ElectronHandler
  }
}

export {};

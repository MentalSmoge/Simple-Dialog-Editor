// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

// contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('electron', {
  electronHandler,
  showOpenDialog: async (args) => ipcRenderer.invoke('dialog:openFile',  args),
  sendMessage: () => ipcRenderer.send('countdown-start'),
  onSaveFile: (callback) => {ipcRenderer.on('save-file-command', (_event) => callback())
},
  saveFile: (value) => ipcRenderer.send('save-file-value', value),
})

export type ElectronHandler = typeof electronHandler;

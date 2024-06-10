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

contextBridge.exposeInMainWorld('electron', {
  electronHandler,
  showOpenDialog: async (args) => ipcRenderer.invoke('dialog:openFile',  args),
  sendMessage: () => ipcRenderer.send('countdown-start'),
  onSaveFile: (callback) => {ipcRenderer.on('save-file-command', (_event) => callback())},
  onExportFile: (callback) => {ipcRenderer.on('export-file-command', (_event) => callback())},
  onProjectOpen: (callback) => {ipcRenderer.on('PROJECT_OPEN', (_event, args) => callback(args))},
  saveFile: (value) => ipcRenderer.send('save-file-value', value),
  exportFile: (value) => ipcRenderer.send('export-file-value', value),
  onLogin: (value) => ipcRenderer.on('login-command', value),
  onRegister: (value) => ipcRenderer.on('register-command', value),
  getStoreValue: (key) => ipcRenderer.invoke('getStoreValue', key),
  setStoreValue: (key, value) => ipcRenderer.invoke('setStoreValue', key, value),
  deleteStoreValue: (key) => ipcRenderer.invoke('deleteStoreValue', key)
})

export type ElectronHandler = typeof electronHandler;

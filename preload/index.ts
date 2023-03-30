const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  transfer: () => ipcRenderer.invoke("transfer"),
});

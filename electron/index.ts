import { app, BrowserWindow, session, ipcMain, dialog } from "electron";
import path from "path";

import { webProxy, loadVueTools, loadDotEnv } from "./config";


loadDotEnv();


let win: BrowserWindow | null;
//定义全局变量获取 窗口实例
const createWindow = async () => {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.ts"),
    },
  });

  

  // 区分环境
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    win.loadURL(<string>process.env["VITE_DEV_SERVER_URL"]);
    
    win.webContents.openDevTools();
  }
};

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
  });
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}

//在Electron 主进程初始化完毕被触发
app.whenReady().then(async () => {
  ipcMain.handle("transfer", handleFileOpen);

  createWindow();
  // vue 开发工具
  loadVueTools();
  // web代理
  webProxy();
});

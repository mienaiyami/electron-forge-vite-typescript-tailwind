// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { app } from "@electron/remote";
import { contextBridge, ipcRenderer } from "electron";
import fs from "fs";
import path from "path";

const electron = {
    fs,
    path,
    app,
};

declare global {
    interface Window {
        electron: typeof electron;
    }
}
contextBridge.exposeInMainWorld("electron", electron);
// console.log(app);
// document.title = app.getName();

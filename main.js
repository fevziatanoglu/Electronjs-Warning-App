const { app ,  BrowserWindow} = require("electron");
const { path, dirname } = require("path");

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: "Electron Test App",
        width : 800,
        height : 800,
        resizable : false,
        icon: './assets/app-icon.ico' // or 'icon.icns' for macOS
    });

mainWindow.loadFile("index.html");

}

app.whenReady().then(() => createMainWindow());
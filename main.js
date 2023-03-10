// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
// const {loadEnv} = require('vite');
//
// const localEnv = loadEnv(process.env.Project_Entrance, './', '')
const configs = require("./shared/config");
const url = require("url");
let project = {}
if (!process.env.Project_Entrance) {
    project = configs.projects[configs.project]
} else if (configs.projects.hasOwnProperty(process.env.Project_Entrance)) {
    project = configs.projects[process.env.Project_Entrance]
} else {
    project = {}
}


function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        icon: path.join(__dirname, 'resources/icon.png'),
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    if (project.name === 'vue_app') {
        // // and load the index.html of the app.
        // mainWindow.loadFile('./app/vue-app/dist/index.html')
        mainWindow.loadFile(project.connect);

    } else if (project.name === 'remote_odoo') {
        mainWindow.loadURL(project.connect).then(r => console.log("dd"), r => console.log("11"));

    } else if (project.name === 'pure') {
        // mainWindow.loadURL(url.format({
        //     pathname: path.join(__dirname, 'index.html'),
        //     protocol: 'file',
        //     hash: '/',
        //     slashes: false
        // }))
        mainWindow.loadFile(project.connect);

        // console.log(mainWindow.webContents)
    } else {
        mainWindow.loadURL('https://cn.bing.com/');
    }
    mainWindow.setFullScreen(project.setFullScreen);
    // Open the DevTools.
    if (project.openDevTools) {
        mainWindow.webContents.openDevTools()
    }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

function handleSetTitle (event, title) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    // console.log(win,title)
    win.setTitle(title)
}


app.on('ready', function () {
    ipcMain.on('set-title', handleSetTitle)

    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

// app.whenReady().then(() => {
//     createWindow()
//
//     app.on('activate', function () {
//         // On macOS it's common to re-create a window in the app when the
//         // dock icon is clicked and there are no other windows open.
//         if (BrowserWindow.getAllWindows().length === 0) createWindow()
//     })
// })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

// console.log('renderer全局变量process：', process)
// console.log('renderer 全局变量window：', window)
// console.log('renderer 全局变量process：', process)

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
});

const btn = document.getElementById('btn1')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
})

const counter = document.getElementById('counter')

window.addEventListener('DOMContentLoaded', () => {
    window.electronAPI.handleCounter((event, value) => {
        const oldValue = Number(counter.innerText)
        const newValue = oldValue + value
        counter.innerText = newValue
        event.sender.send('counter-value', newValue)
    })
})
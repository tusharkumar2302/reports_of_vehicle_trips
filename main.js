const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'assets', 'icon.ico'),
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('index.html'); // Load your app's UI

    // Arrow key navigation and Enter key handling for inputs
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.executeJavaScript(`
            document.addEventListener('keydown', function(event) {
                const inputs = document.querySelectorAll('input');
                let currentIndex = Array.from(inputs).findIndex(input => input === document.activeElement);

                if (event.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % inputs.length;
                    inputs[currentIndex].focus();
                } else if (event.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + inputs.length) % inputs.length;
                    inputs[currentIndex].focus();
                } else if (event.key === 'ArrowDown') {
                    currentIndex = (currentIndex + 1) % inputs.length;  // Adjust number to match columns
                    inputs[currentIndex].focus();
                } else if (event.key === 'ArrowUp') {
                    currentIndex = (currentIndex - 1 + inputs.length) % inputs.length;  // Adjust number to match columns
                    inputs[currentIndex].focus();
                } else if (event.key === 'Enter') {
                    // When Enter is pressed, move to the next input field
                    currentIndex = (currentIndex + 1) % inputs.length;
                    inputs[currentIndex].focus();
                }
            });
        `);
    });
});

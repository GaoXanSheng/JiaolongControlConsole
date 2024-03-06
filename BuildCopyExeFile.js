const fs = require('fs');
const path = require("node:path");
const {exec} = require("child_process");
const AdmZip = require('adm-zip');

const sourceDir = path.join(__dirname, 'JiaoLongWMI');
const destDir = path.join(__dirname, 'release', '0.0.0', 'win-unpacked', 'resources','JiaoLongWMI');
const delFileDir = path.join(__dirname, 'release', '0.0.0');
const PackPath = path.join(__dirname, 'release', '0.0.0',"win-unpacked");
exec(`xcopy /E /I /Y "${sourceDir}" "${destDir}"`, (error, stdout, stderr) => {
    if (error) console.log(error)
    console.log(stdout)
    console.log(stderr)
})

fs.readdirSync(delFileDir).forEach(file => {
    const filePath = path.join(delFileDir, file);
    console.log(file)
    if (file == "JiaolongControlConsole-Windows-0.0.0-Setup.exe" || file == "JiaolongControlConsole-Windows-0.0.0-Setup.exe.blockmap") {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
    }
});

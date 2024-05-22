const fs = require('fs');
const path = require("node:path");
const {exec} = require("child_process");
const sourceDir = path.join(__dirname, 'JiaoLongWMI');
const destDir = path.join(__dirname, 'release', '0.0.0', 'win-unpacked', 'resources','JiaoLongWMI');
const delFileDir = path.join(__dirname, 'release', '0.0.0');
const PackPath = path.join(__dirname, 'release', '0.0.0',"win-unpacked");
exec(`chcp 65001 && xcopy /E /I /Y "${sourceDir}" "${destDir}"`, (error, stdout, stderr) => {
    if (error) console.log(error)
    console.log(stdout)
    console.log(stderr)
})


import {exec,spawn} from "child_process";
async function KillExe():Promise<boolean> {
    return new Promise((resolve,reject)=>{
        exec('tasklist', (err, stdout, _stderr) => {
            if (err) {
                reject(err)
            }
            // 检查进程列表中是否有 JiaoLongWMI.exe
            if (stdout.toLowerCase().includes('jiaolongwmi.exe')) {
                // 杀死进程
                exec('taskkill /F /IM JiaoLongWMI.exe', (err, _stdout, _stderr) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(true)
                });
            } else {
                resolve(true)
            }
        });
    })

}
async function initWMI(path:string){
    await KillExe()
    const process = spawn(path,[`Socket-9871-localhost`])
    process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {
        console.log(`子进程退出，退出码：${code}`);
    });
}
export default async (path:string)=>{
    // if (app.isPackaged){
        await initWMI(path)
    // }
}


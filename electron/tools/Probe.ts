import * as OS from "os";
import * as si from 'systeminformation'
export default async function () {
    return  {
        cpu: {
            model: OS.cpus()[0].model, cors: OS.cpus().length
        },
        gpu: await si.graphics(),
        battery: await si.battery(),
        system: {
            version: OS.version(),
            release: OS.release(),
            arch: OS.arch()
        },
        bios: await si.bios(),
        ram: {
            mem: await si.mem(),
            memLayout: await si.memLayout()
        },
        disk: await si.diskLayout()
    }
}

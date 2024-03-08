// logger.js
import {ipcMain} from "electron";

class Logger {
    private tempMsg: string[] = []

    constructor() {
        ipcMain.on('custom-event-execCmd', async (event, _args) => {
            setInterval(() => {
                event.sender.send('custom-event-execCmd-callback', this.tempMsg[0]);
                this.tempMsg.shift()
            })
        })
    }

    public info(msg: any) {
        this.tempMsg.push(msg)
    }

}
const logger = new Logger()
export default logger
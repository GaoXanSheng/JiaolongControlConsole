import {app} from "electron";
import path from "node:path";

export default function () {
    if (app.isPackaged) {
        return path.join(app.getAppPath(), '..\\JiaoLongWMI')
    } else {
        return path.join(app.getAppPath(), '\\JiaoLongWMI')
    }
}
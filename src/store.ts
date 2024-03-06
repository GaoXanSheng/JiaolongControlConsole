import {createStore} from 'vuex';
import {IPCRenderer} from "./IPCRenderer";
export enum HomeTab {
    HOME,
    CPU,
    Keyboard,
    PerformaceMode,
    Fan
}

const store = createStore({
    state: {
        IpcRenderer:new IPCRenderer(),
        SwitchPages:HomeTab.HOME,
        HomeTab:{
            SetLogoLight:false
        }
    },
});

export default store;

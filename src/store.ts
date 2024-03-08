import {createStore} from 'vuex';

export enum HomeTab {
    HOME,
    CPU,
    Keyboard,
    PerformaceMode,
    Fan
}

const store = createStore({
    state: {
        SwitchPages:HomeTab.HOME,
        HomeTab:{
            SetLogoLight:false
        }
    },
});

export default store;

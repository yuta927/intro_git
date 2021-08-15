/* eslint-disable import/no-mutable-exports */
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import App from '@/store/app';
import {RootState} from '@/store';



let appStore: App;

const initializeStores = (store: Store<RootState>): void =>{
    appStore = getModule(App, store);
};

export{
    initializeStores,
    appStore
};

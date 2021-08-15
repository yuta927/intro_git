import { ActionTree, Store } from "vuex"; 
import { initializeStores } from "@/utils/store-accessor";
import { AppState } from "@/store/app";



// initializerの作成
const initializer = (store: Store<any>): void => initializeStores(store);

// 最初に処理をさせるよう定義
export const plugins = [initializer];

// appStoreをVueのコンポーネントとして使えるようにする。
export * from '@/utils/store-accessor';

export interface RootState{
    appState: AppState
}

export const actions: ActionTree<AppState, RootState> ={
    // eslint-disable-next-line require-await
    async nuxtServerInit({ commit }):Promise<void>{
        const res = {wine_attribute:[
            {
                "id": 1,
                "japaneseTitle": "酒石酸濃度",
                "englishTitle": "fixed acidly",
                "step": 0.01,
                "minValue": 0,
                "maxValue": 1
            },
            {
                "id": 2,
                "japaneseTitle": "二個目のタイトル",
                "englishTitle": "titleNo2",
                "step": 0.01,
                "minValue": 0,
                "maxValue": 1
            }
    ]}
    this.$axios.$get('/api/wine_attributes');
        if(res.wine_attribute){
            commit('app/SET_WINE_ATTR', res.wine_attribute);
        }
    }

};

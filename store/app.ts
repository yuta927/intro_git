// vuexフレームワークWebapp実装に必要なコンポーネントをインポート。
import { Module, VuexModule, Mutation, Action} from "@/node_modules/vuex-module-decorators";
import { InputValue, Result, WineAttribute} from "@/models";
import axios, {AxiosResponse} from "axios"; 


export interface AppState{
    title: string // pageのタイトル
    wineAttribute: WineAttribute[] // wineの属性のリスト @/modelsに型WineAttribute[](配列)が定義してありそれをimportしてある。
    result: Result // 予測結果を格納するオブジェクト  @/modelsに型Resultが定義してありそれをimportしてある。
}

// ？？？？？@Moduleが分からない？？？？？？
// VuexModuleクラスを継承し、AppStateインターフェースを実装したAppクラスをexportする。
// 受け渡したい情報を格納するクラスAppの初期値を定義し、export。
@Module({stateFactory: true, name: "app", namespaced:true})
export default class App extends VuexModule implements AppState{
    public title :string = '';
    public wineAttribute:WineAttribute[] = [];
    public result : Result = {value:0, comment:'', status:false};

    // Mutationはsetterの役割？？
    @Mutation
    public SET_TITLE(title: string): void{ 
        this.title = title;
    }

    // ワインを評価するための属性(指標、説明変数)を設定する。
    @Mutation
    public SET_WINE_ATTR(wineAttribute : WineAttribute[]): void {
        this.wineAttribute = wineAttribute;
    }


    // ワインを評価するための属性（指標、説明変数）に具体的な値を設定する。
    @Mutation
    public SET_WINE_VALUE(payload : {id: number; value: number}) :void{
        this.wineAttribute[payload.id-1].value = payload.value
    }

    // 入力値や予測値をクリアする
    @Mutation
    public CLEAR() :void{
        this.wineAttribute.forEach((w): void => {
            // text通りだと、wineAttributeの属性valueは削除できない状態なのでエラーが出る。
            // そこで、wineAttributeの属性valueはなくても良い属性であることを明示する。
            delete this.wineAttribute[w.id - 1].value 
        });
        this.result = {value:0, comment:'', status:false};
    }

    // text通りだと、value,statusの型を指定しろと怒られる。
    @Mutation
    public SET_RESULT({value, status}:{value:number, status:boolean}):void{
        this.result.value = value;
        this.result.status = status;
    }

    // Getterで
    // アロー関数の構造がよくわからない
    public get IsAllValueSet(): (() => boolean) {
        return (): boolean => {
            return this.wineAttribute.every((attr): boolean => {return 'value' in attr && attr.value !== 0});
        }
    }

    // eslint-disable-next-line require-await
    @Action({ })
    public async POST_WINE_VALUE(): Promise<void>{
        // inputValuesという変数（型はInputValue）にwineAttributesの属性をセットする。
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const inputValues = this.wineAttribute.map((attr):InputValue => ({id: attr.id, value: attr.value}));

        // inputValuesを/api/predictにPOSTリクエストし、レスポンスをresに取得。
        // const res: AxiosResponse<Result> = await axios.post('/api/predict', inputValues);
        
        const res = {
            data:{
                status:true,
                value:33
            }
        };
        
        // data？？？
        if(res.data.status) {
            this.context.commit("SET_RESULT", res.data);
        }
    }

}
    
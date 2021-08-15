// ワインがおいしいかの予測結果を格納するResult型を定義
export interface Result{
    value: number
    comment: String
    status: boolean
}

// 入力するWineの属性を格納するWineAttribute型を定義
export interface WineAttribute{
    id: number
    japaneseTitle: string
    englishTitle: string
    value?: number
    step: number
    minValue: number
    maxValue: number
}

// APIにPOSTを行うIDと値を格納するInputValue型を定義
export interface InputValue{
    id: number
    value ?: number // 本当は?を使わず入力必須にすべきな気がする。
}
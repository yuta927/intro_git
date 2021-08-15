<template>
    <v-card class="ma-2 pa-3">
        <div class="subheading">
            <!-- 酒席酸濃度 -->
            {{wineAttr.japaneseTitle}}
        </div>
        <div class="caption">
            <!-- 1/11 -->
            {{wineAttr.id}}/{{total}}
        </div>
        <!-- <v-slider class="px-8 pt-14 pb-3" thumb-label="always" height="3" :max=1 :min=0 :step=0.1> -->
        <v-slider class="px-8 pt-14 pb-3" thumb-label="always" height="3" :max=wineAttr.maxValue :min=wineAttr.minValue :step=wineAttr.step>
        </v-slider>
    </v-card>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "nuxt-property-decorator";
    import {appStore} from "@/store"


    @Component
    export default class Form extends Vue {
        @Prop({ type: Object })wineAttr :any;
        @Prop({type: Number}) total: any;
        
        set(val: number){
            appStore.SET_WINE_VALUE({id:this.wineAttr.id, value: val});
        }
    }
</script>

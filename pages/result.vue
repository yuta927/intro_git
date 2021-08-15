<template>
    <v-layout column>
        <result-chart></result-chart>
        <v-btn @click="back">もう一度診断する</v-btn>
    </v-layout>
</template>

<script lang="ts">
import {Vue, Component } from 'nuxt-property-decorator'
import { appStore } from '~/store'
@Component({
    components: {
        ResultChart: () => import('~/components/ResultChart.vue')
    }
})
export default class result extends Vue{
    created(){
        appStore.SET_TITLE('診断結果画面');
    }

    private back(){
        appStore.CLEAR();
        this.$router.back();
    }
}
</script>
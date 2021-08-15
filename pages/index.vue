<template>
  <v-layout column>
    <!-- <form-card v-for ="i in 11" :key ="`${i}`"/> -->
    <form-card v-for ="wineAttr in wineAttribute" :key ="`${wineAttr.id}`" :wine-attr="wineAttr" :total="wineAttribute.length"/>
    <v-btn @click="submit">
      AIで診断する
    </v-btn>
  </v-layout>  
</template>

<script lang="ts">
import {Vue, Component} from 'nuxt-property-decorator'
import { appStore } from '@/store'

@Component({
  components: {
    FormCard: () => import('~/components/Form.vue')
  }
})
export default class Index extends Vue{
  // wineArributeを取得。それを使って属性値を表示
  get wineAttribute(){
    return appStore.wineAttribute;
  }

  // 画面を表示するときの処理として、タイトルを設定
  private created(){
    appStore.SET_TITLE('入力画面');
  }

  private async submit(){
    await appStore.POST_WINE_VALUE();
    await this.$router.push('/result')
  }

}
</script>

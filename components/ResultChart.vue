/* eslint-disable prefer-const */
/* eslint-disable prefer-const */
/* eslint-disable prefer-const */
<template>
    <div>
        <span class="caption">美味しいwineである確率</span>
        <div id="chartdiv"></div>
        <div id="point">
            <span class="display-3">{{result}}%</span>
        </div>
    </div>
</template>

<script lang="ts">
   /* Imports */
    import {Component, Vue} from "nuxt-property-decorator";
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themesDark from "@amcharts/amcharts4/themes/dark";
    import am4themesAnimated from "@amcharts/amcharts4/themes/animated";


@Component
export default class ResultChart extends Vue {

    private result=34;
    mounted(){
        this.result=34;
       /* Chart code */
        // Themes begin
        am4core.useTheme(am4themesDark);
        am4core.useTheme(am4themesAnimated);
        // Themes end

        // create chart
        const chart = am4core.create("chartdiv", am4charts.GaugeChart);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

        chart.innerRadius = -25;

        const axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
        axis.min = 0;
        axis.max = 100;
        axis.strictMinMax = true;
        axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
        axis.renderer.grid.template.strokeOpacity = 0.3;

        const colorSet = new am4core.ColorSet();

        // 1色目とその範囲を設定(0~50%)
        const range0 = axis.axisRanges.create();
        range0.value = 0;
        range0.endValue = 50;
        range0.axisFill.fillOpacity = 1;
        range0.axisFill.fill = colorSet.getIndex(0);
        range0.axisFill.zIndex = - 1;

        // 1色目とその範囲を設定(50~80%)
        const range1 = axis.axisRanges.create();
        range1.value = 50;
        range1.endValue = 80;
        range1.axisFill.fillOpacity = 1;
        range1.axisFill.fill = colorSet.getIndex(2);
        range1.axisFill.zIndex = -1;

        // 1色目とその範囲を設定(80~100%)
        const range2 = axis.axisRanges.create();
        range2.value = 80;
        range2.endValue = 100;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = colorSet.getIndex(4);
        range2.axisFill.zIndex = -1;

        const hand = chart.hands.push(new am4charts.ClockHand());

        // using chart.setTimeout method as the timeout will be disposed together with a chart
        chart.setTimeout(randomValue, 2000);

        function randomValue() {
            // hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
            hand.showValue(34, 1000, am4core.ease.cubicOut);            
            chart.setTimeout(randomValue, 2000);
        }
    }
}
</script>

<style>
    #chartdiv{
        height:200px;
    }
    
    #point{
        display: flex;
        flex-direction: column;
        align-items: center; 
        position:absolute;
        top:160px;
        left:50%;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }

</style>
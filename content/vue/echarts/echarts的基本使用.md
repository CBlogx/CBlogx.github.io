---
title: "Echarts系列（1）vue-Echarts的基本使用"
date: 2022-04-15T19:25:21+08:00
draft: false
image: "/images/background_dark.jpg"
tags: ["echarts", "vue"]
categories: ["vue"]
description: "Echarts保姆级教程"
---

# vue-echarts 使用

> vue-echarts 和原生 echarts 的使用区别并不大，只是对原生的一些方法以及属性做了封装和修改，使用起来更加轻巧。下面这里以 vue2 示例介绍一下 vue-echarts 的简单使用。

## 安装

> npm install echarts vue-echarts
>
> vue2 下还需要安装@vue/composition-api：
>
> npm install -D @vue/compositoin-api

## 模块引入

> 推荐采取按需引入的方式引入 vue-echarts 的各模块来减少打包的体积。当然也可以全局引入只需要一句“import echarts”即可，但是会增加打包的负担！

```javascript
import Vue from "vue";
import { use, registerMap, registerTheme } from "echarts/core";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers"; //使用canvas渲染
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  PolarComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import ECharts, { THEME_KEY } from "vue-echarts";
use([
  LineChart,
  CanvasRenderer,
  TitleComponent,
  PolarComponent,
  LegendComponent,
  TooltipComponent,
  registerMap,
  registerTheme,
]); // 使用use方法对组件进行注册

// 根据Vue2/Vue3的方法对组件进行全局注册，也可以在单文件中进行局部注册，这里展示Vue2方法
Vue.component("v-chart", Echarts);
```

## 常用参数

> - init-options: object
>   vue-echart 初始化附加的参数，echarts.init 方法 的封装，具体参考 echarts.init 方法。
>   inject 键名：INIT_OPTIONS_KEY（关于键名的时使用详见示例）
> - theme：string | object
>   要应用的主题，具体参考 echart.init 的 theme 参数使用，在使用自定义主题时请使用 registerTheme 方法注册。
>   inject 键名：THEME_KEY
> - option：object
>   Echarts 的万能接口，修改 option 时会触发 Echarts 实例的 setOption 方法。
> - update-options：object
>   图标更新的配置项，参考 echartsInstance.setOption 的 opts 参数
>   inject 键名：UPDATE_OPTIONS_KEY
> - autoresize：boolean（默认值为 false
>   当 autoresize=true 时，图表在组件根元素尺寸变化时是否需要自动进行重绘。

## Provide / Inject

> vue-echarts 提供了 provide/inject 的 API，以通过上下文配置选项，即使用 inject 键名

```vue
<script>
import { INIT_OPTIONS_KEY, THEME_KEY, UPDATE_OPTIONS_KEY } from 'vue-echarts'
export default{
    provide:{
        [INIT_OPTIONS_KEY]: { ... },
        [THEME_KEY]:"",
        [UPDATE_OPTIONS_KEY]: { ... }
    }
}
</script>
```

## 使用示例

```vue
<template>
  <v-chart class="chart" :option="option" :init-options="initOptions" autoresize />
  <!-- 由于v-chart已经进行了全局注册，所以此处可以直接引用 --!>
</template>

<script>
import chinaMap from "china.json";
import theme from "theme.json";

registerMap("china",chinaMap); // 注册地图
registerTheme("ovilia-green", theme); //注册主题

export default{
   provide:{
       [THEME_KEY]:"ovilia-green" //使用注册的主题,也可以通过在v-chart中传入参数:theme使用
   },
    data(){
        return{
            option:{
                // option的配置参照Echarts
            }，
            initOptions: {
        		renderer: "svg" || "canvas"
      		},
        }
    }
}
</script>
```

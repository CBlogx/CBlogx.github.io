---
title: "vue配置Echarts"
date: 2022-04-15T18:56:42+08:00
draft: false
tag: ["echarts", "vue"]
# slug: "vue-echarts"
categories: ["echarts", "vue"]
---

# echarts 配置主题

## 配置样式

> 先来看一个示例：

```json
// theme.json
{
"default": {
        "geo": {
            "itemStyle": {
                "areaColor": "#f3f3f3",
                "borderColor": "#999999",
                "borderWidth": 0.5,
                "normal": {
                    "areaColor": "#3a7fd5",
                    "borderColor": "#0a53e9",
                    "shadowColor": "#092f8f",
                    "shadowBlur": 20
                },
                "emphasis": {
                    "areaColor": "#0a2dae"
                }
            },
            "label": {...}
        },
        "scatter": {...}
    },
}
```

> 很好，这里我们已经在 theme.json 中定义了一个名为“default”的主题

## 注册

> 然后我们在组件使用如下方法进行主题的注册，这里给出了 echarts 和 vue-echarts 两种方法

```javascript
// 引入主题
import theme from "theme.json";

// 使用echarts
import echarts from "echarts";
echarts.registerTheme("default", theme);

// 使用vue-echarts
import echarts from "vue-echarts";
import { registerTheme } from "echarts/core";
registerTheme("default", theme);
```

## 使用

> 接下来就是给我们的组件换上主题

```javascript
//使用echarts
<div id="test">
	...
</div>
let myChart = echarts.init(document.getElementById("test"),"default");
let option = {...}
myChart.setOption(option);

//使用vue-echarts
方式一：
<v-chart :theme=theme>
    ...
data(){
    return{
    	theme:"default"
    }
 }

方式二：
import { THEME_KEY } from 'vue-echarts'
export default{
    provide:{
        [THEME_KEY]:"defalut",
}
```

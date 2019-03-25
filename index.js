// 1. 先用 js 对象创建虚拟 dom 对象

import el from "./Element"


const rootEl = document.querySelector('#app');

const div = el({
    el:"div",
    props:{},
    children:[
        el({
            el:"p",
            props:{},
            children:["heiheihei"]
        })
    ]
});



rootEl.appendChild(div.render())


// 1. 先用 js 对象创建虚拟 dom 对象

import {el} from "./Element"
import diff from "./diff.js"
import patch from "./patch"

const domTree1 = {
    el: "div",
    props: {},
    children: [
        el({
            el: "p",
            props: {},
            children: ["我是老大", el({
                el: "p",
                props: {},
                children: [
                    el({
                        el: "p"
                    })
                ]
            })]
        })
    ]
}
const rootEl = document.querySelector('#app');
let appEl = el(domTree1).render();
rootEl.appendChild(appEl)

const btn1 = document.getElementById(`btn1`)
btn1.onclick = function () {
    // 更新了虚拟 dom
    const newTree = {
        el: "div",
        props: {},
        children: [
            el({
                el: "p",
                props: {},
                children: ["我是老大", el({
                    el: "p",
                    props: {},
                    children: [
                        "我才是老大"
                    ]
                })]
            })
        ]
    }
    
    const patches = diff(domTree1,newTree)
    patch(appEl,patches)
}


// 重新渲染,更新视图
function updateView(domTree) {
    rootEl.removeChild(appEl);
    appEl = el(domTree).render();
    rootEl.appendChild(appEl)
}






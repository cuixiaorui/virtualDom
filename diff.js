/**
 * 对比两棵树
 * 返回 patch
 */
import {isElementNode,isTextNode} from "./util"
export default (oldTree,newTree)=>{

    const patches = {};
    let index = 0;
    const walk = (oldNode,newNode)=>{
       
        index++;
        const patch = [];
        patches[index] = patch; 


        checkoutProps(oldNode,newNode,patch);
        checkoutText(oldNode,newNode,patch);
        checkoutReplace(oldNode,newNode,patch);

        if(oldNode.children){
            for (let i = 0, len = oldNode.children.length; i<len;i++) {
                const oldChildNode = oldNode.children[i]
                const newChildNode = newNode.children[i]
                walk(oldChildNode,newChildNode)
            }
        }
    }

    walk(oldTree,newTree)
    return patches;
}

function checkoutProps(oldNode,newNode,patch){
        // 对比属性的改变
        for(let key in newNode.props){
            const oldNodeVal = oldNode.props[key];
            const newNodeVal = newNode.props[key];
            if(oldNodeVal && newNodeVal){
                // 属性改变值
                if(oldNodeVal !== newNodeVal){
                    patch.push({     
                        type:"PROPS",
                        content:{
                            type:"change",
                            "key":key,
                            "value":newNodeVal
                        }
                    })
                }
            }

            // 添加了新属性
            if((!oldNodeVal && newNodeVal)){
                patch.push({
                    type:"PROPS",
                    content:{
                        type: "add",
                        "key": key,
                        "value": newNodeVal
                    }
                })
            }
        }

        // 属性删除
        for(let key in oldNode.props){
            const oldNodeVal = oldNode.props[key];
            const newNodeVal = newNode.props[key];
            if(oldNodeVal && !newNodeVal){
                patch.push({
                    type:"PROPS",
                    content:{
                        type:"remove",
                        "key":key
                    }
                })
            }
        }
}

function checkoutText(oldNode,newNode,patch){
        // 先对比是否为文本节点，如果都是文本节点的话，那么检测内容是否变更
        if(isTextNode(oldNode) && isTextNode(newNode)){
            if(oldNode !== newNode){
                patch.push({
                    type:"TEXT",
                    content:newNode
                })
            }
        }
}

function checkoutReplace(oldNode,newNode,patch){

        // 同是元素节点
        if(isElementNode(oldNode) && isElementNode(newNode)){
            // tagType 不同
            if(oldNode.el !== newNode.el){
                // 元素节点变更
                patch.push({
                    type: "REPLACE",
                    content: newNode
                })
            }
        }

        // 新老节点类型不同时也需要元素节点变更
        if((isTextNode(oldNode) && isElementNode(newNode)) ||(isElementNode(oldNode) && isTextNode(newNode)) )
        {
                // 元素节点变更
                patch.push({
                    type: "REPLACE",
                    content: newNode
                })
        }


}
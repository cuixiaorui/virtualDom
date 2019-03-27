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

        // 先对比是否为文本节点，如果都是文本节点的话，那么检测内容是否变更
        if(isTextNode(oldNode) && isTextNode(newNode)){
            if(oldNode !== newNode){
                patch.push({
                    type:"TEXT",
                    content:newNode
                })
            }
        }

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

export default (root,patches)=>{
 
    // DFS root 
    let index = 0;

    const DFS = (node)=>{
        index++; 
        // console.log(`name: ${node.nodeName},index:${index}`)
        const patchs = patches[index];

        if(patchs && patchs.length > 0){
            // 当前节点有补丁
            let patchs = patches[index]
            patchs.forEach(patch => {
                handlerPatch(patch, node)
            });
            
        }
        const children = Array.from(node.childNodes);
        if(children){
            for(let i=0,len = children.length; i<len; i++){
                const childNode = children[i]
                DFS(childNode);
            }
        }
    }

    DFS(root);

}

/**
 * 1. 节点变更
 * 2. 节点删除、移动、替换、新增
 * 3. 节点属性变更
 * 4. 文本节点内容改变
 * @param {*} param0 
 * @param {*} node 
 */

import {isElementNode,isTextNode} from "./util"
function handlerPatch({type,content},node){
    switch(type){
        case "REPLACE":
            let parentElement = node.parentElement;
            let newTagNode;
            if(isElementNode(content)){
                newTagNode = content.render();
            }else{
                newTagNode = document.createTextNode(content);
            }
            parentElement.replaceChild(newTagNode,node);
            break;
        case "REORDER":
            console.log(`节点删除、移动、替换、新增`)
            break;
        case "PROPS": 
            if(content.type === "change" || content.type === "add"){
                node.setAttribute(content.key,content.value);
            }else if(content.type === "remove"){
                node.removeAttribute(content.key);
            }
            break;
        case "TEXT":
            node.textContent = content;
            break;
    }

}
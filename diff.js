/**
 * 对比两棵树
 * 返回 patch
 */
export default (oldTree,newTree)=>{

    const patches = {};
    let index = 0;
    const walk = (oldNode,newNode)=>{
       
        index++;
        

            // 说明都是元素节点
        if(oldNode.el && newNode.el){
            // 说明都是文本节点
        }else if(!oldNode.el && !newNode.el)
        {
            // 说明文本节点的text值不一致
            // 需要变更
            if(oldNode !== newNode){
                patches[index] = {
                    index,
                    type:"changeTextNode",
                    val:newNode
                }
            }
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
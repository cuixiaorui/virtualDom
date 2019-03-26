export default (root,patches)=>{
 
    // DFS root 
    let index = 0;

    const DFS = (node)=>{
        index++; 
        console.log(`name: ${node.nodeName},index:${index}`)
        if(patches[index]){
            // 当前节点有补丁
            let patch = patches[index]
            handlerPatch(patch,node)
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

function handlerPatch({type,val},node){
    switch(type){
        case "changeTextNode":
            node.textContent = val;
    }

}
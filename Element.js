/**
 * 虚拟dom
 */
class Element{
    constructor({el,props,children}){
        this._el = el;
        this._props = props;
        this._children = children;
    }


    render(){
        const el = document.createElement(this._el)

        // 赋值属性
        for(let key in this._props){
            const val = this._props[key]
            el.setAttribute(key,val);
        }

        // 处理子节点
        for(let i=0,len=this._children.length; i<len; i++){
            const child = this._children[i]


            // 元素节点
            if(child instanceof Element){
               el.appendChild(child.render());
            }else{
                // textNode
                const textNode = document.createTextNode(child);
                el.appendChild(textNode)
            }
        }
        return el;
    }

    get children(){
        return this._children;
    }

    get el(){
        return this._el;
    }

    get props(){
        return this._props;
    }
}


function el(options){
    return new Element(options);
}


export default el 
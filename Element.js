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

        for(let key in this._props){
            const val = this._props[key]
            el.setAttribute(key,val);
        }

        for(let i=0,len=this._children.length; i<len; i++){
            const child = this._children[i]


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
}


function el(options){
    return new Element(options);
}


export default el 
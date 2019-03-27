
import {Element as CeshiElement} from "./Element"
export function isTextNode(node){
    return typeof node === "string"
}

export function isElementNode(node){
    return node instanceof CeshiElement
}
/*
   获取某一个元素的子元素
* */

function childNode(element) {
    let arr = [];
    let childnodes = element.childNodes;
    /*childnodes.forEach(function (ele) {
        if (ele.nodeType == 1) {
            arr.push(ele)
        }
    });*/
    /*
    *  添加
    *  冒充 : 数组 冒充
    *  nodeList -> 数组
    * */
    arr = Array.prototype.filter.call(childnodes, function (element) {
        return element.nodeType == 1
    });
    /*for (let i = 0; i < childnodes.length; i++) {
        if (childnodes[i].nodeType == 1) {
            arr.push(childnodes[i]);
        }
    }*/
    return arr;
}

function firstElementChild(element) {
    return childNode(element)[0];
}

function createCircle(num) {
    let box = document.querySelector('.box');
    for (let i = 0; i < num; i++) {
        let divs = document.createElement('div');
        divs.classList.add('circle');

        let w = Math.floor(Math.random() * 30 + 20);

        let color = getColor();
        let l = (innerWidth - w) * Math.random() - innerWidth / 2,
            t = (innerHeight - w) * Math.random() - innerHeight / 2;
        divs.style.cssText = `
             background:${color};
             width:${w}px;
             height:${w}px;
        `;
        box.appendChild(divs);

        /*setTimeout(function(){
            divs.style.left = `${l}px`;
            divs.style.top = `${t}px`;
        },100)*/
    }

}

function getColor() {
    let str = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
    return str;
}

/* 获取指定元素 *///选择器  范围
/*注：用$封装起来，以便快速获取指定元素：$('.box') $('#box') $('div') $(< div >)
                    }
            获取指定元素：$(select，ranger)  
                            select  String   选择器
                            ranger  对象（元素节点）  选择范围
                1.判断类型  string执行
                2.首先判断首字符是什么元素
                3.根据首字符进行分类  #  id
                                      .  class
                                      tag  tagname         */

function $(select,ranger) {
    if (typeof select == 'string') {
        //ranger = ranger?ranger:document;
        ranger = ranger || document;
        let selector = select.trim();
        let firstChar = selector.charAt(0);
        if (firstChar == '#') {
            return document.getElementById(selector.substring(1));
        } else if (firstChar == '.') {
            return ranger.getElementsByClassName(selector.substring(1));
        } else if (/^[a-zA-Z][A-Za-z1-20]{0,6}$/.test(selector)) {
            return ranger.getElementsByTagName(selector);
        } else if (/^<[a-zA-Z][A-Za-z1-20]{0,6}>$/.test(selector)) {
            return document.createElement(selector.slice(1, -1));
        }
    } else if (typeof select == 'function') {
        /*window.onload = function () {
            select();
        }*/
        window.addEventListener('load',function(){
            select();
        })
    }
}


/*
*  append()
*  prepend()
*   在某一个元素的 最前面 插入一个子元素 =>  第一个元素节点之前
*
*   1、第一个元素节点
* */
// function append(parentNode,child){
//     parentNode.appendChild(child);
// };

// function prepend(parentNode,child){
//     let firstChild = parentNode.firstElementChild;
//     if(firstChild){
//         parentNode.insertBefore(child,firstChild);
//     }else{
//         parentNode.appendChild(child);
//     }
// };

HTMLElement.prototype.append =  function(child){
  	this.appendChild(child);
};
HTMLElement.prototype.appendTo =  function(parentNode){
	parentNode.append(this);//或下面的操作方式
	// parpentNode.appendChild(child);
};
HTMLElement.prototype.prepend = function(child){
    let firstChild = this.firstElementChild;
    if(firstChild){
        this.insertBefore(child,firstChild);
    }else{
        this.appendChild(child);
    }
};
HTMLElement.prototype.prependTo = function(parentNode){
	parentNode.prepend(this);
};
//在box前插入div    把div插入到box
HTMLElement.prototype.insert = function(node){
	//this  node //插入位置  插入元素
	let parent = this.parentNode;//获取this父元素
	parent.insertBefore(node,this);
};
// HTMLElement.prototype.insertTo = function(parentNode){
// 	parentNode.insert(this)
// }
// 
/*往一个元素的后面插入内容相当于往它兄弟元素前面插入即可*/
HTMLElement.prototype.after = function(node){
	//this node
	let next = this.nextElementSibling;
	if(next){
		next.insert(node);
	}else{
		let parent = this.parentNode;
		parent.append(node);
	}
};
HTMLElement.prototype.afterTo = function(node){
    node.after(this);
};
/* 查找 */
HTMLElement.prototype.parent = function(){
    return this.parentNode;
};
/* 查找父类 */
HTMLElement.prototype.parents = function(){
    let arr = [];
    let parent = this.parentNode;
    if(parent.nodeName == 'BODY'){
        arr.push(parent);
    }
    while (parent.nodeName != 'HTML'){
        arr.push(parent);
        parent = parent.parentNode;  //更新
        if(parent.nodeName == 'HTML'){
            arr.push(parent);
        }
    }
    return arr;
};
/*查找某元素后面的某一个标签*/
/*1.查找兄弟元素，放入空数组中
2.遍历数组中元素
3.查找元素后面元素的标签*/
/*HTMLElement.prototype.next = function(){
    let Barr = [];
    let nexts = this.nextElementSibling;
    if(nexts){
        Barr.push(nexts);
        for(let i = 0;i < Barr.length;i++){
           if()
        }
    }else{
        nexts = null;
    }
    
}*/
/* 定位 */
HTMLElement.prototype.offsetParents = function(){
    let parents = this.parents();//获取所有父元素
    let node = null;
    for(let i = 0;i < parents.length;i++){  //遍历父元素
        //parents[i].style.position;//只能获取行内样式
        let v = window.getComputedStyle(parents[i],null).position;//getComputedStyle只能获取，不能设置
        if(v == 'relative' || v == 'absolute'){
            node = parents[i];
            break;
        }
    }
    if(!node){  //没有节点
        node = document.body;
    }
    return node;
}



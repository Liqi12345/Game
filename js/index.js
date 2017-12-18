/*
属性
	字母表、几个字符、生命、关卡、速度
方法
	开始、产生、下落、消失、进入下一关、重新开始
*/
class Code{
	constructor(){
		this.char = ['R','d','S','H','B','Q'];//字母表
		this.length = 10;
		this.current = [];
		this.speed = 10;
	}
	start(){
		this.getChars(this.length);
		this.drop();
	}
	getChars(length){
		for(let i = 0; i < length;i++){
			this.getChar();
		}
	}
	getChar(){
		let num = Math.floor(Math.random()*this.char.length);
		let divs  = document.createElement('div');
		let tops = Math.floor(Math.random()*100);
		let lefts = Math.floor((window.innerWidth - 400)*Math.random() + 200);
		function bg(){
			let r = Math.floor(Math.random()*255);
			let g = Math.floor(Math.random()*255);
			let b = Math.floor(Math.random()*255);
			return `rgb(${r},${g},${b})`;
		}
		divs.style.cssText = `
			width:50px;
			height:50px;
			background:${bg()};
			border-radius:10%;
			position:absolute;
			top:${tops}px;
			left:${lefts}px;
			font-size:20px;
			text-align:center;
			line-height:50px;
		`;
		divs.innerText = this.char[num];
		document.body.appendChild(divs);
		this.current.push(divs);
	};
	drop(){
		let that = this;
		setInterval(function(){
			for(let i = 0;i < that.current.length;i++){
				let tops = that.current[i].offsetTop + that.speed;
				that.current[i].style.top = tops + 'px';
				if(tops >= 500){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.getChar();
				}
			}
		},100)
	}
}
/*
属性
	字母表、几个字符、生命、关卡、速度
方法
	开始、产生、下落、消失、进入下一关、重新开始
*/
class Code{
	constructor(){
		this.char = [['A','img/a.png'],['B','img/b.png'],['C','img/c.png'],['D','img/d.png'],['E','img/e.png'],
		['F','img/f.png'],['G','img/g.png'],['H','img/e.png'],['I','img/i.png'],['J','img/j.png'],
		['K','img/k.png'],['L','img/l.png'],['M','img/m.png'],['N','img/n.png'],['O','img/o.png'],
		['P','img/p.png'],['Q','img/q.png'],['R','img/r.png'],['S','img/s.png'],['T','img/t.png'],
		['U','img/u.png'],['V','img/v.png'],['W','img/w.png'],['X','img/x.png'],['Y','img/y.png']];//字母表
		this.length = 5;
		this.current = [];
		this.speed = 3;
		this.position = [];
		this.play = $('li')[0];
		this.pause = $('li')[1];
		this.reload = $('li')[2];
        this.music = $('li')[5];
		this.fenObj = document.querySelector('.fenshu>span');
		this.smObj = document.querySelector('.sm>span');
		this.fen = 0;
		this.sm = 5;
		this.gq = 5;
	}
	start(){
		this.getChars(this.length);
		this.drop();
		this.keys();
	}
	getChars(length){
		for(let i = 0; i < length;i++){
			this.getChar();
		}
	}
	checkEcist(char){
		//检查页面中是否存在相同的内容
		return this.current.some(e => e.innerText == char)
	}
	checkPosition(pos){
		//定位两者距离取绝对值，小于自身宽度
		return this.position.some(e => Math.abs(e-pos) <= 50);
	}
	getChar(){
		let num = Math.floor(Math.random()*this.char.length);
		//去重   this.char[num];   this.current[i];
		do{
			num = Math.floor(Math.random()*this.char.length);
		}while(this.checkEcist(this.char[num][0]));
		let divs  = document.createElement('div');
		let tops = Math.floor(Math.random()*100);
		let lefts = Math.floor((window.innerWidth - 400)*Math.random() + 200);
		//去重叠
		do{
			lefts = Math.floor((window.innerWidth - 400)*Math.random() + 200);
		}while(this.checkPosition(lefts));

		divs.style.cssText = `
			width:50px;
			height:auto;
			background:url(${this.char[num][1]}) center/cover;
			border-radius:10%;
			position:absolute;
			top:${tops}px;
			left:${lefts}px;
			font-size:20px;
			text-align:center;
			line-height:50px;
			color:rgba(0,0,0,0);
		`;
		divs.innerText = this.char[num][0];
		document.body.appendChild(divs);
		this.current.push(divs);
		this.position.push(lefts);
	};
	drop(){
		let that = this;
		that.t = setInterval(move,100)
		function move(){
			for(let i = 0;i < that.current.length;i++){
				let tops = that.current[i].offsetTop + that.speed;
				that.current[i].style.top = tops + 'px';
				if(tops >= 500){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.position.splice(i,1);
					that.getChar();
					that.sm--;
					that.smObj.innerText = that.sm;
					if(that.sm <= 0){
						let flag = confirm('您要继续游戏吗');
						if(flag){
							that.restart();
						}else{
							close();
						}
					}
				}
			}
		}
		let flags = true;
        let bgMusic = document.getElementById('bgMusic');console.log(bgMusic);
		that.play.onclick = function(){
			if(flags == false){
				that.t = setInterval(move,100)
				flags = true;
                bgMusic.play();
			}
		}
		that.pause.onclick = function(){
			if(flags == true){
				clearInterval(that.t)
				flags = false;
                bgMusic.pause();
			}
		}
		that.reload.onclick = function(){
			history.go(0);
		}
		that.music.onclick = function(){
            if(bgMusic.paused){
            	bgMusic.play();
            }else{
            	bgMusic.pause();
			}
		}
	};
	keys(){
		let that = this;
		document.onkeydown = function(e){
			for(let i = 0;i < that.current.length;i++){
				let code = String.fromCharCode(e.keyCode);
				// let code = e.key.toUpperCase;
				if(code == that.current[i].innerText){//按下的键与div中的字母比较
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.position.splice(i,1);
					that.getChar();

					that.fenObj.innerText = ++that.fen;
					if(that.fen >= that.gq){
						that.next();
					}
				}
			}
		}
	}
	next(){
		//清空数据：删页面 （暂停-> 删）-> 删数据
		clearInterval(this.t);
		this.current.forEach(e => {
			document.body.removeChild(e);
		})
		this.current = [];
		this.position = [];
		//初始化：分值、关卡、生命、速度；
		this.length++;
		this.gq += 10;//每关在消除十个可进入下一关

		this.getChars(this.length);
		this.drop();
	}
	restart(){
		clearInterval(this.t);
		this.current.forEach(e => {
			document.body.removeChild(e);
		})
		this.current = [];
		this.position = [];

		this.fen = 0;
		this.fenObj.innerText = this.fen;

		this.sm = 5;
		this.smObj.innerText = this.sm;

		this.length = 5;
		this.gq = 5;

		this.getChars(this.length);
		this.drop();
	}
}
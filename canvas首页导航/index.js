var canvas = document.getElementById('canvas');
var load = document.getElementById('load');
var wrap =document.getElementById('wrap');
var btnPos=[];
window.onload = function(){
        var canvas_load = document.getElementById('canvas_load'),  //获取canvas元素
            context = canvas_load.getContext('2d'),  //获取画图环境，指明为2d
            centerX = canvas_load.width/2,   //Canvas中心点x轴坐标
            centerY = canvas_load.height/2,  //Canvas中心点y轴坐标
            rad = Math.PI*2/100, //将360度分成100份，那么每一份就是rad度
            speed = 0.1; //加载的快慢就靠它了 
        //绘制蓝色外圈
        function blueCircle(n){
            context.save();
            context.strokeStyle = "#fff"; //设置描边样式
            context.lineWidth = 5; //设置线宽
            context.beginPath(); //路径开始
            context.arc(centerX, centerY, 100 , -Math.PI/2, -Math.PI/2 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            context.stroke(); //绘制
            context.closePath(); //路径结束
            context.restore();
        }
        //绘制白色外圈
        function whiteCircle(){
            context.save();
            context.beginPath();
            context.strokeStyle = "white";
            context.arc(centerX, centerY, 100 , 0, Math.PI*2, false);
            context.stroke();
            context.closePath();
            context.restore();
        }  
        //百分比文字绘制
        function text(n){
            context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
            context.strokeStyle = "#fff"; //设置描边样式
            context.font = "40px Arial"; //设置字体大小和字体
            //绘制字体，并且指定位置
            context.strokeText(n.toFixed(0)+"%", centerX-25, centerY+10);
            context.stroke(); //执行绘制
            context.restore();
        } 
        //动画循环
        (function drawFrame(){
            var di= window.requestAnimationFrame(drawFrame, canvas_load);
            context.clearRect(0, 0, canvas_load.width, canvas_load.height);
            whiteCircle();
            text(speed);
            blueCircle(speed);
            if(speed > 100) {
            	load.style.opacity='0';
            	wrap.style.opacity='1';
            	cancelAnimationFrame(di);// 结束动画
            	drawS();
            };
            speed += 0.1;
        }());
    };



window.onresize = drawS;
function drawS(){
	var w = document.documentElement.clientWidth,
		h = document.documentElement.clientHeight;
	canvas.width=w;
	canvas.height=h;
	var ctx = canvas.getContext('2d');
	

	drawArc();
	draw16();
	drawBtn();
	//drawline();
	var n=0;
	var timer=null;
	var r=3;
	var onOff=true;
	var num=0;
	var cs=0;
	/*------------------*/
	 (function a () {
		ctx.translate(-w/2, -h/2);
		ctx.clearRect(0,0,w,h);
		drawArc();
		draw16();
		drawBtn();
		drawHH(n,r);
		drawline();
		
		if(onOff){
			r+=0.2;
		}else{
			r-=0.2;
			if(r<3){
				onOff=true;
			}
			if(r<3&cs==3){
				n++;
				n%=16;
				cs=0;
				r=3;
			}
		}
		if(r>20){
			cs++;
			onOff=false;
		}
		draw5line(num);
		num++;
		requestAnimationFrame(a)
	})()
	 
	  
	 /*--------------------*/
	
	function drawArc(){
		ctx.save();
		ctx.translate(w/2, h/2); //2个参数 x y 的偏移量
		ctx.beginPath();
		ctx.strokeStyle='#fff';
		ctx.lineWidth = 1;
		ctx.arc(0, 0, 168, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.restore();
	}
	function drawBtn(){
		btnPos=[];
		ctx.save();
		ctx.translate(w/2, h/2); //2个参数 x y 的偏移量
		ctx.beginPath();
		var R= 168;
		for(var i = 0; i< 5; i++) {
			ctx.beginPath();
			ctx.fillStyle='#fff';
			var rad = 54 + 72*i;
			var x = Math.cos(rad*Math.PI/180) * (R );
			var y = Math.sin(rad*Math.PI/180) * (R );
			ctx.arc(x, y, 28, 0, 2 * Math.PI);
			btnPos.push([x-28,y-28]);
			ctx.fill();
		}
	}
	function draw16(){
		var R= 210;
		ctx.save();
		ctx.translate(w/2, h/2);
		for(var i = 0; i< 16; i++) {
			ctx.beginPath();
			ctx.fillStyle='#fff';
			var rad = 2 * Math.PI / 16  * i;
			var x = Math.cos(rad) * (R );
			var y = Math.sin(rad) * (R );
			ctx.arc(x, y, 3, 0, 2 * Math.PI);
			ctx.fill();
		}
		ctx.restore();
	}
	function drawHH(n,r){
		var R= 210;
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle='rgba(255,255,255,.3)';
		var rad = 2 * Math.PI / 16  * n;
		var x = Math.cos(rad) * (R );
		var y = Math.sin(rad) * (R );
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	function drawline(){
		
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle='#fff';
		var R =116;
		var s=14;
		for(var i = 0; i< 120; i++) {
			ctx.beginPath();
			
			var rad = 2 * Math.PI / 120  * i;
			var x = Math.cos(rad) * (R );
			var y = Math.sin(rad) * (R );
			var tx = Math.cos(rad) * (R+s);
			var ty = Math.sin(rad) * (R+s);
			ctx.moveTo(x,y);
			ctx.lineTo(tx,ty);
			ctx.stroke();
		}
	}
	function draw5line(n){
		ctx.save();
		ctx.strokeStyle='#fff';
		ctx.beginPath();
		var R =130;
		ctx.beginPath();
		var rad = 2 * Math.PI / 120  * n;
		var x = Math.cos(rad) * (R );
		var y = Math.sin(rad) * (R );
		var tx = Math.cos(rad) * (R+2);
		var ty = Math.sin(rad) * (R+2);
		ctx.moveTo(x,y);
		ctx.lineTo(tx,ty);
		
		var rad = 2 * Math.PI / 120  * (n+1);
		var x = Math.cos(rad) * (R );
		var y = Math.sin(rad) * (R );
		var tx = Math.cos(rad) * (R+4);
		var ty = Math.sin(rad) * (R+4);
		ctx.moveTo(x,y);
		ctx.lineTo(tx,ty);
		
		var rad = 2 * Math.PI / 120  * (n+2);
		var x = Math.cos(rad) * (R );
		var y = Math.sin(rad) * (R );
		var tx = Math.cos(rad) * (R+6);
		var ty = Math.sin(rad) * (R+6);
		ctx.moveTo(x,y);
		ctx.lineTo(tx,ty);
		
		var rad = 2 * Math.PI / 120  * (n+3);
		var x = Math.cos(rad) * (R );
		var y = Math.sin(rad) * (R );
		var tx = Math.cos(rad) * (R+4);
		var ty = Math.sin(rad) * (R+4);
		ctx.moveTo(x,y);
		ctx.lineTo(tx,ty);
		
		var rad = 2 * Math.PI / 120  * (n+4);
		var x = Math.cos(rad) * (R );
		var y = Math.sin(rad) * (R );
		var tx = Math.cos(rad) * (R+2);
		var ty = Math.sin(rad) * (R+2);
		ctx.moveTo(x,y);
		ctx.lineTo(tx,ty);
		
		ctx.stroke();
		
	}
	
	var btn_area = document.getElementById('btn_area');
	btn_area.style.left=w/2 +'px',
	btn_area.style.top=h/2 +'px';
	var as=btn_area.children;
	var area = document.querySelector('.area');
	for(var i=0;i<as.length;i++){
		as[i].style.position='absolute';
		as[i].style.width=as[i].style.height="56px";
		as[i].style.borderRadius='28px';
	}
	for(var i=0;i<as.length;i++){
		as[i].style.left=btnPos[i][0] +'px';
		as[i].style.top=btnPos[i][1]+ 'px';
		as[i].onclick=function(){
			wrap.style.perspective='600px';
			area.style.transform=" rotateX(-180deg) rotateY(180deg) scale(0.3)";
			area.style.opacity=0;
		}
	}
}


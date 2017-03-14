var canvas = document.getElementById('canvas');
var btnPos=[];
window.onresize = window.onload = function(){
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
	console.log(btn_area);
	btn_area.style.left=w/2 +'px',
	btn_area.style.top=h/2 +'px';
	var as=btn_area.children;
	for(var i=0;i<as.length;i++){
		as[i].style.position='absolute';
		as[i].style.width=as[i].style.height="56px";
		as[i].style.borderRadius='28px';
	}
	for(var i=0;i<as.length;i++){
		as[i].style.left=btnPos[i][0] +'px';
		as[i].style.top=btnPos[i][1]+ 'px';
	}
		
	
}

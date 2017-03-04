//变量声明部分
var MapX=20,
	MapY=20;
var snakeData=createArr(MapX,MapY);
var mapData= createArr(MapX,MapY);
var snake=[];//[[x1,y1],[x2,y2],[x3,y3]]
var len=3;
var speed=10;
var snakeTimer=null;
var skateTimer= [];
var breakTimer= [];
var direction=39;//37左 38上 39右 40下 
var flag= true;
var sore=document.querySelector('i');
var start = document.querySelector('input');
//初始化部分
start.onclick= strat;
function strat(){
	this.onclick= null;
	clear();
	initSnake();
	addObj('food');
	walk();
	addToy();
}
createMap(MapX,MapY);


//需求  
/*
 	1生成地图  	
*/
function createMap(x,y){
	var map = document.getElementById('map');
	var table= document.createElement('table');
	table.cellPadding=table.cellSpacing=0;
	var tbody= table.createTBody();
	for(var i=0;i<x;i++){
		var tr= document.createElement('tr');
		for(var j=0;j<y;j++){
			var td= document.createElement('td');
			snakeData[i][j]=tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	map.appendChild(table);
};
/*
 	2 	创建一个二维数组
*/
function createArr(x,y){
	var arr= new Array(x);
	for(var i=0;i<x;i++){
		arr[i]=new Array(y);
	}
	return arr;
};
/*
 	3 设定范围
 */
function scope(startX,startY,endX,endY){
	startX = startX||0;
	startY = startY||0;
	endX = endX||MapX-1;
	endY = endY||MapY-1;
	var p= [],
		x= rP([startX,endX]),
		y=rP([startY,endY]);
		p.push(x,y);
		if(mapData[x][y]){
			return scope(startX,startY,endX,endY);
		}
	return p;
};
/*
	4 随机函数 
*/
function rP(arr){
	var max= Math.max.apply(null,arr);
	var min= Math.min.apply(null,arr);
	return Math.round(Math.random()*(max-min)+min);
};
/*
	5 画蛇  
*/
function initSnake(){
	var p=scope(0,2,MapX-1,parseInt(MapY/2));
	for(var i=0;i<len;i++){
		var x= p[0],
			y= p[1]-i;
			snake.push([x,y]);
			snakeData[x][y].className='snake';
			mapData[x][y]='snake';
	}
};
/*
	让蛇走 
*/
function walk(){
	clearInterval(snakeTimer);
	snakeTimer=setInterval(step,5000/speed);
};
//控制蛇的运动
function step(){
	var headX= snake[0][0],
		headY= snake[0][1];
	switch(direction){
		case 37:
			headY-=1;
			break;
		case 38:
			headX-=1;
			break;
		case 39:
			headY+=1;
			break;
		case 40:
			headX+=1;
			break;
	};
	if(headX<0||headX>=MapX||headY<0||headY>=MapY||mapData[headX][headY]=='snake'||mapData[headX][headY]=='block'){
		alert('玩得辣眼睛!');
		clearInterval(snakeTimer);
		skateTimer.forEach((item)=>{
			clearInterval(item);
		});
		breakTimer.forEach((item)=>{
			clearInterval(item);
		});
		start.onclick= strat;
		return;
	}
	if(len%4==0&&len<55&&mapData[headX][headY]=='food'){
		speed+=5;
		walk();
	}else if(len%9==0&&len<60&&mapData[headX][headY]=='food'){
		addObj('block');
		
	}else if(mapData[headX][headY]=='skate'){
		speed+=15;
		walk();
	}else if(mapData[headX][headY]=='break'){
		speed=10;
		walk();
	}
	if(mapData[headX][headY]=='food'){
		addObj('food');
		mapData[headX][headY]=true;
	}
	
	if(!mapData[headX][headY]){
		var lastX= snake[snake.length-1][0],
			lastY= snake[snake.length-1][1];
		snakeData[lastX][lastY].className='';
		mapData[lastX][lastY]= false;
		snake.pop();
	}
	snake.unshift([headX,headY]);
	snakeData[headX][headY].className='snake';
	mapData[headX][headY]='snake';
	len=snake.length;
	score.innerHTML=(len-3)*10; 
	flag=true;
};
document.onkeydown = function(e){
	if(!flag){
		return;
	}
	var e= e|| window.event;//在谷歌、ie   在火狐下是挂在window。event
	if(e.keyCode>36 && e.keyCode<41 && Math.abs(e.keyCode-direction)!=2){
		direction= e.keyCode;
	}
	flag=false;
	return false;
}
/*
	添加随机物品 
*/
function addObj(name){
	var p = scope();
	snakeData[p[0]][p[1]].className=name;
	mapData[p[0]][p[1]]=name;
}
/*
	添加随机的道具  
*/
function addToy(){
	var skateNum= rP([6,10]);
	var breakNum= rP([4,6]);
	for(var i=0;i<skateNum;i++){
		skateTimer.push(setTimeout(function(){
			addObj('skate');
		},rP([8000,120000])))
	}
	for(var i=0;i<breakNum;i++){
		breakTimer.push(setTimeout(function(){
			addObj('break');
		},rP([10000,160000])))
	}
}

/*
	清除地图 
*/
function clear(){
	snakeData.forEach((item,i)=>{
		item.forEach((item,i)=>{
			item.className='';
		})
	})
	snake=[];
	len=3;
	direction=39;
	score.innerHTML=0;
	speed=10;
	mapData = createArr(MapX,MapY);
}

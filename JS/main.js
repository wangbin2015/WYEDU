// 函数说明：
// 1、轮播幻灯片函数：scrollFunc()
// 2、cookie函数：CookieUtil()
window.onload = function (){
	scrollFunc();
	killRemind.remove();
	killRemind.never();
	md5();
	changetype();
}
//登录框Md5加密
function md5(){  
	var userName=document.getElementsByName('userName')[0];
	var password=document.getElementsByName('password')[0];
	var login=document.getElementsByName('login')[0];
	login.onclick=function(){
		userName.value=hex_md5(userName.value);
		password.value=hex_md5(password.value);  
		if(1){alert("hiiii");}
	}
}  
//获取课程AJAX
   function ajax(pageNo, psize, type) {
        var xml = new XMLHttpRequest;
        listA = document.getElementById('listA');
        var page=document.getElementById('page');
        var url = 'http://study.163.com/webDev/couresByCategory.htm';
        xml.open('GET', url + '?pageNo=' + pageNo + '&psize=' + psize + '&type=' + type);
        xml.send();
        xml.onreadystatechange = function() {
            if (xml.readyState == 4) {
                if (xml.status == 200) {
                    for (var i = 0; i < psize; i++) {
                        var oli = document.createElement('li');
                        var json = JSON.parse(xml.responseText);
                        oli.innerHTML = '<li><img src="' + json.list[i]['middlePhotoUrl']+'"/>' 
                        +'<p>'+'&nbsp;'+json.list[i]['name']+'&nbsp;'+'</p>'
                        +'<p>'+'&nbsp;'+json.list[i]['provider']+'&nbsp;'+'</p>'
						+'<p>'+'&nbsp;'+'&nbsp;'+'&nbsp;'+json.list[i]['learnerCount']+'&nbsp;'+'</p>'
						+'<p>'+'&nbsp;'+'￥'+json.list[i]['price']+'</p></li>';
                        listA.appendChild(oli);
                    };
                    for (var j = 1; j < 9; j++) {
                    	var pli = document.createElement('li');
                    	pli.innerHTML='<a href="javascript:">'+j+'</a>';
                    	page.appendChild(pli);
                    };
                };
            };
        }
    }
 // 切换课程类型函数
 function changetype(){
 	ajax(1, 20, 10);
 	var	tabA=document.getElementsByClassName('tabA')[0];
 	var tabB=document.getElementsByClassName('tabB');
 	tabA.onclick=function(){
 		listA.innerHTML=null;
 		page.innerHTML=null;
		return ajax(1, 20, 10);
 	}
 	tabB[0].onclick=function(){
 		listA.innerHTML=null;
 		page.innerHTML=null;
 		return ajax(1, 20, 20);
 	}
 }
//视频介绍获取
function getMp4(){
	var xml = new XMLHttpRequest;
        var mp4 = document.getElementsByClassName('mp4');
        var url = 'http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4';
        xml.open('GET', url);
        xml.send();
        xml.onreadystatechange = function() {
            if (xml.readyState == 4) {
                if (xml.status == 200) {
                    for (var i = 0; i < psize; i++) {
                        var oli = document.createElement('li');
                        var json = JSON.parse(xml.responseText);
                        oli.innerHTML = '<li><img src="' + json.list[i]['middlePhotoUrl']+'"/>' 
                        +'<p>'+'&nbsp;'+json.list[i]['name']+'&nbsp;'+'</p>'
                        +'<p>'+'&nbsp;'+json.list[i]['provider']+'&nbsp;'+'</p>'
						+'<p>'+'&nbsp;'+'&nbsp;'+'&nbsp;'+json.list[i]['learnerCount']+'&nbsp;'+'</p>'
						+'<p>'+'&nbsp;'+'￥'+json.list[i]['price']+'</p></li>';
                        listA.appendChild(oli);
                    };
                    for (var j = 1; j < 9; j++) {
                    	var pli = document.createElement('li');
                    	pli.innerHTML='<a href="javascript:">'+j+'</a>';
                    	page.appendChild(pli);
                    };
                };
            };
        }
    }
// cookie函数
var CookieUtil={
	set:function(name,value,expires){
		var cookie=encodeURIComponent(name)+'='+encodeURIComponent(value);
		var oDate=new Date;
		oDate.setDate(oDate.getDate()+expires);
		if (expires) {
			cookie+='; expires'+'='+oDate;
		}
		document.cookie=cookie;
	},
	get:function(){
		var cookie={};
		var all=document.cookie;
		if (all=='') {
			return cookie;
		};
		var list=all.split('; ')
		for (var i = 0; i < list.length; i++) {
			var item=list[i].split('=');
			if (decodeURIComponent(item[0])==arguments[0]) {
				return decodeURIComponent(item[1]);
			};
		};
	},
	remove:function(name,value,expires){
		this.set(name,'',new Date(0));
	}
}
//消灭顶部小黄条
var killRemind={
	remove:function(){
		var close=document.getElementsByClassName('close')[0];
		if (close.addEventListener) {
			close.addEventListener('click',this.handler,false)
		}else{
			close.attachEvent('onclick',this.handler);
		}
	},
	handler:function(){
		var remind=document.getElementById('remind');
		CookieUtil.set('name','killRemind',10);
		remind.setAttribute('id','killremind');
	},
	never:function(){
		if (CookieUtil.get('name')=='killRemind') {
			remind.setAttribute('id','killremind');
		};
	}
	// var view=document.getElementsByClassName('view')[0];
}


// **********轮播幻灯片函数***********
function scrollFunc(){
	var scroll = document.getElementsByClassName("scroll")[0];
	var oList = document.getElementsByClassName("list");
	var oCount = document.getElementsByClassName("count");	
	var oImg = oList[0].getElementsByTagName("a");
	var oNum = oCount[0].getElementsByTagName("li");
	var timer = play = null;
	var i = index = 0;	
	//切换按钮
	for (i = 0; i < oNum.length; i++)
	{
		oNum[i].index = i;
		oNum[i].onmouseover = function ()
		{
			show(this.index)
		}
	}
	//鼠标划过关闭定时器
	scroll.onmouseover = function ()
	{
		clearInterval(play)	
	};
	
	//鼠标离开启动自动播放
	scroll.onmouseout = function ()
	{
		autoPlay()
	};	
	
	//自动播放函数
	function autoPlay ()
	{
		play = setInterval(function () {
			index++;
			index >= oImg.length && (index = 0);
			show(index);		
		},5000);	
	}
	autoPlay();//应用
	//图片切换, 淡入淡出效果
	function show (a)
	{
		index = a;
		var alpha = 0;
		for (i = 0; i < oNum.length; i++)oNum[i].className = "";
		oNum[index].className = "current";
		clearInterval(timer);			
		
		for (i = 0; i < oImg.length; i++)
		{
			oImg[i].style.opacity = 0;
			oImg[i].style.filter = "alpha(opacity=0)";	
		}
		
		timer = setInterval(function () {
			alpha += 1;
			alpha > 100 && (alpha =100);
			oImg[index].style.opacity = alpha / 100;
			oImg[index].style.filter = "alpha(opacity = " + alpha + ")";
			alpha == 100 && clearInterval(timer)
		},20);
	}
};
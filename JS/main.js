window.onload = function ()
{
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
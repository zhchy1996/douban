//获得类型
function getStyle(elem, prop, fakeNode) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(elem, fakeNode)[prop];
	}else{
		return elem.currentStyle[prop];
	}
}
//添加事件
function addEvent(elem, type, handler) {
	if(elem.addEventListener) {
		elem.addEventListener(type, handler, false);
		console.log('a');
	}else if(elem.attachEvent) {
		elem['temp' + type + handler] = handler;
		elem[type + handler] = function () {
			elem['temp' + type + handler].call(elem);
		};
		elem.attachEvent('on' + type, elem[type +handler]);
	}else{
		elem['on' + type] = handler;
	}
}
//移除事件
function removeEvent(elem, type, handler) {
	if(elem.removeEventListener) {
		elem.removeEventListener(type, handler, false);
	}else if(elem.detachEvent) {
		elem.detachEvent('on' + type, handler);
	}else{
		elem['on' + type] = null;
	}
}
//停止冒泡
function stopBubble(event) {
	if(event.stopPropagation) {
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
}

//缓冲运动
function starMove1(elem, iTarget) {
	clearInterval(timer);
	var iSpeed = 0;
	timer = window.setInterval(function () {
		iSpeed = (iTarget - elem.offsetLeft) / 7;
		if (iSpeed > 0) {
			iSpeed = Math.ceil(iSpeed);
		}else{
			iSpeed = Math.floor(iSpeed);
		}
		if (elem.offsetLeft === iTarget) {
			clearInterval(timer);
		}else{
			elem.offsetLeft = elem.offsetLeft + iSpeed + 'px';
		}
	}, 30);
}




//获取样式
function getStyle (obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else {
		return window.getComputedStyle(obj, false)[attr];
	}
}


//运动部分

//这个有问题
function starNBMove1(obj, changeData, func) {
	clearInterval(obj.timer);
	var iCurvalue = 0;
	var iSpeed = 0;	
	obj.timer = window.setInterval(function () {
		var bStop = true;
		for (var name in changeData) {
			if(name === 'opacity') {
				iCurValue = parseFloat( getStyle(obj, name) ) * 100;
			}else {
				iCurValue = parseInt( getStyle(obj,name) );
			}
			iSpeed = (changeData[name] - iCurValue) / 7;
			if (iSpeed > 0) {
				iSpeed = Math.ceil(iSpeed);
			}else {
				iSpeed = Math.floor(iSpeed);
			}
			if (name === 'opacity') {
				obj.style.opacity = (iCurValue + iSpeed) / 100;
			}else {
				obj.style[name] = iCurValue + iSpeed + 'px';
			}
			if (iCurValue != changeData[name]) {
				bstop = false;
			}
		}

		if(bStop) {
			clearInterval(obj.timer);
			func();
		}
	}, 30);
}

//这个好使
function starNBMove (obj, json, func) {
            clearInterval(obj.timer);
            var iCur = 0;
            var iSpeed = 0;
            obj.timer = setInterval(function () {
                var bStop = true;
                for (var name in json) {
                    if (name === 'opacity') {
                        iCur = parseFloat( getStyle(obj, 'opacity') ) * 100;
                    }else {
                        iCur = parseInt( getStyle(obj, name) );
                    }
                    iSpeed = (json[name] - iCur) / 7;
                    if (iSpeed > 0) {
                        iSpeed = Math.ceil(iSpeed);
                    }else {
                        iSpeed = Math.floor(iSpeed);
                    }
                    if (name === 'opacity') {
                        obj.style.opacity = ( iCur + iSpeed) / 100;
                    }else {
                        obj.style[name] = iCur + iSpeed + 'px';
                    }
                    if (iCur != json[name]) {
                        bStop = false;
                    }
                }

                if (bStop) {
                    clearInterval(obj.timer);
                    func();
                }
            }, 30);
        }

//异步加载
function loadScript(url, callback) {
	var script = document.createElement('script');
	script.type = 'text/script';
	if(script.readState) {
		script.onreadystatechange = function () {
			//ie
			if(script.readyState == 'complete' || script.readyState == 'loaded') {
				tools[callback]()
			}
		}
	}else{
		script.onload = function () {
			//Safari chrome firefox opera 
			tools[callback]();
		}
	}
	script.src = url;
	document.head.appendChild(script);
}


//轮播图
//基本变量
function lunbo () {
	//轮播图
	//基本变量
	var sliderTimer = null;
	var oWrapper = document.getElementById('wrapper');
	var moveWidth = document.getElementById('wrapper').offsetWidth;
	var oSlider = document.getElementById('slider')
	var num = oSlider.children.length - 1;
	var index = 0;
	var locked = true;
	var oSliderPage = document.getElementById('sliderPage');
	var oLeftBtn = document.getElementById('lB');
	var oRightBtn = document.getElementById('rB');
	// oLeftBtn.onclick = function () {
	// 	//从右向左轮播，默认轮播方向的反向
	// 	autoMove(-1);
	// }

	oRightBtn.onclick = function () {
		//从左向右，默认轮播方向
		autoMove(1);
	}
	

	//点击索引
	function bindClickEvent () {
		var oIArray = oSliderPage.children;
		for(var i = 0; i < oIArray.length; i++) {
			oIArray[i].onclick = (function (iIndex) {

				return function () {
					clearInterval(sliderTimer);
					index = iIndex;
					starNBMove(oSlider, {left: 0 - index * moveWidth}, function () {
						changeIndex(index);
						clocked = true;
						sliderTimer = window.setInterval(autoMove, 3000);
						
					})

				}
			})(i)
		}
	}
	bindClickEvent();
	//图片移动功能
	
		function autoMove(direction) {
			if (locked) {
				locked = false;
				clearInterval(sliderTimer);
				//默认运动方向 从左向右轮播
				if(!direction || direction === 1) {
					starNBMove(oSlider, {left: oSlider.offsetLeft - moveWidth}, function () {
						//索引增加
						index++;
						// 开锁
						locked = true;
						//切换到最后一张图片 --> 回第一张
						if (Math.abs(oSlider.offsetLeft) === num * moveWidth) {
							oSlider.style.left = '0px';
							index = 0;
						}
						changeIndex(index);
						sliderTimer = window.setInterval(autoMove, 3000);
					})
				}else if (direction === -1) {

					if(oSlider.offsetLeft === 0) {

						oSlider.style.left = -num * moveWidth + 'px';
						index = num;

					}
					starNBMove(oSlider, {left: oSlider.offsetLeft + moveWidth}, function () {

						index--;
						//开锁
						locked = true;
						changeIndex(index);
						sliderTimer = window.setInterval(autoMove, 3000);
						
					})
				}
			}
		}

	

	//根据index值设定 第一个i标签有active样式
	function changeIndex (index) {
		var oIArray = oSliderPage.children;
		for(var i = 0; i < oIArray.length; i++) {
			oIArray[i].setAttribute('class', '');
		}
		oIArray[index].setAttribute('class','active');
	}

	//开启定时器 定时轮播

	sliderTimer = window.setInterval(autoMove, 3000);

}



//图片微动效果
function imgMove (oArray, dir, fin) {
	for (var i = 0; i < oArray.length;i++) {
		oArray[i].onmouseenter = function () {
			starNBMove(this, dir, function() {
				
			})
		}
		oArray[i].onmouseleave = function () {
			starNBMove(this, fin, function() {

			})
		}
		
	}
}

//滚屏函数
function scrollGO (oDiv,iTarget) {
			clearInterval(oDiv.timer);
			var iSpeed = 0;
			oDiv.timer = setInterval(function () {
				iSpeed = (iTarget - document.body.scrollTop) / 7;
				if (iSpeed > 0) {
					iSpeed = Math.ceil(iSpeed);
				}else{
					iSpeed = Math.floor(iSpeed);
				}
				if(document.body.scrollTop === iTarget) {
					clearInterval(oDiv.timer)
				}else{
					window.scrollBy(0, iSpeed);
				}
			}, 30);
		}


//二级菜单显示
function menu (oChoose,oMenu,oFather) {
	oChoose.onmouseenter = function () {
		oMenu.style.display = 'block';
		oChoose.style.backgroundColor = '#fff';
	}
	oFather.onmouseleave = function () {
		oMenu.style.display = 'none';
		oChoose.style.backgroundColor = '#e3e4e5';
	}
}



//Ajax
function Ajax (method, url, flag, data, callBack) {
	var xhr = null;
	if (window.XMLHttpRequest) {
		//chrome firefox...
		xhr = new window.XMLHttpRequest();
	}else{
		//ie
		xhr = new window.ActiveXObject('microsoft.XMLHTTP');
	}
	method = method.toUpperCase();
	if(method === 'POST') {
		xhr.open('POST', url, flag);
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}else if (method = 'GET') {
		xhr.open('GET', url + '?' + data, flag);
		xhr.send(data);
	}
	xhr.onreadystatechange = function () {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				callBack(xhr.responseText);
			}else{
				alert('err');
			}
		}
	}
}
//选项卡
function chooseItem (item, content) {
    item.children('li').click(function () {
        item.children('li').removeClass('active');
        content.children('div').removeClass('active');
        $(this).addClass('active');
        var index = $(this).index();
        if(content.children('div')) {
            content.children('div').eq(index).addClass('active');
        }else if(content.children('li')) {
            content.children('li').eq(index).addClass('active');
        }
        
    })
}



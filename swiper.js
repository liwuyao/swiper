 function swiper(options){
 	  var IsName = false;
 	  if(!options || !options.name){
 	  	console.error('name为必填')
 	  	IsName = true;
 	  };
 	  if(IsName) return;
 	  var swiperBoxName = options.name;
   	  var pageActiveDef;
   	  var interval = options.interval || 3000; //切换间隔
   	  var Steep = options.steep || 400; //切换速度
   	  var isPage; //是否需要分页器
   	  var pageWidth;//分页器宽度;
   	  var pageName;
   	  if(options.pageMsg){
   	  	 isPage = options.pageMsg.isPage || false; 
   	     pageWidth = options.pageMsg.pageWidth || 24;
   	     pageName = options.pageMsg.pageName || 'swiper-default-pages';
   	     pageActiveDef = options.pageMsg.pageActiveName || 'pageActiveDef';//小圆点默认active样式
   	     if(options.pageMsg.Elm){
   	     	if(typeof(options.pageMsg.Elm)==='function'){
	   	     	privateElm = options.pageMsg.Elm;
	   	    }
   	     }else{
   	     	privateElm = false
   	     }
   	  }
      // 轮播图
      const swiperBox = document.querySelector(swiperBoxName);
      const lis = document.querySelectorAll(swiperBoxName + ' .swiper-content li'); // 所有轮播的图片盒子
      const bannerBox = document.querySelector(swiperBoxName + ' .swiper-content');
      const prev = document.querySelector(swiperBoxName +' .prev'); //向上翻页dom
      const next = document.querySelector(swiperBoxName +' .next'); //向上翻页dom
      var len = lis.length, // 轮播图片的张数
        liWidth = swiperBox.offsetWidth, // 轮播的每张图片宽度
        currentIndex = 1, // 当前显示图片的索引
        nextIndex = 2, // 即将显示图片的索引
        circles = [], // 保存所有的小圆点
        timer = null; // 定时器ID
      for(let i = 0;i<lis.length;i++){
        lis[i].style.width =  liWidth + 'px';
      }
      // 复制第一张图片和最后一张图片，分别追加到最后和插入最开始位置
      var first = lis[0].cloneNode(true),
        last = lis[len - 1].cloneNode(true);
      bannerBox.appendChild(first);
      bannerBox.insertBefore(last, lis[0]);

      // 所有轮播过程中图片的张数增加了两张
      len += 2;
      // 设置 ul#imgs 的宽度
      bannerBox.style.width = len * liWidth + "px";
      // 设置初始显示状态
      bannerBox.style.left = -liWidth + "px";

      // 添加小圆点
      if(isPage){
      	    var pageElm = document.querySelector(swiperBoxName + ' .swiper-pages-box');
	        pageElm.style.width = (len - 2) * pageWidth + 'px';
		    for (var i = 0; i < len - 2; i++) {
		        var _div;
		        if(privateElm){
		        	_div = privateElm();
		        }else{
		        	_div = document.createElement("div");
		        }
		        _div.className = pageName;
		        pageElm.appendChild(_div); // 追加到 div#pages盒子中
		        // 将当前创建的 DOM 元素保存到数组中
		        circles.push(_div);
		        // 添加属性，保存当前小圆点的索引值
		        _div.index = i;
		
		        // 默认第一个小圆点样式
		        if (i === 0)
		          _div.className = pageActiveDef;
		
		        // 鼠标移入小圆点切换图片
		        _div.onmouseover = function(){
		          // 获取当前点击小圆点的索引
		          var idx = this.index;
		          // 修改即将切换图片的索引
		          nextIndex = idx + 1;
		          // 切换
		          move();
		        }
		    }
      }
      	// 向上翻页
      if(prev){
      	prev.onclick = function(){
			nextIndex = currentIndex - 1;
			move();
		}
      }
      	// 向下翻页
      if(next){
        next.onclick = move;
      }
      swiperBox.onmouseenter = function(){
        clearInterval(timer);
      }

      swiperBox.onmouseleave = function(){
        timer = setInterval(move, interval);
      }

      // 自动轮播
      timer = setInterval(move, interval);

      // 轮播切换的函数
      function move() {
        // 计算轮播时 ul#imgs 定位的 left 位置
        var _left = -liWidth * nextIndex;
        // 调用 animate 函数实现运动动画
        animate(bannerBox, {left:_left}, Steep, function(){
          // 判断索引是否越界
          if (nextIndex >= len) { // 最后一张图片之后图片的索引，还原
            bannerBox.style.left = -liWidth + "px";
            currentIndex = 1;
            nextIndex = 2;
          } else if (nextIndex <= 1) { // 第一张图片
            bannerBox.style.left = -liWidth * (len - 2) + "px";
            currentIndex = 3;
            nextIndex = 4;
          }
        });

        // 即将显示为红色的小圆点索引
        var circleIndex = nextIndex >= len - 1 ? 0 : (nextIndex <= 0 ? len - 3 : nextIndex - 1);
        // 修改小圆点样式
         if(isPage){
         	for (var i = 0; i < len - 2; i++){
		          circles[i].className = pageName;
		    }
		    circles[circleIndex].className = pageActiveDef;
         }
        // 修改索引值
        currentIndex = nextIndex;
        nextIndex++;
      }
      function animate(element, options, speed, fn) {
        // 先清除element元素上已有的运动动画效果
        clearInterval(element.timer);
        // 定义变量保存各属性运动初始值、运动区间
        var start = {}, range = {};
        // 为start与range对象初始化属性
        for (var attr in options) {
          // 为当前遍历到 attr 属性设置初始值
          start[attr] = parseFloat(css(element, attr));
          // 区间
          range[attr] = options[attr] - start[attr];
        }
        // 记录运动起始时间
        var startTime = +new Date();
        // 启动计时器，实现运动动画效果
        element.timer = setInterval(function(){
          // 各属性运动消耗时间
          var elapsed = Math.min(+new Date() - startTime, speed);
          // 为各属性计算运动当前值
          for (var attr in options) {
            // 根据公式计算
            var result = elapsed * range[attr] / speed + start[attr];
            // 设置当前attr属性值
            element.style[attr] = result + (attr == "opacity" ? "" : "px");
          }
          // 判断，取消计时器
          if (elapsed == speed) {
            clearInterval(element.timer);
            // 如果有运动结束后要执行的函数，则调用
            fn && fn();
          }
        }, 1000/60);
      }
//     设置css函数
      function css(element, attr) {
        // 获取
        if (typeof attr === "string")
          return window.getComputedStyle
            ? getComputedStyle(element)[attr]
            : element.currentStyle[attr];
        // 设置CSS样式
        if (typeof attr === "object") {
          for (var prop in attr) {
            element.style[prop] = attr[prop];
          }
        }
      }
    }
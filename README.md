## 简洁版的（无缝）轮播图

**简述**
此前在写很多项目的时候，需要轮播图，而网上的轮播插件功能太多，且不太方便修改成设计图样式。所以自己写了个简洁版的轮播图，
此代码并没有压缩。如果需要增加功能，可直行进行修改。另外此代码只适用于轮播图，不能拿来做tab切换。

**功能**
这是一个简洁的轮播图的插件，可以修改小圆点的样式，还有轮播的间隔和速度。


**使用**
安装：
一、直接下载git上的包，自己在html引用
二、CND

	<link rel="stylesheet" type="text/css" href="http://jscdn-1253385578.file.myqcloud.com/swiper.css"/> /css
	<script type="text/javascript" src="http://jscdn-1253385578.file.myqcloud.com/swiper.js"></script>
	
三、npm安装（适用于vue,react)
	
	npm install simple-swiper-lwy //cmd 中输入
	
	require('simple-swiper-lwy/swiper.js') //在需要的js文件中引入。vue，react中具体如何安装插件，请查看官方文档
	
html

	<div id="all-swiper" style="width: 700px;height: 300px;" class="swiper-box">
			<ul class="swiper-content">
				<li>
					<img src="img/001.jpg"/>
				</li>
				<li>
					<img src="img/002.jpg"/>
				</li>
				<li>
					<img src="img/003.jpg"/>
				</li>
			</ul>
			<div class="swiper-pages-box"></div> <!-- 分页器盒子 -->
			<div class="prev">&lt;</div> <!-- 上一页 -->
		    <div class="next">&gt;</div> <!-- 下一页 -->
	</div>

最外层的id是自己设定，用来标识此轮播图。如果不需要分页器和上一页，下一页切换键，删除就行。

js

	var calssSwiper = new swiper({
			name: '#all-swiper', //添加标识id,此项必填
			interval: 2000, // 设置间隔时间，可以不填
			steep: 500, //设置切换动画速度，可以不填
			pageMsg:{	//分页器配置项，可以不填
				isPage:true, //表明需要分页器，此项必填，
				pageName: 'all-test', //自定义分页器（小圆点）的样式，可以不填。如果填了pageActiveName，pageWidth看情况填
				pageActiveName: 'all-test-active', //自定义分页器（小圆点）active的样式，
				pageWidth: 30, //小圆点的offsetWidth，
				Elm: function(){ //自定义小分页器（小圆点的元素）
					var fatherElm = document.createElement('div');
					var childElm = document.createElement('div');
						childElm.className = 'all-test-child';
						fatherElm.appendChild(childElm);
					return fatherElm;
				}
			}
	});

再次说明：如果pageName自定义的样式和默认的差距非常大，例如高度和宽度都改变了。那么就一定要设置pageActiveName，pageWidth。
pageWidth是（小圆点）的宽度。指content + padding + border + margin;
如果需要制作更加复杂的（小圆点），请设置Elm，最外层的元素需要return。

**注**
具体使用请参考demo。有问题欢迎留言。


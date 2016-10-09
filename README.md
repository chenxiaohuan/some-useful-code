# some-useful-code
个人收藏的一些代码小技巧

- css 文本溢出显示省略号
- 方法一、
```css
.ellipsis{
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis；
}
```
- 方法二、
```css
p {
    position:relative;
    line-height:1.4em;
    /* 3 times the line-height to show 3 lines */
    height:4.2em;
    overflow:hidden;
}
p::after {
    content:"...";
    font-weight:bold;
    position:absolute;
    bottom:0;
    right:0;
    background:#fff;
}
```
- min-height: 最小高度兼容代码
```css
.minheight200{
	min-height:200px;
	height:auto !important;
	height:500px;
	overflow:visible;
}
```
- 清除浮动
```css
.clearfix::after {content:"."; display:block; height:0; visibility:hidden; clear:both; }
.clearfix { *zoom:1; }
```
- 实现在行内级元素末尾实现换行。
```css
.inline-element::after{
    content: "\A";
    white-space: pre;
}
```
- tips:有一个 Unicode 字符是专门代表换行符的：0x000A 。 在 CSS 中，这个字符可以写作 "\000A"， 或简化为 "\A"。而 white-space: pre; 的作用是保留元素后面的空白符和换行符，结合两者，就可以轻松实现在行内级元素末尾实现换行。

- 多列均匀布局
```css
.container {
  width: 400px;
  margin: 50px auto 0;
}

.justify {
  position: relative;
  width: 100%;
  height: 24px;
  text-align: justify;
  margin-bottom: 20px;
}
.justify i {
  width: 24px;
  line-height: 24px;
  display: inline-block;
  text-align: center;
  background: #333;
  color: white;
  border-radius: 50%;
  overflow: hidden;
  font-style: normal;
}
.justify:after {
  content: "";
}
.justify:after, .justify b {
  display: inline-block;
  position: relative;
  top: -28px;
  *top: -9px;
  height: 1px;
  line-height: 0;
  width: 100%;
  background: #333;
  z-index: -1;
  *zoom: 1;
}
```
```html
<div class="container">
    <div class="justify">
        <i>1</i>
        <i>2</i>
        <i>3</i>
        <i>4</i>
        <i>5</i>
        <!--[if lte IE 7]>
<b></b><![endif]--><!-- 兼容不支持伪元素的 ie678 -->
    </div>
    <div class="justify">
        <i>1</i>
        <i>2</i>
        <i>3</i>
        <i>4</i>
    </div>
    <div class="justify">
        <i>1</i>
        <i>2</i>
        <i>3</i>
    </div>  
    <div class="justify">
        <i>1</i>
        <i>2</i>
    </div>      
        <div class="justify">
        <i>1</i>
    </div>      
</div> 
```
- css伪元素实现气泡三角形
```css
.bubbly {
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    background: rgba(0,0,0,0.5);
    border-radius: .4em;
    width: 60px;
    padding: 5px 20px;
    text-align: center;
    color: #ccc;
    font-size: 100%;
}
.bubbly::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    border: 10px solid transparent;
    border-top-color: rgba(0,0,0,0.5);
    border-bottom: 0;
    border-left: 0;
    margin: 0 0 -10px -5px;
}
```
- css伪元素实现菱形
```css
.diamond{
    position: absolute;
    top:50%;
	left: 50%;
    transform:translate(-50%,-50%);
    width: 80px;
	line-height:80px;
    text-align: center;
    color: #fff;
    font-size: 100%;
}
.diamond::before{
    content: '';
    position: absolute;
    top: 0; 
	right: 0; 
	bottom: 0; 
	left: 0;
    background-color:#c65cb9;
    z-index:-1;
    transform: rotateZ(45deg);
}
```
- 利用切角、伪类、渐变、旋转实现折角
```css
.corner{
    position: absolute;
    top:50%;
	left: 50%;
    transform:translate(-50%,-50%);
    width: 120px;
	line-height:120px;
	padding:40px;
    text-align: center;
    color: #fff;
    font-size: 100%;
    background:linear-gradient(-150deg,transparent 1.5em, #777  0);
    border-radius:.5em;
}
.corner:before{
    content: '';
    position: absolute;
    top: 0; right: 0;
    background:linear-gradient(to left bottom,transparent 50%, rgba(0,0,0,.2) 0, rgba(0,0,0,.4)) 100% 0 no-repeat;
    width: 1.73em; 
	height: 3em;
    transform: translateY(-1.3em) rotate(-30deg);
    transform-origin: bottom right;
    border-bottom-left-radius: inherit;
    box-shadow: -.2em .2em .3em -.1em rgba(0,0,0,.15);
}
```

- css实现三角小图标
```css
.triangle{
	width:0;
	height:0;
	border:8px solid; 
	border-color:transparent transparent transparent #999;
}
```
- css实现a标签hover边框效果
```css
a {
    position: relative;
    display: inline-block;
    outline: none;
    text-decoration: none;
    color: #000;
}

a:hover::before, a:hover::after { position: absolute; }
a:hover::before { content: "\5B"; left: -20px; }
a:hover::after { content: "\5D"; right:  -20px; }
```

###只有一行时居中显示文字，多行居左显示，最多两行超过用省略号结尾
```html
<div class="container">
	<h2><p><em>我是单行标题居中</em></p></h2>
	<h2><p><em>我是两行标题两行标题两行标题居左</em></p></h2>
	<h2><p><em>我是超过两行的标题最后点号省略我是超过两行的标题最后点号省略</em></p></h2>
</div>
```
```css
h2 em {
	position: relative;
	font-style: normal;
	text-align: left;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.container{
	width:320px;
	padding:0 10px;
	margin:10px auto;
	background: #ddd;
}

.container p {
	display: inline-block;
	text-align: center;
}

h2{
	text-align: center;
	padding:10px 0;
}
```

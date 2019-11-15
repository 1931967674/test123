     // 获取元素
     var wrap = document.getElementById("wrap");
     var box = document.querySelector(".box");
     var bigArea = document.getElementById("bigArea");
     // 鼠标进入图片区域 才显示镜片和放大镜
     wrap.onmouseenter = function () {
         box.style.display = "block";
         bigArea.style.display = "block";
         var r = (wrap.clientWidth - box.clientWidth) / (500 - bigArea.clientWidth);
         // 绑定mousemove事件
         document.onmousemove = function (e) {
             // 计算鼠标在页面中的距离
             var mouseX = e.pageX;
             var mouseY = e.pageY;
             // 计算元素在视口中的距离
             var elementX = offset(wrap).left;
             var elementY = offset(wrap).top;
             // 计算鼠标在元素中的距离
             var resultX = mouseX - elementX - wrap.clientLeft - box.clientWidth / 2;
             var resultY = mouseY - elementY - wrap.clientTop - box.clientHeight / 2;
             if (resultX < 0) {
                 resultX = 0;
             } else if (resultX > wrap.clientWidth - box.clientWidth) {
                 resultX = wrap.clientWidth - box.clientWidth;
             }
             if (resultY < 0) {
                 resultY = 0;
             } else if (resultY > wrap.clientHeight - box.clientHeight) {
                 resultY = wrap.clientHeight - box.clientHeight;
             }
             box.style.left = resultX + "px";
             box.style.top = resultY + "px";
             bigArea.style.backgroundPositionX = -resultX / r + "px";
             bigArea.style.backgroundPositionY = -resultY / r + "px";

         }
     }
     wrap.onmouseleave = function () {
         box.style.display = "none";
         bigArea.style.display = "none";
     }

     function offset(dom) {
         // 返回一个对象
         var obj = {
             left: 0,
             top: 0
         }
         // 先让这个对象加上 dom的自己得到定位父元素的距离
         obj.left = dom.offsetLeft;
         obj.top = dom.offsetTop;
         // 判定浏览器是否是IE8 
         var isIE8 = window.navigator.userAgent.indexOf("MSIE 8") != -1;
         // 循环往上走 累加每一个offsetParent的offsetLeft和clientLeft 
         // 加每一个offsetParent的offsetTop和clientTop
         var offsetParent = dom.offsetParent;
         while (offsetParent != document.body) {
             if (isIE8) {
                 obj.left += offsetParent.offsetLeft;
                 obj.top += offsetParent.offsetTop;
             } else {
                 obj.left += offsetParent.offsetLeft + offsetParent.clientLeft;
                 obj.top += offsetParent.offsetTop + offsetParent.clientTop;
             }
             offsetParent = offsetParent.offsetParent;
         }
         return obj;
     }
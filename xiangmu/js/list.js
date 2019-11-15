
    //商品列表：
    //   1.商品渲染
    //  存cookie
    // 购物车
    //    1读写cookie 

    class List {
        constructor(options) {
            this.cont = options.cont;
            this.url = options.url;
            // console.log(this.cont);
            // console.log(this.url);

            //1.开启请求 读取数据
            this.load();
            //2.绑定事件
            this.addEvent();

        }
        load() {
            //3.调用AJAX
            var _this = this;
            // console.log(11)
            ajaxGet(this.url, function (res) {
                // console.log(ajax());
                _this.res = JSON.parse(res);

                _this.display()
            })
        }
        //4.渲染页面
        display() {
            var str = "";
            for (var i = 0; i < this.res.length; i++) {
                str += `<div class="box" index="${this.res[i].goodsId}"><a href="../html/product.html">
                                <img src="${this.res[i].img}" alt=""></a>
                                <p>${this.res[i].name}</p>
                                <span>${this.res[i].price}</span>
                                <input type="button" class="btn" value="加入购物车">
                                </div> `
            }
            this.cont.innerHTML = str;
        }
        addEvent() {
            var _this = this;
            this.cont.onclick = function (eve) {
                if (eve.target.className == "btn") {
                    //5 记录id  获取btn的父级 再获取父级的自定义属性 index
                    _this.id = eve.target.parentNode.getAttribute("index");
                    // console.log(_this.id);
                    // 6.存cookie
                    _this.setCookie();
                }
            }
        }
        setCookie() {
            //7. 存cookie部分
            // 7-1. 读取cookie
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            //判断 为空
            if (this.goods.length == 0) {
                //7-2 第一次加入购物车：cookie为空 直接加入
                this.goods.push({
                    id: this.id,
                    num: 1
                });
            } else {
                var i = 0;
                var onoff = this.goods.some((val, index) => {
                    i = index;
                    return val.id == this.id;
                });
                if (onoff) {
                    this.goods[i].num++;
                } else {
                    this.goods.push({
                        id: this.id,
                        num: 1
                    })
                }
            }
            //8.数组的操作结束后 一定要在存回cookie
            setCookie("goods", JSON.stringify(this.goods));

        }
    }
    new List({
        url: "http://localhost/xiangmu/json/cookie.json",
        cont: document.querySelector(".cont")
    })

//----------------------------------------------------


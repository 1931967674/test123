class Gou {
    // 思路：
        //读取所有商品数据
        //读取到 cookie
        // 拿到 cookie中的id与所有商品数据的goodId做比较
        // 相同了 渲染这个数据 （就是添加到购物车的商品）
    constructor(options) {
        this.url = options.url;
        this.tbody = options.tbody;
        this.load();
        //事件委托绑定事件
        this.addEvent();
        this.str=[];
    }
    load() {
        //使用ajax 读取数据
        var _this = this;
        ajaxGet(this.url, function (res) {

            _this.res = JSON.parse(res);
            _this.getCookie();
            // console.log(_this.res);
        })
    }
    //读cookie
    getCookie() {
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        // console.log(this.goods);
        this.display();
    }
    //渲染页面
    display() {
        var str = "";
        for (var i = 0; i < this.res.length; i++) {
            for (var j = 0; j < this.goods.length; j++) {
                if (this.res[i].goodsId === this.goods[j].id) {
                    str += `<tr index="${this.goods[j].id}">
                        <td><input type="checkbox" id="qx" class="qx"></td>
                                   <td><img src="${this.res[i].img}" alt=""></td>
                                      <td>${this.res[i].name}</td>
                                      <td class="pric">${this.res[i].price}</td>
                                      <td><input type="number" min="1" value="${this.goods[j].num}" class="num"></td>
                                      <td><span>删除</span></td>
                                      <td class="count">${parseInt(this.res[i].price)*(this.goods[j].num)}</td>
                                </tr>`
                }
            }
        }
        this.tbody.innerHTML = str;
    }
    addEvent() {
        var _this = this;
        //监听绑定事件 删除功能
        this.tbody.addEventListener("click", function (eve) {
            if (eve.target.tagName == "SPAN") {
                _this.id = eve.target.parentNode.parentNode.getAttribute("index");
                eve.target.parentNode.parentNode.remove();
                _this.removeCookie();
            }
            
            // ------------------------------------
            //未完成部分
            // if (eve.target.className == "qx") {
            //     //获取合计的id
            //      _this.id = eve.target.parentNode.parentNode.parentNode
            //      .nextElementSibling.firstElementChild.lastElementChild.lastElementChild.innerHTML;
            //     //获取小计的值
            //     _this.num = eve.target.parentNode.parentNode.lastElementChild.innerHTML;
            // }


        })
        //改变数量按钮
        this.tbody.addEventListener("input", function (eve) {
            if (eve.target.tagName == "INPUT") {
                _this.id = eve.target.parentNode.parentNode.getAttribute("index");
                _this.value = eve.target.value;  
            }
            if (eve.target.className == "num") {
                //获取小计id
                _this.id = eve.target.parentNode.parentNode.lastElementChild;
                //获取价格
                _this.price = eve.target.parentNode.previousElementSibling.innerHTML;
                //获取数值
                _this.num = eve.target.value;
                //改变后的价格
                _this.id.innerHTML = parseInt(_this.price * _this.num);        
            }
            _this.changeCookie();    
        }
        )    
    }
    
    removeCookie() {
        //删除
        for (var i = 0; i < goods.length; i++) {
            if (this.goods[i].id == this.id) {
                this.goods.splice(i, 1);
            }
        }
        setCookie("goods", JSON.stringify(this.goods));
    }
    changeCookie() {
        for (var i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id == this.id) {
                this.goods[i].num = this.value;
            }
        }
        setCookie("goods", JSON.stringify(this.goods));
    }

}

new Gou({
    url: "http://localhost/xiangmu/json/cookie.json",
    tbody: document.querySelector("tbody")
})




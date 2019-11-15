//l轮播图
$(".banner1").banner({
    imgs: $(".banner1").find("img"),     //必传
    left: $(".banner1").find("#left"),   //左按钮，可选
    right: $(".banner1").find("#right"), //右按钮，可选
    list: false,         //是否要小圆圈，可选，默认要     //是否要自动播放，可选，默认要
    delayTime: 2000,     //可选的，图片播放间隔时间
    moveTime: 3000,        //可选的，图片移动的时间
})
//二级菜单
$(".tt").mouseover(function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".cont").children("p").css("display", "none").eq($(this).index()-1).css("display", "block");
})
$(".tt").mouseout(function () {
    $(".cont").children("p").css("display", "none").eq($(this).index()-1).css("display", "none");
})



$(".select").click(function () {
    $(this).find("ul").slideToggle();
});
$(".select ul li").click(function () {
    var name=$(this).children("span").text();
    $(this).parents("ul").siblings("span").empty().html(name+"<i></i>")
});
/*
var docHeight=document.documentElement.clientHeight;
var mainHeight=document.getElementById("main").clientHeight;
if (mainHeight<docHeight){
    $("#main").css("height",docHeight)
}*/
$("#icon_nav").click(function () {
    $("#main").toggleClass("collapse");
});
$(function () {
    var param = window.location.hash;
    if (param.indexOf("collapse")>-1){
        $("#main").addClass("collapse");
    }
})

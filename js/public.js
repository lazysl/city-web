$(".select").click(function () {
    $(this).find("ul").slideToggle();
});
$(".select ul li").click(function () {
    var name=$(this).children("span").text();
    $(this).parents("ul").siblings("span").empty().html(name+"<i></i>")
});
var docHeight=document.documentElement.clientHeight;
var mainHeight=document.getElementById("main").clientHeight;
if (mainHeight<docHeight){
    $("#main").css("height",docHeight)
}
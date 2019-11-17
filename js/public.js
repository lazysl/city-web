$(".select").click(function () {
    $(this).find("ul").slideToggle();
});
$(".select ul li").click(function () {
    var name=$(this).children("span").text();
    $(this).parents("ul").siblings("span").empty().html(name+"<i></i>")
});
var setting={
    // www_url:"http://api.city.bli7.com",
    www_url:"http://localhost:8080",
    apiKey:"f997bc19a9410ded2c0eb17f24e0690d"
};
new Vue({
    el: "#head"
});
//获取当前时间并拼接放到div中的函数
function nowTime(){
    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var nowDate = new Date();
    // var year = nowDate.getFullYear();
    var month = nowDate.getMonth()+1;
    // month = month>9 ? month : "0" + month;
    var date = nowDate.getDate();
    // date = date>9 ? date : "0" + date;
    var hour = nowDate.getHours();
    hour = hour>9 ? hour : "0" + hour;
    var miunte = nowDate.getMinutes();
    miunte = miunte>9 ? miunte : "0" + miunte;
    var second = nowDate.getSeconds();
    second = second>9 ? second : "0" + second;

    $("#time").text(hour+":"+miunte+":"+second);
    $("#date").text(months[month-1]+" "+date+"th");
}
//加载后执行一次函数，以后每秒再执行
$(function(){
    nowTime();
    setInterval("nowTime()", 1000);
});

//Hitokoto 一言api
function Hitokoto() {
    fetch("https://v1.hitokoto.cn?encode=json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var author = !!data.from ? data.from : "无名氏";

            $('#hitokoto').text(data.hitokoto + '-「' + author + '」');
            window.setTimeout(Hitokoto, 600000); // 十分钟获取一次,可以自行修改（Hitokoto有20QPS闸值限制）
        })
        .catch(function (err) {
            console.error(err);
        });
}
Hitokoto();
$('#hitokoto').on('DOMNodeInserted',function(){
    var hitokoto_text=document.getElementById("hitokoto").innerHTML;
    if(hitokoto_text.length>60){
        Hitokoto();
    }
});

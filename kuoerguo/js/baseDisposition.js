
/*侧边栏点击*/
$(function(){
    var arr = ['tproxyInfo.html','linkInfo.html','linkBase.html','localdns.html'] ;
    for(var i= 0 ; i < $('.left_part li').length ; i++){
        if($('.left_part li').eq(i).hasClass('left_partActive')){
            $(window.parent.document).find(".leftNavInfo").text($('.left_part li').eq(i).text());
        }
        (function(i){
            $('.left_part li').eq(i).click(function(){
                $(this).addClass('left_partActive').siblings().removeClass('left_partActive');
                $(window.parent.document).find(".leftNavInfo").text($(this).text());
                $(window.parent.document).find("#mainFrame").removeAttr('src');
                $(window.parent.document).find("#mainFrame").attr('src',arr[i]);
            })
        }(i));
    }
});


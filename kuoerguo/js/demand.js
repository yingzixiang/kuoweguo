/**
 * Created by fh123 on 2017/4/26.
 */
/*侧边栏点击*/
$(function(){
    for(var i= 0 ; i < $('.left_part li').length ; i++){
        if($('.left_part li').eq(i).hasClass('left_partActive')){
            $(window.parent.document).find(".leftNavInfo").text($('.left_part li').eq(i).text());
        }
    }
});
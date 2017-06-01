//参数配置
var str = window.location.href;
var nums=str.substring(str.indexOf("?")+1);
var struse = str.substring(str.indexOf("outerNet")+8)
var str1 = struse.substring(0,struse.indexOf("?"));
var urlStr;
$(function(){
if (str1 == "Ip.html") urlStr = "http://"+realname+"/v1/iptable/";
else urlStr = "http://"+realname+"/v1/iptablewl/";	
})

  
//删除  
$(function(){
    $(document).on("click", ".delete", function(){
        var deleteTarget = $(this) ;
        layer.msg('确认删除这条信息？', {
            time: 0 //不自动关闭
            ,btn: ['确定', '取消']
            ,yes: function(index){
                layer.close(index);
                deleteTarget.parents('.listContent_item').remove();
			        var thisId2 = deleteTarget.parents('.listContent_item').find('.listId').text();
			       	$.ajax({
				 			url: urlStr +thisId2,
				 			type:'delete',
				 			dataType:'json',
				 			contentType: "application/json",
				 			success:function(data)
				 			{
				 				if(data.retcode == 0){
				 					alert("成功了!")
				 				}else {
				 					alert(data.desc)
				 				}
				 				
				 			},
				 			error:function(){
				 				alert("报错了333333！！！")
				 			}
				 	})
                layer.msg('删除成功',{icon:1});
            }
        });

    });
});
/*外网信息添加*/
$(function(){
    $('.OuterNetIpAdd').click(OutNetAdd);
});
/*OutterNet弹框信息添加函数*/
function OutNetAdd(){
    var outNet= $(".outNet").val();
    var outMask = $(".outMask").val();
    
    if(outNet == '' || outNet == null || outNet == 'undefined'){
        layer.msg('请输入outNet',{icon:2});
    }else if(outMask == '' || outMask == null || outMask == 'undefined'){
        layer.msg('请输入outMask',{icon:2});
    }else{
        var html = '' ;
    	postdata = {"NetlinkId":parseInt(nums),"Ipnet":outNet,"Mask":parseInt(outMask)}
       	$.ajax({
	 			url:urlStr,
	 			type:'post',
	 			dataType:'json',
	 			async: false,
	 			contentType: "application/json",
	 			data:JSON.stringify(postdata),
	 			success:function(data)
	 			{
	 				if(data.retcode == 0){
	 					alert("成功了!")
	 					document.location.href = str;
	 				}else {
	 					alert(data.desc)
	 				}
	 			},
	 			error:function(){
	 				alert("报错了111111！！！")
	 			}
	 	})
          //自动刷新
		  $("#outLinkSet").click();

        
    }
}
/*outterNetIp信息修改*/
$(function(){
    $(document).on("click", ".amend", function(){
        var parent = $(this).parents('.listContent_item');
        layer.msg('请在添加信息处修改信息', {
            time: 0 //不自动关闭
            ,btn: ['确定', '取消']
            ,yes: function(index){
                layer.close(index);
                $('.OuterNetIpAdd').css('display','none');
                $('.OuterNetIpChang').css('display','inline-block');

                 $(".robName option").each(function(i,n){
	                if($(n).text()==parent.children().eq(2).text())
	                {
	                    $(n).attr("selected",true);
	                    return false;
	                }
                $(".linkName option").each(function(i,n){
	                if($(n).text()==parent.children().eq(1).text())
	                {
	                    $(n).attr("selected",true);
	                    return false;
	                }
	            })
                $('.OutAddr').val(parent.children().eq(3).text());
                $('.VirtualGateway').val(parent.children().eq(4).text());
                $(".isNat option").each(function(i,n){
	                if($(n).text()==parent.children().eq(5).text())
	                {
	                    $(n).attr("selected",true);
	                    return false;
	                }
	            })
                $('.OuterNetChange').click(function(){
                changeFun(parent);
                });
            })
        }
    });
});
})
/*修改点击函数*/
function changeFun(parent){
    var startUsing2;
     $("#ddlregtype").find("option:selected").text();
    var robId = $(".robName").find("option:selected").attr("data-num"); 
    var linkId = $(".linkName").find("option:selected").attr("data-num");
    var robName =　$(".robName").find("option:selected").text();
    var linkName = $(".linkName").find("option:selected").text();
    var OutAddr = $(".OutAddr").val();
    var VirtualGateway = $(".VirtualGateway").val();
    var isNat = $(".isNat").val();
    
    if(robName == '' || robName == null || robName == '机器名' || linkName == "undefined"){
        layer.msg('请选择机器名',{icon:2});
    }if(linkName == '' || linkName == null || linkName == '链路名'|| linkName == "undefined"){
        layer.msg('请选择链路名',{icon:2});
    }else if(OutAddr == '' || OutAddr == null || OutAddr == 'undefined'){
        layer.msg('请输入外网地址',{icon:2});
    }else if(VirtualGateway == '' || VirtualGateway == null || VirtualGateway == 'undefined'){
        layer.msg('请输入虚拟网关',{icon:2});
    }else if(isNat == '' || isNat == null || isNat == 'undefined'){
        layer.msg('请选择是否启用',{icon:2});
    }else{
        var html = '' ;
         if(isNat == 0) startUsing2 = "否" ;
     	 else startUsing2 = "是" ;
     	 
        parent.children().eq(1).text(robName);
        parent.children().eq(2).text(linkName);
        parent.children().eq(3).text(OutAddr);
        parent.children().eq(4).text(VirtualGateway);
        parent.children().eq(5).text(startUsing2);
        $('.baseAdd').css('display','inline-block');
        $('.baseChange').css('display','none');
        layer.msg('信息修改成功',{icon:1});
		alert(robId)
    	postdata = {"OutlinkId":parseInt(linkId),"TproxyId":parseInt(robId),"Addr":OutAddr,"GW":VirtualGateway}
    	var thisId = parent.children().eq(0).text();
    	
       	$.ajax({
	 			url:urlStr + thisId,
	 			type:'put',
	 			dataType:'json',
	 			contentType: "application/json",
	 			data:JSON.stringify(postdata),
	 			success:function(data)
	 			{
	 				 $(".left_partActive").click();
	 				 alert("成功了!")
	 			},
	 			error:function(){
	 				alert("报错了111111！！！")
	 			}
	 	})
        
    } 
};
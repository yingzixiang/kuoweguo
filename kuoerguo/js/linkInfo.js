/**
 * Created by fh123 on 2017/4/26.
 */
/*删除功能*/
$(function(){
    $(document).on("click", ".delete", function(){
        var deleteTarget = $(this) ;
        layer.msg('确认删除这条信息？', {
            time: 0 //不自动关闭
            ,btn: ['确定', '取消']
            ,yes: function(index){
                layer.close(index);
                deleteTarget.parents('.listContent_item').remove();
			        var thisId2 = deleteTarget.parents('.listContent_item').children().eq(0).text();
			       	$.ajax({
				 			url:"http://"+realname+"/v1/outlink/" +thisId2,
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

/*tproxy信息添加*/
$(function(){
    $('.infoAdd').click(tproxyAdd);
});

/*tproxy信息添加函数*/
function tproxyAdd(){
    var linkAddr = $('.linkAddr').val();
    var linkName = $('.linkName').val();
    var linkCapacity = $('.linkCapacity').val();
    var linkRemarks = $('.linkRemarks').val();
    var linkPrice = $('.linkPrice').val();
    var startUsing = $('.startUsing').val();
    var startUsing2;
    
    if(linkAddr == '' || linkAddr == null || linkAddr == 'undefined'){
        layer.msg('请输入链路名',{icon:2});
    }else if(linkName == '' || linkName == null || linkName == 'undefined'){
        layer.msg('请输入链路别名',{icon:2});
    }else if(linkCapacity == '' || linkCapacity == null || linkCapacity == 'undefined'){
        layer.msg('请输入容量值',{icon:2});
    }else if(linkRemarks == '' || linkRemarks == null || linkRemarks == 'undefined'){
        layer.msg('请输入备注',{icon:2});
    }else if(startUsing == '' || startUsing == null || startUsing == 'undefined'){
        layer.msg('请选择是否启用',{icon:2});
    }else{
        var html = '' ;
         if(startUsing == 0) startUsing2 = "否" ;
     	 else startUsing2 = "是" ;
        
        var postdata = {"Addr":linkAddr,"Name":linkName,"Capacity":parseInt(linkCapacity),"Enable":parseInt(startUsing),"Remark": linkRemarks, "Unavailable": 1}
       	$.ajax({
	 			url:"http://"+realname+"/v1/outlink",
	 			type:'post',
	 			dataType:'json',
	 			contentType: "application/json",
	 			data:JSON.stringify(postdata),
	 			success:function(data)
	 			{
	 				 
	 				if(data.retcode == 0){
	 					$("#linkInfo").click()
	 					alert("成功了!")
	 				}else {
	 					alert(data.desc)
	 				}
	 				
	 			},
	 			error:function(){
	 				alert("报错了111111！！！")
	 			}
	 	})
        

        
    }
}

/*linkinfo信息修改*/
$(function(){
    $(document).on("click", ".amend", function(){
        var parent = $(this).parents('.listContent_item');
        layer.msg('请在添加信息处修改信息', {
            time: 0 //不自动关闭
            ,btn: ['确定', '取消']
            ,yes: function(index){
                layer.close(index);
                $('.infoAdd').css('display','none');
                $('.infoChange').css('display','inline-block');
                $('.linkAddr').val(parent.children().eq(1).text()) ;
                $('.linkName').val(parent.children().eq(2).text());
                $('.linkCapacity').val(parent.children().eq(3).text());
                $('.linkRemarks').val(parent.children().eq(7).text());
                $('.linkPrice').val(parent.children().eq(4).text());
                $('.startUsing').val(0);
                $('.infoChange').click(function(){
                    changeFun(parent);
                });
            }
        });
      
        
    });
});

/*修改点击函数*/
function changeFun(parent){
    var linkAddr = $('.linkAddr').val();
    var linkName = $('.linkName').val();
    var linkCapacity = $('.linkCapacity').val();
    var linkRemarks = $('.linkRemarks').val();
    var linkPrice = $('.linkPrice').val();
    var startUsing = $('.startUsing').val();
    var startUsing1;
    if(linkAddr == '' || linkAddr == null || linkAddr == 'undefined'){
        layer.msg('请输入链路名',{icon:2});
    }else if(linkName == '' || linkName == null || linkName == 'undefined'){
        layer.msg('请输入链路别名',{icon:2});
    }else if(linkCapacity == '' || linkCapacity == null || linkCapacity == 'undefined'){
        layer.msg('请输入容量值',{icon:2});
    }else if(linkRemarks == '' || linkRemarks == null || linkRemarks == 'undefined'){
        layer.msg('请输入备注',{icon:2});
    }else if(startUsing == '' || startUsing == null || startUsing == 'undefined'){
        layer.msg('请选择是否启用',{icon:2});
    }else{
    	
    	if(startUsing == 0) startUsing1 = "否" ;
        else startUsing1 = "是" ;
    }
      var postdata2 = {"Addr":linkAddr,"Name":linkName,"Capacity":parseInt(linkCapacity),"Enable":parseInt(startUsing),"Remark": linkRemarks, "Unavailable": 1}
      var thisId = parent.children().eq(0).text();
       	$.ajax({
	 			url:"http://"+realname+"/v1/outlink/"+thisId,
	 			type:'put',
	 			dataType:'json',
	 			contentType: "application/json",
	 			data:JSON.stringify(postdata2),
	 			success:function(data)
	 			{
	 				if(data.retcode == 0){
	 					$("#linkInfo").click()
	 					alert("成功了!")
	 				}else {
	 					$('.infoAdd').css('display','inline-block');
               	 		$('.infoChange').css('display','none');
	 					alert(data.desc)
	 				}
	 				
	 			},
	 			error:function(){
	 				alert("报错了111111！！！")
	 			}
	 	})  
};

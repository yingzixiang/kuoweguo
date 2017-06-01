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
			        var thisId2 = deleteTarget.parents('.listContent_item').find('.change').eq(0).text();
			       	$.ajax({
				 			url:"http://"+realname+"/v1/tproxy/" +thisId2,
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
    $('.tproxyAdd').click(tproxyAdd);
});

/*tproxy信息添加函数*/
function tproxyAdd(){
    var machineName = $('.machineName').val();
    var machineCapacity = $('.machineCapacity').val();
    var machineRemarks = $('.machineRemarks').val();
    var machineIp = $('.machineIp').val();
    var userMode = $('.userMode').val();
    var startUsing = $('.startUsing').val();
    var startUsing2;
    
    if(machineName == '' || machineName == null || machineName == 'undefined'){
        layer.msg('请输入机器名',{icon:2});
    }else if(machineCapacity == '' || machineCapacity == null || machineCapacity == 'undefined'){
        layer.msg('请输入机器容量',{icon:2});
    }else if(machineRemarks == '' || machineRemarks == null || machineRemarks == 'undefined'){
        layer.msg('请输入备注',{icon:2});
    }else if(machineIp == '' || machineIp == null || machineIp == 'undefined'){
        layer.msg('请输入机器ip',{icon:2});
    }else if(startUsing == '' || startUsing == null || startUsing == 'undefined'){
        layer.msg('请选择是否启用',{icon:2});
    }else{
        var html = '' ;
         if(startUsing == 0) startUsing2 = "否" ;
     	 else startUsing2 = "是" ;
        
        var postdata = {"Addr":machineIp,"Name":machineName,"Capacity":parseInt(machineCapacity),"Enable":parseInt(startUsing),"Remark": machineRemarks, "Unavailable": 1}
       	$.ajax({
	 			url:"http://"+realname+"/v1/tproxy/?username=test&password=test",
	 			type:'post',
	 			dataType:'json',
	 			contentType: "application/json",
	 			data:JSON.stringify(postdata),
	 			success:function(data)
	 			{
	 				 
	 				if(data.retcode == 0){
	 					
				        html = '<div class="listContent_item">';
				        html += '<div class="change"><span>'+ data.value + '</span></div>';
				        html += '<div class="change"><span>'+ machineName+'</span></div>';
				        html += '<div class="change"><span>'+machineIp+'</span></div>';
				        html += '<div class="change"><span>'+machineCapacity+'</span></div>';
				        html += '<div class="change"><span>'+startUsing2+'</span></div>';
				        html += '<div class="change"><span>不可用</span></div>';
				        html += '<div class="second change"><span>'+machineRemarks+'</span></div>';
				        html += '<div><span class="amend">修改 </span><span> / <span class="delete"> 删除</span></span></div>';
				        html += '<div class="clear"></div>';
				        html += '</div>';
				        if($('.listContent_item').length == 0){
				            $('.listContent').html(html);
				        }else{
				            $('.listContent_item').last().after(html);
				        }
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

/*tproxy信息修改*/
$(function(){
    $(document).on("click", ".amend", function(){
        var parent = $(this).parents('.listContent_item');
        layer.msg('请在添加信息处修改信息', {
            time: 0 //不自动关闭
            ,btn: ['确定', '取消']
            ,yes: function(index){
                layer.close(index);
                $('.tproxyAdd').css('display','none');
                $('.tproxyChange').css('display','inline-block');
                $('.machineName').val(parent.find('.change').eq(1).text()) ;
                $('.machineCapacity').val(parent.find('.change').eq(3).text());
                $('.machineRemarks').val(parent.find('.change').eq(6).text());
                $('.machineIp').val(parent.find('.change').eq(2).text());
                $('.userMode').val(parent.find('.change').eq(4).text());
                $('.startUsing').val(0);
                $('.tproxyChange').click(function(){
                    changeFun(parent);
                });
            }
        });
      
        
    });
});

/*修改点击函数*/
function changeFun(parent){
    var machineName = $('.machineName').val();
    var machineCapacity = $('.machineCapacity').val();
    var machineRemarks = $('.machineRemarks').val();
    var machineIp = $('.machineIp').val();
    var userMode = $('.userMode').val();
    var startUsing = $('.startUsing').val();
    var startUsing1;
    if(machineName == '' || machineName == null || machineName == 'undefined'){
        layer.msg('请输入机器名',{icon:2});
    }else if(machineCapacity == '' || machineCapacity == null || machineCapacity == 'undefined'){
        layer.msg('请输入机器容量',{icon:2});
    }else if(machineRemarks == '' || machineRemarks == null || machineRemarks == 'undefined'){
        layer.msg('请输入备注',{icon:2});
    }else if(machineIp == '' || machineIp == null || machineIp == 'undefined'){
        layer.msg('请输入机器ip',{icon:2});
    }else if(startUsing == '' || startUsing == null || startUsing == 'undefined'){
        layer.msg('请选择是否启用',{icon:2});
    }else{
    	
    	if(startUsing == 0) startUsing1 = "否" ;
        else startUsing1 = "是" ;
        parent.find('.change').eq(1).text(machineName);
        parent.find('.change').eq(2).text(machineIp);
        parent.find('.change').eq(3).text(machineCapacity);
        parent.find('.change').eq(4).text(startUsing1);
        parent.find('.change').eq(5).text(userMode);
        parent.find('.change').eq(6).text(machineRemarks);
        $('.tproxyAdd').css('display','inline-block');
        $('.tproxyChange').css('display','none');
        layer.msg('信息修改成功',{icon:1});
    }
        
      var postdata2 = {"Addr":machineIp,"Name":machineName,"Capacity":parseInt(machineCapacity),"Enable":parseInt(startUsing),"Remark": machineRemarks, "Unavailable": 1}
      var thisId = parent.find('.change').eq(0).text();
       	$.ajax({
	 			url:"http://"+realname+"/v1/tproxy/"+thisId,
	 			type:'put',
	 			dataType:'json',
	 			contentType: "application/json",
	 			data:JSON.stringify(postdata2),
	 			success:function(data)
	 			{
	 				if(data.retcode == 0){
	 					alert("成功了!")
	 				}else {
	 					alert(data.desc)
	 				}
	 				
	 			},
	 			error:function(){
	 				alert("报错了111111！！！")
	 			}
	 	})  
};

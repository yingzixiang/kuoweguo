//删除
$(function(){
    $(document).on("click", ".delete", function(){
        var deleteTarget = $(this) ;
        layer.msg('确认删除这条信息？', {
            time: 0 //不自动关闭
            ,btn: ['确定', '取消']
            ,yes: function(index){
                layer.close(index);
			    var deleteNum =  parent.children().eq(2).text();
			       	$.ajax({
				 			url: "http://" + realname + "/v1/route/"+deleteNum ,
				 			type:'delete',
				 			dataType:'json',
				 			contentType: "application/json",
				 			success:function(data)
				 			{
				 				if(data.retcode == 0){
				 					var deleteNum =  deleteTarget.parents('.listContent_item').children().eq(2).text();
				 					deleteTarget.parents('.listContent_item').remove();
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

/*点击添加*/
$(function(){
    $('.infoAdd').click(OutNetAdd);
});
/*弹框信息添加函数*/
function OutNetAdd(){
    var route_en_add = $(".route_en_add").find("option:selected").val();
    var routeset_id;
    var netlinkset_id = $(".outNet_add").find("option:selected").val();
    var outlink_addr = $(".outlink_addr_add").find("option:selected").val();
	var priority = $(".route_priority").val();
	var str1 = window.location.href;
	var nums1=str1.substring(str1.indexOf("?%C2%A0")+7);
	
	if(priority == "" || priority == "undefined" || priority == null){
		alert("priority值不能为空！！！")
		return false;
	}
	$.ajax({
		url: "http://" + realname + "/v1/viewer/route?clientsetname="+nums1,
		type: 'get',
		dataType: 'json',
		async: false,
		data:JSON.stringify(postdata),
		success: function(data) {
			if(data.retcode == 0) {
				routeset_id = data.value
			}else{
				alert("未获取到routeset_id!")
			}
		},
		error: function() {
			alert("routeset_id 报错了！！！")
		}
	})
	var postdata = {
						"Enable":parseInt(route_en_add),
						"NetlinksetId":parseInt(netlinkset_id),
						"OutlinkId":parseInt(outlink_addr),
						"Priority":parseInt(priority),
						"RoutesetId":parseInt(routeset_id),
					}
	$.ajax({
		url: "http://" + realname + "/v1/route/",
		type: 'post',
		dataType: 'json',
		data:JSON.stringify(postdata),
		success: function(data) {
			debugger
			if(data.retcode == 0) {
				debugger;
				document.location.href = window.location.href;
			}else{
				alert(data.retcode)
			}
		},
		error: function() {
			alert("报错了！！！")
		}
	})
}

//点击修改
$(function(){
    $(document).on("click", ".amend", function(){
        var parent = $(this).parents('.listContent_item');
        layer.msg('请在添加信息处修改信息', {
            time: 0 //不自动关闭
            ,btn: ['确定', '取消']
            ,yes: function(index){
            	parent.find(".change-delete").css("display","none");
				parent.find(".confirm").css("display","inline-block");
                layer.close(index);
                changeFun(parent)
            }
        })
    });
});
//点击保存
$(function(){
    $(document).on("click", ".confirm", function(){
        var parent = $(this).parents('.listContent_item');
        layer.msg('请在添加信息处修改信息', {
            time: 0 //不自动关闭
            ,btn: ['确定', '取消']
            ,yes: function(index){
            	parent.find(".change-delete").css("display","none");
				parent.find(".confirm").css("display","inline-block");
                layer.close(index);
                submitList(parent)
            }
        })
    });
});
/*修改点击函数*/
function changeFun(parent){
	$("select").removeAttr("disabled")
	$("input").removeAttr("disabled")
	$.ajax({
		url: "http://" + realname + "/v1/outlink/",
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if(data.retcode == 0) {
				var changeHtml = "";
				for(var i=0; i<data.value.length; i++){
					changeHtml += '<option value="'+ data.value[i].Id +'">'+ data.value[i].Name +'</option>'
				}
				$(".outlink_addr").html(changeHtml)
			}
		},
		error: function() {
			alert("报错了！！！")
		}
	})
};
/*保存点击函数*/
function submitList(parent){
    var route_en = $(".route_en").find("option:selected").val();
    var routeset_id = parent.children().eq(1).text();
    var route_id = parent.children().eq(2).text();
    var netlinkset_id = parent.children().eq(0).text();
    var outlink_addr = $(".outlink_addr").find("option:selected").val();
	var priority = parent.children().find(".priority").val();
	
	if(priority == "" || priority == "undefined" || priority == null){
		alert("priority值不能为空！！！")
		return false;
	}
	
	var postdata = {
						"Enable":parseInt(route_en),
						"Id":parseInt(route_id),
						"NetlinksetId":parseInt(netlinkset_id),
						"OutlinkId":parseInt(outlink_addr),
						"Priority":parseInt(priority),
						"RoutesetId":parseInt(routeset_id)
					}
	$.ajax({
		url: "http://" + realname + "/v1/route/",
		type: 'post',
		dataType: 'json',
		data:JSON.stringify(postdata),
		success: function(data) {
			if(data.retcode == 0) {
				debugger;
				document.location.href = window.location.href;
			}else{
				alert(data.retcode)
			}
		},
		error: function() {
			alert("报错了！！！")
		}
	})
}

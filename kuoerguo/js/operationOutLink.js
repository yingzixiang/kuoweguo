var str = window.location.href;
var struse = str.substring(str.indexOf("out")+3)
var urlStr ="";

$(function(){
	urlStr = "http://"+realname+"/v1/netlink/";
	if (struse == "erNet.html"){
		btnClick = $("#OutlinkAddr")
	} 
	else if (struse == "NetCase.html"){
		btnClick = $("#OutlinkCaseAddr")
	} 
})

/*删除功能*/
$(function() {
	
	$(document).on("click", ".delete", function() {
		var deleteTarget = $(this);
		layer.msg('确认删除这条信息？', {
			time: 0 //不自动关闭
				,
			btn: ['确定', '取消'],
			yes: function(index) {
				layer.close(index);
				deleteTarget.parents('.listContent_item').remove();
				var thisId2 = deleteTarget.parents('.listContent_item').find('.listId').text();
				$.ajax({
					url: urlStr + thisId2,
					type: 'delete',
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						if(data.retcode == 0) {
							alert("成功了!")
						} else {
							alert(data.desc)
						}
					},
					error: function() {
						alert("报错了333333！！！")
					}
				})
				layer.msg('删除成功', {
					icon: 1
				});
			}
		});

	});
});

/*外网信息信息添加*/
$(function() {
	$(".OuterNetAdd").click(OutlinkAdd);
});

/*tproxy信息添加函数*/
function OutlinkAdd() {

	var OuterNetRemarks = $('.OuterNetRemarks').val();
	var OuterNetAddr = $('.OuterNetAddr').val();
	var startUsing = $('.traffic-scheduling').val();
	if(OuterNetAddr == '' || OuterNetAddr == null || OuterNetAddr == 'undefined') {
		layer.msg('外网地址', {
			icon: 2
		});
	} else if(startUsing == '' || startUsing == null || startUsing == 'undefined') {
		layer.msg('请选择是否流量监控', {
			icon: 2
		});
	} else {
		var html = '';
		var postdata1 = {
			"Isp": OuterNetAddr,
			"Region": OuterNetRemarks,
			"Typ": ""
		}
		
		$.ajax({
			url: urlStr,
			type: 'post',
			dataType: 'json',
			contentType: "application/json",
			data: JSON.stringify(postdata1),
			success: function(data) {
				if(data.retcode == 0) {
					alert("成功了!")
					btnClick.click();
				} else {
					alert(data.desc)
				}
			},
			error: function() {
				alert("报错了111111！！！")
			}
		})

	}
}

/*外网信息修改*/
$(function() {
	$(document).on("click", ".amend", function() {
		var parent = $(this).parents('.listContent_item');
		layer.msg('请在添加信息处修改信息', {
			time: 0 //不自动关闭
				,
			btn: ['确定', '取消'],
			yes: function(index) {
				var OuterNetRemarks = $('.OuterNetRemarks').val();
				var OuterNetAddr = $('.OuterNetAddr').val();
				var startUsing = $('.traffic-scheduling').val();

				layer.close(index);
				$('.OuterNetAdd').css('display', 'none');
				$('.OuterNetChange').css('display', 'inline-block');
				$('.OuterNetAddr').val(parent.children().eq(1).text());
				$('.OuterNetRemarks').val(parent.children().eq(2).text());
				$('.OuterNetChange').click(function() {
					changeFun(parent);
				});
			}
		});

	});
});

/*修改点击函数*/
function changeFun(parent) {

	var OuterNetRemarks = $('.OuterNetRemarks').val();
	var OuterNetAddr = $('.OuterNetAddr').val();
	var startUsing = $('.traffic-scheduling').val();
	if(OuterNetAddr == '' || OuterNetAddr == null || OuterNetAddr == 'undefined') {
		layer.msg('外网地址', {
			icon: 2
		});
	} else if(startUsing == '' || startUsing == null || startUsing == 'undefined') {
		layer.msg('请选择是否流量监控', {
			icon: 2
		});
	} else {
		$('.tproxyAdd').css('display', 'inline-block');
		$('.tproxyChange').css('display', 'none');
		layer.msg('信息修改成功', {
			icon: 1
		});
	}

	var postdata ='';
		var postdata2 = {
			"Isp": OuterNetAddr,
			"Region": OuterNetRemarks,
			"Typ": ""
		}
		
	var thisId = parent.children().eq(0).text();
	$.ajax({
		url: urlStr + thisId,
		type: 'put',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(postdata2),
		success: function(data) {
			if(data.retcode == 0) {
				alert("成功了!")
				$("#OutlinkAddr").click();
			} else {
				alert(data.desc)
				$('.OuterNetAdd').css('display', 'inline-block');
				$('.OuterNetChange').css('display', 'none');
			}

		},
		error: function() {
			alert("报错了111111！！！")
		}
	})
};
var str = window.location.href;
var struse = str.substring(str.indexOf("innerNet")+8)
var urlStr ="";
var btnClick="";
$(function(){
	urlStr = "http://"+realname+"/v1/netlink/";
	if (struse == ".html"){
		btnClick = $("#InnerLinkAddr")
	} 
	else{
		btnClick = $("#InnerLinkCaseAddr")
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
					url: "http://" + realname + "/v1/clientset/" + thisId2,
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

/*tproxy信息添加*/
$(function() {
	$('.add').click(InnerlinkAdd);
});

/*tproxy信息添加函数*/
function InnerlinkAdd() {

	var InnerNetRemarks = $('.InnerNetRemarks').val();
	var InnerNetAddr = $('.InnerNetAddr').val();
	var startUsing = $('.traffic-scheduling').val();
	if(InnerNetAddr == '' || InnerNetAddr == null || InnerNetAddr == 'undefined') {
		layer.msg('外网地址', {
			icon: 2
		});
	} else if(startUsing == '' || startUsing == null || startUsing == 'undefined') {
		layer.msg('请选择是否流量监控', {
			icon: 2
		});
	} else {
		var html = '';
		var postdata = {
			"Name": InnerNetAddr,
			"Info": InnerNetRemarks,
		}
		$.ajax({
			url: "http://" + realname + "/v1/clientset/",
			type: 'post',
			dataType: 'json',
			contentType: "application/json",
			data: JSON.stringify(postdata),
			success: function(data) {
				if(data.retcode == 0) {
					alert("成功了!")
					btnClick.click()
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

/*内网地址信息修改*/
$(function() {
	$(document).on("click", ".amend", function() {
		var parent = $(this).parents('.listContent_item');
		layer.msg('请在添加信息处修改信息', {
			time: 0 //不自动关闭
				,
			btn: ['确定', '取消'],
			yes: function(index) {
				var InnerNetRemarks = $('.InnerNetRemarks').val();
				var InnerNetAddr = $('.InnerNetAddr').val();
				var startUsing = $('.traffic-scheduling').val();

				layer.close(index);
				$('.InnerNetAdd').css('display', 'none');
				$('.InnerNetChange').css('display', 'inline-block');
				$('.InnerNetAddr').val(parent.children().eq(1).text());
				$('.InnerNetRemarks').val(parent.children().eq(2).text());
				$('.InnerNetChange').click(function() {
					changeFun(parent);
				});
			}
		});

	});
});

/*修改点击函数*/
function changeFun(parent) {

	var NetRemarks = $('.InnerNetRemarks').val();
	var InnerNetAddr = $('.InnerNetAddr').val();
	var startUsing = $('.traffic-scheduling').val();
	if(InnerNetAddr == '' || InnerNetAddr == null || InnerNetAddr == 'undefined') {
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

	var postdata2 = {
		"Isp": InnerNetAddr,
		"Region": InnerNetRemarks,
		"Typ": "",
		"Enable": startUsing
	}
	var thisId = parent.children().eq(0).text();
	$.ajax({
		url: "http://" + realname + "/v1/clientset/" + thisId,
		type: 'put',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(postdata2),
		success: function(data) {
			if(data.retcode == 0) {
				alert("成功了!")
				$("#InnerLinkAddr").click();
			} else {
				alert(data.desc)
			}

		},
		error: function() {
			alert("报错了111111！！！")
		}
	})
};
/**
 * Created by fh123 on 2017/4/25.
 */
	var numVal,numVal1,outIp;
/*侧边栏点击*/
$(function() {
	var arr = ['outerNet.html', 'outNetCase.html' ,'innerNet.html','innerNetCase.html'];
	for(var i = 0; i < $('.left_part li').length; i++) {
		
		if($('.left_part li').eq(i).hasClass('left_partActive')) {
			$(window.parent.document).find(".leftNavInfo").text($('.left_part li').eq(i).text());
		}
		(function(i) {
			$('.left_part li').eq(i).click(function() {
				$(this).addClass('left_partActive').siblings().removeClass('left_partActive');
				$(window.parent.document).find(".leftNavInfo").text($(this).text());
				$(window.parent.document).find("#mainFrame").removeAttr('src');
				$(window.parent.document).find("#mainFrame").attr('src', arr[i]);
			})
		}(i));
	}
});

		/*外网地址点击弹出框*/
	
		function clickOut(obj) {
		 numVal = $(obj).parent().children().eq(0).text();
			layer.open({
				type: 2,
				area: ['900px', '500px'],
				skin: 'layui-layer-rim',
				content: ['outerNetIp.html?'+numVal, 'no'],
				success: function() {
					$("#layui-layer1").attr("title",numVal)
				}
			});
		}
		
		
		/*外网地址特例点击弹出框*/
	
		function clickOutCase(obj) {
		 numVal = $(obj).parent().children().eq(0).text();
			layer.open({
				type: 2,
				area: ['900px', '500px'],
				skin: 'layui-layer-rim',
				content: ['OutNetCaseIp.html?'+numVal, 'no'],
				success: function() {
					$("#layui-layer1").attr("title",numVal)
				}
			});
		}
		
		//内网function clickInnerCase(obj) {
		 function clickInner(obj) {
		 numVal = $(obj).parent().children().eq(0).text();
			layer.open({
				type: 2,
				area: ['900px', '500px'],
				skin: 'layui-layer-rim',
				content: ['innerNetIp.html?'+numVal, 'no'],
				success: function() {
					$("#layui-layer1").attr("title",numVal)
				}
			});
		}
		
		//内网地址特例点击弹框
		function clickInnerCase(obj) {
		 numVal = $(obj).parent().children().eq(0).text();
			layer.open({
				type: 2,
				area: ['900px', '500px'],
				skin: 'layui-layer-rim',
				content: ['innerNetCaseIp.html?'+numVal, 'no'],
				success: function() {
					$("#layui-layer1").attr("title",numVal)
				}
			});
		}
	



		//流量调度默认出口特例点击弹框
		function flowDispatch(obj) {
		  outIp = $(obj).parent().children().eq(0).text();
			layer.open({
				type: 2,
				area: ['1080px', '700px'],
				skin: 'layui-layer-rim',
				content: ['flowDispatchIp.html?'+outIp, 'no'],
				success: function() {
					
				}
			});
		}


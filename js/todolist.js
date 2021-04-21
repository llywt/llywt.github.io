//不管按下回车 还是点击复选框 都是吧本地存储的数据加载到页面中 ， 这样保证刷新关闭页面不会丢失数据
//本地存储 localStorage.setItem（‘’，）   localStorage.getItem('')
//本地存储只会存储字符串的数据格式  用 JSON.stringify() 转换
//获取本地存储的时候 需要转换为原先的数组格式  JSON.parse()
			//存储数据的格式  var todolist = [{tltle:'xxx',done:false}]
			// var todolist = [{title:'123',done:false}]
			// localStorage.setItem("todo",JSON.stringify(todolist));
			// var data = localStorage.getItem('todo')
			// data = JSON.parse(data)
			// console.log(data[0].title)
			
			
$(function(){
	//按下回车键 完整的数据 存储到本地存储里面
	//13是回车建
	load()
	var todolist = []
	$('#title').on('keydown',function(even){
		if($(this).val()==0){
			
		}else {
			if(even.keyCode === 13){
				//alert(11)
				//先读取本地存储原来的数据
				todolist = getDate()
				//console.log(todolist)
				//更新local  把最新的数组追加给local[]   用push
				todolist.push({title:$(this).val(),done:false})
				//把这个数组存储到本地
				saveDate(todolist)//todolist传入的是局部变量  需要传给外部使用
				load()//渲染界面
				$(this).val("")
			}
		}
	})
	
	//读取本地存储数据的函数  方便以后调用
	function getDate(){
		var data = localStorage.getItem('todolist')
		if(data !== null) {
			//本地存储的是字符串格式JSON.strigify()   我们需要的是对象格式JSON.parse()
			return JSON.parse(data)
		} else {
			return [];
		}
	}
	//保存本地存储的函数
	function saveDate(data){
		//用新的数组覆盖原先的数组
		localStorage.setItem('todolist',JSON.stringify(data))
	}
	
	//渲染加载函数
	function load(){
		//读取本地存储的数据
		var data = getDate()
		var todocount = 0//正在进行个数的变量
		var donecount = 0//已经完成个数的变量
		//console.log(data)
		//遍历本地数据  有几个就生成几个li..
		//遍历之前要清空ol里面的元素
		//$('ol li').remove()也可以用
		$('ol').empty()
		$('ul').empty()
		$.each(data,function(i,n){
			//console.log(n)
			if(n.done){
					$('ul').prepend('<li><input type="checkbox" checked="checked"/> <p>'+n.title+'</p> <a href="#"  id='+i+'></a> </li>')
					donecount++
			}else {
				 $('ol').prepend('<li><input type="checkbox"/> <p>'+n.title+'</p> <a href="#"  id='+i+'></a> </li>')
					todocount++
			}
		})
		$('#todocount').text(todocount)
		$('#donecount').text(donecount)
	}
	//删除操作
	$('ol,ul').on('click','a',function(){
		//先获取本地存储
		var data = getDate()
		//修改数据
		var index = $(this).attr('id')
		//console.log(index)
		data.splice(index,1)
		//保存到本地
		saveDate(data)
		load()
		//重新渲染界面
	})
	
	//复选框操作
	$('ul,ol').on('click','input',function(){
		//先获取本地存储的数据
		var data = getDate()
		//修改数据  点击之前done为false 点击之后done为true   
		var index = $(this).siblings('a').attr('id');
		data[index].done = $(this).prop('checked')
		//保存到本地存储
		saveDate(data)
		//渲染
		load()
	})
})

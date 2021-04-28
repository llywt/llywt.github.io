$(function(){
// <!-- //轮播图js -->
		var swiper = new Swiper('.swiper-container', {
		  slidesPerView: 3,
		  spaceBetween: 30,
		  centeredSlides: true,
		  loop: true,
		  pagination: {
			clickable: true,
		  },
		  navigation: {
            nextEl: '.swiper-button-next',
        	prevEl: '.swiper-button-prev',
      	  },
			autoplay:true,
		});

//点击首页 
        $('.hide').eq(0).show()
        $('.show').eq(0).hide()
        $('.hide').eq(0).parent('span').siblings('p').css('color','#ff9700')
        $('footer>ul').on('click','li',function(){
             $(this).children('span').children('.hide').show()
             $(this).siblings('li').children('span').children('.hide').hide()
             $(this).children('span').children('.show').hide()
             $(this).siblings('li').children('span').children('.show').show()
             //文字
             $(this).children('p').css('color','#ff9700')
             $(this).siblings('li').children('p').css('color','')
        })

//点击书架
$('footer ul li').on('click',function(){
    //console.log($(this).index());
    if($(this).index()==0){
        $('.shouye').show()
        $('.find').hide()
        $('.bookrack').hide()
        $('.mine').hide()
    }else if($(this).index()==1){
        $('.shouye').hide()
        $('.find').show()
        $('.bookrack').hide()
        $('.mine').hide()
    }else if($(this).index()==2){
        $('.shouye').hide()
        $('.find').hide()
        $('.bookrack').show()
        $('.mine').hide()
    }else {
        $('.shouye').hide()
        $('.find').hide()
        $('.bookrack').hide()
        $('.mine').show()
    }
})
//点击图书时的交互
$('.bookrack ul li').on ('click','img,p',function(){
    // alert(11)
    $('.bookrack').hide()
    $('.lookbook').show()
    $('footer').hide()

})
//删除点击事件
$('.del').on('click',function(){
    alert(22)
})
//点击目录
$('.left_btn').on('click',function(){
    $('.mulu').toggle(300)
    $('.lookbook_top').slideToggle(200)
})
// //点击漫画内容
// $('.lookbook_banner>img').on('click',function () {
//     $('.mulu').hide(200)
//     $('.lookbook_top').slideUp(200)
// })
//点击下一页
var data = [{index:1,indexs:2}]
$('.right_btn').on('click',function(){
    if($('.mulu').css('display')=='block'){
        $('.mulu').hide(300)
        $('.lookbook_top').slideUp(200)
    }else{
        $('.lookbook_banner').children('img').prop('src','cartoon/(1)10番外篇/'+(data[0].indexs-1)+'.jpg').hide()
        $('.lookbook_banner').children('img').prop('src','cartoon/(1)10番外篇/'+data[0].indexs+'.jpg').show()
        data[0].indexs++
        $('.mulu').hide(300)
        $('.lookbook_top').slideUp(200)   
    }

})
//点击上一页

//数据处理
//数据本地存储
//数据格式var a = [{index:1,indexs:1}]
var cartoon = []
function saveDate(data){
    localStorage.setItem('cartoon',JSON.stringify(data))
}
//本地数据的读取
function getDate(){
    var data = localStorage.getItem('cartoon')
    if(data!=null){
        return JSON.parse(data)
    }else {
        return []
    }
}






 

//cartoon/(1)10番外篇/6.jpg
})


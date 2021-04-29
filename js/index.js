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
    $('.lookbook').fadeIn(400)
    $('footer').slideUp(200)
    $('.lookbook_top').slideUp(400)
    var data2 = parseInt(getNum2())
    // console.log(num2)
    data1 = saveNum1('(1)10番外篇')
    data1 = getNum1()
    $('.lookbook_banner').children('img').prop('src','cartoon/'+data1+'/'+data2+'.jpg')
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
//点击下一页
$('.right_btn').on('click',function(){
    if($('.mulu').css('display')=='block'){
        $('.mulu').hide(300)
        $('.lookbook_top').slideUp(200)
    }else{
        data1 =getNum1()
        data2 = parseInt(getNum2())
        data2++
        saveNum2(data2)
        $('.lookbook_banner').children('img').prop('src','cartoon/'+data1+'/'+(data2-1)+'.jpg').hide()
        $('.lookbook_banner').children('img').prop('src','cartoon/'+data1+'/'+data2+'.jpg').show()
        $('.mulu').hide(300)
        $('.lookbook_top').slideUp(200)
    }
})
//点击上一页
$('.up_btn').on('click',function(){
    data1 =getNum1()
    data2 = parseInt(getNum2())
    if(data2>1){
        data2--
        $('.lookbook_banner').children('img').prop('src','cartoon/'+data1+'/'+(data2+1)+'.jpg').hide()
        $('.lookbook_banner').children('img').prop('src','cartoon/'+data1+'/'+data2+'.jpg').show()
        saveNum2(data2)
    }else {
        return false
    }
})
//点击返回
$('.back').on('click',function(){
    $('.lookbook').hide()
    $('.mulu').hide()
    $('.bookrack').show()
    $('footer').slideDown(200)
})
//数据本地存储
function saveNum1(data1){
    localStorage.setItem('num1',data1)
}
function saveNum2(data2){
    localStorage.setItem('num2',data2)
}
//本地数据的读取
function getNum1(){
    var data1 = localStorage.getItem('num1')
    if(data1!=null){
        return data1
    }else{
        return null
    }
    
}
// console.log(getNum1())
        //取出num中的数据 赋值给data
function getNum2(){
    var data2 = localStorage.getItem('num2')
    if(data2!=null){
        return data2 
    }else{
        return 1
    }
}




 

//cartoon/(1)10番外篇/6.jpg
})


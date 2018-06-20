//定义滚动条函数
function scroll(topScroll){
	$("body,html").animate({
        "scrollTop": topScroll
    }, 500);
}

//点击banner的加入我们
$(".joinUs").on('click',function(){
	scroll(2360)
  $(".job_select_ul li").removeClass('active')  
    
})


$(".job_select_ul li").on("click",function(){
	$(this).addClass('active').siblings().removeClass("active");
		var n = $(this).index();
		switch(n){
		case 0:
		  scroll(2600)
		  break;
		case 1:
		  scroll(2600)
		  break;
		case 2:
		scroll(3350)
		  break;
		case 3:
		 scroll(3350)
		  break;
		  case 4:
		  scroll(4000)
		  break;
		case 5:
		 scroll(4000)
		  break;
		}
})

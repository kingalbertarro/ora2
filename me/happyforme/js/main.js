

$(function(){
	$('.menuSp').click(function(){
		$('body').toggleClass('menuOpened');
	});
});
window.onpageshow = function(event) {
	if (event.persisted) {
	    window.location.reload() 
	}
};
$(document).ready(function() {
	var topBtn = $('.pagetop');

    $(window).scroll(function () {
		if($(this).scrollTop() > 300) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
	});
	
	topBtn.click(function () {
		$('body,html').animate({
				scrollTop: 0
		}, 500);
		return false;
	});

})

$(function() {
  $('a[href*=\\#]:not([href=\\#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$(function() {
  $('.box04 span').matchHeight();
});

jQuery(function($){
return;
	var duration = 3000;
	var status = 1;
	var timer = setInterval(slider, duration);
	$(window).on('focus', function(){
		status = 1;
	});
	$(window).on('blur', function(){
		status = 0;
	});
	
	sliderInit();
	function sliderInit() {
		$('.slider').each(function(){
			// 情報取得
			var _this = this;
			var index = 0;
			var total = $('img', this).length;
			$('img', this).hide();
			$('img:eq(0)', this).show();
			$(this).data('index', index);
			$(this).data('total', total);
			$('img:eq(0)', this).on('load', function(){
				$(_this).width($(this).width());
				$(_this).height($(this).height());
				$(_this).css('magin-left', 'auto');
				$(_this).css('magin-right', 'auto');
				$(_this).css('position', 'relative');
				$('img', _this).css('position', 'absolute');
			});
		});
	}
	function slider() {
		if (status) {
			$('.slider').each(function(){
				var oldIndex = $(this).data('index') * 1;
				var total = $(this).data('total') * 1;
				var index = (oldIndex + 1) % total;
				$(this).data('index', index);
				$('img:eq(' + oldIndex + ')', this).fadeOut();
				$('img:eq(' + index + ')', this).fadeIn();
			});
		}
	}
});


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

// スライダー
jQuery(function($){
	// 初期設定
	var duration = 1000; // [ミリ秒]
	var status = 1;

	// イベント登録
	var timer = setInterval(changeImage, duration);
	$(window).on('focus', function(){
		status = 1;
		setHeight();
	});
	$(window).on('blur', function(){
		status = 0;
	});
	$(window).on('resize', function(){
		setHeight();
	});
	setInterval(function(){
		setHeight();
	}, 300);
	$('.slider img').on('load', function(){
		setHeight();
	});
	setHeight();

	// 初期動作
	$('.slider').each(function(){
		// 情報取得
		var _this = this;
		var index = 0;
		var total = $('img', this).length;
		$(this).data('index', index);
		$(this).data('total', total);

		// CSS調整
		$('img', this).hide();
		$('img', this).css('z-index', 0);
		$('img:eq(0)', this).show();
		$('img:eq(0)', this).css('z-index', 1);
		$('img:eq(0)', this).on('load', function(){
			setHeight();
		});
	});

	// 画像切り替え
	function changeImage() {
		if (status) {
			$('.slider').each(function(){
				var _this = this;
				var oldIndex = $(this).data('index') * 1;
				var total = $(this).data('total') * 1;
				var index = (oldIndex + 1) % total;
				$(this).data('index', index);
				$('img:eq(' + index + ')', this).show();
				$('img:eq(' + oldIndex + ')', this).fadeIn(function(){
					$('img:eq(' + index + ')', _this).css('z-index', 1);
					$('img:eq(' + oldIndex + ')', _this).css('z-index', 0);
				});
			});
		}
	}

	// 高さ調整
	function setHeight() {
		$('.slider').each(function(){
			var height = 0;
			$('img', this).each(function(){
				var h = $(this).height() * 1;
				if (h > height) {
					height = h;
				}
			});
			if (height) {
				$(this).height(height);
			}
		});
	}
});

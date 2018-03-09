

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
  	var tm = 1000;
  	if ($(this).hasClass('fast02')) {
  		tm = 750;
  	}else if ($(this).hasClass('fast03')) {
  		tm = 500;
  	}
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, tm);
        return false;
      }
    }
  });
});


$(function() {
  $('.box04 span').matchHeight();
});

$(function() {
  $('#ora2_imageList').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 1500,
		arrows: true,
        responsive: [
          			 {
       breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
      }
    }
        ]
});});

$(function() {
    $('.usersVoice').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [
          {
            breakpoint: 1010,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
       {
       breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
      }
    }
        ]
});});


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
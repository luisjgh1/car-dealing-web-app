function backToTop() {
	if (!$(".back-to-top").length) {
		var backToTopButton=document.createElement('button');
		backToTopButton.className="back-to-top";
		backToTopButton.href="#!";
		backToTopButton.onclick= function() {
			$('html,body').animate({ scrollTop: 0 }, 'slow');
			return false; 
		};
		var backToTopText=document.createTextNode('Back to top');
		backToTopButton.appendChild(backToTopText);
		
		$("body").append(backToTopButton);
	} else {
		$('.back-to-top')[0].onclick= function() {
			$('html,body').animate({ scrollTop: 0 }, 'slow');
			return false; 
		};
	}	
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		
		if (scroll >= 700) {
			$(".back-to-top").addClass("back-to-top-show");
		} else {
			$(".back-to-top").removeClass("back-to-top-show");
		}
	});
};
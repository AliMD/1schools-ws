// JavaScript Document
$(function(){
	
// being at the middle of the parent element 	////
	var fit2parent = {
		vspace: function(elm,prnt){
			prnt=prnt===undefined?$(elm).parent():prnt;
			return Math.round(($(prnt).height()-$(elm).height())/2);
		},
		hspace: function(elm,prnt){
			prnt=prnt===undefined?$(elm).parent():prnt;
			return Math.round(($(prnt).width()-$(elm).width())/2);
		}
	}
////////////////////////////////////////////////////

// Sync the Begining section	////////////////////
	var redElmArr = new Array('#header','#footer'), redHeight=0;
	for(x in redElmArr){
		redHeight+=$(redElmArr[x]).height();
	}
	var	ncsHeight = $('#slider').height()+redHeight;
	
	(syncSlider = function(){
		scrHeight = $(window).height();
		vspace =(scrHeight>ncsHeight)?fit2parent.vspace('#slider',window)-redHeight/2:0;
		
		$('#slider').css({
			'margin-top':vspace+'px',
			'margin-bottom':vspace+'px'
		});
	})();
	$(window).resize(syncSlider);
////////////////////////////////////////////////////

// Sync the content sections	////////////////////
	$('div.centerbox').children('.section').css('padding-top',$('#header').height()+'px');
	(intxt=$('div.contactbox').children('.inner')).css('margin-top',fit2parent.vspace(intxt)+'px');
////////////////////////////////////////////////////

// Vertical Scroller	////////////////////////////
	function scrollToId(id,usroption,callback){
		var option = {
			topspace : 0,
			speed : 1500,
			effect : 'easeOutQuint'
		}
		$.extend(true, option, usroption);
		
		elmnt=$.browser.webkit?'body':'html';	
		
		$(elmnt).stop().animate({
			scrollTop: $(id).offset().top-option.topspace
		},option.speed,option.effect,callback);
	}
////////////////////////////////////////////////////

//	Scroll to Top	////////////////////////////////
	var minHeight=300;
	$('.title_logo').children('a').click(function(e){ e.preventDefault(); });
	
	$('#header').click(function(){
		if($(window).scrollTop() > minHeight){
			scrollToId('#home',null,function(){
				$('.navigation a').removeClass('active');
				location.hash='home';
			});
		}
	})
////////////////////////////////////////////////////

//	Scroll to Hash	////////////////////////////////
	$("a[href*='#']").click(function(e){
		e.preventDefault();
		pos=(id=$(this).attr('href')).length>1?$(id).offset().top>0?1:0:undefined;
		changeNavClass(id);		// It's an option, window.onhashchange also calls this function, but with a delay...
		
		scrollToId(pos===undefined?'#home':id,{
			effect:pos?'easeOutBack':'easeOutQuint',
			speed:1500
		},function(){	// callback function
			location.hash = id.substr(1);
		});
	});
////////////////////////////////////////////////////

//	Change Navigation Link Class	////////////////
	changeNavClass = function(url){
		$('.navigation a').removeClass('active').each(function(){
			if($(this).attr('href')==url) $(this).addClass('active');
		});
	};
	changeNavClass(window.location.hash);	// for instant accessing to a section.
	
	window.onhashchange = function() {		// specially to apply the commands by using back/next buttons.
		var h=window.location.hash;
		changeNavClass(h);					// Change Navigation Link Class to "active".
		window.location.href=h;				// to fix viewing sections by next/forward.
	};
////////////////////////////////////////////////////

//	Vertical Navigation		////////////////////////
	var vt_sp = fit2parent.vspace("#vertical_nav",window);
	$("#vertical_nav").css({
			top: vt_sp+'px'
	});

	$(window).scroll(function(){
		if($(window).scrollTop() > 200) {
			$("#vertical_nav").removeClass('hidden').stop().animate({
				top:($(window).scrollTop() + vt_sp) +'px',
				'opacity':1,
				'-moz-opacity':1,
				'-webkit-opacity':1,
				'-khtml-opacity':1,
				'-o-opacity':1,
				'-ms-opacity':1,
			},2000,'easeOutExpo');
		}else{
			$("#vertical_nav").stop().animate({
				top:($(window).scrollTop() + vt_sp) +'px',
				'opacity':0,
				'-moz-opacity':0,
				'-webkit-opacity':0,
				'-khtml-opacity':0,
				'-o-opacity':0,
				'-ms-opacity':0,
			},2000,'easeOutExpo',function(){
				$(this).addClass('hidden');	// Hiding the vertical navigation to prevent clicking
			});
		}
	});	
	
	$("#vertical_nav .section a").hover(function(){
		$(this).next('.title').removeClass('hidden').stop().animate({
			'opacity':1,
			'-moz-opacity':1,
			'-webkit-opacity':1,
			'-khtml-opacity':1,
			'-o-opacity':1,
			'-ms-opacity':1,
			'width':131+'px'
		},500);
	},function(){
		$(this).next('.title').stop().animate({
			'opacity':0,
			'-moz-opacity':0,
			'-webkit-opacity':0,
			'-khtml-opacity':0,
			'-o-opacity':0,
			'-ms-opacity':0,
			'width':121+'px'
		},500,function(){
			$(this).addClass('hidden');	// Hiding the section title
		});
	});
////////////////////////////////////////////////////
});
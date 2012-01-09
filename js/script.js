// JavaScript Document
$(function(){
	
// being at the middle of the parent element 	////
	fit2parent = new function(){
		this.vspace = function(elm,prnt){
			prnt=prnt===undefined?$(elm).parent():prnt;
			return Math.round(($(prnt).height()-$(elm).height())/2);
		}
		this.hspace = function(elm,prnt){
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

// Vertical Scroller	////////////////////////////	
	function scrollToId(id,usroption){
		var option = {
			topspace : 0,
			speed : 1500,
			effect : 'easeOutQuint'
		}
		$.extend(true, option, usroption);
		
		elmnt=$.browser.webkit?'body':'html';	
		
		$(elmnt).stop().animate({
			scrollTop: $(id).offset().top-option.topspace
		},option.speed,option.effect);	
	}
////////////////////////////////////////////////////

//	Scroll to Top	////////////////////////////////
	var minHeight=300;
	$('.title_logo').children('a').click(function(){ return false });
	
	$('#header').click(function(){
		if($(window).scrollTop() > minHeight){
			scrollToId('#wrapper');
		}
	})
////////////////////////////////////////////////////

//	Scroll to Hash	////////////////////////////////
	$("a[href*='#']").click(function(){
			pos=(id=$(this).attr('href')).length>1?1:0;	
			scrollToId(pos?id:'#wrapper',{
				topspace:$('#header').height(),
				effect:pos?'easeOutBack':'easeInBack',
				speed:1500
			});	
			if(!pos)return false;	// or "return false" for all cases ?
	});
////////////////////////////////////////////////////

//	Change Navigation Link Class	////////////////
	$('.navigation ul li').children('a').click(function(){
		$('.navigation ul li').children('a').removeClass('active');
		$(this).addClass('active');
	})
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
			},2000,'easeOutExpo');	//addClass('hidden')? how?? it should be changed!
			
			function hideobj(){
				if($(window).scrollTop() < 200) $("#vertical_nav").addClass('hidden');
			}
			setTimeout(hideobj,2000);	//raveshe goosfandi! chekaresh konim? :D
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
		},500);
	},function(){
		$(this).next('.title').stop().animate({
			'opacity':0,
			'-moz-opacity':0,
			'-webkit-opacity':0,
			'-khtml-opacity':0,
			'-o-opacity':0,
			'-ms-opacity':0,
		},500);	//addClass('hidden')? how?? it should be changed!
	}).click(function(){
		$("#vertical_nav .bullet").removeClass('active');	
		$(this).addClass('active');
	});
////////////////////////////////////////////////////
	
});
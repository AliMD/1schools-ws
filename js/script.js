// JavaScript Document
//	Cookie functions	////////////////////////////
var cookie = {
	setCookie: function(c_name,value,exdays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	},
	getCookie: function(c_name){
		var i,x,y,ARRcookies=document.cookie.split(";");
		for(i=0; i<ARRcookies.length; i++){
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name){
				return unescape(y);
			}
		}
	}
}
////////////////////////////////////////////////////

//	Random number between min and max val.	////////
function rand(Min,Max){
	return Math.floor(Math.random()*(Max-Min+1) + Min);
}
////////////////////////////////////////////////////

//	Special msg for dear IE :D	////////////////////
function chS(ths) {
	ths.style.width='5px';
	ths.style.height='20px';
	ths.value='';
	setInterval(function(){
		chngpos(ths);
	},100);
}

function catchME(ths){
	_i=2;
	ths.value="تا تو باشی که دیگه با IE بیای!!!";
	setTimeout(function(){
		chS(ths);
	},2000);
}

var _frate = 15;
var _i = 10;

function chngpos(obj) {
	X = $(window).innerWidth();
	Y = $(window).innerHeight();
	nX = rand(0,X-210);
	nY = rand(0,Y-40);
	X1 = parseFloat(obj.style.left);
	Y1 = parseFloat(obj.style.top);
	dX = nX - X1;
	dY = nY - Y1;
	stepX  = Math.floor(dX/_i);
	stepY  = Math.floor(dY/_i);

	function animate() {
		X1 += stepX;
		Y1 += stepY;
		obj.style.top = Y1+"px";
		obj.style.left = X1+"px";
		if( Math.abs(X1-nX)> Math.abs(stepX) && Math.abs(Y1-nY)> Math.abs(stepY) ) {
				(X1 > 5) && (Y1 > 5) && (X1 < X-155) && (Y1 < Y-35) ? setTimeout(animate,_frate) : '';
		}
	}
	animate();
}

var dearIE = {
	getName: function(str,val){
		var name;
		do{
			name=prompt(str,val);
		}while(!isNaN(name) || !name);
		return {'user':name,'ver':$.browser.msie.version};
	},
	checkCookie: function(str,val){
		var cookied;
		var name=cookie.getCookie('1schoolsIEUser');
		if(name===undefined){
			var res=this.getName(str,val);
			name=res.user+'|'+res.ver;
			cookie.setCookie('1schoolsIEUser',name,30);
			cookied=0;
		}else{
			cookied=1;
		}
		return name+'|'+cookied;
	},
	run: function(){
		var parm=this.checkCookie('سلام، اسمت چیه؟؟؟','').split('|');
		var msg=parm[2]==0?
		parm[0]+"!\nتو خجالت نمی کشی توی هزاره سوم با مرور احمقی مثل اینترنت اکسپلورر کار می کنی؟؟؟":
		parm[0]+"??!!!!\nباز که تو با اینترنت اکسپلورر اومدی !!!!!";
		alert(msg);
		$('#loading').css('display','none').next('#home').html('<h2>چیه؟ خیال کردی خیلی زرنگی؟؟</h2>');
		$('#loadtop').append('<br><div class="center"><h2>Press "ANY" Key to Continue! :D</h2></div><input style="font-size:18px; direction:rtl; height:40px; position:absolute;" type="button" value="آقا من غلط کردم :D" onmouseover="chngpos(this)" onclick="catchME(this)" />').children('input[type="button"]').css({
			top : ($(window).innerHeight()-40)/2 +'px',
			left : ($(window).innerWidth()-210)/2 +'px'
		});
	}
};
////////////////////////////////////////////////////

/////////////
// background position have bug in FF and IE6 so, this jquery-plug-in added
/////////////
(function($) {
	if(!document.defaultView || !document.defaultView.getComputedStyle){ // IE6-IE8
		var oldCurCSS = $.curCSS;
		$.curCSS = function(elem, name, force){
			if(name === 'background-position'){
				name = 'backgroundPosition';
			}
			if(name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[ name ]){
				return oldCurCSS.apply(this, arguments);
			}
			var style = elem.style;
			if ( !force && style && style[ name ] ){
				return style[ name ];
			}
			return oldCurCSS(elem, 'backgroundPositionX', force) +' '+ oldCurCSS(elem, 'backgroundPositionY', force);
		};
	}
	
	var oldAnim = $.fn.animate;
	$.fn.animate = function(prop){
		if('background-position' in prop){
			prop.backgroundPosition = prop['background-position'];
			delete prop['background-position'];
		}
		if('backgroundPosition' in prop){
			prop.backgroundPosition = '('+ prop.backgroundPosition;
		}
		return oldAnim.apply(this, arguments);
	};
	
	function toArray(strg){
		strg = strg.replace(/left|top/g,'0px');
		strg = strg.replace(/right|bottom/g,'100%');
		strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
		var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
		return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
	}
	
	$.fx.step. backgroundPosition = function(fx) {
		if (!fx.bgPosReady) {
			var start = $.curCSS(fx.elem,'backgroundPosition');
			if(!start){//FF2 no inline-style fallback
				start = '0px 0px';
			}
			
			start = toArray(start);
			fx.start = [start[0],start[2]];
			var end = toArray(fx.end);
			fx.end = [end[0],end[2]];
			
			fx.unit = [end[1],end[3]];
			fx.bgPosReady = true;
		}
		//return;
		var nowPosX = [];
		nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
		nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];           
		fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];

	};
})(jQuery);
////////////////////////////////////////////////////

//	1DEVS Node Checker - jQuery Plugin	////////////
//	proje be samar naresid :D beshe ke ghabl az barname nevisi khode jQuery ro ye negah bokonim, $(node).ready !!!! :D
////////////////////////////////////////////////////

// first loading	////////////////////////////////
$('#loading').ready(function() {
	$('.right_sec #brwsrs_msg').hide();
	$('.left_sec #mobs_msg').hide();
	
	$('#2pm').append('<span class="BASH_1">Administrator@1SCHOOLS</span> <span class="BASH_2">~</span><br>$');
	
	typwriter('#slide-client',"          1Devs -m run GUI for 'loading'          ",0)
	$('body').css("overflow","auto");
});

var isLoaded = false;
$(window).load(function(){
	isLoaded=true;
});

function guiloader(){
	if(isLoaded){
			$("#loading").delay(3000).animate({
				top: '-=100%'
			},4000);	
			  
			$('#slider .right_sec').delay(4000).animate({
				'background-position-x':'0px',
				'backgroundPosition' : '0px 84px'
			},1000,function(){
				$('.right_sec #brwsrs_msg').fadeIn(1000);
			});
			  
			$('#slider .left_sec').delay(4000).animate({
				'background-position-x':'305px',
				'backgroundPosition' : '305px 84px'
			},1000,function(){
				$('.left_sec #mobs_msg').fadeIn(1000);
			});
	}else{
		setTimeout(guiloader,1);
	}
}

////////////////////////////////////////////////////

//	typewriter function	////////////////////////////
function typwriter(el,text,pos,no){
	ctext=text.substring(0,pos)+(pos%2?'_':'<blink>_</blink>');
	$(el).html(ctext);

	if(pos==50){
		$(el).html("1Devs -m run GUI for 'loading'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 file(s) found for loading gui.<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HTTP://1schools.com/ run loading part<span id=\"slide-client2\"><blink>_</blink></span><br>");
		typwriter('#slide-client2',"<br /><br />Running index.html",0,2);
	}else if(pos==text.length){
	   $(el).html(text+"<blink>_</blink>");
	   if(text=="<br /><br />Running index.html"){ 
	   		$.browser.msie?dearIE.run():$('#loadtop').delay(1000).toggle(500,null,guiloader);
	   };
	}else{
	   window.setTimeout('typwriter("'+el+'","'+text+'",'+(pos+1)+','+1+');',100);
	};
}
////////////////////////////////////////////////////

//	Form Validation n' Ajax Submission	////////////
	var patt=new Array(),pattern,valid;

	function validator(inp,MinLen,MaxLen,type) {
		MinLen=MinLen?MinLen:2;
		MaxLen=MaxLen?MaxLen:256;
		type=type?type:inp.type;
	
		patt['text'] = /^[^\[\]\\~`\!\@\#\$%\^&\*()_=\+\|}{\"\'\:;\/\?\.0-9,-]+$/i;
		patt['email'] = /^[a-z0-9]+(?:[\.-]?[a-z0-9]+)*@[a-z0-9]+([-]?[a-z0-9]+)*[\.-]?[a-z0-9]+([-]?[a-z0-9]+)*([\.-]?[a-z]{2,})*(\.[a-z]{2,5})+$/i;
		patt['tel'] = /^[^\[\]~`!\@\#\$%\^&\*_=\|}{\"\'\:;\/\?\.\\,a-wyz]+$/i;
		patt['number'] = /^[0-9]+$/i;
	
		pattern=patt[type]?patt[type]:/(.)*/i;
		
		if (inp.value.length<MinLen || inp.value.length>MaxLen || !pattern.test(inp.value)) {
			$(inp).addClass('err');
			valid=false;
		}else{
			if($(inp).hasClass('err')) $(inp).removeClass('err');
		};
	};
	
	function SendForm(frm) {
		valid=true;
		for(key in frm.elements){
			if(frm.elements[key].onblur) frm.elements[key].onblur();
		};
		if(valid){
			ajaxSubmit(frm);
		};
		return false;
	};
	
	function ajaxSubmit(frm){
		var sentData = $(frm).serialize();
		$.ajax({
			type : 'POST',
			dataType : 'html',
			url : 'send',
			data : sentData+'&submit=submit',
			beforeSend : function(){
				$('div.response').fadeOut(500);
				$('div.loading').fadeIn(500);
			},
			success : function(data){
				$('div.loading').fadeOut(500,function(){
					$('div.response').fadeIn(600);
					$('div.response').html(data);
					reCaptcha();
				});
			}
		});
	}
	function RestForm(frm) {
		for(key in frm.elements){
			$(frm.elements[key]).removeClass('err');
			$('div.response').fadeOut(500);
			reCaptcha();
		};
	};
	
	function reCaptcha(){
		var d=new Date();
		$('input#captcha').css("background-image","url(captcha.jpg?"+d.getTime()+")");
	};
////////////////////////////////////////////////////

////////////////////////////////////////////////////
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

// Sync the Begining and ending section	////////////
	var redElmArr = ['#header','#footer'], redHeight=0;
	for(x in redElmArr){
		redHeight+=$(redElmArr[x]).height();
	}
	var _objs = {'#slider':true,'.contactbox':false};
	
	(syncSlider = function(){
		scrHeight = $(window).height();
		for(x in _objs){
			ncsHeight = $(x).height()+redHeight;
			vspace =(scrHeight>ncsHeight)?fit2parent.vspace(x,window)-redHeight/2:0;
			$(x).css({
				'margin-top':_objs[x]?vspace+'px':'auto',
				'margin-bottom':vspace+'px'
			});
		};
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

//	Ajax Form Functions	////////////////////////////
	$('#reCaptcha').click(reCaptcha);
	
	$('div.radio').click(function(){
		$('div.radio').removeClass('active');
		$(this).addClass('active');
		$('input#course').val($(this).attr('id').substr(5));
	})
////////////////////////////////////////////////////
});
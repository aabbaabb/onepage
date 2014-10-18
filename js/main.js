
point=new Array();
point2=new Array();
for(var i=0;i<9;i++){
	point[i]=new Array();
}
for(var i=0;i<5;i++){
	point2[i]=new Array();
}
var cloudstarted=false;
handle=new Array();
started=new Array();
for(i=0;i<14;i++){
	started[i]=false;
}
requestAnimationFrame = window.requestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| window.msRequestAnimationFrame
	|| window.oRequestAnimationFrame
	|| function(callback) {
	setTimeout(callback, 1000 / 60);
	};
$(document).ready(function(){
	bind();
	
	
	
	point[0][0]=0;
	point[0][1]=0;
	point[1][0]=95;
	point[1][1]=-73;
	point[2][0]=129;
	point[2][1]=-13;
	point[3][0]=157;
	point[3][1]=29;
	point[4][0]=116;
	point[4][1]=45;
	point[5][0]=70;
	point[5][1]=69;
	point[6][0]=73;
	point[6][1]=101;
	point[7][0]=72;
	point[7][1]=139;
	point[8][0]=62;
	point[8][1]=155;
	point2[0][0]=0;
	point2[0][1]=0;
	point2[1][0]=22;

	point2[1][1]=23;
	point2[2][0]=1;
	point2[2][1]=69;
	point2[3][0]=-14;
	point2[3][1]=106;
	point2[4][0]=26;
	point2[4][1]=180;
	
	function bubble(){
		$(".bubble").each(function(){
			bubblerefresh($(this));
		})
	}
	function bubblerefresh(obj){
		if(checkpage()==6){
			setTimeout(function(){
				var margintop;
				obj.fadeIn(400,function(){
					var time=1500;
					margintop=parseInt(obj.css("margin-top"))-50;
					obj.animate({marginTop:margintop+"px",opacity:0},1500,"linear",function(){
						obj.css("margin-top",margintop+50+"px");
						obj.hide();
						obj.css("opacity",1);
						bubblerefresh(obj);
					});

							
				})
				
			},Math.random()*2000);
		}
	}
	function line(){
		$("#line1").animate({width:'223px'},"slow",function(){
			$("#line2").animate({width:'223px'},"slow",function(){
				$("#line3").animate({width:'103px'},"slow");
			})
		})
	}
	function wheel(angel){
		if(angel>=360)
			angel=0;
		$(".wheelitem").show();
		var centerx=250;
		var centery=199;
		var r=174;
		for (var i=0;i<7;i++){
			var temp=(angel+(360/7)*i)/180*Math.PI;	
			var x=r*Math.sin(temp);
			var y=r*Math.cos(temp);
			$(".wheelitem:eq("+i+")").css("marginLeft",centerx+x+"px");
			$(".wheelitem:eq("+i+")").css("margin-top",centery+y+"px");
		}
		if(checkpage()==4){
			requestAnimationFrame(function(){
				wheel(angel+0.5);
			});
		}


	}
	function nummove(movetime,len){
		started[2]=true;
		$(".t_num i").css("backgroundPositionY","0px");
		setTimeout(function(){
			var obj = $(".t_num i:first");
		
			obj.animate({
				backgroundPositionY :'-613px' 
				}, movetime,'swing',function(){
					
				}
			);
			movetime=movetime-300;
			for(var i=1;i<len;i++){
				
				
				//var num=String(n).charAt(i);
				//var y = -parseInt(num)*30;
				var obj = $(".t_num i").eq(i);
				obj.animate({
					backgroundPositionY :'-556px' 
					}, movetime,'swing',function(){
	
					}
				);
				movetime=movetime-300;
			}

		},500);
		

	}
	function bezier(t,starttemp){
		var temp=new Array();
		temp[0]=0;
		temp[1]=0;
		var n=2;
		for (var i=0;i<3;i++){
			temp[0]+=combine(n,i)*point[2*starttemp+i][0]*Math.pow((1-t),n-i)*Math.pow(t,i);
			temp[1]+=combine(n,i)*point[2*starttemp+i][1]*Math.pow((1-t),n-i)*Math.pow(t,i);
		}
		//temp[0]=point0[0]*(1-t)*(1-t)*(1-t)+3*point1[0]*t*(1-t)*(1-t)+3*point2[0]*t*t*(1-t)+point3[0]*t*t*t;
		//temp[1]=point0[1]*(1-t)*(1-t)*(1-t)+3*point1[1]*t*(1-t)*(1-t)+3*point2[1]*t*t*(1-t)+point3[1]*t*t*t;
		return temp;
	}
	function bezier2(t,starttemp){
		var temp=new Array();
		temp[0]=0;
		temp[1]=0;
		var n=2;
		for (var i=0;i<3;i++){
			temp[0]+=combine(n,i)*point2[2*starttemp+i][0]*Math.pow((1-t),n-i)*Math.pow(t,i);
			temp[1]+=combine(n,i)*point2[2*starttemp+i][1]*Math.pow((1-t),n-i)*Math.pow(t,i);
		}
		//temp[0]=point0[0]*(1-t)*(1-t)*(1-t)+3*point1[0]*t*(1-t)*(1-t)+3*point2[0]*t*t*(1-t)+point3[0]*t*t*t;
		//temp[1]=point0[1]*(1-t)*(1-t)*(1-t)+3*point1[1]*t*(1-t)*(1-t)+3*point2[1]*t*t*(1-t)+point3[1]*t*t*t;
		return temp;
	}
	function combine(m,n){	//Cmn
		return (multi(m)/(multi(n)*multi(m-n)));
	}
	function multi(n){	//n!
		var temp=1;
		for(var i=1;i<=n;i++){
			temp*=i;
		}
		return temp;
	}
	function calangel(t,temp,objstring){
		var lastpos=new Array();
		if(equal(t,0)==true){
			lastpos=bezier(0.9,start-1);
		}
		else
			lastpos=bezier(t-0.1,start);
		var xdif=temp[0]-lastpos[0];
		var ydif=temp[1]-lastpos[1];
		var r=Math.pow((xdif*xdif+ydif*ydif),0.5);
		var cos=xdif/r;
		var sin=-ydif/r;
		//var changex=-temp[0]*cos+temp[1]*sin;
		//var changey=-temp[0]*sin-temp[1]*cos;
		changex=changey=0;
		var transform="matrix("+cos+","+sin+","+parseFloat(-sin)+","+cos+","+changex+","+changey+")";
			$(objstring+" img").css("transform",transform);
	}
	function calangel2(t,temp,objstring){
		var lastpos=new Array();
		if(equal(t,0)==true){
			lastpos=bezier2(0.9,start2-1);
		}
		else
			lastpos=bezier2(t-0.1,start2);
		var xdif=temp[0]-lastpos[0];
		var ydif=temp[1]-lastpos[1];
		var r=Math.pow((xdif*xdif+ydif*ydif),0.5);
		var cos=xdif/r;
		var sin=-ydif/r;
		//var changex=-temp[0]*cos+temp[1]*sin;
		//var changey=-temp[0]*sin-temp[1]*cos;
		changex=changey=0;
		var transform="matrix("+cos+","+sin+","+parseFloat(-sin)+","+cos+","+changex+","+changey+")";
			$(objstring+" img").css("transform",transform);
	}
	function equal(a,b){
		if(Math.abs(a-b)<0.01)
			return true;
		else
			return false;
	}
	function refresh(objstring){
		planetime=planetime+0.015;
		
		
		if(equal(planetime,1)==true){
			start++;
			planetime=0;
		}
		if(start==4)
			return 0;
		if(start==0){
			$(objstring).css("opacity",planetime);
		}
		var temp=new Array();
		temp=bezier(planetime,start);
		var angel=new Array();
		angel=calangel(planetime,temp,objstring);
		$(objstring).css("marginLeft",+temp[0]+"px");
		$(objstring).css("margin-top",264-temp[1]+"px");
		requestAnimationFrame(function(){
			refresh(("#Ale"));
		});
	}
	function refresh2(objstring){
		planetime2=planetime2+0.015;
		
		if(start2==0){
			$(objstring).css("opacity",planetime2);
		}
		if(equal(planetime2,1)==true){
			start2++;
			planetime2=0;
		}
		if(start2==2)
			return 0;
		var temp=new Array();
		temp=bezier2(planetime2,start2);
		var angel=new Array();
		angel=calangel2(planetime2,temp,objstring);
		$(objstring).css("marginLeft",258+temp[0]+"px");
		$(objstring).css("margin-top",350-temp[1]+"px");
		requestAnimationFrame(function(){
			refresh2(("#Ari"));
		});
	}
	function moveplane(){
		start=0;
		planetime=0;		
		refresh("#Ale");
		$("#Ari").css("opacity","0");
		$("#Ari").css("marginLeft","258px");
		$("#Ari").css("margin-top","350px");
		setTimeout(function(){
			planetime2=0;
		start2=0;
		refresh2("#Ari");
	},2000);
		
		
	}
	function checkscroll(){
		var pagenum=checkpage();
		if(pagenum>0&&pagenum<10){

			var margintop=220+250*(parseInt($(window).scrollTop())-960*pagenum)/960+"px";
			$(".section:eq("+pagenum+") .item2").css("margin-top",margintop);
		}
		if(pagenum==5){
			$("#hp").css("margin-top",100+150*(parseInt($(window).scrollTop())-960*pagenum)/960+"px");
		}
		if(pagenum!=1){
			if(handle[0])
				clearInterval(handle[0]);
			started[0]=false;
		}
		if(pagenum==1&&started[0]==false){
			cloudstartmove();
		}
		if(pagenum==3&&started[2]==false){
			var len=7;
			var movetime=3000;
			nummove(movetime,len);
		}
		if(pagenum!=3)
			started[2]=false;
		if(pagenum==7&&started[6]==false){
			started[6]=true;
			$("#cry").fadeIn(2000);
		}
		if(pagenum!=7){
			started[6]=false;
			$("#cry").hide();
		}
		if(pagenum==8&&started[7]==false){
			started[7]=true;
			setTimeout(ticketmove,800);
		}
		if(pagenum!=8){
			started[7]=false;
			$("#ticket").css("height","103px");
			$("#ticket").css("margin-top","130px");
		}
		if(pagenum==2&&started[1]==false){
			started[1]=true;
			moveplane();
		}
		if(pagenum!=2){
			started[1]=false;
		}
		if(pagenum==4&&started[3]==false){
			started[3]=true;
			wheel(0);
		}
		if(pagenum!=4){

			started[3]=false;
		}
		if(pagenum==6&&started[5]==false){
			started[5]=true;
			bubble();
		}
		if(pagenum!=6){
			$(".bubble").stop();
			started[5]=false;
		}
		if(pagenum==5&&started[4]==false){
			started[4]=true;
			setTimeout(line,800);
		}
		if(pagenum!=5){
			$(".line").stop();	
			started[4]=false;
			$("#line1").css("width","0px");
			$("#line2").css("width","0px");
			$("#line3").css("width","0px");
		}
		requestAnimationFrame(checkscroll);
	}
	function gotopage(num){
		var margintop=960*num;
		$('html,body').stop();
		$('html,body').animate({scrollTop:margintop},1000,'swing');

	}
	function ticketmove(){
		var height=parseInt($("#ticket").css("height"));
		if(height>0){
			$("#ticket").css("height",height-1+"px");
			$("#ticket").css("margin-top",130+103-height+"px")
		}
		else{
			return;
		}
		requestAnimationFrame(ticketmove);
	}
	function cloudstartmove(){
		started[0]=true;
		var arr=[1.5,2,1,-4,-3,-1.5,-2,-3.5,-3,-1,-2.5,-1];
		handle[0]=setInterval(function(){
			$('.cloud').each(function(i,obj){
				var marginleft=parseInt($(obj).css("marginLeft"));
				if(marginleft<=10){
					$(obj).css("opacity",0.1*marginleft);
				}
				if(marginleft>=310){
					$(obj).css("opacity",0.1*(320-marginleft));
				}
				if(i<3){
					if(marginleft>=340){
						$(obj).css("marginLeft","0px");
					}
					else
						$(obj).css("marginLeft",marginleft+arr[i]+"px");
				}
				else{
					if(marginleft<=0){
						$(obj).css("marginLeft","340px");
					}
					else
						$(obj).css("marginLeft",marginleft+arr[i]+"px");
				}
			})
		},40);
	}
	function checkpage(){
		var top=parseInt($(window).scrollTop());
		var pagetemp=parseInt(top/960);
		if((top-960*pagetemp)>629)
			pagetemp=pagetemp+1;
		return pagetemp
	}
	function bind(){
		$("#top").click(function(){
			$('html,body').animate({scrollTop:0},3000,'swing');
		})
		$(".gotosection").click(function(){
			gotopage(1);
		})
		$(document).keydown(function(){
			var keycode=event.which||event.keyCode;
			var pagenum=checkpage();
			if(keycode==40){
				gotopage(pagenum+1);
				event.preventDefault();  
			}
			if(keycode==38){
				gotopage(pagenum-1);
			 	event.preventDefault();  
			 }
		});
		checkscroll();
	}
})

const canvas = document.querySelector("#canvas");
const canvasGd = document.querySelector("#gd")
const ctx = canvas.getContext("2d");
const gd = canvasGd.getContext("2d");
const scale = 30;

canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight / 3;

canvasGd.width = document.body.offsetWidth;
canvasGd.height = document.body.offsetHeight / 3;

let particle = {
	x: -canvas.width / ( 2 * scale ), // [-canvas.width/2*scale,canvas.width/2*scale]
	y: null,
	r: 3,
	v: .008,
	clr: "#FFF"
}


function f(x){
	return -scale * ( ( x * x ) ** ( 1 / 3 ) + 0.9 * Math.sqrt( 3.3 - x ** 2 ) * Math.sin( 6.5 * Math.PI * x ) - 0.6 ) + canvas.height / 2;
}

window.onload = function(){

	// 画出心形线
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#FFF";
	ctx.moveTo( 0, f( -Math.sqrt(3.3) ) )
	ctx.lineTo( -scale * canvas.width / 2 + canvas.width / 2, f(-canvas.width / 2) );
	for( let i = - Math.sqrt(3.3); i < Math.sqrt(3.3); i += 0.003 ){
		ctx.lineTo( scale * i + canvas.width / 2, f(i) );
	}
	ctx.lineTo( canvas.width, f(Math.sqrt(3.3)) )
	ctx.stroke();

	// 动点
	const timer = setInterval( function(){
		// 数据
		particle.x += particle.v;
		if( particle.x > canvas.width / ( 2 * scale ) ){
			particle.x = -canvas.width / ( 2 * scale );
		}
		if( particle.x ** 2 > 3.3 ){
			particle.y = f( -Math.sqrt( 3.3 ) );
		}else {
			particle.y = f(particle.x);
		}

		// 画画
		gd.clearRect( 0, 0, canvas.width, canvas.height );
		gd.beginPath();
		gd.fillStyle = particle.clr;
		gd.arc( scale * particle.x + canvas.width / 2, particle.y, particle.r, 0, Math.PI * 2 );
		gd.fill();
	}, 10 );

	// 文字动态出现
	const txt = [...document.querySelectorAll("b")];
	let i = 0;
	(function show(){

		if( txt[txt.length-1].style.opacity >= 1 )
			return;

		txt.map( ( cur, idx, arr ) => cur.style.opacity = -idx + i * 0.01 );
		i ++

		window.requestAnimationFrame(show);
	})()
}
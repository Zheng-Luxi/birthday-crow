function $( path ){
	return document.querySelector( path );
}

function $$( path ){
	return document.querySelectorAll( path );
}

const user = $("#username"), 
	pass = $("#password"),
	login = $(".login"),
	reset = $(".reset");

reset.addEventListener( "click", function(e){
	user.value = "";
	pass.value = "";
} );

login.addEventListener( "click", function(e){
	if( user.value == "Clever Crow" && pass.value == "thelatternfestival" ){
		window.location.href = "./static/main.html";
	}else {
		window.location.href = "./static/error.html";
	}
} );
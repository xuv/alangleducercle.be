var aphorismeSet;
var dessinSet;
var ready = false; // tout est chargé prêt à jouer
var actuel; // élément actuellement affiché
var display = 0; // 0: aphorisme, 1: dessin 

function init(){
	$("#info").click(function() {
		$(".info").fadeToggle(1000);
	});
	aphorismeSet = $(".aphorisme");
	dessinSet = $(".dessin");
	actuel = $(".titre");
};

function randomAphorisme() {
	if(aphorismeSet.length > 1){}
		var rnd = Math.floor(Math.random()*aphorismeSet.length);
		//console.log("rnd: " + rnd);
		return actuel = $(aphorismeSet[rnd]).removeClass("hidden");
}

function randomDessin() {
	if(dessinSet.length > 1){}
		var rnd = Math.floor(Math.random()*dessinSet.length);
		// console.log("rnd: " + dessinSet[rnd]);
		return actuel = $(dessinSet[rnd]).removeClass("hidden");
}

function rotation(){
	if (ready){ 
	actuel.addClass("hidden");
	switch (display) {
		case 0:
			actuel = randomAphorisme();
			display = 1;
			break;
		case 1:
			actuel = randomDessin();
			display = 0;
			break;
	}
}
}

function chargeLesDessins() {
	$.preload([
		"img/img_0.jpeg",
		"img/img_1.jpeg",
		"img/img_2.jpeg",
		"img/img_3.jpeg",
		"img/img_4.jpeg",
		"img/img_5.jpeg",
		"img/img_6.jpeg",
		"img/img_7.jpeg",
		"img/img_8.jpeg",
		"img/img_9.jpeg",
		"img/img_10.jpeg",
		"img/img_11.jpeg",
		"img/img_12.jpeg",
		"img/img_13.jpeg",
		"img/img_14.jpeg",
		"img/img_15.jpeg",
		"img/img_16.jpeg",
		"img/img_17.jpeg",
		"img/img_18.jpeg",
		"img/img_19.jpeg",
		"img/img_20.jpeg",
		"img/img_21.jpeg",
		"img/img_22.jpeg",
		"img/img_23.jpeg",
		"img/img_24.jpeg",
		"img/img_24.jpeg",
		"img/img_26.jpeg",
		"img/img_27.jpeg",
		"img/img_28.jpeg",
		"img/img_29.jpeg",
		"img/img_30.jpeg",
		"img/img_31.jpeg",
		"img/img_32.jpeg",
		"img/img_33.jpeg",
		"img/img_34.jpeg",
		"img/img_35.jpeg",
		"img/img_36.jpeg",
		"img/img_37.jpeg",
		"img/img_38.jpeg",
		"img/img_39.jpeg",
		"img/img_40.jpeg",
		"img/img_41.jpeg",
		"img/img_42.jpeg",
		"img/img_43.jpeg",
		"img/img_44.jpeg",
		"img/img_45.jpeg",
		"img/img_46.jpeg",
		"img/img_47.jpeg",
		"img/img_48.jpeg",
		"img/img_49.jpeg",
		"img/img_50.jpeg",
		"img/img_51.jpeg",
		"img/img_52.jpeg",
		"img/img_53.jpeg",
		"img/img_54.jpeg",
		"img/img_55.jpeg",
		"img/img_56.jpeg",
		"img/img_57.jpeg",
		"img/img_58.jpeg",
		"img/img_59.jpeg",
		"img/img_60.jpeg",
		"img/img_61.jpeg",
		"img/img_62.jpeg",
		"img/img_63.jpeg",
		"img/img_64.jpeg",
		"img/img_65.jpeg"
	], {
		init: function(loaded, total) {
			$("#indicator").html("Chargement des données: "+ Math.round((loaded/total)*100) + "%") ;
		},
		loaded: function(img, loaded, total) {
			$("#indicator").html("Chargement des données: "+ Math.round((loaded/total)*100) + "%");
			$("#container").append(img);
		},
		loaded_all: function(loaded, total) {
			$("#indicator").html("Chargement des données: "+ Math.round((loaded/total)*100) + "%")
							.fadeOut(1000, function() {
								// console.log("tout est chargé");
								ready = true;
							});
		}
	});

};

function waitTillReady() {
	// Attend surtout que les images soient complètement loadées.
	if (ready) {
		init();
		setInterval("rotation()", 7000);
	} else {
		setTimeout("waitTillReady()", 1000);
	}
}


$(document).ready(function() {
	var FullscreenrOptions = {  width: 1280, height: 1280, bgID: '#container' };
	jQuery.fn.fullscreenr(FullscreenrOptions);
	$("#container").fitText();
	chargeLesDessins();
	$(".titre").animate({opacity: 1}, 3000);
	waitTillReady();
});



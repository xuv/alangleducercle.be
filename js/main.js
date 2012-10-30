var dessinUrlList = ["img/img_0.jpeg","img/img_1.jpeg","img/img_2.jpeg","img/img_3.jpeg","img/img_4.jpeg","img/img_5.jpeg","img/img_6.jpeg","img/img_7.jpeg","img/img_8.jpeg","img/img_9.jpeg","img/img_10.jpeg","img/img_11.jpeg","img/img_12.jpeg","img/img_13.jpeg","img/img_14.jpeg","img/img_15.jpeg","img/img_16.jpeg","img/img_17.jpeg","img/img_18.jpeg","img/img_19.jpeg","img/img_20.jpeg","img/img_21.jpeg","img/img_22.jpeg","img/img_23.jpeg","img/img_24.jpeg","img/img_24.jpeg","img/img_26.jpeg","img/img_27.jpeg","img/img_28.jpeg","img/img_29.jpeg","img/img_30.jpeg","img/img_31.jpeg","img/img_32.jpeg","img/img_33.jpeg","img/img_34.jpeg","img/img_35.jpeg","img/img_36.jpeg","img/img_37.jpeg","img/img_38.jpeg","img/img_39.jpeg","img/img_40.jpeg","img/img_41.jpeg","img/img_42.jpeg","img/img_43.jpeg","img/img_44.jpeg","img/img_45.jpeg","img/img_46.jpeg","img/img_47.jpeg","img/img_48.jpeg","img/img_49.jpeg","img/img_50.jpeg","img/img_51.jpeg","img/img_52.jpeg","img/img_53.jpeg","img/img_54.jpeg","img/img_55.jpeg","img/img_56.jpeg","img/img_57.jpeg","img/img_58.jpeg","img/img_59.jpeg","img/img_60.jpeg","img/img_61.jpeg","img/img_62.jpeg","img/img_63.jpeg","img/img_64.jpeg","img/img_65.jpeg"];
var aphorismes;
var dessins;
var sons = [];
var soundLength = 14;
var imgReady = false; // tous les dessins sont chargés 
var soundReady = 0; // 0: Avant chargement, 1: tous les sons sont chargés, 2: SoundManager pas chargé
var actuel; // élément actuellement affiché
var display = 0; // 0: aphorisme, 1: dessin 

function init(){
	$("#info").click(function() {
		$(".info").fadeToggle(1000);
	});
	aphorismes = $(".aphorisme");
	aphorismeSet = creeSet(5); //66
	dessins = $(".dessin");
	dessinSet = creeSet(5); //66
	sonSet = creeSet(5); //59
	actuel = $(".titre");
};

function randomAphorisme() {
	var rnd = Math.floor(Math.random()*aphorismeSet.length);
	var tmp = $(aphorismes[aphorismeSet[rnd]]).removeClass("hidden");		
	aphorismeSet.splice(rnd, 1);
	return tmp;
}

function randomDessin() {
	var rnd = Math.floor(Math.random()*dessinSet.length);
	var tmp = $(dessins[dessinSet[rnd]]).removeClass("hidden");
	dessinSet.splice(rnd, 1);
	return tmp;
}

function randomSound() {
	if (soundLength == 14 ){
		var rnd = Math.floor(Math.random()*sonSet.length);
		switch (rnd) {
			case 56:
				soundLength = 28;
				break;
			case 57:
				soundLength = 28;
				break;
			case 58:
				soundLength = 84;
				break;
		}
		sons[sonSet[rnd]].play();
		sonSet.splice(rnd, 1);
	} else {
		soundLength -= 14;
	}
}

function rotation(){
	if (imgReady){ 
	actuel.addClass("hidden");
	if (aphorismeSet.length > 0 || dessinSet.length > 0) {
		switch (display){
			case 0:
				if (soundReady == 1){
					randomSound();	
				}
				actuel = randomAphorisme();
				display = 1;
				break;
			case 1:
				actuel = randomDessin();
				display = 0;
				break;
		}
	} else {
		actuel = $(".titre").removeClass("hidden");
		init();
	}
}
}

function chargeLesDessins(dessinACharger) {
	// DessinACharger doit être un objet de type Array
	$.preload(dessinACharger, {
		init: function(loaded, total) {
			$("#indicator > #imgload").html("Chargement des dessins: "+ Math.round((loaded/total)*100) + "%") ;
		},
		loaded: function(img, loaded, total) {
			$("#indicator > #imgload").html("Chargement des dessins: "+ Math.round((loaded/total)*100) + "%");
			$("#container").append(img);
		},
		loaded_all: function(loaded, total) {
			$("#indicator > #imgload").html("Chargement des dessins: "+ Math.round((loaded/total)*100) + "%")
							.fadeOut(1000, function() { 
								imgReady = true; 
							});
		}
	});

};

function chargeLesSons() {
	$("#indicator > #soundload").html("Chargement des sons: 0%");
	for (i=0; i<59; i++){
	    sons[i] = soundManager.createSound({
	    	id: 'snd-' + i ,
	    	url: 'snd/ogg/'+ (i+1) + '.ogg',
	    	autoLoad: true,
	    	onload: function(success) {
	    		if(success) {
	  				$("#indicator > #soundload").html("Chargement des sons: "+ Math.round((i/59.0)*100) + "%");
					if(this.id == 'snd-58'){
						$("#indicator > #soundload").fadeOut(1000, function() {	
							soundReady = 1;
						});
					};
				};
			}
	    });
	};
}

function creeSet(nb) {
	var tmp = [];
	for(i=0; i<nb; i++){
		tmp.push(i);
	}
	return tmp;
}

function waitTillReady() {
	// Attend surtout que les images soient complètement loadées.
	if (imgReady && soundReady>0) {
		init();
		setInterval("rotation()", 7000);
	} else {
		setTimeout("waitTillReady()", 1000);
	}
}

soundManager.setup({
  url: 'swf/',
  useHTML5Audio : true,
  debugFlash: false,
  debugMode: false,
  waitForWindowLoad: false,
  onready: function() { 
  	chargeLesSons(); 
  },
  ontimeout: function() {
  	$("#indicator > #soundload")
  		.html("Désolé, pas de son. Problème avec Flash?")
  		.delay(3000)
  		.fadeOut(3000);
  	soundReady = 2;
    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
  }
});

$(document).ready(function() {
	var FullscreenrOptions = {  width: 1280, height: 1280, bgID: '#container' };
	jQuery.fn.fullscreenr(FullscreenrOptions);
	$("#container").fitText();
	chargeLesDessins(dessinUrlList);
	$(".titre").animate({opacity: 1}, 3000);
	waitTillReady();
});
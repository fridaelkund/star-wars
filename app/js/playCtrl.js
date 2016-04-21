StarWarsApp.controller('playCtrl', function($scope, StarModel){

$scope.play = function(startwars){
	document.getElementById('audio1').play(startwars);
	TweenMax.from("#planetAnimation",1, {y:600, x:55, delay:1,opacity:0});
	TweenMax.to("#planetAnimation",15, {y:-100, x:55, delay:1});
	TweenMax.from(".hejPlanet",10,{x:55,delay:0.5});
	TweenMax.to(".hejPlanet",10,{y:1000,delay:0.5});


}

});
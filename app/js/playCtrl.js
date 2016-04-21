StarWarsApp.controller('playCtrl', function($scope, StarModel){

$scope.play = function(startwars){
	document.getElementById('audio1').play(startwars);
	TweenMax.from("#planetAnimation",2, {'top':'100px', 'delay':2});
	TweenMax.to("#planetAnimation",2, {'top':-101});

	
	TweenMax.to(".hejPlanet",2,{y:300,delay:0.5});
}

});
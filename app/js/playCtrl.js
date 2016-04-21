StarWarsApp.controller('playCtrl', function($scope, StarModel){

$scope.play = function(startwars){
	$scope.show="show";
	document.getElementById('audio1').play(startwars);
	TweenMax.from(".test",1, {y:200, x:100});
	TweenMax.from(".menu", 1, {opacity:0});
	TweenMax.to(".test",10, {y:0, x:100});
	TweenMax.to(".menu", 10, {opacity:1});

}

});
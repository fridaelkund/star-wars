StarWarsApp.controller('playCtrl', function($scope, StarModel){

$scope.play = function(startwars){
	document.getElementById('audio1').play(startwars);
	// TweenMax.from(".planetAnimation",1, {y:200, x:100});
	// TweenMax.from(".menu", 1, {opacity:0});
	// TweenMax.to(".planetAnimation",10, {y:0, x:100});
	// TweenMax.to(".menu", 10, {opacity:1});
	// TweenMax.from(".animate",1,{opacity:0});
	// TweenMax.to(".animate",10,{opacity:1});

}

});
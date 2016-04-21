StarWarsApp.controller('playCtrl', function($scope, StarModel){

$scope.play = function(startwars){
	document.getElementById('audio1').play(startwars);
};

});
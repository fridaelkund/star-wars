StarWarsApp.controller('menuCtrl', function($scope, $location, StarModel){

$scope.profil = StarModel.returnProfile();

$scope.path = $location.$$path;

$scope.animateMenu = function(){
	if($scope.path === '/home'){
	TweenMax.from('#leftMenu', 0.8, {'x':'-100%', 'delay':2})
	TweenMax.from('#rightMenu', 0.8, {'x':'100%', 'delay':2})
	}
};

});
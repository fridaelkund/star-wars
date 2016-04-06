StarWarsApp.controller('colorCtrl', function($scope){

	$scope.changeColor=function(color){
    document.getElementById("clicker").style.fill = color;
	}
	
}
StarWarsApp.controller('getPersonCtrl', function($scope, StarModel){

$scope.match=function(){
	console.log("start");
	StarModel.getCharacter.get({},function(data){
		$scope.character=data.results;
		StarModel.matchMaking($scope.character);
		$scope.lookAlikes=StarModel.returnlookAlikes();
		$scope.proc = StarModel.returnProcent();

		console.log("klart");
	}, function(data){
		console.log("nope");
	});
	
}

$scope.restart = function(){
	StarModel.clearAll();
}

$scope.profil = StarModel.returnProfile();
});
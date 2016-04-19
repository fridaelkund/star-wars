StarWarsApp.controller('selectCtrl', function($scope, $location, StarModel){

$scope.allLocals = StarModel.getLocalStorage();

$scope.eyecols=StarModel.eyecol;
$scope.haircols = StarModel.haircol;

$scope.getProfile=function(loc){
	StarModel.clearAll();
	StarModel.addToProfile('name', loc.name);
	StarModel.addToProfile('hair', loc.hair);
	StarModel.addToProfile('eye', loc.eye);	
	StarModel.addToProfile('height', loc.height);
	for(i in loc.wonPlanets){
		StarModel.addWonPlanet(loc.wonPlanets[i])
	};
	for(i in loc.lostPlanets){
		StarModel.addLostPlanet(loc.lostPlanets[i])
	};
	$scope.match();
	$location.path("/profile");
};

$scope.match=function(){
	StarModel.getCharacter.get({},function(data){
		$scope.character=data.results;
		StarModel.matchMaking($scope.character);
		$scope.lookAlikes=StarModel.returnlookAlikes();
		$scope.proc = StarModel.returnProcent();
	}, function(data){
		console.log("Match error");
	});	
}

});
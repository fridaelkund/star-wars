StarWarsApp.controller('selectCtrl', function($scope, $location, StarModel){

$scope.allLocals = StarModel.getAllLocals();

$scope.eyecols=StarModel.eyecol;
console.log($scope.eyecols['blue'])
$scope.haircols = StarModel.haircol;

$scope.getProfile=function(loc){
	StarModel.addToProfile('name', loc.name);
	StarModel.addToProfile('hair', loc.hair);
	StarModel.addToProfile('eye', loc.eye);	
	StarModel.addToProfile('height', loc.height);
	$scope.match();
	$location.path("/profile");
};

$scope.match=function(){
	console.log("start");
	StarModel.getPerson.get({},function(data){
		$scope.person=data.results;
		StarModel.matchMaking($scope.person);
		$scope.whoAmI=StarModel.returnWhoIAm();
		$scope.proc = StarModel.getProcent();
	}, function(data){
		console.log("Match error");
	});	
}

});
StarWarsApp.controller('getPersonCtrl', function($scope, StarModel){

$scope.match=function(){
	console.log("start");
	StarModel.getPerson.get({},function(data){
		$scope.person=data.results;
		StarModel.matchMaking($scope.person);
		$scope.whoAmI=StarModel.returnWhoIAm();
		console.log("klart")
	}, function(data){
		console.log("nope");
	});
	
}

$scope.restart = function(){
	StarModel.clearAll();
}


});
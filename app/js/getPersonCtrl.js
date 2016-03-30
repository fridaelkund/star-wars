StarWarsApp.controller('getPersonCtrl', function($scope, StarModel){




$scope.match=function(){
	StarModel.getPerson.get({},function(data){
		$scope.person=data.results;
		StarModel.matchMaking($scope.person);
		$scope.whoAmI=StarModel.returnWhoIAm();
	}, function(data){
		console.log("nope");
	});
	
}




});
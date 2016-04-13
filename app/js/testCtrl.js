StarWarsApp.controller('testCtrl', function($scope, StarModel){

$scope.person = [];

$scope.getData =function(k){
	console.log("start get");
	StarModel.getP(k).get({},function(data){
		console.log($scope.d)
		$scope.person = $scope.person.concat(data.results);
		console.log($scope.person, data.next)
		if(data.next === null){
			return
		}
		else{
			$scope.getData(data.next)
		}
	}, function(data){
		console.log("Match error");
		})
	}

});
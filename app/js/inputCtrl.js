StarWarsApp.controller('inputCtrl', function($scope, StarModel){

$scope.match=function(){
	console.log("start");
	StarModel.getPerson.get({},function(data){
		$scope.person=data.results;
		StarModel.matchMaking($scope.person);
		$scope.whoAmI=StarModel.returnWhoIAm();
		$scope.proc = StarModel.getProcent();

		console.log("klart");
	}, function(data){
		console.log("nope");
	});
	
}

$scope.inputName=function(query){
	if(query==null){
		return ;
	}
	else{
	StarModel.addToProfile('name', query)
	}
}

$scope.inputHair=function(color){
	StarModel.addToProfile('hair', color);
	var profile = StarModel.returnProfile();
	console.log("prof", profile);
	$scope.currenthair = StarModel.haircol[color]
}

$scope.inputEye=function(eye){
	StarModel.addToProfile('eye', eye)
	var profile = StarModel.returnProfile();
	$scope.currenteye = profile.eye;
}

$scope.inputHeight=function(height){
	StarModel.addToProfile('height', height);
	console.log(height);

}

$scope.profil = StarModel.returnProfile();
   
$scope.eyecols=StarModel.eyecol;
$scope.haircols = StarModel.haircol;

console.log(StarModel.haircol["blond"])

});


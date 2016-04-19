StarWarsApp.controller('inputCtrl', function($scope, StarModel){

// Hämtar lista på färger med namn:hex
$scope.eyecols=StarModel.eyecol;
$scope.haircols = StarModel.haircol;

$scope.location = window.location;

// Kollar om det finns ögonfärg, hårfärg och längd i profilen redan.
// Lägger defaultvärden om så är fallet, annars hämtar värden från profil och uppdaterar i SVGn.

if(StarModel.returnProfile().hair == ""){}
else{
	$scope.avatar_hair = StarModel.returnProfile().hair;
	$scope.avatar_hairhex = StarModel.haircol[StarModel.returnProfile().hair];
};

if(StarModel.returnProfile().eye == ""){}
else{
	$scope.avatar_eye = StarModel.returnProfile().eye;
	$scope.avatar_eyehex = StarModel.eyecol[StarModel.returnProfile().eye]	
};

if(StarModel.returnProfile().height == ""){
	$scope.avatar_height = 100;
	$scope.avatar_feet = $scope.avatar_height+180;
}
else{
	$scope.avatar_height = StarModel.returnProfile().height;	
	$scope.avatar_feet = parseInt($scope.avatar_height)+180;
};

if(StarModel.returnProfile().name == ""){
	$scope.avatar_name = "Snickers";
}
else{
	$scope.avatar_name = StarModel.returnProfile().name;	
};

// Funktion för att spara sin profil. Uppdaterar profile i model. 

$scope.save=function(){
	StarModel.addToProfile('name', $scope.avatar_name);
	StarModel.addToProfile('hair', $scope.avatar_hair);
	StarModel.addToProfile('eye', $scope.avatar_eye);	
	StarModel.addToProfile('height', $scope.avatar_height);
	StarModel.saveLocalStorage();
	$scope.match();
}

// Visar valt namn, hår/ögonfärg eller längd. Sparar ej i profil. 

$scope.showName = function(name){
	$scope.avatar_name = name;
}

$scope.showHair=function(color){
	$scope.avatar_hair = color;
	$scope.avatar_hairhex = StarModel.haircol[color];
}

$scope.showEye=function(eye){
	$scope.avatar_eye = eye;
	$scope.avatar_eyehex = StarModel.eyecol[eye];
}

$scope.showHeight=function(height){
	document.querySelector('#height').value = height;
	$scope.avatar_height = height;
	$scope.avatar_feet = parseInt(height)+180;
}

// Matchingsfunktion som kollar vem man är lik av Star Wars-gubbarna. 

$scope.match=function(){
	console.log("start");
	$scope.getData('http://swapi.co/api/people/');
};

var character = [];

$scope.getData =function(k){
	console.log("start get");
	StarModel.getP(k).get({},function(data){
		character = character.concat(data.results);
		console.log(character)
		if(data.next === null){
			StarModel.matchMaking(character);
			$scope.lookAlikes=StarModel.returnlookAlikes();
			console.log("lookAlikes", $scope.lookAlikes);
			$scope.proc = StarModel.returnProcent();
		}
		else{
			$scope.getData(data.next)
		}
	}, function(data){
		console.log("Match error");
	});	


};



$scope.inputName=function(query){
	if(query==null){
		return ;
	}
	else{
	StarModel.addToProfile('name', query)
	}
}


});


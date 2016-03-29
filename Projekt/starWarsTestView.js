//DinnerView1 Object constructor
var StarWarsTestView = function (container, model) {

	model.addObserver(this);
	var personList = model.getPerson();

	this.update = function(personList){
		console.log(personList.results);
	model.matchMaking(personList.results);
}



};
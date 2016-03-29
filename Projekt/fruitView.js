//DinnerView1 Object constructor
var FruitView = function (container, model) {

	var eye = "blue";

	model.addObserver(this);

	this.test = function(){
		var sum = 0;
		for(i = 1; i < 11; i++){
			model.getFruit(i);
		}
	}

	this.update = function(obj){
		if(obj.eye_color == eye){
			console.log(obj.name)
		}
		else{
			console.log("EJ BLÅ")
		}
	}

	this.test();

};
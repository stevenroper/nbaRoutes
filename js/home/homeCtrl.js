var app = angular.module('nbaRoutes');

app.controller('homeCtrl', function($scope, homeService, teamsArray){

	for(var i = 0; i < teamsArray.length; i++) {
		teamsArray[i].then(function(data) {
			console.log(data);
		})
	}


});
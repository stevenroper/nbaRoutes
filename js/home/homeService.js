var app = angular.module('nbaRoutes');

app.service('homeService', function($http, $q, teamService){

	this.getData = function(team) {
		return teamService.getTeamData(team)
	};

});
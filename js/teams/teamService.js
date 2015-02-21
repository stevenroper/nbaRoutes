var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){

	this.addNewGame = function(gameObject) {
		var url = 'https://api.parse.com/1/classes/' + gameObject.homeTeam;

		if(parseInt(gameObject.homeTeamScore) > parseInt(gameObject.opponentScore)) {
			gameObject.won = true;
		} else {
			gameObject.won = false;
		}

		return $http({
			method: 'POST',
			url: url,
			data: gameObject
		});
	};

	this.getTeamData = function(team) {
		var deferred = $q.defer();
		var url = 'https://api.parse.com/1/classes/' + team;

		$http({
			method: 'GET',
			url: url,
		}).then(function onSuccess(data) {
			var results = data.data.results;
			var wins = 0, losses = 0;
			for(var i = 0; i < results.length; i++) {
				if(results[i].won) {
					wins++;
				} else {
					losses++;
				}
			}
			results.wins = wins;
			results.losses = losses;
			deferred.resolve(results);
		}, function onFailure(reason) {
			deferred.reject(reason);
		});

		return deferred.promise;
	};

});
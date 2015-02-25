var app = angular.module('nbaRoutes', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');

  $routeProvider
  .when('/', {
  	templateUrl: '/js/home/homeTmpl.html',
  	controller: 'homeCtrl',
    resolve: {
      teamsArray: function(homeService) {
        var jazz = homeService.getData('utahjazz');
        var lakers = homeService.getData('losangeleslakers');
        var heat = homeService.getData('miamiheat');
        var teams = [jazz, lakers, heat];
        return teams;
      }
    }
  })
  .when('/teams/:team', {
  	templateUrl: '/js/teams/teamTmpl.html',
  	controller: 'teamCtrl',
  	resolve: {
      teamData: function(teamService, $route) {
  		  return teamService.getTeamData($route.current.params.team);
  	  }
    }
  })
  .otherwise({
  	redirectTo: '/'
  });
  
});
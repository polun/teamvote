/* global angular */
window.TeamVote = angular.module('TeamVote', ['ngRoute', 'restangular'])
.config(function($routeProvider, RestangularProvider){
    var partialsDir = 'partials/';
    $routeProvider.
        when('/', {
            templateUrl: partialsDir + 'vote.html'
        }).
        when('/design', {
            templateUrl: partialsDir + 'design.html',
            controller: 'DesignController'
        });
});
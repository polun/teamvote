/* global angular */
window.TeamVote = angular.module('TeamVote', ['ngRoute', 'restangular'])
.config(function($routeProvider, RestangularProvider){
    var partialsDir = 'partials/';
    $routeProvider.
        when('/vote/:voteId', {
            templateUrl: partialsDir + 'vote.html',
            controller: 'VoteController'
        }).
        when('/design', {
            templateUrl: partialsDir + 'design.html',
            controller: 'DesignController'
        });
});
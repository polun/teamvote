/* global angular */
window.TeamVote = angular.module('TeamVote', ['ui.router', 'ngCookies', 'highcharts-ng'])
    .config(function($stateProvider, $urlRouterProvider) {
        var partialsDir = 'partials/';

        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: partialsDir + 'main.html'
            })
            .state('vote', {
                url: '/vote/:voteId',
                templateUrl: partialsDir + 'vote.html',
                controller: 'VoteController',
                controllerAs: 'vm'
            })
            .state('design', {
                url: '/design',
                templateUrl: partialsDir + 'design.html',
                controller: 'DesignController',
            })
            .state('result', {
                url: '/result/:voteId',
                templateUrl: partialsDir + 'result.html',
                controller: 'ResultController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/index');
    });
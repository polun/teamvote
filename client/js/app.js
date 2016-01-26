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
                cache: false,
                templateUrl: partialsDir + 'vote.html',
                controller: 'VoteController',
                controllerAs: 'vm'
            })
            .state('votes', {
                url: '/votes',
                cache: false,
                templateUrl: partialsDir + 'votes.html',
                controller: 'VotesController',
                controllerAs: 'vm'
            })
            .state('design', {
                url: '/design',
                cache: false,
                templateUrl: partialsDir + 'design.html',
                controller: 'DesignController',
                controllerAs: 'vm'
            })
            .state('result', {
                url: '/result/:voteId',
                cache: false,
                templateUrl: partialsDir + 'result.html',
                controller: 'ResultController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/index');
    });

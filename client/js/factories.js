/* global TeamVote */
(function() {
    TeamVote.factory('Rests', function($http, apiUrl, $q) {
            return {
                get: function() {
                    var dfr = $q.defer();
                    $http.get(apiUrl.rests).
                    success(function(res) {
                        dfr.resolve(res);
                    });

                    return dfr.promise;
                }
            };
        })
        .factory('Votes', function($http, $q, apiUrl) {
            return {
                get: function(voteId) {
                    var dfr = $q.defer();
                    $http.get(apiUrl.votes + '/' + voteId).then(function(res) {
                        dfr.resolve(res);
                    }, function(err) {
                        dfr.reject(err);
                    });

                    return dfr.promise;
                },
                post: function(title, selectedRestIds) {
                    var dfr = $q.defer();
                    $http.post(apiUrl.votes, {
                        title: title,
                        selectedRestIds: selectedRestIds
                    }).then(function(res) {
                        console.log(res);
                        dfr.resolve(res.data.newVoteId);
                    });

                    return dfr.promise;
                }
            };
        })
        .factory('VoteItems', function($q, $http, apiUrl) {
            return {
                post: function(voteId, restId, memberId) {
                    console.log(voteId,restId, memberId);
                    var dfr = $q.defer();
                    $http.post(apiUrl.voteItem, {
                        voteId: voteId,
                        restId: restId,
                        memberId: memberId
                    }).then(function(res) {
                        dfr.resolve(res);
                    }, function(err) {
                        dfr.reject(err);
                    });

                    return dfr.promise;
                }
            };
        });
})();

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
        .factory('Votes', function($http, apiUrl) {
            return {
                post: function(selectedRestIds) {
                    $http.post(apiUrl.votes, {
                        selectedRestIds: selectedRestIds
                    }).then(function(res) {
                        console.log(res);
                    });
                }
            };
        });
})();

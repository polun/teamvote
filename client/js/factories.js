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
    });
})();

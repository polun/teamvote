(function() {
    TeamVote.controller('DesignController', function($scope, Rests) {
        $scope.selectedRests = [];

        Rests.get().then(function(res) {
            res = JSON.parse(res);
            console.log(res);
            $scope.rests = res;
        });

        $scope.select = function(rest) {
            $scope.selectedRests.push(rest);
        };
        $scope.removeRest = function(rest) {
            if ($scope.selectedRests.length > 0) {
                var index = $scope.selectedRests.indexOf(rest);
                $scope.selectedRests.splice(index, 1);
            };
        };
        $scope.newRest = function() {
            $scope.rests.push({
                'id': '5',
                'name': '球场'
            });
            console.log($scope.rests);
        };
    });
})();

(function() {
    TeamVote.controller('DesignController', function($scope, $timeout, Rests, Votes) {
        $scope.selectedRests = [];
        $scope.name = null;

        Rests.get().then(function(res) {
            $scope.rests = res;
        });

        function showAlert(msg) {
            $scope.isAlert = true;
            $scope.alertMessage = msg;

            $timeout(function() {
                $scope.isAlert = false;
                $scope.alertMessage = '';
            }, 3000);
        }

        $scope.select = function(rest) {
            if (!rest.selected) {
                rest.selected = true;
                $scope.selectedRests.push(rest);
            } else {
                showAlert(rest.name + '已经选过了!!!');
            }
        };
        $scope.removeRest = function(rest) {
            if ($scope.selectedRests.length > 0) {
                var index = $scope.selectedRests.indexOf(rest);
                $scope.selectedRests[index].selected = false;
                $scope.selectedRests.splice(index, 1);
            };
        };
        $scope.newRest = function() {
            $scope.rests.push({
                'id': '5',
                'name': '球场'
            });
        };
        $scope.publish = function () {
            selectedRestIds = _.map($scope.selectedRests, function (rest) {
                return rest._id.$oid;
            });

            Votes.post($scope.title, selectedRestIds);
        };
    })
    .controller('VoteController', function($scope, Votes) {
        alert('zhang');
        Votes.get('5696870e9ddd5674056547de').then(function (res) {
            console.log(res);
        });
    });
})();

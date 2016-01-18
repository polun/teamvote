(function() {
    TeamVote.controller('VotesController', function(Votes) {
        var vm = this;
        vm.votes = [];

        activate();

        function activate() {
            Votes.getAll().then(function(data) {
                if (data) {
                    vm.votes = data;
                };
            });
        }
    });
})();

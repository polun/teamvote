(function(argument) {
    var baseUrl = 'http://127.0.0.1:5000/api/v1/'
    TeamVote.constant('apiUrl', {
        rests: baseUrl + 'rests',
        votes: baseUrl + 'votes',
        voteItem: baseUrl + 'voteitem'
    });
})();

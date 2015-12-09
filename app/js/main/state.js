// Sub-application/main Level State
app.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('app.series', {
            url: '/series',
            templateUrl: 'js/main/templates/series.tpl.html',
            controller: 'SeriesCtrl'
        })
        .state('app.movies', {
            url: '/movies',
            templateUrl: 'js/main/templates/movies.tpl.html',
            controller: 'MoviesCtrl'
        })
        .state('app.contact', {
            url: '/about',
            templateUrl: 'js/main/templates/contact.tpl.html',
            controller: 'ContactCtrl'
        });

}]);
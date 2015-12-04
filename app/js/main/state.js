// Sub-application/main Level State
app.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('app.home', {
            url: '/series',
            templateUrl: 'js/main/templates/home.tpl.html',
            controller: 'HomeCtrl'
        })
        .state('app.about', {
            url: '/movies',
            templateUrl: 'js/main/templates/about.tpl.html',
            controller: 'AboutCtrl'
        })
        .state('app.contact', {
            url: '/about',
            templateUrl: 'js/main/templates/contact.tpl.html',
            controller: 'ContactCtrl'
        });

}]);
app.controller('NavbarCtrl', function ($scope, $http) {
    $scope.items = ['Home', 'About', 'Contact'];

    $http.get("http://netflixroulette.net/api/api.php?title=Attack%20on%20titan").success(function (response) {
        console.log("test")
        console.log(response)
        console.log("fuer Melina")
    });

});


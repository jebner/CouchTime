app.controller('AboutCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get("http://netflixroulette.net/api/api.php?director=Quentin%20Tarantino").success(function (response) {
        $scope.response = response;
    });
}]);
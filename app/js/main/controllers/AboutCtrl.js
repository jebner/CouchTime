app.controller('AboutCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.chosenGenre = "";

    $scope.filteredMovies = [];

    $scope.selectedPerson = undefined;
    $http.get("http://api.themoviedb.org/3/configuration?api_key=a9ccf68648c880df3d21b94b1c803110").success(function (response) {
        $scope.baseUrl = response.images.base_url;
    });
    $http.get("http://api.themoviedb.org/3/genre/movie/list?api_key=a9ccf68648c880df3d21b94b1c803110").success(function (response) {
        $scope.genres = response.genres;
    });

    $http.get("http://api.themoviedb.org/3/person/popular?api_key=a9ccf68648c880df3d21b94b1c803110").success(function (response) {
        $scope.people = response.results;
    });

    $scope.submit = function() {
        var link = "http://api.themoviedb.org/3/discover/movie?api_key=a9ccf68648c880df3d21b94b1c803110&with_genres=" + $scope.chosenGenre + "&page=1";
        $http.get(link).success(function (response) {
            $scope.filteredMovies = response.results;
        });
    };

    $scope.pageChanged = function() {
        var link = "http://api.themoviedb.org/3/discover/movie?api_key=a9ccf68648c880df3d21b94b1c803110&with_genres=" + $scope.chosenGenre + "&page=" + $scope.currentPage;
        $http.get(link).success(function (response) {
            $scope.filteredMovies = response.results;
        });
    };
}]);
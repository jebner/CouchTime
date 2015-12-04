app.controller('AboutCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.chosenGenre = "";

    $scope.filteredMovies = [];

    $scope.visualizationMode = false;

    $scope.selectedPerson = undefined;
    $http.get("http://api.themoviedb.org/3/configuration?api_key=a9ccf68648c880df3d21b94b1c803110").success(function (response) {
        $scope.baseUrl = response.images.base_url;
    });

    $http.get("http://api.themoviedb.org/3/genre/movie/list?api_key=a9ccf68648c880df3d21b94b1c803110").success(function (response) {
        $scope.genres = response.genres;
    });


    $scope.submit = function() {
        var link = "http://api.themoviedb.org/3/discover/movie?api_key=a9ccf68648c880df3d21b94b1c803110&with_genres=" + $scope.chosenGenre;
        $http.get(link).success(function (response) {
            $scope.filteredMovies = response.results;
        });
    };

    $scope.showVisualization = function() {
        nv.addGraph(function() {
            var chart = nv.models.discreteBarChart()
                .x(function(d) { return d.label })    //Specify the data accessors.
                .y(function(d) { return d.value })
                .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
                .tooltips(true)        //Don't show tooltips
                .showValues(true)//...instead, show the bar value right on top of each bar.
                .showXAxis(false)
                ;

            d3.select('#chart svg')
                .datum(exampleData())
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });
    }


    function exampleData() {
        $scope.visualizeData = [{
            key: "Cumulative Return",
            values: []
        }];

        for (var i = 0; i < $scope.filteredMovies.length; i++) {
            var tempObj = {
                "label": $scope.filteredMovies[i].title,
                "value": $scope.filteredMovies[i].vote_average
            }
            $scope.visualizeData[0].values.push(tempObj)
        }

        return $scope.visualizeData;
    }

}]);
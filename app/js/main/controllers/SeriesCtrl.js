app.controller('SeriesCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.chosenGenre = "";

    $scope.filteredSeries = [];

    $scope.selectedPerson = undefined;
    $http.get("http://api.themoviedb.org/3/configuration?api_key=a9ccf68648c880df3d21b94b1c803110").success(function (response) {
        $scope.baseUrl = response.images.base_url;
    });
    $http.get("http://api.themoviedb.org/3/genre/tv/list?api_key=a9ccf68648c880df3d21b94b1c803110").success(function (response) {
        $scope.genres = response.genres;
    });

    $http.get("http://api.themoviedb.org/3/person/popular?api_key=a9ccf68648c880df3d21b94b1c803110").success(function (response) {
        $scope.people = response.results;
    });

    $scope.submit = function () {
        var link = "http://api.themoviedb.org/3/discover/tv?api_key=a9ccf68648c880df3d21b94b1c803110&with_genres=" + $scope.chosenGenre;
        $http.get(link).success(function (response) {
            $scope.filteredSeries = response.results;
            $scope.showVisualization();
        });
    };

    $scope.showVisualization = function() {
        nv.addGraph(function() {
            var chart = nv.models.discreteBarChart()
                .x(function(d) { return d.label })    //Specify the data accessors.
                .y(function(d) { return d.value })
                .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
                .tooltips(true)        //Don't show tooltips
                .showValues(false)       //...instead, show the bar value right on top of each bar.
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

        for (var i = 0; i < $scope.filteredSeries.length; i++) {
            var tempObj = {
                "label": $scope.filteredSeries[i].original_name,
                "value": $scope.filteredSeries[i].vote_average
            }
            $scope.visualizeData[0].values.push(tempObj)
        }

        return $scope.visualizeData;
    }

}]);
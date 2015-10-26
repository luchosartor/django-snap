/**
 * Created by Luciano on 29/09/2015.
 */
var app = angular.module('centrality', []);
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{!');
    $interpolateProvider.endSymbol('!}');
});
app.controller('CentralityController', ['$scope', '$http', function ($scope, $http) {
    $scope.rows = 15;
    $scope.pag = 1;
    $scope.disableLeft = true;
    $scope.showSearch = false;
    $scope.ops = ['<', '=', '>', 'between'];
    $scope.jtext = djangoJtext.replace(/&quot;/g, '"');
    $scope.json = JSON.parse($scope.jtext);
    $scope.len = $scope.json.length;
    $scope.fileName = "centrality-startup-net-arg-mini.csv";
    $scope.maxPag = ($scope.json.length % $scope.rows) == 0 ? ($scope.json.length / $scope.rows) : Math.floor(($scope.json.length / $scope.rows) + 1);
    $scope.disableRight = $scope.pag == $scope.maxPag;
    $scope.paginate = function (index) {
        $scope.pag = index;
        $scope.disableLeft = $scope.pag == 1;
        $scope.disableRight = $scope.pag == $scope.maxPag;
    };
    $scope.range = function (from, to) {
        var array = [];
        while (from <= to) {
            array.push(from);
            from++;
        }
        return array;
    };
    $scope.csv = function () {
        document.getElementById('submitter').click()
    };
    $scope.searchStartup = function () {
        $scope.showSearch = $scope.showSearch != true;
    };
    $scope.searchResults = [];
    $scope.searchInput = "";
    $scope.searchStartupByName = function () {
        $scope.searchResults = [];
        $scope.noResult = "";
        if ($scope.searchInput == "") {
            return true;
        }
        for (var i = 0; i < $scope.len; i++) {
            var j = $scope.json[i];
            if (j[0].toString().indexOf($scope.searchInput) != -1) {
                $scope.searchResults.push(j);
            } else if (j[1].toLowerCase().indexOf($scope.searchInput.toLowerCase()) != -1) {
                $scope.searchResults.push(j);
            }
        }
        if ($scope.searchResults.length == 0) {
            $scope.noResult = "No Results";
        }
        return true;
    };
    $scope.clo_sel = '';
    $scope.deg_sel = '';
    $scope.filterStartups = function () {
        $scope.filterResults = [];
        $scope.error = false;
        if ($scope.clo_sel != '') {
            switch ($scope.clo_sel) {
                case '<':
                    var float = parseFloat($scope.clo_input);
                    if(isNaN(float)){
                        $scope.error = true;
                    }
                    for (var i = 0; i < $scope.len; i++) {
                        var j = $scope.json[i];
                        if (j[4] < float) {
                            $scope.filterResults.push(j);
                        }
                    }
                    break;
                case '>':
                    var float = parseFloat($scope.clo_input);
                    if(isNaN(float)){
                        $scope.error = true;
                    }
                    for (var i = 0; i < $scope.len; i++) {
                        var j = $scope.json[i];
                        if (j[4] > float) {
                            $scope.filterResults.push(j);
                        }
                    }
                    break;
                case '=':
                    var float = parseFloat($scope.clo_input);
                    if(isNaN(float)){
                        $scope.error = true;
                    }
                    for (var i = 0; i < $scope.len; i++) {
                        var j = $scope.json[i];
                        if (j[4] == float) {
                            $scope.filterResults.push(j);
                        }
                    }
                    break;
                default:
                    var splitted = $scope.clo_input.split('-');
                    var float1 = parseFloat(splitted[0]);
                    var float2 = parseFloat(splitted[1]);
                    if(isNaN(float1) || isNaN(float2)){
                        $scope.error = true;
                    }
                    for (var i = 0; i < $scope.len; i++) {
                        var j = $scope.json[i];

                        if (j[4] >= float1 && j[4] <= float2) {
                            $scope.filterResults.push(j);
                        }
                    }
            }
        }
        if ($scope.deg_sel != '') {
            switch ($scope.deg_sel) {
                case '<':
                    var float = parseFloat($scope.deg_input);
                    if(isNaN(float)){
                        $scope.error = true;
                    }
                    for (var i = 0; i < $scope.len; i++) {
                        var j = $scope.json[i];
                        if (j[2] < float) {
                            $scope.filterResults.push(j);
                        }else{
                            if($scope.filterResults.indexOf(j) != -1) $scope.filterResults.remove(j);
                        }
                    }
                    break;
                case '>':
                    var float = parseFloat($scope.deg_input);
                    if(isNaN(float)){
                        $scope.error = true;
                    }
                    for (var i = 0; i < $scope.len; i++) {
                        var j = $scope.json[i];
                        if (j[2] > float) {
                            $scope.filterResults.push(j);
                        }else{
                            if($scope.filterResults.indexOf(j) != -1) $scope.filterResults.remove(j);
                        }
                    }
                    break;
                case '=':
                    var float = parseFloat($scope.deg_input);
                    if(isNaN(float)){
                        $scope.error = true;
                    }
                    for (var i = 0; i < $scope.len; i++) {
                        var j = $scope.json[i];
                        if (j[2] == float) {
                            $scope.filterResults.push(j);
                        }else{
                            if($scope.filterResults.indexOf(j) != -1) $scope.filterResults.remove(j);
                        }
                    }
                    break;
                default:
                    var splitted = $scope.deg_input.split('-');
                    var float1 = parseFloat(splitted[0]);
                    var float2 = parseFloat(splitted[1]);
                    if(isNaN(float1) || isNaN(float2)){
                        $scope.error = true;
                    }
                    for (var i = 0; i < $scope.len; i++) {
                        var j = $scope.json[i];

                        if (j[2] >= float1 && j[2] <= float2) {
                            $scope.filterResults.push(j);
                        }else{
                            if($scope.filterResults.indexOf(j) != -1) $scope.filterResults.remove(j);
                        }
                    }
            }
        }


    };
}]);

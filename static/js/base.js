'use strict';

var app = angular.module('baseApp', ['ngResource']);

app.controller('menuController', ['$scope', '$http', function($scope, $http){

    var key = localStorage.getItem('key');

    var compUser = document.getElementById('status-user');
    var compLog = document.getElementById('status-log');


    //init
    $scope.init = function () {
        var curr_url = window.location.pathname;
        if(curr_url != '/login'){
            if (typeof(Storage) !== 'undefined') {
                if(key == null){
                    window.location = '/login';
                }
                else{
                    var user = key.split('.')[0]
                    compUser.innerHTML = user;
                    compLog.innerHTML = 'Logout';
//                    renderMenu(localStorage.getItem('menu'));

                    if(user.startsWith('test')){
                        compUser.innerHTML = user + ' (Developer mode)';
                        document.getElementById('sidebar').className += ' devmode';
                    }

                }
            }
            else {
                alert('Your browser not support WebStorage.');
                window.location = '/login';
            }
        }
    };

    $scope.logout = function() {
            if(compLog.innerHTML === 'Logout'){
                localStorage.clear()
                window.location = '/login';
            }
        };

    $scope.capitalizeFirstLetter = function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function renderMenu(menu){
        $scope.menus = menu.split(',');
    }

}]);

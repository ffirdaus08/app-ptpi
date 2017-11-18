/**
 * Created by hiwijaya on 7/7/17.
 */
'use strict';

angular.module('baseApp').controller('loginController', ['$http', '$scope',
    function ($http, $scope) {

        $scope.login = function() {
            var user = document.getElementById('tx-user').value;
            var pass = document.getElementById('tx-pass').value;
            var key = user + '.' + pass;

            if(user === ''){
                alert('Isi username nya jirr');
                return;
            }
            else if(pass === ''){
                alert('isi password nya');
                return;
            }


            var input = {
                'username': user,
                'password': pass
            }

            $http({
                url: '/api/login',
                method: 'POST',
                data: input
            }).success(function (data, status, headers, config) {
                var response = data;
                if(response.status.code === 0){
                    var roles = response.data.user.role;
                    key += '.' + response.data.user.id;
                    localStorage.setItem('key', key);
                    localStorage.setItem('roles', roles);
                    window.location = '/';
                }
                else{
                    alert('User and password not correct!');
                }
            }).error(function (data, status, headers, config) {
                alert('Error when request to server. Check your connection.');
            });

        };

    }]
 );
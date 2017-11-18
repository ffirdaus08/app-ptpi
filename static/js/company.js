'use strict';

angular.module('baseApp').controller('companyController', ['$http', '$scope',
    function ($http, $scope) {

        var key = localStorage.getItem('key');
        var userId = key.split('.')[2];

        var pnInput = document.getElementById('pn-input');

        var txCompanyName = document.getElementById('tx-company-name');
        var txAddress = document.getElementById('tx-address');
        var txCity = document.getElementById('tx-city');
        var txZipcode = document.getElementById('tx-zipcode');
        var txProvince = document.getElementById('tx-province');
        var txCountry = document.getElementById('tx-country');
        var txPhone = document.getElementById('tx-phone');
        var txFax = document.getElementById('tx-fax');
        var txEmail = document.getElementById('tx-email');
        var txHomepage = document.getElementById('tx-homepage');
        var txHolding = document.getElementById('tx-holding');
        var txAssociate = document.getElementById('tx-associate');
        var txBrand = document.getElementById('tx-brand');
        var txProduct = document.getElementById('tx-product');
        var txLineBusiness = document.getElementById('tx-line-business');

        $scope.selected = null;

        $scope.init = function() {
        console.log('USER ID: ' + userId);
             pnInput.style.display = 'none';

            $http({
                url: '/api/company/get',
                method: 'POST',
            }).success(function (data) {
                var response = data;

                //checkCredential(response);

                if(response.status.code === 0){
                    $scope.companies = response.data;
                }

            }).error(function (data, status, headers, config) {
                alert('Error when request to server. Check your connection.');
            });
        }

        $scope.new = function(){
            $scope.clear();
            pnInput.style.display = '';

        }

        //          untuk validasi
        function validateInput() {
            if(txCompanyName.value === ''){
                alert('Please input company name!');
                return false;
            }

            return true;

        }



        $scope.save = function(){

             if(!validateInput()){
                return;
            }

            var input = {
                id: null,
                name: txCompanyName.value,
                address: txAddress.value,
                city: txCity.value,
                zipcode: txZipcode.value,
                province: txProvince.value,
                country: txCountry.value,
                phone: txPhone.value.toString(),
                fax: txFax.value.toString(),
                email: txEmail.value,
                homepage: txHomepage.value,
                holding: txHolding.value,
                assoc: txAssociate.value,
                brand: txBrand.value,
                product: txProduct.value,
                line_business: txLineBusiness.value,
                user_id: userId,
            }

            if($scope.selected !== null){
                input.id = $scope.selected.id;
            }

            console.log(input);

            $http({
                url: '/api/company/set',
                method: 'POST',
                data: {company : input}
            }).success(function (data) {
                var response = data;

                //checkCredential(response);

                if(response.status.code === 0){
                    alert('Success!');
                }
                else{
                    alert(data.res);
                    return;
                }
                window.location = '/menu/company'
            }).error(function (data, status, headers, config) {
                alert('Error when request to server. Check your connection.');
            });

        }

        $scope.delete = function() {

            var yes = confirm('Are you fucking sure?');
            if(!yes){
                return;
            }

            $http({
                url: '/api/company/drop',
                method: 'POST',
                data: {company_id : $scope.selected.id}
            }).success(function (data) {
                var response = data;

                //checkCredential(response);

               if(response.status.code === 0){
                    alert('Success!');
                }
                else{
                    alert(data.res);
                    return;
                }
                window.location = '/menu/company'

            }).error(function (data, status, headers, config) {
                alert('Error when request to server. Check your connection.');
            });

        }

        $scope.detail = function(index) {
            $scope.selected = $scope.companies[index];

            var company = $scope.selected

            txCompanyName.value = company.name;
            txAddress.value = company.address;
            txCity.value = company.city;
            txZipcode.value = company.zipcode;
            txProvince.value = company.province;
            txCountry.value = company.country;
            txPhone.value = company.phone;
            txFax.value = company.fax;
            txEmail.value = company.email;
            txHomepage.value = company.homepage;
            txHolding.value = company.holding;
            txAssociate.value = company.assoc;
            txBrand.value = company.brand;
            txProduct.value = company.product;
            txLineBusiness.value = company.line_business;

            pnInput.style.display = '';

        }


        $scope.clear = function(){
            txCompanyName.value = '';
            txAddress.value = '';
            txCity.value = '';
            txZipcode.value = '';
            txProvince.value = '';
            txCountry.value = '';
            txPhone.value = null;
            txFax.value = null;
            txEmail.value = '';
            txHomepage.value = '';
            txHolding.value = '';
            txAssociate.value = '';
            txBrand.value = '';
            txProduct.value = '';
            txLineBusiness.value = '';
            pnInput.style.display = 'none';

            $scope.selected = null;     // penting!!
        }


        $scope.dateFormater = function(unformatDate){
            var date = new Date(unformatDate);
            var formatDate = date.toString('ddd, dd  MMM yyyy | hh:mm tt');
            return formatDate;
        }

        function checkCredential(data){
            if(data.res != null && data.res === 'authfail'){
                alert('Authfail. Get your authority again..')
                window.location = '/login';
            }
        }

    }]
 );
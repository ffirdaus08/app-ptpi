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


        $scope.getShortcut = function($event) {
            var target = $event.currentTarget;
            var inputKey = target.value;

            for(var i=0; i < $scope.shortcut.length; i++){
                var sc = $scope.shortcut[i];
                if(sc.key === inputKey){

                    txCity.value = sc.city;
                    txProvince.value = sc.province;
                    txCountry.value = sc.country;

                    return;
                }
            }
        };


         $scope.getSclinebusiness = function($event) {
            var target = $event.currentTarget;
            var inputKey = target.value;

            for(var i=0; i < $scope.shortcut.length; i++){
                var sc = $scope.sclinebusiness[i];
                if(sc.key === inputKey){

                    txLineBusiness.value = sc.line_business;


                    return;
                }
            }
        };




//        SHORTCUT KEY ----------------------------------
        $scope.shortcut = [     // region
            {key: 'bl', city: 'Balikpapan', province: 'Kalimantan Timur', country: 'Indonesia'},
            {key: 'bn', city: 'Bandar Lampung', province: 'Lampung', country: 'Indonesia'},
            {key: 'bd', city: 'Bandung', province: 'Jawa Barat', country: 'Indonesia'},
            {key: 'bj', city: 'Banjarmasin', province: 'Kalimantan Selatan', country: 'Indonesia'},
            {key: 'bk', city: 'Bekasi', province: 'Jawa Barat', country: 'Indonesia'},
            {key: 'bg', city: 'Bogor', province: 'Jawa Barat', country: 'Indonesia'},
            {key: 'dp', city: 'Denpasar', province: 'Bali', country: 'Indonesia'},
            {key: 'jp', city: 'Jakarta Pusat', province: 'DKI Jakarta', country: 'Indonesia'},
            {key: 'jb', city: 'Jakarta Barat', province: 'DKI Jakarta', country: 'Indonesia'},
            {key: 'jt', city: 'Jakarta Timur', province: 'DKI Jakarta', country: 'Indonesia'},
            {key: 'js', city: 'Jakarta Selatan', province: 'DKI Jakarta', country: 'Indonesia'},
            {key: 'ju', city: 'Jakarta Utara', province: 'DKI Jakarta', country: 'Indonesia'},
            {key: 'kw', city: 'Karawang', province: 'Jawa Barat', country: 'Indonesia'},
            {key: 'kt', city: 'Kuta', province: 'Bali', country: 'Indonesia'},
            {key: 'mk', city: 'Makassar', province: 'Sulawesi Selatan', country: 'Indonesia'},
            {key: 'ml', city: 'Malang', province: 'Jawa Timur', country: 'Indonesia'},
            {key: 'mn', city: 'Manado', province: 'Sulawesi Utara', country: 'Indonesia'},
            {key: 'pt', city: 'Pontianak', province: 'Kalimantan Barat', country: 'Indonesia'},
            {key: 'sb', city: 'Surabaya', province: 'Jawa Timur', country: 'Indonesia'},
            {key: 'ts', city: 'Tasikmalaya', province: 'Jawa Barat', country: 'Indonesia'},
            {key: 'tg', city: 'Tangerang', province: 'Banten', country: 'Indonesia'},
            {key: 'yg', city: 'Yogyakarta', province: 'D.I Yogyakarta', country: 'Indonesia'},
        ];



        $scope.sclinebusiness = [     // line Business
            {key: 'B1', line_business: 'BAKERY'},
            {key: 'B2', line_business: 'BUILDING CONTRACTOR'},
            {key: 'B3', line_business: 'CAFE'},
            {key: 'B4', line_business: 'CAKE'},
            {key: 'B5', line_business: 'CARGO'},
            {key: 'B6', line_business: 'COTTAGE'},
            {key: 'B7', line_business: 'DEVELOPER'},
            {key: 'B8', line_business: 'DISTRIBUTOR'},
            {key: 'B9', line_business: 'FOOD SUPPLY'},
            {key: 'B10', line_business: 'GAS COMPANIES'},
            {key: 'B11', line_business: 'GAS EQUIPMENT SUPPLY'},
            {key: 'B12', line_business: 'GAS EXPLORATION'},
            {key: 'B13', line_business: 'GAS MATERIAL SUPPLY'},
            {key: 'B14', line_business: 'GAS PROCESSING'},
            {key: 'B15', line_business: 'GENERAL TRADING'},
            {key: 'B16', line_business: 'GOVERNMENT'},
            {key: 'B17', line_business: 'HOTEL'},
            {key: 'B18', line_business: 'IMPORT'},
            {key: 'B19', line_business: 'INSURANCE'},
            {key: 'B20', line_business: 'LIGHTNING'},
            {key: 'B21', line_business: 'MARKETING'},
            {key: 'B22', line_business: 'MEDICAL SERVICES'},
            {key: 'B23', line_business: 'MINING COMPANIES'},
            {key: 'B24', line_business: 'MINING SERVICES COMPANIES'},
            {key: 'B25', line_business: 'MINING SUPPLY COMPANIES'},
            {key: 'B26', line_business: 'MOULD & DIE'},
            {key: 'B27', line_business: 'OFFSHORE FLOATING'},
            {key: 'B28', line_business: 'OFFSHORE PLATFORM'},
            {key: 'B29', line_business: 'OIL AND GAS COMPANIES'},
            {key: 'B30', line_business: 'OIL AND GAS CONSULTANT'},
            {key: 'B31', line_business: 'OILFIELD'},
            {key: 'B32', line_business: 'OTHERS'},
            {key: 'B33', line_business: 'PLASTIC'},
            {key: 'B34', line_business: 'PRINTING'},
            {key: 'B35', line_business: 'REPAIR SERVICES'},
            {key: 'B36', line_business: 'RESORT'},
            {key: 'B37', line_business: 'RESTAURANT'},
            {key: 'B38', line_business: 'STORAGE'},
            {key: 'B39', line_business: 'SUPERMARKET'},
            {key: 'B40', line_business: 'SUPPLIER'},
            {key: 'B41', line_business: 'TOURISM'},
            {key: 'B42', line_business: 'TRANSPORT'},
            {key: 'B43', line_business: 'WELDING'},
            {key: 'B44', line_business: 'WHOLESALER'},
            {key: 'B45', line_business: 'WOODWORKING'},

        ];

    }]
 );
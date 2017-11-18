'use strict';

angular.module('baseApp').controller('customerController', ['$http', '$scope',
    function ($http, $scope) {

        var key = localStorage.getItem('key');
        var userId = key.split('.')[2];


        var pnInput = document.getElementById('pn-input');

        var txCustomerName = document.getElementById('tx-customer-name');
        var txTitle = document.getElementById('tx-title');
//      variabel status radio button
        var rdmr = document.getElementById('rd-mr');
        var rdmrs = document.getElementById('rd-mrs');
        var rdms = document.getElementById('rd-ms');

        var txTitleCategory = document.getElementById('tx-title-category');
        var txEselon = document.getElementById('tx-eselon');
        var txMobilePhone = document.getElementById('tx-mobile-phone');
        var txPrivateMail = document.getElementById('tx-private-mail');
        var txCompanyID = document.getElementById('tx-company-id');
        var txEventID = document.getElementById('tx-event-id');

        var btEvent = document.getElementById('bt-event');

        var modalEvent = document.getElementById('modal-kuisioner');
        var txSource = document.getElementById('tx-source');
        var txKodeTiket = document.getElementById('tx-kode-tiket');
        var txListVisit = document.getElementById('tx-list-visit');
        var txListProduct = document.getElementById('tx-list-product');


        $scope.selected = null;

        $scope.init = function() {
        console.log('USER ID: ' + userId);
             pnInput.style.display = 'none';
             btEvent.style.display = 'none';

             $http({
                url: '/api/company/get',
                method: 'POST',
            }).success(function (data) {
                var response = data;

                //checkCredential(response);

                if(response.status.code === 0){
                //companies
                    $scope.companies = response.data;
                }

            }).error(function (data, status, headers, config) {
                alert('Error when request to server. Check your connection.');
            });

            $http({
                url: '/api/event/get',
                method: 'POST',
            }).success(function (data) {
                var response = data;

                //checkCredential(response);

                if(response.status.code === 0){

                    $scope.events = response.data;
                }

            }).error(function (data, status, headers, config) {
                alert('Error when request to server. Check your connection.');
            });

            $http({
                url: '/api/customer/get',
                method: 'POST',
            }).success(function (data) {
                var response = data;

                //checkCredential(response);

                if(response.status.code === 0){

                    $scope.customers = response.data;
                }

            }).error(function (data, status, headers, config) {
                alert('Error when request to server. Check your connection.');
            });

        }

        $scope.new = function(){
            $scope.clear();
            pnInput.style.display = '';

        }

//            untuk id company jadi nama company
        $scope.getCompanyById = function(id){
            for(var i=0; i < $scope.companies.length; i++){
                var company = $scope.companies[i];
                if(id === company.id){
                    return company.name;
                }
            }
        }

        $scope.getEventById = function(id){
            for(var i=0; i < $scope.events.length; i++){
                var event = $scope.events[i];
                if(id === event.id){
                    return event.title;
                }
            }
        }

//          untuk validasi
        function validateInput() {
            if(txCustomerName.value === ''){
                alert('Please input your fucking name!');
                return false;
            }

            return true;

        }


        $scope.save = function(){

            if(!validateInput()){
                return;
            }

            var cid = $scope.companies[txCompanyID.selectedIndex].id;
            var status = '';
            if(rdmr.checked){
                status = 'mr';
            }
            else if(rdmrs.checked){
                status = 'mrs';
            }
            else{
                status = 'ms';
            }



            var input = {
                id: null,
                name: txCustomerName.value,
                status: status,
                title: txTitle.value,
                title_category: txTitleCategory.value,
                eselon: txEselon.value,
                mobile_phone: txMobilePhone.value,
                private_mail: txPrivateMail.value,
                company_id: cid,
                user_id: userId,
            }

            if($scope.selected !== null){
                input.id = $scope.selected.id;
            }

            console.log(input);

            $http({
                url: '/api/customer/set',
                method: 'POST',
                data: {customer: input}
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
                window.location = '/menu/customer'
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
                url: '/api/customer/drop',
                method: 'POST',
                data: {customer_id : $scope.selected.id}
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
                window.location = '/menu/customer'

            }).error(function (data, status, headers, config) {
                alert('Error when request to server. Check your connection.');
            });

        }

        $scope.detail = function(index) {
        // --> customers
            $scope.selected = $scope.customers[index];

             var customer = $scope.selected

            txCustomerName.value = customer.name;
            var status = customer.status;
            if(status === 'mr'){
                rdmr.checked = true;
            }
            else if(status === 'mrs'){
                rdmrs.checked = true;
            }
            else{
                rdms.checked = true;
            }
            txTitle.value = customer.title;
            txTitleCategory.value = customer.title_category;
            txEselon.value = customer.eselon;
            txMobilePhone.value = customer.mobile_phone;
            txPrivateMail.value = customer.private_mail;
            txCompanyID.value = customer.company_id;
            txEventID.value = customer.event_id

            pnInput.style.display = '';
            btEvent.style.display = '';

        }


        $scope.clear = function(){
            txCustomerName.value = '';
            rdmr.checked = true;
            txTitle.value = '';
            txTitleCategory.value = '';
            txMobilePhone.value = null;
            txPrivateMail.value = '';
//          txCompanyID.value = null;
//          txEventID.value = null;

            txSource.value = null;
            txKodeTiket.value = null;
            txListVisit.value = '';
            txListProduct.value = '';

            pnInput.style.display = 'none';


            $scope.selected = null;     // penting!!
        }


        $scope.showEvent = function() {

            modalEvent.style.display = 'block';

        }

        $scope.closeEvent = function() {
            modalEvent.style.display = 'none';
        }


        $scope.addEvent = function() {

            var c_id = $scope.selected.id;
            var e_id = txEventID.value;

            var survey_data = {
                source: txSource.value,
                ticket_code: txKodeTiket.value,
                list_visit_interest: txListVisit.value,
                list_product_interest: txListProduct.value,
                customer_id: c_id,
                event_id: e_id
            }

            var input = {
                customer_id: c_id,
                event_id: e_id,
                survey_data: survey_data
            }


            $http({
                url: '/api/event/set',
                method: 'POST',
                data: input
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
                window.location = '/menu/customer'
            }).error(function (data, status, headers, config) {
                alert('Error when request to server. Check your connection.');
            });

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




    }
]);
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

//          untuk validasi nama customer
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




// shortcut //


        $scope.getShortcut = function($event) {
            var target = $event.currentTarget;
            var inputKey = target.value;

            for(var i=0; i < $scope.shortcut.length; i++){
                var sc = $scope.shortcut[i];
                if(sc.key === inputKey){

                    txTitleCategory.value = sc.title_category;


                    return;
                }
            }
        };



         $scope.getScJob = function($event) {
            var target = $event.currentTarget;
            var inputKey = target.value;

            for(var i=0; i < $scope.shortcut.length; i++){
                var sc = $scope.scjob[i];
                if(sc.key === inputKey){

                    txTitle.value = sc.title;
                    txEselon.value = sc.eselon;
                    txTitleCategory.value = sc.title_category;


                    return;
                }
            }
        };





//        SHORTCUT KEY ----------------------------------


        $scope.shortcut = [     // region
            {key: '1', title_category: 'ACCOUNTING'},
            {key: '2', title_category: 'ADMINISTRATION'},
            {key: '3', title_category: 'ADVISIOR'},
            {key: '4', title_category: 'ARCHITECT'},
            {key: '5', title_category: 'ASSISTANT MANAGER'},
            {key: '6', title_category: 'CORPORATE MANAGEMENT'},
            {key: '7', title_category: 'DRAFTMAN'},
            {key: '8', title_category: 'EXECUTIVE CHEF'},
            {key: '9', title_category: 'FOOD & BEVERAGE'},
            {key: '10', title_category: 'FOOD TEHCNOLOGIES'},
            {key: '11', title_category: 'HRD'},
            {key: '12', title_category: 'LOGISTIC'},
            {key: '1', title_category: 'MANAGEMENT REPRESENTATIVE'},
            {key: '14', title_category: 'MANAGER'},
            {key: '15', title_category: 'MARKETING'},
            {key: '16', title_category: 'OPERATION'},
            {key: '17', title_category: 'OTHERS'},
            {key: '18', title_category: 'PASTRY CHEF'},
            {key: '19', title_category: 'PLANT MANAGEMENT'},
            {key: '20', title_category: 'PRESS'},
            {key: '21', title_category: 'PROCUREMENT'},
            {key: '22', title_category: 'PRODUCTION'},
            {key: '2', title_category: 'PURCHASING'},
            {key: '2', title_category: 'QUALITY ASSURANCE'},
            {key: '25', title_category: 'QUALITY CONTROL'},
            {key: '26', title_category: 'RESEARCH/DEVELOPMENT'},
            {key: '27', title_category: 'SAFETY MANAGEMENT'},
            {key: '28', title_category: 'SALES'},
            {key: '29', title_category: 'SUPERVISOR'},
            {key: '30', title_category: 'TESTER'},
            {key: '31', title_category: 'EDUCATION'},

         ];



        $scope.scjob = [     // region
            {key: 'adm', title: 'Administration Manager', eselon: '2', title_category: 'ADMINISTRATION'},
            {key: 'am', title: 'Assistant Manager', eselon: '3', title_category: 'ASSISTANT MANAGER'},
            {key: 'ar', title: 'Architect', eselon: '3', title_category: 'ARCHITECT/DRAFTMAN/DESIGNER'},
            {key: 'bd', title: 'Business Development', eselon: '3', title_category: 'RESEARCH/DEVELOPMENT'},
            {key: 'bdm', title: 'Business Development Manager', eselon: '2', title_category: 'RESEARCH/DEVELOPMENT'},
            {key: 'd', title: 'Director', eselon: '1', title_category: 'CORPORATE MANAGEMENT'},
            {key: 'ec', title: 'Executive Chef', eselon: '2', title_category: 'CHEF/COOK/EXECUTIVE CHEF'},
            {key: 'eg', title: 'Engineer', eselon: '3', title_category: 'ENGINEERING/ELECTRICAL'},
            {key: 'em', title: 'Engineer Manager', eselon: '2', title_category: 'ENGINEERING/ELECTRICAL'},
            {key: 'hr', title: 'Human Resource', eselon: '3', title_category: 'EDUCATION/TRAINING/HRD'},
            {key: 'm', title: 'Manager', eselon: '2', title_category: 'MANAGER'},
            {key: 'mk', title: 'Marketing', eselon: '3', title_category: 'SALES/MARKETING'},
            {key: 'mm', title: 'Marketing Manager', eselon: '2', title_category: 'SALES/MARKETING'},
            {key: 'o', title: 'Owner', eselon: '1', title_category: 'CORPORATE MANAGEMENT'},
            {key: 'pc', title: 'Purchasing', eselon: '3', title_category: 'PURCHASING/BUYER/LOGISTIC'},
            {key: 'pcm', title: 'Purchasing Manager', eselon: '2', title_category: 'PURCHASING/BUYER/LOGISTIC'},
            {key: 'pd', title: 'President Director', eselon: '1', title_category: 'CORPORATE MANAGEMENT'},
            {key: 'pm', title: 'Project Manager', eselon: '2', title_category: 'PROJECT/PLANT MANAGEMENT'},
            {key: 'pr', title: 'Production', eselon: '3', title_category: 'PRODUCTION/OPERATION'},
            {key: 'prm', title: 'Production Manager', eselon: '2', title_category: 'PRODUCTION/OPERATION'},
            {key: 'rd', title: 'Research & Development', eselon: '3', title_category: 'RESEARCH/DEVELOPMENT'},
            {key: 'rdm', title: 'Research & Development Manager', eselon: '2', title_category: 'RESEARCH/DEVELOPMENT'},
            {key: 'rm', title: 'Restaurant Manager', eselon: '2', title_category: 'RESTAURANT OPERATION'},
            {key: 'qa', title: 'Quality Assurance', eselon: '3', title_category: 'QUALITY CONTROL/ASSURANCE'},
            {key: 'qc', title: 'Quality Control', eselon: '3', title_category: 'QUALITY CONTROL/ASSURANCE'},
            {key: 'sm', title: 'Sales Manager', eselon: '2', title_category: 'SALES/MARKETING'},
            {key: 'sr', title: 'Sales Representative', eselon: '3', title_category: 'SALES/MARKETING'},
            {key: 'tc', title: 'Technical', eselon: '3', title_category: 'TECHNICAL MANAGEMENT'},
            {key: 'vp', title: 'Vice President', eselon: '1', title_category: 'CORPORATE MANAGEMENT'},
            {key: 'un', title: 'Unknown', eselon: '5', title_category: 'OTHERS'},


         ];
    }
]);
angular.module('starter').controller('listaLocaisCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, $timeout, Scopes, FormatarCsv, PopUps, CriarDiretorio) {


// // Links úteis
//https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
// http://angular-ui.github.io/ui-grid/
// http://plnkr.co/edit/50vJrs?p=preview
// http://www.igniteui.com/javascript-excel-library/excel-import-data
// http://jsfiddle.net/gh/get/jquery/1.9.1/igniteuisamples/jsfiddle-samples/tree/master/EN/HtmlSamples/javascript-excel-library/excel-import-data/
// http://brianhann.com/easily-import-spreadsheets-into-ui-grid/
// https://github.com/aaronksaunders/hu1/wiki/2.1-Using-ng-repeat-in-Ionic-ListView
// https://github.com/SheetJS/js-xlsx
// https://github.com/brexis/angular-js-xlsx
// http://codetheory.in/parse-read-excel-files-xls-xlsx-javascript/


//**********************************************************************************************************//

// USANDO UI-GRID
// http://ui-grid.info/docs/#/tutorial/101_intro


// $scope.myData = [
//     {
//         "firstName": "Cox",
//         "lastName": "Carney",
//         "company": "Enormo",
//         "employed": true
//     },
//     {
//         "firstName": "Lorraine",
//         "lastName": "Wise",
//         "company": "Comveyer",
//         "employed": false
//     },
//     {
//         "firstName": "Nancy",
//         "lastName": "Waters",
//         "company": "Fuelton",
//         "employed": false
//     }
// ];


//**********************************************************************************************************//


// function loadJSON(callback) {
//
//     var xobj = new XMLHttpRequest();
//         xobj.overrideMimeType("application/json");
//     xobj.open('GET', 'js/locais.json', true); // Replace 'locais' with the path to your file
//     xobj.onreadystatechange = function () {
//           if (xobj.readyState == 4 && xobj.status == "200") {
//             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//             callback(xobj.responseText);
//           }
//     };
//     xobj.send(null);
//  }
//
//
// function init() {
//  loadJSON(function(response) {
//   // Parse JSON string into object
//     var actual_JSON = JSON.parse (response);
//     $scope.myData = actual_JSON;
//  });
// }
//
// init();




//**********************************************************************************************************//



//// Fazendo este aqui >>>>>>>>>>>>>>>>>  http://ui-grid.info/docs/#/tutorial/201_editable



// var myString = '{"COD_BEM":0000000001,"DESC_BEM":"SISTEMA OPERACIONAL WINDOWS XP PRO SP3 C","CHAPA":0000000001C,"COD_LOCAL":000053},{"COD_BEM":0000000001,"DESC_BEM":"SOFTWARE CYBERLINK POWER DVD 8.3 SEM MID","CHAPA":0000000001B,"COD_LOCAL":000053}';
// console.log(JSON.parse(myString));
//
//
// $scope.gridOptions = {  };
//
// $scope.storeFile = function( gridRow, gridCol, files ) {
//   // ignore all but the first file, it can only select one anyway
//   // set the filename into this column
//   gridRow.entity.filename = files[0].name;
//
//   // read the file and set it into a hidden column, which we may do stuff with later
//   var setFile = function(fileContent){
//     gridRow.entity.file = fileContent.currentTarget.result;
//     // put it on scope so we can display it - you'd probably do something else with it
//     $scope.lastFile = fileContent.currentTarget.result;
//     $scope.$apply();
//   };
//   var reader = new FileReader();
//   reader.onload = setFile;
//   reader.readAsText( files[0] );
// };
//
// $scope.gridOptions.columnDefs = [
//   { name: 'COD_BEM', enableCellEdit: false, displayName: 'CÓDIGO', width: '15%' },
//   { name: 'DESC_BEM', displayName: 'DESCRIÇÃO (editable)', width: '30%' },
//   { name: 'CHAPA', enableCellEdit: false, width: '15%' },
//   { name: 'COD_LOCAL', displayName: 'CÓDIGO LOCAL (editable)', width: '20%' }
// ];
//
//
//
//
//
//
//   // ///////////////// MDS, OLHA QUANTA COISA
//
//   // { name: 'age', displayName: 'Age' , type: 'number', width: '10%' },
//   // { name: 'gender', displayName: 'Gender', editableCellTemplate: 'ui-grid/dropdownEditor', width: '20%',
//   //   cellFilter: 'mapGender', editDropdownValueLabel: 'gender', editDropdownOptionsArray: [
//   //   { id: 1, gender: 'male' },
//   //   { id: 2, gender: 'female' }
//   // ] },
//   // { name: 'registered', displayName: 'Registered' , type: 'date', cellFilter: 'date:"yyyy-MM-dd"', width: '20%' },
//   // { name: 'address', displayName: 'Address', type: 'object', cellFilter: 'address', width: '30%' },
//   // { name: 'address.city', displayName: 'Address (even rows editable)', width: '20%',
//   //      cellEditableCondition: function($scope){
//   //      return $scope.rowRenderIndex%2;
//   //      }
//   // },
//   // { name: 'isActive', displayName: 'Active', type: 'boolean', width: '10%' },
//   // { name: 'pet', displayName: 'Pet', width: '20%', editableCellTemplate: 'ui-grid/dropdownEditor',
//   //   editDropdownRowEntityOptionsArrayPath: 'foo.bar[0].options', editDropdownIdLabel: 'value'
//   // },
//   // { name: 'status', displayName: 'Status', width: '20%', editableCellTemplate: 'ui-grid/dropdownEditor',
//   //   cellFilter: 'mapStatus',
//   //   editDropdownOptionsFunction: function(rowEntity, colDef) {
//   //     var single;
//   //     var married = {id: 3, value: 'Married'};
//   //     if (rowEntity.gender === 1) {
//   //       single = {id: 1, value: 'Bachelor'};
//   //       return [single, married];
//   //     } else {
//   //       single = {id: 2, value: 'Nubile'};
//   //       return $timeout(function() {
//   //         return [single, married];
//   //       }, 100);
//   //     }
//   //   }
//   // },
//   // { name: 'filename', displayName: 'File', width: '20%', editableCellTemplate: 'ui-grid/fileChooserEditor',
//   //   editFileChooserCallback: $scope.storeFile }
//
//
// $scope.msg = {};
//
// $scope.gridOptions.onRegisterApi = function(gridApi){
//         //set gridApi on scope
//         $scope.gridApi = gridApi;
//         gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
//           $scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
//           $scope.$apply();
//         });
//       };
//
// $http.get ('js/bens.json')
//   .success(function(data) {
//     //for(i = 0; i < data.length; i++){
//       //data[i].registered = new Date(data[i].registered);
//       //data[i].gender = data[i].gender==='male' ? 1 : 2;
//     //   if (i % 2) {
//     //     data[i].pet = 'fish';
//     //     data[i].foo = {bar: [{baz: 2, options: [{value: 'fish'}, {value: 'hamster'}]}]};
//     //   }
//     //   else {
//     //     data[i].pet = 'dog';
//     //     data[i].foo = {bar: [{baz: 2, options: [{value: 'dog'}, {value: 'cat'}]}]};
//     //   }
//     //}
//
//     $scope.gridOptions.data = data;
//   });
//
//
// // .filter('mapGender', function() {
// // var genderHash = {
// //   1: 'male',
// //   2: 'female'
// // };
// //
// // return function(input) {
// //   if (!input){
// //     return '';
// //   } else {
// //     return genderHash[input];
// //   }
// // };
// // })
// //
// // .filter('mapStatus', function() {
// // var genderHash = {
// //   1: 'Bachelor',
// //   2: 'Nubile',
// //   3: 'Married'
// // };
// //
// // return function(input) {
// //   if (!input){
// //     return '';
// //   } else {
// //     return genderHash[input];
// //   }
// // };
//
//
//


//**********************************************************************************************************//


//// usando o  ALASQL
//// https://github.com/agershun/alasql


// var $ = require('jquery');
// console.log('passou do require');

// $scope.locais = [
//   { COD_LOCAL: '123562', DESC_LOCAL: 'DESCRIÇÃO TESTE' },
//   { COD_LOCAL: '458569', DESC_LOCAL: 'DESCRIÇÃO TESTE'},
//   { COD_LOCAL: '23452', DESC_LOCAL:'DESCRIÇÃO TESTE'},
//   { COD_LOCAL: '52345', DESC_LOCAL: 'DESCRIÇÃO TESTE' }
// ];




// // ESSE AQUI FUNCIONA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ELE LISTA O JSON NA TELA (MAS NÃO USA ALASQL)
$scope.locais= [];
$http.get('js/locais.json').then(function(response) {
    $scope.locais =response.data;
    locais = $scope.locais;
    console.log($scope.locais);
});




/////////ESSE AQUI FUNCIONA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ELE LISTA O XLSX NA TELA (USA ALASQL)

// alert('passou do require: ' + alasql);
//
//           alasql('select COD_LOCAL, DESC_LOCAL from xlsx("js/Lista_de_Locais.xlsx",{headers:true})\ WHERE COD_LOCAL == "000053"',
//               [],function(data){
//               console.log(data);
//               $scope.locais = data;
//           });
//
//
// $scope.exportData = function () {
//         alasql('SELECT * INTO XLSX("locais.xlsx",{headers:true}) FROM ?',[$scope.locais]);
//     };











///////////////////////////////////////  TESTE PARA LISTA COM INFINTE-SCROLL (NÃO FUNCIONANDO)

// alasql.promise('SELECT * FROM xlsx("js/Lista_de_Bens.xlsx",{headers:true})')
// .then(function(res) {
//
//     // ACHOU
//     alert('Encontrou com o alaSQL');
//     //console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);
//
//     $scope.bens = res;
//     //var bens = $scope.bens; //Precisa disso?
//     console.log('Bens foi preenchido.');
//
//
// // $scope.loadMoreData = function() {
// $http.get(res).then(function(resp) {
//      $scope.bens = resp;// json format replace with your data format returned from server
//      $scope.$broadcast('scroll.infiniteScrollComplete');
//
//   }, function(err) {
//     console.error('ERR', err);
//     // err.status will contain the status code
//   });
//   // };
// });





















































});

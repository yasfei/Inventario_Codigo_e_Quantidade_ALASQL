angular.module('starter').controller('consultarProdutoCtrl', function($scope, $state, $cordovaFile, $stateParams, $ionicPopup, $timeout, $http, $location, Scopes, PopUps, CriarDiretorio, buscaArquivos) {

  console.log('Entrou no controller de Consultar Produto ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');
  console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080, 00518 (duas entradas), 000898 (sem local)');

  $scope.dados = Scopes.getLocal();
  console.log($scope.dados);

  $scope.fecharApp = function() {
    console.log('Apertou o fechar');
    PopUps.showConfirm();

  };


  $scope.zerarVar = function(){
  console.log('Entrou no zeraVar');

    //// Para zerar o local se tiver voltado do EditarProduto
    local = undefined;
    $scope.local = undefined;
    $scope.bemEncontrado = undefined;
  };



  /////////////////////////////
  ////// ESCOLHER UM BEM //////
  ////////////////////////////

  $scope.editarBem = function(bem, dados) {
    // alert('Entrou no editarBem');

    if (bem.COD_LOCAL !== undefined && bem.COD_LOCAL === dados.COD_LOCAL) {
      ////Faz nada se o local não for encontrado, só cai no catch (gambiarra)
    } else {
      console.log('Entrou no editarBem, vai fazer o alaSQL');

      // var dir = "files/Lista_de_Locais.xlsx";
      var arquivoLocais = Scopes.getArquivoLocais();

      alasql.promise('SELECT DESC_LOCAL FROM ? \ WHERE COD_LOCAL == ?', [arquivoLocais, bem.COD_LOCAL])
        .then(function(res) {

          // ACHOU O LOCAL E PEGOU O PRIMEIRO
          console.log('Encontrou o local com o alaSQL');
          console.log('Resultado do ALQSQL: ' + res[0]);
          dados.DESC_LOCAL_DO_BEM = res[0].DESC_LOCAL;

          Scopes.setLocal(dados);
          Scopes.setBem(bem);
          console.log('Local: ' + dados);

          $state.go('app.editarProduto');


        }).catch(function(err) { // NÃO ENCONTROU O LOCAL


          console.log("COD_LOCAL do BEM não estava cadastrado! Gambiarra no try/cath");
          dados.DESC_LOCAL_DO_BEM = "LOCAL NÃO CADASTRADO";
          Scopes.setLocal(dados);
          Scopes.setBem(bem);
          console.log('Local: ' + dados);
          console.log('Bem: ' + bem);

          $state.go('app.editarProduto');


        });

    }
  };



///////////////////////////////////////
////// BUSCAR UM BEM PELA CHAPA //////
/////////////////////////////////////


  $scope.buscaBem = function(bem) {

                var arquivoBens = Scopes.getArquivo();
                // alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA == ?', [arquivoBens, bem.CHAPA])
                alasql.promise('SELECT * FROM ? WHERE CHAPA == ?', [arquivoBens, bem.CHAPA])
                  .then(function(res) {

                    //ACHOU O LOCAL E PEGOU O PRIMEIRO
                    console.log('Resultado do ALQSQL: ' + res[0]);
                    $scope.bemEncontrado = res;
                    console.log('Bem foi encontrado.');

                    //Para atualizar a lista
                    $scope.$apply(function() {
                      $scope.bemEncontrado = res;
                    });

                    // $state.go('app.consultarProdutoCtrl');
                    // $scope.$broadcast('scroll.refreshComplete');


                  }).catch(function(err) { // NÃO ENCONTROU O LOCAL

                    PopUps.erroConsultar("Bem não encontrado!");
                  });


};


//
//
//       arquivo = "csv"; //PARA TESTE POR ENQUANTO QUE O DE CIMA NÃO PEGA
//       if (arquivo === "csv") {
//         dir = "files/Lista_de_Bens.csv";
//
//
//         alasql.promise('SELECT * FROM csv(?,{headers:true})\ WHERE CHAPA == ?', [dir, bem.COD_BEM])
//           .then(function(res) {
//
//             //ACHOU O LOCAL E PEGOU O PRIMEIRO
//             console.log('Resultado do ALQSQL: ' + res[0]);
//             $scope.bemEncontrado = res;
//             console.log('Bem foi encontrado.');
//
//             //Para atualizar a lista
//             $scope.$apply(function() {
//               $scope.bemEncontrado = res;
//             });
//
//             // $state.go('app.consultarProdutoCtrl');
//             // $scope.$broadcast('scroll.refreshComplete');
//
//
//           }).catch(function(err) { // NÃO ENCONTROU O LOCAL
//
//             PopUps.erroConsultar("Bem não encontrado!");
//           });
//
//       } else {
//         if (arquivo === "xslx") {
//           dir = "<sdcard>/Queiroz Galvão/Lista_de_Bens.xlsx";
//
//
//           alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA == ?', [dir, bem.COD_BEM])
//             .then(function(res) {
//
//               //ACHOU O LOCAL E PEGOU O PRIMEIRO
//               console.log('Resultado do ALQSQL: ' + res[0]);
//               $scope.bemEncontrado = res;
//               console.log('Bem foi encontrado.');
//
//               //Para atualizar a lista
//               $scope.$apply(function() {
//                 $scope.bemEncontrado = res;
//               });
//
//               // $state.go('app.consultarProdutoCtrl');
//               // $scope.$broadcast('scroll.refreshComplete');
//
//
//             }).catch(function(err) { // NÃO ENCONTROU O LOCAL
//
//               PopUps.erroConsultar("Bem não encontrado!");
//             });
//
//
//
//         } else {
//           if (arquivo === "xls") {
//             dir = "<sdcard>/Queiroz Galvão/Lista_de_Bens.xls";
//
//
//             alasql.promise('SELECT * FROM xls(?,{headers:true})\ WHERE CHAPA == ?', [dir, bem.COD_BEM])
//               .then(function(res) {
//
//                 //ACHOU O LOCAL E PEGOU O PRIMEIRO
//                 console.log('Resultado do ALQSQL: ' + res[0]);
//                 $scope.bemEncontrado = res;
//                 console.log('Bem foi encontrado.');
//
//                 //Para atualizar a lista
//                 $scope.$apply(function() {
//                   $scope.bemEncontrado = res;
//                 });
//
//                 // $state.go('app.consultarProdutoCtrl');
//                 // $scope.$broadcast('scroll.refreshComplete');
//
//
//               }).catch(function(err) { // NÃO ENCONTROU O LOCAL
//
//                 PopUps.erroConsultar("Bem não encontrado!");
//               });
//
//
//           } else {
//             dir = "files/Lista_de_Bens.xlsx";
//
//
//             alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA == ?', [dir, bem.COD_BEM])
//               .then(function(res) {
//
//                 //ACHOU O LOCAL E PEGOU O PRIMEIRO
//                 console.log('Resultado do ALQSQL: ' + res[0]);
//                 $scope.bemEncontrado = res;
//                 console.log('Bem foi encontrado.');
//
//                 //Para atualizar a lista
//                 $scope.$apply(function() {
//                   $scope.bemEncontrado = res;
//                 });
//
//                 // $state.go('app.consultarProdutoCtrl');
//                 // $scope.$broadcast('scroll.refreshComplete');
//
//
//               }).catch(function(err) { // NÃO ENCONTROU O LOCAL
//
//                 PopUps.erroConsultar("Bem não encontrado!");
//               });
//
//           }
//         }
//       }
//
//     // }, function(error) {
//     //   console.log("Não fez o checkArquivo" + error);
//     // });
//
//
//     }else{
//
//     // Se não estiver no device
//     console.log("Não está no device então pegou o arquivo dentro do app");
//
//     dir = "files/Lista_de_Bens.xlsx";
//     alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA == ?', [dir, bem.COD_BEM])
//       .then(function(res) {
//
//         //ACHOU O LOCAL E PEGOU O PRIMEIRO
//         console.log('Resultado do ALQSQL: ' + res[0]);
//         $scope.bemEncontrado = res;
//         console.log('Bem foi encontrado.');
//
//         //Para atualizar a lista
//         $scope.$apply(function() {
//           $scope.bemEncontrado = res;
//         });
//
//       }).catch(function(err) { // NÃO ENCONTROU O LOCAL
//
//         PopUps.erroConsultar("Bem não encontrado!");
//       });
//     } //Se não estiver no device
//
//
//
//
//   };
//
//   // ////**********************************************************************************************************//
//   // /*****************   CONTROLLER DE CONSULTAR PRODUTO COM LISTA ******************/
//   //
//   // //Início do alaSQL
//   // alasql.promise('SELECT * FROM xlsx("js/Lista_de_Bens.xlsx",{headers:true})')
//   //   .then(function(res) {
//   //
//   //     // ACHOU
//   //     console.log('Encontrou com o alaSQL');
//   //     //console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);
//   //
//   //     $scope.bens = res;
//   //     //var bens = $scope.bens; //Precisa disso?
//   //     console.log('Bens foi preenchido.');
//   //
//   //
//   //     ////// INFINITE SCROLL (funciona, mas inviabiliza a busca) (Não funcionando no debug, emulador ou chrome)
//   //     // $scope.noMoreItemsAvailable = false;
//   //     // $scope.todosBens = res;
//   //     // $scope.bens = [];
//   //     // var i=0;
//   //     // $scope.loadMore = function() {
//   //     //   $scope.bens.push({
//   //     //     id: $scope.todosBens.length,
//   //     //     COD_BEM: $scope.todosBens[i].COD_BEM,
//   //     //     CHAPA: $scope.todosBens[i].CHAPA,
//   //     //     DESC_BEM: $scope.todosBens[i].DESC_BEM,
//   //     //     COD_LOCAL: $scope.todosBens[i].COD_LOCAL
//   //     //   });
//   //     //
//   //     //   i++;
//   //     //
//   //     //
//   //     //   if ($scope.bens.length == 99) {
//   //     //     $scope.noMoreItemsAvailable = true;
//   //     //   }
//   //     //   $scope.$broadcast('scroll.infiniteScrollComplete');
//   //     // };
//   //
//   //
//   //     // ///// (OUTRO EXEMPLO QUE NÃO ESTÁ FUNCIONANDO)
//   //     // $scope.bens = [];
//   //     // $scope.loadMoreData = function() {
//   //     // $http.get('url_to_load content').then(function(resp) {
//   //     //      $scope.items = resp.item;// json format replace with your data format returned from server
//   //     //      $scope.$broadcast('scroll.infiniteScrollComplete');
//   //     //
//   //     //   }, function(err) {
//   //     //     console.error('ERR', err);
//   //     //     // err.status will contain the status code
//   //     //   });
//   //     //   };
//   //
//   //
//   //     /*****************/
//   //     ////// Só começa o controller depois que passa pelo alaSQL (porque ele está async?)
//   //
//   //
//   //     $scope.dados = Scopes.getLocal();
//   //     dados = Scopes.getLocal();
//   //
//   //
//   //     /*/ Escolher um Bem /*/
//   //
//   //     $scope.editarBem = function(bem) {
//   //       // alert('Entrou no editarBem');
//   //       if (bem.COD_LOCAL === dados.COD_LOCAL) {
//   //
//   //       } else {
//   //
//   //         ///////////////////// PARA COMPARAR O COD_LOCAL DO BEM COM O COD_LOCAL DO LOCAL
//   //         localCod = bem.COD_LOCAL;
//   //         alasql.promise('SELECT DESC_LOCAL FROM xlsx("js/Lista_de_Locais.xlsx",{headers:true})\ WHERE COD_LOCAL == ?', [localCod])
//   //           .then(function(res) {
//   //
//   //             // ACHOU O LOCAL E PEGOU O PRIMEIRO
//   //             console.log('Encontrou o local com o alaSQL');
//   //             console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].DESC_LOCAL);
//   //             bem.DESC_LOCAL = res[0].DESC_LOCAL;
//   //
//   //
//   //             if (window.cordova) { //Só entra por device
//   //
//   //               //CriarDiretorio.processar($cordovaFile, dados);
//   //               //alert("Passou do CriarDiretorio.processar");
//   //             }
//   //
//   //
//   //             Scopes.setBem(bem);
//   //             console.log('Bem: ' + bem);
//   //
//   //             $state.go('app.editarProduto');
//   //
//   //
//   //           }).catch(function(err) { // NÃO ENCONTROU O LOCAL
//   //
//   //             PopUps.erroConsultar("Bem não encontrado!");
//   //           });
//   //
//   //
//   //       }
//   //     };
//   //
//   //     /*****************/
//   //     ////// Termina o controller ainda dentro do alaSQL (porque ele está async?)
//   //
//   //   }).catch(function(err) { // NÃO ENCONTROU O LOCAL
//   //
//   //     PopUps.erroConsultar("Bens não encontrados!");
//   //   });
//   //
//   //
//   // /*****************************************************************************/
//   // /*/ LISTA EM JSON (NÃO ESTÁ USANDO)/*/
//   //
//   //
//   // // ///////////////////////////////////// Funcionando
//   // // function listarBens() {
//   // //   var promisse;
//   // //   $scope.bens = [];
//   // //   promisse = $http.get('js/bens.json');
//   // //     promisse.then(function (response){
//   // //       $scope.bens = response.data;
//   // //       var bens = $scope.bens;
//   // //       console.log('$scope.bens: ' + $scope.bens);
//   // //       //getBens();
//   // //     });
//   // //
//   // // }
//   //
//   //
//   // // ******************************************************************************* //



  console.log("Passou uma vez. Esperando o alaSQL. ");

});

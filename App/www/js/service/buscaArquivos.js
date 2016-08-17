angular.module("starter").service('buscaArquivos', function($cordovaFile, Scopes, PopUps, $state) {


  this.checarArquivo = function($cordovaFile) {
    //alert("Entrou no processar");


    $cordovaFile.checkDir(cordova.file.externalRootDirectory, "Queiroz Galvão")
      .then(function(success) {
        console.log('log: Achou o diretorio');

        $cordovaFile.checkFile(cordova.file.externalRootDirectory , "Queiroz Galvão/Lista_de_Bens.csv")
          .then(function(success) {
            console.log('log: Achou o arquivo .csv');
            Scopes.setArquivo("csv");

            //MELHOR COPIAR? PRA ONDE?
            $cordovaFile.copyFile(cordova.file.externalRootDirectory, "Lista_de_Bens.csv", cordova.file.applicationDirectory, "App/www/files/Lista_de_Bens.csv")
              .then(function (success){
                console.log('Copiou o arquivo .csv para o /files');

                }, function (error) {
                  // error
                  });

          }, function(error) {
            console.log('log: Não achou o arquivo .csv, vai procurar por outro');

            $cordovaFile.checkFile(cordova.file.externalRootDirectory,  "Queiroz Galvão/Lista_de_Bens.xlsx")
              .then(function(success) {
                console.log('log: Achou o arquivo .xlsx');
                Scopes.setArquivo("xlsx");

              }, function(error) {
                console.log('log: Não achou o arquivo .xlsx, vai procurar por outro');

                $cordovaFile.checkFile(cordova.file.externalRootDirectory,  "Queiroz Galvão/Lista_de_Bens.xls")
                  .then(function(success) {
                    console.log('log: Achou o arquivo .xls');
                    Scopes.setArquivo("xls");

                  }, function(error) {
                    Scopes.setArquivo("nd");
                    console.log('log: Não encontrou o arquivo .xls');
                    console.log('log: Não encontrou nenhum arquivo. Vai pegar o arquivo interno.' + error);
                  });
              });
          });

        }, function(error) { // Não achou o diretório

          console.log('log: Não encontrou o diretório. Vai pegar o arquivo interno.' + error);
          Scopes.setArquivo("nd");
        });

  };
  //return Scopes.getArquivo();
  //$scope.log = "Fez";
});

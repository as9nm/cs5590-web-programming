var app = angular.module("ttApp",['ngSanitize']);

app.controller('ttCtrl', function ($scope, $http) {

    $scope.langList = [];
    // Loading the Supported Languages
    $http.get("https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20180922T215824Z.2c556f6711073e80.f1e0a88f4312338639fdb799445cb9acc0d74a5a").success(function (data) {
        if(data != null && data.langs != null){
            $scope.langList = data.langs;
        }
    });
    // If Error
    $http.get("https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20180922T215824Z.2c556f6711073e80." +
        "f1e0a88f4312338639fdb799445cb9acc0d74a5a").error(function (data) {
        alert("There was some error processing your request. Please try after some time.");
    });

    $scope.getTranslateText = function () {
        $scope.textOut = "";
        //The models data is assigned to local variables using $scope.
        var sourceText = $scope.sourceText;
        var sourceLan = $scope.sourceLan;
        var destLan = $scope.destLan;
        if (sourceText != null && sourceText != "" && sourceLan != null && sourceLan != "") {
            if(destLan == null || destLan == ""){
                //The default translation language will be in english.
                destLan = 'en';
            }
            //This is the API that gives the list of venues based on the place and search query.
            //The data is assigned to handler variable.
            var handler = $http.get("https://translate.yandex.net/api/v1.5/tr.json/translate?" +
                "key=trnsl.1.1.20180922T215824Z.2c556f6711073e80." +
                "f1e0a88f4312338639fdb799445cb9acc0d74a5a&text=" + sourceText + "&" +
                "lang=" + sourceLan + "-" + destLan);
            handler.success(function (data) {
                if (data != null && data.text != null) {
                    $scope.textOut = "<strong>Translated Text : "+ data.text[0]+"</strong>";
                }else{
                    $scope.textOut = "<strong>No Translation Details exist for the Input Details</strong>";
                }
            });
            //Error:If there is an error in translation.
            handler.error(function (data) {
                alert("There was some error processing your request. Please try after some time.");
            });
        }else{
            //Error:If the Source Text or Source Language was not specified.
            $scope.textOut = "<strong>Source Text or Source Language cannot be empty</strong>";
        }
    }
});


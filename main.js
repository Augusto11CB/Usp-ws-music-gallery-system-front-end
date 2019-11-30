angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


function mainCtrl($scope, $http, ChartJsProvider){
  	


	$scope.myendpoint = "http://localhost:7200/repositories/hiper_mega_final_winez?query=";
	$scope.nomeloja = "" ;

	$scope.botaoloja = function(){
		
		var loja_drop_down_list = document.getElementById("location");
		var loja_input = loja_drop_down_list.options[loja_drop_down_list.selectedIndex].value;
				
		$scope.nomeloja = loja_input;


		var mapimage = document.getElementById("mapimage");
		mapimage.src = "image/"+$scope.nomeloja+ ".png"; 


		$http( {
        method: "GET",
        headers : {'Accept':'application/json', 'Content-Type':'application/json'},
        url : "https://ws-music-gallery-system.herokuapp.com/product/get-products/store/"+encodeURIComponent($scope.nomeloja.replace(" ", "")),

    } )
    .success(function(data, status ) {
    	var lojatable = document.getElementById("produtos");
        console.log(data);
        $scope.resultz = eval(data);

   
			if (!lojatable) return ;

			// var test = [1,2,3,4,5,6];
			for (j=0 ; j<$scope.resultz.length;j++){
				var newRow = lojatable.insertRow(lojatable.rows.length);

				var cell = newRow.insertCell(0);
				cell.innerHTML = $scope.resultz[j]["name"];

				var cell = newRow.insertCell(1);
				cell.innerHTML = $scope.resultz[j]["brand"];

				var cell = newRow.insertCell(2);
				cell.innerHTML = $scope.resultz[j]["price"];

				var cell = newRow.insertCell(3);
				cell.innerHTML = $scope.resultz[j]["typeProductAndBusiness"];

				var cell = newRow.insertCell(4);
				cell.innerHTML = $scope.resultz[j]["soldByStore"]["name"];
		
			}
//     
    })
    .error(function(error ){
        console.log(error);
    });

	}


	$scope.botaoproduto = function(){
		
		var produto_drop_down_list = document.getElementById("pricecategory");
		var produto_input = produto_drop_down_list.options[produto_drop_down_list.selectedIndex].value;
				
		$scope.nomeloja = "Busca por produtos";


		var mapimage = document.getElementById("mapimage");
		mapimage.src = "image/map.png"; 


		$http( {
        method: "GET",
        headers : {'Accept':'application/json', 'Content-Type':'application/json'},
        url : "https://ws-music-gallery-system.herokuapp.com/product/get-products/type/" +encodeURIComponent(produto_input.replace(" ", "")),

    } )
    .success(function(data, status ) {
    	var lojatable = document.getElementById("produtos");
        console.log(data);
        $scope.resultz = eval(data);

   
			if (!lojatable) return ;

			// var test = [1,2,3,4,5,6];
			for (j=0 ; j<$scope.resultz.length;j++){
				var newRow = lojatable.insertRow(lojatable.rows.length);

				var cell = newRow.insertCell(0);
				cell.innerHTML = $scope.resultz[j]["name"];

				var cell = newRow.insertCell(1);
				cell.innerHTML = $scope.resultz[j]["brand"];

				var cell = newRow.insertCell(2);
				cell.innerHTML = $scope.resultz[j]["price"];

				var cell = newRow.insertCell(3);
				cell.innerHTML = $scope.resultz[j]["typeProductAndBusiness"];

				var cell = newRow.insertCell(4);
				cell.innerHTML = $scope.resultz[j]["soldByStore"]["name"];
		
			}
//     
    })
    .error(function(error ){
        console.log(error);
    });

	}

		


	

}



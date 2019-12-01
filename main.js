angular.module('KRRclass', ['chart.js']).controller('MainCtrl', ['$scope', '$http', mainCtrl]);


function mainCtrl($scope, $http, ChartJsProvider) {



	$scope.myendpoint = "http://localhost:7200/repositories/hiper_mega_final_winez?query=";
	$scope.nomeloja = "";

	$scope.botaoloja = function () {

		var loja_drop_down_list = document.getElementById("location");
		var loja_input = loja_drop_down_list.options[loja_drop_down_list.selectedIndex].value;

		$scope.nomeloja = loja_input;


		var mapimage = document.getElementById("mapimage");
		mapimage.src = "image/" + $scope.nomeloja + ".png";


		$http({
			method: "GET",
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
			url: "https://ws-music-gallery-system.herokuapp.com/product/get-products/store/" + encodeURIComponent($scope.nomeloja.replace(" ", "")),

		})
			.success(function (data, status) {
				var lojatable = document.getElementById("produtos");
				console.log(data);
				$scope.resultz = eval(data);


				if (!lojatable) return;

				// var test = [1,2,3,4,5,6];
				for (j = 0; j < $scope.resultz.length; j++) {
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

					var cell = newRow.insertCell(5);
					cell.innerHTML = $scope.resultz[j]["uri"];
					console.log($scope.resultz[j]["uri"]);

				}
				var cells = lojatable.getElementsByTagName('td');

				for (var i = 0; i < cells.length; i++) {
					// Take each cell
					var cell = cells[i];
					// do something on onclick event for cell
					cell.onclick = function () {
						// Get the row id where the cell exists
						var rowId = this.parentNode.rowIndex;

						var rowsNotSelected = lojatable.getElementsByTagName('tr');
						for (var row = 0; row < rowsNotSelected.length; row++) {
							rowsNotSelected[row].style.backgroundColor = "";
							rowsNotSelected[row].classList.remove('selected');
						}
						var rowSelected = lojatable.getElementsByTagName('tr')[rowId];
						rowSelected.style.backgroundColor = "yellow";
						rowSelected.className += " selected";


						$scope.lat_lng_query = encodeURIComponent($scope.lat_lng_query)
						$http({
							method: "POST",
							url: "https://ws-music-gallery-system.herokuapp.com/purchase/make-purchase?cpf=" + encodeURIComponent($scope.cpfUsuario.replace(" ", "")),
							headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
						}).success(function (data, status) {
							

						})
					}
				}
				console.log(cells)
			})

			.error(function (error) {
				console.log(error);
			});

	}


	$scope.botaoproduto = function () {

		var produto_drop_down_list = document.getElementById("pricecategory");
		var produto_input = produto_drop_down_list.options[produto_drop_down_list.selectedIndex].value;

		$scope.nomeloja = "Busca por produtos";


		var mapimage = document.getElementById("mapimage");
		mapimage.src = "image/map.png";


		$http({
			method: "GET",
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
			url: "https://ws-music-gallery-system.herokuapp.com/product/get-products/type/" + encodeURIComponent(produto_input.replace(" ", "")),

		})
			.success(function (data, status) {
				var lojatable = document.getElementById("produtos");
				console.log(data);
				$scope.resultz = eval(data);


				if (!lojatable) return;

				// var test = [1,2,3,4,5,6];
				for (j = 0; j < $scope.resultz.length; j++) {
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

					var cell = newRow.insertCell(5);
					cell.innerHTML = $scope.resultz[j]["uri"];
					console.log($scope.resultz[j]["uri"]);

				}
				var cells = lojatable.getElementsByTagName('td');

				for (var i = 0; i < cells.length; i++) {
					// Take each cell
					var cell = cells[i];
					// do something on onclick event for cell
					cell.onclick = function () {
						// Get the row id where the cell exists
						var rowId = this.parentNode.rowIndex;

						var rowsNotSelected = lojatable.getElementsByTagName('tr');
						for (var row = 0; row < rowsNotSelected.length; row++) {
							rowsNotSelected[row].style.backgroundColor = "";
							rowsNotSelected[row].classList.remove('selected');
						}
						var rowSelected = lojatable.getElementsByTagName('tr')[rowId];
						rowSelected.style.backgroundColor = "yellow";
						rowSelected.className += " selected";


						// $scope.lat_lng_query = encodeURIComponent($scope.lat_lng_query)
						// $http({
						// 	method: "POST",
						// 	url: $scope.myendpoint + $scope.lat_lng_query,
						// 	headers: { 'Accept': 'application/sparql-results+json', 'Content-Type': 'application/sparql-results+json' }
						// }).success(function (data, status) {


						// 	$scope.lat_resultz = eval(data);
						// 	$scope.lat = 0;
						// 	$scope.long = 0;
						// 	if ($scope.lat_resultz["results"]["bindings"].length == 0) {
						// 		alert('no location available')
						// 	}

						// 	else {
						// 		console.log($scope.lat_resultz["results"]["bindings"][0]["grape"]["value"]);
						// 		var map = new google.maps.Map(document.getElementById('map'), {
						// 			center: { lat: Number($scope.lat_resultz["results"]["bindings"][0]["lat"]["value"]), lng: Number($scope.lat_resultz["results"]["bindings"][0]["long"]["value"]) },
						// 			zoom: 6
						// 		});
						// 		var grape_image = document.getElementById("grapeimage");
						// 		grape_image.src = $scope.lat_resultz["results"]["bindings"][0]["image"]["value"];
						// 	}
						// })
					}
				}
				//     
			})
			.error(function (error) {
				console.log(error);
			});

	}






}



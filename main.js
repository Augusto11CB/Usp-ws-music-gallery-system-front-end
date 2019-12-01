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
				var cpf = document.getElementById("cpfUsuario");

				$("#produtos").find("tr:not(:first)").remove();
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

						[
							{
							  "name": "UprightPiano",
							  "typeProductAndBusiness": "MUSICAL_EQUIPMENT",
							  "uri": "http://www.musicgallery/UprightPiano"
							}
						  ]
						if(cpf.value != "" ){
							$http({
								method: "POST",
								url: "https://ws-music-gallery-system.herokuapp.com/purchase/make-purchase?age=18&cpf=" + cpf.value, //+ encodeURIComponent($scope.cpfUsuario.replace(" ", "")),
								headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
								data: [
									{
									name: rowSelected.cells[0].innerHTML,
									typeProductAndBusiness: rowSelected.cells[3].innerHTML,
									uri: rowSelected.cells[5].innerHTML
									}
								]
							}).success(function (data, status) {
								alert("Compra realizada com sucesso. Retirar na loja")
							})
						}else {
							alert("digite o cpf para realizar a compra")
						}
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
				$("#produtos").find("tr:not(:first)").remove();
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


						$http({
							method: "POST",
							url: "https://ws-music-gallery-system.herokuapp.com/purchase/make-purchase?cpf=22222222222&age=1", //+ encodeURIComponent($scope.cpfUsuario.replace(" ", "")),
							headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
							data: [
								{
								name: rowSelected.cells[0].innerHTML,
								typeProductAndBusiness: rowSelected.cells[3].innerHTML,
								uri: rowSelected.cells[5].innerHTML
								}
							]
						}).success(function (data, status) {
							alert("Compra realizada com sucesso. Retirar na loja")
						})
					}
				}
				//     
			})
			.error(function (error) {
				console.log(error);
			});

	}


	var shoppingCart = (function () {
		// =============================
		// Private methods and propeties
		// =============================
		cart = [];

		// Constructor
		function Item(name, price, count) {
			this.name = name;
			this.price = price;
			this.count = count;
		}

		// Save cart
		function saveCart() {
			sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
		}

		// Load cart
		function loadCart() {
			cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
		}
		if (sessionStorage.getItem("shoppingCart") != null) {
			loadCart();
		}

		// =============================
		// Public methods and propeties
		// =============================
		var obj = {};
		// Add to cart
		obj.addItemToCart = function (name, price, count) {
			for (var item in cart) {
				if (cart[item].name === name) {
					cart[item].count++;
					saveCart();
					return;
				}
			}
			var item = new Item(name, price, count);
			cart.push(item);
			saveCart();
		}
		// Set count from item
		obj.setCountForItem = function (name, count) {
			for (var i in cart) {
				if (cart[i].name === name) {
					cart[i].count = count;
					break;
				}
			}
		};
		// Remove item from cart
		obj.removeItemFromCart = function (name) {
			for (var item in cart) {
				if (cart[item].name === name) {
					cart[item].count--;
					if (cart[item].count === 0) {
						cart.splice(item, 1);
					}
					break;
				}
			}
			saveCart();
		}
		// Remove all items from cart
		obj.removeItemFromCartAll = function (name) {
			for (var item in cart) {
				if (cart[item].name === name) {
					cart.splice(item, 1);
					break;
				}
			}
			saveCart();
		}
		// Clear cart
		obj.clearCart = function () {
			cart = [];
			saveCart();
		}
		// Count cart 
		obj.totalCount = function () {
			var totalCount = 0;
			for (var item in cart) {
				totalCount += cart[item].count;
			}
			return totalCount;
		}
		// Total cart
		obj.totalCart = function () {
			var totalCart = 0;
			for (var item in cart) {
				totalCart += cart[item].price * cart[item].count;
			}
			return Number(totalCart.toFixed(2));
		}
		// List cart
		obj.listCart = function () {
			var cartCopy = [];
			for (i in cart) {
				item = cart[i];
				itemCopy = {};
				for (p in item) {
					itemCopy[p] = item[p];
				}
				itemCopy.total = Number(item.price * item.count).toFixed(2);
				cartCopy.push(itemCopy)
			}
			return cartCopy;
		}

		// cart : Array
		// Item : Object/Class
		// addItemToCart : Function
		// removeItemFromCart : Function
		// removeItemFromCartAll : Function
		// clearCart : Function
		// countCart : Function
		// totalCart : Function
		// listCart : Function
		// saveCart : Function
		// loadCart : Function
		return obj;
	})();

	function displayCart() {
		var cartArray = shoppingCart.listCart();
		var output = "";
		for (var i in cartArray) {
			output += "<tr>"
				+ "<td>" + cartArray[i].name + "</td>"
				+ "<td>(" + cartArray[i].price + ")</td>"
				+ "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
				+ "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
				+ "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
				+ "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
				+ " = "
				+ "<td>" + cartArray[i].total + "</td>"
				+ "</tr>";
		}
		$('.show-cart').html(output);
		$('.total-cart').html(shoppingCart.totalCart());
		$('.total-count').html(shoppingCart.totalCount());
	}


	$('.show-cart').on("click", ".delete-item", function (event) {
		var name = $(this).data('name')
		shoppingCart.removeItemFromCartAll(name);
		displayCart();
	})

	$('.show-cart').on("click", ".plus-item", function (event) {
		var name = $(this).data('name')
		shoppingCart.addItemToCart(name);
		displayCart();
	})

	// Item count input
	$('.show-cart').on("change", ".item-count", function (event) {
		var name = $(this).data('name');
		var count = Number($(this).val());
		shoppingCart.setCountForItem(name, count);
		displayCart();
	});

	displayCart();
}

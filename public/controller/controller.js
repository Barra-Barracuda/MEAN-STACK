var app = angular.module('myApp', []);


app.controller('AppCtrl', function($scope, $http) {
	//获得数据
	var refresh = function() {
		$http.get('/contactlist').then(function(response) {
			console.log('i got the data i requested' + response.data); //返回的数据
			$scope.contactlist = response.data;
			$scope.contact = '';
		});

	};

	refresh();

	$scope.addContact = function() {
		if ($scope.contact.name && $scope.contact.number && $scope.contact.email) {
			console.log($scope.contact);
			$http.post('/contactlist', $scope.contact).then(function(response) {
				console.log(response);
				refresh(); //自动刷新
			})
		}
	}

	$scope.remove = function(id) {
		console.log(id);
		$http.delete('/contactlist/' + id).then(function(response) {
			refresh();
		})
	}

	$scope.edit = function(id) {
		console.log(id);
		$http.get('/contactlist/' + id).then(function(response) {

			$scope.contact = response.data;
		})
	}

	$scope.update = function() {
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response) {
			refresh();
		})
	}

	$scope.deselect = function() {
		$scope.contact = '';
	}

})
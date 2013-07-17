var app = angular.module('gmail', []);

app.config(
	function($routeProvider) {
		$routeProvider.when('/', {
			controller: ListCtrl,
			templateUrl: 'templates/list.html'
		}).when('/detail/:emailId', {
			controller: DetailCtrl,
			templateUrl: 'templates/detail.html'
		}).otherwise({redirectTo: '/'})
	}
);

app.factory('SimpleFactory',  function() {
	var factory = {};
	var emails = [
		{id: "1", from: 'Abhi', content: 'test email 1', timestamp:'1 min'},
		{id: "2", from: 'Naren', content: 'test email 2 from naren', timestamp:'4 min'},
		{id: "3", from: 'Vishnu', content: 'test email from vishnu arn\'t we lucky!!', timestamp:'30 min'},
		{id: "4", from: 'Abhi', content: 'test email asdasd', timestamp:'50 min'},
	];

	factory.getEmails = function() {
		return emails;
	};

	factory.addEmail = function(obj) {
		emails.push(obj)
	};

	factory.getEmail = function(id) {
		for (var i in emails) {
			var email = emails[i];
			if(email.id == id) {
				return email;
			}
		}
	};

	return factory;
});

function ListCtrl($scope, $location, SimpleFactory) {
	$scope.emails = SimpleFactory.getEmails();

	$scope.go = function(hash) {
		$location.hash(hash);
	};
}

function DetailCtrl($scope, $location, $routeParams, SimpleFactory) {
	$scope.email = SimpleFactory.getEmail($routeParams.emailId);
}
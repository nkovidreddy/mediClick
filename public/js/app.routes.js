angular.module('routerRoutes',['ngRoute'])

.config(function($routeProvider, $locationProvider) {
$routeProvider

	// .when('/', {
 // 	templateUrl : 'views/index.html',
 // 	controller : 'symptomController',
 // 	controllerAs: 'symptom'
 // 	})

// route for the home page
.when('/', {
 	templateUrl : 'views/index.html',
 	controller : 'indexController',
 	controllerAs: 'index'
 	})

.when('/register', {
 	templateUrl : 'views/register.html',
 	controller : 'registerController',
 	controllerAs: 'register'
 	})

 	.when('/Symptoms', {
 	templateUrl : 'views/Symptoms.html',
 	controller : 'symptomsController',
 	controllerAs: 'Symptoms'
 	})

 	.when('/Remedies', {
 	templateUrl : 'views/Remedies.html',
 	controller : 'remediesController',
 	controllerAs: 'Remedies'
 	})
	.when('/gmaps', {
 	templateUrl : 'views/gmaps.html',
 	controller : 'gmapsController',
 	controllerAs: 'Remedies'
 	})


 // set our app up to have pretty URLS
$locationProvider.html5Mode(true);
});
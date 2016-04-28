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

.when('/forms', {
 	templateUrl : 'views/forms.html',
 	controller : 'formsController',
 	controllerAs: 'forms'
})

.when('/MedicalHistory', {
 	templateUrl : 'views/MedicalHistory.html',
 	controller : 'medicalController',
 	controllerAs: 'medical'
 	})

.when('/EmCon', {
 	templateUrl : 'views/EmCon.html',
 	controller : 'emergencyController',
 	controllerAs: 'emergency'
  	})

 	.when('/Symptoms', {
 	templateUrl : 'views/Symptoms.html',
 	controller : 'symptomsController',
 	controllerAs: 'symptoms'
 	})

 	.when('/Remedies', {
 	templateUrl : 'views/Rem.html',
 	controller : 'remediesController',
 	controllerAs: 'remedies'
 	})

 	.when('/betterhealth', {
 	templateUrl : 'views/betterhealth.html',
 	controller : 'bhealthController',
 	controllerAs: 'bhealth'
 	})

	.when('/gmaps', {
 	templateUrl : 'views/gmaps.html',
 	controller : 'gmapsController',
 	controllerAs: 'gmaps'
 	})

	
 // set our app up to have pretty URLS
$locationProvider.html5Mode(true);
});
angular.module('masters',['routerRoutes','ngStorage'])

.service('userem', function() {
 //Dev Sample
 var emailTest= {
 	name: ''
 };
 return emailTest;
 //
  // private variable
  //var _email = "test@gmail.com";
 /*var _email={};
  // public API
  this.useremail = _email;*/
})

.controller('indexController',function($http,$scope){
var vm=this;
		vm.login=function(){
			//console.log("Email=" +vm.email);
			var url = '/api/users/' +vm.email+'/'+vm.password;
			console.log(url);
			console.log('Towards sending request');
		var getReq1 = {
      //url: '/api/users/'+vm.email, // No need of IP address
      url: url,
      method: 'GET',
      params: {'email':vm.email,'password':vm.password}
      //headers: {'Content-Type': 'application/json'}
	}
	$http(getReq1).then(function(data){
		//console.log("displayng data in get method index"); 
		//console.log(data.data[0].email);
		vm.useremail=data.data[0].email;
    $scope.email=data.data[0].email;
    console.log($scope.email);
      })

	}

})


//.controller('registerController',['$scope','userem', function($scope,userem,$http){
.controller('registerController',['$scope','$localStorage','$http', function($scope,$localStorage,$http){
	console.log("inside regoster cotroller");
	var vm=this;
	//$scope.emailTest=userem;
	 

	vm.register=function(){
		console.log('Testing Register Function');
		$localStorage.$reset();
		var email=vm.email;

		$scope.$storage = $localStorage.$default({
          userId: email
        });
		var password=vm.password;
		var cpassword=vm.confirmpassword;
		console.log(email);
		console.log(password);
		console.log(password);

		 var req = {
      url: '/api/users', // No need of IP address
      method: 'POST',
      data: {'email':vm.email,'password':vm.password},
      headers: {'Content-Type': 'application/json'}
	}

	$http(req).then(function(data){
      		console.log(data.data);
      	vm.registerMessage=data.data;
      	window.alert(data.data);
      	window.location.href = '/forms';
//res.sendFile(path.join(__dirname+'/views/forms.html'))
 
      })
	
}

}])



//.controller('formsController', ['$scope','userem',function($scope,userem){
	.controller('formsController',['$scope','$localStorage','$http', function($scope,$localStorage,$http){
	var vm=this;
	console.log("inside forms controller");
	console.log($localStorage);
	$scope.$storage1 = $localStorage.userId;
	var userIdFromStorage = $localStorage.userId;
		console.log("Local Storage Email");
		console.log(userIdFromStorage);
	vm.personalInfo=function(){
		console.log("inisde personal info function");
		var emailId= $localStorage.userId;
		var url = '/api/users/' +emailId;
console.log("sindhuupdate"+emailId);
		var fname=vm.fname;
		var lname=vm.lname;
		var bday=vm.bday;
		var gender=vm.gender;
		var phone=vm.phone;
		var address=vm.address;
		var zipcode=vm.zipcode;

		var req = {
     // url: '/api/forms', // No need of IP address //sindhuupdate
     url: '/api/users/'+vm.emailId,
      method: 'GET',
      data: {'fname':vm.fname, 'lname':vm.lname, 'bday':vm.bday, 'gender':vm.gender, 'phone':vm.phone, 'address':vm.address, 'zipcode':vm.zipcode},
      //headers: {'Content-Type': 'application/json'}
        params: {'email':vm.email}
	}

		$http(req).then(function(data){
   
      	//vm.registerMessage=data.data;
      
      	window.location.href = '/forms';

      })
	}
	//console.log($scope);
	//$scope.emailTest=userem;
	
	}])

.controller('medicalController',function(){
	var vm=this;
	vm.message = 'my forms page.';
	
})

/*.controller('loginController', function($http) {
console.log('inside login 1');
var vm = this;
// get info if a person is logged in
  vm.loggedIn = Auth.isLoggedIn();
  // check to see if a user is logged in on every request
$rootScope.$on('$routeChangeStart', function() { vm.loggedIn = Auth.isLoggedIn();
    // get user information on route change
Auth.getUser() .success(function(data) {
        vm.user = data;
      });
});
  // function to handle login form
vm.doLogin = function() {
	console.log('inside login');
    // call the Auth.login() function
Auth.login(vm.loginData.username, vm.loginData.password) .success(function(data) {
        // if a user successfully logs in, redirect to users page
        $location.path('/Remedies');
      });
}
})*/


/*.controller('indexController',function(){
// bind this to vm (view-model)
var vm = this;

// define variables and objects on this
// this lets them be available to our views
// define a basic variable
vm.message="hello i want this message to be displyed on home";
//list
vm.computers = [
 { name: 'Macbook Pro', color: 'Silver', nerdness: 7 },
 { name: 'Yoga 2 Pro', color: 'Gray', nerdness: 6 },
 { name: 'Chromebook', color: 'Black', nerdness: 5 }
 ];

 // information that comes from our form
vm.computerData = {};

 vm.addComputer = function() {
 // add a computer to the list
 vm.computers.push({
 name: vm.computerData.name,
 color: vm.computerData.color,
 nerdness: vm.computerData.nerdness
 });

 // after our computer has been added, clear the form
 vm.computerData = {};
 };

})*/
//symptom checker
.controller('symptomsController',function(){
	var vm=this;
	vm.message = 'my symptoms page.';
	//vm.regSubmit = $http.post("http://localhost:3000/saveUser");

})
//remedies Controller

.controller('remediesController',function(){
	var vm=this;
	vm.message = 'my remedy page.';
	//vm.regSubmit = $http.post("http://localhost:3000/saveUser");

});



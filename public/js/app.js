angular.module('masters',['routerRoutes'])

.controller('indexController',function($http){
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
		console.log("displayng data in get method index"); 
		console.log(data.data[0].email);
		vm.useremail=data.data[0].email;
      //	for(i in data.email){
      		//console.log(i);
      	//}
      	 
      	//vm.displayname=data.name;
      	//vm.resultText=data.data.entities.keyword;
      })

	}
	//vm.regSubmit = $http.post("http://localhost:3000/saveUser");

})
.controller('registerController',function($http){
	console.log("inside regoster cotroller");
	var vm=this;

	vm.register=function(){
		console.log('Testing Register Function');
		
		var email=vm.email;
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
      

      	//vm.resultText=data.data.entities.keyword;
      })
	//vm.regSubmit = $http.post("http://localhost:3000/saveUser");

}

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



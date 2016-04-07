angular.module('masters',['routerRoutes'])


.controller('indexController',function(){
	var vm=this;
	vm.message = 'my remedy page.';
	//vm.regSubmit = $http.post("http://localhost:3000/saveUser");

})

.controller('registerController',function(){
	var vm=this;
	
})
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



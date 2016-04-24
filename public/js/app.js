angular.module('masters',['routerRoutes','ngStorage'])

.service('userem', function() {
 //Dev Sample
 var emailTest= {
 	name: ''
 };
 return emailTest;

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
    $scope.$storage1 = $localStorage.userId;
	var userIdFromStorage = $localStorage.userId;
	vm.personalInfo=function(){
	//	console.log("inisde personal info function");
		var emailId= $localStorage.userId;
		var url = '/api/users/' +emailId;
      // console.log("sindhuupdate"+emailId);
		var fname=vm.fname;
		var lname=vm.lname;
		var bday=vm.bday;
		var gender=vm.gender;
		var phone=vm.phone;
		var address=vm.address;
		var zipcode=vm.zipcode;

	  var reqpersonalinfo={
      url: url,
      method: 'PUT',
      data: {'fname':vm.fname, 'lname':vm.lname, 'bday':vm.bday, 'gender':vm.gender, 'phone':vm.phone, 'address':vm.address, 'zipcode':vm.zipcode},
      	}
		$http(reqpersonalinfo).then(function(data){
      	window.location.href = '/MedicalHistory';

      })
	}
	}])


.controller('medicalController',['$scope','$localStorage','$http', function($scope,$localStorage,$http){

	var vm=this;
	//console.log("inside medicalController controller");
	//console.log($localStorage.userId);
	$scope.$storage1 = $localStorage.userId;
	//$scope.$passemail = $localStorage.userId;
	$scope.conditions = {};
	$scope.addictions = {};
	
	var userIdFromStorage = $localStorage.userId;
		vm.medicalInfo=function(){
		var medical="medical";
		var info="info";
		console.log("inisde personal info function");
		var emailId= $localStorage.userId;
	    var url = '/api/users/' +emailId+'/'+medical+'/'+info;
	    console.log("sindhuupdate"+emailId);
	     var conditions=$scope.conditions;
		 var addictions=$scope.addictions;
		var pregnancy=vm.pregnancy;
		//var addiction=vm.addiction;
		var lastVisit=vm.lastVisit;
		var visitReason=vm.visitReason;
		//var req = { sindhuupdated
			var medicalInfo={
     // url: '/api/forms', // No need of IP address //sindhuupdate
      url: url,
      method: 'PUT',
      data: {'conditions':conditions, 'pregnancy':vm.pregnancy, 'addiction':addictions, 'lastVisit':vm.lastVisit, 'visitReason':vm.visitReason},
   
      }
      console.log(medicalInfo.data.conditions);

		$http(medicalInfo).then(function(data){
     	window.location.href = '/EmCon';

      })
	}
	
}])


.controller('emergencyController',['$scope','$localStorage','$http', function($scope,$localStorage,$http){
	console.log("Test Emergency Controller");
	var vm=this;
	console.log("inside emergencyController controller");
	console.log($localStorage.userId);
	$scope.$storage1 = $localStorage.userId;
	//$scope.$passemail = $localStorage.userId;
	var userIdFromStorage = $localStorage.userId;
		console.log("Local Storage Email");
		console.log(userIdFromStorage);
	
	vm.emergencyInfo=function(){
		var emergency="emergency";
		var contacts="contacts";
		var info="info";
		console.log("inisde personal info function");
		var emailId= $localStorage.userId;
	    var url = '/api/users/' +emailId+'/'+emergency+'/'+contacts+'/'+info;
	    console.log(url);
		//var url = '/api/users/' +emailId+medical;
       console.log("sindhuupdate"+emailId);
		var efname1=vm.efname1;
		var elname1=vm.elname1;
		var eemail1=vm.eemail1;
		var efname2=vm.efname2;
		var elname2=vm.elname2;
		var eemail2=vm.eemail2;
		var notify=vm.notify;
		//console.log(notify);
		//var req = { sindhuupdated
			var medicalInfo={
     // url: '/api/forms', // No need of IP address //sindhuupdate
      url: url,
      method: 'PUT',
      data: {'efname1':vm.efname1, 'elname1':vm.elname1, 'eemail1':vm.eemail1, 'efname2':vm.efname2, 'elname2':vm.elname2 , 'elname2':vm.elname2 , 'eemail2':vm.eemail2 , 'notify':notify},
   
      }

		$http(medicalInfo).then(function(data){
     	window.location.href = '/index';

      })
	}
	
}])

//symptom checker
.controller('symptomsController',['$scope','$localStorage','$http', function($scope,$localStorage,$http){
	var vm=this;
   console.log("Test Input");

	$scope.bodypart = {};
	//$scope.addictions = {};	

	vm.selectValue="test";	

   vm.getsymptoms=function(){
		 var url = '/api/diseaseinfo';
		 console.log(url);
		 console.log(vm.selectValue);
	   console.log("inside getsymptoms function");

	   var bodypart=$scope.bodypart;
	console.log(bodypart);
		//var bodypart=vm.bodypart;
   		//var specificbodypart=vm.specificbodypart;
		//var symptom=vm.symptom;
		   var bodypart=$scope.selBodyValue;
	   var specificbodypart=$scope.selBodyPartValue;
	   var symptom=$scope.selSymptomValue;
	   console.log(bodypart);
	   console.log(specificbodypart);
	   console.log(symptom);
    	var symptomInfo={

     // url: '/api/forms', // No need of IP address //sindhuupdate
      url: url,
      method: 'GET',
      params: {'bodypart':bodypart, 'specificbodypart':specificbodypart, 'symptom':symptom},
      }
		$http(symptomInfo).then(function(data){
     	//window.location.href = '/index';
     	console.log(data);
      })
	}
	}])


//remedies Controller

.controller('bhealthController',['$scope','$localStorage','$http', function($scope,$localStorage,$http){
	var vm=this;
	vm.message = 'Better Health';
	$scope.insproviders = {};
	$scope.doctors={};
	$scope.insurance={};
	//$scope.practices={};
	//vm.regSubmit = $http.post("http://localhost:3000/saveUser");
	var api_key = '84595b9ae71e28e06f8414fafac6938e'; // Get your API key at developer.betterdoctor.com

	var insurance_uid='blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix';
//Sample URL Format https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=84595b9ae71e28e06f8414fafac6938e&insurance_uid=blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix
	
	
	vm.getDoctors=function(){
		if($scope.insproviders.blueshield==true){
			insurance_uid='blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix';
		}
		console.log(insurance_uid);
		var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?query=stomach%20ache&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=' + api_key+'&insurance_uid='+insurance_uid;
		console.log(resource_url);
	
	var getDocReq = {
      //url: '/api/users/'+vm.email, // No need of IP address
      url: resource_url,
      method: 'GET'
      //params: {'email':vm.email,'password':vm.password}
      //headers: {'Content-Type': 'application/json'}
	}

	$http(getDocReq).then(function(data){
		//console.log("displayng data in get method index"); 
		//console.log(data.data[0].email);
		console.log("Testing API");
    	//console.log(data);
   	 	$scope.doctors=data.data.data;
   	 	//$scope.practices=data.data.data;
    	console.log($scope.doctors);
    	
      })
	

//Keeping Below Code for resolving future refreshing behaviours, use above code instead of below code anywhere - kovid
// 	$.get(resource_url, function (data) {
//     // data: { meta: {<metadata>}, data: {<array[Doctor]>} }
//     console.log("Testing API");
//     //console.log(data);
//     $scope.doctors=data.data;
//     console.log($scope.doctors);
    
//     // var template = Handlebars.compile(document.getElementById('docs-template').innerHTML);
//     // document.getElementById('content-placeholder').innerHTML = template(data);
// });
}

vm.getInsurance=function(){
		
		console.log(insurance_uid);
		var resource_url = 'https://api.betterdoctor.com/2016-03-01/insurances?user_key=a9aa06bc3085770371b20e2a52c76733';
		console.log(resource_url);
	
	var getInsReq = {
      //url: '/api/users/'+vm.email, // No need of IP address
      url: resource_url,
      method: 'GET'
      //params: {'email':vm.email,'password':vm.password}
      //headers: {'Content-Type': 'application/json'}
	}

	$http(getInsReq).then(function(data){
		//console.log("displayng data in get method index"); 
		//console.log(data.data[0].email);
		console.log("Testing API");
    	//console.log(data);
   	 	$scope.insurance=data.data.data;
   	 	//$scope.practices=data.data.data;
    	console.log($scope.insurance);
    	
      })


}

}])





.controller('emailController',['$scope','$localStorage','$http', function($scope,$localStorage,$http){
var vm=this;
	console.log("inside sendemail");
			vm.sendemail=function(){
	
		var email=vm.email;
		console.log(email);

	
			var emailinfo={
      url: '/api/sendemail', // No need of IP address //sindhuupdate
      method: 'POST',
      data: {'email':email},
       headers: {'Content-Type': 'application/json'}
   
      }
      	$http(emailinfo).then(function(data){
     	window.location.href = '/index';

      })
	}
	
}]);

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


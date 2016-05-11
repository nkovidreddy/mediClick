angular.module('masters',['routerRoutes','ngStorage','ngMessages'])

.service('userem', function() {
 //Dev Sample
 var emailTest= {
 	name: ''
 };
 return emailTest;

})

//.controller('indexController',function($http,$scope){
	.controller('indexController',['$scope','$sessionStorage','$http', function($scope,$sessionStorage,$http){
      var vm=this;

 

//Write Code to call API and limit one result sort by distance and send the address location parameters to gmaps page
	//Getting user current location
	var api_key = '84595b9ae71e28e06f8414fafac6938e'; // Get your API key at developer.betterdoctor.com
	$scope.userloc=$sessionStorage.user_locationBrow;
	if(!$scope.userloc){
		console.log("True");
		vm.userLocation="";
		var userloc = vm.userloc;
		if (navigator.geolocation) {
   		 navigator.geolocation.getCurrentPosition(function(position){
      	$scope.$apply(function(){
        $scope.position = position;
        console.log("Position:");
        console.log($scope.position.coords.latitude);
		userLocation=$scope.position.coords.latitude+","+$scope.position.coords.longitude;
		$sessionStorage.user_locationBrow=userLocation;
		
		//var userloc=userLocation;
		$scope.userloc=userLocation;
		console.log($scope.userloc);
      });
    });
  }
}

$scope.loading=false;
     if ($sessionStorage.fname != null )
{
	$('#login').hide();
	
}
else
{
 $('#logout').hide();
}

		vm.login=function(){
			//console.log("Email=" +vm.email);
			console.log("inside login");
		$scope.userloc=$sessionStorage.user_locationBrow;
		var userLocPrev ;
	if($scope.userloc){
		userLocPrev= $scope.userloc;
	}
		$sessionStorage.$reset();
			var url = '/api/users/' +vm.email+'/'+vm.password;
			console.log(url);
			console.log('Towards sending request');
		var getReq1 = {
      //url: '/api/users/'+vm.email, // No need of IP address
      url: url,
      method: 'GET',
      params: {'email':vm.email,'password':vm.password}
      
	}
	$http(getReq1).then(function(data){


	
if((data.data[0] != null) && (data.data[0].email==vm.email))
{
	vm.email=data.data[0].email;
	vm.fname=data.data[0].fname;
	var fname=data.data[0].fname;
	var notify=data.data[0].notify;
	var email=data.data[0].email;
	console.log(fname);
	$scope.$storage = $sessionStorage.$default({
          fname: fname,
          notify:notify,
          email:email,
          user_locationBrow:userLocPrev

        });
$scope.email=vm.email;
$scope.fname=vm.fname;
window.alert("Login Successful");
$('#myModal').modal('hide');
$('#login').hide();
$('#logout').show();

	}

	else
	{
window.alert("please enter correct credentials");
	}


      })
    }

    //logout

    vm.logout=function(){
			//console.log("Email=" +vm.email);
			console.log("inside logout");
		
		$sessionStorage.$reset();
			

window.alert("Logout Successful");
$('#myModal2').modal('hide');
$('#logout').hide();
$('#login').show();

	}

 
$scope.notifyTest=function(){
$scope.loading=true;
  
console.log("inside notify");
$scope.$fname = $sessionStorage.fname;
$scope.$notify = $sessionStorage.notify;
$scope.$email = $sessionStorage.email;

		
var fname= $sessionStorage.fname;
var email = $sessionStorage.email;
var notify = $sessionStorage.notify;
console.log(fname);
console.log(email);
console.log(notify);
console.log("before sendemail");

if (fname == null || email == null)
{
	window.alert("Please sign in to proceed!!");
	$scope.loading=false;
	return;
}
else
{
var emailinfo={
      url: '/api/sendemail', // No need of IP address //sindhuupdate
      method: 'POST',
      data: {'email':email,'fname':fname,'notify':notify},
      headers: {'Content-Type': 'application/json'}
    }
}
console.log(emailinfo);
$http(emailinfo).then(function(data){
window.alert("Your contacts have been alerted");
	//Call an API for Practices
	//var resource_prac_url = 'https://api.betterdoctor.com/2016-03-01/practices?location='+$scope.userloc+',100'+'&user_location='+$scope.userloc+'&sort=distance-asc&fields=lat,lon,website&skip=0&limit=1&user_key='+api_key;
		var resource_prac_url = 'https://api.betterdoctor.com/2016-03-01/practices?location='+$scope.userloc+',100'+'&sort=distance-asc&fields=lat,lon,website&limit=1&user_key='+api_key;
		console.log(resource_prac_url);
		var emergencyReq = {
      url: resource_prac_url,
      method: 'GET'
    }
	$http(emergencyReq).then(function(data){
		//console.log("displayng data in get method index"); 
		//console.log(data.data[0].email);
		console.log("Testing API");
    	//console.log(data);
    	var destAddr = data.data.data[0];
    	var endLoc = destAddr.lat+','+destAddr.lon;
    	console.log(endLoc);
   	 	//$scope.practices=data.data.data;
    	//console.log($scope.doctors);
    	$scope.loading=false;
    	window.location.href = '/gmaps/'+endLoc;
      })
     	//window.location.href = '/gmaps/'+endLoc;
     })
}



vm.navcalorie=function(){
$scope.loading=true;
  
console.log("inside navCalorie");
$scope.$fname = $sessionStorage.fname;
$scope.$email = $sessionStorage.email;

		
var fname= $sessionStorage.fname;
var email = $sessionStorage.email;




if (fname == null || email == null)
{
	window.alert("Please register to access our additional features!!");
	$scope.loading=false;
	return;
}
else
{

window.location.href = '/calorie';
}

}




}])


//.controller('registerController',['$scope','userem', function($scope,userem,$http){
.controller('registerController',['$scope','$sessionStorage','$http', function($scope,$sessionStorage,$http){
	console.log("inside regoster cotroller");
	var vm=this;
	//$scope.emailTest=userem;
	 $scope.userloc=$sessionStorage.user_locationBrow;
		var userLocPrev ;
	if($scope.userloc){
		userLocPrev= $scope.userloc;
	}
  //$scope.$storagefname = $sessionStorage.fname;
	vm.register=function(){
		console.log('Testing Register Function');
		$sessionStorage.$reset();
		var email=vm.email;

		$scope.$storage = $sessionStorage.$default({
          userId: email,
          user_locationBrow:userLocPrev
        });
		var password=vm.password;
		var cpassword=vm.confirmpassword;
		console.log(email);
		console.log(password);
		console.log(password);


		if(password!=cpassword)
		{
				window.alert("Passwords donot match!");
					window.location.href = '/register';
		}
	
else
{
		 var req = {
      url: '/api/users', // No need of IP address
      method: 'POST',
      data: {'email':vm.email,'password':vm.password},
      headers: {'Content-Type': 'application/json'}
	}
}

	$http(req).then(function(data){
      		console.log(data.data);
      	vm.registerMessage=data.data;
      	window.alert(data.data);
      	var msg="Email Id already exists.";
      	if(data.data == msg)
      	{
      		window.location.href = '/register';
      	}
      	else
      	{
      		window.location.href = '/forms';
      	}

      })
	
}

}])



//.controller('formsController', ['$scope','userem',function($scope,userem){
	.controller('formsController',['$scope','$sessionStorage','$http', function($scope,$sessionStorage,$http){
	var vm=this;
    $scope.$storage1 = $sessionStorage.userId;
	var userIdFromStorage = $sessionStorage.userId;
	vm.personalInfo=function(){
	//	console.log("inisde personal info function");
		var emailId= $sessionStorage.userId;
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


.controller('medicalController',['$scope','$sessionStorage','$http', function($scope,$sessionStorage,$http){

	var vm=this;
	//console.log("inside medicalController controller");
	//console.log($sessionStorage.userId);
	$scope.$storage1 = $sessionStorage.userId;
	//$scope.$passemail = $sessionStorage.userId;
	$scope.conditions = {};
	$scope.addictions = {};
	
	var userIdFromStorage = $sessionStorage.userId;
		vm.medicalInfo=function(){
		var medical="medical";
		var info="info";
		console.log("inisde personal info function");
		var emailId= $sessionStorage.userId;
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


.controller('emergencyController',['$scope','$sessionStorage','$http', function($scope,$sessionStorage,$http){
	console.log("Test Emergency Controller");
	var vm=this;
	console.log("inside emergencyController controller");
	console.log($sessionStorage.userId);
	$scope.$storage1 = $sessionStorage.userId;
	//$scope.$passemail = $sessionStorage.userId;
	var userIdFromStorage = $sessionStorage.userId;
		console.log("Local Storage Email");
		console.log(userIdFromStorage);
	
	vm.emergencyInfo=function(){
		var emergency="emergency";
		var contacts="contacts";
		var info="info";
		console.log("inisde personal info function");
		var emailId= $sessionStorage.userId;
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
		window.alert ("Thank you completing the form. Please signin to proceed!");	
     	window.location.href = '/';

      })
	}
	
}])

//symptom checker
.controller('symptomsController',['$scope','$sessionStorage','$http', function($scope,$sessionStorage,$http){
	var vm=this;
   console.log("Test Input");

	$scope.bodypart = {};
	//$scope.addictions = {};	
	$scope.facts = {};
	vm.selectValue="test";	
	$scope.loading=false;
   vm.getsymptoms=function(){
   	$scope.loading=true;
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

	   var factid=vm.factid;

     //kovid update appending params to url to be consumed in nodejs
     url = url+'/'+bodypart+'/'+specificbodypart+'/'+symptom;
     console.log(url);
     var symptomInfo={
     // url: '/api/forms', // No need of IP address //sindhuupdate
      url: url,
      method: 'GET',
      //params: {'bodypart':bodypart, 'specificbodypart':specificbodypart, 'symptom':symptom},
      }
	$http(symptomInfo).then(function(data){
     	//window.location.href = '/index';
     	$scope.posConditions=data.data;
     		$scope.loading=false;
   
     	console.log(factid);
     	})
	}

   vm.gotoRem=function(){
	console.log("inside go to rem");
	$scope.posConditions=[{factid:id}];

	console.log($scope.posConditions);
	}

	}])

//remedies Controller
.controller('remediesController',['$scope','$sessionStorage','$http','$location', function($scope,$sessionStorage,$http,$location){
	var vm=this;
	vm.getRemedies=function(){
		//var searchObject = $location.search();
		var factId = $location.$$url.split('/')[2];
		var cName= $location.$$url.split('/')[3];
		$scope.cond=decodeURIComponent(cName);
		var remurl= '/api/conditions/'+factId;
		console.log(factId);
		var getRemRequest = {
	    url:remurl,
	    method: 'GET'
	   }

	$http(getRemRequest).then(function(data){
		console.log("Testing Remedies:");
		console.log(data);
    	$scope.remediesData=data.data;
   	  })
	}
}])

.controller('gmapsController',['$scope','$sessionStorage','$http', function($scope,$sessionStorage,$http){
	var vm=this;
	
	console.log("inside gmap testing");
	console.log($sessionStorage.user_locationBrow);
	console.log("inside gmap testing going to getLoc function");
	$scope.userloc=$sessionStorage.user_locationBrow;
  vm.getLoc=function(){
		vm.userLocation="";
		var userloc = vm.userloc;
		if (navigator.geolocation) {
   		 navigator.geolocation.getCurrentPosition(function(position){
      	$scope.$apply(function(){
        $scope.position = position;
        console.log("Position:");
        console.log($scope.position.coords.latitude);
		userLocation=$scope.position.coords.latitude+","+$scope.position.coords.longitude;
		
		//var userloc=userLocation;
		console.log("midnight test");
		$scope.userloc=userLocation;
		
		console.log($scope.userloc);
      });
    });
  }
}
   }])

.controller('pharmController',['$scope','$sessionStorage','$http', function($scope,$sessionStorage,$http){
	var vm=this;
	
console.log("inside pharm testing");
	console.log("inside pharm testing going to getLoc function");
	$scope.userloc=$sessionStorage.user_locationBrow;
	if(!$scope.userloc){
		console.log("True");
		vm.userLocation="";
		var userloc = vm.userloc;
		if (navigator.geolocation) {
   		 navigator.geolocation.getCurrentPosition(function(position){
      	$scope.$apply(function(){
        $scope.position = position;
        console.log("Position:");
        console.log($scope.position.coords.latitude);
		userLocation=$scope.position.coords.latitude+","+$scope.position.coords.longitude;
		$sessionStorage.user_locationBrow=userLocation;
		
		//var userloc=userLocation;
		$scope.userloc=userLocation;
		
		console.log($scope.userloc);
      });
    });
  }
}
  
}])



.controller('aboutController',['$scope','$sessionStorage','$http', function($scope,$sessionStorage,$http){
	var vm=this;
	


   }])

.controller('getmoreController',['$scope','$sessionStorage','$http', function($scope,$sessionStorage,$http){
	var vm=this;
	
console.log("inside this getmore controller");

   }])

.controller('bhealthController',['$scope','$sessionStorage','$http', function($scope,$sessionStorage,$http){
	var vm=this;
	
	
	vm.message = 'Better Health';
	//User Location - Kovid Insert
	vm.userLocation="";
		if (navigator.geolocation) {
   		 navigator.geolocation.getCurrentPosition(function(position){
      	$scope.$apply(function(){
        $scope.position = position;
        console.log("Position:");
        console.log($scope.position.coords.latitude);
		userLocation=$scope.position.coords.latitude+","+$scope.position.coords.longitude;
		$sessionStorage.user_locationBrow=userLocation;
		console.log($sessionStorage.user_locationBrow);
		console.log(userLocation);
      });
    });
  }
	$scope.insproviders = {};
	$scope.doctors={};
	$scope.insurance={};
	$scope.adress = {};
	//$scope.practices={};
	//vm.regSubmit = $http.post("http://localhost:3000/saveUser");
	var api_key = '84595b9ae71e28e06f8414fafac6938e'; // Get your API key at developer.betterdoctor.com

	var insurance_uid='blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix';
//Sample URL Format https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=84595b9ae71e28e06f8414fafac6938e&insurance_uid=blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix
	
	
	vm.getDoctors=function(){
	
		var sym = encodeURI(vm.symptomVal);
		console.log(vm.uid);
		var uid=vm.uid;
		console.log("tryng to get address");
	 
   console.log(vm.street);
   console.log("tryng to get address 1");
   console.log(vm.p);
		// if($scope.insproviders.blueshield==true){
		// 	insurance_uid='blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix';
		// }

		insurance_uid=uid;
		console.log(insurance_uid);
		console.log(sym);

		if(insurance_uid=="No Plan"){
		var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?query='+sym+'&user_location='+userLocation+'&sort=distance-asc&skip=0&limit=10&user_key=' + api_key;
		}
		else{
		var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?query='+sym+'&user_location='+userLocation+'&sort=distance-asc&skip=0&limit=10&user_key=' + api_key+'&insurance_uid='+insurance_uid;
		}
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
    	//console.log($scope.doctors);

    	
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
   	 	var insurances=data.data.data;
   	 	//$scope.practices=data.data.data;
    	console.log(insurances);
    	var plans=[];
    	for(i=0;i<insurances.length;i++){
    		//console.log(insurances.length);
    		for(plan=0;plan<insurances[i].plans.length;plan++){
    			//console.log(insurances[i].plans.length);
    			plans.push(insurances[i].plans[plan]);
    		}
    	};
    	
    	$scope.insurance=plans;
    	console.log($scope.insurance);
      })


}

vm.bookAppointment=function(){
		console.log("inside book appt");
		var fname=vm.fname;
		var lname=vm.lname;
		var email=vm.email;
		var visitregarding=vm.visitregarding;
		var month=vm.month;
		var day=vm.day;
		var time=vm.time;
		var msg=vm.msg;
		
	var bookappreq = {
      url: '/api/bookappointment', // No need of IP address
      method: 'POST',
      data: {'fname':vm.fname,'lname':vm.lname,'email':vm.email,'visitregarding':vm.visitregarding,'month':vm.month,'day':vm.day,'time':vm.time,'msg':vm.msg},
      headers: {'Content-Type': 'application/json'}
	}

	$http(bookappreq).then(function(data){
      		
      	window.alert("appointment scheduled!");
      	//window.location.href = '/betterhealth';
//res.sendFile(path.join(__dirname+'/views/forms.html'))
 
      })

}

}])



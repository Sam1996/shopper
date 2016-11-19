angular.module('starter.services', [])

.factory('firebaseData',function($firebase){

  var ref = new Firebase("https://shopper-fbdbf.firebaseio.com/");
 

  return {
    ref : function(){
      return ref;
    }
  }

})

.factory('signupService',function($rootScope,$ionicPopup){
	return {
		doSignup : function(username,email,password){
			firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
				alert('User Created successfully');
			}).catch(function(error){
				if (true) {
					alert('Error' + error);
				};
			})
		}
	}
})


.factory('loginService',function($rootScope,$ionicPopup,$state){
	return {
		doLogin : function(email,password){
			firebase.auth().signInWithEmailAndPassword(email, password).then(function(authData){
				var authenticatedUser = authData.uid;
				window.localStorage.setItem('authUser',authenticatedUser);
				$state.go('app.home', {}, {location: "replace"});
			}).catch(function(error){
				if (true) {
					var errorCode = error.code;
					var errorMessage = error.message;
					if(errorCode == 'auth/wrong-password' ){
						$ionicPopup.alert({
							title: 'Wrong password',
							template : 'The password you have entered is wrong.'
						});
					}
					else{
						$ionicPopup.alert({
							title: 'Wrong Credential',
							template : 'The email you have entered is wrong.'
						});
					}
				};
			})
		},

		isLoggedIn : function(){
			var thisUser =  window.localStorage.getItem('authUser');
			return thisUser ? true : false;
		}
	}
})

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.logout = function(){
    firebase.auth().signOut().then(function(){
      window.localStorage.removeItem('authUser');
      $state.go('loginSignup.login',{},{location:"replace"});
    });

  }

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('loginSignupController', function($scope, $stateParams, signupService, loginService) {

  $scope.signup = function(signupData){
    var username  = signupData.username;
    var email     = signupData.email;
    var password  = signupData.password;

    signupService.doSignup(username,email,password);
  }

  $scope.login = function(loginData){
    var email     = loginData.email;
    var password  = loginData.password;

    loginService.doLogin(email,password);
  }

});

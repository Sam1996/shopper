// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','tabSlideBox','firebase'])

.run(function($ionicPlatform,$state,$location,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  var user = window.localStorage.getItem('authUser');
  console.log(user);
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  
//POSITION TABS AT THE BOTTOM
$ionicConfigProvider.tabs.position('bottom');

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    onEnter: function($state, loginService){
        if(!loginService.isLoggedIn()){
           $state.go('loginSignup.login');
        }
    }
  })

  .state('loginSignup', {
    url: '/loginSignup',
    abstract: true,
    templateUrl: 'templates/loginSignup.html',
    controller:'loginSignupController'
  })

  .state('loginSignup.login', {
    url: '/login',
    views: {
      'loginView': {
        templateUrl: 'templates/login.html',
        controller: 'loginSignupController'
      }
    }
  })

  .state('loginSignup.signup', {
    url: '/signup',
    views: {
      'signupView': {
        templateUrl: 'templates/signup.html',
        controller: 'loginSignupController'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    },
    authenticate:'secure'
  })

  .state('app.fruits', {
    url: '/fruits',
    views: {
      'menuContent': {
        templateUrl: 'templates/fruits.html'
      }
    },
    authenticate:'secure'
  })

  .state('app.vegetables', {
    url: '/vegetables',
    views: {
      'menuContent': {
        templateUrl: 'templates/vegetables.html'
      }
    },
    authenticate:'secure'
  })

  .state('app.groceries', {
    url: '/groceries',
    views: {
      'menuContent': {
        templateUrl: 'templates/groceries.html'
      }
    },
    authenticate:'secure'
  })

  .state('app.households', {
    url: '/households',
    views: {
      'menuContent': {
        templateUrl: 'templates/households.html'
      }
    },
    authenticate:'secure'
  })


  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

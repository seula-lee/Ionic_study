// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('socialise', ['ionic', 'socialise.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// App의 상태 set up
.config(function($stateProvider, $urlRouterProvider){
  // tab들의 추상적인 상태 set up
  $stateProvider.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'  // templates view
  })

  // 각각 탭의 history stack
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home':{
        templateUrl : 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search':{
        templateUrl : 'templates/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/home');
});

angular.module('management.controllers', [])
// module(arg, []) >> arg: Application name , [] : Dependencies
.controller('DashboardCtrl', function() {

})

.controller('ContactCtrl', function($scope, $cordovaContacts, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    $scope.contancts = [];
    var options = {};
    options.multiple = true;
    $cordovaContacts.find(options).then(function(allContacts) {
      $scope.contancts = allContacts;
    });
  });

  $scope.sendmail = function(contact) {

  };
});

angular.module('socialise.controllers', ['ngCordova','ngTwitter'])

.controller('HomeCtrl', function($scope, $ionicPlatform, $cordovaOauth, $twitterApi)  {
  var twitterKey    = 'STORAGE.TWITTER.KEY';
  var clientId      = 'nWTAfkcbyAyk21ysW6cCSwZW5';
  var clientSecret  = 'UTBGB0WfrXtDMOZIu8U8cLwcxSmEX4bd3Gw4hOzPREbcjyBedS';
  var myToken = '';

  // social login
  $ionicPlatform.ready(function() {
    myToken = JSON.parse(window.localStorage.getItem(twitterKey));

    if (myToken === '' || myToken === null){
      $cordovaOauth.twitter(clientId, clientSecret).then(function(succ) {
        myToken = succ;
        window.localStorage.setItem(twitterKey, JSON.stringify(succ));
        // ready for login
        $twitterApi.configure(clientId, clientSecret, succ);
        $scope.showHomeTimeline();
      }, function(error) {
        console.log("error_log: "+ error);
      });
    }else{
      $twitterApi.configure(clientId, clientSecret, myToken);
      $scope.showHomeTimeline();
    }
  });

  $scope.showHomeTimeline = function() {
    $twitterApi.getHomeTimeline().then(function(data) {
      $scope.home_timeline = data;
        $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.doRefresh = function() {
    $scope.showHomeTimeline();
  };

  $scope.corretTimestring = function(string) {
    return new Date(Date.parse(string));
  };
})


.controller('SearchCtrl', function()  {

});

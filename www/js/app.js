// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var starter = angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $ionicLoading) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

      window.ConnectSDK.discoveryManager.startDiscovery();
      $ionicLoading.show({ template: 'Discovery Started!', noBackdrop: true, duration: 1000 });

  });
});

starter.controller('mainCtrl', function($scope, $ionicLoading) {

  $scope.updateList = function() {
    $scope.deviceList = window.ConnectSDK.discoveryManager.getDeviceList();

  }

  $scope.showDevicePicker = function () {
    $ionicLoading.show({ template: 'Starting Device Picker', noBackdrop: true, duration: 1000 });
    var devicePicker = window.ConnectSDK.discoveryManager.pickDevice();
    devicePicker.success(function (device) {
      $scope.chosenDevice = device;

      if (device.isReady()) { // already connected
        launchApp();
      } else {
        device.on("ready", launchApp);
        device.connect();
      }

      function launchApp (device) {

        var mySession = null;
        var webAppId = {objectId: "9605425F"};
        args = {};

        var subscriber = {};
        var responseWrapper = {};

        //*** Nothing below this works***

        if(device.hasService(window.ConnectSDK.Services.Chromecast) == false) {
          $ionicLoading.show({ template: 'has chromecast service', noBackdrop: true, duration: 1000 });
        }

        device._sendCommand("launcher", 'launchYouTube', args, subscriber, responseWrapper);

        //$ionicLoading.show({ template: 'Launched app', noBackdrop: true, duration: 1000 });

        //device._sendCommand();

        device.getModelName();
        if(device.getService(window.ConnectSDK.Services.Chromecast) != null) {
          $ionicLoading.show({ template: 'Chromecast Services!', noBackdrop: true, duration: 1000 });
        }

          device.Launcher.YouTube().success(function (session) {
          mySession = session;
          console.log("web app launch success");

        }).error(function (err) {
          console.log("web app launch error: " + err.message);
        });
      }

    });
  }
});

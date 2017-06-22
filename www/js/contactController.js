angular.module('starter')
.controller('contactCtrl',function($scope, $rootScope, $state, $http, $stateParams, MockService,MasterService,
    $ionicActionSheet,$ionicPopup, $ionicScrollDelegate, $timeout, $interval,$ionicHistory,ListService){

    var userid = localStorage.getItem('userId');
   ListService.contactList(userid,function(data){
	   
	   $scope.contacts = data;
	   $scope.contacts.forEach(function(item,value){
		   
		   
		   item.profilepic = base_url+"images/"+item.name+"_"+item.user_id+".jpg";
		   
	   })
	   
   });




});
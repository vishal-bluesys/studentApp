/* Query controller */
angular.module('starter')

.controller('HiddenZoneMessagesCtrl', ['$scope', '$rootScope', '$state',
  '$stateParams', 'MockService','MasterService', '$ionicActionSheet',
  '$ionicPopup', '$ionicScrollDelegate', '$timeout', '$interval','$ionicHistory',
  function($scope, $rootScope, $state, $stateParams, MockService,MasterService,
    $ionicActionSheet,$ionicPopup, $ionicScrollDelegate, $timeout, $interval,$ionicHistory) {
		$scope.profile_pic =  base_url+"images/"+localStorage.getItem('profile_pic');
     $scope.faculty_id= 29;//$stateParams.id;
     $scope.name= '';//$stateParams.name;
	 
	 $scope.goBackState = function(){
		 
		 $ionicHistory.goBack(-1);
	 }

	 $scope.randomColor = function () {
				var letters = '0123456789ABCDE';
				var color = '#';
				for (var i = 0; i < 6; i++ ) {
					color += letters[Math.floor(Math.random() * 16)];
				}
				return color;
			}
	 
	 
    // mock acquiring data via $stateParams
    $scope.toUser = {
      _id: '534b8e5aaa5e7afc1b23e69b',
      pic: 'img/icon.png',
      username: $stateParams.name
    };

    // this could be on $rootScope rather than in $stateParams
    $scope.user = {
      _id: '534b8fb2aa5e7afc1b23e69c',
      pic: $scope.profile_pic,
      username: 'Marty'
    };

    $scope.input = {
      message: localStorage['userMessage-' + $scope.toUser._id] || ''
    };
    $scope.user_id=localStorage.getItem('userId');
    var messageCheckTimer;

    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
    var footerBar; // gets set in $ionicView.enter
    var scroller;
    var txtInput; // ^^^

    $scope.$on('$ionicView.enter', function() {
      console.log('UserMessages $ionicView.enter');

      getMessages();
      
      $timeout(function() {
        footerBar = document.body.querySelector('#userMessagesView .bar-footer');
        scroller = document.body.querySelector('#userMessagesView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);

      messageCheckTimer = $interval(function() {
        // here you could check for new messages if your app doesn't use push notifications or user disabled them
      }, 20000);
    });

    $scope.$on('$ionicView.leave', function() {
      console.log('leaving UserMessages view, destroying interval');
      // Make sure that the interval is destroyed
      if (angular.isDefined(messageCheckTimer)) {
        $interval.cancel(messageCheckTimer);
        messageCheckTimer = undefined;
      }
    });

    $scope.$on('$ionicView.beforeLeave', function() {
      if (!$scope.input.message || $scope.input.message === '') {
        localStorage.removeItem('userMessage-' + $scope.toUser._id);
      }
    });

    function getMessages() {
		
     var user_id=localStorage.getItem('userId');
	 var faculty_id=$scope.faculty_id;
 	       MasterService.getUserMessages(user_id,faculty_id,function(data) {
		   $scope.$apply(function () 
		    {
			  $scope.messages = data;
			  $scope.messages.forEach(function(item,value){
				  item.color =  $scope.randomColor();
				  
				 
				  
			  });
			  console.log($scope.messages);
			   viewScroll.scrollBottom(true);
			});
		   $scope.messages.forEach(function(i){
					 
					 console.log($scope.messages.color);
					if(i.status=='U' && i.flag=='F'){
						//alert(i);
					//	console.log(messages.status);
						i.status=='R';
						
						var data={};
					  data.msg_id=i.msg_id;
					  data.flag="F";
					  data.status="R";
					  
					   $.ajax({
						type: "GET",
						url: base_url+"changeMessagestatus",
						cache: false,
						dataType:"json",
						data:data,
							success: function(data)
							{
									// alert('changeMessagestatus');                
							},
							error: function(){}
						});
					}
			
			
				});
		   
		   });
		   
		    
		  
	     
    }

    $scope.$watch('input.message', function(newValue, oldValue) {
      console.log('input.message $watch, newValue ' + newValue);
      if (!newValue) newValue = '';
      localStorage['userMessage-' + $scope.toUser._id] = newValue;
    });

    $scope.sendMessage = function(message) {

      $scope.input.message = '';
	  var formdata={};
	  formdata.message=message;
	  formdata.flag="S";
	  formdata.std_id=localStorage.getItem('userId');	
	  console.log(formdata);
	  $.ajax({
				type: "GET",
				url: base_url+"sendMessage",
				cache: false,
				dataType:"json",
				data:formdata,
					success: function(data){
						
							getMessages();
							
						
						
					},
					error: function(){
							var alertPopup = $ionicPopup.alert({
							title: 'Error',
							template: 'Connection Error'});}
				});
				
	   $timeout(function() {
       // keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 0);

      $timeout(function() {
        //$scope.messages.push(MockService.getMockMessage());
      //  keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 2000);

			
    };
    
    // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
    function keepKeyboardOpen() {
      console.log('keepKeyboardOpen');
      txtInput.one('blur', function() {
        console.log('textarea blur, focus back on it');
        txtInput[0].focus();
      });
    }

    $scope.onMessageHold = function(e, itemIndex, message) {
      console.log('onMessageHold');
      console.log('message: ' + JSON.stringify(message, null, 2));
      $ionicActionSheet.show({
        buttons: [ {
          text: 'Delete Message'
        }],
        buttonClicked: function(index) {
			alert(message.msg_id);
          switch (index) {
            
            case 0: // Delete
              // no server side secrets here :~)
			  $.ajax({
				  url:"url",
                  data:	message.msg_id,
                  success:function(data){
					   $scope.messages.splice(itemIndex, 1);
					   $timeout(function() {
						viewScroll.resize();
					}, 0);
				   },
				   error:function(){
					   
					   
				   }
				  
			  });
			    
             // $scope.messages.splice(itemIndex, 1);
            //  $timeout(function() {
             //   viewScroll.resize();
            //  }, 0);

              break;
			  case 1: // Copy Text
              //cordova.plugins.clipboard.copy(message.text);

              break;
          }
          
          return true;
        }
      });
    };

    // this prob seems weird here but I have reasons for this in my app, secret!
    $scope.viewProfile = function(msg) {
      if (msg.userId === $scope.user._id) {
        // go to your profile
      } else {
        // go to other users profile
      }
    };
    
    // I emit this event from the monospaced.elastic directive, read line 480
    $scope.$on('taResize', function(e, ta) {
      console.log('taResize');
      if (!ta) return;
      
      var taHeight = ta[0].offsetHeight;
      console.log('taHeight: ' + taHeight);
      
      if (!footerBar) return;
      
      var newFooterHeight = taHeight + 10;
      newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;
      
      footerBar.style.height = newFooterHeight + 'px';
      scroller.style.bottom = newFooterHeight + 'px'; 
    });

}]);
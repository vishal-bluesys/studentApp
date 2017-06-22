angular.module('starter')

.service('AuthService', function($q, $http, USER_ROLES) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;

    if (username == 'admin') {
      role = USER_ROLES.admin
    }
    if (username == 'user') {
      role = USER_ROLES.public
    }

    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function(name, pw,gcmReg_id) {
	  var gcmReg_id=gcmReg_id;
    return $q(function(resolve, reject) {
		var formData = "username="+name+"&password="+pw+"&usertype=4&gcmReg_id="+gcmReg_id;
		//alert(formData);
	
	$.ajax({
		type: "GET",
		url:base_url+"checklogin",
		async: 'true',
		cache: false,
		dataType: 'json',
		data: formData,
		success: onSuccess,
		error:onError
	});
	function onSuccess(data)
	{
	if(data.status=="1")
	{
		storeUserCredentials(name + '.yourServerToken');
		localStorage.setItem('name', data.name);
		localStorage.setItem('userId', data.userId);
		localStorage.setItem('cntr_Id', data.cntr_Id);
		//localStorage.setItem('ref_Id', data.ref_Id);
		localStorage.setItem('username', data.username);
		localStorage.setItem('profile_pic', data.profile_pic);
        resolve('Login success.');
	}
	else {
        reject('Login Failed.');
      }
	}
	function onError()
	{
		reject('Login Failed.');
	} 
     
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})


.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])

.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': 'multipart/form-data'}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}])

.service('MasterService', function() {
	var center_id=localStorage.getItem('cntr_Id');
	 this.centerlist = getcentrelist;
	 this.courselist = getcourselist;
	 this.batchlist = getbatchlist;
	 this.studentlist = gestudentlist;
	 this.studentasslist = gestudentasslist;
	 this.submissionslist = getsubmissionslist;
	 this.liststudentpayent = getliststudentpayent;
	 this.liststudentfees = getliststudentfees;
	 this.facultylist = getfacultylist;
	 this.getUserMessages = getUserMessages;
	 this.liststudentreceipts = getlistreceipts;
	 this.paymentlist = getpaymentlist;
	 this.userinfo= getuserInfo;

	function getcentrelist(callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"listcenter",
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) { callback(data);}
		});
		};
    function getcourselist(callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"listcourse/"+center_id,
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {callback(data);}
		});
		};
		
		function gestudentasslist(std_id,callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"studentasslist/"+std_id,
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {callback(data);}
		});
		};
		function getsubmissionslist(sub_id,callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"getsubmissionslist/"+sub_id,
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {callback(data);}
		});
		};
		function getfacultylist(user_id,callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"getstudentfaculty/"+user_id,
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {callback(data);}
		});
		};
		function getUserMessages(user_id,faculty_id,callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"getUserMessages/"+user_id+"/"+faculty_id+"/S",
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {callback(data);}
		});
		};
	

	function getbatchlist(course_id,callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"listbatch/"+course_id,
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {callback(data);}
		});
		};
	function gestudentlist(center_id,callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"liststudent/"+center_id,
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {callback(data);}
		});
		};
	function getliststudentpayent(center_id,callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"liststudentpayent/"+center_id,
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {callback(data);}
		});
		};
	function getpaymentlist(user_id,callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"listpaymenthistory/"+user_id,
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {callback(data);}
		});
		};
		
	function getliststudentfees(center_id,callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"liststudentfees/"+center_id,
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {callback(data);}
		});
		};
	function getlistreceipts(center_id,callback) {
	    $.ajax({
		type: "GET",
		url:base_url+"listreceipts/"+center_id,
		async: 'true',
		cache: false,
		dataType: 'json',
		success: function(data) {callback(data);}
		});
		};
                function getuserInfo(user_id,callback) {
                    $.ajax({
				type: "GET",
				url: base_url+"getuserinfo/"+user_id,
				cache: false,
				dataType:"json",
				success: function(data){
					callback(data);
			        }
				
			 });
		};
	})
	
	
.service('ListService',function($ionicLoading,PER_PAGE){
	
	
	this.contactList = function(user_id,callback){
		$ionicLoading.show();
		    $.ajax({
				type: "GET",
				url: base_url+"getcontacts/"+user_id,
				cache: false,
				dataType:"json",
				success: function(data){
					$ionicLoading.hide();
					callback(data);
			        },
				error:function(error){
					$ionicLoading.hide();
					alert("error");
				}
		})
		
	}
	
	this.chatList = function(user_id,callback){
		$ionicLoading.show();
		 $.ajax({
				type: "GET",
				url: base_url+"getChatlist/"+user_id,
				cache: false,
				dataType:"json",
				success: function(data){
					$ionicLoading.hide();
					callback(data);
			        },
				error:function(error){
					$ionicLoading.hide();
					alert("error");
				}
		})
		
		
		
	};
	
	var center_id = localStorage.getItem('cntr_Id');
		 this.getNotices=function(listOffset,callback){
			 $ionicLoading.show();
			 $.ajax({
				type: "GET",
				url:base_url+"getNotices",
				data:{'centerId':center_id,'perPage':PER_PAGE,'listOffset':listOffset},
				async: 'true',
				cache: false,
				dataType: 'json',
				success: function(data) {
					callback(data);
					$ionicLoading.hide();
					},
				error:function(error){
				    $ionicLoading.hide();
					alert(error);
                     				   
				 } 
				});
			 
		 }
		 
	
	
})


.service('dataService',function(){
	var data = {};
	  
	  this.setData=function(newData){
		  data = newData;
		  
	  }
	  
	  this.getData = function(){
		  
		  return data;
	  }
	
	
})
	
	
	// services

.factory('MockService', ['$http', '$q',
  function($http, $q) {
    var me = {};

    me.getUserMessages = function(d) {
      /*
      var endpoint =
        'http://www.mocky.io/v2/547cf341501c337f0c9a63fd?callback=JSON_CALLBACK';
      return $http.jsonp(endpoint).then(function(response) {
        return response.data;
      }, function(err) {
        console.log('get user messages error, err: ' + JSON.stringify(
          err, null, 2));
      });
*/
      var deferred = $q.defer();
      
		 setTimeout(function() {
      	 deferred.resolve(getMockMessages());
	    }, 1500);
      
      return deferred.promise;
    };

    me.getMockMessage = function() {
      return {
        userId: '534b8e5aaa5e7afc1b23e69b',
        date: new Date(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      };
    }

    return me;
  }
])  





.filter('nl2br', ['$filter',
  function($filter) {
    return function(data) {
      if (!data) return data;
      return data.replace(/\n\r?/g, '<br />');
    };
  }
])

.service('PushNotificationsService', function ($rootScope, $cordovaPush, $ionicLoading){
	/* Apple recommends you register your application for push notifications on the device every time it’s run since tokens can change. The documentation says: ‘By requesting the device token and passing it to the provider every time your application launches, you help to ensure that the provider has the current token for the device. If a user restores a backup to a device other than the one that the backup was created for (for example, the user migrates data to a new device), he or she must launch the application at least once for it to receive notifications again. If the user restores backup data to a new device or reinstalls the operating system, the device token changes. Moreover, never cache a device token and give that to your provider; always get the token from the system whenever you need it.’ */
	this.register = function() {
		var config = {};

		// ANDROID PUSH NOTIFICATIONS
		if(ionic.Platform.isAndroid())
		{
			config = {
				"senderID": '392766879503'
			};

			$cordovaPush.register(config).then(function(result) {
				// Success
				//console.log("$cordovaPush.register Success");
			//	console.log(result);
				$ionicLoading.show({
					
				template:'loading'
				});
				//alert(result);
			}, function(err) {
				// Error
				console.log("$cordovaPush.register Error");
				console.log(err);
				//alert(err);
			});

			$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
				console.log(JSON.stringify([notification]));
				switch(notification.event)
				{
					case 'registered':
						if (notification.regid.length > 0 ) {
							console.log('registration ID = ' + notification.regid);
							//alert('registration ID = ' + notification.regid);
							localStorage.setItem('gcmReg_id', notification.regid);
							$ionicLoading.hide();
							//NodePushServer.storeDeviceToken("android", notification.regid);
							//$ionicLoading.hide();
						}
						break;

					case 'message':
						if(notification.foreground == "1")
						{
							console.log("Notification received when app was opened (foreground = true)");
							alert(notification.message)
						}
						else
						{
							if(notification.coldstart == "1")
							{
								console.log("Notification received when app was closed (not even in background, foreground = false, coldstart = true)");
								alert(notification.message);
							}
							else
							{
								//alert(notification.message);
								console.log("Notification received when app was in background (started but not focused, foreground = false, coldstart = false)");
							}
						}

						// this is the actual push notification. its format depends on the data model from the push server
						console.log('message = ' + notification.message);
						break;

					case 'error':
						console.log('GCM error = ' + notification.msg);
						break;

					default:
						console.log('An unknown GCM event has occurred');
						break;
				}
			});

			// WARNING: dangerous to unregister (results in loss of tokenID)
			// $cordovaPush.unregister(options).then(function(result) {
			//   // Success!
			// }, function(err) {
			//   // Error
			// });
		}

		if(ionic.Platform.isIOS())
		{
			config = {
				"badge": true,
				"sound": true,
				"alert": true
			};

			$cordovaPush.register(config).then(function(result) {
				// Success -- send deviceToken to server, and store for future use
				console.log("result: " + result);
				//NodePushServer.storeDeviceToken("ios", result);
			}, function(err) {
				console.log("Registration error: " + err);
			});

			$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
				console.log(notification.alert, "Push Notification Received");
			});
		}
	};
});


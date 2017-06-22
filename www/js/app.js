// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic',  'ui.rCalendar', 'ionicSettings','ionic-timepicker','ionic-datepicker','ngMockE2E', 'monospaced.elastic', 'angularMoment','ngCordova','ionicLazyLoad'],['$httpProvider', function($httpProvider,PushNotificationsServices) {
// bower install angular-mocks --save
// <script src="lib/angular-mocks/angular-mocks.js"></script>
// https://docs.angularjs.org/api/ngMockE2E
  //Setting headers
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    $httpProvider.defaults.headers.post['X-CSRF-TOKEN'] = $('meta[name=_token]').attr('content');
	}])

.run(function($ionicPlatform,PushNotificationsService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
//	PushNotificationsService.register();
  });
  

})

.config(function ($stateProvider, $urlRouterProvider,$httpProvider, $ionicConfigProvider, USER_ROLES) {
    
   // $ionicConfigProvider.tabs.position('bottom');
    
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/auth/login.html',
    controller: 'LoginCtrl'
  })

 
  
 .state('main', {
    url: '/',
	cache:false,
    abstract: true,
    templateUrl: 'templates/main.html'
  })

  .state('main.dash', {
    url: 'main/dash',
    views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashCtrl'
        }
    }
  })
   .state('main.showprofile', {
    url: 'main/showprofile',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/profile/profile.html',
          controller: 'profileCtrl'
        }
    }
  })
 
  .state('main.editprofile', {
    cache:false,
    url: 'main/editprofile',
    views: {
        'menuContent': {
          templateUrl: 'templates/auth/editprofile.html',
          controller: 'EditprofileCtrl'
        }
    }
  })
  
    .state('main.changepass', {
    cache:false,
    url: 'main/changepass',
    views: {
        'menuContent': {
          templateUrl: 'templates/auth/changepass.html',
          controller: 'changepassCtrl'
        }
    }
  })
  
  
  .state('main.attendance', {
    url: 'main/attendance',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/attendance.html',
		  controller: 'attendanceCtrl'
          }
    }
  })
  
  
  .state('main.payments', {
    url: 'main/payments',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/payments.html',
		  controller: 'paymentCtrl'
          }
    }
  })
    .state('main.calender', {
    url: 'main/calender',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/calender/eventcalender.html',
		  controller: 'CalendarCtrl'
          }
    }
  })
 
  
  .state('main.sessions', {
    url: 'main/sessions',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/tasks.html', 
		  controller: 'sessionCtrl'
        }
    }
  }) 
  
   .state('main.notices', {
    url: 'main/notices',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/notices.html', 
		  controller: 'noticeCtrl'
        }
    }
  }) 
 .state('main.syllabus', {
    url: 'main/syllabus',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/syllabus.html', 
		  controller: 'syllabusCtrl'
        }
    }
  }) 
   .state('main.references', {
    url: 'main/references',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/references/references-website.html', 
		  controller: 'referenceCtrl'
        }
    }
  }) 
  .state('main.books', {
    url: 'main/books',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/references/references-books.html', 
		  controller: 'referenceCtrl'
        }
    }
  })
  
 .state('main.assignment', {
    url: 'main/assignment',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/assignment/assignment.html',
          controller: 'assignmentCtrl'
        }
    }
  })
  
   .state('main.submission', {
    url: 'main/submission/:AssignmentId/:AssignmentNo',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/assignment/submissionlist.html',
          controller: 'submissionListCtrl'
        }
    }
  })
    

 .state('main.addsubmission', {
    url: 'main/addsubmission/:AssignmentId/:AssignmentNo',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/assignment/addsubmission.html',
          controller: 'addsubmissionCtrl'
        }
    }
  })
.state('main.submissiondetail', {
    url: 'main/submissiondetail',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/assignment/submissiondetails.html',
          controller: 'submissiondetailsCtrl'
        }
    }
  })
  
  .state('main.queries', {
    url: 'main/queries',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/chat/queriesList.html',
          controller: 'queries'
        }
    }
  })
  
 .state('main.chats', {
      url: 'main/chats',
	  cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/chat/tab-chats.html',
          controller: 'queries'
        }
      }
    })
	
   .state('main.hiddenchat', {
      url: 'main/hiddenchat',
	  cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/chat/hiddenchat.html',
          controller: 'HiddenZoneMessagesCtrl'
        }
      }
    })
 .state('main.aboutus', {
      url: 'main/aboutus',
      views: {
        'menuContent': {
          templateUrl: 'templates/aboutus.html'
		           
        }
      }
    })
	
  .state('main.help', {
      url: 'main/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/helpfeedback.html',
		  controller: 'feedbackCtrl'     
        }
      }
    })
	.state('main.legal', {
      url: 'main/legal',
      views: {
        'menuContent': {
          templateUrl: 'templates/legal.html'
		           
        }
      }
    })
	
 .state('main.settings', {
      url: 'main/settings',
	  cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
		  controller : function($scope, $ionicSettings,$ionicPopup){
			  
				 /* $ionicSettings.init({
						awesomeSelection: {
							type: 'selection',
							values: ['one', 'two', 'three'],
							label: 'Awesome Selection',
							value: 'two'
						},
						coolToggle: {
							type: 'toggle',
							label: 'Cool toggle',
							value: true
						}
					
					});*/
		  }
         
        }
      }
    })
	
	
    .state('main.query', {
    url: 'main/query/:id/:name',
	cache:false,
    views: {
        'menuContent': {
          templateUrl: 'templates/chat/query.html',
          controller: 'UserMessagesCtrl'
        }
    }
  })

 .state('main.logout', {
    url: 'main/logout',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/auth/login.html',
        controller:function($state,$window,$ionicHistory){
            
            localStorage.clear();
            $window.localStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
		  
		  $window.location.reload('/login');
        }
      }
    }
  })
  
  
    // setup an abstract state for the tabs directive
   .state('main.tab', {
    url: 'main/tab',
	cache:false,
	 views: {
	 'menuContent': {
        templateUrl: 'templates/chat/tabs.html'
	  }
	 }
  })

  // Each tab has its own nav history stack:

  .state('main.tab.chats', {
    url: 'main/tab/chats',
	cache:false,
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat/tab-chats.html',
        controller: 'queries'
      }
    }
  })

  .state('main.tab.contacts', {
      url: 'main/tab/contacts',
	  cache:false,
      views: {
        'tab-contacts': {
          templateUrl: 'templates/chat/tab-contacts.html',
          controller: 'contactCtrl'
        }
      }
    })
    .state('main.tab.chat-detail', {
      url: 'main/chats/:chatId',
	  cache:false,
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat/chat-detail.html',
          controller: 'DashCtrl'
        }
      }
    })

  .state('main.tab.account', {
    url: 'main/tab/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/chat/tab-account.html',
        controller: 'DashCtrl'
      }
    }
  });
  
  

  $urlRouterProvider.otherwise('/main/dash');
 
})

.run(function($httpBackend){
  $httpBackend.whenGET('http://localhost:8100/valid')
        .respond({message: 'This is my valid response!'});
  $httpBackend.whenGET('http://localhost:8100/notauthenticated')
        .respond(401, {message: "Not Authenticated"});
  $httpBackend.whenGET('http://localhost:8100/notauthorized')
        .respond(403, {message: "Not Authorized"});

  $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
 })

.run(function ($rootScope, $state, $ionicPlatform,$cordovaPush, AuthService, AUTH_EVENTS) {
	
	 var androidConfig = {
    "senderID": "392766879503",
	};

	
	
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }

    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
  
  


})

.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
})


.directive('standardTimeMeridian', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                etime: '=etime'
            },
            template: "<strong>{{stime}}</strong>",
            link: function (scope, elem, attrs) {

                scope.stime = epochParser(scope.etime, 'time');

                function prependZero(param) {
                    if (String(param).length < 2) {
                        return "0" + String(param);
                    }
                    return param;
                }

                function epochParser(val, opType) {
                    if (val === null) {
                        return "00:00";
                    } else {
                        var meridian = ['AM', 'PM'];

                        if (opType === 'time') {
                            var hours = parseInt(val / 3600);
                            var minutes = (val / 60) % 60;
                            var hoursRes = hours > 12 ? (hours - 12) : hours;

                            var currentMeridian = meridian[parseInt(hours / 12)];

                            return (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
                        }
                    }
                }

                scope.$watch('etime', function (newValue, oldValue) {
                    scope.stime = epochParser(scope.etime, 'time');
                });

            }
        };
    })

    .directive('standardTimeNoMeridian', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                etime: '=etime'
            },
            template: "<strong>{{stime}}</strong>",
            link: function (scope, elem, attrs) {

                scope.stime = epochParser(scope.etime, 'time');

                function prependZero(param) {
                    if (String(param).length < 2) {
                        return "0" + String(param);
                    }
                    return param;
                }

                function epochParser(val, opType) {
                    if (val === null) {
                        return "00:00";
                    } else {
                        if (opType === 'time') {
                            var hours = parseInt(val / 3600);
                            var minutes = (val / 60) % 60;

                            return (prependZero(hours) + ":" + prependZero(minutes));
                        }
                    }
                }

                scope.$watch('etime', function (newValue, oldValue) {
                    scope.stime = epochParser(scope.etime, 'time');
                });

            }
        };
    })


.filter('nl2br', ['$filter',
  function($filter) {
    return function(data) {
      if (!data) return data;
      return data.replace(/\n\r?/g, '<br />');
    };
  }
])

// directives
.directive('autolinker', ['$timeout',
  function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $timeout(function() {
          var eleHtml = element.html();

          if (eleHtml === '') {
            return false;
          }

          var text = Autolinker.link(eleHtml, {
            className: 'autolinker',
            newWindow: false
          });

          element.html(text);

          var autolinks = element[0].getElementsByClassName('autolinker');

          for (var i = 0; i < autolinks.length; i++) {
            angular.element(autolinks[i]).bind('click', function(e) {
              var href = e.target.href;
              console.log('autolinkClick, href: ' + href);

              if (href) {
                //window.open(href, '_system');
                window.open(href, '_blank');
              }

              e.preventDefault();
              return false;
            });
          }
        }, 0);
      }
    }
  }
])

function onProfilePicError(ele) {
  this.ele.src = ''; // set a fallback
}

function getMockMessages() {
  return {"messages":[{"_id":"535d625f898df4e80e2a125e","text":"Ionic has changed the game for hybrid app development.","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-04-27T20:02:39.082Z","read":true,"readDate":"2014-12-01T06:27:37.944Z"},{"_id":"535f13ffee3b2a68112b9fc0","text":"I like Ionic better than ice cream!","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-04-29T02:52:47.706Z","read":true,"readDate":"2014-12-01T06:27:37.944Z"},{"_id":"546a5843fd4c5d581efa263a","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-17T20:19:15.289Z","read":true,"readDate":"2014-12-01T06:27:38.328Z"},{"_id":"54764399ab43d1d4113abfd1","text":"Am I dreaming?","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-26T21:18:17.591Z","read":true,"readDate":"2014-12-01T06:27:38.337Z"},{"_id":"547643aeab43d1d4113abfd2","text":"Is this magic?","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-26T21:18:38.549Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"547815dbab43d1d4113abfef","text":"Gee wiz, this is something special.","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-28T06:27:40.001Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"54781c69ab43d1d4113abff0","text":"I think I like Ionic more than I like ice cream!","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-28T06:55:37.350Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"54781ca4ab43d1d4113abff1","text":"Yea, it's pretty sweet","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-28T06:56:36.472Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"5478df86ab43d1d4113abff4","text":"Wow, this is really something huh?","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-28T20:48:06.572Z","read":true,"readDate":"2014-12-01T06:27:38.339Z"},{"_id":"54781ca4ab43d1d4113abff1","text":"Create amazing apps - ionicframework.com","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-29T06:56:36.472Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"}],"unread":0};
}

// configure moment relative time
moment.locale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d sec",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
});

/*
 * angular-elastic v2.4.2
 * (c) 2014 Monospaced http://monospaced.com
 * License: MIT
 */

angular.module('monospaced.elastic', [])

  .constant('msdElasticConfig', {
    append: ''
  })

  .directive('msdElastic', [
    '$timeout', '$window', 'msdElasticConfig',
    function($timeout, $window, config) {
      'use strict';

      return {
        require: 'ngModel',
        restrict: 'A, C',
        link: function(scope, element, attrs, ngModel) {

          // cache a reference to the DOM element
          var ta = element[0],
              $ta = element;

          // ensure the element is a textarea, and browser is capable
          if (ta.nodeName !== 'TEXTAREA' || !$window.getComputedStyle) {
            return;
          }

          // set these properties before measuring dimensions
          $ta.css({
            'overflow': 'hidden',
            'overflow-y': 'hidden',
            'word-wrap': 'break-word'
          });

          // force text reflow
          var text = ta.value;
          ta.value = '';
          ta.value = text;

          var append = attrs.msdElastic ? attrs.msdElastic.replace(/\\n/g, '\n') : config.append,
              $win = angular.element($window),
              mirrorInitStyle = 'position: absolute; top: -999px; right: auto; bottom: auto;' +
                                'left: 0; overflow: hidden; -webkit-box-sizing: content-box;' +
                                '-moz-box-sizing: content-box; box-sizing: content-box;' +
                                'min-height: 0 !important; height: 0 !important; padding: 0;' +
                                'word-wrap: break-word; border: 0;',
              $mirror = angular.element('<textarea tabindex="-1" ' +
                                        'style="' + mirrorInitStyle + '"/>').data('elastic', true),
              mirror = $mirror[0],
              taStyle = getComputedStyle(ta),
              resize = taStyle.getPropertyValue('resize'),
              borderBox = taStyle.getPropertyValue('box-sizing') === 'border-box' ||
                          taStyle.getPropertyValue('-moz-box-sizing') === 'border-box' ||
                          taStyle.getPropertyValue('-webkit-box-sizing') === 'border-box',
              boxOuter = !borderBox ? {width: 0, height: 0} : {
                            width:  parseInt(taStyle.getPropertyValue('border-right-width'), 10) +
                                    parseInt(taStyle.getPropertyValue('padding-right'), 10) +
                                    parseInt(taStyle.getPropertyValue('padding-left'), 10) +
                                    parseInt(taStyle.getPropertyValue('border-left-width'), 10),
                            height: parseInt(taStyle.getPropertyValue('border-top-width'), 10) +
                                    parseInt(taStyle.getPropertyValue('padding-top'), 10) +
                                    parseInt(taStyle.getPropertyValue('padding-bottom'), 10) +
                                    parseInt(taStyle.getPropertyValue('border-bottom-width'), 10)
                          },
              minHeightValue = parseInt(taStyle.getPropertyValue('min-height'), 10),
              heightValue = parseInt(taStyle.getPropertyValue('height'), 10),
              minHeight = Math.max(minHeightValue, heightValue) - boxOuter.height,
              maxHeight = parseInt(taStyle.getPropertyValue('max-height'), 10),
              mirrored,
              active,
              copyStyle = ['font-family',
                           'font-size',
                           'font-weight',
                           'font-style',
                           'letter-spacing',
                           'line-height',
                           'text-transform',
                           'word-spacing',
                           'text-indent'];

          // exit if elastic already applied (or is the mirror element)
          if ($ta.data('elastic')) {
            return;
          }

          // Opera returns max-height of -1 if not set
          maxHeight = maxHeight && maxHeight > 0 ? maxHeight : 9e4;

          // append mirror to the DOM
          if (mirror.parentNode !== document.body) {
            angular.element(document.body).append(mirror);
          }

          // set resize and apply elastic
          $ta.css({
            'resize': (resize === 'none' || resize === 'vertical') ? 'none' : 'horizontal'
          }).data('elastic', true);

          /*
           * methods
           */

          function initMirror() {
            var mirrorStyle = mirrorInitStyle;

            mirrored = ta;
            // copy the essential styles from the textarea to the mirror
            taStyle = getComputedStyle(ta);
            angular.forEach(copyStyle, function(val) {
              mirrorStyle += val + ':' + taStyle.getPropertyValue(val) + ';';
            });
            mirror.setAttribute('style', mirrorStyle);
          }

          function adjust() {
            var taHeight,
                taComputedStyleWidth,
                mirrorHeight,
                width,
                overflow;

            if (mirrored !== ta) {
              initMirror();
            }

            // active flag prevents actions in function from calling adjust again
            if (!active) {
              active = true;

              mirror.value = ta.value + append; // optional whitespace to improve animation
              mirror.style.overflowY = ta.style.overflowY;

              taHeight = ta.style.height === '' ? 'auto' : parseInt(ta.style.height, 10);

              taComputedStyleWidth = getComputedStyle(ta).getPropertyValue('width');

              // ensure getComputedStyle has returned a readable 'used value' pixel width
              if (taComputedStyleWidth.substr(taComputedStyleWidth.length - 2, 2) === 'px') {
                // update mirror width in case the textarea width has changed
                width = parseInt(taComputedStyleWidth, 10) - boxOuter.width;
                mirror.style.width = width + 'px';
              }

              mirrorHeight = mirror.scrollHeight;

              if (mirrorHeight > maxHeight) {
                mirrorHeight = maxHeight;
                overflow = 'scroll';
              } else if (mirrorHeight < minHeight) {
                mirrorHeight = minHeight;
              }
              mirrorHeight += boxOuter.height;
              ta.style.overflowY = overflow || 'hidden';

              if (taHeight !== mirrorHeight) {
                ta.style.height = mirrorHeight + 'px';
                scope.$emit('elastic:resize', $ta);
              }
              
              scope.$emit('taResize', $ta); // listen to this in the UserMessagesCtrl

              // small delay to prevent an infinite loop
              $timeout(function() {
                active = false;
              }, 1);

            }
          }

          function forceAdjust() {
            active = false;
            adjust();
          }

          /*
           * initialise
           */

          // listen
          if ('onpropertychange' in ta && 'oninput' in ta) {
            // IE9
            ta['oninput'] = ta.onkeyup = adjust;
          } else {
            ta['oninput'] = adjust;
          }

          $win.bind('resize', forceAdjust);

          scope.$watch(function() {
            return ngModel.$modelValue;
          }, function(newValue) {
            forceAdjust();
          });

          scope.$on('elastic:adjust', function() {
            initMirror();
            forceAdjust();
          });

          $timeout(adjust);

          /*
           * destroy
           */

          scope.$on('$destroy', function() {
            $mirror.remove();
            $win.unbind('resize', forceAdjust);
          });
        }
      };
    }
  ]);
  
app.directive('preImg', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			ratio:'@',
			helperClass: '@'
		},
		controller: function($scope) {
			$scope.loaded = false;

			this.hideSpinner = function(){
				// Think i have to use apply because this function is not called from this controller ($scope)
				$scope.$apply(function () {
					$scope.loaded = true;
				});
			};
		},
		templateUrl: 'views/common/pre-img.html'
	};
});

app.directive('spinnerOnLoad', function() {
	return {
		restrict: 'A',
		require: '^preImg',
		scope: {
			ngSrc: '@'
		},
		link: function(scope, element, attr, preImgController) {
			element.on('load', function() {
				preImgController.hideSpinner();
		  });
		}
	};
});


app.directive('multiBg', function(_){
	return {
		scope: {
			multiBg: '=',
			interval: '=',
			helperClass: '@'
		},
		controller: function($scope, $element, $attrs) {
			$scope.loaded = false;
			var utils = this;

			this.animateBg = function(){
				// Think i have to use apply because this function is not called from this controller ($scope)
				$scope.$apply(function () {
					$scope.loaded = true;
					$element.css({'background-image': 'url(' + $scope.bg_img + ')'});
				});
			};

			this.setBackground = function(bg) {
				$scope.bg_img = bg;
			};

			if(!_.isUndefined($scope.multiBg))
			{
				if(_.isArray($scope.multiBg) && ($scope.multiBg.length > 1) && !_.isUndefined($scope.interval) && _.isNumber($scope.interval))
				{
					// Then we need to loop through the bg images
					utils.setBackground($scope.multiBg[0]);
				}
				else
				{
					// Then just set the multiBg image as background image
					utils.setBackground($scope.multiBg[0]);
				}
			}
		},
		templateUrl: 'views/common/multi-bg.html',
		restrict: 'A',
		replace: true,
		transclude: true
	};
});

app.directive('bg', function() {
	return {
		restrict: 'A',
		require: '^multiBg',
		scope: {
			ngSrc: '@'
		},
		link: function(scope, element, attr, multiBgController) {
			element.on('load', function() {
				multiBgController.animateBg();
		  });
		}
	};
})



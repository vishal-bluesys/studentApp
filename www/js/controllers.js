///var base_url="http://bluesys.in/dev/mschoolapp/public/";
//var base_url="http://localhost/lumen/public/";
var base_url="http://bluesys.in/dev/mschoolbackend/public/";
//var base_url="http://localhost/mschoolbackend/public/";
angular.module('starter')

// .controller('AppCtrl', function() {})
// .controller('LoginCtrl', function() {})
// .controller('DashCtrl', function() {});
.controller('AppCtrl', function($scope, $state, $ionicPopup,$ionicHistory,$cordovaNetwork, AuthService, AUTH_EVENTS,MasterService) {
  $scope.username = AuthService.username();
   $scope.username = name;
    $scope.name = localStorage.getItem('name');
	$scope.user_id = localStorage.getItem('userId');
	$scope.profile_pic = base_url+"images/"+localStorage.getItem('profile_pic');
	
	$ionicHistory.clearCache();
	/* var type = $cordovaNetwork.getNetwork();
     alert(type);
   // var isOnline = $cordovaNetwork.isOnline();
    alert(isOnline);
    var isOffline = $cordovaNetwork.isOffline();
    alert(isOffline);*/
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
    $scope.name = localStorage.getItem('name');
	$scope.user_id = localStorage.getItem('userId');
  };
  	
		MasterService.userinfo($scope.user_id,function(data) {
		 $scope.$apply(function () 
		 {     console.log(data);
                     if($scope.profile_pic!=data.profile_pic){
                          localStorage.setItem('profile_pic', data.profile_pic);
                        // $scope.profile_pic = data.profile_pic;
                        $scope.profile_pic = base_url+"images/"+localStorage.getItem('profile_pic');
                        
                     };
			
		});
		});


  $scope.toggleleft = function(){
	  $scope.username = AuthService.username();
   $scope.username = name;
    $scope.name = localStorage.getItem('name');
	$scope.user_id = localStorage.getItem('userId');
	$scope.profile_pic = base_url+"images/"+localStorage.getItem('profile_pic');
	
	  
  }
		
   $scope.logout = function() {
	  $scope.popover.hide();
    AuthService.logout();
    $state.go('login');
  }
})



.controller('LoginCtrl', function($scope, $state, $ionicPopup, $ionicPopover,$ionicLoading, AuthService) {
  $scope.data = {};
  $scope.data.gcmReg_id = localStorage.getItem('gcmReg_id');
  $scope.submit = function(data) {
	  $ionicLoading.show();
	 AuthService.login(data.username, data.password,data.gcmReg_id).then(function(authenticated) 
	  {
		  $ionicLoading.hide();
	  $scope.setCurrentUsername(localStorage.getItem('name'));

      $state.transitionTo('main.dash', {}, {reload: true});
      $scope.data={};      
	  }, function(err) 
	  {
		  $ionicLoading.hide();
		   var alertPopup = $ionicPopup.alert({
			title: 'Login failed!',
			template: 'Sorry! Invalid Credentials'
		   });
                   
      });
  };

})



.controller('profileCtrl', function($scope, $state, $ionicPopup,$ionicLoading, $window , $ionicHistory , $ionicPopover,$cordovaCamera, $cordovaFileTransfer , AuthService) {
 	$scope.profile_pic = base_url+"images/"+localStorage.getItem('profile_pic');
         var user_id= localStorage.getItem('userId');
	$scope.showprofile = function(){
			 
			
			 $.ajax({
				type: "GET",
				url: base_url+"getuserinfo/"+user_id,
				cache: false,
				dataType:"json",
				beforesend:function(){
					$ionicLoading.show();
				},
				success: function(data){
					console.log(data);
					$scope.$apply(function () {
                  	$scope.editdata=data;
					var d= data.dob;
					$scope.editdata.dob = d // new Date(data.dob);
					$ionicLoading.hide();
			     });
					},
				error: function(){
					    var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Connection Error'});}
			 });  
			  
		  };
	$scope.showprofile();
	
	$scope.selectImage=function(){
		
	
		

		var options = {
			quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
	   };

    $cordovaCamera.getPicture(options).then(function(imageURI) {
      var image = document.getElementById('profileImage');
      image.src = imageURI;
	  $scope.imageURI = image.src;
	   var pimage = document.getElementById('p_pic_slider');
		pimage.src = imageURI;
	  $scope.uploadPic();
    }, function(err) {
      // error
    });


   
 	
	};
        
        
         $scope.updateprofileinfo=function(filename){
             var userId = localStorage.getItem('userId');
             
             $.ajax({
                 type:"GET",
                 url:base_url+"updateprofilepicinfo",
                 data:{"userID":userId,"filename":filename},
                 success:function(){
                     
                 },
                 error:function(){
                     alert("CONNECTION ERROR");
                 }
                 
                 
             });
             
         };
	
	
	$scope.uploadPic= function(){
		   var url = "http://bluesys.in/dev/mschoolbackend/app/Http/Controllers/upload.php" ;
		   $ionicLoading.show();
      
     //File for Upload
			var image = document.getElementById('profileImage');
			var targetPath =$scope.imageURI; //cordova.file.externalRootDirectory + "logo_radni.png"; // image.src; // 
			//alert(targetPath);
      
     // File name only
			var filename = targetPath.split("/").pop();
			var exetention = filename.split(".").pop();
			//alert(filename);
			filename= localStorage.getItem('name')+"_"+localStorage.getItem('userId')+"."+exetention;
           // alert(filename);
     var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "image/jpg",
          params : {'directory':'upload', 'fileName':filename,'type': 'profile'}
      };
         
      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
		  alert("SUCCESS:"+JSON.stringify(result.response));
		  $ionicLoading.hide();
                  $scope.updateprofileinfo(filename);
                  localStorage.setItem('profile_pic',filename);
          console.log("SUCCESS: " + JSON.stringify(result.response));
		/*$window.cache.clear( function(status) {
           // alert('Message: ' + status);
        }, function(status) {
           // alert('Error: ' + status);
		}
        );*/
		
        window.cache.cleartemp();
		   
		  
      }, function (err) {
          //console.log("ERROR: " + JSON.stringify(err));
		  alert("ERROR:" + JSON.stringify(err));
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });
		
    $.ajax({
            type: "GET",
            url: base_url+"upload_profile_pic/",
            cache: false,
            data:{'user_id': user_id,'filename':filename},
            dataType:"json",
            beforesend:function(){
                    $ionicLoading.show();
            },
            success: function(data){
                    console.log(data);
                  // new Date(data.dob);
              }
         });
           
   };
})



.controller('DashCtrl', function($scope, $state, $http, $filter,$stateParams, $ionicPopup,$ionicPopover,$window, $ionicModal, AuthService) {

	$scope.name = localStorage.getItem('name');
  $scope.logout = function() {
	  $scope.popover.hide();
    AuthService.logout();
    $state.go('login');
  };
    
    $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
    }).then(function(popover) {
    $scope.popover = popover;
  });    
    
                
    $scope.contactUs = function(){
        
        $scope.modal.show();
    };
    
        
    $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
    $scope.dialNumber = function(number) {
            $window.open('tel:' + number, '_system');
        }
    
    $scope.website=function(){
            
      // File for download
    var url ="http://www.manthanartschool.com/";
         //    $scope.url = url;

       //alert($scope.url);
      // File name only
      var filename = url.split("/").pop();
        //  alert(filename);
            var type="";
            if (device.platform === "iOS") {
			type = "_blank";
		}
		else if (device.platform === "Android") {
			type = "_system";
		}
		else {
			type = "_system";
		}
       $window.open(url, type);
        
    };
      
    $scope.youtube=function(){
            
      // File for download
    var url ="https://www.youtube.com/user/manthanadvt";
         //    $scope.url = url;

       //alert($scope.url);
      // File name only
      var filename = url.split("/").pop();
        //  alert(filename);
            var type="";
            if (device.platform === "iOS") {
			type = "_blank";
		}
		else if (device.platform === "Android") {
			type = "_system";
		}
		else {
			type = "_system";
		}
       $window.open(url, type);
        
    };
  	 $scope.changepassword =true;	
	 $scope.editprofile =true ;	
	 $scope.dashbordShow =false ;	

  $scope.showchangepassword = function() {
      $scope.popover.hide();
	 $scope.changepassword =false;	
	 $scope.editprofile =true ;	
	 $scope.dashbordShow =true ;	
   
  };
  $scope.updatepassword = function(data) {
  var user_id= localStorage.getItem('userId');
    $.ajax({
				type: "GET",
				url: base_url+"changepassword/"+user_id,
				cache: false,
				dataType:"json",
				data: data,
				success: function(data){
					if(data=="1")
					{
						$scope.changepassword =true;	
						$scope.editprofile =true ;	
                        $scope.dashbordShow =false ;
						var alertPopup = $ionicPopup.alert({
						title: 'Success',
						template: 'Password changed Successfully'});
					}
					},
				error: function(){
					    var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Connection Error'});}
			 });
  };

  $scope.showeditprofile = function() {
      $scope.popover.hide();
	  var user_id= localStorage.getItem('userId');
	$scope.changepassword =true;	
	$scope.editprofile =false ;	
    $scope.dashbordShow =true ;	
	  $.ajax({
				type: "GET",
				url: base_url+"getuserinfo/"+user_id,
				cache: false,
				dataType:"json",
				success: function(data){
					$scope.$apply(function () {
                  	$scope.editdata=data;
					$scope.editdata.dob=new Date(data.dob);
			     });
					},
				error: function(){
					    var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Connection Error'});}
			 });
  };
  
   $scope.updateprofile = function(data) {
	   
	   var dob = $filter('date')(new Date(data.dob),'yyyy-MM-dd ');
		  data.dob=dob;
		  console.log(data);
	    $.ajax({
				type: "GET",
				url: base_url+"updateprofile",
				cache: false,
				dataType:"json",
				data: data,
				success: function(data){
					if(data=="1")
					{
						$scope.changepassword =true;	
						$scope.editprofile =true ;	
                        $scope.dashbordShow =false ;	
						var alertPopup = $ionicPopup.alert({
						title: 'Success',
						template: 'Saved Successfully'});
						
					}
					},
				error: function(){
					    var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Connection Error'});}
			 }); 
  };

  $scope.performInvalidRequest = function() {
    $http.get('http://localhost:8100/notauthenticated').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
})


.controller('paymentCtrl',function($scope, $state, $ionicLoading, $http,MasterService,$filter, $ionicPopup, $window ,  AuthService){
    
    //	$scope.showpayments = function() {
		//$ionicLoading.show();
		 $scope.payments={};
		 $scope.showpaymentlist =false;
		 var user_id= localStorage.getItem('userId');
		 $scope.payments={};
		 MasterService.paymentlist(user_id,function(data) {
	         $scope.base_url = base_url+"receipts/";
			// alert(data);
		 $scope.$apply(function () 
		 {
			 console.log(data); 
			 $scope.payments=data.details;
			 $scope.paid=data.paidamount;
			 $scope.total=data.coursefee;
			 $scope.coursename=data.details[0].coursename;
			 var fee_id=data.fee_id;
			 var bill_date=data.bill_date;
			 $scope.url=base_url+"receipts/receipt_"+fee_id+"_"+user_id+"_"+bill_date+".pdf";
             $scope.filename="receipt_"+fee_id+"_"+user_id+"_"+bill_date+".pdf";
			 $scope.balance=data.coursefee-data.paidamount;
			// $ionicLoading.hide();
		 });
		});
	// };
         
        $scope.receiptFileDownload = function (url) {
           
      // File for download
   // var url = $scope.url ;//"http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";
         //    $scope.url = url;

       //alert(url);
      // File name only
      var filename = url.split("/").pop();
        //  alert(filename);
            var type="";
            if (device.platform === "iOS") {
			type = "_blank";
		}
		else if (device.platform === "Android") {
			type = "_system";
		}
		else {
			type = "_system";
		}
       $window.open(url, type);
      // Save location
     
            /*var targetPath = cordova.file.externalRootDirectory + filename;
 
      $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
          console.log('Success');
          alert("success");
      }, function (error) {
          console.log('Error');
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });*/
  };
    
})

.controller('sessionCtrl',function($scope, $state, $http,MasterService,$filter,$ionicModal, $ionicLoading,$ionicPopup, AuthService){
		$scope.summarylist =true ;
		$scope.sessionsummaryform =true ;
		$scope.editsessionsummaryform =true;
		 //showsummarylist();
		 $scope.showsummarylist = function() {
		 $scope.summarylist =false;
		 $scope.sessionsummaryform =true;
		 $scope.editsessionsummaryform =true;
		 $scope.today = new Date();
		 var user_id= localStorage.getItem('userId');
		 
		 $scope.payments={};
		  $.ajax({
				type: "GET",
				url: base_url+"liststudentsummary/"+user_id,
				cache: false,
				dataType:"json",
				beforesend:function(){
					$ionicLoading.show();
				},
				success: function(data){
					$scope.$apply(function () {
                  	$scope.session_sum_list=data;
					$ionicLoading.hide();
			     });
					},
				error: function(){
					    var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Connection Error'});}
			});
	 };

		 $scope.showsummarylist();
		$scope.showsessionsummaryform = function() {
		 $scope.payments={};
		 $scope.summarylist =true;
		 $scope.editsessionsummaryform =true;
		 $scope.sessionsummaryform =false;
	};
    $scope.submitsummary = function(data) { 
	     var user_id= localStorage.getItem('userId');
		 data.user_id=user_id; 
		 var summary_date = $filter('date')(new Date(data.summary_date),'yyyy-MM-dd ');
		 data.summary_date=summary_date;
		 	$.ajax({
				type: "POST",
				url: base_url+"addsummary",
				cache: false,
				dataType:"json",
				data: data,
				success: function(data){
					if(data=="1")
					{
						//$state.go('listcenter');
						$scope.data="";
					    var alertPopup = $ionicPopup.alert({
						title: 'Success',
						template: 'Added Successfully'});
						 $scope.summarylist =true;
						 $scope.editsessionsummaryform =true;
						 $scope.sessionsummaryform =true;
						 $scope.showsummarylist();			
					}
					else
					{
						var alertPopup = $ionicPopup.alert({
						title: 'Fail',
						template: 'Error'});
					}
					
				},
				error: function(){
					    var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Connection Error'});}
		});
		
	  };
	  

	 $scope.editsummary = function(id,title,summary,date,faculty,batchname,coursename) {
		 $scope.summarylist =true;
		 $scope.sessionsummaryform =true;
		 $scope.editsessionsummaryform =false;
		 $scope.editdata={};
		 $scope.editdata.id=id;
		 $scope.editdata.title=title;
		 $scope.editdata.summary=summary;
		 $scope.editdata.summary_date=new Date(date);
		 $scope.editdata.faculty=faculty;
		 $scope.editdata.batchname=batchname;
		 $scope.editdata.coursename=coursename;
	 };
	 $scope.updatesummary = function(data){
		 var summary_date = $filter('date')(new Date(data.summary_date),'yyyy-MM-dd ');
		 data.summary_date=summary_date;
		  $.ajax({
				type: "POST",
				url: base_url+"updatestudentsummary",
				cache: false,
				dataType:"json",
				data:data,
				success: function(data){
					if(data=="1")
					{
						//$state.go('listcenter');
						$scope.editdata="";
					    var alertPopup = $ionicPopup.alert({
						title: 'Success',
						template: 'Updated Successfully'});
						 $scope.summarylist =true;
						 $scope.sessionsummaryform =true;
						 $scope.editsessionsummaryform =true;
						 $scope.showsummarylist();
					}
					else
					{
						var alertPopup = $ionicPopup.alert({
						title: 'Fail',
						template: 'Error'});
					}
					
				},
				error: function(){
					    var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Connection Error'});}
			}); 
		  
	  };
	  $scope.deletesummary = function(index,id){
		  var confirmPopup = $ionicPopup.confirm({
						title: 'Delete',
						template: 'Are you sure you want to Delete',
					});
		  confirmPopup.then(function(res) {
				if(res) {
			   $.ajax({
					type: "GET",
					url: base_url+"deletestudentsummary/"+id,
					cache: false,
					dataType:"json",
					success: function(data){
						if(data=="1")
						{
							var alertPopup = $ionicPopup.alert({
										title: 'Success',
										template: 'Deleted Successfully'});
							$scope.session_sum_list.splice(index,1);
						
						}
						else
						{
							var alertPopup = $ionicPopup.alert({
							title: 'Fail',
							template: 'Error'});
						}
						
					},
					error: function(){
							var alertPopup = $ionicPopup.alert({
							title: 'Error',
							template: 'Connection Error'});}
				});
		   }
			else{}
		}); 				
	  };
	  
	    $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    
	  
	  $scope.showDetails= function(title,date,summary)
	{   
    $scope.modal.show();
    $scope.summary_details =false ;
		//$scope.std_name=std_name;
		$scope.title=title;
		$scope.date=date;
		$scope.summary=summary;
	}
	
	
})

.controller('MainCtrl', function($scope, $state, $http,MasterService,$filter, $ionicPopup,$cordovaFileTransfer, AuthService) {
	 $scope.summarylist =true ;
	 $scope.sessionsummaryform =true ;
 	 $scope.editsessionsummaryform =true;	
	 
	$scope.showpayments = function() {
		 $scope.payments={};
		 $scope.showpaymentlist =false;
		 var user_id= localStorage.getItem('userId');
		 $scope.payments={};
		 $scope.base_url = base_url+"receipts/";
		 MasterService.paymentlist(user_id,function(data) {
		 $scope.$apply(function () 
		 { 
		     console.log(data);
			 $scope.payments=data.details;
			 $scope.paid=data.paidamount;
			 $scope.total=data.coursefee;
			 var fee_id=data.fee_id;
			 var bill_date=data.bill_date;
			 $scope.url=base_url+"receipts/receipt_"+fee_id+"_"+user_id+"_"+bill_date+".pdf";
			 $scope.balance=data.coursefee-data.paidamount;
		 });
		});
	 };
    
     

})



.controller('IntroCtrl', function ($scope, $state, $ionicSlideBoxDelegate) {

  // Called to navigate to the main app
  $scope.startApp = function () {
 //  $state.go('main');
      $state.go('main.dash', {}, {reload: true});
  };
  $scope.next = function () {
    $ionicSlideBoxDelegate.select($ionicSlideBoxDelegate.next());
  };
  $scope.previous = function () {
    $ionicSlideBoxDelegate.select($ionicSlideBoxDelegate.previous());
  };

  // Called each time the slide changes
  $scope.slideChanged = function (index) {
    $scope.slideIndex = index;
  };
})





//Syllabus Controller
.controller('syllabusCtrl' , function($scope, $filter , $stateParams , $state, $http, $ionicLoading,  $ionicModal, MasterService){
        var userId = localStorage.getItem('userId');
    
         $.ajax({
                type:'GET',
                url: base_url+"getSyllabus/"+userId,
                dataType:'JSON',
                beforsend:function(){$ionicLoading.show();},
                success:function(data){
                  $ionicLoading.hide();
                    // console.log(data);
                      $scope.syllbus = data.s_detailedSylbs;
                      // console.log(data[0].s_detailedSylbs);
                    }
                
               
            
            });
      
  
        
        
})

/* Referances */

.controller("referenceCtrl",function($scope){
	var categories = ["Fonts","Vectors","Colors","Brushes & Vectors","Texture & Pattern"];
	 $scope.groups = [];
	 
  for (var i=0; i<categories.length; i++) {
    $scope.groups[i] = {
      name: categories[i],
      items: []
    };
	
	var websites = ["https://w3schools.com","http://adobe.com","https://manthanartschool.com"];
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(websites[j]);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  
	
	
	
	
})

.controller('noticeCtrl',function($scope, $state, $http,MasterService,$filter,$ionicModal, $ionicLoading,$ionicPopup, AuthService,ListService,PER_PAGE){
	
	var listoffset = 0;
    var page = 1;
	 $scope.today = new Date();
  ListService.getNotices(listoffset,function(data){
	
	$scope.notices = data.notices;
	console.log($scope.notices);
	$scope.total = data.total;
	 console.log($scope.total);
 });
	
	
	$scope.loadMore = function() {
	  var length = ($scope.notices).length;
	  var listOffset = page*PER_PAGE;
       var flag = ($scope.total - length == 0 ) ? true : false;

    
       $scope.noMoreItemsAvailable = flag;
    
	  ListService.getNotices(listOffset,function(data){
		 $scope.$apply(function () 
		 {
			    data.notices.forEach(function(i){
				 $scope.notices.push(i);

			 });
			 
		 });
      });
	  
	 
	  page++;
	
     $scope.$broadcast('scroll.infiniteScrollComplete')
	  
	  
  };
	
  
 $ionicModal.fromTemplateUrl('templates/noticemodal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });
  
  $scope.showNotice = function(data){
	  $scope.notice = data;
	 $scope.modal1.show();
	
}
	
})



.controller('attendanceCtrl',function($scope, $state, $http,MasterService,$filter, $ionicModal,$ionicLoading, $ionicPopup, AuthService){


var data = {'std_id':localStorage.getItem('userId'), 'date':'0'};
$scope.getattendance = function(data) {
	console.log(data);
     $.ajax({
		type: "GET",
		url:base_url+"getstudent_att",
		async: 'true',
		cache: false,
		data:data,
		dataType: 'json',
		beforesend:function(){
			$ionicLoading.show();
		},
		success: function(data) {	$scope.$apply(function () {
			$ionicLoading.hide();
                    $scope.att_list={};
                  	$scope.att_list=data;
                        
                        $scope.total=0;
                        $scope.present=0;
                        $scope.absent=0;
                        console.log(data);
                        angular.forEach(data,function(value,key){
                            
                            if(value.attendance=='P'){
                                
                                 $scope.present++;
                            }
                            else{
                                $scope.absent++;
                               
                            }
                            $scope.total++;
                        });
                        $scope.avg=Math.ceil(Number(Number($scope.present)/Number($scope.total))*100);
                        
			     });}
		});
};
$scope.getattendance(data);

})


.controller('feedbackCtrl',function($scope,$cordovaEmailComposer){
	$scope.data={};
	//alert($scope.data);
	$scope.submitFeedback = function(data){
		//alert(data);
		var username = localStorage.getItem('name');
		// alert(username);
               $cordovaEmailComposer.isAvailable().then(function() {
                        // is available
                        console.log("is available");
                      }, function () {
                        // not available
                         console.log("is not available");
                      });
                  var email = {
                      to:'manthanadvt@gmail.com',
                      cc: 'directorofmanthan@gmail.com',
                      subject: 'Feedback',
                      body: 'Respected sir/madam, \n I am '+username+','+data.feedback,
                      isHtml: true
                    };
                 //alert(JSON.stringify(email));
                 $cordovaEmailComposer.open(email).then(null, function () {
                     // user cancelled email
                   });
      
             };
	
	
})


.controller('changepassCtrl',function($scope, $state, $http, $filter ,$ionicPopup, $ionicLoading, $ionicHistory, $ionicPopover, AuthService){
	
	  $scope.goBack=function(){
		  
		  $ionicHistory.goBack(-1);
		  
	  }
	  
	  
	  
	  $scope.updatepassword = function(data) {
		   $ionicLoading.show();
      var user_id= localStorage.getItem('userId');
    $.ajax({
				type: "GET",
				url: base_url+"changepassword/"+user_id,
				cache: false,
				dataType:"json",
				data: data,
				success: function(data){
					if(data=="1")
					{ $ionicLoading.hide();
						$scope.changepassword =true;	
						$scope.editprofile =true ;	
						var alertPopup = $ionicPopup.alert({
						title: 'Success',
						template: 'Password changed Successfully'});
					}
					},
				error: function(){
					 $ionicLoading.hide();
					    var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Connection Error'});}
			 });
  };
})

.controller('EditprofileCtrl',function($scope, $ionicLoading , $state, $http, $filter ,$ionicPopup, $ionicHistory, $ionicPopover, AuthService){
	
	  $scope.goBack=function(){
		  
		  $ionicHistory.goBack(-1);
		  
	  }
	
  $scope.showeditprofile = function() {
	  $ionicLoading.show();
	  var user_id= localStorage.getItem('userId');
	$scope.changepassword =true;	
	$scope.editprofile =false ;	
        $scope.dashboard=false;
	  $.ajax({
				type: "GET",
				url: base_url+"getuserinfo/"+user_id,
				cache: false,
				dataType:"json",
				success: function(data){
					$scope.$apply(function () {
                  	$scope.editdata=data;
					$scope.editdata.dob=new Date(data.dob);
			     });
				  $ionicLoading.hide();
					},
				error: function(){
					 $ionicLoading.hide();
					    var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Connection Error'});}
			 });
  }();;
   $scope.updateprofile = function(data) {
	    $ionicLoading.show();
	   var dob = $filter('date')(new Date(data.dob),'yyyy-MM-dd ');
		  data.dob=dob;
		  console.log(data);
	    $.ajax({
				type: "GET",
				url: base_url+"updateprofile",
				cache: false,
				dataType:"json",
				data: data,
				success: function(data){
					 $ionicLoading.hide();
					if(data=="1")
					{
						$scope.changepassword =true;	
						$scope.editprofile =true ;	
						var alertPopup = $ionicPopup.alert({
						title: 'Success',
						template: 'Saved Successfully'});
						
					}
					},
				error: function(){
					 $ionicLoading.hide();
					    var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Connection Error'});}
			 }); 
  };

	
});










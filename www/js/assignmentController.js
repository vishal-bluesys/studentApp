angular.module('starter')

.controller('assignmentCtrl', function($scope, $state, $http,MasterService,$filter,  $ionicLoading, $ionicPopup, AuthService){
	$scope.assignmentList=false;
	$scope.submissionList=true;
	$scope.adnewSubmission=true;
	$scope.submissionForm=true;
	$scope.ass_details=true;
	  $ionicLoading.show();
      var std_id= localStorage.getItem('userId');
	   MasterService.studentasslist(std_id,function(data) {
		 $scope.$apply(function () 
		 {
			 $scope.listassignment=data;
			 console.log(data);
			   $ionicLoading.hide();
			
		 });
		});
})

.controller('submissionListCtrl', function($scope,$state,$ionicPopover,$ionicLoading,$stateParams, MasterService,dataService){
	 $scope.id=$stateParams.AssignmentNo;
     $scope.sub_id = $stateParams.AssignmentId;
	
	 $scope.listsubmission=function(){
		  $ionicLoading.show();
		  MasterService.submissionslist($scope.sub_id,function(data) {
			 $scope.$apply(function () 
			 {
				   $scope.assingmentdata =  {};
				 $scope.submissions_list=data;
				 console.log(data);
				 $scope.ass_description=data[0].ass_description;
				 $scope.assingmentdata.ass_description = data[0].ass_description;
				 $scope.ass_id=data[0].ass_id;
				 $scope.assingmentdata.ass_id=data[0].ass_id;
				 $scope.assingmentdata.sub_id=data[0].sub_id;
				 $scope.ass_no=data[0].ass_no;
				 $scope.assingmentdata.ass_no=data[0].ass_no;
				 $scope.ass_title=data[0].ass_title;
				 $scope.assingmentdata.ass_title=data[0].ass_title;
				 console.log($scope.assingmentdata);
				 $ionicLoading.hide();
			
			 });
			})
	}();
	
	$scope.setdata = function(data){
		dataService.setData(data);

	};
})

.controller('addsubmissionCtrl',function($scope,$window, $state, $http, MasterService,$ionicPopover,$ionicLoading,$filter, $ionicPopup, 
$ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate,$stateParams,$cordovaCapture,$cordovaFileTransfer, $cordovaCamera,$cordovaImagePicker,dataService){
	$scope.data = dataService.getData();
	$scope.data.sub_id = $scope.data.sub_id;
	 $scope.images = [];
	  $ionicPopover.fromTemplateUrl('templates/popover.html', {
			scope: $scope
			}).then(function(popover) {
			$scope.popover = popover;
		  });
      $scope.selectImage=function(){
		
		//alert("add Images");
		$scope.popover.hide();
      // alert("camera");
		var options = {
			limit: 1
		};

		$cordovaCapture.captureImage(options).then(function(results) {
			//alert(results);
			for (var i = 0; i < results.length; i++) {
			//	alert(results[i]);
				$scope.images.push(results[i].fullPath);
			}
			if(!$scope.$$phase) {
				$scope.$apply();
			}
		}, function(err) {
			console.log('err');
			console.log(err);
		// error
		});
		
		
		
	};
	
	
        
 $scope.imagepick=function(){
     $scope.popover.hide();
       window.imagePicker.getPictures(
	function(results) {
		for (var i = 0; i < results.length; i++) {
			//console.log('Image URI: ' + results[i]);
                       $scope.images.push(results[i]);
						//alert(results[i]);
                        
		}
                     
               
	}, function (error) {
		console.log('Error: ' + error);
	}, {
		maximumImagesCount: 8,
		width: 800
	});
 
 };
        
 $scope.uploadImages= function(formdata){
		 var ass_images="";
	
    $scope.images.forEach(function(i) {
           var url = "http://bluesys.in/dev/mschoolbackend/app/Http/Controllers/upload.php" ;
	
     //File for Upload
			var image = document.getElementById('profileImage');
			var targetPath =i; //cordova.file.externalRootDirectory + "logo_radni.png"; // image.src; // 
			     
     // File name only
			var filename = targetPath.split("/").pop();
			var exetention = filename.split(".").pop();
			var d = new Date();
                        var n = d.getTime();
			filename= $scope.sub_id+"_"+n+"_"+filename;
            var options = {
			  fileKey: "file",
			  fileName: filename,
			  type:"ass",
			  chunkedMode: false,
			  mimeType: "image/jpg",
			  params : {'directory':'upload', 'fileName':filename,'type':'ass'}
      };
           
      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
		 // alert("SUCCESS:"+JSON.stringify(result.response));
          //console.log("SUCCESS: " + JSON.stringify(result.response));
      }, function (err) {
          //console.log("ERROR: " + JSON.stringify(err));
		  //alert("ERROR:" + JSON.stringify(err));
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });
	 ass_images=ass_images+"|"+filename;
	 });
	 formdata.ass_image=ass_images;
		 $.ajax({
					type: "GET",
					url: base_url+"submitassign",
					cache: false,
					dataType:"json",
					data:formdata,
					success: function(data){
						if(data=="1")
						{
							var alertPopup = $ionicPopup.alert({
										title: 'Success',
										template: 'Assignment Submitted Successfully'});
							//$scope.session_sum_list.splice(index,1);
							$scope.listsubmission();
						
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
	 
	 
	 
	 
	 $scope.deletePic = function(index,id){
		  var confirmPopup = $ionicPopup.confirm({
						title: 'Delete',
						template: 'Are you sure you want to remove',
					});
		  confirmPopup.then(function(res) {
				if(res) {
			  $scope.images.splice(index,1);
			 // alert(images.length);
		   }
			else{}
		}); 				
	  };
	 
     $scope.zoomMin = 1;

  $scope.showImages = function(index) {
	 $scope.activeSlide = index;
    $scope.showModal('templates/image-zoomview.html');
  };

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

  $scope.updateSlideStatus = function(slide) {
    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };  
	console.log($scope.data);
	
})


.controller('submissiondetailsCtrl', function($scope, $state, $http, $ionicSlideBoxDelegate, $ionicScrollDelegate, MasterService, $filter, $ionicPopup, $ionicModal, $stateParams, dataService){
     var item = dataService.getData();
	  
	  $scope.showasubdetails=function(item){
			$scope.ass_no=item.ass_no;
			$scope.submission_date=item.submission_date;
			$scope.ass_title=item.ass_title;
			$scope.ass_description=item.ass_description;
			$scope.sub_no=item.sub_no;
			$scope.sub_description=item.sub_description;
			$scope.comment=item.comment;
			$scope.submitteddate=item.submitteddate;
			$scope.approved=item.approved;
			//$scope.ass_image=base_url+"assignments//"+item.ass_image;
			
			var str_ass_image =item.ass_image;
			$scope.ass_image={};
			var img_array=new Array();
			str_ass_image=str_ass_image.split("|");
			for(var i=1;i<str_ass_image.length;i++)
			{
			img_array.push(base_url+"assignments/"+str_ass_image[i]);
			}
			$scope.ass_image=img_array;
			
			
		}(item);
    
       $scope.zoomMin = 1;

  $scope.showImages = function(index) {
	 $scope.activeSlide = index;
    $scope.showModal('templates/assignment/image-zoomview.html');
  };

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

  $scope.updateSlideStatus = function(slide) {
    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };
	 
	
})




.controller('submissionCtrl', function($scope,$window, $state, $http, MasterService,$ionicPopover,$ionicLoading,$filter, $ionicPopup, 
$ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate,$stateParams,$cordovaCapture,$cordovaFileTransfer, $cordovaCamera,$cordovaImagePicker,AuthService){
	 $scope.id=$stateParams.AssignmentNo;
     $scope.sub_id = $stateParams.AssignmentId;
	$scope.submissionList=false;
	$scope.submissionForm=true;
    $scope.adnewSubmission=true;
	$scope.ass_details=true;
	$scope.images = [];
	$scope.newsubmission=function(){
	$scope.submissionList=true;
	$scope.submissionForm=false;	
	$scope.ass_details=true;	
		
	};
        
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
    }).then(function(popover) {
    $scope.popover = popover;
  });
        
        
	$ionicLoading.show();
    
	$scope.listsubmission=function(){
		$scope.submissionList=false;
		$scope.submissionForm=true;
		$scope.ass_details=true;
		$scope.adnewSubmission=true;
		MasterService.submissionslist($scope.sub_id,function(data) {
		 $scope.$apply(function () 
		 {
			 $scope.submissions_list=data;
			 console.log(data);
			 $scope.ass_description=data[0].ass_description;
			 $scope.ass_id=data[0].ass_id;
			 $scope.ass_no=data[0].ass_no;
			 $scope.ass_title=data[0].ass_title;
			 $ionicLoading.hide();
			 // console.log($scope.ass_description);
		 });
		});
		
	};
	$scope.listsubmission();
	
	$scope.showasubdetails=function(item){
	$scope.assignmentList=true;
	$scope.adnewSubmission=true;
	$scope.submissionList=true;
	$scope.ass_details=false;
	$scope.ass_no=item.ass_no;
	$scope.submission_date=item.submission_date;
	$scope.ass_title=item.ass_title;
	$scope.ass_description=item.ass_description;
	$scope.sub_no=item.sub_no;
	$scope.sub_description=item.sub_description;
	$scope.comment=item.comment;
	$scope.submitteddate=item.submitteddate;
	$scope.approved=item.approved;
	//$scope.ass_image=base_url+"assignments//"+item.ass_image;
	
	var str_ass_image =item.ass_image;
	$scope.ass_image={};
	var img_array=new Array();
	str_ass_image=str_ass_image.split("|");
	for(var i=1;i<str_ass_image.length;i++)
	{
	img_array.push(base_url+"assignments/"+str_ass_image[i]);
	}
	$scope.ass_image=img_array;
	
	
};
$scope.showsubmissionform=function(){
	//console.log(item);
	$scope.data={};
	$scope.data.sub_id=$scope.sub_id;
	/*$scope.ass_no=item.ass_no;
	$scope.ass_id=item.ass_id;
	$scope.ass_title=item.ass_title;
	$scope.ass_description=item.ass_description;*/
	$scope.submissionList=true;
	$scope.submissionForm=true;
	$scope.assignmentList=true;
	$scope.ass_details=true;
	$scope.adnewSubmission=false;
};

	
	$scope.submitassign=function(formdata){
		
		console.log(formdata);
		 $.ajax({
					type: "GET",
					url: base_url+"submitassign",
					cache: false,
					dataType:"json",
					data:formdata,
					beforesend:function(){
						$ionicLoading.show();
					},
					success: function(data){
						$ionicLoading.hide();
						if(data=="1")
						{
							var alertPopup = $ionicPopup.alert({
										title: 'Success',
										template: 'Assignment Submitted Successfully'});
							//$scope.session_sum_list.splice(index,1);
							$scope.listsubmission();
						
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
	 
	 
	 $scope.selectImage=function(){
		
		//alert("add Images");
		$scope.popover.hide();
    
		var options = {
			limit: 1
		};

		$cordovaCapture.captureImage(options).then(function(results) {
			for (var i = 0; i < results.length; i++) {
				$scope.images.push(results[i].fullPath);
			}
			if(!$scope.$$phase) {
				$scope.$apply();
			}
		}, function(err) {
			console.log('err');
			console.log(err);
		// error
		});
		
		
		
	};
	
	
        
 $scope.imagepick=function(){
     $scope.popover.hide();
       window.imagePicker.getPictures(
	function(results) {
		for (var i = 0; i < results.length; i++) {
			console.log('Image URI: ' + results[i]);
                        $scope.images.push(results[i]);
                        
		}
                     
               
	}, function (error) {
		console.log('Error: ' + error);
	}, {
		maximumImagesCount: 8,
		width: 800
	});
 
 };
        
 $scope.uploadImages= function(formdata){
		 var ass_images="";
	
    $scope.images.forEach(function(i) {
           var url = "http://bluesys.in/dev/mschoolbackend/app/Http/Controllers/upload.php" ;
	
     //File for Upload
			var image = document.getElementById('profileImage');
			var targetPath =i; //cordova.file.externalRootDirectory + "logo_radni.png"; // image.src; // 
			     
     // File name only
			var filename = targetPath.split("/").pop();
			var exetention = filename.split(".").pop();
			var d = new Date();
                        var n = d.getTime();
			filename= $scope.sub_id+"_"+n+"_"+filename;
            var options = {
			  fileKey: "file",
			  fileName: filename,
			  type:"ass",
			  chunkedMode: false,
			  mimeType: "image/jpg",
			  params : {'directory':'upload', 'fileName':filename,'type':'ass'}
      };
           
      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
		 // alert("SUCCESS:"+JSON.stringify(result.response));
          //console.log("SUCCESS: " + JSON.stringify(result.response));
      }, function (err) {
          //console.log("ERROR: " + JSON.stringify(err));
		  //alert("ERROR:" + JSON.stringify(err));
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });
	 ass_images=ass_images+"|"+filename;
	 });
	 formdata.ass_image=ass_images;
		 $.ajax({
					type: "GET",
					url: base_url+"submitassign",
					cache: false,
					dataType:"json",
					data:formdata,
					success: function(data){
						if(data=="1")
						{
							var alertPopup = $ionicPopup.alert({
										title: 'Success',
										template: 'Assignment Submitted Successfully'});
							//$scope.session_sum_list.splice(index,1);
							$scope.listsubmission();
						
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
	 
	 
	 
	 
	 $scope.deletePic = function(index,id){
		  var confirmPopup = $ionicPopup.confirm({
						title: 'Delete',
						template: 'Are you sure you want to remove',
					});
		  confirmPopup.then(function(res) {
				if(res) {
			  $scope.images.splice(index,1);
			 // alert(images.length);
		   }
			else{}
		}); 				
	  };
	 
     $scope.zoomMin = 1;

  $scope.showImages = function(index) {
	 $scope.activeSlide = index;
    $scope.showModal('templates/image-zoomview.html');
  };

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

  $scope.updateSlideStatus = function(slide) {
    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };
	 
	 
})



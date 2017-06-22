 	$(document).on("pageinit","#uploadprofile",function(){
		
		 var id=localStorage.userId;
	   $("#uploadprofilePic").attr('src',base_url+"images/"+id+".jpg");
		
		
	});
	   
  
   
   
   
    var deviceReady = false;
     /**
     * Select picture from library
     */
	// $("#serverUrl").val(base_url+'imgupload');
	 
    function selectPicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('uploadprofilePic');
                img.style.visibility = "off";
                img.style.display = "block";
                img.src = uri;
				 window.plugins.toast.show('image Selected','long','bottom');
               },
            function(e) {
                console.error("Error getting picture: " + e);
				 window.plugins.toast.show('Error getting picture');
                //document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
          { quality: 90, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
    }
    /**
     * Upload current picture
     */
    function uploadPicture() {
    	
    	// Get URI of picture to upload
		var id = localStorage.userId; // $("#Id").val();
		var img = document.getElementById('uploadprofilePic');
		var imageURI = img.src;
		//alert(imageURI);
        if (!imageURI || (img.style.display == "none")) {
           // document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
		    window.plugins.toast.show('Take picture or select picture from library first','long','bottom');
            return;
        }
        
        // Verify server has been entered
        server = localStorage.base_url+'imgupload'; //document.getElementById('serverUrl').value;
		
		if (server) {
        	
            // Specify transfer options
		    var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName= id; //imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            options.chunkedMode = false;
            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                //document.getElementById('camera_status').innerHTML = "Upload successful: "+r.bytesSent+" bytes uploaded."; 
                console.info("Upload successful: ");
                window.plugins.toast.show('Upload Sucessfully','long','bottom');
				navigator.app.clearCache();
               	$("#dashboard #profilePic").attr('src',base_url+"images/"+id+".jpg");
				
               // window.location.hash ="#dashboard";				
            }, function(error) {
               // document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code; 
        			 window.plugins.toast.show('Upload failed','long','bottom');				   
				/*navigator.notification.alert(
							"Upload failed: Code = "+error.code,  // message
							null,         // callback
							'Error', // title
							'Ok'                  // buttonName
						);*/
            }, options);
        }
    }
   
    /**
     * Function called when page has finished loading.
     
    function init() {
        document.addEventListener("deviceready", function() {deviceReady = true;}, false);
        window.setTimeout(function() {
            if (!deviceReady) {
               // alert("Error: PhoneGap did not initialize.  Demo will not run correctly.");
            }
        },2000);
		
    }*/
	
 function imgError(image) 
	{
			image.onerror = "";
			image.src = "css/images/Default.png";
			return true;
	}	
window.addEventListener('DOMContentLoaded', (event) => {
    var imageInput = document.getElementById('imageInput');
    var cropButton = document.getElementById('cropButton');
    var downloadButton = document.getElementById('downloadButton');
    var preview = document.getElementById('preview');
  
    var cropper;
    var croppedImage;
  
    imageInput.addEventListener('change', function(event) {
      var file = event.target.files[0];
      var reader = new FileReader();
  
      reader.onload = function(e) {
        preview.src = e.target.result;
        initCropper();
      };
  
      reader.readAsDataURL(file);
    });
  
    function initCropper() {
      if (cropper) {
        cropper.destroy();
      }
  
      cropper = new Cropper(preview, {
        aspectRatio: 1, // Set the aspect ratio as needed
        viewMode: 1, // Set the view mode as needed (0: free, 1: cropped)
      });
  
      cropButton.disabled = false;
      downloadButton.disabled = true;
    }
  
    cropButton.addEventListener('click', function() {
      croppedImage = cropper.getCroppedCanvas({
        width: 300, // Set the desired width of the cropped image
        height: 300, // Set the desired height of the cropped image
      });
  
      downloadButton.disabled = false;
    });
  
    downloadButton.addEventListener('click', function() {
      // Disable the download button to prevent multiple clicks
      downloadButton.disabled = true;
      downloadButton.textContent = 'Downloading...';
  
      // Convert the cropped canvas to a downloadable file
      croppedImage.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'cropped_image.png';
  
        // Simulate a delay to show the loading state
        setTimeout(function() {
          // Trigger the download
          a.click();
  
          // Clean up and reset the download button
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          downloadButton.disabled = false;
          downloadButton.textContent = 'Download Cropped Image';
        }, 1000); // Adjust the delay time as needed
      });
    });
  });
  
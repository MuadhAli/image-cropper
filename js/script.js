window.addEventListener('DOMContentLoaded', (event) => {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var imageInput = document.getElementById('imageInput');
    var cropButton = document.getElementById('cropButton');
    var uploadedImage = document.getElementById('uploadedImage');
    var cropOverlay = document.getElementById('cropOverlay');
  
    var isCropping = false;
    var startX, startY;
  
    cropButton.addEventListener('click', cropAndDownload);
    imageInput.addEventListener('change', loadImage);
  
    function loadImage(event) {
      var file = event.target.files[0];
      var reader = new FileReader();
  
      reader.onload = function(e) {
        uploadedImage.src = e.target.result;
        uploadedImage.onload = function() {
          canvas.width = uploadedImage.width;
          canvas.height = uploadedImage.height;
          ctx.drawImage(uploadedImage, 0, 0);
        };
  
        uploadedImage.style.display = 'block';
        cropOverlay.style.width = uploadedImage.width + 'px';
        cropOverlay.style.height = uploadedImage.height + 'px';
      };
  
      reader.readAsDataURL(file);
    }
  
    cropOverlay.addEventListener('mousedown', startCrop);
    cropOverlay.addEventListener('mousemove', performCrop);
    cropOverlay.addEventListener('mouseup', endCrop);
  
    function startCrop(event) {
      isCropping = true;
      startX = event.offsetX;
      startY = event.offsetY;
    }
  
    function performCrop(event) {
      if (!isCropping) return;
  
      var width = event.offsetX - startX;
      var height = event.offsetY - startY;
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(uploadedImage, 0, 0);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX, startY, width, height);
    }
  
    function endCrop(event) {
      if (!isCropping) return;
      isCropping = false;
  
      var width = event.offsetX - startX;
      var height = event.offsetY - startY;
  
      var croppedImage = document.createElement('canvas');
      croppedImage.width = width;
      croppedImage.height = height;
      var croppedCtx = croppedImage.getContext('2d');
      croppedCtx.drawImage(canvas, startX, startY, width, height, 0, 0, width, height);
  
      var dataURL = croppedImage.toDataURL('image/png');
      uploadedImage.src = dataURL;
    }
  
    function cropAndDownload() {
      var dataURL = uploadedImage.src;
      var a = document.createElement('a');
      a.href = dataURL;
      a.download = 'cropped_image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  });
  
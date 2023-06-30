var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var imageInput = document.getElementById('imageInput');

function cropAndDownload() {
  var file = imageInput.files[0];
  var reader = new FileReader();

  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Perform cropping (example: crop the top-left 100x100 pixels)
      var croppedImage = document.createElement('canvas');
      croppedImage.width = 100;
      croppedImage.height = 100;
      var croppedCtx = croppedImage.getContext('2d');
      croppedCtx.drawImage(canvas, 0, 0, 100, 100, 0, 0, 100, 100);

      // Convert the cropped image to a downloadable file
      var dataURL = croppedImage.toDataURL('image/png');
      var a = document.createElement('a');
      a.href = dataURL;
      a.download = 'cropped_image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

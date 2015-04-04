var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	var video = document.querySelector("video");
	var mediaStream = null;

	var idx = 0;
	var filters = ['grayscale', 'sepia', 'blur', 'brightness',
               'contrast', 'hue-rotate', 'hue-rotate2',
               'hue-rotate3', 'saturate', 'invert', ''];

	var constraints = {
	video: true
};

var hdConstraints = {
	video: {
    	mandatory: {
      		minWidth: 1280,
      		minHeight: 720
    	}
  	}
};

var vgaConstraints = {
	video: {
    	mandatory: {
      		minWidth: 640,
      		minHeight: 360
    	}
  	}
};

var minConstraints = {
	video: {
    	mandatory: {
      		minWidth: 500,
      		minHeight: 300
    	}
  	}
};


$(document).ready(function(){
	console.log("Ready");
	$('#captureBtn').click(snapshot);
	console.log(""+video.width+" "+ video.height);
});

function hasGetUserMedia() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasGetUserMedia()) {
	console.log("Your Browser is : "+navigator.userAgent);
	console.log("getUserMedia() is supported in your browser");
	console.log("More info about the browser: ");
	console.log(navigator);
	navigator.getUserMedia = navigator.getUserMedia ||
						navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
} else {
	alert('getUserMedia() is not supported in your browser');
}



function successCallback(localMediaStream) {
	console.log("Success Callback method"+ navigator.getUserMedia);
	window.stream = localMediaStream; // stream available to console
	mediaStream = localMediaStream;
	console.log(stream);
	console.log(stream.getVideoTracks());
	// stream.stop();
	// console.log("stream stopped");
	video.src = window.URL.createObjectURL(localMediaStream);
	video.play();			
}

function errorCallback(error){
	console.log("Error Callback method");
	console.log("navigator.getUserMedia error: ", error);

	//video.src = 'fallbackvideo.webm';

}

document.querySelector('img').addEventListener(
		'click', changeFilter, false);
navigator.getUserMedia(constraints, successCallback, errorCallback);

function snapshot() {
	console.log("capturing...");
	// canvas.width = video.videoWidth * scale;
//      	canvas.height = video.videoHeight * scale;
    if (mediaStream) {
  		ctx.drawImage(video, 0, 0);
  		// "image/webp" works in Chrome.
  		// Other browsers will fall back to image/png.
  		console.log(document.querySelector('img'));
  		document.querySelector('img').src = canvas.toDataURL('image/webp');
    }
    console.log("capturing done!!");
}

function changeFilter(e) {
		var el = e.target;
		el.className = '';
	var effect = filters[idx++ % filters.length]; // loop through filters.
		if (effect) {
		el.classList.add(effect);
		}
}


window.AudioContext = window.AudioContext ||
              window.webkitAudioContext;

var context = new AudioContext();

navigator.getUserMedia({audio: true}, function(stream) {
	var microphone = context.createMediaStreamSource(stream);
	var filter = context.createBiquadFilter();
	// microphone -> filter -> destination.
	microphone.connect(filter);
	filter.connect(context.destination);
}, errorCallback);
// Method to set Timers

var countUp, countDown;

// Class created to simplify the date calculation
function Counter(value){
	this.nDays = Math.floor(value / 86400);
	this.nHours = Math.floor((value % 86400) / 3600);
	this.nMins = Math.floor(((value % 86400) % 3600) / 60);
	this.nSecs = ((value % 86400) % 3600) % 60;	
	
	this.getValues = function(){
		return this.nDays +" days "+ this.nHours +" hours "+ this.nMins +" minutes "+ this.nSecs + " seconds";
	};
}

// Method to set the timers according to the given values
function setTimers( )
{
	countTarget = parseInt($('#countVal').val());
    console.log("Counter value: "+countTarget);
    if(!isNaN(countTarget)){
		
    	var counter = new Counter(countTarget);
    	console.log(counter.getValues());

    	// Initialize UI
    	$('#cType1Days').val(0);
    	$('#cType1Hours').val(0);
    	$('#cType1Mins').val(0);
    	$('#cType1Secs').val(0);

    	$('#cType2Days').val(counter.nDays);
    	$('#cType2Hours').val(counter.nHours);
    	$('#cType2Mins').val(counter.nMins);
    	$('#cType2Secs').val(counter.nSecs);

    	// Initialize values
    	countUp = 0;
    	countDown = countTarget;
    	isReadyToGo = true;
    	c1Play = false;
    	c2Play = false;
    }else{
    	alert("Pls enter valid number");
    	isReadyToGo = false;
    	clearTimers();
    }
 }


 // Method to clear Timers
function clearTimers(){
	countTarget = null;

	// Reset UI
	$('#cType1Days').val(0);
	$('#cType1Hours').val(0);
	$('#cType1Mins').val(0);
	$('#cType1Secs').val(0);

    $('#cType2Days').val(0);
	$('#cType2Hours').val(0);
	$('#cType2Mins').val(0);
	$('#cType2Secs').val(0);

	$('#countVal').val("");	
	$('#upCounterMsg').empty();
	$('#downCounterMsg').empty();

	// Clear timers
	if(upCounterID != null)
		clearTimeout(upCounterID);
	if(downCounterID != null)
		clearTimeout(downCounterID);	
	
	// Reset Values
	upCounterID = null;
	downCounterID = null;
	isReadyToGo = false;
	countUp = null;
	countDown = null;
}

// Method to clear the interval: makes call to clearInterval() javascript method
function clearTimeout(ID){
	clearInterval(ID);
}

// Method to increment values of the counter
function incrementValue(){
	if(countUp < countTarget){
		countUp++;
		var temp = new Counter(countUp);
		$('#cType1Days').val(temp.nDays);
    	$('#cType1Hours').val(temp.nHours);
    	$('#cType1Mins').val(temp.nMins);
    	$('#cType1Secs').val(temp.nSecs);
	}
	else{
		console.log("Reached count value");
		$('#upCounterMsg').empty();
		$('#upCounterMsg').html("Reached counter value");
		// Clear the interval
		clearTimeout(upCounterID);
	}
}

// Method to decrement values of the counter
function decrementValue(){
	if(countDown > 0){
		countDown--;
		var temp = new Counter(countDown);
		$('#cType2Days').val(temp.nDays);
    	$('#cType2Hours').val(temp.nHours);
    	$('#cType2Mins').val(temp.nMins);
    	$('#cType2Secs').val(temp.nSecs);
	}
	else{
		console.log("Reached counter value");
		$('#downCounterMsg').empty();
		$('#downCounterMsg').html("Reached counter value");
		// Clear the interval
		clearTimeout(downCounterID);
	}
}

// Method to start the up counting up
function startCountingUp(){
	console.log("startCountingUp entry");
	if(!isReadyToGo){
		alert('No counter value');
		return;
	}
	if(!c1Play){
		c1Play = true;
		$('#upCounterMsg').empty();
		// Call the method for each sec
		upCounterID =  window.setInterval(incrementValue,1000);		
	}else{
		alert('Up counter is already running');
	}
	console.log("startCountingUp exit");
}

// Method to pause the counting up
function pauseCountingUp(){
	console.log("pauseCountingUp entry");
	if(c1Play){
		c1Play = false;
		$('#upCounterMsg').empty();
		$('#upCounterMsg').html("Counter is paused");
		clearTimeout(upCounterID);
	}else{
		alert('Counter up not running');
	}
	console.log("pauseCountingUp exit");
}

// Method to reset the counting up
function resetCountingUp(){
	console.log("resetCountingUp entry");
	if(!isReadyToGo){
		alert('No counter value');
		return;
	}
	// Clear the interval
	clearTimeout(upCounterID);
	// Reset Values
	upCounterID = null;
	countUp = 0;
	c1Play = false;

	// Reset UI
	$('#cType1Days').val(0);
	$('#cType1Hours').val(0);
	$('#cType1Mins').val(0);
	$('#cType1Secs').val(0);

	// Show Msg to User
	$('#upCounterMsg').empty();
	$('#upCounterMsg').html("Counter is reset");
	
	console.log("resetCountingUp exit");
}

// Method to start the counting down
function startCountingDown(){
	console.log("startCountingDown entry");
	if(!isReadyToGo){
		alert('No counter value');
		return;
	}
	if(!c2Play){
		c2Play = true;
		$('#downCounterMsg').empty();
		// Call the method for each sec
		downCounterID = window.setInterval(decrementValue,1000);
	}else{
		alert("Counting Down is already running");
	}
	console.log("startCountingDown exit");
}

// Method to pause the counting down
function pauseCountingDown(){
	console.log("pauseCountingDown entry");
	if(c2Play){
		c2Play = false;
		$('#downCounterMsg').empty();
		$('#downCounterMsg').html("Counter is paused");
		clearTimeout(downCounterID);
	}else{
		alert("Counting down is not running");
	}
	console.log("pauseCountingDown exit");
}

// Method to reset the counting down
function resetCountingDown(){
	console.log("resetCountingDown entry");
	if(!isReadyToGo){
		alert('No counter value');
		return;
	}
	// Clear the interval
	clearTimeout(downCounterID);
	
	// Reset values
	downCounterID = null;
	countDown = countTarget;
	c2Play = false;

	// Reset UI
	var temp = new Counter(countTarget);
	$('#cType2Days').val(temp.nDays);
	$('#cType2Hours').val(temp.nHours);
	$('#cType2Mins').val(temp.nMins);
	$('#cType2Secs').val(temp.nSecs);

	// Show Msg to user
	$('#downCounterMsg').empty();
	$('#downCounterMsg').html("Counter is reset");
	
	
	console.log("resetCountingDown exit");
}
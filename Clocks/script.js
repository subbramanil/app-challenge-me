// Method to set Timers
	function setTimers( )
    {
	    counterVal = parseInt($('#countVal').val());
	    console.log("Counter value: "+counterVal);
	    if(!isNaN(counterVal)){
	    	$('#cType1').html(0);
	    	$('#cType2').html(counterVal);
	    	isReadyToGo = true;
	    }else{
	    	alert("Pls enter valid number");
	    	isReadyToGo = false;
	    }
	 }

	 // Method to clear Timers
	function clearTimers(){
		counterVal = null;
		if(upCounterID!=null)
			clearTimeout(upCounterID);
		if(downCounterID!=null)
			clearTimeout(downCounterID);	
		upCounterID = null;
		downCounterID = null;
		isReadyToGo = false;
		$('#countVal').val("");	
		$('#cType1').html("");
	    $('#cType2').html("");
	    $('#upCounterMsg').empty();
	    $('#downCounterMsg').empty();
	}

	// Method to clear the interval: makes call to clearInterval() javascript method
	function clearTimeout(ID){
		clearInterval(ID);
	}

	// Method to increment values of the counter
	function incrementValue(){
		var val = parseInt($('#cType1').html());
		if(val<counterVal){
			val++;
			$('#cType1').html(val);
		}
		else{
			console.log("Reached count value");
			$('#upCounterMsg').empty();
			$('#upCounterMsg').html("Reached counter value");
			clearTimeout(upCounterID);
		}
	}

	// Method to decrement values of the counter
	function decrementValue(){
		var val = parseInt($('#cType2').html());
		if(val>0){
			val--;
			$('#cType2').html(val);
		}
		else{
			console.log("Reached counter value");
			$('#downCounterMsg').empty();
			$('#downCounterMsg').html("Reached counter value");
			clearTimeout(downCounterID);
		}
	}

	// Method to start the up counting up
	function startCountingUp(){
		console.log("startCountingUp entry");
		if(!isReadyToGo){
			alert('Up Counter is not running');
			return;
		}
		if(!c1Play){
			c1Play = true;
			$('#upCounterMsg').empty();
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
			alert('Counting up is not running');
			return;
		}
		clearTimeout(upCounterID);
		upCounterID = null;
		$('#cType1').html(0);
		$('#upCounterMsg').empty();
		$('#upCounterMsg').html("Counter is reset");
		c1Play = false;
		console.log("resetCountingUp exit");
	}

	// Method to start the counting down
	function startCountingDown(){
		console.log("startCountingDown entry");
		if(!isReadyToGo){
			alert('Counting down is not running');
			return;
		}
		if(!c2Play){
			c2Play = true;
			$('#downCounterMsg').empty();
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
			alert('Counting down is not running');
			return;
		}
		clearTimeout(downCounterID);
		downCounterID = null;
		$('#cType2').html(counterVal);
		$('#downCounterMsg').empty();
		$('#downCounterMsg').html("Counter is reset");
		c2Play = false;
		
		console.log("resetCountingDown exit");
	}
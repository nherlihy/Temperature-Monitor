$(document).ready(function() { 
	var request_key = ""
	$.ajax({
		headers: { 'X-CSRFToken': getCookie('csrftoken')},
	    url: '/ajax/request_key',
	    type: 'GET',
	    success: function(response) {
            if (response.success){
            	request_key = response.data.request_key
            	$("#request_id").append(request_key);
            }
            else{
            	console.log("error");
            }
        }
    });

	$.ajax({
		headers: { 'X-CSRFToken': getCookie('csrftoken')},
	    url: '/ajax/get_devices',
	    type: 'GET',
	    success: function(response) {
            if (response.success){
            	// console.log(response);
            	$.each(response.data.devices, function(key, device){
            		$("#accordion").append('<div class="panel panel-default" id="' + device.id + '"> \
	      										<div class="panel-heading"> \
	        										<div class="row"> \
	          											<h4 class="panel-title"> \
	            											<div class="col-md-12"> \
												              <a data-toggle="collapse" data-parent="#accordion" href="#collapse' + device.id + '">ID: '+ device.id + " | " + device.name +'</a> \
												            </div> \
												          </h4> \
												        </div> \
												      </div> \
												      <div id="collapse' + device.id +'" class="panel-collapse collapse"> \
												        <div class="panel-body"> \
												        	<div class="row"> \
												        		<div class="col-md-6" id="' + device.id + 'date"> \
												        		</div> \
												        		<div class="col-md-6" id="' + device.id + 'temp"> \
												        		</div> \
												        	</div> \
												        </div> \
												      </div> \
													</div> \
            							');
            		if(device.temperatures.length > 0){
            			var labels = []
            			var data = []
            			$.each(device.temperatures, function(key, temp){
            				labels.push(temp.date)
            				data.push(temp.temperature)
            				
            			});

            			$("#" + device.id + "temp").after('<canvas id="chart'+ device.id + '" width="200" height="200"></canvas>');
            			var ctx = $("#chart" + device.id )
            			ctx.before("")
	        				var data = {
							    labels: labels,
							    datasets: [
							        {
							        	label: "Device Temperature", 
							            backgroundColor: [
							                'rgba(255, 99, 132, 0.2)',
							                'rgba(54, 162, 235, 0.2)',
							                'rgba(255, 206, 86, 0.2)',
							                'rgba(75, 192, 192, 0.2)',
							                'rgba(153, 102, 255, 0.2)',
							                'rgba(255, 159, 64, 0.2)'
							            ],
							            borderColor: [
							                'rgba(255,99,132,1)',
							                'rgba(54, 162, 235, 1)',
							                'rgba(255, 206, 86, 1)',
							                'rgba(75, 192, 192, 1)',
							                'rgba(153, 102, 255, 1)',
							                'rgba(255, 159, 64, 1)'
							            ],
							            borderWidth: 1,
							            data: data,
							        }
							    ]
							};

							var myBarChart = new Chart(ctx, {
							    type: 'bar',
							    data: data, 
							    options: {
								    scales: {
								        yAxes: [{
								            ticks: {
								                beginAtZero: true,
								                labelString: 'Temperature'
								            }
								        }],
	        					        xAxes: [{
								            ticks: {
								                labelString: 'Temperature'
								            }
								        }]
								    }
								}
							});
            		}
            		else{
            			console.log($("#request_id"));
        				$("#" + device.id + "date").before('<div class="row"><div class="col-md-12"><center><h4> Send Data to: /' + request_key + "/" + device.id +' </h4></center></div></div>');
            		}

            	})
            }
            else{
            	console.log("error");
            }
        }
    });


    $("body").on("click", "#add_device", function(e){
    	e.preventDefault();
    	$('#add_device_modal').modal('show');
    });

    $("body").on("click", "#add_device_submit", function(e){
    	e.preventDefault();
    	var device_name = $("#device_name").val();

    	$.ajax({
    		headers: { 'X-CSRFToken': getCookie('csrftoken')},
		    url: '/ajax/add_device',
		    type: 'POST',
		    data: {'name': device_name},
		    success: function(response){
		    	if(response.success){
		    		$('#add_device_modal').modal('toggle');
		    	}
		    	else{
		    		$("#device_add_error").empty()
		    		$("#device_add_error").append(response.data.errors);
		    	}
		    }

    	})

    });

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

});
// var baseurl ='http://www.merashealthcare.com/merashealthcare/phase2/merashealthcare/';
// var baseurl ='https://www.private-paediatrician.com/merashealthcare/';
var baseurl ='https://www.private-paediatrician.com/merashealthcare/';

// var baseurl ='http://localhost/meera/phase2/merashealthcare/';

var aid;
var did;

$(document).ready(function()
{
  /*--------------Guardian dashboard view patient details section----------------*/
  
  $('.view_pat').live('click',function()
	{
		$.fancybox.showActivity();
	    var value=$(this).find('input').val();
	    alert(value);
	    $.ajax({
	    	url: baseurl+'inc/view_child_details.php',
	    	type: "post",
	    	data: "pat_id="+encodeURIComponent(value),
	    	success: function(data)
	    	{
	    		$.fancybox.hideActivity();
	    		if(data==='false')
	    		{
	    			alert('Session timed out. Please login');
	    			window.location.href=baseurl+'logout.php';
	    		}
	    		else
	    		{
	    			$('#rec_info').hide();
				alert(data);
	    			$('#child-details').html(data);
	    			$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
	    		}
	    	}
	    });
	});


  /*--------------End view patient details section------------*/
  
  /*--------------Guardian dashboard edit patient details section----------------*/
  
  $('.edit_pat').live('click',function()
	{
		$.fancybox.showActivity();
	    var value=$(this).find('input').val();
	    console.log(value);
	    $.ajax({
	    	url: baseurl+'inc/edit_child_details.php',
	    	type: "post",
	    	data: "pat_id="+encodeURIComponent(value),
	    	success: function(data)
	    	{
	    		$.fancybox.hideActivity();
	    		if(data==='false')
	    		{
	    			alert('Session timed out. Please login');
	    			window.location.href=baseurl+'logout.php';
	    		}
	    		else
	    		{
	    			$('#rec_info').hide();
					//console.log(data);
	    			$('#child-details').html(data);
	    			$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
	    			var guard_no = $( "#guard_no" ).val();
					if(guard_no == 1){
					  $('#guardian2_section').hide();
					  $('.g2_commun').hide();
					  
					}else
					{
					  $('#guardian2_section').show();
					  $('.g2_commun').show();
					  
					}
					$('input[type="file"]').bind( 'change', function() {
						var val = ($(this).val() != "") ? $(this).val() : "Attach a file";
						$(this).closest('.fileuploader').find('.filename').attr('value', val);
					});
					$('input[type="file"]').bind( 'change', function() {
						var val = ($(this).val() != "") ? $(this).val() : "No file selected.";
						$(this).closest('.fileuploader').find('.filename').attr('value', val);
					});
	    			$("#consultationAcc").accordion({
						obj: "div",
						wrapper: "div",
						el: ".h",
						head: "h6",
						next: "div",
						// initShow : "div.outer:first",
						event : "click",
						collapsible : true,
						standardExpansible:true
					});

					$("#consultationReport").accordion({
						obj: "div",
						wrapper: "div",
						el: ".h",
						head: "h6",
						next: "div",
						initShow : "div.outer:first",
						event : "click",
						expandSub : true,
						collapsible : true,
						standardExpansible:true
					});
					$('.date-pick').datePicker({startDate:'01/01/1900',clickInput:false});
					prth_common.init();

					var payment_type=$('input:radio[name="default_radio"]').filter(':checked').val();
					if(payment_type == "self"){
					    
					    $('#insurance_details').hide();					    
					}
					else{
					    
					    $('#insurance_details').show();
					}
	    		}	
	    	}
	    });
	});
  /*--------------End edit patient details section------------*/
	$('#nav-links a').click(function(event)
	{
		var target = $(event.target);
		var li = target.parent();
		li.addClass('active').siblings().removeClass('active');
	});
  
	
	// For edit patient option
	$('.edit_child').click(function(){
	  var id = $(this).attr('id');
	   //alert(id);
		    $.ajax({
		      type: "POST",
		      url: baseurl+"edit_session.php",
		      data: {"edit_child":id},
		      dataType: "json",
		      success: function (data) {
			  console.log(data);
		      }
		  });
	 // alert(id);
	  window.location.href = baseurl+'userdashboard-children-enrol.php?edit_child='+id; // pass pid with url
	  
	 });
	
	
	// Clear pid for new child enrolment
	$("#new_enrol").click(function(){
	  var id = "0";
	   //alert(id);
		    $.ajax({
		      type: "POST",
		      url: baseurl+"edit_session.php",
		      data: {"new_enrol":id},
		      dataType: "json",
		      success: function (data) {
			  console.log(data);
		      }
		  });
	 // alert(id);
	  window.location.href = baseurl+'userdashboard-children-enrol.php'; // redirect to enrolment form
	  
	 });
	
	$('#admin-edit-approve').live('click',function()
	{
		var pat_id=$(this).siblings('input[type="hidden"]').val();
		// console.log(pat_id);
	    var x= confirm('Are you sure you want to approve this patient\'s edits?');
	    if(x)
	    {
	    	$.fancybox.showActivity();
		    $.ajax({
		    	url: baseurl+'doc/approve_edits.php',
		    	type: 'post',
		    	data: "patient_id="+encodeURIComponent(pat_id),
		    	success: function(data)
		    	{
		    		$.fancybox.hideActivity();
		    
		    		if(data==='false')
		    		{
		    			alert('Session timed out. Please log in');
		    			window.location.href=baseurl+'logout.php';
		    		}
		    		else
		    		{
		    			$('#enrol_response').html('<h4> '+data+' </h4>');
		    		}
		    	}
		    });
	    }
	});

	 $('#schedule-appointment').live('click',function()
	{
		var pat_id=$(this).siblings('input[type="hidden"]').val();
		var reason=$('#appointmentReason').val();
		if(reason==='')
		{
			show_message('Please state your reason(s) for rejecting this patient.','fail');
		}
		else
		{
			var x= confirm('Are you sure you want to schedule an appointment for this patient ?');
			if(x)
			{
				$.fancybox.showActivity();
			    $.ajax({
			    	url: baseurl+'doc/schedule_appointment.php',
			    	type: 'post',
			    	data: "patient_id="+encodeURIComponent(pat_id)+"&reason="+reason,
			    	success: function(data)
			    	{
			    		$.fancybox.hideActivity();
			    
			    		if(data==='false')
			    		{
			    			alert('Session timed out. Please log in');
			    			window.location.href=baseurl+'logout.php';
			    		}
			    		else if(data==='invalid')
			    		{
			    			show_message('Please state your reason(s) for scheuling appointment.','fail');
			    		}
			    		else
			    		{
			    		    show_message(data, 'success');
			    		}
			    	}
			    });
			}
		}
	});
	
	
	 // Validate contact format
	
	$('#name').on('keyup',function() { 
	  
			$("#name-error").html("");
			});
	$('#email').keydown(function() { 
			$("#email-error").html("");
			});
	
	$('#mob').keydown(function() { 
			$("#mobile-error").html("");
			});
	$('#subject').keydown(function() { 
			$("#subject-error").html("");
			});
	
	
	function validateEmail()
	      {
	      
		var emailID = document.contact.contact_email.value;
		atpos = emailID.indexOf("@");
		dotpos = emailID.lastIndexOf(".");
		    if (atpos < 1 || ( dotpos - atpos < 2 )) 
		    {
			  $("#email-error").html("Please enter correct email ID");
			document.contact.contact_email.focus() ;
			return false;
		    }
		return( true );
	      }
	


	function validate()
		{
		
		  if( document.contact.contact_name.value == "" )
		      {
			$("#name-error").html("Name cannot be empty");
			  document.contact.contact_name.focus() ;
			return false;
		      }	  
		  
		  if( document.contact.contact_email.value == "" )
		      {
			$("#email-error").html("Email cannot be empty");
			document.contact.contact_email.focus() ;
			return false;
			
			
		      }
   
		if( document.contact.contact_mobile.value == "" )
		      {
			$("#mobile-error").html("Mobile Number cannot be empty");
			document.contact.contact_mobile.focus() ;
			return false;
		      }
		
		if( document.contact.contact_subject.value == "" )
		      {
			$("#subject-error").html("Subject cannot be empty");
			document.contact.contact_subject.focus();
			return false;
		      }
		      
		     return validateEmail();
		
		
	    return( true );
	    
	   
	}
	
	
	
	$( '#contact-form' ).submit( function( e ) {
	  return validate();
	  
	});
	
	

	$('#referral_start_again').on('click',function()
	{
		$('#referrer_type').val('');
		$('#referrer_firstname').val('');
		$('#referrer_lastname').val('');
		$('#referrer_email').val('');
		$('#referrer_phone_1').val('');
		$('#referrer_phone_2').val('');
		$('#referrer_phone_3').val('');
		$('#prof_regis_number').val('');
		$('#patient_firstname').val('');
		$('#patient_lastname').val('');
		$('#patient_dob').val('');
		$('#referral_details').val('');
		$('#guardian_firstname').val('');
		$('#guardian_lastname').val('');
		$('#guardian_phone_number').val('');
	});

	$('#referral-form').on('submit',function()
	{
		var referrer_type=validate_form_field($('#referrer_type'));
		var referrer_firstname=validate_form_field($('#referrer_firstname'));
		var referrer_lastname=validate_form_field($('#referrer_lastname'));
		var referrer_email=validate_form_field($('#referrer_email'));
		var referrer_phone_1=validate_form_field($('#referrer_phone_1'));
		var referrer_phone_2=validate_form_field($('#referrer_phone_2'));
		var referrer_phone_3=validate_form_field($('#referrer_phone_3'));
		var prof_regis_number=validate_form_field($('#prof_regis_number'));
		var patient_firstname=validate_form_field($('#patient_firstname'));
		var patient_lastname=validate_form_field($('#patient_lastname'));
		var patient_dob=validate_form_field($('#patient_dob'));
		var referral_details=validate_form_field($('#referral_details'));
		var guardian_firstname=validate_form_field($('#guardian_firstname'));
		var guardian_lastname=validate_form_field($('#guardian_lastname'));
		var guardian_phone_number=validate_form_field($('#guardian_phone_number'));
		var error=false;
		
		if(!referrer_type)
		{
			$('#referrer_type_error').html('Referrer type cannot be empty');
			error=true;
		}
		else
		{
			$('#referrer_type_error').html('');
		}

		if(!referrer_firstname)
		{
			$('#referrer_firstname_error').html('Referrer firstname cannot be empty');
			error=true;
		}
		else
		{
			$('#referrer_firstname_error').html('');
		}

		if(!referrer_lastname)
		{
			$('#referrer_lastname_error').html('Referrer lastname cannot be empty');
			error=true;
		}
		else
		{
			$('#referrer_lastname_error').html('');
		}

		if(!referrer_email)
		{
			$('#referrer_email_error').html('Referrer email cannot be empty');
			error=true;
		}
		else
		{
			if(!validate_email($('#referrer_email').val()))
			{
				$('#referrer_email_error').html('Referrer email is not valid');
				error=true;
			}
			else
			{
				$('#referrer_email_error').html('');
			}
		}

		if(!referrer_phone_1 || !referrer_phone_2 || !referrer_phone_3)
		{
			$('#referrer_phone_error').html('Phone number is not valid');
			error=true;
		}
		else
		{
			$('#referrer_phone_error').html('');
		}

		if(!prof_regis_number)
		{
			$('#prof_regis_error').html('Professional Registration Number cannot be empty');
			error=true;
		}
		else
		{
			if($('#prof_regis_number').val().length!=12)
			{
				$('#prof_regis_error').html('Invalid professional registration number');
				error=true;
			}
			else
			{
				$('#prof_regis_error').html('');
			}
		}

		if(!patient_firstname)
		{
			$('#patient_firstname_error').html('Patient\'s firstname cannot be empty');
			error=true;
		}
		else
		{
			$('#patient_firstname_error').html('');
		}

		if(!patient_lastname)
		{
			$('#patient_lastname_error').html('Patient\'s lastname cannot be empty');
			error=true;
		}
		else
		{
			$('#patient_lastname_error').html('');
		}

		if(!patient_dob)
		{
			$('#patient_dob_error').html('Patient\'s date of birth cannot be empty');
			error=true;	
		}
		else
		{
			if(!validate_dob($('#patient_dob').val()))
			{
				error=true;
				$('#patient_dob_error').html('Invalid date of birth. Please enter the DOB in the format DD-MM-YYYY');
			}
			else
			{
				$('#patient_dob_error').html('');
			}
		}

		if(!referral_details)
		{
			error=true;
			$('#referral_details_error').html('Please enter the referral details');
		}
		else
		{
			$('#referral_details_error').html('');
		}

		if(!guardian_firstname)
		{
			error=true;
			$('#guardian_firstname_error').html('Guardian\'s firstname cannot be empty');
		}
		else
		{
			$('#guardian_firstname_error').html('');
		}

		if(!guardian_lastname)
		{
			error=true;
			$('#guardian_lastname_error').html('Guardian\'s lastname cannot be empty');
		}
		else
		{
			$('#guardian_lastname_error').html('');
		}

		if(!guardian_phone_number)
		{
			error=true;
			$('#guardian_phone_error').html('Guardian\'s phone number cannot be empty');
		}
		else
		{
			$('#guardian_phone_error').html('');
		}

		if(error)
		{
			return false;
		}
		return true;
	});


	$("#register").on('submit',function()
	{
		$("#errors").html("");
		//var counter = 0;
		var first_name =validate_form_field($("#first_name"));
		var last_name =validate_form_field($("#last_name"));
		var datepicker =validate_form_field($("#datepicker"));
		var address_1 =validate_form_field($("#address_1"));
		var address_2=validate_form_field($("#address_2"));
		var address_3=validate_form_field($("#address_3"));
		var postcode=validate_form_field($("#postcode"));
		var county=$("#county");
		var country=$("#country");
		var email=validate_form_field($("#email"));
		var phone_1=validate_form_field($("#phone_1"));
		var phone_2=validate_form_field($("#phone_2"));
		var phone_3=validate_form_field($("#phone_3"));
		var mob_num_1=validate_form_field($("#mob_num_1"));
		var mob_num_2=validate_form_field($("#mob_num_2"));
		var error=false;
			
		if(!first_name)
		{
			$('#first_name_error').html('First Name cannot be empty');
			error=true;	
		}
		else
		{
			$("#first_name_error").html("");
		}

		if(!last_name)
		{
			error=true;
			$("#family_name_error").html("Lastname / Surname cannot be empty");
		}
		else
		{
			$("#family_name_error").html("");
		}
			
		if(!datepicker)
		{
			$("#datepicker_error").html("Date of birth cannot be empty");
			error=true;
		}
		else
		{
			if(!validate_dob($('#datepicker').val()))
			{
				error=true;
				$('#datepicker_error').html('Invalid DOB. Enter DOB in the format DD/MM/YYYY');
			}	
			else
			{
				$("#datepicker_error").html("");
			}
		}
			
		if(!address_1)
		{
			$("#address_1_error").html("House number and street name cannot be empty");
			error=true;
		}
		else
		{
			$("#address_1_error").html("");
		}

		if(!postcode)
		{
			$("#postcode_error").html("Postcode is required");
			error=true;
		}
		else
		{
			$("#postcode_error").html("");
		}

		if(county.val()=="Please select county")
		{
			county.css("border-color","red");
			error=true
		}
		else
		{
			county.css("border-color","#c5e2ff");
		}

		if(country.val()=="Please select country")
		{
			country.css("border-color","red");
			error=true;
		}
		else
		{
			country.css("border-color","#c5e2ff");
		}

		if(!email)
		{
			$('#email_error').html('Email cannot be empty');
			error=true;
		}
		else
		{
			if(!validate_email($('#email').val()))
			{
				$('#email_error').html('Email is not valid');
				error=true;
			}
			else
			{
				$('#email_error').html('');
			}
		}

		if(!phone_1 || !phone_2 || !phone_3)
		{
			error=true;
			$("#phone_error").html("Invalid phone number");
		}
		else
		{
			$("#phone_error").html("");
		}

		if(!mob_num_1 || !mob_num_2)
		{
			$("#mob_num_error").html("Invalid mobile number");
			error=true;
		}
		else
		{
			$("#mob_num_error").html("");
		}

		if($("#terms").is(":checked")==false)
		{
			$('#terms_error').html('Please accept the terms and conditions');
			error=true;
		}
		else
		{
			$('#terms_error').html('');
		}

		if(error)
		{
			$("#errors").html(" Please correct the fields indicated in RED");
			return false;
		}
		return true;
	});

	$("#start_again").click(function()
	{		 
		$("#first_name").val("");
		$("#last_name").val("");
	 	$("#datepicker").val("");
		$("#address_1").val("");
		$("#address_2").val("");
		$("#address_3").val("");
		$("#postcode").val("");
		$("#county").val("Please select county");
		$("#country").val("Please select country");
		$("#recaptcha_response_field").val("");
		$("#email").val("");
		$("#telephone").val("");
		$("mob_num").val("");
	});

	/********** phase 2 function	***************/

	$('#unregis_request_appointment').live('click',function()
	{
		var user_firstname=$('#unregis_userfirstname').val();
		var user_lastname=$('#unregis_userlastname').val();
		var patient_firstname=$('#unregis_patientfirstname').val();
		var patient_lastname=$('#unregis_patientlastname').val();

		var email=$('#unregistered_email').val();
		var doctor_id=$('#doctor_name_1').val();
		var service=$('#service_type_1').val();
		var location=$('#appointment_location_1').val();
		var start_hour=$('#appointment_starthour_1').val();
		var start_minute=$('#appointment_startminute_1').val();
		var start_zone=$('#start_zone_1').val();
		var end_hour=$('#appointment_endhour_1').val();
		var end_minute=$('#appointment_endminute_1').val();
		var end_zone=$('#end_zone_1').val();
		var additional_details=$('#additional_info_1').val();
		var appointment_date=$('#appointment_date').html();
		var form_submit=true;

		//console.log(end_hour+' '+end_minute);

		if(user_firstname=='')
		{
			$('#unregis_userfirstname_error').html('Guardian firstname cannot be empty');
			form_submit=false;
		}
		else
		{
				$('#unregis_userfirstname_error').html('');
		}

		if(user_lastname=='')
		{
			$('#unregis_userlastname_error').html('Guardian lastname cannot be empty');
			form_submit=false;
		}
		else
		{
				$('#unregis_userlastname_error').html('');
		}

		if(patient_firstname=='')
		{
			$('#patient_firstname_error').html('Patient firstname cannot be empty');
			form_submit=false;
		}
		else
		{
				$('#patient_firstname_error').html('');
		}

		if(patient_lastname=='')
		{
			$('#patient_lastname_error').html('Patient lastname cannot be empty');
			form_submit=false;
		}
		else
		{
				$('#patient_lastname_error').html('');
		}


		if(email=='')
		{
			$('#email_error').html('Email cannot be empty');
			form_submit=false;
		}
		else
		{
				if(validate_email(email))
				{
					$('#email_error').html('');
				}
				else
				{
					$('#email_error').html('Email is not valid');
					form_submit=false;
				}
				
		}

		if(doctor_id=='Select a doctor' || doctor_id=='No doctors are available')
		{
			$('#doctor_error_1').html('Please select a doctor');
			form_submit=false;
		}
		else
		{
			$('#doctor_error_1').html('');
		}

		if(service=='Select a service')
		{
			$('#service_error_1').html('Please select a service');
			form_submit=false;
		}
		else
		{
			$('#service_error_1').html('');
		}
		if(location=='')
		{
			$('#location_error_1').html('Location cannot be empty');
			form_submit=false;
		}
		else
		{
			$('#location_error_1').html('');
		}
		if(start_hour=='hh' || start_minute=='mm')
		{
			$('#starttime_error_1').html('Start time is not valid');
			form_submit=false;
		}
		else
		{
			$('#starttime_error_1').html('');
		}

		if(end_hour=='hh'|| end_minute=='mm')
		{
			$('#endtime_error_1').html('End time is not valid');
			form_submit=false;
		}
		else
		{
			$('#endtime_error_1').html('');
		}

		if(form_submit)
		{

			//console.log("Success");
			
			$.fancybox.showActivity();
			$.ajax({
				url: baseurl+"admin/unregis_appointment_processing.php",
				type:"post",
				data:"username="+user_firstname+" "+user_lastname+"&patient_name="+patient_firstname+" "+patient_lastname+
				"&email="+email+"&doctor="+doctor_id+"&service="+service+"&location="+location+"&appointment_date="+appointment_date+
				"&start_hour="+start_hour+"&start_minute="+start_minute+"&start_zone="+start_zone+"&end_hour="+end_hour+
				"&end_minute="+end_minute+"&end_zone="+end_zone+"&additional_info="+additional_details,
				success:function(data)
				{
					$.fancybox.hideActivity();
					// console.log(data);
					
					if(data==="yes")
					{
						$('#admin-button').css('display','none');
						$('#unregistered_form').html('<h4>The appointment has been created. An email containing the details of the appointment has been send to the user</h4><br/><p class="note-para"><span class="note">NOTE: </span>Please wait,the page will reload automatically</p>');
						setTimeout(function()
						{
							window.location.reload();
						},5000);
					}
					else if(data==='invalid')
					{
						$('#start_time_error_0').html('Invalid start/end time');
						$('#end_time_error_0').html('Invalid start/end time');
					}
					else if(data==='no')
					{
						$('#admin-button').css('display','none');
						$('#unregistered_form').html('<h4>There was some issue in confirming the appointment. Please try again !!</h4>');
					}
					else if(data==='logout')
					{
						$('#admin-button').css('display','none');
						$('#unregistered_form').html('<h4>You don\'t have access to perform this operation.</h4>');
					}
				}
			});
			
		}
	});


	/********** phase 2 function	***************/

	$('#approve_appointment').live('click',function()
	{
		var eventId=$('#eventId').val();
		var x= confirm("Are you sure you want to approve this appointment ?");
		if(x)
		{
			//console.log(eventId);
			$.fancybox.showActivity();
			$.ajax
			({
				url: baseurl+"admin/approve_appointment.php",
				type:"post",
				data:"eventId="+eventId,
				success:function(data)
				{
					//console.log("Success");
					$.fancybox.hideActivity();
					$('#appointment-details').html('<h2>'+data+'</h2><p class="note-para"><span class="note">Note: </span>Please wait,the page will reload automatically</p>');
					setTimeout(function()
					{
						window.location.replace(baseurl+'admin/admin_dashboard.php');
					},5000);
				}
			});
		}
	});

	/********** phase 2 function	***************/

	$('#reject_appointment').live('click',function()
	{
		var eventId=$('#eventId').val();
		var x= confirm("Are you sure you want to reject this appointment ?");
		if(x)
		{
			$.fancybox.showActivity();
			$.ajax
			({
				url: baseurl+"admin/reject_appointment.php",
				type:"post",
				data:"eventId="+eventId,
				success:function(data)
				{
					//console.log("Success");
					$.fancybox.hideActivity();
					$('#appointment-details').html('<h2>'+data+'</h2><p class="note-para"><span class="note">Note: </span>Please wait,the page will reload automatically</p>');
					setTimeout(function()
						{
							window.location.replace(baseurl+'admin/admin_dashboard.php');
						},5000);
				}
			});
		}
	});

	$('#unregistered_user').live('click',function()
	{
		$('#unregistered_user').addClass('current-active');
		$('#unregistered_user').siblings().removeClass('current-active');
		$('#appointment-form').css('display','none');
		$('#unregistered_form').css('display','block');
	});

	$('#registered_user').live('click',function()
	{
		$('#registered_user').addClass('current-active');
		$('#registered_user').siblings().removeClass('current-active');
		$('#unregistered_form').css('display','none');
		$('#appointment-form').css('display','block');
	});





	/***************************************************************************************************************************/


	/********** phase 2 function	***************/

	$('#appointment-link').live('click',function(e)
	{
		e.preventDefault();
		var hidden_appointments=$('#appointment-list li:hidden');
		var h_length=hidden_appointments.length;
		//console.log(h_length);

		for(i=0;i<h_length;i++)
		{
			if(i<3)
			{
				$(hidden_appointments[i]).css('display','block');
			}
			if($('#appointment-list li:hidden').length===0)
			{
				$('#appointment-link').remove();
			}
		}
	});

	/********** phase 2 function	***************/

	//$(".colorbox").colorbox({inline:true, width:"100%"});

	$('.colorbox').live('click',function()
	{
		var id=$(this).next().val();
		//console.log(id);
		$.colorbox(
		{
			ajax: true,
			data: 'id='+encodeURIComponent(id),
			href: baseurl+'inc/appointment_details.php',
			width: "100%",
			height: "auto",
			onComplete: function()
			{
				prth_editor.html();
				enable_appointmentDatepicker();
			}
		});
	});


	/********** phase 2 function	***************/
	/*** Login Validation *****/

	$(".sl_link").click(function(event)
	{
		$('.l_pane').slideToggle('normal').toggleClass('dn');
		$('.sl_link,.lb_ribbon').children('span').toggle();
		event.preventDefault();
	});

	/********** phase 2 function	***************/

	$("#l_form").validate(
	{
		highlight: function(element) {
			$(element).closest('.elVal').addClass("form-field error");
		},
		unhighlight: function(element) {
			$(element).closest('.elVal').removeClass("form-field error");
		},
		rules: {
			ucid: "required",
			password: "required"
		},
		messages: {
			ucid: "Please enter your UCID ",
			password: "Please enter a password "
		},
		errorPlacement: function(error, element) {
			error.appendTo( element.closest(".elVal") );
		}
	});

	/********** phase 2 function	***************/

	$("#rp_form").validate(
	{
		highlight: function(element) {
			$(element).closest('.elVal').addClass("form-field error");
		},
		unhighlight: function(element) {
			$(element).closest('.elVal').removeClass("form-field error");
		},
		rules: {
			username: "required",
			uemail: {
				required: true,
				email: true
			}
		},
		messages: {
			username: "Please enter your UCID ",
			uemail: "Please enter a valid email address"
		},
		errorPlacement: function(error, element) {
			error.appendTo( element.closest(".elVal") );
		}
	});

	/**** End of Login Validation *****/


	/********** phase 2 function	***************/

	$('#password-change').on('click',function()
	{
		var old_password=$('#CurrentPassword').val();
		var new_password=$('#NewPassword').val();
		var new_password_retype=$('#NewPasswordRetype').val();
		var show=true;

		if(old_password==='')
		{
			$('#old-password-error').html('Old Password cannot be empty.');
			show=false;
		}
		else
		{
			$('#old-password-error').html('');
		}
		if(new_password==='')
		{
			$('#new-password-error').html('New Password cannot be empty.');
			show=false;
		}
		else
		{
			$('#new-password-error').html('');
		}

		if(new_password!==new_password_retype)
		{
			$('#new-password-retypeError').html('Password doesn\'t match');
			show=false;
		}
		else
		{
			$('#new-password-retypeError').html('');
		}

		if(show)
		{
			$.fancybox.showActivity();

			var request=$.ajax(
						{
							url 		: baseurl+'inc/change_password.php',
							type 		: 'post',
							data 		: "old_password="+old_password+"&new_password="+new_password+"&new_passwordRetype="+new_password_retype+"&ajax="+true,
							dataType 	: 'json'
						});

			request.done(function(data)
			{
				$.fancybox.hideActivity();
		
				if(data.status==='old_pass_error')
				{
					$('#old-password-error').html(data.message);
				}
				else if(data.status==='new_pass_error')
				{
					$('#new-password-error').html(data.message);
				}
				else if(data.status==='pass_retypeError')
				{
					$('#new-password-retypeError').html(data.message);
				}
				else if(data.status==='error' || data.status==='invalid_data')
				{
					show_message(data.message,'fail');
				}
				else if(data.status==='fail')
				{
					show_message_reload('Session timed out. Please log in to continue.<p> Note: You will be redirected to the login page in <span class="sMsg_countown">6</span> second(s)</p>','fail','logout.php',6);
				}
				else if(data.status==='success')
				{
					show_message(data.message,'success');

					$('#CurrentPassword').val('');
					$('#NewPassword').val('');
					$('#NewPasswordRetype').val('');
				}
			});

			request.fail(function(jqXHR, testStatus,errorThrown)
			{
				$.fancybox.hideActivity();
		    	show_message('An unexpected error occurred while processing your request. Please try again.','fail',6000);
			});
		}
	});

	/********** phase 2 function	***************/

	$('#edit-personal-details').on('click',function()
	{
		$.fancybox.showActivity();
		var address1=$('#userAddress1').val();
		var address2=$('#userAddress2').val();
		var county=$('#userCounty').val();
		var postcode=$('#userPostCode').val();
		var city=$('#userCity').val();
		var country=$('#userCountry').val();
		var email=$('#userEmail').val();
		var skype=$('#userSkype').val();
		var home_tel=$('#userHomeNumber').val();
		var mobile_tel=$('#userMobileNumber').val();
		var work_tel=$('#userWorkNumber').val();

		var request=$.ajax(
					{
						url 		: baseurl+'inc/update_guardian_details.php',
						type 		: "post",
						data 		: "address1="+address1+"&address2="+address2+"&county="+county+"&postcode="+postcode+"&city="+city+
								"&country="+country+"&email="+email+"&skype="+skype+"&home_tel="+encodeURIComponent(home_tel)+"&mobile_tel="+encodeURIComponent(mobile_tel)
								+"&work_tel="+encodeURIComponent(work_tel)+"&ajax="+true,
						dataType 	: 'json'
					});

		request.done(function(data)
		{
			$.fancybox.hideActivity();
			if(data.status==='success')
			{
				show_message(data.message,'success');
			}
			else if(data.status==='error' || data.status==='invalid_data')
			{
				show_message(data.message,'fail',6000);
			}
			else if(data.status==='fail')
			{
				show_message_reload('Session timed out. Please log in to continue.<p> Note: You will be redirected to the login page in <span class="sMsg_countown">6</span> second(s)</p>','fail','logout.php',6);
			}
		});

		request.fail(function(jqXHR, testStatus,errorThrown)
		{
			$.fancybox.hideActivity();
	    	show_message('An unexpected error occurred while processing your request. Please try again.','fail',6000);
		});
	});

	/********** phase 2 function which handles avatar upload 	***************/

	$('.myavatar').on('change',function()
	{
		var val = ($(this).val() !== "") ? $(this).val() : "No file selected.";
		$(this).closest('.fileuploader').find('.filename').attr('value', val);

		var file=$('.myavatar')[0].files[0];
		var form_data=new FormData();
		form_data.append('avatar',file);
		form_data.append('type','avatar');
		form_data.append('ajax',true);
		var submit=true;

		var allowed_extensions=["image/gif", "image/jpeg", "image/jpg", "image/png"];

		if(file.size > 2000000)
		{
			submit=false;
			show_message('You can only upload images which are less than 2 MB.','fail',4000);
		}

		if($.inArray(file.type,allowed_extensions)===-1)
		{
			submit=false;
			show_message('Invalid file type.','fail',4000);
		}

		if(submit)
		{
			$.fancybox.showActivity();
			var request=$.ajax(
			{
				url 		: baseurl+'inc/upload_handler.php',
				type 		: 'post',
				data 		: form_data,
				contentType : false,
				processData : false,
				dataType 	: 'json'
			});

			request.done(function(data)
			{
				console.log(form_data);
				$.fancybox.hideActivity();
				if(data.status==='invalid_data' || data.status==='error')
				{
					show_message(data.message,'fail',6000);
				}
				else if(data.status==='fail')
				{
					show_message_reload('Session timed out. Please log in to continue.<p> Note: You will be redirected to the login page in <span class="sMsg_countown">6</span> second(s)</p>','fail','logout.php',6);
				}
				else if(data.status==='success')
				{
					$('.my_avatar').html('<img src="'+data.detail+'?'+Math.random()+'" alt="" style="max-width:200px;max-height:300px;" />');
					$('.user_avatar').html('<img src="'+data.avatar+'?'+Math.random()+'" alt="" />');
					show_message(data.message,'success',6000);
				}
			});

			request.fail(function(jqXHR, testStatus,errorThrown)
			{
				$.fancybox.hideActivity();
		    	show_message('An unexpected error occurred while processing your request. Please try again.','fail',6000);
			});
		}
	});

	/********** phase 2 function which handles signature upload 	***************/

	$('.mysignature').on('change',function()
	{
		var val = ($(this).val() !== "") ? $(this).val() : "No file selected.";
		$(this).closest('.fileuploader').find('.filename').attr('value', val);

		var file=$('.mysignature')[0].files[0];
		var form_data=new FormData();
		form_data.append('mysignature',file);
		form_data.append('type','signature');
		form_data.append('ajax',true);
		var submit=true;

		var allowed_extensions=["image/gif", "image/jpeg", "image/jpg", "image/png"];

		if(file.size > 2000000)
		{
			submit=false;
			show_message('You can only upload images which are less than 2 MB.','fail',4000);
		}

		if($.inArray(file.type,allowed_extensions)===-1)
		{
			submit=false;
			show_message('Invalid file type.','fail',4000);
		}

		if(submit)
		{
			$.fancybox.showActivity();
			var request=$.ajax(
			{
				url 		: baseurl+'inc/upload_handler.php',
				type 		: 'post',
				data 		: form_data,
				contentType : false,
				processData : false,
				dataType 	: 'json'
			});

			request.done(function(data)
			{
				console.log(form_data);
				$.fancybox.hideActivity();
				if(data.status==='invalid_data' || data.status==='error')
				{
					show_message(data.message,'fail',6000);
				}
				else if(data.status==='fail')
				{
					show_message_reload('Session timed out. Please log in to continue.<p> Note: You will be redirected to the login page in <span class="sMsg_countown">6</span> second(s)</p>','fail','logout.php',6);
				}
				else if(data.status==='success')
				{
					$('.user_signature').html('<img src="'+data.detail+'?'+Math.random()+'" alt="" style="max-width:200px;max-height:100px;" />');
					show_message(data.message,'success',6000);
				}
			});

			request.fail(function(jqXHR, testStatus,errorThrown)
			{
				$.fancybox.hideActivity();
		    	show_message('An unexpected error occurred while processing your request. Please try again.','fail',6000);
			});
		}
	});

	/********** phase 2 function which handles the notification changes	***************/

	$('#notification-changes').on('click',function()
	{
		$.fancybox.showActivity();
		var appointment=$('#appointment-notification').is(":checked");
		var patient_update=$('#patient-update-notification').is(":checked")
		var invoice=$('#invoice-notification').is(":checked");

		var tasks=$('#tasks-notification').is(':checked');
		var enrolment=$('#enrolment-notification').is(':checked');

		var request=$.ajax(
					{
						url 			: baseurl+'inc/update_notifications.php',
						type 			:'post',
						data 			:"appointment="+appointment+"&patient_update="+patient_update+"&invoice="+invoice+"&tasks="+tasks+"&enrolment="+enrolment,
						dataType 		: 'json'
					});

		request.done(function(data)
		{
			$.fancybox.hideActivity();
			if(data.status==='success')
			{
				show_message(data.message,'success',6000)
			}
			else if(data.status==='error')
			{
				show_message(data.message,'fail');
			}
			else if(data.status==='fail')
			{
				show_message_reload('Session timed out. Please log in to continue.<p> Note: You will be redirected to the login page in <span class="sMsg_countown">6</span> second(s)</p>','fail','logout.php',6);
			}
		});

		request.fail(function(jqXHR, testStatus,errorThrown)
		{
			$.fancybox.hideActivity();
	    	show_message('An unexpected error occurred while processing your request. Please try again.','fail',6000);
		});
	});

	/********** phase 2 function	***************/

	$('.view_child').live('click',function()
	{
		$.fancybox.showActivity();
	    var value=$(this).find('input').val();
	    
	    $.ajax({
	    	url: baseurl+'inc/patient_details.php',
	    	type: "post",
	    	data: "pat_id="+encodeURIComponent(value),
	    	success: function(data)
	    	{
	    		$.fancybox.hideActivity();
	    		if(data==='false')
	    		{
	    			alert('Session timed out. Please login');
	    			window.location.href=baseurl+'logout.php';
	    		}
	    		else
	    		{
	    			$('#rec_info').hide();
	    			$('#child-details').show();
	    			$('#child-details').html(data);
	    			$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
	    			prth_textarea_auto.init();
	    		}
	    	}
	    });
	});

	$('#doctor-enrol-approve').live('click',function()
	{
	    var pat_id=$(this).siblings('input[type="hidden"]').val();
	    var x= confirm('Are you sure you want to approve this patient ?');
	    if(x)
	    {
	    	$.fancybox.showActivity();
		    $.ajax({
		    	url: baseurl+'internalUser/approve_enrolment.php',
		    	type: 'post',
		    	data: "patient_id="+encodeURIComponent(pat_id),
		    	success: function(data)
		    	{
		    		$.fancybox.hideActivity();
		    
		    		if(data==='false')
		    		{
		    			alert('Session timed out. Please log in');
		    			window.location.href=baseurl+'logout.php';
		    		}
		    		else
		    		{
		    			$('#enrol_response').html('<h4> '+data+' </h4>');
		    		}
		    	}
		    });
	    }   
	});

	$('#doctor-enrol-reject').live('click',function()
	{
		var pat_id=$(this).siblings('input[type="hidden"]').val();
		var reason=$('#rejectReason').val();
		if(reason==='')
		{
			show_message('Please state your reason(s) for rejecting this patient.','fail');
		}
		else
		{
			var x= confirm('Are you sure you want to reject this patient ?');
			if(x)
			{
				$.fancybox.showActivity();
			    $.ajax({
			    	url: baseurl+'internalUser/reject_enrolment.php',
			    	type: 'post',
			    	data: "patient_id="+encodeURIComponent(pat_id)+"&reason="+reason,
			    	success: function(data)
			    	{
			    		$.fancybox.hideActivity();
			    
			    		if(data==='false')
			    		{
			    			alert('Session timed out. Please log in');
			    			window.location.href=baseurl+'logout.php';
			    		}
			    		else if(data==='invalid')
			    		{
			    			show_message('Please state your reason(s) for rejecting this patient.','fail');
			    		}
			    		else
			    		{
			    			$('#enrol_response').html('<h4> '+data+' </h4>');
			    		}
			    	}
			    });
			}
		}
	});

	$('#child-details').on('click','#admin-enrol-approve',function()
	{
		var pat_id=$('#admin-enrol-approve').siblings('input[type="hidden"]').val();
		// console.log(pat_id);
	    var x= confirm('Are you sure you want to approve this patient ?');
	    if(x)
	    {
	    	$.fancybox.showActivity();
		    $.ajax({
		    	url 		: baseurl+'admin/approve_enrolment.php',
		    	type 		: 'post',
		    	data 		: "patient_id="+encodeURIComponent(pat_id),
		    	dataType 	: 'json',
		    	success 	: function(data)
		    	{
		    		$.fancybox.hideActivity();
		    
		    		if(data.status==='false')
		    		{
		    			alert('Session timed out. Please log in');
		    			window.location.href=baseurl+'logout.php';
		    		}
		    		else if(data.status==='error')
		    		{
		    			show_message('<h5>'+data.message+'</h5>','fail');
		    		}
		    		else if(data.status==='success')
		    		{
		    			show_message('<h5> '+data.message+' </h5>'+' Note: Please wait, the page will refresh automatically in a few second(s)','success',4000);
		    			setTimeout(function()
		    			{
		    				$.fancybox.showActivity();
		    				$('.content_list').load(baseurl+'admin/dashboard.php .content_list',function()
		    				{
		    					$('#rec_info').show();
	    						$('#child-details').hide();
		    					$.fancybox.hideActivity();
		    				});
		    			}, 1000);
		    		}
		    	}
		    });
	    }
	});

	$('#child-details').on('click','#admin-enrol-reject',function()
	{
		var pat_id=$('#admin-enrol-reject').siblings('input[type="hidden"]').val();
		var reason=$('#rejectReason').val();
		if(reason==='')
		{
			show_message('Please state your reason(s) for rejecting this patient.','fail');
		}
		else
		{
			var x= confirm('Are you sure you want to reject this patient ?');
			if(x)
			{
				$.fancybox.showActivity();
			    $.ajax({
			    	url 		: baseurl+'admin/reject_enrolment.php',
			    	type 		: 'post',
			    	data 		: "patient_id="+encodeURIComponent(pat_id)+"&reason="+reason,
			    	dataType 	: 'json',
			    	success 	: function(data)
			    	{
			    		$.fancybox.hideActivity();
			    
			    		if(data.status==='false')
			    		{
			    			alert('Session timed out. Please log in');
			    			window.location.href=baseurl+'logout.php';
			    		}
			    		else if(data.status==='error')
			    		{
			    			show_message(data.message,'fail');
			    		}
			    		else if(data.status==='success')
			    		{
			    			show_message('<h5> '+data.message+' </h5> Note: Please wait, the page will refresh automatically in a few second(s)','success',4000);
			    			setTimeout(function()
			    			{
			    				$.fancybox.showActivity();
			    				$('.content_list').load(baseurl+'admin/dashboard.php .content_list',function()
			    				{
			    					$('#rec_info').show();
	    							$('#child-details').hide();
			    					$.fancybox.hideActivity();
			    				});
			    			}, 1000);
			    		}
			    	}
			    });
			}
		}
	});
	
	$('#calendar').fullCalendar(
	{
		header:
		{
			left:'title',
			center:'today,prev,next',
			right:'month,agendaWeek,agendaDay',	
		},
		
		defaultView: 'month',
		editable: true,
		eventLimit: true,
		fixedWeekCount:false,
		firstDay:1,
		events:{
			url: baseurl+'inc/appointments.php',
			error: function()
			{
				console.log('Error is displaying the appointments');
			}
		},
		loading: function(bool) 
		{
			if(bool)
			{
				//console.log('Running showActivity');
				$.fancybox.showActivity();
			}
			else
			{
				//console.log('Running hideActivity');
				$.fancybox.hideActivity();
			}
		},
		dayClick: function(date,jsEvent,view)
		{
			// console.log(date);
			// console.log(date.format());
			// console.log(date.format('DD/MM/YYYY'));
			var full_date=new Date();
			var day=full_date.getDate();
			day=(day<10) ? '0'+day : day;
			var month=full_date.getMonth()+1;
			month= (month<10) ? '0'+month : month;
			var current_date= day+'/'+month+'/'+full_date.getFullYear();
			var current_moment=moment(full_date);

			// console.log(date);
			// console.log(current_moment);


			var data={
						date:date.format('DD/MM/YYYY')
					};

			// console.log(data.date);
			// console.log(current_date);

			if(data.date === current_date)	// Check whether the guardian is trying to request an appointment for the current day.
			{
				$.colorbox({
					width: "100%",
					html : '<h4>You cannot make an appointment request for the current day using the calendar feature. For that, Please call us so that we can fix an appointment for you.</h4>'
				});
			}
			else if(moment(date).isBefore(current_moment))	// Check whether the guardian have selected a date in the past.
			{
				$.colorbox({
					width: "100%",
					html : '<h4>Please select a valid date to make an appointment request</h4>'
				});
			}
			else
			{
				$.colorbox({
					ajax: true,
					data: data,
					href: baseurl+'inc/appointment_form.php',
					width: "100%",
					onComplete: function()
					{
						prth_editor.html();
						enable_appointmentDatepicker();
					}
		    	});
			}
		    return false;
		},
		eventClick: function(event, jsEvent, view)
		{
			var data={
						event_id:event.id
					};
			$.colorbox({
				ajax: true,
				data: data,
				href: baseurl+'inc/appointment_details.php',
				width: "100%",
				onComplete: function()
				{
					prth_editor.html();
					enable_appointmentDatepicker();
				}
			});
		}
	});

	$('#admin-calendar').fullCalendar(
	{
		header:
		{
			left:'title',
			center:'today,prev,next',
			right:'month,agendaWeek,agendaDay',	
		},
		
		defaultView: 'month',
		editable: true,
		eventLimit: true,
		fixedWeekCount:false,
		firstDay:1,
		events:{
			url: baseurl+'inc/appointments.php',
			error: function()
			{
				console.log('Error is displaying the appointments');
			}
		},
		loading: function(bool) 
		{
			if(bool)
			{
				//console.log('Running showActivity');
				$.fancybox.showActivity();
			}
			else
			{
				//console.log('Running hideActivity');
				$.fancybox.hideActivity();
			}
		},
		dayClick: function(date,jsEvent,view)
		{
			//console.log(date.format());
			var data={
						date:date.format('DD/MM/YYYY')
					};
			$.colorbox({
				ajax: true,
				data: data,
				href: baseurl+'inc/appointment_form.php',
				width: "100%",
				onComplete: function()
				{
					prth_editor.html();
					enable_appointmentDatepicker();
				}
		    });
		    return false;
		},
		eventClick: function(event, jsEvent, view)
		{
			var data={
						event_id:event.id
					};
			$.colorbox({
				ajax: true,
				data: data,
				href: baseurl+'inc/appointment_details.php',
				width: "100%",
				onComplete: function()
				{
					prth_editor.html();
					enable_appointmentDatepicker();
				}
			});
		}
	});

	/******************************* 

	Script to send an reschedule request by admin, to a guardian, if the doctor is unavailable at the requested time interval   

	*********************************/ 

	$('#colorbox').on('click','#admin-app-sendRequest',function(e)
	{
		e.preventDefault();
		console.log('Send request clicked by admin');
	});

	/******************************* 

	Script to cancel an appointment by admin  

	*********************************/ 

	$('#colorbox').on('click','#admin-app-cancelRequest',function(e)
	{
		e.preventDefault();
		console.log('Cancel request clicked by admin');
	});

	/******************************* 

	Script for admin to approve an appointment request made by an user  

	*********************************/ 

	$('#colorbox').on('click','#admin-app-approveAppointment',function(e)
	{
		e.preventDefault();
		var app_id=$('#app_detail_id').val();
		var appds=$('#appds').val();
		// console.log('Admin have approved the appointment');
		console.log(encodeURIComponent(app_id));

		$.fancybox.showActivity();
		$.ajax({
			url 		: baseurl+'admin/approve_appointment.php',
			type 		: 'post',
			data 		: 'app_id='+encodeURIComponent(app_id)+'&appds='+appds,
			dataType	: 'json',
			error 		: function(jhr)
			{
				$.fancybox.hideActivity();
				$.colorbox.close();
				show_message('An unexpected error occurred while processing your request. Please try again.','fail',6000);
			},
			success 	: function(data)
			{
				$.fancybox.hideActivity();
				console.log(data);

				$.colorbox.close();
				if(data.status==='error')
				{
					show_message(data.message,'fail',6000);
				}
				else if(data.status==='success')
				{
					show_message_reload(data.message+' Please wait the page will reload in <span class="sMsg_countown">8</span> second(s)','success','admin/admin_dashboard.php',8);
				}
			}
		});
	});

	/********** phase 2 function	***************/

	$('#colorbox').on('focus','#app-form-appointmentTime',function()
	{
		var professional=$('#app-request-professionalList').val();
		var date=$('#appointment-requestDate').val();

		//check whether the date is provided and  valid
		if(date==='' || !check_date(date))
		{
			$('#app-form-appointmentTime').html('<option>Select Appointment time');
			display_appointment_dateError();
		}
		else
		{
			if($('#app-form-appointmentTime').val()!=='Select Appointment time')
			{
				$('#app-request-dateError').html('').css('display','none');
			}
			display_errors();
		}

		if(professional==='Select a Professional')
		{
			$('#app-form-appointmentTime').html('<option>Select Appointment time');
			display_appointment_timeError();
		}
		else
		{
			$('#app-request-professionalError').html('').css('display','none');
			display_errors();
		}
	});

	/********** phase 2 function	***************/

	$('#colorbox').on('change','#app-request-professionalList',function()
	{
		display_timeInterval();
	});

	/********************************** 
		Phase 2 function
		Script to change the location and time details according to the change in service type.

	***********************************/

	$('#colorbox').on('change','#app-requested-service',function()
	{
		get_contact_details();
	});

	/********** phase 2 function	***************/

	$('#colorbox').on('focus','#app-request-contactDetails',function()
	{
		var service=$('#app-requested-service').val();
		if(service==='Select Service Type')
		{
			display_appointment_serviceError();	//function to display the 'service type not selected' error
		}
		else
		{
			contact_details=$('#app-request-contactDetails').val().trim();
			if(contact_details !=='' && contact_details!=='Select Location/Contact Details')
			{
				//Service type is selected, so clear out the service type error and hide it.
				$('#app-requested-serviceError').html('').css('display','none');
			}
			display_errors();	//function which checks whether there are other errors displayed
		}

	});

	/**************

	Phase 2 function to dynamically obtain the contact details if there is a change in the patient being selected.

	**************/

	$('#colorbox').on('change','#internalUser_patientInfo',function()
	{
		get_contact_details();
	});

	/********** phase 2 function	***************/

	$('#colorbox').on('click','#appointment-sendRequest',function()
	{
		var x= confirm('Are you sure you want to send this request ?');
		if(x===true)
		{
			var patient=$('#appointment-forPatient').val().trim();
			var service_type=$('#app-requested-service').val().trim();
			var appointment_date=$('#appointment-requestDate').val().trim();
			var professional=$('#app-request-professionalList').val().trim();
			var contact_details=$('#app-request-contactDetails').val().trim();
			var appointment_time=$('#app-form-appointmentTime').val().trim();
			var appointment_info=$('#appointment-requestInfo').val().trim();

			var submit=true;

			if(typeof patient==='undefined' || patient==='')
			{
				submit=false;
				$('#appointment-request-errors').css('display','block');
				$('#app-request-patientError').html('Please select a patient').css('display','block');
			}
			else
			{
				$('#app-request-patientError').html('').css('display','none');
				display_errors();
			}

			if(typeof service_type==='undefined' || service_type==='Select Service Type' || service_type==='')
			{
				submit=false;
				display_appointment_serviceError();
			}
			else
			{
				$('#app-requested-serviceError').html('').css('display','none');
				display_errors();
			}

			if(typeof appointment_date==='undefined' || appointment_date==='' || !check_date(appointment_date))
			{
				submit=false;
				display_appointment_dateError();
			}
			else
			{
				$('#app-request-dateError').html('').css('display','none');
				display_errors();
			}

			if(typeof professional==='undefined' || professional==='Select a Professional' || professional==='')
			{
				submit=false;
				display_appointment_professionalError();		
			}
			else
			{
				$('#app-request-professionalError').html('').css('display','none');
				display_errors();
			}

			if(typeof contact_details==='undefined' || contact_details==='Select Location/Contact Details' || contact_details==='')
			{
				submit=false;
				$('#appointment-request-errors').css('display','block');
				$('#app-request-contactError').html('Please select your location/contact details').css('display','block');
			}
			else
			{
				$('#app-request-contactError').html('').css('display','none');
				display_errors();
			}

			if(typeof appointment_time==='undefined' || appointment_time==='Select Appointment time' || appointment_time==='')
			{
				submit=false;
				$('#appointment-request-errors').css('display','block');
				$('#app-requested-timeError').html('Please select a time slot').css('display','block');
			}
			else
			{
				$('#app-requested-timeError').html('').css('display','none');
				display_errors();
			}

			if(submit===true)
			{
				$.fancybox.showActivity();

				var checkData='ajax='+true+'&selected_time='+appointment_time+'&professional_id='+professional+'&appointment_date='+appointment_date;
				var sendData= "patient="+patient+"&service_type="+service_type+"&appointment_date="
							+appointment_date+"&professional="+professional+"&contact_details="+contact_details+
							"&appointment_time="+appointment_time+"&appointment_info="+appointment_info+"&ajax="+true;
				perform_appointment_request(checkData,sendData,'appointment');
			}
		}
	});

	/********** phase 2 function to send a reschedule appointment request from guardian calendar  ***************/

	$('#colorbox').on('click','#app-request-reschedule',function() 
	{
		var x= confirm('Are you sure you want to reschedule this appointment ?');
		if(x===true)
		{
			var submit=true;

			var service_type=$('#app-requested-service').val().trim();
			var appointment_date=$('#appointment-requestDate').val().trim();
			var professional=$('#app-request-professionalList').val().trim();
			var contact_details=$('#app-request-contactDetails').val().trim();
			var appointment_time=$('#app-form-appointmentTime').val().trim();
			var appointment_info=$('#appointment-requestInfo').val().trim();
			var app_id=$('#app_detail_id').val().trim();
			var appds=$('#appds').val().trim();

			if(typeof service_type==='undefined' || service_type==='Select Service Type' || service_type==='')
			{
				submit=false;
				display_appointment_serviceError();
			}
			else
			{
				$('#app-requested-serviceError').html('').css('display','none');
				display_errors();
			}

			if(typeof appointment_date==='undefined' || appointment_date==='' || !check_date(appointment_date))
			{
				submit=false;
				display_appointment_dateError();
			}
			else
			{
				$('#app-request-dateError').html('').css('display','none');
				display_errors();
			}

			if(typeof professional==='undefined' || professional==='Select a Professional' || professional==='')
			{
				submit=false;
				display_appointment_professionalError();		
			}
			else
			{
				$('#app-request-professionalError').html('').css('display','none');
				display_errors();
			}

			if(typeof contact_details==='undefined' || contact_details==='Select Location/Contact Details' || contact_details==='')
			{
				submit=false;
				$('#appointment-request-errors').css('display','block');
				$('#app-request-contactError').html('Please select your location/contact details').css('display','block');
			}
			else
			{
				$('#app-request-contactError').html('').css('display','none');
				display_errors();
			}

			if(typeof appointment_time==='undefined' || appointment_time==='Select Appointment time' || appointment_time==='')
			{
				submit=false;
				$('#appointment-request-errors').css('display','block');
				$('#app-requested-timeError').html('Please select a time slot').css('display','block')
			}
			else
			{
				$('#app-requested-timeError').html('').css('display','none');
				display_errors();
			}

			if(typeof app_id==='undefined' || typeof appds==='undefined' || app_id==='' || appds==='')
			{
				submit=false;
			}

			if(submit===true)
			{
				$.fancybox.showActivity();

				var checkData='ajax='+true+'&selected_time='+appointment_time+'&professional_id='+professional+'&appointment_date='+appointment_date;
				var sendData= "app_id="+encodeURIComponent(app_id)+"&appds="+appds+"&service_type="+service_type+"&appointment_date="
							+appointment_date+"&professional="+professional+"&contact_details="+contact_details+
							"&appointment_time="+appointment_time+"&appointment_info="+appointment_info+"&ajax="+true;

				perform_appointment_request(checkData,sendData,'reschedule');
			}
		}
	});

	/********** phase 2 function	***************/

	$('#colorbox').on('click','#appointment-requestCancel',function()
	{
		$.colorbox.close();
	});

	/********** phase 2 function	***************/

	$('#colorbox').on('click','#app-request-cancel',function()
	{
		// On success add this line to refresh the contents of the calendar without reloading. But we need to come out with a plan
		// to find out which sections's calendar has be refreshed.
		//$('#doctor-calendar').fullCalendar( 'refetchEvents');

		var x=confirm('Are you sure you want to cancel this appointment ?');
		if(x===true)
		{
			var app_id=$('#app_detail_id').val().trim();
			var appds=$('#appds').val().trim();

			$.fancybox.showActivity();
			$.ajax(
			{
				url 		: baseurl+'inc/cancel_appointment.php',
				type 		: "post",
				data 		: 'app_id='+encodeURIComponent(app_id)+'&appds='+appds+'&ajax='+true,
				dataType 	: 'json',
				error : function(jhr)
		    	{
		    		$.fancybox.hideActivity();
		    		closeColorbox_and_dispMsg();
		    	},
				success 	: function(data)
				{
					$.fancybox.hideActivity();
					switch(data.status)
					{
						case 'error':
							$.colorbox.close();
							show_message(data.message,'fail',6000);
							break;
						case 'invalid_id':
							$('#appointment-request-errors').css('display','block');
							$('#app-request-patientError').html('Invalid appointment selected.Please try again').css('display','block');
							break;
						case 'false':
							alert('Session timed out');
							window.location.href=baseurl+'logout.php';
							break;
						case 'success':
							console.log('success');
							$.colorbox.close();
							show_message('<h4>'+data.message+'</h4> Please wait, you calendar will refresh automatically.','success',6000);

							if(data.detail==='my_appointments.php')
							{
								$('#calendar').fullCalendar( 'refetchEvents');
							}
							else if(data.detail==='admin/admin_dashboard.php')
							{
								$('#admin-calendar').fullCalendar( 'refetchEvents');
							}
							else if(data.detail==='internalUser/appointments.php')
							{
								$('#doctor-calendar').fullCalendar( 'refetchEvents');
							}
							break;
						case 'invalid_query':
							$('#appointment-request-errors').css('display','block');
							$('#app-request-patientError').html('There have been some issues in our server.Please try again').css('display','block');
							break;
						default :
							$.fancybox.hideActivity();
		    				closeColorbox_and_dispMsg();
		    				break;
					}
				}
			});
		}
	});

	$('#colorbox').on('click','#accept_newAppointment_proposal',function()
	{
		var x=confirm('Are you sure you want to accept this request ?');
		if(x===true)
		{
			var app_id=$('#app_detail_id').val().trim();
			var appds=$('#appds').val().trim();

			var checkData="app_id="+encodeURIComponent(app_id)+"&appds="+appds+"&ajax="+true;

			$.fancybox.showActivity();
			perform_appointment_request(checkData,checkData,'approve');
		}
	});


	$('#doctor-calendar').fullCalendar(
	{
		header:
		{
			left:'title',
			center:'today,prev,next',
			right:'month,agendaWeek,agendaDay',	
		},
		
		defaultView: 'month',
		editable: true,
		eventLimit: true,
		fixedWeekCount:false,
		firstDay:1,
		events:{
			url: baseurl+'inc/appointments.php',
			error: function()
			{
				console.log('Error is displaying the appointments');
			}
		},
		loading: function(bool) 
		{
			if(bool)
			{
				//console.log('Running showActivity');
				$.fancybox.showActivity();
			}
			else
			{
				//console.log('Running hideActivity');
				$.fancybox.hideActivity();
			}
		},
		dayClick: function(date,jsEvent,view)
		{
			var data={
						date:date.format('DD/MM/YYYY')
					};
			$.colorbox({
				ajax: true,
				data: data,
				href: baseurl+'inc/appointment_form.php',
				width: "100%",
				onComplete: function()
				{
					prth_editor.html();
					enable_appointmentDatepicker();
				}
		    });
		    return false;
		},
		eventClick: function(event, jsEvent, view)
		{
			var data={
						event_id: event.id
					};
			$.colorbox({
				ajax: true,
				data: data,
				href: baseurl+'inc/appointment_details.php',
				width: "100%",
				onComplete: function()
				{
					prth_editor.html();
					enable_appointmentDatepicker();
				}
			});
		}
	});

	// $('#colorbox').on('change','.doctor-appointment-time',function()
	// {
	// 	var selected_time=$('#app-form-appointmentTime').val().trim();
	// 	var professional=$('#app-request-professionalList').val().trim();
	// 	var appointment_date= $('#appointment-requestDate').val().trim();

	// 	$.fancybox.showActivity();
	// 	$.ajax({
	// 		url 		: baseurl+'inc/check_appointment_time.php',
	// 		type 		: 'post',
	// 		data 		: 'ajax='+true+'&selected_time='+selected_time+'&professional_id='+professional+'&appointment_date='+appointment_date,
	// 		dataType 	: 'json',
	// 		error 		: function(jhr,status,errorThrown)
	//     	{
	//     		$.fancybox.hideActivity();
	//     		$('#appointment-request-errors').css('display','block');
	// 			$('#app-requested-timeError').html('An unexpected error occurred. Please try again.').css('display','block')
	//     	},
	//     	success 	: function(data)
	//     	{
	//     		$.fancybox.hideActivity();
	//     		if(data.status==='exists')
	//     		{
	//     			var x=confirm('The doctor has other appointment at this time interval. Do you still want to continue with this time ?');
	//     			if(x===false)
	//     			{
	//     				$('#app-form-appointmentTime').html('<option>Select Appointment time');
	//     				$('#app-request-professionalList').val('Select a Professional');
	//     			}  
	    				 
	//     		}
	//     		else if(data.status==='error')
 //    			{
 //    				$('#appointment-request-errors').css('display','block');
	// 				$('#app-requested-timeError').html(data.message).css('display','block');
 //    			}
 //    			else if(data.status==='success')
 //    			{
 //    				$('#app-requested-timeError').html('').css('display','none');
	// 				display_errors();
 //    			}
	//     	}
	// 	});
	// });

	$('#colorbox').on('click','#internalUser-appointmentRequest',function()
	{
		// console.log('Hai');

		var patient=$('#internalUser_patientInfo').val().trim();
		var service_type=$('#app-requested-service').val().trim();
		var appointment_date=$('#appointment-requestDate').val().trim();
		var professional=$('#app-request-professionalList').val().trim();
		var contact_details=$('#app-request-contactDetails').val().trim();
		var appointment_time=$('#app-form-appointmentTime').val().trim();
		var appointment_info=$('#appointment-requestInfo').val().trim();

		var submit=true;

		if(typeof patient==='undefined' || patient==='')
		{
			submit=false;
			$('#appointment-request-errors').css('display','block');
			$('#app-request-patientError').html('Please select a patient').css('display','block');
		}
		else
		{
			$('#app-request-patientError').html('').css('display','none');
			display_errors();
		}

		if(typeof service_type==='undefined' || service_type==='Select Service Type' || service_type==='')
		{
			submit=false;
			display_appointment_serviceError();
		}
		else
		{
			$('#app-requested-serviceError').html('').css('display','none');
			display_errors();
		}

		if(typeof appointment_date==='undefined' || appointment_date==='' || !check_date(appointment_date))
		{
			submit=false;
			display_appointment_dateError();
		}
		else
		{
			$('#app-request-dateError').html('').css('display','none');
			display_errors();
		}

		if(typeof professional==='undefined' || professional==='Select a Professional' || professional==='')
		{
			submit=false;
			display_appointment_professionalError();		
		}
		else
		{
			$('#app-request-professionalError').html('').css('display','none');
			display_errors();
		}

		if(typeof contact_details==='undefined' || contact_details==='Select Location/Contact Details' || contact_details==='')
		{
			submit=false;
			$('#appointment-request-errors').css('display','block');
			$('#app-request-contactError').html('Please select your location/contact details').css('display','block');
		}
		else
		{
			$('#app-request-contactError').html('').css('display','none');
			display_errors();
		}

		if(typeof appointment_time==='undefined' || appointment_time==='Select Appointment time' || appointment_time==='')
		{
			submit=false;
			$('#appointment-request-errors').css('display','block');
			$('#app-requested-timeError').html('Please select a time slot').css('display','block')
		}
		else
		{
			$('#app-requested-timeError').html('').css('display','none');
			display_errors();
		}

		if(submit===true)
		{
			$.fancybox.showActivity();
			var checkData='ajax='+true+'&selected_time='+appointment_time+'&professional_id='+professional+'&appointment_date='+appointment_date;
			var sendData= "patient="+patient+"&service_type="+service_type+"&appointment_date="
						+appointment_date+"&professional="+professional+"&contact_details="+contact_details+
						"&appointment_time="+appointment_time+"&appointment_info="+appointment_info+"&ajax="+true;
			perform_appointment_request(checkData,sendData,'appointment');
		}
	});

	$('#insuranceNumber').live('keyup',function()
	{
		removeErrorFocus('insuranceNumber');
	});
	$('#nameOnInsurance').live('keyup',function()
	{
		removeErrorFocus('nameOnInsurance');
	});

	$('#dobInsurance').live('blur',function()
	{
		removeErrorFocus('dobInsurance');
	});

	$("#consultationAcc").accordion(
	{
		obj: "div",
		wrapper: "div",
		el: ".h",
		head: "h6",
		next: "div",
		// initShow : "div.outer:first",
		event : "click",
		collapsible : true,
		standardExpansible:true
	});


	$('#patients').on('click','.view_patient',function(e)
	{
		e.preventDefault();

		var app_id=$(this).find('input[name="app_id"]').val();
		var apds=$(this).find('input[name="apds"]').val();

		$.fancybox.showActivity();
	    
	    $.ajax({
	    	url 		: baseurl+'internalUser/view_or_edit_child.php',
	    	type 		: "post",
	    	data 		: "app_id="+encodeURIComponent(app_id)+"&apds="+apds+"&ajax="+true,
	    	dataType 	: 'json',
	    	error 		: function(jhr,status,errorThrown)
	    	{
	    		$.fancybox.hideActivity();
	    		show_message('Some unexpected errors occured while accessing the patient details.','fail');
	    	},
	    	success 	: function(data)
	    	{
	    		$.fancybox.hideActivity();
	    		if(data.status==='false')
	    		{
	    			alert(data.message);
	    			window.location.href=baseurl+'logout.php';
	    		}
	    		else if(data.status==='invalid_user')
	    		{
	    			alert(data.message);
	    			window.location.href=baseurl+'logout.php';
	    		}
	    		else if(data.status==='error')
	    		{
	    			show_message(data.message,'fail');
	    		}
	    		else if(data.status==='success')
	    		{
	    			$('#rec_info').hide();
	    			$('.child-record').html(data.detail).show();
	    			$("#consultationAcc").accordion({
						obj: "div",
						wrapper: "div",
						el: ".h",
						head: "h6",
						next: "div",
						// initShow : "div.outer:first",
						event : "click",
						collapsible : true,
						standardExpansible:true
					});

					$("#consultationReport").accordion({
						obj: "div",
						wrapper: "div",
						el: ".h",
						head: "h6",
						next: "div",
						initShow : "div.outer:first",
						event : "click",
						expandSub : true,
						collapsible : true,
						standardExpansible:true
					});

					$('.date-pick').datePicker({startDate:'01/01/1900',clickInput:false});
					prth_common.init();
					$(".iframe").colorbox({iframe:true, width:"100%", height:"100%"});
					$(".inline").colorbox({inline:true, width:"100%"});
					prth_editor.html();
					// prth_textarea_auto.init();
					attach_file_names();
	    		}
	    	}
	    });
	});


	/************		code to insert the filename and also to validate the file Upload 	**************/

	$('.child-record').on('change','.consultation_files',function()
	{
		var val = $(this).val();

		if(val!=='')
		{
			$(this).closest('.fileuploader').find('.filename').attr('value', val);
			!check_file_type(val.toLowerCase()) ? show_message('Invalid file format.','fail') : '';
		}
		else
		{
			$(this).closest('.filename').attr('placeholder','No file selected.');
		}		
	});

	/************	Script to save any edits made on any consulation, by the doctor, in the consultation edit section **************/

	$('.child-record').on('click','#consultation_edit_save',function()
	{
		var consult_ids=new Array();
		var cds=new Array();

		var length=0;
		var form_data= new FormData();

		$('.active-consultation-tab').each(function(index)
		{
			consult_ids.push($(this).val());
			length=index+1;
		});

		$('.active-cds-tab').each(function(index)
		{
			cds.push($(this).val());
		});
		
		if(length===0)
		{
			show_message('You don\'t have any pending consultation to save.','fail');
		}
		else
		{
			var proceed=true;
			var file_error=new Array();
			var file_size_error= new Array();

			form_data.append('active_consult_ids',JSON.stringify(consult_ids));
			form_data.append('active_cds',JSON.stringify(cds));

			for(i=0;i<length;i++)
			{
				$('input[name="guardian1RelationshipFile_'+consult_ids[i]+'[]"').each(function()
				{
					var id=$(this).attr('id');
					var f=$('#'+id)[0].files[0];

					if(typeof f !=='undefined')
					{
						var val=f.name;
						if(!check_file_type(val.toLowerCase()))
						{
							proceed=false;
							file_error.push(f.name);
						}

						if(f.size > 2000000)
						{
							proceed=false;
							file_size_error.push(f.name);
						}

						(proceed===true) ? form_data.append('guardian1RelationshipFile_'+consult_ids[i]+'[]',f) : '';
					}
				});
			}
	
			if(proceed)
			{
				var serialized_data=$('.patient-tabs :visible :input').serialize();
				var act_tab=$('.patient-tabs').filter(':visible').attr('id');

				form_data.append('serialized_data',serialized_data);
				form_data.append('act_tab',act_tab);
				form_data.append('ajax',true);

				$.fancybox.showActivity();
				$.ajax({
					url 		: baseurl+'internalUser/doctor_consultationTab_processing.php',
					type 		: 'post',
					data 		: form_data,
					processData	: false,
		       		contentType	: false,
		       		dataType	: 'json',
		       		error 		: function(jhr,status,errorThrown)
		       		{
		       			$.fancybox.hideActivity();
		       			show_message('Some unexpected errors occured while saving the consultation details. Please try again.','fail');
		       		},
					success 	: function(data) 
					{ 
						$.fancybox.hideActivity();
						
						switch(data.status)
						{
							case 'invalid_user':
								show_message_reload(data.message+'<p> Note: You will be redirected to the login page in <span class="sMsg_countown">6</span> second(s)</p>','fail','logout.php',6);
								break;
							case 'error':
								show_message(data.message,'fail');
								break;
							case 'fail':
								show_message(data.message,'fail');
								break;
							case 'success':
								$('input,textarea,select').removeClass('autosave');
								show_message(data.message,'success');
								append_files(data,length,consult_ids);
								$(".iframe").colorbox({iframe:true, width:"100%", height:"100%"});
								break;
							default :
								show_message('An unexpected error occured while saving the consultation details. Please try again.','fail');
								break;
						}
					} 
				});
			}
			else
			{
				var message='';
				var err_length=file_error.length;
				
				if(err_length>0)
				{
					message+='<p>The following files are in an unsupported format<br/>';
					while(err_length>0)
					{
						message+=file_error[(err_length-1)]+'<br/>';
						err_length--;
					}
					message+='</p>';
				}

				var size_length=file_size_error.length;
				if(size_length>0)
				{
					message+='<p>The following files are too large. You can only upload files which are less than 2 MB.<br/>';
					while(size_length>0)
					{
						message+=file_size_error[(size_length-1)]+'<br/>';
						size_length--;
					}
					message+='</p>';
				}
				(message!=='') ? show_message(message,'fail',8000) : '';
			}
		}
	});

	/********************* 
	
	Script to add the auto resize functionality for all textareas having the class 'auto_expand'. This also includes any
	dynamically added textareas inside the following containers child-record,#child-details,#colorbox

	*********************/

	$(".child-record,#child-details,#colorbox").on('focusin','.auto_expand',function()
	{
		$(this).removeAttr('style');
		$(this).autosize();
	});

	/********************* Script to save all the details from any particular tabs  in the consultation page *********************/

	$('.child-record').on('click','#save-changes',function()
    {	
    	var act_tab=$('.patient-tabs').filter(':visible').attr('id');

    	if(typeof act_tab !=='undefined' && act_tab==='tabs-1')
    	{
    		var consult_ids=new Array();
			var cds=new Array();

			var length=0;
			var form_data= new FormData();

			$('.active-consultation-tab').each(function(index)
			{
				consult_ids.push($(this).val());
				length=index+1;
			});

			$('.active-cds-tab').each(function(index)
			{
				cds.push($(this).val());
			});
			
			if(length===0)
			{
				show_message('You don\'t have any pending consultation to save . Please start a consultation to save.','fail');
			}
			else
			{
				var proceed=true;
				var date_error=false;
				var file_error=new Array();
				var file_size_error=new Array();

				form_data.append('active_consult_ids',JSON.stringify(consult_ids));
				form_data.append('active_cds',JSON.stringify(cds));

				for(i=0;i<length;i++)
				{
					var consult_date=$('#ConsultationDate_'+consult_ids[i]).val();
					if(consult_date==='')
					{
						date_error=true;
						$('#ConsultationDate_'+consult_ids[i]).css('border','1px solid red');
						$('#ConsultationDate_'+consult_ids[i]).focus();
					}

					$('input[name="guardian1RelationshipFile_'+consult_ids[i]+'[]"').each(function()
					{
						var id=$(this).attr('id');
						var f=$('#'+id)[0].files[0];

						if(typeof f !=='undefined')
						{
							if(!check_file_type(f.name.toLowerCase()))
							{
								proceed=false;
								file_error.push(f.name);
							}
					
							if(f.size > 2000000)
							{
								proceed=false;
								file_size_error.push(f.name);
							}

							(proceed===true) ? form_data.append('guardian1RelationshipFile_'+consult_ids[i]+'[]',f) : '';
						}
					});
				}
			
				if(date_error)
				{
					show_message('Consultation date cannot be empty','fail');
				}
				else if(proceed)
				{
					var serialized_data=$('.patient-tabs :visible :input').serialize();

					form_data.append('serialized_data',serialized_data);
					form_data.append('act_tab',act_tab);
					form_data.append('ajax',true);

					$.fancybox.showActivity();
					$.ajax({
						url 		: baseurl+'internalUser/doctor_consultationTab_processing.php',
						type 		: 'post',
						data 		: form_data,
						processData	: false,
			       		contentType	: false,
			       		dataType	: 'json',
			       		error 		: function(jxhr)
			       		{
			       			$.fancybox.hideActivity();
			       			show_message('Some unexpected errors occured while saving the consultation details. Please try again.','fail');
			       		},
						success 	: function(data) 
						{ 
							$.fancybox.hideActivity();
							switch(data.status)
							{
								case 'invalid_user':
									show_message_reload(data.message+'<p> Note: You will be redirected to the login page in <span class="sMsg_countown">6</span> second(s)</p>','fail','logout.php',6);
									break;
								case 'error':
									show_message(data.message,'fail');
									break;
								case 'fail':
									show_message(data.message,'fail');
									break;
								case 'success':
									$('input,textarea,select').removeClass('autosave');
									show_message(data.message,'success');
									append_files(data,length,consult_ids);
									$(".iframe").colorbox({iframe:true, width:"100%", height:"100%"});
									break;
								default :
									show_message('An unexpected error occured while saving the consultation details. Please try again.','fail');
									break;
							}
						} 
					});
				}
				else
				{
					var message='';
					var err_length=file_error.length;
					
					if(err_length>0)
					{
						message+='<p>The following files are in an unsupported format<br/>';
						while(err_length>0)
						{
							message+=file_error[(err_length-1)]+'<br/>';
							err_length--;
						}
						message+='</p>';
					}

					var size_length=file_size_error.length;
					if(size_length>0)
					{
						message+='<p>The following files are too large. You can only upload files which are less than 2 MB.<br/>';
						while(size_length>0)
						{
							message+=file_size_error[(size_length-1)]+'<br/>';
							size_length--;
						}
						message+='</p>';
					}
					(message!=='') ? show_message(message,'fail',8000) : '';		
				}
			}
    	}
    	else if(act_tab==='tabs-6')
    	{
    		$.fancybox.showActivity();
    		var options = { 
			    type:	'post',
			    url:    baseurl+'step2Handler.php', 
			    success:    function(data) 
			    {   
			    	$.fancybox.hideActivity();
			    	if(data==='nosession')
			    	{
			    		alert('Session timed out. Please login to continue');
			    		window.location.href=baseurl+'logout.php';
			    	}
			    	else
			    	{
			    		refresh_tab('tabs-6').success(function(result)
			    		{
			    			//console.log(result);
			    			$.fancybox.hideActivity();
			    			if(typeof result!=='undefined' && result!=='')
					    	{
					    		$('#tabs-6').html(result);
					    	}

					    	$('.date-pick').datePicker({startDate:'01/01/1900',clickInput:false});
					    	// prth_textarea_auto.init();
					    	$(".iframe").colorbox({iframe:true, width:"100%", height:"100%"});
					    	prth_common.init();
						
					    	attach_file_names();
			    		});				    
						console.log(data);
						show_message('Your changes has been saved successfully.','success',5000);
			    	} 
			    } 
			};
		    $('#doctor_guardian_form').ajaxForm(options);
		    $('#doctor_guardian_form').ajaxSubmit(options);
    	}
    	else if(act_tab==='tabs-7' || act_tab==='tabs-8' || act_tab==='tabs-10')
    	{
    		$.fancybox.showActivity();
    		var data=$('.patient-tabs :visible :input').serialize();
    		$.ajax({
    			url 		: baseurl+'inc/save_tabs.php',
    			type 		: 'post',
    			data 		: data+'&act_tab='+act_tab+'&ajax='+true,
    			dataType 	: 'json',
    			error 		: function(jhr)
    			{
    				$.fancybox.hideActivity();
    				show_message('Some unexpected error occured while saving your data. Please try again','fail',5000);
    			},
    			success 	: function(data)
    			{
    				$.fancybox.hideActivity();
    				if(data.status==='invalid_data' || data.status==='fail')
    				{
    					show_message(data.message,'fail',6000);
    				}
    				else if(data.status==='false' || data.status==='invalid_user')
    				{
    					alert(data.message);
    					window.location.href=baseurl+'logout.php';
    				}
    				else if(data.status==='success')
    				{
    					if(act_tab==='tabs-8')
    					{
    						(typeof data.detail!=='undefined' && data.detail!=='') ? $('#tabs-8').html(data.detail) : '';
    					}
    					else if(act_tab==='tabs-10')
    					{
    						(typeof data.detail!=='undefined' && data.detail!=='') ? $('#tabs-10').html(data.detail) : '';
    					}
    					$.fancybox.hideActivity();

					    $('.date-pick').datePicker({startDate:'01/01/1900',clickInput:false});	
					    prth_common.init();
					    // prth_textarea_auto.init();
					    // console.log('hai');
    					show_message(data.message,'success',6000);
    				}
    			}
    		})
    	}
    	else if(act_tab==='tabs-9')
    	{
    		$.fancybox.showActivity();
    		var options = { 
			    type:	'post',
			    url:    baseurl+'step5Handler.php', 
			    success:    function(data) 
			    {   
			    	$.fancybox.hideActivity();
			    	if(data==='nosession')
			    	{
			    		alert('Session timed out. Please login to continue');
			    		window.location.href=baseurl+'logout.php';
			    	}
			    	else
			    	{
			    		refresh_tab('tabs-9').success(function(result)
			    		{
			    			//console.log(result);
			    			if(typeof result!=='undefined' && result!=='')
					    	{
					    		$('#tabs-9').html(result);
					    	}

					    	$('.date-pick').datePicker({startDate:'01/01/1900',clickInput:false});
					    	// prth_textarea_auto.init();
					    	$(".iframe").colorbox({iframe:true, width:"100%", height:"100%"});
					    	prth_common.init();
						
					    	attach_file_names();
					    	$.fancybox.hideActivity();
			    		});				    
						console.log(data);
						show_message('Your changes has been saved successfully.','success',5000);
			    	} 
			    } 
			};
		    $('#doctor_guardian_form').ajaxForm(options);
		    $('#doctor_guardian_form').ajaxSubmit(options);
    	}
    });

	$('.child-record').on('click','.insert-signature',function()
	{
		// var c=confirm('Are you sure you want to insert your signature?. Once you insert your signature, you won\'t be able to make any further changes to this consultation or any other consultations for this appointment.So we higly recommend you to save all your assessment before inserting your signature. ');
		var x=$(this);
		console.log(x);
		var message= '<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>\
					Once you sign this consultation, you cannot make any futher changes to this.So we higly recommend you to save \
					all your assessment before inserting your signature.</p>';

		var buttons=
		{
			"Insert" 	: function()
			{
				$('.dialog-message').dialog('close');
				insert_signature(x);
			},
			"Cancel" 	: function()
			{
				$('.dialog-message').dialog('close');
			}
		};

		display_dialogBox('<div class="dialog-message"></div>',message,'Are you sure ?',buttons);
	});

	/******************** 	Script to access the assessment form during an consultation ********************************/

	$('.child-record').on('click','.assessment-form',function()
	{
		// var consult_id=$(this).closest('.inner').find('.consult-ids').first().val();
		// var c_id=$(this).closest('.inner').find('.c-ids').first().val();

		var consult_id=$(this).parent().parent().closest('.outer').find('.consult-ids').first().val();
		var c_id=$(this).parent().parent().closest('.outer').find('.c-ids').first().val();

		var assessment_data={
								consult_id 	: consult_id,
								c_id : c_id,
								ajax : true
							};
		var x;
		$.colorbox(
		{
			title : 'Consultation Assessment Form',
			ajax: true,
			data: assessment_data,
			href: baseurl+'internalUser/assessment_form.php',
			width: "100%",
			height: "100%",
			onComplete: function()
			{
				x=$('#assessment_form :input');
				// prth_textarea_auto.init();
			},
			onClosed : function()
			{
				var doctor_assessment_data=x.serialize();
				if(doctor_assessment_data!=='')
				{
					var y= confirm('Do you want to save the assessment form?')
					if(y===true)
					{
						$.fancybox.showActivity();
						doctor_assessment_data+='&consult_id='+consult_id+'&c_id='+encodeURIComponent(c_id)+'&ajax='+true;
						//console.log(doctor_assessment_data);
						$.ajax({
							url 	: baseurl+'internalUser/assessment_form_processing.php',
							type 	: 'post',
							data 	: doctor_assessment_data,
							success : function(data)
							{
								//console.log(data);
								$.fancybox.hideActivity();
								if(data==='invalid_data')
								{
									show_message('There are some issues with the data which you have provided. Please provide the correct details and try again.','fail');
								}
								else if(data==='save_failed')
								{
									show_message('An unexpected error occured while saving your data. Please try again.','fail');
								}
								else if(data==='success')
								{
									show_message('The assessment form has been saved successfully.','success');
								}
								else if(data==='invalid_user')
								{
									alert('You don\'t have access privilege to perform this operation.');
		    						window.location.href=baseurl+'logout.php';							
		    					}
		    					else if(data==='false')
		    					{
		    						alert('Session timed out. Please login to continue');
		    						window.location.href=baseurl+'logout.php';
		    					}
								else
								{
									show_message('An unexpected error occured while saving your data. Please try again.','fail');
								}
							}
						});
					}
				}
			}
		});
	});

	/******************** 	Script to view assessment form details for any saved consultation ********************************/	

	$('.child-record').on('click','.assessment-form-view',function()
	{
		var consult_id=$(this).parent().parent().closest('.outer').find('.consult-ids').first().val();
		var c_id=$(this).parent().parent().closest('.outer').find('.c-ids').first().val();

		var assessment_data={
								consult_id 	: consult_id,
								c_id : c_id
							};
		var x;
		$.colorbox(
		{
			title : 'Consultation Assessment Details',
			ajax: true,
			data: assessment_data,
			href: baseurl+'internalUser/assessment_form_view.php',
			width: "100%",
			height: "auto",
		});
	});

	/******************** 	Script to delete any uploaded files in the consultation tab ***************************/	

	$('.child-record').on('click','.delete_uploaded_file',function(e)
	{
		e.preventDefault();
		var x=$(this);
		var consult_id=x.closest('.outer').find('.consult-ids').first().val();
		var cds=x.closest('.outer').find('.c-ids').first().val();
		var file_url=x.closest('.row').find('.iframe').first().attr('href');
		var con= confirm('Are you sure you want to delete this file ?');

		if(con)
		{
			$.fancybox.showActivity();
			$.ajax({
				url : baseurl+'internalUser/delete_file.php',
				type : 'post',
				data : 'consult_id='+consult_id+'&cds='+encodeURIComponent(cds)+'&file_url='+encodeURIComponent(file_url)+'&ajax='+true,
				dataType : 'json',
				error : function(xjhr)
				{
					show_message('There was an issue in deleting this file. Please try again.','fail');
				},
				success : function(data)
				{
					$.fancybox.hideActivity();
					console.log(data);

					if(data.status==='error')
					{
						show_message(data.message,'fail');
					}
					else if(data.status==='success')
					{
						x.closest('.row').remove();
						show_message(data.message,'success');
					}
					else
					{
						show_message('There was an issue in deleting this file. Please try again.','fail');
					}
				} 
			});
		}	
	});

	/******************* Script to start a consultation session *************************************/

	$('.child-record').on('click','.consultation-start',function()
	{
		var x=$(this);
		var active_consult=x.closest('.outer').find('.consult-ids').first().val();
		var c_id=x.closest('.outer').find('.c-ids').first().val();
		var consult_date=x.closest('.outer').find('.consultation_date').first().val();
		var consult_type=x.closest('.outer').find('.consult_type').first().val();

		// console.log(active_consult);
		// console.log(c_id);

		var ajax=true;

		var consult_date=x.parent().prev().find('input').val()

		if(consult_date==='')
		{
			x.parent().prev().find('input').css('border','1px solid red');
			x.parent().prev().find('input').focus();

			show_message('Consultation date cannot be empty. Please select a date and then start the consultation.','fail');
		}
		else
		{
			var c_d=x.parent().prev().find('input');

			c_d.css('border-width','1px');
			c_d.css('border-style','solid');
			c_d.css('border-color','#a9a9a9 #dcdcdc #dcdcdc #a9a9a9');

			$.fancybox.showActivity();

			$.ajax({
				url 		:baseurl+'internalUser/consultation_timeSetup.php',
				type 		:'post',
				data 		: 'active_consult='+active_consult+'&c_id='+encodeURIComponent(c_id)+'&consult_date='+encodeURIComponent(consult_date)+'&consult_type='+consult_type+'&ajax='+ajax,
				dataType	: 'json',
	       		error 		: function(jxhr)
	       		{
	       			$.fancybox.hideActivity();
	       			show_message('Some unexpected errors occurred while starting this session. Please try again','fail');
	       		},	
				success  	: function(data)
				{
					$.fancybox.hideActivity();
					// console.log(data);
					if(data.status==='false')
					{
						alert(data.message);
						window.location.href=baseurl+'logout.php';
					}
					else if(data.status==='invalid_user')
					{
						alert(data.message);
						window.location.href=baseurl+'logout.php';
					}
					else if(data.status==='invalid' || data.status==='invalid_data' || data.status==='invalid_cons' || data.status==='start_issue')
					{
						show_message(data.message,'fail');
					}
					else if(data.status==='invalid_date')
					{
						x.parent().prev().find('input').css('border','1px solid red');
						x.parent().prev().find('input').focus();

						show_message(data.message,'fail');
					}
					else if(data.status==='success')
					{
						console.log('Inside start success');
						if(typeof did !=='undefined')
						{
							clearInterval(did);	
						}
						
						did=setInterval( function()
						{
							pingDB(active_consult,c_id)
						},(1000*60*10));	// ping db for each 10 min

						//var start_time=current_time(false);
						x.parent().next('td').children().first().val(data.detail);
						x.attr('disabled','disabled');
						x.parent().siblings().find('.consultation_date').attr('disabled','disabled');
						x.parent().siblings().find('.consultation_date').siblings('a').remove();
						x.parent().siblings().find('input[name="dayhrminsec"]').first().val('');

						// $('.outer').removeClass('active-consultation');
		        		x.closest('.outer').addClass('active-consultation');
		        		x.closest('.outer').find('input[name="consult_id[]"]').addClass('active-consultation-tab');
		        		x.closest('.outer').find('input[name="c_id[]"]').addClass('active-cds-tab');

		        		var tiny_length=tinymce.editors.length;
		        	
		        		for(var i=0;i<tiny_length;i++)
		        		{
		        			tinymce.editors[i].onKeyUp.add(function (ed,e)
		        			{
		        				var txtDom=ed.getElement();
		        				$(txtDom).addClass('autosave');
		        				// console.log(txtDom);
		        			});
		        		}

		        		$('.child-record').on('change','.active-consultation select',function()
		        		{
		        			// console.log($(this));
		        			$(this).addClass('autosave');
		        		});
		        		$('.child-record').on('keyup','.active-consultation input',function()
		        		{
		        			// console.log($(this));
		        			$(this).addClass('autosave');
		        		})

		        		if(typeof aid!=='undefined')
		        		{
		        			clearInterval(aid);
		        			autosave();		// call the autosave function to be on the safe side.
		        		}		
		        		aid=setInterval(autosave,(1000*60*12));		// 15 * 60 * 1000; 15 minutes
					}
				}
			});
		}
	});

	/******************* Script to stop a consultation session *************************************/

	$('.child-record').on('click','.reset-timer',function()
	{
		var x=$(this);
		var active_consult=$(this).closest('.outer').find('.consult-ids').first().val();
		var c_id=$(this).closest('.outer').find('.c-ids').first().val();
		var ajax=true;

		$.fancybox.showActivity();
		$.ajax({
			url : baseurl+'internalUser/consultation_timeReset.php',
			type: 'post',
			data: 'active_consult='+active_consult+'&c_id='+encodeURIComponent(c_id)+'&ajax='+ajax,
			dataType	: 'json',
			error 		: function(jxhr)
       		{
       			$.fancybox.hideActivity();
       			show_message('Some unexpected errors occured while ending the consultation session.Please try again.','fail');
       		},
			success : function(data)
			{
				$.fancybox.hideActivity();
				if(data.status==='false')
				{
					alert(data.message);
					window.location.href=baseurl+'logout.php';
				}
				else if(data.status==='invalid_user')
				{
					alert(data.message);
					window.location.href=baseurl+'logout.php';
				}
				else if(data.status==='invalid_data' || data.status==='invalid_cons' || data.status==='empty')
				{
					show_message(data.message,'fail');
				}
				else if(data.status==='success')
				{
					console.log('Inside stop success');
					clearInterval(did);
					x.parent().prev().children().first().val(data.detail);
					x.attr('disabled','disabled');
				}
			}
		});
	});

	/******************** 	Script to select a consultation so the doctor start making changes on that *************************/	

	$('#pendingNotes').on('click','.edit_consultation',function(e)
	{
		e.preventDefault();

		var consult_id=$(this).find('input[name="consult_id"]').val();
		var cds=$(this).find('input[name="cds"]').val();
		$.fancybox.showActivity();

		$.ajax({
			url 		: baseurl+'internalUser/edit_consultation.php',
			type 		: 'post',
			data 		: 'consult_id='+encodeURIComponent(consult_id)+'&cds='+cds+'&ajax='+true,
			dataType	: 'json',
			error 		: function(jhr)
			{
				$.fancybox.hideActivity();
				show_message('An unexpected error occured while accessing the consultation details. Please try again.','fail',5000);
				console.log('Error');
			},
			success 	: function(data)
			{
				$.fancybox.hideActivity();
				console.log(data);

				if(data.status==='error')
				{
					show_message(data.message,'fail');
				}
				else if(data.status==='false')
				{
					alert(data.message);
					window.location.href=baseurl+'logout.php';
				}
				else if(data.status==='invalid_user')
				{
					alert(data.message);
					window.location.href=baseurl+'logout.php';
				}
				else if(data.status==='fail')
				{
					$('#rec_info').hide();
	    			$('.child-record').html(data.detail);
				}
				else if(data.status==='success')
				{
					$('#rec_info').hide();
	    			$('.child-record').html(data.detail).show();
	    			$("#consultationAcc").accordion({
						obj: "div",
						wrapper: "div",
						el: ".h",
						head: "h6",
						next: "div",
						// initShow : "div.outer:first",
						event : "click",
						collapsible : true,
						standardExpansible:true
					});

					$("#consultationReport").accordion({
						obj: "div",
						wrapper: "div",
						el: ".h",
						head: "h6",
						next: "div",
						initShow : "div.outer:first",
						event : "click",
						expandSub : true,
						collapsible : true,
						standardExpansible:true
					});
				
					$('.date-pick').datePicker({startDate:'01/01/1900',clickInput:false});
					prth_editor.html();
					// prth_textarea_auto.init();
					$(".iframe").colorbox({iframe:true, width:"100%", height:"100%"});
				}
			}
		});
	});
	
	/******************** 	

	Script to access all the details of an user so that the admin can approve his/her registration request, if its an unregistered
	user or to just view the user details if its an registered user 

	*************************/

	$('.view_user').on('click',function(e)
	{
		e.preventDefault();

		var u_id=$(this).find('input[name="uid"]').val();
		var uds=$(this).find('input[name="uds"]').val();

		$.fancybox.showActivity();
		$.ajax(
		{
			url: baseurl+'admin/view_user_details.php',
			type: "post",
			data: "u_id="+encodeURIComponent(u_id)+"&uds="+uds+"&ajax="+true,
			dataType : 'json',
			error : function(jhr)
			{
				$.fancybox.hideActivity();
				show_message('Some unexpected errors occured while accessing the user details.','fail');
			},
			success: function(data)
			{
				if(data.status==='false')
	    		{
	    			alert(data.message);
	    			window.location.href=baseurl+'logout.php';
	    		}
	    		else if(data.status==='invalid_user')
	    		{
	    			alert(data.message);
	    			window.location.href=baseurl+'logout.php';
	    		}
	    		else if(data.status==='error')
	    		{
	    			show_message(data.message,'fail');
	    		}
	    		else if(data.status==='success')
	    		{
	    			$('#rec_info').hide();
	    			$('#user-details').html(data.detail);
	    			prth_textarea_auto.init();
	    		}
	    		$.fancybox.hideActivity();
			}
		});
	});

/******************** 	Script to reject an registration request made by the user - BY ADMIN *************************/

	$('#admin-regis-reject').live('click',function()
	{
		var uid=$(this).siblings('input[name="uid"]').val();
		var uds=$(this).siblings('input[name="uds"]').val();
		var reason=$('#regis_rejectReason').val();
		if(reason==='')
		{
			show_message('Please state your reason(s) for rejecting this user.','fail');
		}
		else
		{
			var x= confirm('Are you sure you want to reject this user ?');
			if(x)
			{
				// console.log(uid);
				// console.log(uds);
				$.fancybox.showActivity();
			    $.ajax({
			    	url: baseurl+'admin/reject_registration.php',
			    	type: 'post',
			    	data: "uid="+encodeURIComponent(uid)+"&reason="+reason+"&uds="+uds+"&ajax="+true,
			    	dataType : 'json',
			    	error : function(jhr)
					{
						$.fancybox.hideActivity();
						show_message('There are some issues in rejecting this user. Please try again..','fail');
					},
			    	success: function(data)
			    	{
			    		$.fancybox.hideActivity();
			    
			    		if(data.status==='invalid_data')
			    		{
			    			show_message(data.message,'fail');
			    		}
			    		else if(data.status==='false')
			    		{
			    			alert(data.message);
			    			window.location.href=baseurl+'logout.php';
			    		}
			    		else if(data.status==='success')
			    		{
			    			show_message_reload(data.message+' Please wait the page will reload in <span class="sMsg_countown">10</span> second(s)','success','admin/users.php',10);
			    		}
			    	}
			    });
			}
		}
	});

	/******************** 	Script to approve an registration request made by the user - BY ADMIN *************************/

	$('#admin-regis-approve').live('click',function()
	{
		var uid=$(this).siblings('input[name="uid"]').val();
		var uds=$(this).siblings('input[name="uds"]').val();
		var reason=$('#regis_rejectReason').val();

		var x= confirm('Are you sure you want to approve this user ?');
		if(x)
		{
			// console.log(uid);
			// console.log(uds);
			$.fancybox.showActivity();
		    $.ajax({
		    	url: baseurl+'admin/approve_registration.php',
		    	type: 'post',
		    	data: "uid="+encodeURIComponent(uid)+"&uds="+uds+"&ajax="+true,
		    	dataType : 'json',
		    	error : function(jhr)
				{
					$.fancybox.hideActivity();
					show_message('There are some issues in rejecting this user. Please try again.','fail');
				},
		    	success: function(data)
		    	{
		    		$.fancybox.hideActivity();
		    
		    		if(data.status==='invalid_data')
		    		{
		    			show_message(data.message,'fail');
		    		}
		    		else if(data.status==='false')
		    		{
		    			alert(data.message);
		    			window.location.href=baseurl+'logout.php';
		    		}
		    		else if(data.status==='success')
		    		{
		    			show_message_reload(data.message+' Please wait the page will reload in <span class="sMsg_countown">10</span> second(s)','success','admin/users.php',10);
		    		}
		    	}
		    });
		}
	});

	/******************** 	Script to add additional file fields in the consultation tab *************************/

	$('.child-record').on('click','.doctor-consultation-fileadd',function(e)
   	{
   		e.preventDefault();
   		// console.log(this);
   		var x=$(this);
   		var ele = x.closest('.columns').siblings('.fileuploader').find('.consultation_files').attr('name');
   		var temp_ele_length=$('input[name="'+ele+'"]').length;
   		var consult_val=x.closest('.outer').find('.consult-ids').first().val();

   		var ele_length=check_element_exists(x,temp_ele_length,consult_val);
   		console.log(check_element_exists(x,temp_ele_length,consult_val));

   		x.closest('.row').after('<div class="row">\
										<div class="five columns fileuploader"><input type="text" class="filename" placeholder="No file selected."/><input type="button" name="file" class="filebutton" value="Browse File" /><input class="small consultation_files" type="file" name="guardian1RelationshipFile_'+consult_val+'[]"  id="guardian1RelationshipFile_'+consult_val+'_'+(ele_length+1)+'"/></div>\
										<div class="two columns">\
												<select id="docType" class="input-text small" size="1" name="docType_'+consult_val+'[]" title="DocumentType">\
												<option>Select File type</option>\
												<option>Medical</option>\
												<option>Non-Medical</option>\
												</select>\
											</div>\
										<div class="three columns"><input type="text" name="consultfileDescription_'+consult_val+'[]" id="consultfileDescription_'+consult_val+'_'+(ele_length+1)+'" value="" placeholder="Enter a file description" class="input-text small"></div>\
										<div class="two columns">\
											<a href="#" title="Add" class="doctor-consultation-fileadd">\
							                    <img src="'+baseurl+'img/buttons_add.png" alt="Add" />\
							                </a>\
											&nbsp;\
											<a href="#" title="Delete" class="doctor-consultation-filedelete">\
												<img src="'+baseurl+'img/ico/icSw2/16-Trashcan.png" alt="Delete" />\
											</a>\
										</div>\
									</div>');
   });

	/******************** 	Script to remove any additionally added file fields from the consultation tab *******************/

	$('.child-record').on('click','.doctor-consultation-filedelete',function(e)
	{
		e.preventDefault();
		$(this).closest('.row').remove();
	});

	/******************  Script to search patients based on the search type **************************/

	$('.patient-search').on('keyup',function()
	{
		var search=$(this).val();
		var type=$('input[name="find_type"]').filter(':checked').val();

		// console.log(search);
		var result=$('.search-result');
		if(typeof type !=='undefned' && type==='name')
		{
			$('.search-error').html('');
			result .html('<img src="'+baseurl+'img/loader.gif" />');
			$.ajax(
			{
				url 		: baseurl+'internalUser/find_patient.php',
				type 		: 'post',
				data 		: 'search='+search+'&type='+type,
				dataType 	: 'json',
				success 	: function(data)
				{
					//console.log(data);
					result.html(data.result);
				}
			});
		}
		else
		{
			console.log(search);

			if(check_date(search))
			{
				$('.search-error').html('');
				result .html('<img src="'+baseurl+'img/loader.gif" />');
				$.ajax(
				{
					url 		: baseurl+'internalUser/find_patient.php',
					type 		: 'post',
					data 		: 'search='+search+'&type='+type,
					dataType 	: 'json',
					success 	: function(data)
					{
						//console.log(data);
						result.html(data.result);
					}
				});
			}
			else
			{
				console.log('fail');
				$('.search-error').html('<span style="color:red;">Please provide the date in DD/MM/YYYY</span>');
			}
		}	
	});


	// $('.patient-search').on('change',function()
	// {
	// 	var search=$(this).val();
	// 	var type=$('input[name="find_type"]').filter(':checked').val();
	// 	var result=$('.search-result');

	// 	if(typeof type !=='undefned' && type==='dob')
	// 	{

	// 	}
	// });


	/******************  Script to convert the search box into a datepicker, back and forth **************************/

	$('input[name="find_type"]').on('change',function()
	{
		var type=$('input[name="find_type"]').filter(':checked').val();
		var search_box=$('.patient-search');

		if(typeof type!=='undefined' && type==='dob')
		{
			search_box.attr('placeholder','Enter Patient DOB');
			search_box.val('');
			$('.search-error').html('');
			// search_box.siblings('a').toggle();
			// search_box.addClass('date-pick');
			// $('.date-pick').datePicker({startDate:'01/01/1900',clickInput:true});
		}
		else
		{
			// search_box.removeClass('date-pick');
			// search_box.removeClass('dp-applied');
			// search_box.siblings('a').toggle();
			search_box.attr('placeholder','Enter Patient Name');
			search_box.val('');
			$('.search-error').html('');
		}
	});

	$('div#findPatients').on('click','.view_search_result',function(e)
	{
		e.preventDefault();

		var pid=$(this).find('input[name="pid"]').val();
		var pds=$(this).find('input[name="pds"]').val();

		$.fancybox.showActivity();
	    
	    $.ajax({
	    	url: baseurl+'inc/patient_details_tabs.php',
	    	type: "post",
	    	data: "pid="+encodeURIComponent(pid)+"&pds="+pds+"&ajax="+true,
	    	dataType : 'json',
	    	error : function(jhr)
	    	{
	    		$.fancybox.hideActivity();
	    		show_message('Some unexpected errors occured while accessing the patient details.','fail');
	    	},
	    	success: function(data)
	    	{
	    		$.fancybox.hideActivity();
	    		if(data.status==='false')
	    		{
	    			alert(data.message);
	    			window.location.href=baseurl+'logout.php';
	    		}
	    		else if(data.status==='invalid_user')
	    		{
	    			alert(data.message);
	    			window.location.href=baseurl+'logout.php';
	    		}
	    		else if(data.status==='error')
	    		{
	    			show_message(data.message,'fail');
	    		}
	    		else if(data.status==='success')
	    		{
	    			$('#rec_info').hide();
	    			$('.child-record').html(data.detail);
	    			$("#consultationAcc").accordion({
						obj: "div",
						wrapper: "div",
						el: ".h",
						head: "h6",
						next: "div",
						// initShow : "div.outer:first",
						event : "click",
						collapsible : true,
						standardExpansible:true
					});

					$("#consultationReport").accordion({
						obj: "div",
						wrapper: "div",
						el: ".h",
						head: "h6",
						next: "div",
						initShow : "div.outer:first",
						event : "click",
						expandSub : true,
						collapsible : true,
						standardExpansible:true
					});

					prth_common.init();
					$(".iframe").colorbox({iframe:true, width:"100%", height:"100%"});
					$(".inline").colorbox({inline:true, width:"100%"});
	    		}
	    	}
	    });
	});

	/************** Script to create a new user  *********************************/

	$('#create-new-user').on('click',function()
	{
		var firstname=$('#new_user_firstname').val();
		var lastname=$('#new_user_lastname').val();
		var email=$('#new_user_email').val();
		var username=$('#new_user_username').val();
		var user_type=$('#new_user_type').val();
		var doctor_gmc_number=$('#gmc_number');
		var doc_dob=$('#doc_dob');
		var submitData=true;
		var data='';

		if(typeof firstname==='undefined' || firstname==='')
		{
			submitData=false;
			$('#new_firstname_error').html('First Name cannot be empty');
		}
		else
		{
			data+='firstname='+firstname;
			$('#new_firstname_error').html('');
		}

		if(typeof lastname==='undefined' || lastname==='')
		{
			submitData=false;
			$('#new_lastname_error').html('Last Name cannot be empty');
		}
		else
		{
			data+='&lastname='+lastname;
			$('#new_lastname_error').html("");
		}

		if(typeof username==='undefined' || username==='')
		{
			submitData=false;
			$('#new_username_error').html('Username cannot be empty');
		}
		else
		{
			data+='&username='+username;
			$('#new_username_error').html("");
		}

		if(typeof email==='undefined' || email==='')
		{
			submitData=false;
			$('#new_email_error').html("Email cannot be empty");
		}
		else
		{
			if(!check_email_validity(email))
			{
				submitData=false;
				$('#new_email_error').html(" Please provide a valid email address");
			}
			else
			{
				data+='&email='+email;
				$('#new_email_error').html("");
			}
		}

		if(typeof user_type==='undefined' || user_type==='0')
		{
			submitData=false;
			$('#user_type_error').html('Please select a user type');
		}
		else
		{
			data+='&user_type='+user_type;
			$('#user_type_error').html("");
		}

		if(doctor_gmc_number.length)
		{
			var d_gmc_num=doctor_gmc_number.val();
			if(typeof d_gmc_num==='undefined' || d_gmc_num==='')
			{
				submitData=false;
				$('#gmc_error').html('GMC Number cannot be empty');
			}
			else
			{
				data+='&gmc_number='+d_gmc_num;
				$('#gmc_error').html('');
			}
		}

		if(doc_dob.length)
		{
			var doctor_dob=doc_dob.val();
			if(typeof doctor_dob!=='undefined' && doctor_dob!=='' && validate_dob(doctor_dob))
			{
				data+='&doctor_dob='+doctor_dob;
				$('#doc_dob_error').html('');	
			}
			else
			{
				submitData=false;
				$('#doc_dob_error').html('Invalid DOB.');
			}
		}
		if(submitData===true)
		{
			data+='&ajax='+true;
			$.fancybox.showActivity();
			var request= $.ajax(
						{
							url 		:baseurl+'admin/create_new_user.php',
							type 		:'post',
							data 		: data,
							dataType 	: 'json'
						});

			request.done(function(data)
			{
				$.fancybox.hideActivity();
				console.log(data);

				switch(data.status)
				{
					case 'invalid':
						alert('Session timed out. Please login to perform this action');
						window.location.replace(baseurl+'logout.php');
						break;
					case 'error':
						var err_length=data.details.length;
						for(i=0;i<err_length;i++)
						{
							if(data.details[i]==='firstname_error')
							{
								$('#new_firstname_error').html('First Name cannot be empty');
							}
							else if(data.details[i]==='lastname_error')
							{
								$('#new_lastname_error').html('Last Name cannot be empty');
							}
							else if(data.details[i]==='email_error')
							{
								$('#new_email_error').html("Email cannot be empty");
							}
							else if(data.details[i]==='email_format_error')
							{
								$('#new_email_error').html(" Please provide a valid email address");
							}
							else if(data.details[i]==='email_exists')
							{
								$('#new_email_error').html('This email address already exists');
							}
							else if(data.details[i]==='username_error')
							{
								$('#new_username_error').html('Username cannot be empty');
							}
							else if(data.details[i]==='username_invalid')
							{
								$('#new_username_error').html('Username already exists');
							}
							else if(data.details[i]==='user_type_error')
							{
								$('#user_type_error').html('Please select a user type');
							}
							else if(data.details[i]==='gmc_error')
							{
								$('#gmc_error').html('GMC Number cannot be empty');
							}
							else if(data.details[i]==='doctor_dob_error')
							{
								$('#doc_dob_error').html('Invalid DOB');
							}
						}
						break;
					case 'success':
						show_message('You have successfully created an user.','success',6000);

						$('#new_user_firstname').val('');
						$('#new_user_lastname').val('');
						$('#new_user_email').val('');
						$('#new_user_username').val('');
						$('#new_user_type').val('0');
						if($('#gmc_number').length)
						{
							$('.doctor-specific-field').remove();
						}

						$('#new_email_error').html('');
						$('#new_username_error').html('');
						$('#new_firstname_error').html('');
						$('#new_lastname_error').html('');
						$('#user_type_error').html('');
						break;
					case 'fail':
						show_message('An unexpected error occurred while processing your request. Please try again.','fail',5000);
						break;
					default :
						show_message('An unexpected error occurred while processing your request. Please try again.','fail',5000);
						break;
				}
			});

			request.fail(function(jqXHR,textStatus,errorThrown)
			{
				$.fancybox.hideActivity();
			   	show_message('An unexpected error occurred while processing your request. Please try again.','fail',5000);
			});	
		}
	});

	$('#new_user_type').on('change',function()
	{
		var user_type=$(this).val();

		if(user_type==='doctor')
		{
			var html= '<div class="row doctor-specific-field"><div class="two columns">Doctor GMC Number:</div>';
			html+='<div class="six columns"><input type="text" name="gmc_number" id="gmc_number" class="input-text small" value=""/></div>';
			html+='<div class="four columns error" id="gmc_error"></div></div>';

			html+='<div class="row doctor-specific-field"><div class="two columns">Doctor DOB:</div>';
			html+='<div class="six columns"><input type="text" name="doc_dob" id="doc_dob" class="input-text small date-pick" value=""/></div>';
			html+='<div class="four columns error" id="doc_dob_error"></div></div>';
			$('.new_user form').append(html);

			$('.date-pick').datePicker({startDate:'01/01/1900',clickInput:false});
		}
		else
		{
			var x=$('.doctor-specific-field');
			(typeof x !=='undefined') ? x.remove() : '';
		}
	});

	/***************************** Script to clear the firstname,lastname,username error messages, if any, once it satisfies certain conditions ***********/

	$('#new_user_firstname,#new_user_lastname,#new_user_username').on('keyup',function()
	{
		var value=$(this).val();
		if(typeof value !=='undefined' && value!=='')
		{
			$(this).parent().next('div').html('');
		}
		else
		{
			$(this).parent().next('div').html('This field cannot be empty');
		}
	});

	/***************************** Script to clear the user type error message, if any once it satisfies certain conditions ***********/

	$('#new_user_type').on('change',function()
	{
		var value=$(this).val();
		if(typeof value!=='undefined' && value!=='0' && value!=='')
		{
			$(this).parent().next('div').html('');
		}
		else
		{
			$(this).parent().next('div').html('Please select a user type');
		}
	});

	/***************************** Script to clear the gmc number error message, if any it satisfies certain conditions ***********/

	$('.new_user').on('keyup','#gmc_number',function()
	{
		var value=$(this).val();
		if(typeof value!=='undefined' && value!=='')
		{
			$(this).parent().next('div').html('');
		}
		else
		{
			$(this).parent().next('div').html('GMC Number cannot be empty.');
		}
	});

	/***************************** Script to clear the dotor dob error message, if any it satisfies certain conditions ***********/

	$('.new_user').on('keyup','#doc_dob',function()
	{
		var value=$(this).val();
		if(typeof value!=='undefined' && value!=='' && validate_dob(value))
		{
			$(this).parent().next('div').html('');
		}
		else
		{
			$(this).parent().next('div').html('Invalid DOB');
		}
	});

	$('.new_user').on('change','#doc_dob',function()
	{
		var value=$(this).val();
		if(typeof value!=='undefined' && value!=='' && validate_dob(value))
		{
			$(this).parent().next('div').html('');
		}
		else
		{
			$(this).parent().next('div').html('Invalid DOB');
		}
	});

	/***************************** Script to clear the email error message, if any once it satisfies certain conditions ***********/

	$('#new_user_email').on('keyup',function(e)
	{
		var value=$(this).val();
		if(typeof value!=='undefined' && value!=='' && check_email_validity(value))
		{
			$(this).parent().next('div').html('');
		}
		else
		{
			$(this).parent().next('div').html('Invalid Email Address');
		}
	})
});

/**************** Phase 2 function which handles request to insert doctor's signaturte *****************************/

function insert_signature(consultationObject)
{
	var consult_id=consultationObject.closest('.outer').find('.consult-ids').first().val();
	var cds=consultationObject.closest('.outer').find('.c-ids').first().val();
	console.log(consult_id);

	$.fancybox.showActivity();
	var request=$.ajax(
				{
					url 		: baseurl+'internalUser/insert_signature.php',
					type 		: 'post',
					data 		: 'consult_id='+consult_id+'&cds='+encodeURIComponent(cds),
					dataType 	: 'json'
				});

	request.done(function(data)
	{
		$.fancybox.hideActivity();

		if(data.status==='invalid_user')
		{
			show_message_reload(data.message+'<p> Note: You will be redirected to the login page in <span class="sMsg_countown">6</span> second(s)</p>','fail','logout.php',6);
		}
		else if(data.status==='error')
		{
			show_message(data.message,'fail',6000);
		}
		else if(data.status==='success')
		{
			$(consultationObject).parent().next('.user-signature').html('<img src="'+data.signature+'" alt="" style="max-width:200px;max-height:100px;"/>');
			consultationObject.remove();
			
			if(data.refresh_id==='pendingNotes')
			{
				show_message(data.message+'<p>Note: Please wait, this page will refresh automatically. </p>','success',8000);
				$.fancybox.showActivity();
				setTimeout(function()
				{
					$('#'+data.refresh_id).load(baseurl+'internalUser/consultation.php #'+data.refresh_id,function()
					{
						$('#rec_info').show();
	    				$('#child-details').hide();
						$.fancybox.hideActivity();
					});
				},8000);
			}
			else
			{
				var message= '<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>\
							Do you want to start a new consultation for this patient ?. If so, please select \'Yes\', otherwise \
							this patient will be removed from your appointment list.</p>';
				var buttons =
				{
					"Yes" 	: function()
					{
						$('.dialog-message').dialog('close');
					},
					"No" 	: function()
					{
						$('.dialog-message').dialog('close');
						show_message(data.message+'<p>Note: Please wait, this page will refresh automatically. </p>','success',8000);
						$.fancybox.showActivity();
						setTimeout(function()
						{
							$('#'+data.refresh_id).load(baseurl+'internalUser/consultation.php #'+data.refresh_id,function()
							{
								$('#rec_info').show();
			    				$('#child-details').hide();
								$.fancybox.hideActivity();
							});
						},8000);
					}
				};

				display_dialogBox('<div class="dialog-message"></div>',message,'Do you want to continue ?',buttons);
			}
		}
	});

	request.fail(function(jqXHR, testStatus,errorThrown)
	{
		$.fancybox.hideActivity();
    	show_message('An unexpected error occurred while processing your request. Please try again.','fail',6000);
	});
}

/**************** Phase 2 function to initialize a custum dialog box *****************************/

function display_dialogBox(dialogContentElement,message,title,buttons_to_display)
{
	$(dialogContentElement).appendTo('body').html(message)
	.dialog(
	{
		modal 			: true, 
		title 			: title, 
		zIndex 			: 10000, 
		autoOpen 		: true,
		width 			: 'auto', 
		height 			: 'auto',
		resizable		: false,
		closeOnEscape	: true,
		buttons 		: buttons_to_display,
		close 			: function (event, ui) 
		{
			$(this).remove();
		}
	});
}

/************** Phase 2 script to perform an appointment requesr ********************/

function perform_appointment_request(checkData,sendData,requestType)
{
	var check_time_interval=$.ajax(
							{
								url 		: baseurl+'inc/check_appointment_time.php',
								type 		: 'post',
								data 		: checkData,
								dataType 	: 'json'
							});

	check_time_interval.done(function(data)
	{
		if(data.status==='exists')
		{
			var x=confirm('The doctor has another appointment at this time interval. Do you still want to continue with this time ?');
			if(x===false)
			{
				if(requestType==='appointment')
				{
					// $('#app-form-appointmentTime').html('<option>Select Appointment time');
					// $('#app-request-professionalList').val('Select a Professional');
					display_timeInterval();
				}
				$.fancybox.hideActivity();
			}
			else
			{
				if(requestType==='appointment') 
				{
					send_appointment_request(sendData);
				}
				else if(requestType==='reschedule')
				{
					send_reschedule_request(sendData);
				}
				else if(requestType==='approve')
				{
					send_aprove_request(sendData);
				}
			}  		 
		}
		else if(data.status==='guard_exists')
		{
			$('#appointment-request-errors').css('display','block');

			if(data.detail==='prevent_approve')
			{
				$('#app-requested-timeError').html('The doctor is unavailable at the selected time interval.We kindly recommend you to select another time interval and request a reschedule.').css('display','block');
				$('#accept_newAppointment_proposal').remove();
			}
			else
			{
				$('#app-requested-timeError').html('The doctor is unavailable at the selected time interval.').css('display','block');
			}
			$.fancybox.hideActivity();
		}
		else if(data.status==='error')
		{
			$('#appointment-request-errors').css('display','block');
			$('#app-requested-timeError').html(data.message).css('display','block');
			$.fancybox.hideActivity();
		}
		else if(data.status==='success')
		{
			$('#app-requested-timeError').html('').css('display','none');
			display_errors();

			if(requestType==='appointment') 
			{
				send_appointment_request(sendData);
			}
			else if(requestType==='reschedule')
			{
				send_reschedule_request(sendData);
			}
			else if(requestType==='approve')
			{
				send_approve_request(sendData);
			}
		}
	});

	check_time_interval.fail(function(jqXHR, testStatus,errorThrown)
	{
		$.fancybox.hideActivity();
    	closeColorbox_and_dispMsg();
	});
}

/************** Phase 2 script which processes the accept request sent from any calendar section ********************/

function send_approve_request(sendData)
{
	var request=$.ajax(
	{
		url 		: baseurl+'inc/accept_user_request.php',
		type 		: "post",
		data 		: sendData,
		dataType 	: 'json'
	});

	request.done(function(data)
	{
		$.fancybox.hideActivity();

		switch(data.status)
		{
			case 'error':
				$.colorbox.close();
				show_message(data.message,'fail',6000);
				break;
			case 'invalid_id':
				$('#appointment-request-errors').css('display','block');
				$('#app-request-patientError').html('Invalid appointment selected.Please try again').css('display','block');
				break;
			case 'false':
				alert('Session timed out');
				window.location.reload();
				break;
			case 'success':
				console.log('success');
				$.colorbox.close();
				
				show_message('<h4>'+data.message+'</h4> Please wait, your calendar will refresh automatically.','success',6000);

				if(data.detail==='my_appointments.php')
				{
					$('#calendar').fullCalendar( 'refetchEvents');
				}
				else if(data.detail==='admin/admin_dashboard.php')
				{
					$('#admin-calendar').fullCalendar( 'refetchEvents');
				}
				else if(data.detail==='internalUser/appointments.php')
				{
					$('#doctor-calendar').fullCalendar( 'refetchEvents');
				}
				break;
			case 'invalid_query':
				$('#appointment-request-errors').css('display','block');
				$('#app-request-patientError').html('There have been some issues in our server.Please try again').css('display','block');
				break;
			default :
				$.fancybox.hideActivity();
				closeColorbox_and_dispMsg();
				break;
		}
	});

	request.fail(function(jqXHR,textStatus,errorThrown)
	{
		$.fancybox.hideActivity();
	    closeColorbox_and_dispMsg();
	});	
}

/************** Phase 2 script to send an appointment request ********************/

function send_appointment_request(sendData)
{
	var request=$.ajax(
				{
					url 		: baseurl+'inc/request_appointment.php',
					type 		: "post",
					data 		: sendData,
					dataType 	: 'json'
				});

	request.done(function(data)
	{
		$.fancybox.hideActivity();
		switch(data.status)
		{
			case 'invalid_data':
				$.colorbox.close();
				show_message(data.message,'fail',6000);
				break;
			case 'invalid_patient':
				$('#appointment-request-errors').css('display','block');
				$('#app-request-patientError').html('Please select a patient').css('display','block');
				break;
			case 'invalid_service':
				display_appointment_serviceError();
				break;
			case 'invalid_date':
				display_appointment_dateError(data.message);
				break;
			case 'invalid_professional':
				display_appointment_professionalError();
				break;
			case 'invalid_contact':
				$('#appointment-request-errors').css('display','block');
				$('#app-request-contactError').html('Please select your location/contact details').css('display','block');
				break;
			case 'invalid_time':
				$('#appointment-request-errors').css('display','block');
				$('#app-requested-timeError').html('Please select a time slot').css('display','block');
				break;
			case 'false':
				alert('Session timed out');
				window.location.reload();
				break;
			case 'success':
				console.log('success');
				$.colorbox.close();

				show_message('<h4>'+data.message+'</h4> Please wait, you calendar will refresh automatically.','success',6000);

				if(data.detail==='my_appointments.php')
				{
					$('#calendar').fullCalendar( 'refetchEvents');
				}
				else if(data.detail==='admin/admin_dashboard.php')
				{
					$('#admin-calendar').fullCalendar( 'refetchEvents');
				}
				else if(data.detail==='internalUser/appointments.php')
				{
					$('#doctor-calendar').fullCalendar( 'refetchEvents');
				}
				break;
			case 'invalid_query':
				$('#colorbox-content').html('<h4>There have been some issues in our server. Please try again</h4>');
				break;
			default : 
				closeColorbox_and_dispMsg();
				break;
		}
	});

	request.fail(function(jqXHR,textStatus,errorThrown)
	{
		$.fancybox.hideActivity();
	    closeColorbox_and_dispMsg();
	});
}

/************** Phase 2 script to send an reschedule request ********************/

function send_reschedule_request(sendData)
{
	var request= $.ajax(
				{
					url 		: baseurl+'inc/reschedule_appointment.php',
					type 		: "post",
					data 		: sendData,
					dataType 	: 'json'
				});

	request.done(function(data)
	{
		$.fancybox.hideActivity();

		switch(data.status)
		{
			case 'error':
				$.colorbox.close();
				show_message(data.message,'fail',6000);
				break;
			case 'invalid_service':
				display_appointment_serviceError();
				break;
			case 'invalid_date':
				display_appointment_dateError();
				break;
			case 'invalid_professional':
				display_appointment_professionalError();
				break;
			case 'invalid_contact':
				$('#appointment-request-errors').css('display','block');
				$('#app-request-contactError').html('Please select your location/contact details').css('display','block');
				break;
			case 'invalid_time':
				$('#appointment-request-errors').css('display','block');
				$('#app-requested-timeError').html('Please select a time slot').css('display','block');
				break;
			case 'false':
				alert('Session timed out');
				window.location.href=baseurl+'logout.php';
				break;
			case 'success':
				console.log('success');
				$.colorbox.close();
				
				show_message('<h4>'+data.message+'</h4> Please wait, you calendar will refresh automatically.','success',6000);

				if(data.detail==='my_appointments.php')
				{
					$('#calendar').fullCalendar( 'refetchEvents');
				}
				else if(data.detail==='admin/admin_dashboard.php')
				{
					$('#admin-calendar').fullCalendar( 'refetchEvents');
				}
				else if(data.detail==='internalUser/appointments.php')
				{
					$('#doctor-calendar').fullCalendar( 'refetchEvents');
				}
				break;
			case 'invalid_error':
				$('#appointment-request-errors').css('display','block');
				$('#app-request-patientError').html('There have been some issues in our server.Please try again').css('display','block');
				break;
			default :
				closeColorbox_and_dispMsg();
				break;
		}
	});

	request.fail(function(jqXHR,textStatus,errorThrown)
	{
		$.fancybox.hideActivity();
	    closeColorbox_and_dispMsg();
	});
}


function check_email_validity(email)
{
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

	return pattern.test(email);
}


/********** phase 2 function to obtain the contact details	***************/

function get_contact_details()
{
	//whenever the value of service type changes, empty the contact/location details
	$('#app-request-contactDetails').html('<option>Select Location/Contact Details</option>');

	var service=$('#app-requested-service').val();
	var patient=$('#internalUser_patientInfo').val();

	//check whether a valid service type is selected
	if(service==='Select Service Type')
	{
		display_appointment_serviceError();	//function to display the 'service type not selected' error
	}
	else
	{
		$.fancybox.showActivity();

		data='serviceType='+service;
		if(typeof patient !=='undefined')	//	This will be undefined in all cases expect when the appointment form is accessed from doctor or admin calendar.
		{
			data+='&patient_id='+patient;
		}

		//Service type is selected, so clear out the service type error and hide it.
		$('#app-requested-serviceError').html('').css('display','none');
		display_errors();	//function which checks whether there are other errors displayed

		$.ajax({
			url: baseurl+'inc/change_contactDetails.php',
			type: 'post',
			data: data,
			dataType : 'json',
			error : function(jhr)
	    	{
	    		$.fancybox.hideActivity();
	    		show_message('An unexpected error occured while processing your request. Please try again.','fail',6000);
	    	},
			success:function(data)
			{
				$.fancybox.hideActivity();

				if(data.status==='invalid_service') // the service type value is not POSTED
				{
					display_appointment_serviceError();
				}
				else if(data.status==='false') // There is no session available in the server side
				{
					alert('Session timed out');
					window.location.href=baseurl+'logout.php';
				}
				else if(data.status==='empty')	// There are no contact/location details stored in our database
				{
					$('#app-request-contactDetails').html('<option>Select Location/Contact Details</option>');
					$('#appointment-request-errors').css('display','block');
					$('#app-requested-serviceError').html('Your Contact/Location details are not found in our database').css('display','block');
					display_errors();
				}
				else if(data.status==='success')
				{
					// Success, everything went good, so display the options in the select box
					
					$('#app-request-contactDetails').html(data.details);
					var c=$('#app-request-contactDetails').val();
					if(c!=='' && c!=='Select Location/Contact Details')
					{
						$('#app-request-contactError').html('').css('display','none');
						display_errors();	
					}
				}
			}
		});
	}
}

/********** phase 2 function to check whether the date is in DD/MM/YYYY format	***************/

function check_date(date)
{
	var date_pattern=new RegExp(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/);
	return date_pattern.test(date);
}


/********** phase 2 function	***************/

function check_element_exists(current_element,no_of_files,consult_val)
{
	console.log(no_of_files);
	num=no_of_files+1;

	var next_element=$('#guardian1RelationshipFile_'+consult_val+'_'+(num));
	console.log(next_element);

	if(next_element.length !== 0)
	{
		check_element_exists(current_element,(num),consult_val);
	}
	n=num-1;
	return n;
}

/********** phase 2 function	***************/

function autosave()
{
	//console.log('Autosave called');

	var consult_ids=new Array();
	var cds=new Array();
	// var proceed=false;

	var length=0;
	var form_data= new FormData();

	$('.active-consultation-tab').each(function(index)
	{
		consult_ids.push($(this).val());
		length=index+1;
	});

	$('.active-cds-tab').each(function(index)
	{
		cds.push($(this).val());
	});

	if(length!==0 )
	{
		var serialized_data=$('.patient-tabs :visible .autosave').serialize();
		// console.log(serialized_data);

		form_data.append('active_consult_ids',JSON.stringify(consult_ids));
		form_data.append('active_cds',JSON.stringify(cds));

		for(i=0;i<length;i++)
		{
			$('input[name="guardian1RelationshipFile_'+consult_ids[i]+'[]"').each(function()
			{
				var id=$(this).attr('id');
				var f=$('#'+id)[0].files[0];

				if(typeof f !=='undefined')
				{
					if(check_file_type(f.name.toLowerCase()) && f.size < 2000000)
					{
						form_data.append('guardian1RelationshipFile_'+consult_ids[i]+'[]',f);
					}
				}
			});
		}

		var act_tab=$('.patient-tabs').filter(':visible').attr('id');
		form_data.append('serialized_data',serialized_data);
		form_data.append('act_tab',act_tab);
		form_data.append('autosave',true);
		form_data.append('ajax',true);
		$.fancybox.showActivity();
		$.ajax(
		{
			url 		: baseurl+'internalUser/doctor_consultationTab_processing.php',
			type 		: 'post',
			data 		: form_data,
			processData	: false,
			contentType	: false,
			dataType	: 'json',
       		error 		: function(jxhr)
       		{
       			$.fancybox.hideActivity();
       		},
       		success 	: function(data)
       		{
       			// console.log(data);
       			$.fancybox.hideActivity();
       			
				if(data.status==='invalid_user')
				{
					show_message_reload(data.message+'<p> Note: You will be redirected to the login page in <span class="sMsg_countown">6</span> second(s)</p>','fail','logout.php',6);
				}
				else if(data.status==='error')
				{
					show_message(data.message,'fail');
				}
				else if(data.status==='success')
				{
					$('input,textarea,select').removeClass('autosave');
					show_message('Auto Saved.','success');
					append_files(data,length,consult_ids);
					$(".iframe").colorbox({iframe:true, width:"100%", height:"100%"});
				}

    //    			if(data.status==='false')
				// {
				// 	alert('Session timed out. Please log in to continue');
				// 	window.location.href=baseurl+'logout.php';
				// }
				// else if(data.status==='invalid_user')
				// {
				// 	alert('You don\'t have access privilege to perform this action.');
				// 	window.location.href=baseurl+'logout.php';
				// }
				// else if(data.status==='invalid_data')
				// {
				// 	show_message('There are some issues with the data which you have provided. Please provide the correct details and continue.','fail');
				// }
				// else if(data.status==='invalid_cons')
				// {
				// 	show_message('You don\'t have any pending consultation to save .','fail');
				// }
				// else if(data.status==='success')
				// {
				// 	$('input,textarea,select').removeClass('autosave');
				// 	show_message('Auto Saved.','success');
				// 	append_files(data,length,consult_ids);
				// 	$(".iframe").colorbox({iframe:true, width:"100%", height:"100%"});
				// }
       		}
		});
	}
}

function closeColorbox_and_dispMsg()
{
	$.colorbox.close();
	show_message('An unexpected error occurred while processing your request. Please try again.','fail',6000);
}

function pingDB(consultation, cds)
{
	//$.fancybox.showActivity();
	$.ajax({
		url 		: baseurl+'internalUser/ping_db.php',
		type 		: 'post',
		data 		: 'ajax='+true+'&active_consult='+consultation+'&cds='+encodeURIComponent(cds),
   		error 		: function(jxhr)
   		{
   			//$.fancybox.hideActivity();
   			console.log('Ping failed');
   		},
   		success 	: function(data)
   		{
   			console.log('pinged');
   			console.log(data);
   		}
	});
}

function append_files(data,length,consult_ids)
{
	var arr = $.map(data, function(el) { return el; });

	for(i=0;i<length;i++)
	{
		var file_names=arr[i].files_name;

		var file_paths=arr[i].files_path;

		var file_descriptions=arr[i].files_description;

		var j=$('input[name="guardian1RelationshipFile_'+consult_ids[i]+'[]"').closest('.outer').find('.files_start').first();
		var u=$('input[name="guardian1RelationshipFile_'+consult_ids[i]+'[]"').closest('.outer').find('.uploaded_files').first();

		$('input[name="guardian1RelationshipFile_'+consult_ids[i]+'[]"').each(function(index)
		{
			$(this).closest('.row').remove();
		});
		j.after('<div class="row">\
				<div class="five columns fileuploader"><input type="text" class="filename" placeholder="No file selected."/><input type="button" name="file" class="filebutton" value="Browse File" /><input class="small consultation_files" type="file" name="guardian1RelationshipFile_'+consult_ids[i]+'[]"  id="guardian1RelationshipFile_'+consult_ids[i]+'_1"/></div>\
				<div class="two columns">\
						<select id="docType" class="input-text small" size="1" name="docType_'+consult_ids[i]+'[]" title="DocumentType">\
						<option>Select File type</option>\
						<option>Medical</option>\
						<option>Non-Medical</option>\
						</select>\
					</div>\
				<div class="three columns"><input type="text" name="consultfileDescription_'+consult_ids[i]+'[]" id="consultfileDescription_'+consult_ids[i]+'_1" value="" placeholder="Enter a file description" class="input-text small"></div>\
				<div class="two columns">\
					<a href="#" title="Add" class="doctor-consultation-fileadd">\
						<img src="'+baseurl+'img/buttons_add.png" alt="Add" />\
					</a>\
					&nbsp;\
				</div>\
			</div>');

		var u_length=file_paths.length;

		for(k=0;k<u_length;k++)
		{
			u.append('<div class="row">\
						<div class="one columns"><img src="'+baseurl+'img/ico/icSw2/16-Folder.png" alt="Add" /></div>\
               			<div class="five columns">\
                			<a class="iframe" href="'+file_paths[k]+'" title="'+file_descriptions[k]+'">'+file_names[k]+'</a>\
                		</div>\
                		<div class="four columns">\
                			<a class="iframe internal_link" href="'+file_paths[k]+'" title="'+file_descriptions[k]+'">'+file_descriptions[k]+'</a>\
                		</div>\
                		<div class="two columns">\
                			<a href="#" title="Delete" class="delete_uploaded_file">\
                				<img src="'+baseurl+'img/ico/icSw2/16-Trashcan.png" alt="Delete" />\
                			</a>\
                		</div>\
                	</div>');
		}
	}
}

/********** phase 2 function	***************/

function attach_file_names()
{
	$('input[type="file"]').change(function() 
	{
		var val = ( typeof $(this).val() !== "undefined") ? $(this).val() : "Attach a file.";
		$(this).closest('.fileuploader').find('.filename').attr('value', val);
	});
}

function refresh_tab(tab)
{
	$.fancybox.showActivity();
	return $.ajax({
		url : baseurl+'inc/get_tab_content.php',
		type: 'post',
		data: 'tab='+tab
	});
}

/********** phase 2 function	***************/

function check_file_type(val)
{
	var file_regex=new RegExp("(.*?)\.(doc|docx|pdf|jpg|jpeg|png|txt|gif|bmp|xls|xlsx|txt|csv)$")

	if(val!=='')
	{
		return file_regex.test(val) ;
	}
	return false;
}

/********** phase 2 function	***************/

function load_resources()
{
	$('.date-pick').datePicker({startDate:'01/01/1900',clickInput:false});
	prth_common.init();
	$(".iframe").colorbox({iframe:true, width:"100%", height:"100%"});
	$(".inline").colorbox({inline:true, width:"100%"});
	prth_editor.html();
	prth_textarea_auto.init();
}

/********** phase 2 function	***************/

function current_time(secStatus)
{
	var Digital=new Date();
	var hours=Digital.getHours();
	var minutes=Digital.getMinutes();
	var seconds=Digital.getSeconds();
	var dn="PM";
	if (hours<12)
		dn="AM";
	if (hours>12)
		hours=hours-12;
	if (hours==0)
		hours=12;
	if (minutes<=9)
		minutes="0"+minutes;
	if (seconds<=9)
		seconds="0"+seconds;
	if(secStatus)
	{
		var ctime=hours+":"+minutes+":"+seconds+" "+dn;
	}
	else
	{
		var ctime=hours+":"+minutes+" "+dn;
	}
	return ctime;
}

function process_enrolment_step(current_step)
{
  // console.time('Step '+current_step);
  $.fancybox.showActivity();
  $('#simple_wizard').stepy('step',current_step);
  var data= disable_others_get_data(current_step);
  var url= baseurl+'save-child-form.php';

  // console.log(data);
	$.post(url,data,function(res)
	{
		$.fancybox.hideActivity();
		window.result = res;
		if(res == "nosession")
		{
			show_message_reload('Session timed out. Please log in to continue.<p> Note: You will be redirected to the login page in <span class="sMsg_countown">6</span> second(s)</p>','fail','logout.php',6);
		}
		else if(res==='success' || res === 'field_skipped')
		{
			// console.log(res);
			$('#simple_wizard').stepy('step', current_step+1);
		}
	});

   // console.timeEnd('Step '+current_step);
}


/********** phase 2 function	***************/

function removeOrAddDetails(fieldObject)
{
  var x=$('#'+fieldObject.fieldToCheck).val();
  if(fieldObject.fieldText==='' && fieldObject.textContent==='')
  {
    if(x===fieldObject.fieldValue)
    {
      $('#'+fieldObject.fieldDesc).html('');
    }
    else
    {
      $('#'+fieldObject.fieldDesc).html(fieldObject.textDescription).show('slow');
    }
  }
  else
  {
    if(x===fieldObject.fieldValue)
    {
      $('#'+fieldObject.fieldText).html('');
      $('#'+fieldObject.fieldDesc).html('');
    }
    else
    {
      $('#'+fieldObject.fieldText).html(fieldObject.textContent).show('slow');
      $('#'+fieldObject.fieldDesc).html(fieldObject.textDescription).show('slow');
    }
  }
}


/********** phase 2 function	***************/

function removeErrorFocus(fieldToCheck)
{
  var x=$('#'+fieldToCheck).val();
  if(x!=='')
  {
    $('#'+fieldToCheck).css('border-color','#bbb');
    $('#'+fieldToCheck).siblings('label.custom-error').remove();
  }
}

function check_payment_option()
{
	var p_opt=$('input:radio[name="default_radio"]').filter(':checked').val();
	if(p_opt==='insurance')
	{
		console.log(p_opt);
		return true;
	}
	return false;
}


function show_message_reload(message,classname,url,duration)
{
	var count = duration;
	countdown = setInterval(function()
	{
		if(count === duration)
		{
			$.showMessage({
				thisMessage			: [message],
				className			: classname,
				displayNavigation	: true,
                location			: 'top',
				autoClose			: true,
				delayTime			: 100000 //in miliseconds
			});
		}
		if(count === 0)
		{
			clearInterval(countdown);
			window.location.href=baseurl+url;
		}
		$(".sMsg_countown").html(count);
		count--;
	}, 1000);
}

function show_message(message,classname,timer)
{
	var delay= (typeof timer ==='undefined') ? 8000 : timer;
	$.showMessage({
		thisMessage			: [message],
		className			: classname,
		displayNavigation	: true,
        location			: 'top',
		autoClose			: true,
		delayTime			: delay //in miliseconds
	});
}

function display_timeInterval()
{
	// Empty the time interval drop down, each time a new professional is selected
		$('#app-form-appointmentTime').html('<option>Select Appointment time');

		var selected=$('#app-request-professionalList').val();
		var date=$('#appointment-requestDate').val();

		//check whether every necessary details are provided by the user and they are vaild
		if(selected!=='Select a Professional' && date!=='' && check_date(date))
		{
			$.fancybox.showActivity();

			// Everything is valid, so ensure that the possible error display related to this field is emptied out and hidden
			$('#app-request-professionalError').html('').css('display','none');
			$('#app-request-dateError').html('').css('display','none');
			display_errors();


			$.ajax({
				url: baseurl+'inc/display_timeInterval.php',
				type: 'post',
				data: "prof_id="+selected+"&date="+date,
				dataType: 'json',
				error : function(jhr)
		    	{
		    		$.fancybox.hideActivity();
		    		show_message('An unexpected error occured while processing your request. Please try again.','fail',6000);
		    	},
				success: function(data)
				{
					$.fancybox.hideActivity();
					
					if(data.status==='invalid_profId')	//the professional id is not posted
					{
						display_appointment_professionalError(); // function call to display 'professional not selected' error
					}
					else if(data.status==='invalid_date') // the date value is not posted
					{
						display_appointment_dateError(data.message); // function call to display the 'date not selected' error
					}
					else if(data.status==='false')	// session timed out in the sever side
					{
						alert('Session timed out');
						window.location.href=baseurl+'logout.php';
					}
					else if(data==='fail')
					{
						$('#app-form-appointmentTime').html('<option>Select Appointment time');
					}
					else if(data.status==='success')
					{
						//Everything went well, so display the time intervals in the time interval dropbox
						$('#app-form-appointmentTime').html(data.detail);
						$('#app-requested-timeError').html('').css('display','none');
						display_errors();
					}
				}
			});
		}
		else
		{
			//Everthing is not provided by the user at this stage

			if(selected==='Select a Professional') // Checks whether professional is selected
			{
				display_appointment_professionalError();
			}
			else 	//professional is selected so clear out the professional error and hide it.
			{
				$('#app-request-professionalError').html('').css('display','none');
				display_errors();
			}

			if(date==='' || !check_date(date)) //check whether the date is provided and it is valid
			{
				display_appointment_dateError();
			}
			else
			{
				//date is provided and valid so clear out the date error

				$('#app-request-dateError').html('').css('display','none');
				display_errors();
			}
		}
}

/********** phase 2 function	***************/

function validate_date(date)
{
	var date_pattern=new RegExp(/^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
	return date_pattern.test(date);
}

/********** phase 2 function	***************/

function check_content()
{
	var p=$('#app-request-professionalError').html().trim();
	var d=$('#app-request-dateError').html().trim();
	var s=$('#app-requested-serviceError').html().trim();
	var pat=$('#app-request-patientError').html().trim();
	var c=$('#app-request-contactError').html().trim();
	var t=$('#app-requested-timeError').html().trim();

	if(p==='' && d==='' && s==='' && pat==='' && c==='' && t==='')
	{
		return true;
	}
	return false;
}

/********** phase 2 function	***************/

function display_errors()
{
	if(check_content())
	{
		$('#appointment-request-errors').css('display','none');
	}
}

/********** phase 2 function	***************/

function display_appointment_dateError(message)
{
	$('#appointment-request-errors').css('display','block');
	(typeof message !=='undefined') ? $('#app-request-dateError').html(message).css('display','block') : $('#app-request-dateError').html('Please provide a valid date to display the available time intervals').css('display','block');

	$('#app-form-appointmentTime').html('<option>Select Appointment time');
}

/********** phase 2 function	***************/

function display_appointment_professionalError()
{
	$('#appointment-request-errors').css('display','block');
	$('#app-request-professionalError').html('Please select a professional to make an appointment').css('display','block');

	$('#app-form-appointmentTime').html('<option>Select Appointment time');
}

/********** phase 2 function	***************/

function display_appointment_timeError()
{
	$('#appointment-request-errors').css('display','block');
	$('#app-request-professionalError').html('Please select a professional to display the time intervals').css('display','block');
}

function display_appointment_serviceError()
{
	$('#appointment-request-errors').css('display','block');
	$('#app-requested-serviceError').html('Please select a service type to display the contact/location details').css('display','block');
}

function enable_appointmentDatepicker()
{
	// $('.appointmentDate').datetimepicker({
	// 	showTimepicker: false,
	// 	dateFormat: 'yy-mm-dd',
	// 	onSelect: function(dateText)
	// 	{
	// 		//console.log('selected date is'+dateText);
	// 		display_timeInterval();
	// 	}
	// });
	$('.appointmentDate').datePicker({startDate:'01/01/1900',clickInput:false})
	.bind(
			'dateSelected',
			function(e, selectedDate,td)
			{
				display_timeInterval();
			}
		);
}




/******************************************************************************************************************************/

function validate_form_field(field)
{
	if(field.val().trim()=='')
	{
		return false
	}
	return true;
}

function validate_email(email)
{
	 var email_pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	 return email_pattern.test(email);
}

function validate_dob(dob)
{
	var dob_pattern=new RegExp(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/);
	return dob_pattern.test(dob);
}

function approve_referral()
{
	var selectedUser=$('input:checked').val();
	var email=document.getElementsByClassName('user_email')[0].innerHTML;
	var firstname=document.getElementsByClassName('user-firstname')[0].innerHTML;
	var lastname=document.getElementsByClassName('user-lastname')[0].innerHTML;
	var professional_id=$('#professional_id').html();

	console.log(selectedUser+' '+email+' '+firstname+' '+lastname+' '+professional_id);
	
	$('#user_content').html('<img src="../images/loading1.gif" alt="loading" />');
	$.ajax({
		url:baseurl+"admin/accept_referral.php",
		type:"post",
		data:"email="+email+"&selected_user="+selectedUser+"&firstname="+firstname+"&lastname="+lastname+"&professional_regId="+professional_id,
		success:function(data)
		{
			if(data=="invalid")
			{
				alert('Session timed out. Please login to perform this action');
				window.location.replace(baseurl+'internalUser/');
			}
			else
			{
				$('#user_content').html('<h3>'+data+'</h3>&nbsp; Please wait, the page will reload automatically or <span onclick="reload_page();" class="reload_link" >Click here</span>');
				setTimeout(function(){
					location.reload();
				},8000);
			}
		}
	});
}

function reject_referral()
{
	console.log('Rejected');
	var selectedUser=$('input:checked').val();
	var email=document.getElementsByClassName('user_email')[0].innerHTML;
	var reason=$('#reject-referral-textarea').val();
	var firstname=document.getElementsByClassName('user-firstname')[0].innerHTML;
	var lastname=document.getElementsByClassName('user-lastname')[0].innerHTML;
	if(reason!='')
	{
		$('#user_content').html('<img src="../images/loading1.gif" alt="loading" />');
		$.ajax({
			url:baseurl+"admin/reject_referral.php",
			type:"post",
			data:"reason="+reason+"&email="+email+"&selected_user="+selectedUser+"&firstname="+firstname+"&lastname="+lastname,
			success:function(data)
			{
				if(data=='invalid')
				{
					alert('Session timed out. Please login to perform this action');
					window.location.replace(baseurl+'internalUser/');
				}
				else
				{
					$('#user_content').html('<h3>'+data+'&nbsp;Please wait,the page will be reloaded automatically or <span onclick="reload_page();" class="reload_link" >Click here</span></h3>');
					setTimeout(function(){location.reload();},8000);
				}
			}
		});	
	}
	else
	{
		alert('Please indicate the reason for rejection');
	}
}

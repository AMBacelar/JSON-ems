
/* global $ */

(function(window, document) {
	'use strict';
	
	var dataCaptured = {};
	
	var pages = [];
	
	var ListData = [];
	
	var currPage = 0;
	
	
	
	// getting the data for a test view of this SPA
	$.getJSON( "taskTwo.json", function( data ) {
		// Write the data into our global variable.
		pages = data;
		// Manually trigger a hashchange to start the app.
		$(window).trigger('hashchange');
	});
	
	function initialize() {
		var guestListData = [
			{
				'name': 'John Jameson',
			},
			{
				'name': 'Sam Stuarts',
				'customerID': 'hyul765fjuf35hf8'
			},
			{
				'name': 'Matt Michaels',
				'email': 'matt@example.com',
				'customerID': 'iu7ytgfrde45tghy'
			}
		];
		
		ListData = guestListData;
		window.location.hash = "A";

		// write your code for task one here...
	}

	function taskTwo() {
		// write your code for task two here...
	}
	
	$(window).on('hashchange', function(){
		// On every hash change the render function is called with the new hash.
		// This is how the navigation of our app happens.
		render(decodeURI(window.location.hash));
	});
	
	
	
	
	function render(url) {

		// Get the page ID from the url.
		var temp = url.split('/')[0];

		// Hide whatever page is currently shown.
		$('.main-content .page').removeClass('visible');
		
		var index = url.split('#')[1].trim();
		
		console.log(dataCaptured);
		
		for (var i = 0; i < pages.length; i++) {
			if(pages[i].id == index) {
				currPage = i;
				var desiredPageType = pages[currPage].type;
				console.log(desiredPageType);
			}
		}
		console.log(pages[currPage].id);

		var map = {
			
			
			'Branding': function() {
				console.log("Branding Page");
				renderBranding(index, pages);
			},
			'GuestList': function() {
				console.log("Guest List");
				renderGuestList(index, pages, ListData);
			},
			'DataCapture': function() {
				console.log("Data Capture");
				// Get the index of which page we want to show and call the appropriate function.
				renderDataCapture(index, pages, ListData);
			},
			'InstantWinner': function() {
				
				console.log("Instant Win");
				// Get the index of which page we want to show and call the appropriate function.
				window.AkkrooAPI.generateVoucherCode(dataCaptured.name, function(code) {
					console.log('Example voucher code: ', code);
					if(code == null) {
						dataCaptured.isWinner = false;
					} else {
						dataCaptured.isWinner = true;
						dataCaptured.voucherCode = code;
					}
					console.log(dataCaptured);
				});
				// DO STUFF THEN GO NEXT
				window.location.hash = pages[currPage].next;
			},
			'Conditional': function() {
				console.log("Conditional");
				// DO STUFF THEN GO NEXT
				
				console.log(pages[currPage].checks.conditionalA[0]);
				var conditional = pages[currPage].checks.conditionalA[0];
				
				console.log(dataCaptured);
				
				console.log(dataCaptured[conditional] + " has to equal " + pages[currPage].checks.equalTo);
				
				checkConditional(dataCaptured[conditional], pages[currPage].checks.equalTo, pages[currPage].checks.then, pages[currPage].checks.else);
			},
			'MailDispatch': function() {
				
				function emailCallback(a) {
						if(a) {
							console.log(a);
							dataCaptured.sentEmail = true;
						} else {
						dataCaptured.sentEmail = false;
						}
					}

				// Get the index of which page we want to show and call the appropriate function.
				console.log("Mail Dispatch");
				
				if(pages[currPage].attrs.requireOptIn == "true") {
					if(dataCaptured.optIn == true) {
						console.log("API call please.");
						window.AkkrooAPI.sendEmail(dataCaptured.email, pages[currPage].attrs.templateName,dataCaptured, emailCallback);
					} 
				} else {
					console.log("API call please.");
					window.AkkrooAPI.sendEmail(dataCaptured.email, pages[currPage].attrs.templateName,dataCaptured, emailCallback);
				}	
				
				
				console.log(dataCaptured);

				// DO STUFF THEN GO NEXT
				window.location.hash = pages[currPage].next;
			},
			'Thanks': function() {

				// Get the index of which page we want to show and call the appropriate function.
				console.log("Thank You");

				renderThanksPage(index, pages);
			},
			'Save': function() {

				// Get the index of which page we want to show and call the appropriate function.
				console.log("Saving");
				for(key in dataCaptured) {
					console.log(key + ':' + dataCaptured[key]);
				}
				// try {
				// 	window.taskOne.validate(pages[currPage].id, dataCaptured);
				// } catch (e) {
				// 	console.error(e);
				// }
				window.location.hash = pages[currPage].next;

				// DO STUFF THEN GO NEXT
			},
			'Reset': function() {

				// Get the index of which page we want to show and call the appropriate function.
				console.log("Reset");
				dataCaptured = {};
				initialize();

				// DO STUFF THEN GO TO BEGINING
			}
		};
		for(var key in map) {
			if(key == desiredPageType) {
				map[key]();
			}
		}
	}
	function renderBranding(index, data){
		// Shows the Page with appropriate data.
		var page = $('.branding'),
			container = $('#branding');
		// Show the page.
		page.addClass('visible');
		
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					if(item.attrs.brandingImage){
						container.append('<img src="'+item.attrs.brandingImage+'">');
					}
				}
			});
		}
		$( "img" ).click(function() {
			container.empty();
			window.location.hash = pages[currPage].next;
		});
		
	}
	function renderGuestList(index, data, guestList){
		// Shows the Page with appropriate data.
		var page = $('.guest-list'),
			container = $('#guest-list');
		
		if(data.length){
			guestList.forEach(function (item) {
					// Populate '.guest-list-view' with the chosen pages's data.
					container.append("<li>"+item.name+"</li>");
			});
		}
		$( "li" ).click(function() {
				dataCaptured.name = $( this ).text();
				console.log(index);
				container.empty();
				window.location.hash = pages[currPage].next;
			});

		// Show the page.
		page.addClass('visible');
		
		}

	(function ($) {
	   $.fn.formToArray = function () {
	   var data = $(this).serializeArray();
		$("form input:checkbox").each(function () { 
	        data.push({ name: this.name, value: this.checked });
	    });
	    	return data;
		};
	})(jQuery);
		
		
	function renderDataCapture(index, data, guestList){
		// Shows the Page with appropriate data.
		var page = $('.data-capture'),
			container = $('#data-capture');
			
		if(ListData){
			for(var i = 0; i < ListData.length; i++) {
				if (ListData[i].name == dataCaptured.name) {
					if(ListData[i].customerID) {
						dataCaptured.customerID = ListData[i].customerID;
					}
					if(ListData[i].email) {
						dataCaptured.email = ListData[i].email;
					}
				}
			}
		}
		ListData = null;
		
		
		
		// Find the wanted page by iterating the data object and searching for the chosen index.
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					
					for(var i = 0; i < item.attrs.questions.length; i++) {
						
						if(item.attrs.questions[i].type == "select"){
							
							container.append('<label>'+item.attrs.questions[i].id+'</label>');
							container.append('<select id="'+item.attrs.questions[i].id +'" name="'+ item.attrs.questions[i].id +'">');
							
							for(var y = 0; y<item.attrs.questions[i].options.length;y++) {
								$('#'+item.attrs.questions[i].id).append($('<option>', {
									value: item.attrs.questions[i].options[y],
									text: item.attrs.questions[i].options[y]
								}));
							}
							container.after("</select>");
							console.log($('#data-capture').HTML);
							
						} else if(item.attrs.questions[i].id == "customerID") {
							container.append('<label>'+item.attrs.questions[i].id+'</label>');
							container.append('<input type= "'+item.attrs.questions[i].type+'" name="'+ item.attrs.questions[i].id +'"readonly>');
						} else if(item.attrs.questions[i].type == "checkbox") {
							container.append('<label>'+item.attrs.questions[i].id+'</label>');
							container.append('<input type= "'+item.attrs.questions[i].type+'" name="'+ item.attrs.questions[i].id +'" value=true>');
						} else {
						
						container.append('<label>'+item.attrs.questions[i].id+'</label>');
						container.append('<input type= "'+item.attrs.questions[i].type+'" name="'+ item.attrs.questions[i].id +'">');
						
						}
					}
					
					var inputFields = $( ":input");
					for(var x = 0; x < inputFields.length; x++) {
						// console.log(inputFields[x].name);
						var temp = inputFields[x].name;
						for(var key in dataCaptured) {
							if(key == temp){
								$('input[name='+temp+']').val(dataCaptured[key]);
							}
						}
					}
					
					container.append('<button type="submit" class="submit">Submit</button>');
					
					$( "form" ).submit(function( event ) {
					  console.log("submit pressed");
					  var formContents = $(this).formToArray();
					  console.log(formContents);
					  event.preventDefault();
					  
						if(formContents){
							for(var i=0; i < formContents.length; i++) {
							    item = formContents[i];
							    dataCaptured[item.name] = item.value;
							    if(item.value == "true") {
							    	dataCaptured[item.name] = true;
							    	console.log(dataCaptured[item.name]);
							    }
							}
						}
						container.empty();
						window.location.hash = pages[currPage].next;
					});
				}
			});
		}

		// Show the page.
		page.addClass('visible');
	}
	function renderThanksPage(index, data){
		// Shows the Page with appropriate data.
		var page = $('.thanks'),
			container = $('#thanks');
		// Show the page.
		page.addClass('visible');
		
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					if(item.attrs.message){
						container.append('<h1>'+item.attrs.message+'</h1>');
					}
				}
			});
		}
		$( "h1" ).click(function() {
			container.empty();
			window.location.hash = pages[currPage].next;
		});
	}
	
	function checkConditional(conditionalA, conditionalB, ifTrue, ifFalse) {
		if(conditionalA == conditionalB) {
			window.location.hash = pages[currPage].checks.then;
		} else {
			window.location.hash = pages[currPage].checks.else;
		}
	}
	
	function renderErrorPage(){
		// Shows the error page.
	}
	
	
	window.onload = function() {
		// open task_1_validator.js, task_2_validator.js and akkroo_api.js to understand the below:

		// this is how you would call the 'APIs'
		console.log('Demonstrating call to example APIs:');
		window.AkkrooAPI.generateVoucherCode('Alan Adams', function(code) {
			console.log('Example voucher code: ', code);
		});

		// run your tasks
		
		initialize();
		taskTwo();
	};

}(window, document));

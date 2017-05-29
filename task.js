 /* global $ */

(function(window, document) {
	'use strict';
	
	var dataCaptured = {};
	
	var pages = [];
	
	var ListData = [];
	
	
	
	// getting the data for a test view of this SPA
	$.getJSON( "process_definition.json", function( data ) {
		// Write the data into our global variable.
		pages = data;
		
		// console.log(pages); 
		// Manually trigger a hashchange to start the app.
		$(window).trigger('hashchange');
		
		taskOne();
	});
	
	function taskOne() {
		var guestListData = [
			{
				'name': 'John Jameson',
			},
			{
				'name': 'Sam Stuarts',
				'customerID': 'VAL3MK0r'
			},
			{
				'name': 'Matt Michaels',
				'email': 'matt@example.com',
				'customerID': 'ABoV42g7'
			}
		];
		
		ListData = guestListData;
		
		
		renderGuestList("0",pages, ListData);

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
		var desiredPageType = pages[index].type;
		console.log(temp);
		

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
				renderDataCapture(index, pages);
			},
			'InstantWinner': function() {
				
				console.log("Instant Win");

				// Get the index of which page we want to show and call the appropriate function.
				

				// DO STUFF THEN GO NEXT
			},
			'Conditional': function() {

				// Get the index of which page we want to show and call the appropriate function.
				console.log("Conditional");

				// DO STUFF THEN GO NEXT
			},
			'MailDispatch': function() {

				// Get the index of which page we want to show and call the appropriate function.
				console.log("Mail Dispatch");

				// DO STUFF THEN GO NEXT
			},
			'Thanks': function() {

				// Get the index of which page we want to show and call the appropriate function.
				console.log("Thank You");

				renderThanksPage(index, pages);
			},
			'Save': function() {

				// Get the index of which page we want to show and call the appropriate function.
				console.log("Saving");

				// DO STUFF THEN GO NEXT
			},
			'Reset': function() {

				// Get the index of which page we want to show and call the appropriate function.
				console.log("Reset");

				// DO STUFF THEN GO TO BEGINING
			}
		};
		for(var key in map) {
			if(key == desiredPageType) {
				map[key]();
			}
		}
	}
	function renderBranding(index, data, guestList){
		// Shows the Page with appropriate data.
		var page = $('.guest-list'),
			container = $('#guest-list');

		// Find the wanted page by iterating the data object and searching for the chosen index.
		if(data.length){
			guestList.forEach(function (item) {
					// Populate '.guest-list-view' with the chosen pages's data.
					console.log(item);
					container.append("<li>"+item.name+"</li>");
			});
		}

		// Show the page.
		page.addClass('visible');
	}
	function renderGuestList(index, data, guestList){
		// Shows the Page with appropriate data.
		var page = $('.guest-list'),
			container = $('#guest-list');

		// Find the wanted page by iterating the data object and searching for the chosen index.
		if(data.length){
			guestList.forEach(function (item) {
					// Populate '.guest-list-view' with the chosen pages's data.
					// console.log(item);
					container.append("<li>"+item.name+"</li>");
			});
		}

		// Show the page.
		page.addClass('visible');
	}
	function renderDataCapture(index, data){
		// Shows the Page with appropriate data.
		var page = $('.data-capture'),
			container = $('#data-capture');
			

		// Find the wanted page by iterating the data object and searching for the chosen index.
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					
					console.log(item);
					for(var i = 0; i < item.attrs.questions.length; i++) {
						
						if(item.attrs.questions[i].type == "select"){
							
							container.append('<label>'+item.attrs.questions[i].id+'</label>');
							container.append('<select id="'+item.attrs.questions[i].id +'" name="'+ item.attrs.questions[i].id +'">');
							
							
							for(var y = 0; y<item.attrs.questions[i].options.length;y++) {
								// container.append('<option value="'+item.attrs.questions[i].options[y]+'">'+item.attrs.questions[i].options[y]+'</option>');
								$('#'+item.attrs.questions[i].id).append($('<option>', {
									value: item.attrs.questions[i].options[y],
									text: item.attrs.questions[i].options[y]
								}));
							}
							container.after("</select>");
							console.log($('#data-capture').HTML);
							
						} else {
						
						container.append('<label>'+item.attrs.questions[i].id+'</label>');
						container.append('<input type= "'+item.attrs.questions[i].type+'" name="'+ item.attrs.questions[i].id +'">');
						console.log(item.attrs.questions[i].id);
						}
					}
					container.append('<button type="submit">Submit</button>');
				}
			});
		}

		// Show the page.
		page.addClass('visible');
	}
	function renderThanksPage(index, data){
		// Shows the Page with appropriate data.
	}
	
	function renderErrorPage(){
		// Shows the error page.
	}
	
	
	window.onload = function() {
		// open task_1_validator.js, task_2_validator.js and akkroo_api.js to understand the below:

		// this is how you use our assertions to figure out if your code is solving the problem...
		console.log('Demonstrating how to call assert for each step:');
		window.taskOne.validate('exampleAssertPass', {some: 'data'});
		try {
			window.taskOne.validate('exampleAssertFail', {some: 'data'});
		} catch (e) {
			console.error(e);
		}

		// this is how you would call the 'APIs'
		console.log('Demonstrating call to example APIs:');
		window.AkkrooAPI.generateVoucherCode('Alan Adams', function(code) {
			console.log('Example voucher code: ', code);
		});

		// run your tasks
		
		taskOne();
		taskTwo();
	};

}(window, document));

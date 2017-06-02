(function(window) {
	window.taskTwo = window.taskTwo || {};

	function validate(componentID, data) {
		var assertEquals = function(predicate, message) {
			if (!predicate) {
				throw new Error(message);
			}
		};

		if (data.name === 'Alan Adams') {
			switch(componentID) {
			case 'B':
				assertEquals(data.name === 'Alan Adams', 'Expected user to enter Alan Adams as a name');
				break;
			case 'C':
				assertEquals(data.isWinner === true, 'Expected Alan Adams to win');
				break;
			case 'E':
				assertEquals(data.email === 'alan@example.com', 'Expect Alan Adams to enter alan@example.com as an email address');
				break;
			case 'F':
				assertEquals(data.voucherCode === '8hgskidjhyejdnh7', 'Expected voucher code to be 8hgskidjhyejdnh7');
				break;
			case 'H':
				assertEquals(data === {}, 'Expected data to be an empty object');
				break;
			case 'I':
				throw new Error('ComponentID I should not be called in this example');
				break;
			case 'X':
				assertEquals(data.name === 'Alan Adams', 'Expected user to enter Alan Adams as a name');
				assertEquals(data.isWinner === true, 'Expected Alan Adams to win');
				assertEquals(data.email === 'alan@example.com', 'Expect Alan Adams to enter alan@example.com as an email address');
				assertEquals(data.voucherCode === '8hgskidjhyejdnh7', 'Expected voucher code to be 8hgskidjhyejdnh7');
				break;
			}
		} else if (data.name === 'Dennis Davids') {
			switch(componentID) {
			case 'B':
				assertEquals(data.name === 'Dennis Davids', 'Expected user to enter Dennis Davids as a name');
				break;
			case 'C':
				assertEquals(data.isWinner === false, 'Expected Dennis Davids to lose');
				break;
			case 'E':
				throw new Error('ComponentID E should not be called in this example');
				break;
			case 'F':
				throw new Error('ComponentID F should not be called in this example');
				break;
			case 'H':
				assertEquals(data === {}, 'Expected data to be an empty object');
				break;
			case 'I':
				assertEquals(data.email === 'dennis@example.com', 'Expect Dennis Davids to enter dennis@example.com as an email address');
				break;
			case 'X':
				assertEquals(data.name === 'Dennis Davids', 'Expected user to enter Dennis Davids as a name');
				assertEquals(data.isWinner === false, 'Expected Dennis Davids to lose');
				assertEquals(data.email === 'dennis@example.com', 'Expect Dennis Davids to enter dennis@example.com as an email address');
				break;

			}
		}
		return true;
	}

	window.taskTwo.validate = validate;
}(window));

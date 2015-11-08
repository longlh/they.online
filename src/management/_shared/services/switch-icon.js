'use strict';

require('..').factory('shared.services.switch-icon', function() {
	return {
		save: function(status) {
			var icon = 'save';

			switch (status) {
				case 'processing':
					icon = 'autorenew';
					break;

				case 'success':
					icon = 'done';
					break;

				case 'error':
					icon = 'error';
					break;

				default:
					icon = 'save';
			}

			return icon;
		}
	};
});

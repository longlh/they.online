'use strict';

they.online.factory('/services/http', [
	'@promise',
	function(Promise) {
		console.log(Promise);

		return {
			get: function(url) {
				var defer = Promise.defer();

				var xhr = new XMLHttpRequest();

				xhr.onreadystatechange = function() {
					if (xhr.readyState < 4) {
						return;
					}

					if (xhr.status === 200) {
						return defer.resolve(xhr.responseText);
					}

					return defer.reject(xhr.status);
				};

				xhr.open('get', url, true);
				xhr.send();

				return defer.promise;
			}
		};
	}
]);


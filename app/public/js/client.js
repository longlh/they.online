;(function(exports) {
	'use strict';

	var agent;
	var messageList;
	var input;
	var form;
	var container;
	var notification;
	var hidden = false;
	var unread = 0;

	function injectStyle(host) {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = host + '/build/css/client.css';

		document.body.appendChild(link);
	}

	function ui(header, messageList, form) {
		container = document.createElement('div');

		container.className = 'easychat-client';

		container.appendChild(header);

		container.appendChild(messageList);

		container.appendChild(form);

		document.body.appendChild(container);
	}

	function createHeader() {
		var header = document.createElement('div');
		header.className = 'easychat-client-header';

		header.onclick = function(event) {
			event.preventDefault();
			event.stopPropagation();

			hidden = !hidden;

			// toggle dispay
			if (hidden) {
				container.classList.add('hidden');
			} else {
				container.classList.remove('hidden');
				unread = 0;
				updateUnread();
			}
		};

		notification = document.createElement('div');
		notification.className = 'easychat-client-unread';

		header.appendChild(notification);

		var text = document.createElement('div');
		text.innerHTML = '<span>They <span class="text-color-success">Online</span></span>';
		header.appendChild(text);

		return header;
	}

	function createForm() {
		form = document.createElement('form');
		form.className = 'easychat-client-input';

		input = document.createElement('input');
		input.type = 'text';
		input.placeholder = 'Enter message to chat...';

		form.appendChild(input);

		return form;
	}

	function createMessageList() {
		messageList = document.createElement('div');
		messageList.className = 'easychat-client-message-list';

		return messageList;
	}

	function appendMessage(data) {
		var message = document.createElement('div');
		message.className = 'easychat-message';

		var content = document.createElement('div');
		content.className = 'easychat-message-content' +
				(data.visitor === data.from ? ' self' : '');

		var text = document.createTextNode(data.chat);

		content.appendChild(text);
		message.appendChild(content);

		messageList.appendChild(message);

		// scroll to newest message
		messageList.scrollTop = messageList.scrollHeight;

		// update unread
		if (hidden) {
			unread++;
			updateUnread();
		}
	}

	function updateUnread() {
		notification.innerHTML = unread ? unread : '';
	}

	function requestAgent(socket, tenant) {
		// clear previous agent information
		agent = undefined;

		socket.emit('command', {
			code: 'visitor:online',
			data: {
				visitor: localStorage.visitor,
				tenant: tenant
			}
		});
	}

	function connect(socket, tenant) {
		socket.on('connect', function() {
			if (!localStorage.visitor) {
				localStorage.visitor = Date.now();
			}

			requestAgent(socket, tenant);
		});

		socket.on('command', function(command) {
			if (command.code === 'chat:bound') {
				appendMessage(command.data);
			} else if (command.code === 'agent:offline') {
				console.log('Agent [' + agent + '] offline');

				requestAgent(socket, tenant);
			} else if (command.code === 'agent:online') {
				console.log('Connected with Agent [' + command.data.agent + ']');

				agent = command.data.agent;
			}
		});

		form.onsubmit = function(event) {
			event.preventDefault();

			var message = input.value;

			if (!message) {
				return;
			}

			socket.emit('command', {
				code: 'chat',
				data: {
					visitor: localStorage.visitor,
					tenant: tenant,
					agent: agent,
					chat: message,
					from: localStorage.visitor
				}
			});

			input.value = '';
		}
	}

	exports.they = {
		online: function(host, tenant) {
			injectStyle(host);

			ui(createHeader(), createMessageList(), createForm());

			updateUnread();

			connect(io(host), tenant);
		}
	};
})(window);

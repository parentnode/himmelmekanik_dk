Util.Objects["cookies"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));
		}

		scene.scrolled = function() {
//			u.bug("scene.scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));
			console.log("hello");

			// Check if cookie has been accepted
			var button = u.qs('.button');
			button.addEventListener("click", function() {
				window.localStorage.cookie_accept = true;
				if (location.href.match(/cookies_en/)) {
					location.href = "/en";
				}
				else {
					location.href = "/";
				}
			});

		}

		// scene is ready
		scene.ready();
	}
}

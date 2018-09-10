Util.Objects["letter"] = new function() {
	this.init = function(div) {

		div.resized = function(event) {
			// u.bug("div.resized:", this);

			// If letter exists and it is active (shown or partially shown)
			if(this.is_active) {

				// Adjust top padding
				if(this.h1) {
					u.ass(this, {
						paddingTop: ((page.browser_h - this.h1.offsetHeight) / 2) / 1.8 +"px",
					});
				}

			}

		}

		// Scene scrolled
		div.scrolled = function(event) {
 			// u.bug("div.scrolled:", this);

			if(this.is_active) {

				// still front nodes - reveal as scrolled into view
				if(this.nodes.length > this.current_front_node_i) {

					// Next node in view
					if(this.nodes[this.current_front_node_i].offsetTop - page.browser_h < page.scroll_y) {

						this.current_front_node = this.nodes[this.current_front_node_i++];

						// Show node
						u.a.transition(this.current_front_node, "all 2s ease-in-out");
						u.ass(this.current_front_node, {
							opacity: 1,
							transform: "translate3D(0, 0, 0)"
						});

					}

				}

			}

		}

		// Scene is ready to be initialized
		div.ready = function() {
			// u.bug("div.ready:", this);

			// Avoid ever getting ready twice
			if(!this.is_ready) {

				this.is_ready = true;
				u.rc(this, "i:letter");


				// get reference to headline
				this.h1 = u.qs("h1", this);

				// get references to all text nodes (including h1)
				this.nodes = u.qsa("h1,p", this);

				// Hide all text nodes in article
				var i, node;
				for(i = 0; i < this.nodes.length; i++) {
					node = this.nodes[i];
					u.ass(node, {
						opacity: 0,
						transform: "translate3D(0, 15px, 0)"
					});
				}

				// Letter is now ready to be shown (content is hidden)
				u.ass(this, {
					opacity: 1,
				});


				// Re-calculate positions for letter
				this.resized();

			}

		}

		// Build Letter
		div.build = function() {
			u.bug("build letter");

			this.is_active = true;

			// recalculated top padding
			this.resized();

			// Show each text node as user scrolls down the page
			this.current_front_node_i = 0;
			// Map current show progress
			this.current_front_node = this.nodes[this.current_front_node_i++];

			// Show Headline
			u.a.transition(this.current_front_node, "all 2s ease-in-out");
			u.ass(this.current_front_node, {
				opacity: 1,
				transform: "translate3D(0, 0, 0)"
			});


			// Show 1st paragraph
			this.current_front_node = this.nodes[this.current_front_node_i++];
			u.a.transition(this.current_front_node, "all 2s ease-in-out " + 500 + "ms");
			u.ass(this.current_front_node, {
				opacity: 1,
				transform: "translate3d(0, 0, 0)"
			});

		}
		
		// Build Letter
		div.destroy = function() {

			this.is_done = true;

			// Let controller decide what to do
			page.cN.scene.controller();

		}

		// div is ready
		div.ready();
	}
}

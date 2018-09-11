Util.Objects["letter"] = new function() {
	this.init = function(div) {

		div.resized = function(event) {
			// u.bug("div.resized:", this);

			// If letter exists and it is active (shown or partially shown)
			if(this.is_active) {

				// Adjust top padding
				if(this.h1) {
					u.ass(this.wrapper, {
						paddingTop: ((page.browser_h - this.h1.offsetHeight) / 2) / 1.8 +"px",
					});
				}

				// Adjust bottom padding
				u.ass(this.wrapper, {
					"padding-bottom":page.browser_h + "px",
				});

			}

		}

		// Scene scrolled
		div.scrolled = function(event) {
 			u.bug("div.scrolled:", this);

			if(this.is_active) {

				// still front nodes - reveal as scrolled into view
				if(this.nodes.length > this.current_front_node_i) {

					// Next node in view
					if(this.nodes[this.current_front_node_i].offsetTop - page.browser_h < this.scrollTop) {

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

				u.rc(this, "i:letter");

				this.wrapper = u.wc(this, "div");

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

				// Preload cloud graphics
				u.preloader(this, [
					"/img/gx_cloud_front_left1.png", 
					"/img/gx_cloud_front_left2.png",
					"/img/gx_cloud_front1.png", 
					"/img/gx_cloud_front2.png", 
					"/img/gx_cloud_front3.png",
					"/img/gx_cloud_front_right1.png", 
					"/img/gx_cloud_front_right2.png",
					"/img/gx_cloud_mid1.png", 
					"/img/gx_cloud_mid2.png", 
					"/img/gx_cloud_mid3.png",
					"/img/gx_cloud_back1.png", 
					"/img/gx_cloud_back2.png", 
					"/img/gx_cloud_back3.png", 
					"/img/gx_cloud_back4.png"
				])



				// Letter is now ready to be shown (content is hidden)
				u.ass(this, {
					opacity: 1,
				});

				// Now we're ready to call the controller
				this.loaded = function (queue) {
					this.is_ready = true;
					page.cN.scene.controller();
				}
				




			}

		}

		// Build Letter
		div.build = function() {
			u.bug("build letter");

			this.is_active = true;

			// recalculated top padding
			this.resized();

			// set scroll handler
			u.e.addEvent(this, "scroll", this.scrolled);

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



			// Add clouds layers
			this.clouds_front = u.ae(this, "div", {
				"class":"clouds front",
			})

			this.clouds_mid = u.ae(this, "div", {
				"class":"clouds mid",
			})

			this.clouds_back = u.ae(this, "div", {
				"class":"clouds back",
			})

			u.ass(this.clouds_front, {
				"position":"absolute",
				"top":"0",
				"left":"0",
				"width":"100%",
				"height":(page.browser_h * 1.5) + "px",
				"z-index":"-10"
			});

			u.ass(this.clouds_mid, {
				"position":"absolute",
				"top":"0",
				"left":"0",
				"width":"100%",
				"height":(page.browser_h * 1.5) + "px",
				"z-index":"-20"
			});

			u.ass(this.clouds_back, {
				"position":"absolute",
				"top":"0",
				"left":"0",
				"width":"100%",
				"height":(page.browser_h * 1.5) + "px",
				"z-index":"-30"
			}) 
			
			
			// Using a loop, add single cloud divs with injected imgs to each layer depending on the height of the clouds layers, 
			// randomizing their position in three dimensions
			this.layer_names = ["front", "mid", "back"];
			this.clouds_gx = {
				"front":{
					"left":[
						"/img/gx_cloud_front_left1.png", 
						"/img/gx_cloud_front_left2.png"
					],
					"center":[
						"/img/gx_cloud_front1.png", 
						"/img/gx_cloud_front2.png", 
						"/img/gx_cloud_front3.png"],
					"right":[
						"/img/gx_cloud_front_right1.png", 
						"/img/gx_cloud_front_right2.png"
					],
				},
				"mid":[
					"/img/gx_cloud_mid1.png", 
					"/img/gx_cloud_mid2.png", 
					"/img/gx_cloud_mid3.png"],
				"back":[
					"/img/gx_cloud_back1.png", 
					"/img/gx_cloud_back2.png", 
					"/img/gx_cloud_back3.png", 
					"/img/gx_cloud_back4.png"]
			};

			var current_ypos = 0;
			var top_ypos = 125;
			var current_layer = "";
			var current_cloud_gx = [];
			var i = 0;

			// Left column loop
			current_ypos = top_ypos;

			//Denne kompleksitet er kun nødvendig i centerloopet. Til højre og venstre er kun frontlaget nødvendigt.
		/* 	while (current_ypos < this.clouds_front.offsetHeight) {
				current_layer = this.layer_names[Math.round(u.random(0,2))];
				current_layer_cloud_gx = this.clouds_gx[current_layer];

				if (current_layer == "front") {
					u.ae(this.clouds_front, "img", {
						"src":current_layer_cloud_gx.left[Math.round(u.random(0,current_layer_cloud_gx.left.length))]
					})
				}
				else if (current_layer == "mid") {
					u.ae(this.clouds_mid, "img", {
						"src":current_layer_cloud_gx[Math.round(u.random(0,current_layer_cloud_gx.length))]
					})
				}
				else if (current_layer == "back") {
					u.ae(this.clouds_back, "img", {
						"src":current_layer_cloud_gx[Math.round(u.random(0,current_layer_cloud_gx.length))]
					})
				}

				current_ypos = current_ypos + 200;
			} */
			
			// Right column loop
			current_ypos = top_ypos;
			while (current_ypos < this.clouds_front.offsetHeight) {
				current_layer = this.layer_names[Math.round(u.random(0,2))];
				current_ypos = current_ypos + 200;
			}

			// Center column loop
			current_ypos = top_ypos;
			for (i = 0; current_ypos < this.clouds_front.offsetHeight; i++) {
				current_layer = this.layer_names[Math.round(u.random(0,2))];
				current_layer_cloud_gx = this.clouds_gx[current_layer];

				if (current_layer == "front") {
					this["div_center_cloud_" + i] = u.ae(this.clouds_front, "div", {
						"class":"center cloud " + i,
					})

					u.ae(this["div_center_cloud_" + i], "img", {
						"src":current_layer_cloud_gx.center[Math.round(u.random(0,current_layer_cloud_gx.center.length-1))]
					})
					
				}
				else if (current_layer == "mid") {
					this["div_center_cloud_" + i] = u.ae(this.clouds_mid, "div", {
						"class":"center cloud " + i,
					})

					u.ae(this["div_center_cloud_" + i], "img", {
						"src":current_layer_cloud_gx[Math.round(u.random(0,current_layer_cloud_gx.length-1))]
					})
				}
				else if (current_layer == "back") {
					this["div_center_cloud_" + i] = u.ae(this.clouds_back, "div", {
						"class":"center cloud " + i,
					})

					u.ae(this["div_center_cloud_" + i], "img", {
						"src":current_layer_cloud_gx[Math.round(u.random(0,current_layer_cloud_gx.length-1))]
					})
				}
				
				console.log(this["div_center_cloud_" + i]);
				console.log(this["div_center_cloud_" + i].offsetHeight);
				// current_ypos = current_ypos + this["div_center_cloud_" + i].offsetHeight;
				u.ass(this["div_center_cloud_" + i], {
					"position":"absolute",
					"top":current_ypos + "px"
				})
				
				current_ypos = current_ypos + 200;
			}
			


			// Place the clouds and slide them in from the side (CSS transition)

			// Use scroll handler to move cloud layers with different speeds






		}
		
		// Destroy Letter
		div.destroy = function() {

			this.is_done = true;

			// Let controller decide what to do
			page.cN.scene.controller();

		}

		// div is ready
		div.ready();
	}
}

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
			// u.bug("div.scrolled:", this);

			if(this.is_active) {

				// still front nodes - reveal as scrolled into view
				if(this.nodes.length > this.current_front_node_i) {
					var delay;

					for(var i = this.current_front_node_i; i < this.nodes.length; i++) {
						// Next node in view
						// u.bug("NEW NODE ", i, this.nodes[i], event.timeStamp, "Offset ", this.nodes[i].offsetTop);
						if(this.nodes[i].offsetTop - page.browser_h + (page.browser_h * 0.25) < this.scrollTop) {
							// u.bug('offset', page.browser_h * 0.25);
							// u.bug("NODE ", i, "is shown");
							// this.current_front_node = this.nodes[this.current_front_node_i++];

								if(event.timeStamp - this.last_show_time < 1000) {
									delay = 1000 - (event.timeStamp - this.last_show_time);
									// u.bug("WITH A DELAY OF 1000ms - ", event.timeStamp, " - ", this.last_show_time, " = ", delay);
								}
								else {
									delay = 0;
									// u.bug("WITH A DELAY OF ", delay);
								}
								
								u.a.transition(this.nodes[i], "all 2s ease-in-out " + delay + "ms");
								u.ass(this.nodes[i], {
									opacity: 1,
									transform: "translate3D(0, 0, 0)"
								})
								this.last_show_time = event.timeStamp + delay;
								
								this.current_front_node_i++;
						}
					}

				}

				// "Parallax" scrolling of cloud layers
				this.clouds_front.style.top = -(this.scrollTop * 0.5) + "px";
				this.clouds_mid.style.top = -(this.scrollTop * 0.4) + "px";
				this.clouds_back.style.top = -(this.scrollTop * 0.3) + "px";

				// If side_a scrolled into view - draw the circle
				// if(this.side_a.offsetTop - page.browser_h < page.scroll_y) {

				// Calculate progress (number between 0 and 1)
				var total_scroll_height = (this.wrapper.offsetHeight - page.browser_h)
				// console.log(total_scroll_height);
				var progress = (total_scroll_height - (total_scroll_height - this.scrollTop)) / total_scroll_height
				
				if (progress >= 0.999) {
					progress = 1;						
				}
				// Mac backscroll draw fix
				if(progress < 0) { 
					progress = 0;
				}

				var current_degree = Math.PI * progress;


				// u.bug("progress:" + progress);
				// u.bug("current_degree:" + current_degree);


				// Clear canvas
				page.cN.scene.circle.ctx.clearRect(0, 0, page.browser_w, page.browser_h);

				// Draw outer circle
				page.cN.scene.circle.ctx.beginPath();
				page.cN.scene.circle.ctx.lineWidth = 4;
				page.cN.scene.circle.ctx.strokeStyle = "#f6d874";
				page.cN.scene.circle.ctx.arc(page.cN.scene.circle.center_x, page.cN.scene.circle.center_y, page.cN.scene.circle.radius, 0*Math.PI, progress*2*Math.PI);
				page.cN.scene.circle.ctx.stroke();
				page.cN.scene.circle.ctx.closePath();

				// The end is reached - full circle 
				if(progress >= 1) {

					// u.bug("ready to build SideA");
					this.destroy();
				}
			// }
			}
		}

		// Scene is ready to be initialized
		div.ready = function() {
			// u.bug("div.ready:", this);

			// Avoid ever getting ready twice
			if(!this.is_ready) {

				u.rc(this, "i:letter");

				this.wrapper = u.wc(this, "div");

				//get reference to language selector + links
				this.language_selector = u.qs("ul.language_selector")
				this.inactive_language = u.qs("ul.language_selector li.inactive.language");
				this.active_language = u.qs("ul.language_selector li.active.language");

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
					"/img/gx_cloud_front_left3.png",
					"/img/gx_cloud_front_left4.png",
					"/img/gx_cloud_front1.png", 
					"/img/gx_cloud_front2.png", 
					"/img/gx_cloud_front3.png",
					"/img/gx_cloud_front_right1.png", 
					"/img/gx_cloud_front_right2.png",
					"/img/gx_cloud_front_right3.png",
					"/img/gx_cloud_front_right4.png",
					"/img/gx_cloud_mid1.png", 
					"/img/gx_cloud_mid2.png", 
					"/img/gx_cloud_mid3.png",
					"/img/gx_cloud_back1.png", 
					"/img/gx_cloud_back2.png", 
					"/img/gx_cloud_back3.png", 
					"/img/gx_cloud_back4.png"
				])

				// Check if cookie has been accepted
				var cookie_notice = u.qs(".cookie-notice")
				if(typeof(window.localStorage) != "object" || !window.localStorage.cookie_accept) {
					var cookie_accept = u.qs('.cookie-accept');
					cookie_accept.addEventListener("click", function() {
						window.localStorage.cookie_accept = true;
						cookie_notice.style.display = 'none';
					});
				}
				else {
					cookie_notice.style.display = 'none';
				}

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
			// u.bug("build letter");

			this.is_active = true;

			// recalculated top padding
			this.resized();

			// set scroll handler
			u.e.addEvent(this, "scroll", this.scrolled);

			// Show each text node as user scrolls down the page
			this.current_front_node_i = 0;
			// Map current show progress
			this.current_front_node = this.nodes[this.current_front_node_i++];

			// Show language selector and setup hovering behavior
			u.a.transition(this.language_selector, "all 2s ease-in-out");
			u.ass(this.language_selector, {
				opacity: 1,
				transform: "translate3D(0, 0, 0)"
			});
			
			u.e.hover(this.inactive_language);
			
			this.inactive_language.over = function(event) {
				u.ass(div.inactive_language, {
					"border-bottom":"1px solid"
				})

				u.ass(div.active_language, {
					"border-bottom":0
				})
			}
			
			this.inactive_language.out = function(event) {
				u.ass(div.active_language, {
					"border-bottom":"1px solid"
				})

				u.ass(div.inactive_language, {
					"border-bottom":0
				})
			}
			
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
			this.last_show_time = 0;



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

			var cloud_layers_height = this.scrollHeight * 2 + "px";

			u.ass(this.clouds_front, {
				"position":"absolute",
				"top":"0",
				"left":"0",
				"width":"100%",
				"height": cloud_layers_height,
				"z-index":"-10"
			});

			u.ass(this.clouds_mid, {
				"position":"absolute",
				"top":"0",
				"left":"0",
				"width":"100%",
				"height": cloud_layers_height,
				"z-index":"-20"
			});

			u.ass(this.clouds_back, {
				"position":"absolute",
				"top":"0",
				"left":"0",
				"width":"100%",
				"height": cloud_layers_height,
				"z-index":"-30"
			}) 
			
			
			// Using a loop, add single cloud divs with injected imgs to each layer depending on the height of the clouds layers, 
			// randomizing their position in three dimensions
			this.layer_names = ["front", "mid", "back"];
			this.clouds_gx = {
				"front":{
					"left":[
						"/img/gx_cloud_front_left1.png", 
						"/img/gx_cloud_front_left2.png",
						"/img/gx_cloud_front_left3.png",
						"/img/gx_cloud_front_left4.png"
					],
					"center":[
						"/img/gx_cloud_front1.png", 
						"/img/gx_cloud_front2.png", 
						"/img/gx_cloud_front3.png"],
					"right":[
						"/img/gx_cloud_front_right1.png", 
						"/img/gx_cloud_front_right2.png",
						"/img/gx_cloud_front_right3.png",
						"/img/gx_cloud_front_right4.png",
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
			var cloud_path = "";
			var previous_cloud_path = "";
			var i = 0;
			var clouds = [];
			var cloud_distance 

			// Left column loop
			current_ypos = top_ypos;
			for (i = 0; current_ypos < this.clouds_front.offsetHeight; i++) {
				current_layer = this.layer_names[Math.round(u.random(0,2))];
				current_layer_cloud_gx = this.clouds_gx[current_layer];

				if (current_layer == "front") {
					this["div_left_cloud_" + i] = u.ae(this.clouds_front, "div", {
						"class":"left cloud " + i,
					})

					cloud_path = current_layer_cloud_gx.left[Math.round(u.random(0,current_layer_cloud_gx.left.length-1))]
					if (cloud_path == previous_cloud_path) {
						continue
					}
					previous_cloud_path = cloud_path;
					
					
					this["img_left_cloud_" + i] = u.ae(this["div_left_cloud_" + i], "img", {
						"src":cloud_path
					})
					
					u.ass(this["div_left_cloud_" + i], {
						"position":"absolute",
						"top":current_ypos + "px",
						"left": 0 - Math.round(u.random(0, 100)) + "px"
	
					})

				}
				
				else if (current_layer == "mid") {
					this["div_left_cloud_" + i] = u.ae(this.clouds_mid, "div", {
						"class":"left cloud " + i,
					})
					
					cloud_path = current_layer_cloud_gx[Math.round(u.random(0,current_layer_cloud_gx.length-1))]
					if (cloud_path == previous_cloud_path) {
						continue
					}
					previous_cloud_path = cloud_path;
					
					this["img_left_cloud_" + i] = u.ae(this["div_left_cloud_" + i], "img", {
						"src":cloud_path
					})
					
					u.ass(this["div_left_cloud_" + i], {
						"position":"absolute",
						"top":current_ypos + "px",
						"left": 0 + Math.round(u.random(-20, 100)) + "px"
						
					})
				}
				else if (current_layer == "back") {
					this["div_left_cloud_" + i] = u.ae(this.clouds_back, "div", {
						"class":"left cloud " + i,
					})
					
					cloud_path = current_layer_cloud_gx[Math.round(u.random(0,current_layer_cloud_gx.length-1))]
					if (cloud_path == previous_cloud_path) {
						continue
					}
					previous_cloud_path = cloud_path;
					
					this["img_left_cloud_" + i] = u.ae(this["div_left_cloud_" + i], "img", {
						"src":cloud_path
					})
					u.ass(this["div_left_cloud_" + i], {
						"position":"absolute",
						"top":current_ypos + "px",
						"left": 0 + Math.round(u.random(-20, 100)) + "px"
						
					})
				}
				
				clouds.push(this["div_left_cloud_" + i]);
				current_ypos = current_ypos + this["div_left_cloud_" + i].offsetHeight + Math.round(u.random(0,303)) - 160;
			}
			
			// Right column loop
			current_ypos = top_ypos;
			for (i = 0; current_ypos < this.clouds_front.offsetHeight; i++) {
				current_layer = this.layer_names[Math.round(u.random(0,2))];
				current_layer_cloud_gx = this.clouds_gx[current_layer];

				if (current_layer == "front") {
					this["div_right_cloud_" + i] = u.ae(this.clouds_front, "div", {
						"class":"right cloud " + i,
					})

					cloud_path = current_layer_cloud_gx.right[Math.round(u.random(0,current_layer_cloud_gx.right.length-1))]
					if (cloud_path == previous_cloud_path) {
						continue
					}
					previous_cloud_path = cloud_path;
					
					
					this["img_right_cloud_" + i] = u.ae(this["div_right_cloud_" + i], "img", {
						"src":cloud_path
					})
					u.ass(this["div_right_cloud_" + i], {
						"position":"absolute",
						"top":current_ypos + "px",
						"right": 0 - Math.round(u.random(0, 100)) + "px"
	
					})
					
				}

				else if (current_layer == "mid") {
					this["div_right_cloud_" + i] = u.ae(this.clouds_mid, "div", {
						"class":"right cloud " + i,
					})

					cloud_path = current_layer_cloud_gx[Math.round(u.random(0,current_layer_cloud_gx.length-1))]
					if (cloud_path == previous_cloud_path) {
						continue
					}
					previous_cloud_path = cloud_path;

					this["img_right_cloud_" + i] = u.ae(this["div_right_cloud_" + i], "img", {
						"src":cloud_path
					})

					u.ass(this["div_right_cloud_" + i], {
						"position":"absolute",
						"top":current_ypos + "px",
						"right": 0 + Math.round(u.random(-20, 100)) + "px"
	
					})
					
				}
				else if (current_layer == "back") {
					this["div_right_cloud_" + i] = u.ae(this.clouds_back, "div", {
						"class":"right cloud " + i,
					})

					cloud_path = current_layer_cloud_gx[Math.round(u.random(0,current_layer_cloud_gx.length-1))]
					if (cloud_path == previous_cloud_path) {
						continue
					}
					previous_cloud_path = cloud_path;

					this["img_right_cloud_" + i] = u.ae(this["div_right_cloud_" + i], "img", {
						"src":cloud_path
					})

					u.ass(this["div_right_cloud_" + i], {
						"position":"absolute",
						"top":current_ypos + "px",
						"right": 0 + Math.round(u.random(-20, 100)) + "px"
	
					})
				}
				

				clouds.push(this["div_right_cloud_" + i]);
				current_ypos = current_ypos + this["div_right_cloud_" + i].offsetHeight + Math.round(u.random(0,303)) - 160;
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

					cloud_path = current_layer_cloud_gx.center[Math.round(u.random(0,current_layer_cloud_gx.center.length-1))]
					if (cloud_path == previous_cloud_path) {
						continue
					}
					previous_cloud_path = cloud_path;

					this["img_center_cloud_" + i] = u.ae(this["div_center_cloud_" + i], "img", {
						"src":cloud_path
					})
					
				}
				else if (current_layer == "mid") {
					this["div_center_cloud_" + i] = u.ae(this.clouds_mid, "div", {
						"class":"center cloud " + i,
					})

					cloud_path = current_layer_cloud_gx[Math.round(u.random(0,current_layer_cloud_gx.length-1))]
					if (cloud_path == previous_cloud_path) {
						continue
					}
					previous_cloud_path = cloud_path;

					this["img_center_cloud_" + i] = u.ae(this["div_center_cloud_" + i], "img", {
						"src":cloud_path
					})
				}
				else if (current_layer == "back") {
					this["div_center_cloud_" + i] = u.ae(this.clouds_back, "div", {
						"class":"center cloud " + i,
					})

					cloud_path = current_layer_cloud_gx[Math.round(u.random(0,current_layer_cloud_gx.length-1))]
					if (cloud_path == previous_cloud_path) {
						continue
					}
					previous_cloud_path = cloud_path;

					this["img_center_cloud_" + i] = u.ae(this["div_center_cloud_" + i], "img", {
						"src":cloud_path
					})
				}
				
				// console.log(this["div_center_cloud_" + i]);
				// console.log(this["div_center_cloud_" + i].offsetHeight);
				u.ass(this["div_center_cloud_" + i], {
					"position":"absolute",
					"top":current_ypos + "px",
					"left":"50%"
				})
				u.ass(this["img_center_cloud_" + i], {
					"margin-left":Math.round(u.random(-300,300)) + "px"
				}) 
				
				clouds.push(this["div_center_cloud_" + i]);
				current_ypos = current_ypos + this["div_center_cloud_" + i].offsetHeight + Math.round(u.random(0, 150)-60);
			}

			// Shuffle clouds array		
			function shuffle(array) {
				var currentIndex = array.length, temporaryValue, randomIndex;
				
				// While there remain elements to shuffle...
				while (0 !== currentIndex) {
					
					// Pick a remaining element...
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;
					
					// And swap it with the current element.
					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}
				
				return array;
			}

			clouds_shuffled = shuffle(clouds);

			// Fade in the shuffled clouds (CSS transition)
			for (i = 0; i < clouds_shuffled.length; i++) {				
				u.a.transition(clouds_shuffled[i], "all 1.8s ease-in " + i*40 + "ms");
				u.ass(clouds_shuffled[i], {
					"opacity":1
				})
			}
		

		}
		
		// Destroy Letter
		div.destroy = function() {

			// console.log("Destroyed!")
			//Lock screen
			u.ass(this, {
				"overflow-y":"hidden"
			})

			// Fade out the shuffled clouds
			for (i = 0; i < clouds_shuffled.length; i++) {				
				u.a.transition(clouds_shuffled[i], "all 1.8s ease-in " + i*75 + "ms");
				u.ass(clouds_shuffled[i], {
					"opacity":0 
				})
			}

			this.finalize = function() {
				u.ass(this, {
					"display":"none"
				});
			}

			u.t.setTimer(this, "finalize", 1800 + i*75 + 200);

			this.is_done = true;

			// Let controller decide what to do
			page.cN.scene.controller();

		}

		// div is ready
		div.ready();
	}
}

Util.Objects["front"] = new function() {
	this.init = function(scene) {

		scene.resized = function(event) {
			// u.bug("scene.resized:", this);

			// If letter exists and it is active (shown or partially shown)
			if(this.letter && this.letter.is_active) {
				// u.bug("adjust Article");

				// Adjust top padding
				if(this.letter.h1) {
					u.ass(this.letter, {
						paddingTop: ((page.browser_h - this.letter.h1.offsetHeight) / 2) / 1.8 +"px",
					});
				}
			}


			// If side A exists and it is active (shown or partially shown)
			if(this.side_a && this.side_a.is_active) {
				// u.bug("adjust SideA");

				// Adjust height
				u.ass(this.side_a, {
					height: page.browser_h+"px",
				});

				// recalculate canvas properties
				if(this.side_a.canvas) {
					this.side_a.canvas.height = page.browser_h;
					this.side_a.canvas.width = page.browser_w;

					this.side_a.center_x = Math.round(page.browser_w/2);
					this.side_a.center_y = Math.round(page.browser_h/2);
					// use smallest to define radius
					if(page.browser_h > page.browser_w) {
						this.side_a.radius = this.side_a.center_x - 35;
					}
					else {
						this.side_a.radius = this.side_a.center_y - 35;
					}

					if(this.side_a.is_ready) {
						window.scrollTo(0,this.side_a.offsetTop);
					}

					// make sure animations are updated
					if(fun(this.scrolled)) {
						this.scrolled();
					}
					// if(fun(this.side_a.updateCanvas)) {
					// 	this.side_a.updateCanvas(this.side_a.player.media.currentTime);
					// }

				}

				if(this.side_a.song_title) {
					u.ass(this.side_a.song_title, {
						top: ((page.browser_h - this.side_a.song_title.offsetHeight)/2) + "px"
					});
				}
				if(this.side_a.song_title_switcher) {
					u.ass(this.side_a.song_title_switcher, {
						top: ((page.browser_h - this.side_a.song_title_switcher.offsetHeight)/2) + "px"
					});
				}
				if(this.side_a.side_title) {
					u.ass(this.side_a.side_title, {
						top: (page.browser_h/4 + 10) + "px"
					});
				}
				if(this.side_a.track_status) {
					u.ass(this.side_a.track_status, {
						top: (page.browser_h/4 - 10) + "px"
					});
				}
				if(this.side_a.time_status) {
					u.ass(this.side_a.time_status, {
						top: ((page.browser_h/4 * 3) - 10) + "px"
					});
				}

				if(this.side_a.player && this.side_a.player.bn_play) {
					u.ass(this.side_a.player.bn_play, {
						top: ((page.browser_h/4 * 3) - 10) + "px"
					});
				}


			}

			// If intermezzo exists and it is active (shown or partially shown)
			if(this.intermezzo && this.intermezzo.is_active) {
				// u.bug("adjust intermezzo");

				// Adjust height
				u.ass(this.intermezzo, {
					height: page.browser_h+"px",
				});
			}

			// If side B exists and it is active (shown or partially shown)
			if(this.side_b && this.side_b.is_active) {
				// u.bug("adjust SideB");

				// Adjust height
				u.ass(this.side_b, {
					height: page.browser_h+"px",
				});

				// recalculate canvas properties
				if(this.side_b.canvas) {
					this.side_b.canvas.height = page.browser_h;
					this.side_b.canvas.width = page.browser_w;

					this.side_b.center_x = Math.round(page.browser_w/2);
					this.side_b.center_y = Math.round(page.browser_h/2);
					this.side_b.radius = this.side_b.center_y - 35;

					if(this.side_b.is_ready) {
						window.scrollTo(0,this.side_b.offsetTop);
					}
					// make sure animations are updated
					if(fun(this.scrolled)) {
						this.scrolled();
					}
				}

				if(this.side_b.song_title) {
					u.ass(this.side_b.song_title, {
						top: ((page.browser_h - this.side_b.song_title.offsetHeight)/2) + "px"
					});
				}
				if(this.side_b.song_title_switcher) {
					u.ass(this.side_b.song_title_switcher, {
						top: ((page.browser_h - this.side_b.song_title_switcher.offsetHeight)/2) + "px"
					});
				}
				if(this.side_b.side_title) {
					u.ass(this.side_b.side_title, {
						top: (page.browser_h/4 + 10) + "px"
					});
				}
				if(this.side_b.track_status) {
					u.ass(this.side_b.track_status, {
						top: (page.browser_h/4 - 10) + "px"
					});
				}
				if(this.side_b.time_status) {
					u.ass(this.side_b.time_status, {
						top: ((page.browser_h/4 * 3) - 10) + "px"
					});
				}

				if(this.side_b.player && this.side_b.player.bn_play) {
					u.ass(this.side_b.player.bn_play, {
						top: ((page.browser_h/4 * 3) - 10) + "px"
					});
				}
			}

			// If finale exists and it is active (shown or partially shown)
			if(this.finale && this.finale.is_active) {
				// u.bug("adjust finale");

				// Adjust height
				u.ass(this.finale, {
					height: u.browserH()+"px",
				});
			}

			// Calculate diagonal_radius (half diameter of fully covering circle)
			this.diagonal_radius = Math.ceil(Math.sqrt(Math.pow(page.browser_w, 2) + Math.pow(page.browser_w, 2)) / 2);

		}

		// Scene scrolled
		scene.scrolled = function(event) {
 			// u.bug("scene.scrolled:", this);

			// Implemented stagewise in front, side_a, etc
		}

		// Scene is ready to be initialized
		scene.ready = function() {
			// u.bug("scene.ready:", this);

			// remove initialization class to avoid any double initialization
			u.rc(this, "i:front");


			// Front page contains 5 sections: 
			// Letter, Side A, Intermezzo, Side B and Finale


			this.letter = u.qs("div.letter", this);

			// get reference to headline
			this.letter.h1 = u.qs("h1", this.letter);

			// get references to all text nodes (including h1)
			this.letter.nodes = u.qsa("h1,p", this.letter);

			// Hide all text nodes in article
			var i, node;
			for(i = 0; i < this.letter.nodes.length; i++) {
				node = this.letter.nodes[i];
				u.ass(node, {
					opacity: 0,
					transform: "translate3D(0, 15px, 0)"
				});
			}

			// Article is now ready to be shown (content is hidden)
			u.ass(this.letter, {
				opacity: 1,
			});


			// Add default content to all views

			// SIDE A
			this.side_a = u.ae(this, "div", {class:"side_a"});
			this.side_a.canvas = u.ae(this.side_a, "canvas", {width:this.offsetWidth, height:page.browser_h});
			this.side_a.ctx = this.side_a.canvas.getContext("2d");


			// INTERMEZZO
			this.intermezzo = u.ae(this, "div", {class:"intermezzo"});
			u.ae(this.intermezzo, "p", {html:"‘Himmelmekanik’ er mixet som en LP, derfor vender vi lige pladen."});
			u.ae(this.intermezzo, "p", {html:"Det giver dig lige 10 sekunder til at sætte en tanke i gang."});
			u.wc(this.intermezzo, "div", {class:"cell"});
			u.wc(this.intermezzo, "div", {class:"table"});


			// SIDE B
			this.side_b = u.ae(this, "div", {class:"side_b"});
			this.side_b.canvas = u.ae(this.side_b, "canvas", {width:this.offsetWidth, height:page.browser_h});
			this.side_b.ctx = this.side_b.canvas.getContext("2d");


			// FINALE
			this.finale = u.ae(this, "div", {class:"finale"});
			u.ae(this.finale, "p", {html:"Tak fordi du tog dig tid til at lytte med."});
			u.ae(this.finale, "p", {html:'<span class="listen">Lyt igen</span> eller <span class="question">stil mig et spørgsmål</span>, <br />hvis du har lyst.'});
			u.ae(this.finale, "p", {html:"Bh<br />Fred og Kærlighed<br />Marc Facchini"});
			u.wc(this.finale, "div", {class:"cell"});
			u.wc(this.finale, "div", {class:"table"});



			// Re-calculate positions for letter
			page.resized();


			// Continue to build letter
			this.buildLetter();
//			this.buildSideB();
		}


		// Build Letter
		scene.buildLetter = function() {
			// u.bug("buildLetter");

			// Avoid ever getting ready twice
			if(!this.letter.is_ready) {

				this.letter.is_ready = true;
				// u.bug("this.letter.is_ready");
				this.letter.is_active = true;
	//			u.bug("this.letter.is_active");


				// Show each text node as user scrolls down the page
				this.current_front_node_i = 0;
				// Map current show progress
				this.current_front_node = this.letter.nodes[this.current_front_node_i++];

				// Show Headline
				u.a.transition(this.current_front_node, "all 2s ease-in-out");
				u.ass(this.current_front_node, {
					opacity: 1,
					transform: "translate3D(0, 0, 0)"
				});


				// Show 1st paragraph
				this.current_front_node = this.letter.nodes[this.current_front_node_i++];
				u.a.transition(this.current_front_node, "all 2s ease-in-out " + 500 + "ms");
				u.ass(this.current_front_node, {
					opacity: 1,
					transform: "translate3d(0, 0, 0)"
				});


				// Apply scrollhandler for reavealing remaining 
				this.scrolled = function(event) {
					// u.bug("front scrolled in letter");

					// If side_a scrolled into view - draw the circle
					if(this.side_a.offsetTop - page.browser_h < page.scroll_y) {

						// Caculate progress
						var progress = ((page.scroll_y + page.browser_h) - this.side_a.offsetTop) / page.browser_h;
						var current_degree = Math.PI * progress;
						// u.bug("progress:" + progress);
						// u.bug("current_degree", current_degree);


						// Clear canvas
						this.side_a.ctx.clearRect(0, 0, page.browser_w, page.browser_h);

						// Draw dot
						this.side_a.ctx.beginPath();
						this.side_a.ctx.fillStyle = "#f0bd18";
						this.side_a.ctx.arc(this.side_a.center_x, this.side_a.center_y, progress*this.side_a.radius*0.025, 0, (2*Math.PI));
						this.side_a.ctx.fill();
						this.side_a.ctx.closePath();

						// Draw outer circle
						this.side_a.ctx.beginPath();
						this.side_a.ctx.lineWidth = 4;
						this.side_a.ctx.strokeStyle = "#f0bd18";
						this.side_a.ctx.arc(this.side_a.center_x, this.side_a.center_y, this.side_a.radius, -progress*Math.PI, progress*Math.PI);
						this.side_a.ctx.stroke();
						this.side_a.ctx.closePath();

						// The end is reached - full circle
						if(this.side_a.offsetTop <= page.scroll_y) {

							// u.bug("ready to build SideA");
							this.buildSideA();
						}

					}

					// still front nodes - reveal as scrolled into view
					if(this.letter.nodes.length > this.current_front_node_i) {

						// Next node in view
						if(this.letter.nodes[this.current_front_node_i].offsetTop - page.browser_h < page.scroll_y) {

							this.current_front_node = this.letter.nodes[this.current_front_node_i++];

							// Show node
							u.a.transition(this.current_front_node, "all 2s ease-in-out");
							u.ass(this.current_front_node, {
								opacity: 1,
								transform: "translate3D(0, 0, 0)"
							});

						}

					}

				}

				this.side_a.is_active = true;
				// u.bug("this.side_a.is_active");

				// Re-calculate positions for side A
				page.resized();

			}

		}


		// Build Side A
		scene.buildSideA = function() {
			// u.bug("buildSideA");

			// Avoid ever getting ready twice
			if(!this.side_a.is_ready) {

				this.side_a.is_ready = true;
				// u.bug("this.side_a.is_ready");


				// Hide letter to avoid any scroll issues
				this.letter.is_active = false;
				// u.bug("this.letter.is_active = false");
				u.ass(this.letter, {
					"display": "none"
				});


				// Simplified scroll handler to maintain re-sizing for the Side A intro
				this.scrolled = function(event) {
					// u.bug("front scrolled in side A");

					// Caculate progress
					var progress = 1;
					var current_degree = Math.PI * progress;
					// u.bug("progress:" + progress);
					// u.bug("current_degree", current_degree);

					// Clear canvas
					this.side_a.ctx.clearRect(0, 0, page.browser_w, page.browser_h);

					// Draw dot
					this.side_a.ctx.beginPath();
					this.side_a.ctx.fillStyle = "#f0bd18";
					this.side_a.ctx.arc(this.side_a.center_x, this.side_a.center_y, progress*this.side_a.radius*0.025, 0, (2*Math.PI));
					this.side_a.ctx.fill();
					this.side_a.ctx.closePath();

					// Draw outer circle
					this.side_a.ctx.beginPath();
					this.side_a.ctx.lineWidth = 4;
					this.side_a.ctx.strokeStyle = "#f0bd18";
					this.side_a.ctx.arc(this.side_a.center_x, this.side_a.center_y, this.side_a.radius, -progress*Math.PI, progress*Math.PI);
					this.side_a.ctx.stroke();
					this.side_a.ctx.closePath();

				}



				// Add dynamic content to Side A
				// Animatable title track
				this.side_a.song_title = u.ae(this.side_a, "h2", {class:"song_title", html:"-"});
				this.side_a.song_title_switcher = u.ae(this.side_a, "h2", {class:"song_title switch", html:"&nbsp;"});
				this.side_a.song_title_switcher.side_a = this.side_a;
				u.ass(this.side_a.song_title_switcher, {
					transform: "translate3d(0, 25px, 0)"
				});

				// Static data
				this.side_a.track_title = "Himmelmekanik, Side A";
				this.side_a.side_title = u.ae(this.side_a, "h3", {class:"side_title", html:this.side_a.track_title});
				this.side_a.track_status = u.ae(this.side_a, "h3", {class:"track_status"});
				this.side_a.time_status = u.ae(this.side_a, "h3", {class:"time_status"});


				this.side_a.tracks = {
					"0":{name:"Metamorfose", track:"01", end: "277"},
					"277":{name:"Damgulanna", track:"02", end: "481"},
					"481":{name:"Selvom jeg tæller", track:"03", end:"757"},
					"757":{name:"Malmös søn, under håndvasken", track:"04", end: "973"},
					"973":{name:"Snekkersten Al Safira", track:"05", end: "1260"},
				}
				this.side_a.track_keys = Object.keys(this.side_a.tracks);

				// Get easing method
				this.side_a.easing = u.easings["ease-in"];


				// Add audio player (scratch sound)
				this.side_a.stopplayer = u.mediaPlayer({type:"audio"});
				u.ac(this.side_a.stopplayer, "stopplayer");

				// Add audio player (Side A)
				this.side_a.player = u.mediaPlayer({type:"audio"});
				this.side_a.player.side_a = this.side_a;



				// Audio player is ready
				this.side_a.player.ready = function() {
					// u.bug("player ready:", this);

					if(!this.can_autoplay) {
						u.ac(this.side_a, "requires_action");
//						this.side_a.time_status.innerHTML = "Start";
						this.bn_play = u.ae(this.side_a, "div", {class:"play", html:"Start"});
						this.bn_play.player = this;
						u.e.click(this.bn_play);
						this.bn_play.clicked = function() {
							this.player.loadAndPlay("/assets/side-a");

							u.a.transition(this, "all 2s ease-in-out");
							u.ass(this, {
								opacity: 0,
							});

						}

						u.ass(this.bn_play, {
							top: ((page.browser_h/4 * 3) - 10) + "px",
							opacity: 0,
							transform: "translate3d(0, 15px, 0)"
						});

						u.a.transition(this.bn_play, "all 2s ease-in-out");
						u.ass(this.bn_play, {
							opacity: 1,
							transform: "translate3d(0, 0, 0)"
						});
						
//						page.resized();
					}


					// Run opening animation only once
					this.loading = function(event) {

						// Only needed once
						delete this.loading;
						//u.bug("loading", event);

						u.ac(this.side_a, "loading");
						// Start growing animation
						u.a.requestAnimationFrame(this.side_a, "loadGrow", 6000);
					}
					// Playback has started callback
					this.playing = function(event) {
						// u.bug("Playing", event);

						// Only needed once
						delete this.playing;

						u.rc(this.side_a, "loading");

						// make this clear
						this.is_playing = true;
					}

					// Update track name and number based on timeupdates from the audio node
					this.timeupdate = function(event) {
						// u.bug("timeupdate");

						// first track
						if(this.current_track_i === undefined) {

							this.current_track_i = 0;
							this.current_track = this.side_a.tracks[this.side_a.track_keys[this.current_track_i]];

							// update html
							this.side_a.updateTitle(this.current_track.name);
							// this.side_a.song_title.innerHTML = this.current_track.name;
							this.side_a.track_status.innerHTML = this.current_track.track + "/11";

						}
						// Next track
						else if(this.currentTime > this.current_track.end) {

							this.current_track_i++;
							this.current_track = this.side_a.tracks[this.side_a.track_keys[this.current_track_i]];

							// End of last track
							if(this.current_track_i >= this.side_a.track_keys.length) {
								this.stop();

								// Go to the next step
								page.cN.scene.buildIntermezzo();

								// delete this function - stop listining.
								delete this.timeupdate;

								// end of business
								return;
							}

							// update html
							this.side_a.updateTitle(this.current_track.name);
							// this.side_a.song_title.innerHTML = this.current_track.name;
							this.side_a.track_status.innerHTML = this.current_track.track + "/11";

						}


						// update timestamp
						this.side_a.time_status.innerHTML = u.period("m:s", {seconds: this.currentTime-this.side_a.track_keys[this.current_track_i]});


						// update timeline circle
						this.side_a.updateCanvas(this.currentTime);

					}

					this.loadAndPlay("/assets/side-a");

				}



				// Let orange circle grow
				this.side_a.loadGrow = function(progress) {

					var easing = this.easing(progress);
					// console.log(easing);
					// console.log(progress);

					var radius = easing*page.cN.scene.diagonal_radius < this.radius*0.025 ? this.radius*0.025 : easing*page.cN.scene.diagonal_radius;

					// Clear canvas
					this.ctx.clearRect(0, 0, page.browser_w, page.browser_h);

					// Draw dot
					this.ctx.beginPath();
					this.ctx.fillStyle = "#f0bd18";
					this.ctx.arc(this.center_x, this.center_y, radius, 0, (2*Math.PI));
					this.ctx.fill();
					this.ctx.closePath();

					
					// Draw outer circle
					this.ctx.beginPath();
					this.ctx.lineWidth = 4;

//					console.log(radius + ", " + this.radius);

					if(this.radius-5 < radius) {
						this.ctx.strokeStyle = "#f6d874";
					}
					else {
						this.ctx.strokeStyle = "#f0bd18";
					}

					this.ctx.arc(this.center_x, this.center_y, this.radius, -1*Math.PI, 1*Math.PI);
					this.ctx.stroke();
					this.ctx.closePath();

				}

				// Orange circle grown full screen
				this.side_a.transitioned = function() {

					this.is_built = true;
					// u.bug("side_a.is_built");

					// Dont accidentally repeat this at any future transitionEnd events
					delete this.transitioned;


					// Switch to new scrolled action
					page.cN.scene.scrolled = function() {
						this.side_a.updateCanvas(this.side_a.player.media.currentTime);
					}


					// Apply new transition
					u.a.transition(this.track_status, "all 0.5s ease-in-out");
					u.ass(this.track_status, {
						opacity: 1
					});

					// Apply new transition
					u.a.transition(this.time_status, "all 0.5s ease-in-out");
					u.ass(this.time_status, {
						opacity: 1
					});

					// Apply new transition
					u.a.transition(this.side_title, "all 0.5s ease-in-out");
					u.ass(this.side_title, {
						opacity: 1
					});


					// Update title
					if(this.player.current_track && this.player.current_track.name) {
						this.updateTitle(this.player.current_track.name);
					}


					// Preload the stop asset
					this.stopplayer.load("/assets/stop");


					// Stop music on all interaction
					this.wheel_event_id = u.e.addWindowEvent(this, "wheel", this.stopOnInteraction);
					this.mousemove_event_id = u.e.addWindowEvent(this, "mousemove", this.stopOnInteraction);
					this.blur_event_id = u.e.addWindowEvent(this, "blur", this.stopOnInteraction);
					this.key_event_id = u.e.addWindowEvent(this, "keydown", this.stopOnInteraction);

				}

				// Play again after interaction stop
				this.side_a.playAgain = function(event) {
					this.player.play();
				}

				// Scratch on interaction
				this.side_a.stopOnInteraction = function(event) {
					// u.bug("ignore input");
//					u.e.kill(event);


					if(!u.t.valid(this.t_stop)) {
						this.stopplayer.play(0);
						this.player.pause();
						this.t_stop = u.t.setTimer(this, "playAgain", 5000);
					}

				}

				// Update progress canvas
				this.side_a.updateCanvas = function(progress) {

//						u.bug("Resize ctx")
					// Clear canvas
					this.ctx.clearRect(0, 0, page.browser_w, page.browser_h);

					// Create orange square
					this.ctx.beginPath();
					this.ctx.rect(0, 0, page.browser_w, page.browser_h);
					this.ctx.fillStyle = "#f0bd18";
					this.ctx.fill();
					this.ctx.closePath();

				
					// Draw outer circle
					this.ctx.beginPath();
					this.ctx.lineWidth = 4;
					this.ctx.strokeStyle = "#f6d874";
					this.ctx.arc(this.center_x, this.center_y, this.radius, -1*Math.PI, 1*Math.PI);
					this.ctx.stroke();
					this.ctx.closePath();


					// Draw "played" circle
					this.ctx.beginPath();
					this.ctx.lineWidth = 4;
					this.ctx.strokeStyle = "#cc9c00";
					this.ctx.arc(this.center_x, this.center_y, this.radius, -(Math.PI/2), 2 * (progress / this.player.duration) * Math.PI - (Math.PI/2));
					this.ctx.stroke();
					this.ctx.closePath();

				}

				// Update song title
				this.side_a.updateTitle = function(title) {

					// only update title if side A is built (full orange)
					if(this.is_built) {

						// Song title
						this.song_title_switcher.innerHTML = title;

						// Resize page to re-position elements
						page.resized();	

						this.song_title_switcher.transitioned = function() {


							this.side_a.song_title.innerHTML = this.innerHTML;

							page.resized();
							

							u.ass(this.side_a.song_title, {
								opacity:1,
								transform: "translate3d(0, 0, 0)"
							});
							u.ass(this, {
								opacity:0,
								transform: "translate3d(0, " + (this.offsetHeight*0.7) + "px, 0)"
							});

						}
						u.a.transition(this.song_title_switcher, "all 2s ease-in-out");
						u.ass(this.song_title_switcher, {
							opacity:1,
							transform: "translate3d(0,0,0)"
						});
						u.a.transition(this.song_title, "all 2s ease-in-out");
						u.ass(this.song_title, {
							opacity:0,
							transform: "translate3d(0, -" + (this.song_title.offsetHeight*0.7) + "px, 0)"
						});

						// Resize page to re-position elements
//						page.resized();	
					}

				}


				// Append players to DOM (just to avoid any browser issues)
				u.ae(this.side_a, this.side_a.player);
				u.ae(this.side_a, this.side_a.stopplayer);


				// FOR DEBUGGING
				window.player = this.side_a.player;


				// Re-calculate positions for side A
				page.resized();

			}

		}


		// Build Intermezzo
		scene.buildIntermezzo = function() {
			// u.bug("buildIntermezzo");


			// Avoid ever getting ready twice
			if(!this.intermezzo.is_ready) {

				this.intermezzo.is_ready = true;
				this.intermezzo.is_active = true;

				u.e.removeWindowEvent(this.side_a, "wheel", this.side_a.wheel_event_id);
				u.e.removeWindowEvent(this.side_a, "mousemove", this.side_a.mousemove_event_id);
				u.e.removeWindowEvent(this.side_a, "blur", this.side_a.blur_event_id);
				u.e.removeWindowEvent(this.side_a, "keydown", this.side_a.key_event_id);


				u.a.transition(this.side_a.side_title, "all 0.5s ease-in-out");
				u.ass(this.side_a.side_title, {
					opacity: 0
				});

				u.a.transition(this.side_a.song_title, "all 0.5s ease-in-out");
				u.ass(this.side_a.song_title, {
					opacity: 0
				});

				u.a.transition(this.side_a.track_status, "all 0.5s ease-in-out");
				u.ass(this.side_a.track_status, {
					opacity: 0
				});

				u.a.transition(this.side_a.time_status, "all 0.5s ease-in-out");
				u.ass(this.side_a.time_status, {
					opacity: 0
				});


				this.intermezzo.easing = u.easings["ease-in"];
//				this.intermezzo.diagonal_radius = this.side_a.diagonal_radius;

				this.intermezzo.side_a = this.side_a;

				this.intermezzo.transitioned = function() {
//					u.bug("this.intermezzo.transitioned", this);

					delete this.transitioned;

					u.ass(this, {
						opacity: 0,
						display:"block",
						transform: "translate3d(0, 15px, 0)"
					});
					u.ass(this.side_a, {
						display:"none"
					});

					page.cN.scene.side_a.is_active = false;
					page.cN.scene.scrolled = function(){}


					u.a.transition(this, "all 2s ease-in-out");
					u.ass(this, {
						opacity: 1,
						transform: "translate3d(0, 0, 0)"
					});

					u.t.setTimer(this, "undoIntermezzo", 10000);
				}

				this.intermezzo.undoSideA = function(progress) {
//					console.log("undo intermezzo");

					progress = 1 - progress;

					// console.log(progress);
					// console.log(this.easing);

					var easing = this.easing(progress);
//					u.bug(easing);
					// console.log(progress);
//					u.bug(easing*this.side_a.player.diagonal_radius);

					// Clear canvas
					this.side_a.ctx.clearRect(0, 0, page.browser_w, page.browser_h);

					// Draw dot
					this.side_a.ctx.beginPath();
					this.side_a.ctx.fillStyle = "#f0bd18";
					this.side_a.ctx.arc(this.side_a.center_x, this.side_a.center_y, easing*page.cN.scene.diagonal_radius, 0, (2*Math.PI));
					this.side_a.ctx.fill();
					this.side_a.ctx.closePath();

					
					// Draw outer circle
					this.side_a.ctx.beginPath();
					this.side_a.ctx.lineWidth = 4;
					if(this.diagonal_radius > this.side_a.radius) {
						this.side_a.ctx.strokeStyle = "#f6d874";
					}
					else {
						this.side_a.ctx.strokeStyle = "#f0bd18";
					}
					this.side_a.ctx.arc(this.side_a.center_x, this.side_a.center_y, this.side_a.radius, 0, (2 * easing) * Math.PI);
					this.side_a.ctx.stroke();
					this.side_a.ctx.closePath();

					// Draw "played" circle
					this.side_a.ctx.beginPath();
					this.side_a.ctx.lineWidth = 4;
					this.side_a.ctx.strokeStyle = "#cc9c00";
					this.side_a.ctx.arc(this.side_a.center_x, this.side_a.center_y, this.side_a.radius, -(Math.PI/2), (2 * easing * Math.PI) - (Math.PI/2));
					this.side_a.ctx.stroke();
					this.side_a.ctx.closePath();

				}

				// Start growing animation
				u.a.requestAnimationFrame(this.intermezzo, "undoSideA", 2000);



				this.intermezzo.undoIntermezzo = function(progress) {
//					console.log("undo intermezzo");

					this.transitioned = function(event) {
						page.cN.scene.buildSideB();
					}

					u.a.transition(this, "all 0.5s ease-in");
					u.ass(this, {
						opacity: 0
					});
				}


				page.resized();

			}

		}


		// Build Side B
		scene.buildSideB = function() {
			// u.bug("buildSideB");

			// Avoid ever getting ready twice
			if(!this.side_b.is_ready) {

				this.side_b.is_ready = true;
				this.side_b.is_active = true;


				// Hide article to avoid any scroll issues
				u.ass(this.intermezzo, {
					"display": "none"
				});

				u.ass(this.side_b, {
					display: "block",
					opacity: 1
				});


				page.cN.scene.intermezzo.is_active = false;


				// Add dynamic content to Side B
				// Animatable title track
				this.side_b.song_title = u.ae(this.side_b, "h2", {class:"song_title", html:"-"});
				this.side_b.song_title_switcher = u.ae(this.side_b, "h2", {class:"song_title switch", html:"&nbsp;"});
				this.side_b.song_title_switcher.side_b = this.side_b;
				u.ass(this.side_b.song_title_switcher, {
					transform: "translate3d(0, 25px, 0)"
				});

				// Static data
				this.side_b.track_title = "Himmelmekanik, Side B";
				this.side_b.side_title = u.ae(this.side_b, "h3", {class:"side_title", html:this.side_b.track_title});
				this.side_b.track_status = u.ae(this.side_b, "h3", {class:"track_status"});
				this.side_b.time_status = u.ae(this.side_b, "h3", {class:"time_status"});


				this.side_b.tracks = {
					"0":{name:"Falden Engel / Game On", track:"06", end: "205"},
					"205":{name:"Amin & Amina", track:"07", end: "454"},
					"454":{name:"En ellipse", track:"08", end:"558"},
					"558":{name:"I ensomhed for evigt", track:"09", end: "801"},
					"801":{name:"Ånd ud, ånd ind", track:"10", end: "1038"},
					"1038":{name:"9 Juveler", track:"11", end: "1260"},
				}
				this.side_b.track_keys = Object.keys(this.side_b.tracks);

				this.side_b.easing = u.easings["ease-in-fast"];


				// Add stop audio player
				this.side_b.stopplayer = u.mediaPlayer({type:"audio"});
				u.ac(this.side_b.stopplayer, "stopplayer");

				// Add audio player
				this.side_b.player = u.mediaPlayer({type:"audio"});
				this.side_b.player.side_b = this.side_b;
				this.side_b.player.ready = function() {
//					u.bug("player ready:", this);

					if(!this.can_autoplay) {
						u.ac(this.side_b, "requires_action");
//						this.side_b.time_status.innerHTML = "Start";
						this.bn_play = u.ae(this.side_b, "div", {class:"play", html:"Start"});
						this.bn_play.player = this;
						u.e.click(this.bn_play);
						this.bn_play.clicked = function() {
							this.player.loadAndPlay("/assets/side-b");

							u.a.transition(this, "all 2s ease-in-out");
							u.ass(this, {
								opacity: 0,
							});

						}

						u.ass(this.bn_play, {
							top: ((page.browser_h/4 * 3) - 10) + "px",
							opacity: 0,
							transform: "translate3d(0, 15px, 0)"
						});

						u.a.transition(this.bn_play, "all 2s ease-in-out");
						u.ass(this.bn_play, {
							opacity: 1,
							transform: "translate3d(0, 0, 0)"
						});
						
//						page.resized();
					}

					this.loading = function(event) {
						// u.bug("loading", event);
						delete this.loading;

						// Start growing animation
						u.a.requestAnimationFrame(this.side_b, "loadGrow", 2000);
					}
					this.playing = function(event) {
						// u.bug("Playing", event);

						delete this.playing;

						this.is_playing = true;
					}

					this.timeupdate = function(event) {
//						u.bug("currentTime:" + this.currentTime);

//						u.bug(this.current_track_i, this.current_track);
						if(this.current_track_i === undefined) {
							this.current_track_i = 0;
							this.current_track = this.side_b.tracks[this.side_b.track_keys[this.current_track_i]];

							// update html
							this.side_b.updateTitle(this.current_track.name);
//							this.side_b.song_title.innerHTML = this.current_track.name;
							this.side_b.track_status.innerHTML = this.current_track.track + "/11";
						}
						else if(this.currentTime > this.current_track.end) {
							this.current_track_i++;
							this.current_track = this.side_b.tracks[this.side_b.track_keys[this.current_track_i]];

							// End of last track
							if(this.current_track_i >= this.side_b.track_keys.length) {
								this.stop();
								page.cN.scene.buildFinale();
								delete this.timeupdate;
								return;
							}

							this.side_b.updateTitle(this.current_track.name);
//							this.side_b.song_title.innerHTML = this.current_track.name;
							this.side_b.track_status.innerHTML = this.current_track.track + "/11";

							page.resized();
						}

						this.side_b.time_status.innerHTML = u.period("m:s", {seconds: this.currentTime-this.side_b.track_keys[this.current_track_i]});

						this.side_b.updateCanvas(this.currentTime);

					}


					this.loadAndPlay("/assets/side-b");

				}


				this.side_b.loadGrow = function(progress) {
//					console.log("loadGrow");
//					delete this.loadGrow;
					progress = progress;

//					console.log(progress);
					// console.log(this.easing);

					var easing = this.easing(progress);
//					u.bug(easing);
					// console.log(progress);
//					u.bug(easing*this.side_b.player.diagonal_radius);

					// Clear canvas
					this.ctx.clearRect(0, 0, page.browser_w, page.browser_h);

					// Draw dot
					this.ctx.beginPath();
					this.ctx.fillStyle = "#f0bd18";
//					console.log(page.cN.scene.diagonal_radius);
					this.ctx.arc(this.center_x, this.center_y, easing*page.cN.scene.diagonal_radius, 0, (2*Math.PI));
					this.ctx.fill();
					this.ctx.closePath();

					
					// Draw outer circle
					this.ctx.beginPath();
					this.ctx.lineWidth = 4;
					if(this.diagonal_radius > this.radius) {
						this.ctx.strokeStyle = "#f6d874";
					}
					else {
						this.ctx.strokeStyle = "#f0bd18";
					}
					this.ctx.arc(this.center_x, this.center_y, this.radius, 0, (2 * easing) * Math.PI);
					this.ctx.stroke();
					this.ctx.closePath();

					// Draw "played" circle
					this.ctx.beginPath();
					this.ctx.lineWidth = 4;
					this.ctx.strokeStyle = "#cc9c00";
					this.ctx.arc(this.center_x, this.center_y, this.radius, -(Math.PI/2), (2 * easing * Math.PI) - (Math.PI/2));
					this.ctx.stroke();
					this.ctx.closePath();

				}



				this.side_b.transitioned = function() {

					this.is_built = true;

					// Dont accidentally repeat this at any future transitionEnd events
					delete this.transitioned;

					// Switch to new scrolled action
					page.cN.scene.scrolled = function() {
						this.side_b.updateCanvas(this.side_b.player.media.currentTime);
					}


					// Apply new transition
					u.a.transition(this.track_status, "all 0.5s ease-in-out");
					u.ass(this.track_status, {
						opacity: 1
					});

					// Apply new transition
					u.a.transition(this.time_status, "all 0.5s ease-in-out");
					u.ass(this.time_status, {
						opacity: 1
					});

					// Apply new transition
					u.a.transition(this.side_title, "all 0.5s ease-in-out");
					u.ass(this.side_title, {
						opacity: 1
					});


					// Update title
					this.updateTitle(this.player.current_track.name);


					// Preload the stop asset
					this.stopplayer.load("/assets/stop");

					// Stop music on all interaction
					this.wheel_event_id = u.e.addWindowEvent(this, "wheel", this.stopOnInteraction);
					this.mousemove_event_id = u.e.addWindowEvent(this, "mousemove", this.stopOnInteraction);
					this.blur_event_id = u.e.addWindowEvent(this, "blur", this.stopOnInteraction);
					this.key_event_id = u.e.addWindowEvent(this, "keydown", this.stopOnInteraction);
				}

				// Play again after interaction stop
				this.side_b.playAgain = function(event) {
					this.player.play();
				}

				//
				this.side_b.stopOnInteraction = function(event) {
					// u.bug("ignore input");
					// u.e.kill(event);


					if(!u.t.valid(this.t_stop)) {
						this.stopplayer.play(0);
						this.player.pause();
						this.t_stop = u.t.setTimer(this, "playAgain", 5000);
					}

				}

				// 
				this.side_b.updateCanvas = function(progress) {

//						u.bug("Resize ctx")
					// Clear canvas
					this.ctx.clearRect(0, 0, page.browser_w, page.browser_h);

					// Create orange square
					this.ctx.beginPath();
					this.ctx.rect(0, 0, page.browser_w, page.browser_h);
					this.ctx.fillStyle = "#f0bd18";
					this.ctx.fill();
					this.ctx.closePath();

				
					// Draw outer circle
					this.ctx.beginPath();
					this.ctx.lineWidth = 4;
					this.ctx.strokeStyle = "#f6d874";
					this.ctx.arc(this.center_x, this.center_y, this.radius, -1*Math.PI, 1*Math.PI);
					this.ctx.stroke();
					this.ctx.closePath();


					// Draw "played" circle
					this.ctx.beginPath();
					this.ctx.lineWidth = 4;
					this.ctx.strokeStyle = "#cc9c00";
					this.ctx.arc(this.center_x, this.center_y, this.radius, -(Math.PI/2), 2 * (progress / this.player.duration) * Math.PI - (Math.PI/2));
					this.ctx.stroke();
					this.ctx.closePath();

				}


				// Update song title
				this.side_b.updateTitle = function(title) {

					// only update title if side A is built (full orange)
					if(this.is_built) {

						// Song title
						this.song_title_switcher.innerHTML = title;

						// Resize page to re-position elements
						page.resized();	

						this.song_title_switcher.transitioned = function() {


							this.side_b.song_title.innerHTML = this.innerHTML;

							page.resized();
							

							u.ass(this.side_b.song_title, {
								opacity:1,
								transform: "translate3d(0, 0, 0)"
							});
							u.ass(this, {
								opacity:0,
								transform: "translate3d(0, " + (this.offsetHeight*0.7) + "px, 0)"
							});

						}
						u.a.transition(this.song_title_switcher, "all 2s ease-in-out");
						u.ass(this.song_title_switcher, {
							opacity:1,
							transform: "translate3d(0,0,0)"
						});
						u.a.transition(this.song_title, "all 2s ease-in-out");
						u.ass(this.song_title, {
							opacity:0,
							transform: "translate3d(0, -" + (this.song_title.offsetHeight*0.7) + "px, 0)"
						});

						// Resize page to re-position elements
//						page.resized();	
					}

				}



				u.ae(this.side_b, this.side_b.player);
				u.ae(this.side_b, this.side_b.stopplayer);



				// FOR DEBUGGING
				window.player = this.side_b.player;


				
//				this.is_side_b_built = true;

				page.resized();
			}
			
		}

		// Build Finale
		scene.buildFinale = function() {
			// u.bug("buildFinale");


			// Avoid ever getting ready twice
			if(!this.finale.is_ready) {

				this.finale.is_ready = true;
				this.finale.is_active = true;

				u.e.removeWindowEvent(this.side_b, "wheel", this.side_b.wheel_event_id);
				u.e.removeWindowEvent(this.side_b, "mousemove", this.side_b.mousemove_event_id);
				u.e.removeWindowEvent(this.side_b, "blur", this.side_b.blur_event_id);
				u.e.removeWindowEvent(this.side_b, "keydown", this.side_b.key_event_id);


				u.a.transition(this.side_b.side_title, "all 0.5s ease-in-out");
				u.ass(this.side_b.side_title, {
					opacity: 0
				});

				u.a.transition(this.side_b.song_title, "all 0.5s ease-in-out");
				u.ass(this.side_b.song_title, {
					opacity: 0
				});

				u.a.transition(this.side_b.track_status, "all 0.5s ease-in-out");
				u.ass(this.side_b.track_status, {
					opacity: 0
				});

				u.a.transition(this.side_b.time_status, "all 0.5s ease-in-out");
				u.ass(this.side_b.time_status, {
					opacity: 0
				});


				this.finale.easing = u.easings["ease-in"];
//				this.finale.diagonal_radius = this.side_b.diagonal_radius;

				this.finale.side_b = this.side_b;

				this.finale.transitioned = function() {
//					u.bug("this.finale.transitioned", this);

					delete this.transitioned;

					u.ass(this, {
						opacity: 0,
						display:"block",
						transform: "translate3d(0, 15px, 0)"
					});
					u.ass(this.side_b, {
						display:"none"
					});

					page.cN.scene.side_b.is_active = false;
					page.cN.scene.scrolled = function(){}


					u.a.transition(this, "all 2s ease-in-out");
					u.ass(this, {
						opacity: 1,
						transform: "translate3d(0, 0, 0)"
					});


					var play_again = u.qs("span.listen", this);
					var ask_question = u.qs("span.question", this);
					play_again.finale = this;
					
					u.e.click(play_again);
					play_again.clicked = function() {
						location.reload(true);
//						this.finale.undoFinale();
					}

					u.e.click(ask_question);
					ask_question.clicked = function() {
						location.href = "mailto:marc@fachini.dk";
					}

				}

				this.finale.undoSideB = function(progress) {
//					console.log("undo finale");

					progress = 1 - progress;

					// console.log(progress);
					// console.log(this.easing);

					var easing = this.easing(progress);
//					u.bug(easing);
					// console.log(progress);
//					u.bug(easing*this.side_b.player.diagonal_radius);

					// Clear canvas
					this.side_b.ctx.clearRect(0, 0, page.browser_w, page.browser_h);

					// Draw dot
					this.side_b.ctx.beginPath();
					this.side_b.ctx.fillStyle = "#f0bd18";
					this.side_b.ctx.arc(this.side_b.center_x, this.side_b.center_y, easing*page.cN.scene.diagonal_radius, 0, (2*Math.PI));
					this.side_b.ctx.fill();
					this.side_b.ctx.closePath();

					
					// Draw outer circle
					this.side_b.ctx.beginPath();
					this.side_b.ctx.lineWidth = 4;
					if(this.diagonal_radius > this.side_b.radius) {
						this.side_b.ctx.strokeStyle = "#f6d874";
					}
					else {
						this.side_b.ctx.strokeStyle = "#f0bd18";
					}
					this.side_b.ctx.arc(this.side_b.center_x, this.side_b.center_y, this.side_b.radius, 0, (2 * easing) * Math.PI);
					this.side_b.ctx.stroke();
					this.side_b.ctx.closePath();

					// Draw "played" circle
					this.side_b.ctx.beginPath();
					this.side_b.ctx.lineWidth = 4;
					this.side_b.ctx.strokeStyle = "#cc9c00";
					this.side_b.ctx.arc(this.side_b.center_x, this.side_b.center_y, this.side_b.radius, -(Math.PI/2), (2 * easing * Math.PI) - (Math.PI/2));
					this.side_b.ctx.stroke();
					this.side_b.ctx.closePath();

				}

				// Start growing animation
				u.a.requestAnimationFrame(this.finale, "undoSideB", 2000);



				this.finale.undoFinale = function(progress) {
//					console.log("undo finale");

					this.transitioned = function(event) {
						page.cN.scene.buildLetter();
					}

					u.a.transition(this, "all 0.5s ease-in");
					u.ass(this, {
						opacity: 0
					});
				}


				page.resized();

			}

		}


		// scene is ready
		scene.ready();
	}
}

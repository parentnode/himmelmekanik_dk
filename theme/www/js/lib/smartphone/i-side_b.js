Util.Objects["side_b"] = new function() {
	this.init = function(div) {

		div.resized = function(event) {
			// u.bug("div.resized:", this);

			// If letter exists and it is active (shown or partially shown)
			if(this.is_active) {
				// recalculate canvas properties
				if(this.canvas) {
					this.canvas.height = page.browser_h;
					this.canvas.width = page.browser_w;

					this.center_x = Math.round(page.browser_w/2);
					this.center_y = Math.round(page.browser_h/2);
					// use smallest to define radius
					if(page.browser_h > page.browser_w) {
						this.radius = this.center_x - 35;
					}
					else {
						this.radius = this.center_y - 35;
					}

					if(this.is_ready) {
						window.scrollTo(0,this.offsetTop);
					}
					// Fix for canvas redraw after setting canvas width and height
					if(this.player) {
						this.updateCanvas(this.player.currentTime);
					}
				}

				if(this.song_title) {
					u.ass(this.song_title, {
						top: ((page.browser_h - this.song_title.offsetHeight)/2) + "px"
					});
				}
				if(this.song_title_switcher) {
					u.ass(this.song_title_switcher, {
						top: ((page.browser_h - this.song_title_switcher.offsetHeight)/2) + "px"
					});
				}
				if(this.side_title) {
					u.ass(this.side_title, {
						top: (page.browser_h/3 + 15) + "px"
					});
				}
				if(this.track_status) {
					u.ass(this.track_status, {
						top: (page.browser_h/3 - 5) + "px"
					});
				}
				if(this.time_status) {
					u.ass(this.time_status, {
						top: ((page.browser_h/5 * 3) + 10) + "px"
					});
				}

				if(this.player && this.player.bn_play) {
					u.ass(this.player.bn_play, {
						top: ((page.browser_h/5 * 3) - 10) + "px",
					});
				}

			}

		}

		// Scene scrolled
		div.scrolled = function(event) {
 			// u.bug("div.scrolled:", this);

			if(this.is_active) {


			}

		}

		// Scene is ready to be initialized
		div.ready = function() {
			// u.bug("div.ready:", this);

			// Avoid ever getting ready twice
			if(!this.is_ready) {

				this.is_ready = true;
				u.rc(this, "i:side_b");

				this.canvas = u.ae(this, "canvas", {width:this.offsetWidth, height:page.browser_h});
				this.ctx = this.canvas.getContext("2d");

				// Setting up clouds
				this.cloud_left_top = div.addCloud("/img/gx_cloud_mid2", "cloud left top");
				this.cloud_left_middle = div.addCloud("/img/gx_cloud_front3", "cloud left middle");
				this.cloud_left_bottom = div.addCloud("/img/gx_cloud_front2", "cloud left bottom");
				this.cloud_right_top = div.addCloud("/img/gx_cloud_mid3", "cloud right top");
				this.cloud_right_middle = div.addCloud("/img/gx_cloud_front1", "cloud right middle");
				this.cloud_right_bottom = div.addCloud("/img/gx_cloud_front3", "cloud right bottom");

				u.a.translate(this.cloud_left_top, -660, 0);
				u.a.translate(this.cloud_left_middle, -660, 0);
				u.a.translate(this.cloud_left_bottom, -660, 0);
				u.a.translate(this.cloud_right_top, 660, 0);
				u.a.translate(this.cloud_right_middle, 660, 0);
				u.a.translate(this.cloud_right_bottom, 660, 0);

				page.cN.scene.controller();
			}

		}

		div.addCloud = function(image, classname) {
			var cloud = u.ae(this, "div", {
				class: classname
			});

			u.ae(cloud, "img", {
				src: image
			})

			return cloud;
		}

		// Build side B
		div.build = function() {
			// u.bug("build side B");

			this.is_active = true;
			
			// Add dynamic content to side B
			// Animatable title track
			this.song_title = u.qs("h2", this);
			this.song_title_switcher = u.ae(this, "h2", {class:"song_title switch", html:"&nbsp;"});
			this.song_title_switcher.div = this;
			u.ass(this.song_title_switcher, {
				transform: "translate3d(0, 25px, 0)"
			});

			// Static data
			this.side_title = u.ae(this, "h3", {class:"side_title", html:"Himmelmekanik, side B"});
			this.track_status = u.ae(this, "h3", {class:"track_status"});
			this.time_status = u.ae(this, "h3", {class:"time_status"});

			u.ass(this, {display:"block"});
			this.resized();
			u.ass(this, {opacity:1});


			// Putting songs into json
			this.tracks = {}; // Declaring a json object
			var last_start = 0; // Flag for first song in this.tracks
			this.songs = u.qsa("ul > li", this); // Querying songs
			for(var i = 0; i < this.songs.length; i++) {
				var song_end = this.songs[i].getAttribute("data-trackends");
				var song_number = ("0" + (i + 1));
				var song_name = this.songs[i].innerHTML;
				var song_object = {name:song_name, track:song_number, end:song_end}; // Putting all variables into a json object
				// Creating a new key:value pair.in this.tracks where last_start is the key and song_object the value.
				this.tracks[last_start] = song_object;
				last_start = song_end; // Update flag for next song
			}
			// console.log(this.tracks);
			this.track_keys = Object.keys(this.tracks);
			// console.log("TRACK KEYS: ", this.track_keys);
			// Get easing method
			this.easing = u.easings["ease-in"];


			// Add audio player (scratch sound)
			this.stopplayer = u.mediaPlayer({type:"audio"});
			u.ac(this.stopplayer, "stopplayer");

			// Add audio player (side B)
			this.player = u.mediaPlayer({type:"audio"});
			this.player.div = this;

			// Audio player is ready
			this.player.ready = function() {
				// u.bug("player ready:", this.can_autoplay, this.can_autoplay_muted);

				// Run opening animation only once
				this.loading = function(event) {

					// Only needed once
					delete this.loading;
					//u.bug("loading", event);

					u.ac(this, "loading");
				}

				// Playback has started callback
				this.playing = function(event) {
					// u.bug("Playing", event);

					// Only needed once
					delete this.playing;

					u.rc(this, "loading");

					// make this clear
					this.is_playing = true;
			
					// Apply new transition
					u.a.transition(this.div.track_status, "all 0.5s ease-in-out");
					u.ass(this.div.track_status, {
						opacity: 1
					});

					// Apply new transition
					u.a.transition(this.div.time_status, "all 0.5s ease-in-out");
					u.ass(this.div.time_status, {
						opacity: 1
					});

					// Apply new transition
					u.a.transition(this.div.side_title, "all 0.5s ease-in-out");
					u.ass(this.div.side_title, {
						opacity: 1
					});

					// Apply new transition
					u.a.transition(this.div.song_title, "all 0.5s ease-in-out");
					u.ass(this.div.song_title, {
						opacity: 1
					});


					// Update title
					if(this.div.current_track && this.div.current_track.name) {
						this.div.updateTitle(this.div.current_track.name);
					}


					// Preload the stop asset
					this.div.stopplayer.load("/assets/stop");


					// Stop music on all interaction
					t_addevents = u.t.setTimer(this.div, "addStopEvents", 5000);
				}

				// Update track name and number based on timeupdates from the audio node
				this.timeupdate = function(event) {
					//u.bug("timeupdate", this.div.current_track_i, this.div.current_track, this.currentTime);

					// first track
					if(this.div.current_track_i === undefined) {
						// console.log(this.div.track_keys);
						this.div.current_track_i = 0;
						this.div.current_track = this.div.tracks[this.div.track_keys[this.div.current_track_i]];
						// console.log("current track ", this.div.current_track.name)
						// update html
						this.div.updateTitle(this.div.current_track.name);
						// this.div.song_title.innerHTML = this.div.current_track.name;
						this.div.track_status.innerHTML = this.div.current_track.track + "/11";

					}
					// Next track
					else if(this.currentTime > this.div.current_track.end) {

						this.div.current_track_i++;
						this.div.current_track = this.div.tracks[this.div.track_keys[this.div.current_track_i]];

						// End of last track
						if(this.div.current_track_i >= this.div.track_keys.length) {
							this.stop();

							// Go to the next step
							this.div.destroy();

							// delete this function - stop listining.
							delete this.timeupdate;

							// end of business
							return;
						}

						// update html
						this.div.updateTitle(this.div.current_track.name);
						// this.div.song_title.innerHTML = this.div.current_track.name;
						this.div.track_status.innerHTML = this.div.current_track.track + "/11";

					}


					// update timestamp
					this.div.time_status.innerHTML = u.period("m:s", {seconds: this.currentTime-this.div.track_keys[this.div.current_track_i]});


					// update timeline circle
					this.div.updateCanvas(this.currentTime);

				}


				if(!this.can_autoplay) {
					u.ac(this.div, "requires_action");

					this.bn_play = u.ae(this.div, "div", {class:"play", html:"Start"});
					this.bn_play.player = this;
					u.e.click(this.bn_play);
					this.bn_play.clicked = function() {
						this.player.loadAndPlay("/assets/side-a");

						u.a.transition(this, "all 2s ease-in-out", removeButton);
						u.ass(this, {
							opacity: 0,
						});

						function removeButton() {
							// Remove button from DOM
							this.parentNode.removeChild(this);
						};

						delete this.clicked; // Prevent multiple clicks
					}

					u.ass(this.bn_play, {
						top: ((page.browser_h/5 * 3) - 10) + "px",
						opacity: 0,
						transform: "translate3d(0, 15px, 0)"
					});

					u.a.transition(this.bn_play, "all 2s ease-in-out");
					u.ass(this.bn_play, {
						opacity: 1,
						transform: "translate3d(0, 0, 0)"
					});

				}
				else {
					this.loadAndPlay("/assets/side-a");
				}

			}

			this.addStopEvents = function(event) {
				// console.log("Stop events added");
				this.wheel_event_id = u.e.addWindowEvent(this, "wheel", this.stopOnInteraction);
				this.mousemove_event_id = u.e.addWindowEvent(this, "mousemove", this.stopOnInteraction);
				this.blur_event_id = u.e.addWindowEvent(this, "blur", this.stopOnInteraction);
				this.key_event_id = u.e.addWindowEvent(this, "keydown", this.stopOnInteraction);
			}
		
			// Play again after interaction stop
			this.playAgain = function(event) {
				this.player.play();
				
				// Slowly turning the volume back up
				this.currentVolume = 0;
				this.turnUpVolume = function() {
					if (this.currentVolume >= 1) {
						// console.log("stopping interval")
						u.t.resetInterval(this.t_vol);
					}
					else {
						// console.log(this.currentVolume);
						this.currentVolume = u.round(this.currentVolume + 0.01, 2);
						if (this.currentTime >= 1) {
							this.currentVolume = 1;
						}
						this.player.volume(this.currentVolume);
					}
				}
				this.t_vol = u.t.setInterval(this, "turnUpVolume", 20);

				this.moveCloudsBack(event);

				u.t.setTimer(this, "reactivatePlayback", 5000);

				//Show time status
				u.a.transition(this.time_status, "all 1.5s ease-in-out 1.5s");
				u.ass(this.time_status, {
					opacity: 1,
					// transform: "translate3d(0, 0, 0)"

				})
						
			}

			this.reactivatePlayback = function () {
				this.addStopEvents();
				this.is_stopped = false;
			}

			this.moveCloudsBack = function(event) {
				u.a.transition(this.cloud_left_top, "all 3s ease-in-out");
				u.a.transition(this.cloud_left_middle, "all 4s ease-in-out");
				u.a.transition(this.cloud_left_bottom, "all 2.5s ease-in-out");

				u.a.transition(this.cloud_right_top, "all 4s ease-in-out");
				u.a.transition(this.cloud_right_middle, "all 2.5s ease-in-out");
				u.a.transition(this.cloud_right_bottom, "all 3s ease-in-out");

				u.a.translate(this.cloud_left_top, -660, 0);
				u.a.translate(this.cloud_left_middle, -660, 0);
				u.a.translate(this.cloud_left_bottom, -660, 0);

				u.a.translate(this.cloud_right_top, 660, 0);
				u.a.translate(this.cloud_right_middle, 660, 0);
				u.a.translate(this.cloud_right_bottom, 660, 0);

			}

			// Scratch on interaction
			this.stopOnInteraction = function(event) {
				// u.bug("ignore input");
//					u.e.kill(event);

				if(!this.is_stopped) {
					this.is_stopped = true;
					this.player.volume(0);
					this.stopplayer.play(0);
					this.player.pause();
					// this.t_stop = u.t.setTimer(this, "playAgain", 5000);


					// Clouds
					// this.t_clouds = u.t.setTimer(this, "moveCloudsBack", 1000);

					u.a.transition(this.cloud_left_top, "all .2s ease-in-out");
					u.a.transition(this.cloud_left_middle, "all .3s ease-in-out");
					u.a.transition(this.cloud_left_bottom, "all .4s ease-in-out");

					u.a.transition(this.cloud_right_top, "all .4s ease-in-out");
					u.a.transition(this.cloud_right_middle, "all .2s ease-in-out");
					u.a.transition(this.cloud_right_bottom, "all .3s ease-in-out");

					u.a.translate(this.cloud_left_top, (page.browser_w / 4 - 200), 0);
					u.a.translate(this.cloud_left_middle, (page.browser_w / 4 - 450), 0);
					u.a.translate(this.cloud_left_bottom, (page.browser_w / 4 - 400), 0);
		
					u.a.translate(this.cloud_right_top, (- page.browser_w / 4 + 200), 0);
					u.a.translate(this.cloud_right_middle, (- page.browser_w / 4 + 350), 0);
					u.a.translate(this.cloud_right_bottom, (- page.browser_w / 4 + 300), 0);

					//Show start button
					u.ac(this, "requires_action");
//						this.time_status.innerHTML = "Start";
					this.bn_play = u.ae(this, "div", {class:"play", html:"Start"});
					this.bn_play.player = this;
					u.e.click(this.bn_play);
					this.bn_play.clicked = function(event) {
						page.cN.scene.side_b.playAgain(event);

						u.a.transition(this, "all 1.5s ease-in-out", removeButton);
						u.ass(this, {
							opacity: 0,
						});
						
						function removeButton() {
							// Remove button from DOM
							this.parentNode.removeChild(this);
						};

						delete this.clicked; // Prevent multiple clicks

					}

					u.ass(this.bn_play, {
						top: ((page.browser_h/5 * 3) - 10) + "px",
						opacity: 0,
						transform: "translate3d(0, 15px, 0)"
					});

					u.a.transition(this.bn_play, "all 1.5s ease-in-out 0.5s");
					u.ass(this.bn_play, {
						opacity: 1,
						transform: "translate3d(0, 0, 0)"
					});

					//Hide time_status
					u.a.transition(this.time_status, "all 0.5s ease-in-out");
					u.ass(this.time_status, {
						opacity: 0,
						// transform: "translate3d(0, 15px, 0)"

					})




					// Remove stop events
					u.e.removeWindowEvent(this, "wheel", this.wheel_event_id);
					u.e.removeWindowEvent(this, "mousemove", this.mousemove_event_id);
					u.e.removeWindowEvent(this, "blur", this.blur_event_id);
					u.e.removeWindowEvent(this, "keydown", this.key_event_id);
				}

			}

			// Update progress canvas
			this.updateCanvas = function(progress) {
//						u.bug("Resize ctx")
				// Clear canvas
				this.ctx.clearRect(0, 0, page.browser_w, page.browser_h);

				// // Create orange square
				// this.ctx.beginPath();
				// this.ctx.rect(0, 0, page.browser_w, page.browser_h);
				// this.ctx.fillStyle = "#f0bd18";
				// this.ctx.fill();
				// this.ctx.closePath();

			
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
			this.updateTitle = function(title) {

				// Song title
				this.song_title_switcher.innerHTML = title;

				// Resize page to re-position elements
				page.resized();	

				this.song_title_switcher.transitioned = function() {


					this.div.song_title.innerHTML = this.innerHTML;

					page.resized();
					

					u.ass(this.div.song_title, {
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


			// Append players to DOM (just to avoid any browser issues)
			u.ae(this, this.player);
			u.ae(this, this.stopplayer);

		}
		
		// Destroy side B
		div.destroy = function() {
			// u.bug("DESTROY", this)
	
			// Fading elements and div out
			u.a.transition(this.song_title, "all 1.5s ease-in-out");
			u.ass(this.song_title, {
				opacity:0, 
				transform: "scale(0.85)"
			});
			u.a.transition(this, "all 1s ease-in-out");
			u.ass(this, {opacity:0});


			// Remove stop events
			u.e.removeWindowEvent(this, "wheel", this.wheel_event_id);
			u.e.removeWindowEvent(this, "mousemove", this.mousemove_event_id);
			u.e.removeWindowEvent(this, "blur", this.blur_event_id);
			u.e.removeWindowEvent(this, "keydown", this.key_event_id);


			u.t.setTimer(this, "finalize", 1700);
			this.finalize = function() {
				u.ass(this, {
					"display":"none"
				});
				this.is_done = true;

				// Let controller decide what to do
				page.cN.scene.controller();
			}

			
		}

		// div is ready
		div.ready();
	}
}

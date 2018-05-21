Util.Objects["front"] = new function() {
	this.init = function(scene) {

		scene.resized = function(event) {
//			u.bug("scene.resized:", this);

			if(this.div_article) {
				// Adjust top padding
				if(this.div_article.h1) {
					u.ass(this.div_article, {
						paddingTop: ((page.browser_h - this.div_article.h1.offsetHeight) / 2) / 1.8 +"px",
					});
				}
			}


			if(this.side_a) {
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
					this.side_a.radius = this.side_a.center_y - 35;

					if(this.side_a.is_ready) {
						window.scrollTo(0,this.side_a.offsetTop);
					}
				}

				if(this.side_a.song_title) {
					u.ass(this.side_a.song_title, {
						top: ((page.browser_h - this.side_a.song_title.offsetHeight)/2) + "px"
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
			}


			if(this.intermezzo) {
				// Adjust height
				u.ass(this.intermezzo, {
					height: page.browser_h+"px",
				});
			}

			if(this.side_b) {
				// Adjust height
				u.ass(this.side_b, {
					height: page.browser_h+"px",
				});
			}

			if(this.finale) {
				// Adjust height
				u.ass(this.finale, {
					height: u.browserH()+"px",
				});
			}
		}

		scene.scrolled = function(event) {
			u.bug("scene.scrolled:", this);

			// Implemented stagewise in front, side_a, etc

		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);

			u.rc(this, "i:front");


			this.div_article = u.qs("div.article", this);
			this.div_article.h1 = u.qs("h1", this.div_article);
			this.div_article.nodes = u.qsa("h1,p", this.div_article);

			var i, node;
			for(i = 0; i < this.div_article.nodes.length; i++) {
				node = this.div_article.nodes[i];
				u.ass(node, {
					opacity: 0,
					transform: "translate3D(0, 15px, 0)"
				});
			}
			// Article ready to be shown
			u.ass(this.div_article, {
				opacity: 1,
			});



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
			// this.side_b.player = u.mediaPlayer({type:"audio"});
			// u.ae(this.side_b, this.side_b.player);
//			this.side_b.loadAndPlay("/assets/sideb");


			// FINALE
			this.finale = u.ae(this, "div", {class:"finale"});
			u.ae(this.finale, "h3", {html:"Tak fordi du tog dig tid til at lytte med."});
			u.ae(this.finale, "p", {html:'<span class="listen">Lyt igen</span> eller <span class="question">stil mig et spørgsmål, hvis du har lyst</span>.'});
			u.ae(this.finale, "p", {html:"Bh<br />Fred og Kærlighed Marc Facchini"});
			u.wc(this.finale, "div", {class:"cell"});
			u.wc(this.finale, "div", {class:"table"});


			page.resized();

			this.buildFront();
		}


		// Build Letter ("Front page")
		scene.buildFront = function() {
			// u.bug("buildFront");

			this.current_front_node_i = 0;
			this.current_front_node = this.div_article.nodes[this.current_front_node_i++];

			u.a.transition(this.current_front_node, "all 2s ease-in-out");
			u.ass(this.current_front_node, {
				opacity: 1,
				transform: "translate3D(0, 0, 0)"
			});


			this.current_front_node = this.div_article.nodes[this.current_front_node_i++];
			u.a.transition(this.current_front_node, "all 2s ease-in-out " + 500 + "ms");
			u.ass(this.current_front_node, {
				opacity: 1,
				transform: "translate3D(0, 0, 0)"
			});


			this.scrolled = function(event) {

				// If side_a scrolled into view
				if(this.side_a.offsetTop - page.browser_h < page.scroll_y) {

					// Caculate progress
					var progress = ((page.scroll_y + page.browser_h) - this.side_a.offsetTop) / page.browser_h;
					var current_degree = Math.PI * progress;
//					u.bug("current_degree", current_degree);


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
					if(!this.side_a.is_ready && this.side_a.offsetTop <= page.scroll_y) {

						// u.bug("buildSideA scroll" + page.scroll_y);
						this.buildSideA();
					}

				}

				// still front nodes - reveal as scrolled into view
				if(this.div_article.nodes.length > this.current_front_node_i) {

					// Next node in view
					if(this.div_article.nodes[this.current_front_node_i].offsetTop - page.browser_h < page.scroll_y) {

						this.current_front_node = this.div_article.nodes[this.current_front_node_i++];

						// Show node
						u.a.transition(this.current_front_node, "all 2s ease-in-out");
						u.ass(this.current_front_node, {
							opacity: 1,
							transform: "translate3D(0, 0, 0)"
						});

					}

				}

			}

			this.is_front_built = true;
		}


		// Build Side A
		scene.buildSideA = function() {
			// u.bug("buildSideA");

			// Avoid ever getting ready twice
			if(!this.side_a.is_ready) {

				this.side_a.is_ready = true;

				this.side_a.song_title = u.ae(this.side_a, "h2", {class:"song_title", html:"-"});
				this.side_a.side_title = u.ae(this.side_a, "h3", {class:"side_title", html:"Himmelmekanik, Side A"});
				this.side_a.track_status = u.ae(this.side_a, "h3", {class:"track_status"});
				this.side_a.time_status = u.ae(this.side_a, "h3", {class:"time_status"});

				this.side_a.player = u.mediaPlayer({type:"audio"});
				this.side_a.player.side_a = this.side_a;
				this.side_a.player.ready = function() {
//					u.bug("player ready:", this);

					this.easing = u.easings["ease-in-slow"];

					this.diagonal_radius = Math.ceil(Math.sqrt(Math.pow(page.browser_w, 2) + Math.pow(page.browser_w, 2)) / 2);
					this.transitioned = function() {
						page.cN.scene.is_side_a_built = true;

						u.a.transition(this.side_a.side_title, "all 0.5s ease-in-out");
						u.ass(this.side_a.side_title, {
							opacity: 1
						});
					}
					this.loadGrow = function(progress) {

						var easing = this.easing(progress);
						// console.log(easing);
						// console.log(progress);

						radius = easing*this.diagonal_radius < this.side_a.radius*0.025 ? this.side_a.radius*0.025 : easing*this.diagonal_radius;

						// Clear canvas
						this.side_a.ctx.clearRect(0, 0, page.browser_w, page.browser_h);

						// Draw dot
						this.side_a.ctx.beginPath();
						this.side_a.ctx.fillStyle = "#f0bd18";
						this.side_a.ctx.arc(this.side_a.center_x, this.side_a.center_y, radius, 0, (2*Math.PI));
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
						this.side_a.ctx.arc(this.side_a.center_x, this.side_a.center_y, this.side_a.radius, -1*Math.PI, 1*Math.PI);
						this.side_a.ctx.stroke();
						this.side_a.ctx.closePath();

					}

					this.loading = function(event) {
						// u.bug("loading", event);

						// Start growing animation
						u.a.requestAnimationFrame(this, "loadGrow", 6000);
					}
					this.playing = function(event) {
						// u.bug("Playing", event);

						this.is_playing = true;
					}


					this.tracks = {
						"0":{name:"Metamorfose", track:"01", end: "277"},
						"277":{name:"Damgulanna", track:"02", end: "481"},
						"481":{name:"Selvom jeg tæller", track:"03", end:"757"},
						"757":{name:"Malmös søn, under håndvasken", track:"04", end: "973"},
						"973":{name:"Snekkersten Al Safira", track:"05", end: "1260"},
					}
					this.track_keys = Object.keys(this.tracks);


					this.timeupdate = function(event) {

						if(this.current_track_i === undefined) {
							this.current_track_i = 0;
							this.current_track = this.tracks[this.track_keys[this.current_track_i]];

							this.side_a.song_title.innerHTML = this.current_track.name;
							this.side_a.track_status.innerHTML = this.current_track.track + "/10";
						}
						else if(this.currentTime > this.current_track.end) {
							this.current_track_i++;
							this.current_track = this.tracks[this.track_keys[this.current_track_i]];

							// End of last track
							if(this.current_track_i >= this.track_keys.length) {
								this.stop();
								page.cN.scene.buildIntermezzo();
								delete this.timeupdate;
								return;
							}

							this.side_a.song_title.innerHTML = this.current_track.name;
							this.side_a.track_status.innerHTML = this.current_track.track + "/10";

							page.resized();
						}

						this.side_a.time_status.innerHTML = u.period("m:s", {seconds: this.currentTime-this.track_keys[this.current_track_i]});

						this.side_a.updateCanvas(this.currentTime);

						// only once
						if(page.cN.scene.is_side_a_built && !this.is_details_shown) {
							this.is_details_shown = true;

							u.a.transition(this.side_a.song_title, "all 0.5s ease-in-out");
							u.ass(this.side_a.song_title, {
								opacity: 1
							});

							u.a.transition(this.side_a.track_status, "all 0.5s ease-in-out");
							u.ass(this.side_a.track_status, {
								opacity: 1
							});

							u.a.transition(this.side_a.time_status, "all 0.5s ease-in-out");
							u.ass(this.side_a.time_status, {
								opacity: 1
							});

						}


						// Update title

// 						u.bug("Update", event, this.currentTime);
					}

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

					this.loadAndPlay("/assets/side-a");

				}
				u.ae(this.side_a, this.side_a.player);

				// FOR DEBUGGING
				window.player = this.side_a.player;

				this.side_a.ignoreWheel = function(event) {
					// u.bug("ignore wheel");
					u.e.kill(event);
				}
				u.e.addEvent(this.side_a, "wheel", this.side_a.ignoreWheel);
				
//				this.is_side_a_built = true;

				page.resized();
			}
			
		}


		scene.buildIntermezzo = function() {
//			u.bug("buildIntermezzo");


			// Avoid ever getting ready twice
			if(!this.intermezzo.is_ready) {

				this.intermezzo.is_ready = true;
			

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
						display:"block"
					});
					u.ass(this.side_a, {
						display:"none"
					});

					u.a.transition(this, "all 0.5s ease-in-out");
					u.ass(this, {
						opacity: 1
					});

					u.t.setTimer(page.cN.scene, "buildSideB", 10000);
				}

				this.intermezzo.undo = function(progress) {
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
					this.side_a.ctx.arc(this.side_a.center_x, this.side_a.center_y, easing*this.side_a.player.diagonal_radius, 0, (2*Math.PI));
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
				u.a.requestAnimationFrame(this.intermezzo, "undo", 2000);

			}

		}

		scene.buildSideB = function() {
			console.log("buildSideB");
		}

		// scene is ready
		scene.ready();
	}
}

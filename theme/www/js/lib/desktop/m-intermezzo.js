Util.Modules["intermezzo"] = new function() {
	this.init = function(div) {

		div.resized = function(event) {
			// u.bug("div.resized:", this);

			// If letter exists and it is active (shown or partially shown)
			if(this.is_active) {
				
				u.a.translate(this.cloud_left_top, (page.browser_w / 4 - 150), 0);
				u.a.translate(this.cloud_left_middle, (page.browser_w / 4 - 400), 0);
				u.a.translate(this.cloud_left_bottom, (page.browser_w / 4 - 200), 0);
	
				u.a.translate(this.cloud_right_top, (- page.browser_w / 4 + 300), 0);
				u.a.translate(this.cloud_right_middle, (- page.browser_w / 4 + 300), 0);
				u.a.translate(this.cloud_right_bottom, (- page.browser_w / 4 + 200), 0);
	

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

				page.cN.scene.intermezzo.table = u.wc(page.cN.scene.intermezzo, "div", {
					class:"table"
				})

				page.cN.scene.intermezzo.cell = u.wc(page.cN.scene.intermezzo.table, "div", {
					class:"cell"
				})

				// Setting up clouds
				this.addCloud = function(image, classname) {
					var cloud = u.ae(this, "div", {
						class: classname
					});
		
					u.ae(cloud, "img", {
						src: image
					})
		
					return cloud;
				}
				
				this.cloud_left_top = this.addCloud("/img/gx_cloud_mid2", "cloud left top");
				this.cloud_left_middle = this.addCloud("/img/gx_cloud_front3", "cloud left middle");
				this.cloud_left_bottom = this.addCloud("/img/gx_cloud_front2", "cloud left bottom");
				this.cloud_right_top = this.addCloud("/img/gx_cloud_mid3", "cloud right top");
				this.cloud_right_middle = this.addCloud("/img/gx_cloud_front1", "cloud right middle");
				this.cloud_right_bottom = this.addCloud("/img/gx_cloud_front3", "cloud right bottom");

				u.a.translate(this.cloud_left_top, -660, 0);
				u.a.translate(this.cloud_left_middle, -660, 0);
				u.a.translate(this.cloud_left_bottom, -660, 0);
				u.a.translate(this.cloud_right_top, 660, 0);
				u.a.translate(this.cloud_right_middle, 660, 0);
				u.a.translate(this.cloud_right_bottom, 660, 0);

				this.is_ready = true;
				u.rc(this, "i:intermezzo");
				
				page.cN.scene.controller();
			}

		}

		// Build Intermezzo
		div.build = function() {
			// u.bug("build intermezzo");


			u.ass (this, {
				"display":"block",
			})

			u.a.transition(this, "all 2s ease-in");
			u.ass (this, {
				"opacity":1
			})

			this.resized();

			// Clouds
			var transition_time = 1;

			u.a.transition(this.cloud_left_top, "all " + transition_time * 1.7 + "s ease-in-out");
			u.a.transition(this.cloud_left_middle, "all " + transition_time * 1.6 + "s ease-in-out");
			u.a.transition(this.cloud_left_bottom, "all " + transition_time * 1.2 + "s ease-in-out");

			u.a.transition(this.cloud_right_top, "all " + transition_time * 1.4 + "s ease-in-out");
			u.a.transition(this.cloud_right_middle, "all " + transition_time * 1.3 + "s ease-in-out");
			u.a.transition(this.cloud_right_bottom, "all " + transition_time + "s ease-in-out");

			u.a.translate(this.cloud_left_top, (page.browser_w / 4 - 150), 0);
			u.a.translate(this.cloud_left_middle, (page.browser_w / 4 - 400), 0);
			u.a.translate(this.cloud_left_bottom, (page.browser_w / 4 - 200), 0);

			u.a.translate(this.cloud_right_top, (- page.browser_w / 4 + 150), 0);
			u.a.translate(this.cloud_right_middle, (- page.browser_w / 4 + 300), 0);
			u.a.translate(this.cloud_right_bottom, (- page.browser_w / 4 + 200), 0);

			u.t.setTimer(this, this.destroy, 10000);
			this.is_active = true;

			
		}
		
		// Destroy Intermezzo
		div.destroy = function() {

			this.moveCloudsBack = function(event) {
				var transition_time = 1;

				u.a.transition(this.cloud_left_top, "all " + transition_time * 1.7 + "s ease-in-out");
				u.a.transition(this.cloud_left_middle, "all " + transition_time * 1.6 + "s ease-in-out");
				u.a.transition(this.cloud_left_bottom, "all " + transition_time * 1.2 + "s ease-in-out");
	
				u.a.transition(this.cloud_right_top, "all " + transition_time * 1.4 + "s ease-in-out");
				u.a.transition(this.cloud_right_middle, "all " + transition_time * 1.3 + "s ease-in-out");
				u.a.transition(this.cloud_right_bottom, "all " + transition_time + "s ease-in-out");

				u.a.translate(this.cloud_left_top, -660, 0);
				u.a.translate(this.cloud_left_middle, -660, 0);
				u.a.translate(this.cloud_left_bottom, -660, 0);

				u.a.translate(this.cloud_right_top, 660, 0);
				u.a.translate(this.cloud_right_middle, 660, 0);
				u.a.translate(this.cloud_right_bottom, 660, 0);

			}

			u.a.transition(this, "all 1s ease-in")
			u.ass(this, {
				"opacity":0
			})

			this.moveCloudsBack();

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

Util.Objects["intermezzo"] = new function() {
	this.init = function(div) {

		div.resized = function(event) {
			// u.bug("div.resized:", this);

			// If letter exists and it is active (shown or partially shown)
			if(this.is_active) {


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
				u.rc(this, "i:intermezzo");

				page.cN.scene.intermezzo.table = u.wc(page.cN.scene.intermezzo, "div", {
					class:"table"
				})

				page.cN.scene.intermezzo.cell = u.wc(page.cN.scene.intermezzo.table, "div", {
					class:"cell"
				})

				// Setting up clouds
				this.cloud_left_top = div.addCloud("/img/gx_cloud_front1", "cloud left top");
				this.cloud_left_middle = div.addCloud("/img/gx_cloud_front3", "cloud left middle");
				this.cloud_left_bottom = div.addCloud("/img/gx_cloud_front2", "cloud left bottom");
				this.cloud_right_top = div.addCloud("/img/gx_cloud_front2", "cloud right top");
				this.cloud_right_middle = div.addCloud("/img/gx_cloud_front1", "cloud right middle");
				this.cloud_right_bottom = div.addCloud("/img/gx_cloud_front3", "cloud right bottom");
				
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

		// Build Letter
		div.build = function() {
			u.bug("build intermezzo");

			this.is_active = true;
			
			u.ass(this, {display:"block"});
			this.resized();
			u.ass(this, {opacity:1});


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

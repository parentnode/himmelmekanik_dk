Util.Objects["front"] = new function() {
	this.init = function(scene) {

		scene.resized = function(event) {
			// u.bug("scene.resized:", this);


			// Calculate diagonal_radius (half diameter of fully covering circle - used in multiple places)
			this.diagonal_radius = Math.ceil(Math.sqrt(Math.pow(page.browser_w, 2) + Math.pow(page.browser_w, 2)) / 2);

			// Set scene height
			u.ass(this, {
				height: page.browser_h + "px"
			});

			// If letter exists
			if(this.letter) {
				this.letter.resized();
			}

			// If side A exists
			if(this.side_a) {
				this.side_a.resized();
			}

			// If intermezzo exists
			if(this.intermezzo) {
				this.intermezzo.resized();
			}

			// If side B exists
			if(this.side_b) {
				this.side_b.resized();
			}

			// If finale exists
			if(this.finale) {
				this.finale.resized();
			}

		}

		// Scene scrolled
		scene.scrolled = function(event) {
 			// u.bug("scene.scrolled:", this);

		}


		// Scene is ready to be initialized
		scene.ready = function() {
			u.bug("scene.ready:", this);

			if(!this.is_ready) {

				u.rc(this, "i:front");


				// Page contains 5 sections: 
				// Letter, Side A, Intermezzo, Side B and Finale
				// Get reference for each section


				// LETTER
				this.letter = u.qs("div.letter", this);
				u.o.letter.init(this.letter);
				


				// SIDE A
				this.side_a = u.qs("div.side_a", this);
				u.o.side_a.init(this.side_a);

				// INTERMEZZO
				this.intermezzo = u.qs("div.intermezzo", this);
				u.o.intermezzo.init(this.intermezzo);


				// SIDE B
				this.side_b = u.qs("div.side_b", this);
				u.o.side_b.init(this.side_b);


				// FINALE
				this.finale = u.qs("div.finale", this);
				u.o.finale.init(this.finale);


				// Apply global text scaling
				u.textscaler(this, {
					"min_width":600,
					"max_width":1600,
					"unit":"px",
					"h1":{
						"min_size":40,
						"max_size":110
					},
					"h2":{
						"min_size":30,
						"max_size":80
					},
					"h3":{
						"min_size":12,
						"max_size":18
					},
					"p":{
						"min_size":14,
						"max_size":32
					},
				});


				// Reset any scroll position (fixes reload offsets)
				window.scrollTo(0, 0);
				this.letter.scrollTo(0, 0);
				

				// initial page size recalculation
				this.resized();


				// Mark as ready
				this.is_ready = true;


				// Decide what to do next
				// this.controller();

			}

		}


		// Build Letter
		scene.controller = function() {

			if(this.is_ready) {

				// this.letter.is_done = true;
				// this.side_a.is_done = true;
				// this.intermezzo.is_done = true;
				// this.side_b.is_done = true;

				if(this.letter.is_ready && !this.letter.is_active && !this.letter.is_done) {
					this.letter.build();
				}
				else if(this.letter.is_done && this.side_a.is_ready && !this.side_a.is_active && !this.side_a.is_done) {
					this.side_a.build();
				}
				else if(this.side_a.is_done && this.intermezzo.is_ready && !this.intermezzo.is_active && !this.intermezzo.is_done) {
					this.intermezzo.build();
				}
				else if(this.intermezzo.is_done && this.side_b.is_ready && !this.side_b.is_active && !this.side_b.is_done) {
					this.side_b.build();
				}
				else if(this.side_b.is_done && this.finale.is_ready && !this.finale.is_active && !this.finale.is_done) {
					this.finale.build();
				}

			}

		}


		// scene is ready
		scene.ready();
	}
}

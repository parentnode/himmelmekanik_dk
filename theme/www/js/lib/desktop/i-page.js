Util.Objects["page"] = new function() {
	this.init = function(page) {
		// u.bug_console_only = false;


		// header reference
		page.hN = u.qs("#header");

		// content reference
		page.cN = u.qs("#content", page);

		// footer reference
		page.fN = u.qs("#footer");


		// global resize handler 
		page.resized = function() {
			// u.bug("page.resized", this);

			this.browser_h = u.browserH();
			this.browser_w = u.browserW();

			u.ass(this.cN, {
				height: this.browser_h + "px"
			});

			// forward scroll event to current scene
			if(this.cN && this.cN.scene && typeof(this.cN.scene.resized) == "function") {
				this.cN.scene.resized();
			}
		}

		// global scroll handler 
		page.scrolled = function() {
			// u.bug("page.scrolled:", this);

			this.scroll_y = u.scrollY();

			// forward scroll event to current scene
			if(this.cN && this.cN.scene && typeof(this.cN.scene.scrolled) == "function") {
				this.cN.scene.scrolled();
			}
		}

		// Page is ready
		page.ready = function() {
			// u.bug("page.ready:", this);

			// page is ready to be shown - only initalize if not already shown
			if(!this.is_ready) {

				this.is_ready = true;
				u.rc(this, "i:page");


				// Map scene reference
				this.cN.scene = u.qs(".scene", this);

				// set resize handler
				u.e.addWindowEvent(this, "resize", "resized");
				// set scroll handler
				u.e.addWindowEvent(this, "scroll", "scrolled");


				// initial page size recalculation
				this.resized();


				// Load scene, when font's are ready
				this.fontsLoaded = function() {
					u.bug("fontsLoaded");


					// Initialize scene
					if (u.hc(this.cN.scene, "front") ) {
						u.o.front.init(page.cN.scene);
					}
					else {
						u.o.cookies.init(page.cN.scene);
					}

				}

				// Preload font
				u.fontsReady(this, 
					{"family":"GT America", "weight":900}
				);

			}

		}

		// ready to start page builing process
		page.ready();
	}
}
u.e.addDOMReadyEvent(function() {u.o.page.init(page)});

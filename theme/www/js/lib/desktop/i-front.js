Util.Objects["front"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));
		}

		scene.scrolled = function() {
//			u.bug("scene.scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			this.side_a = u.mediaPlayer({type:"audio", playpause:true});
			u.ae(this, this.side_a);
			u.ass(this.side_a, {
				height: u.browserH()+"px",
			});

			this.intermezzo = u.ae(this, "div");
			u.ae(this.intermezzo, "p", {html:"‘Himmelmekanik’ er mixet som en LP, derfor vender vi lige pladen."});
			u.ae(this.intermezzo, "p", {html:"Det giver dig lige 10 sekunder til at sætte en tanke i gang."});
			u.ass(this.intermezzo, {
				height: u.browserH()+"px",
			});

			this.side_b = u.mediaPlayer({type:"audio"});
			u.ae(this, this.side_b);
			u.ass(this.side_b, {
				height: u.browserH()+"px",
			});

			this.finale = u.ae(this, "div");
			u.ae(this.finale, "h3", {html:"Tak fordi du tog dig tid til at lytte med."});
			u.ae(this.finale, "p", {html:'<span class="listen">Lyt igen</span> eller <span class="question">stil mig et spørgsmål, hvis du har lyst</span>.'});
			u.ae(this.finale, "p", {html:"Bh<br />Fred og Kærlighed Marc Facchini"});
			u.ass(this.finale, {
				height: u.browserH()+"px",
			});

		}

		// scene is ready
		scene.ready();
	}
}

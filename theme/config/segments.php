<?php

// local segmentation
// setup default site runs only on desktop to minimize maintenance
$segments_config["www"] = array(
	
	"desktop_edge"  => "desktop",
	"desktop"       => "desktop",
	"desktop_ie11"  => "desktop",

	"smartphone"    => "smartphone",

	"desktop_ie9"   => "unsupported",
	"desktop_ie10"  => "unsupported",
	"desktop_light" => "unsupported",
	"tv"            => "unsupported",

	"tablet"        => "tablet",
	"tablet_light"  => "tablet",

	"mobile"        => "unsupported",
	"mobile_light"  => "unsupported",

	"seo"           => "seo"

);

?>
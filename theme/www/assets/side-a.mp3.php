<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


if(isset($_SERVER["HTTP_REFERER"]) && strpos($_SERVER["HTTP_REFERER"], $_SERVER["HTTP_HOST"]) > 1) {

	$file = LOCAL_PATH."/library/assets/side-a.mp3";

	header('Content-Length: ' . filesize($file));
	ob_clean();
	// enable downloading large file without memory issues
	ob_end_flush();
	//flush();
	readfile($file);

}

?>
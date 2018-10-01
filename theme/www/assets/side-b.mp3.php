<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


if(isset($_SERVER["HTTP_REFERER"]) && strpos($_SERVER["HTTP_REFERER"], $_SERVER["HTTP_HOST"]) > 1) {

	$file = LOCAL_PATH."/library/assets/side-b.mp3";


	$size = filesize($file);

	// check file existence
	$fm = @fopen($file, 'rb');
	if(!$fm) {
		header ("HTTP/1.1 505 Internal server error");
		return;
	}

	$begin = 0;
	$end = $size - 1;

	// is the server requesting a range (partial download)
	if(isset($_SERVER['HTTP_RANGE'])) {

		if(preg_match('/bytes=\h*(\d+)-(\d*)[\D.*]?/i', $_SERVER['HTTP_RANGE'], $matches)) {
			$begin	= intval($matches[1]);
			if(!empty($matches[2])) {
				$end = intval($matches[2]);
			}
		}
	}

	// output correct header
	if (isset($_SERVER['HTTP_RANGE'])) {
		header('HTTP/1.1 206 Partial Content');
	}
	else {
		header('HTTP/1.1 200 OK');
	}

	
	header("Content-Type: audio/mp3");

	header('Accept-Ranges: bytes');
	header('Content-Length:' . (($end - $begin) + 1));

	if(isset($_SERVER['HTTP_RANGE'])) {
		header("Content-Range: bytes $begin-$end/$size");
	}

	header("Content-Disposition: inline; filename=".basename($file));
	header("Content-Transfer-Encoding: binary");


	ob_clean();
	// enable downloading large file without memory issues
	ob_end_flush();


	$cur = $begin;
	fseek($fm, $begin, 0);

	while(!feof($fm) && $cur <= $end && (connection_status() == 0)) {
		print fread($fm, min(1024 * 16, ($end - $cur) + 1));
		$cur += 1024 * 16;
	}



	// header("Content-Type: audio/mp3");
	// header('Accept-Ranges: bytes');
	// header('Content-Length: ' . filesize($file));


	// ob_clean();
	// // enable downloading large file without memory issues
	// ob_end_flush();
	// //flush();
	// readfile($file);

}

?>
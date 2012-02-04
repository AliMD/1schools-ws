<?php
session_start();
function gen_random_string($length){
	$characters = "0123456789";
	$real_string_length = strlen($characters) - 1;
	for($p=0;$p<$length;$p++){
		$string .= $characters[mt_rand(0, $real_string_length)];
	}
	return $string;
}
$sec_code = gen_random_string(7);
$text_array = str_split($sec_code);

$NewImage = @imagecreate(120, 30) or die('Cannot initialize new GD image stream');
$background_color = imagecolorallocate($NewImage, 255, 255, 255);

$cntr=0;
foreach($text_array as $letter){
	$textcolor = imagecolorallocate($NewImage, rand(0,200), rand(0,200), rand(0,200));
	$spacing = (rand(1,2)+2*($cntr*8));
	
	imagestring($NewImage, 100, $spacing+6, rand(0,10)+3, $letter, $textcolor);
	$cntr++;
}

header('Content-Type: image/jpeg');
header("Cache-Control: no-cache");
header("Pragma: no-cache");

imagejpeg($NewImage);
imagedestroy($NewImage);
$_SESSION['security_code'] = $sec_code;
?>
<?php
session_start();

class CaptchaSecurityImages {

	var $font = '../fonts/yekan.ttf';

	function generateCode($characters) {
		/* list all possible characters, similar looking characters and vowels have been removed */
		$possible = '0123456789';
		$code = '';
		$i = 0;
		while ($i < $characters) { 
			$code .= substr($possible, mt_rand(0, strlen($possible)-1), 1);
			$i++;
		}
		return $code;
	}
	
	function CaptchaSecurityImages($width,$height,$characters) {
		$code = $this->generateCode($characters);
		
		/* font size will be 70% of the image height */
		$font_size = $height * 0.7;
		$image = @imagecreate($width, $height) or die('Cannot initialize new GD image stream');
		
		/* set the colours */
		$background_color = imagecolorallocate($image, 255, 255, 255);
		$text_color = imagecolorallocate($image, mt_rand(15,30), mt_rand(30,50), mt_rand(80,120));
		$noise_color = imagecolorallocate($image, mt_rand(140,160), mt_rand(140,160), mt_rand(140,160));
		
		
		/* create textbox and add text */
		$textbox = imagettfbbox($font_size, 0, $this->font, $code) or die('Error in imagettfbbox function');
		$x = ($width - $textbox[4])/2;
		$y = ($height - $textbox[5])/2;
		imagettftext($image, $font_size, 0, $x, $y, $text_color, $this->font , $code) or die('Error in imagettftext function');
		
		/* output captcha image to browser */
		header('Content-Type: image/jpeg');
		imagejpeg($image);
		imagedestroy($image);
		$_SESSION['security_code'] = $code;
	}
}

$captcha = new CaptchaSecurityImages(120,30,7);
?>
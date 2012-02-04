<?php 
session_start();

$name = $_POST['name'];
$email = $_POST['email'];
$tel = $_POST['phone'];
$course = $_POST['course'];

$valid_name='';
$valid_email='';
$valid_tel='';
$valid_course='';

$error_name=''; 
$error_email=''; 
$error_tel=''; 
$error_course=''; 

if(isset($_POST['submit'])){

   if( $_SESSION['security_code'] == $_POST['captcha'] && !empty($_SESSION['security_code'] ) ) {

		if (preg_match("/^[^\[\]\\~`\!\@\#\$%\^&\*()_=\+\|}{\"'\:;\/\?\.0-9,-]+$/i",$name))
		{
		$valid_name=$name;
		}
		else
		{ 
		$error_name='نام'; 
		}
		
		if (preg_match("/^[a-z0-9]+(?:[\.-]?[a-z0-9]+)*@[a-z0-9]+([-]?[a-z0-9]+)*[\.-]?[a-z0-9]+([-]?[a-z0-9]+)*([\.-]?[a-z]{2,})*(\.[a-z]{2,5})+$/i",$email))
		{
		$valid_email=$email;
		}
		else
		{ 
		$error_email='ایمیل'; 
		}
		
		if (preg_match("[^[0-9]+$]",$tel))
		{
		$valid_tel=$tel;
		}
		else
		{ 
		$error_tel='تلفن'; 
		}
		
		if (preg_match('/^[A-z]+$/',$course))
		{
		$valid_course=$course;
		}
		else
		{ 
		$error_course='دوره'; 
		}
		
		if(( strlen($valid_name)>0)&&(strlen($valid_email)>0)&&(strlen($valid_tel)>0)&&(strlen($valid_course)>0) ){
			
			$con = @mysql_connect("localhost","schools_wsuser","1234QweR");
			@mysql_select_db("schools_ws", $con);
			
			if(!$con) die('خطا در اتصال به بانک اطلاعاتی');
			  
			$sql="INSERT INTO users (name, email, tel, course)
			VALUES
			('$_POST[name]','$_POST[email]','$_POST[tel]','$_POST[course]')";

			if(!mysql_query($sql,$con))	die('خطا');

			echo 'ممنونیم، اطلاعات شما ارسال شد';
			
			mysql_close($con);
			unset($_SESSION['security_code']);
			
		}else{
			echo $error_name.'  '.$error_email.'  '.$error_tel.'  '.$error_course .' را اصلاح کنید';
			unset($_SESSION['security_code']);
		}
	}else{
		die('کد امنیتی را صحیح وارد فرمایید');
	}
}else{
	die('Access Denied!');
}
?>
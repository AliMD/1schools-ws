<?php 
session_start();

require_once("formvalidator.php");

if(isset($_POST['submit'])){

   if( $_SESSION['security_code'] == $_POST['captcha'] && !empty($_SESSION['security_code'] ) ) {
		
		$validator = new FormValidator();
		$validator->addValidation("name","req","لظفا نام خود را وارد کنید");
		$validator->addValidation("name","alnumfa","لظفا نام خود را وارد کنید");
		$validator->addValidation("email","email","لطفا ایمیل را به طور صحیح کامل کنید");
		$validator->addValidation("email","req","لظفا نام خود را وارد کنید");
		$validator->addValidation("tel","req","لطفا تلفن تماس خود را وارد کنید");
		$validator->addValidation("tel","num","لطفا تلفن تماس خود را وارد کنید");
		$validator->addValidation("course","req","لطفا دوره خود را انتخاب کنید");
		$validator->addValidation("course","alpha_s","لطفا دوره خود را انتخاب کنید");
		
		if($validator->ValidateForm()){
			$con = mysql_connect("localhost","schools_wsuser","1234QweR");
			mysql_select_db("schools_ws", $con);
			
			if(!$con) die('خطا در اتصال به بانک اطلاعاتی: ' . mysql_error());
			  
			$sql="INSERT INTO users (name, email, tel, course)
			VALUES
			('$_POST[name]','$_POST[email]','$_POST[tel]','$_POST[course]')";

			if(!mysql_query($sql,$con))	die('خطا: ' . mysql_error());

			echo 'ممنونیم، اطلاعات شما ارسال شد';
			
			mysql_close($con);
			unset($_SESSION['security_code']);
			
		}else{
			echo "<B>خطا در فرم:</B>";
			$error_hash = $validator->GetErrors();
			
			foreach($error_hash as $inpname => $inp_err){
				echo "<p>$inpname : $inp_err</p>\n";
			}
		}
	}else{
		die('کد امنیتی را صحیح وارد فرمایید');
	}
}else{
	die('Access Denied!');
}
?>
<?php
session_start();

session_cache_limiter('private');
$cache_limiter = session_cache_limiter();

/* set the cache expire to 30 minutes */
session_cache_expire(30);

$cache_expire = session_cache_expire();
// エラーメッセージを格納する変数を初期化
$error_message = "";

// ログインボタンが押されたかを判定
// 初めてのアクセスでは認証は行わずエラーメッセージは表示しないように
if (isset($_POST["login"])) { 

	// user_nameが「php」でpasswordが「password」だとログイン出来るようになっている
	if ($_POST["user_name"] === "neko" && $_POST["password"] === "nya-n") {

		// ログインが成功した証をセッションに保存
		$_SESSION["user_name"] = $_POST["user_name"];

		// 管理者専用画面へリダイレクト
		$login_url = "http://{$_SERVER["HTTP_HOST"]}/grasper/secret/secret.php";
		header("Location: {$login_url}");
		exit;
	}
	$error_message = "ユーザ名もしくはパスワードが違っています。";
}
?>

<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/css" href="style.css">
		<script type="text/javascript" src="js/main.js"></script>
		<title>ログインして</title>
		<meta name="description" content="">
		<meta name="keywords" content="">
	</head>

	<body>
		<header>
			<h1 class="title">
				<a href="https://dsmpt.info/grasper/index.html">Grasper Page</a>
			</h1>
		</header>
		<hr>
		<section>
			<h2 class="subtitle">Login</h2>

			<?php
			if ($error_message) {
				print '<font color="red">'.$error_message.'</font>';
			}
			?>
			<p><form action="login.php" method="POST">
				ユーザ名：<input type="text" name="user_name" value="" /><br />
				パスワード：<input type="password" name="password" value"" /><br />
				<input type="submit" name="login" value="ログイン" />
			</form>
			</p>
		</section>
		<hr>

		<footer>
			Copyright(C) 2017 feeling_suppressor All rights Reserved. 
		</footer>
		
	</body>
	
</html>

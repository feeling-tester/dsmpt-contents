<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../style.css">
    <script type="text/javascript" src="js/main.js"></script>
    <title>Fragment Or Continuity, Or...</title>
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
      <?php
      session_start();
      
      // ログイン済みかどうかの変数チェックを行う
      if (!isset($_SESSION["user_name"])) {
        
        // 変数に値がセットされていない場合は不正な処理と判断し、ログイン画面へリダイレクトさせる
        $no_login_url = "http://{$_SERVER["HTTP_HOST"]}/grasper/login.php";
        header("Location: {$no_login_url}");
        exit;
      }
      else {
        /* print "ログイン成功";*/
      }
      ?>
      <h2 class="subtitle">Secret</h2>

    </section>

    <hr>

    <footer>
      Copyright(C) 2017 feeling_suppressor All rights Reserved. 
    </footer>

  </body>

</html>

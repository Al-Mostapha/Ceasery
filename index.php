<?php
    define('BASE_URL', "http://web.elkaisar.com");
    define('HOME_URL', "http://localhost:8080");
    require_once './config_index.php';
    require_once './base.php';
    require_once './lib/log.php';
    $playerId = NULL;
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    $OuthUser =[];
    $newToken = "";
    if(isset($_SESSION["OuthToken"])){
        $OuthUser = selectFromTableIndex("*", "user_auth", " auth_token  = :ot", ["ot" => $_SESSION["OuthToken"]]);
        
    }

    if(count($OuthUser))
    {
        $playerId = $OuthUser[0]["id_user"];
        $newToken = passEnc($OuthUser[0]["id_user"].time().rand(1,5e6));
        queryExeIndex("INSERT INTO user_auth(id_user, auth_token) VALUES (:idp, :t) ON DUPLICATE KEY UPDATE auth_token = :ot", ["idp" => $OuthUser[0]["id_user"], "t" => $newToken, "ot" => $newToken]);
        $_SESSION["OuthToken"] = $newToken;
    }
    

    session_write_close();
?>
<!DOCTYPE html>
<html>
    <title>قيصر الشرق</title>
    <link rel="icon" type="image/png" href="images/favicon.png" sizes="128×128">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- First Mobile Meta-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!-- For Enternet Explorer-->


    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/base_index.css">
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">

    <!-- Fonts Google -->

    <link href="https://fonts.googleapis.com/css?family=Asap|Days+One" rel="stylesheet"> 

    <link href="https://fonts.googleapis.com/css?family=Signika" rel="stylesheet">
    <body>

        <div class="header">
            <div class="container">
                <div class="row">
                    <div class="title col-md-6">
                        <div><img src="images/home//title1.png"></div>
                        <div><a href=""><img src="images/home/title2.png"></a></div>
                    </div>
                </div>
            </div>
        </div>

        <!-   End header Us Section->


        <!- Start Nav Bar Section  ->
        <div class="navBar">
            <div class="container">

                <ul class="left">
                    <a href=""><li>شراء المواد   </li></a>
                    <a href=""><li>الترتيب </li></a>
                </ul>

                <div class="logo">
                    <img src="images/home/logo.png">
                </div>

                <ul class="right">
                    <a href="http://forum.elkaisar.com/index.php"><li>المنتدي</li></a> 
                    <a href="http://www.elkaisar.com/"><li>الرئيسية</li></a>
                </ul>

            </div>
        </div>
        <!- End Nav Bar Section  ->


        <!- Start Body Section ->


        <div class="body">
            <div class="container">
                <div class="row">

                    <!-- Start Left Column-->
                    <div class="leftColumn col-md-8">   
                        <!--Start Slider-->
                        <div class="slider"></div>
                        <!--End Slider-->

                        <!--Start know more about Kaisar-->
                        <div class="knowAbout">
                            <div class="title">
                                <h3>اعرف اكثر عن لعبة القيصر</h3>
                            </div>
                        </div>
                        <!--End know more about Kaisar-->


                        <!--Start unkowen Kaisar-->
                        <div class="unkowen">
                            <div class="title"></div>

                            <!--Text Box -->
                            <div class="box"> 
                                <div class="icon"><img src="images/home/icon.png"></div> 
                                <div class="text"><p> </p></div>
                            </div>
                            <!--Text Box -->
                            <div class="box"> 
                                <div class="icon"><img src="images/home/icon.png"></div> 
                                <div class="text"><p> </p></div>
                            </div>
                            <!--Text Box -->
                            <div class="box"> 
                                <div class="icon"><img src="images/home/icon.png"></div> 
                                <div class="text"><p> </p></div>
                            </div>
                            <!--Text Box -->
                            <div class="box"> 
                                <div class="icon"><img src="images/home/icon.png"></div> 
                                <div class="text"><p> </p></div>
                            </div>
                            <!--Text Box -->
                            <div class="box"> 
                                <div class="icon"><img src="images//home/icon.png"></div> 
                                <div class="text"><p> </p></div>
                            </div>
                            <!--Text Box -->
                            <div class="box"> 
                                <div class="icon"><img src="images/home/icon.png"></div> 
                                <div class="text"><p> </p></div>
                            </div>

                        </div>
                    </div>
                    <div class="rightColumn col-md-4"> 

                        <!--Sign Form -->
                        <div class="form1">
                            <div class="loginBox" id="login-form">
                                
                                
                                
                                
                        <?php
                        
                        
                            if($playerId != NULL){
                                
                               $user = selectFromTableIndex("user_name, last_server", 'game_user', "id_user = {$playerId}")[0];
                                echo '
                                    <div class="welcome-name">
                                        <label class="yellow-color">'.$user["user_name"].'</label>
                                        <label>مرحبا</label>

                                    </div>
                                    <div class="welcome-name">
                                        <label class="yellow-color">  مركز الاعضاء&nbsp;&nbsp;⇚   </label>
                                        <label>للدخول الى  </label>

                                    </div>
                                    <div class="welcome-name">
                                        <label class="yellow-color"><a href="'.BASE_URL.'/server.php?server='.$user["last_server"].'&ot='. urlencode($newToken).'" target="_blank">'.$server_list[$user["last_server"]].'</a></label>
                                        <label style="direction: rtl">اخر سيرفر قمت بالدخول علية :</label>

                                    </div>
                                    <div onclick="logout()" class="add-account" style="width: 85%">
                                        <h3>تسجيل الخروج</h3>
                                    </div> ';
                                
                            }else{
                                
                                echo '  <input id="username" type="text" name="" placeholder="البريد الالكتروني او اسم المستخدم">
                                        <input id="password" type="password" name="" placeholder="كلمة المرور">
                                        <button onclick="login()" class="login">تسجيل الدخول </button> ';
                                
                            }
                        ?>
                            </div>
                        </div>
                        
                        <div class="add-account" id="join-now">
                            <h3>اضافة حساب جديد</h3>
                        </div>

                        
                        <a href=""><div class="facebook"> <p>تسجيل الدخول</p></div></a>
                        <!-- Sign with googlePlus-->
                        <a href=""><div class="googlePlus"><p>تسجيل الدخول</p></div></a>


                        <!-- Start Groub of servers -->
                        <div id="list-of-servers" class="servers">
                            <div class="head-title">
                                قائمة السيرفرات
                            </div>
                            <ul id="Server-List">
                                <li>
                                    <span class="server-state"><label></label></span>
                                    <span class="server-name">
                                        <a class="enter-server" data-id-server="1" data-id-player="<?=$playerId?>" href="<?=BASE_URL."/server.php?server=1&ot=". urlencode($newToken)?>" target="_blank">الجبابرة(s1)</a>
                                    </span>
                                    <span class="banner"></span>
                                </li>
                                <li>
                                    <span class="server-state"><label></label></span>
                                    <span class="server-name">
                                        <a class="enter-server" data-id-server="2" data-id-player="<?=$playerId?>"  href="<?=BASE_URL."/server.php?server=2&ot=". urlencode($newToken)?>" target="_blank">الليث</a>
                                    </span>
                                    <span class="banner"></span>
                                </li>
 		              
                                <li>
                                    <span class="server-state"><label></label></span>
                                    <span class="server-name">
                                        <a class="enter-server" data-id-server="4" data-id-player="<?=$playerId?>"  href="<?=BASE_URL."/server.php?server=4&ot=". urlencode($newToken)?>" target="_blank">القمة(s4)</a>
                                    </span>
                                    <span class="banner"></span>
                                </li>
                            </ul>
                        </div>
                        <!-- End Groub of servers -->

                    </div>
                    <!--End Right Section -->




                </div>
            </div>
        </div>


        <!- End Body Section ->



        <!- Start Footer Section ->
        <div class="footer">
            <div class="title">
                <img src="images/home/logo.png">
            </div>
            <div class="container">
                <div class="row">

                    <!-- Download App-->
                    <div class="download col-md-4">
                        <h5>احصل علي عروضنا الحصريه</h5>
                        <a href=""><img src="images/home/pay.png"></a>
                        <a href=""><img src="images/home/voda.png"></a>
                    </div>
                    <!-- date-->
                    <div class="date col-md-4">
                        <h5>حقوق التصميم محفوظة</h5>
                        <p>قيصر الشرق</p>
                    </div>
                    <!-- Follow Us-->
                    <div class="follow col-md-4">
                        <h5>تابعنا : </h5>
                        <a href=""><i class="fab fa-twitter"></i></a>
                        <a href=""><i class="fab fa-facebook-square"></i></a>
                        <a href=""><i class="fab fa-youtube"></i></a>
                    </div>

                </div>
            </div>
        </div>
        
         <div id="over_lay">
            <div class="mfp-content"><div id="signup_button_box" class="zoom-anim-dialog">
                <div id="signup_header">
                    <div id="log-with">
                        <button class="loginBtn loginBtn--facebook">
                            Facebook
                        </button>

                        <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
                    </div>
                </div>
                <div class="clear"></div>
                <div id="signup_btm">
                        <div id="signup_button_box_inn">
                                <div id="signup_dialog">
                                        <div class="clear"></div>

                                        
                                             <div class="control-group"  >
                                                <input type="text" class="input-medium" id="signupEmail" autocomplete="off" value="" rel="tipsy" original-title="" placeholder="البريد الالكترونى">
                                                <span class="status"> </span>
                                            </div>

                                                <div class="control-group" >
                                                    <input type="text" class="input-medium" id="signupUsername" rel="tipsy" original-title="" placeholder="اسم المستخدم">
                                                    <span class="status"></span> 
                                            </div>

                                            <div class="control-group">
                                                    <input type="password" class="input-medium"  id="signupPassword" rel="tipsy" original-title="" placeholder="كلمة المرور">
                                                    <span class="status"></span>
                                            </div>
                                            <div class="control-group">
                                                <input type="password" class="input-medium" id="signupConfirmPassword" rel="tipsy" original-title="" placeholder="تاكيد كلمة المرور">
                                                <span class="status"></span>
                                            </div>
                                            <div id="join-submit">
                                                <button>
                                                    اشترك الان
                                                </button>
                                            </div>
                                        
                                </div>
                            </div><!-- signup_button_box_inn -->
                    </div><!-- signup_btm -->
                    <button title="Close (Esc)" type="button" class="mfp-close" id="close-signup"></button>
                </div>
            </div>
        </div>
        <script>
          var HomeUrl = '<?=HOME_URL?>';
        </script>


        <script type="text/javascript" src="jsHome/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src="jsHome/js.js"></script>
        <script type="text/javascript" src="jsHome/bootstrap.min.js"></script>
        <script type="text/javascript" src="jsHome/jquery.nicescroll.min.js"></script>
        <script type="text/javascript" src="jsHome/Login.js" ></script>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-145179238-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-145179238-1');
        </script>
        

    </body>
</html> 


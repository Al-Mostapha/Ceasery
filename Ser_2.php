<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
session_write_close();
require_once 'config.php';
require_once 'config_index.php';
require_once 'base.php';

if (!isset($_GET["ot"])) {
    header("Location: index.php");
    exit();
}

$UserOuth = urldecode($_GET["ot"]);
$OuthUser = selectFromTableIndex("*", "user_auth", " auth_token  = :ot", ["ot" => $UserOuth]);


if (!count($OuthUser)) {
    header("Location: index.php");
    exit();
}

$PlayerInData = selectFromTable("*", "player", "id_user = :idu", ["idu" => $OuthUser[0]["id_user"]]);



?>
<!DOCTYPE html>
<html><head>
        <link rel="icon" type="image/png" href="Image/favicon.png" sizes="128×128">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="http://pay.elkaisar.com/css/home.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
        <div id="Title">
            <div style="display: flex; flex-flow: column;">
                <img src="http://pay.elkaisar.com/Image/Logo-wow.png" style="display: block; margin: auto">
            </div>
        </div>
        <div id="Form" style="width:1150px;">
            <div class="row">
                <div class="col-75">
                    <div class="container">
                        <form method="post" action="<?=API_URL?>/home/HLogIn/choose">
                            <div class="row">
                                <div class="col-75">
                                    <h3>بيانات الحساب</h3>
                                    <div>
                                        <input type="hidden" name="ot" value="<?=$_GET["ot"]?>">
                                        <input type="hidden" name="server" value="<?=$_GET["server"]?>">

                                        <label for="fname"><i class="fa fa-user"></i>  إختر أحد الحسابات </label>
                                         <?php
                                        foreach ($PlayerInData as $OnePlayer) {
                                            echo '<div style="margin: 15px;">
                                                        <input type="radio" name="idPlayer" value="'.$OnePlayer["id_player"].'" checked=""> '.$OnePlayer["name"].' ( برستيج : '.$OnePlayer["prestige"].' )
                                                    </div>';
                                        }
                                        ?>
                                        
                                    </div>
                                </div>
                            </div>
                            <input type="submit" value="إختر الحساب الأن" class="btn" style="width: 60%; margin: auto; display: block">
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </body></html>
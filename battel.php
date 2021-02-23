<?php
$report_json = base64_decode(urldecode($_GET["report"]));
$report = json_decode($report_json);
$_GET["id_server"] = $report->s;
require_once './config.php';
require_once './base.php';
 ?>
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta id="" name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, width=device-width,height=device-height,target-densitydpi=device-dpi, user-scalable=yes">
        <link rel="stylesheet" href="css<?=JS_VERSION?>/reset-min.css"/>
        <link rel="stylesheet" href="css<?=JS_VERSION?>/fonts-min.css"/>
        <link rel="stylesheet" href="css<?=JS_VERSION?>/base.css"/>
        <link rel="stylesheet" href="css<?=JS_VERSION?>/city.css"/>
        <link rel="stylesheet" href="css<?=JS_VERSION?>/world.css"/>
        <link rel="stylesheet" href="css<?=JS_VERSION?>/lastStyle.css"/>
        <link rel="stylesheet" href="css<?=JS_VERSION?>/lastOfLast.css"/>
        <link rel="stylesheet" href="css<?=JS_VERSION?>/finishing.css"/>
        <link rel="stylesheet" href="css<?=JS_VERSION?>/tooltips.css"/>
        <link rel="stylesheet" href="css<?=JS_VERSION?>/hero.css"/>
        <link rel="stylesheet" href="css<?=JS_VERSION?>/godPoints.css"/>
        <link rel="stylesheet" href="css<?=JS_VERSION?>/battelReview.css"/>
        <style>
        </style>
    </head>

    
    <body> 
        <?php
        
            
            
            if(!isJson($report_json)){
                exit("<html>"
                . "<body>"
                . "<script>window.location.replace(".BASE_URL.");</script>"
                . "</body>"
                . "</html>");
            }
            
            $id_report   = validateId($report->id);
            $heros       = BattelReport::getHeros($id_report);
            $prizes      = selectFromTable("*", "report_mat_prize", "id_report = $id_report");
            $generalData = BattelReport::getGeneralData($id_report);
            
            
            $totalPrize = [];
            $totalRes   = [
                "food"=>0,
                "wood"=>0,
                "stone"=>0,
                "metal"=>0,
                "coin"=>0,
                "honor"=>0
            ];
            
            
            $reportResource = selectFromTable("*", "report_res_prize", "id_report = $report->id");
            foreach ($reportResource as $rr){
                $totalRes["food"]  += $rr["food"];
                $totalRes["wood"]  += $rr["wood"];
                $totalRes["stone"] += $rr["stone"];
                $totalRes["metal"] += $rr["metal"];
                $totalRes["coin"]  += $rr["coin"];
            }
        ?>
        <div id="dialg_box" style="top: 125px;">
            <div class="head_bar">
                <img src="images/style/head_bar.png">
                <div class="title">تقرير الهجوم</div>
            </div>
            <div class="nav_bar">
                <div class="right-nav">
                    <div class="nav_icon">
                    </div>
                </div>
                <div class="left-nav">
                </div>
            </div> 
            <div class="box_content for_msg for_Br " id="battel-report-msg">
                <div class="left-content full">
                    <div id="battel_r_upper">
                        <div class="header">
                            <div class="pull-R th" style="direction: rtl;">
                                انشئ الملك <?=$generalData["p_name"] ?> <?=$generalData["task"] == 0 ? "غزو" : "استيلاء"?> الى  [ <?=$generalData["x"]?> , <?=$generalData["y"]?>  ] 
                            </div>
                            <div class="pull-L th">
                               <?= date("d M Y", $generalData["time_stamp"])?>
                            </div>
                        </div>
                        <p style="clear: both"></p>
                        <div class="result-icon">
                        </div>
                        <div class="battel-desc">

                        </div>
                        <div class="resource-row">
                            <ul>
                                <li><img ondragstart="return false;" src="images/style/food.png"><span> <?=$totalRes["food"]?></span></li>
                                <li><img ondragstart="return false;" src="images/style/wood.png"><span> <?=$totalRes["wood"]?></span></li>
                                <li><img ondragstart="return false;" src="images/style/stone.png"><span><?=$totalRes["stone"]?></span></li>
                                <li><img ondragstart="return false;" src="images/style/iron.png"><span> <?=$totalRes["metal"]?></span></li>
                                <li><img ondragstart="return false;" src="images/style/coin.png"><span> <?=$totalRes["coin"]?></span></li>
                            </ul>
                        </div><div class="prize-row">
                            <ul>
                                <?php

                                    $matrial = json_decode(file_get_contents("js".JS_VERSION."/matrial_all.json"), TRUE);

                                    foreach ($prizes  as $onePrize){

                                        echo '  <li>
                                                    <img src="'.$matrial[$onePrize["prize"]]["image"].'">
                                                    <div class="amount stroke">'.$onePrize["amount"].'</div>
                                                </li>';

                                    }

                                ?>
                            </ul>
                            <p> انتهت المعركة فى <?=$generalData["round_num"]?> جولة وكانت نتيجة الهجوم بالنصر ! والحصول على <?=$totalRes["honor"]?> نقطة شرف </p>
                        </div>
                    </div>
                    <div id="battel-detail">
                        <div class="your_side">
                            <ul>
                                <?php
                                $cont = "";
                                $army_icon = [         
                                        "0"=>"",
                                        "1"=> '<img src="images/tech/soldier_1.jpg"/>',
                                        "2"=> '<img src="images/tech/soldier_2.jpg"/>',
                                        "3"=> '<img src="images/tech/soldier_3.jpg"/>',
                                        "4"=> '<img src="images/tech/soldier_4.jpg"/>',
                                        "5"=> '<img src="images/tech/soldier_5.jpg"/>',
                                        "6"=> '<img src="images/tech/soldier_6.jpg"/>'
                                    ];
                                
                                    $hero_avatars = [
                                        "images/hero/faceA1.jpg",
                                        "images/hero/faceA2.jpg",
                                        "images/hero/faceA3.jpg",
                                        "images/hero/faceA4.jpg",
                                        "images/hero/faceA5.jpg",
                                        "images/hero/faceA6.jpg",
                                        "images/hero/faceA7.jpg",
                                        "images/hero/faceA8.jpg",
                                        "images/hero/faceA9.jpg",
                                        "images/hero/faceA10.jpg",
                                        "images/hero/faceB1.jpg",
                                        "images/hero/faceB2.jpg",
                                        "images/hero/faceB3.jpg",
                                        "images/hero/faceB4.jpg",
                                        "images/hero/faceB5.jpg",
                                        "images/hero/faceB6.jpg",
                                        "images/hero/faceB7.jpg",
                                        "images/hero/faceB8.jpg",
                                        "images/hero/faceB9.jpg",
                                        "images/hero/faceB9.jpg"
                                    ];
                                    foreach ($heros  as $oneHero){
                                        
                                       if($oneHero["side"] == "1"){
                                            $tr_1 = "";
                                            $tr_2 = "";
                                            for( $iii = 1 ; $iii <= 3 ; $iii++){
                                                $f_pre = "f_".$iii."_pre";
                                                $f_post = "f_".$iii."_post";
                                                $f_type = "f_".$iii."_type";

                                                if($oneHero[$f_pre] != 0){
                                                    $tr_1 .= ' <li>
                                                             '.$army_icon[$oneHero[$f_type]].'
                                                            <div class="pre-amount stroke">'.$oneHero[$f_pre].'</div>
                                                            <div class="post-amount">'.$oneHero[$f_post].'</div>
                                                        </li>';
                                                }
                                            }
                                            for( $kkk = 1 ; $kkk <= 3 ; $kkk++){

                                                $b_pre  = "b_".$kkk."_pre";
                                                $b_post = "b_".$kkk."_post";
                                                $b_type = "b_".$kkk."_type";
                                                if($oneHero[$b_pre] != 0){
                                                    
                                                    $tr_2 .= ' <li>
                                                             '.$army_icon[$oneHero[$b_type]].'
                                                            <div class="pre-amount stroke">'.$oneHero[$b_pre].'</div>
                                                            <div class="post-amount">'.$oneHero[$b_post].'</div>
                                                        </li>';
                                                }
                                        }
                                        $cont .= '<li>
                                                    <div class="hero">
                                                        <div class="name ellipsis">
                                                            '.($oneHero["h_name"] ?$oneHero["h_name"] : "بطل النظام")." (".($oneHero["p_name"] ?$oneHero["p_name"] : "").")".'
                                                        </div>
                                                        '.
                                                        
                                                        '<div class="image">
                                                            <img src="'.(isset($hero_avatars[$oneHero["avatar"]]) ? $hero_avatars[$oneHero["avatar"]]  :  "images/icons/hero/eq-bg.png").'" />
                                                            <div class="xp stroke">+'.$oneHero["xp"].'</div>
                                                        </div>'
            
                                                        .'
                                                    </div>
                                                    <div class="army">
                                                        <ol>
                                                        '.$tr_1.'
                                                        '.$tr_2.'
                                                        </ol>
                                                    </div>
                                                </li>';
                                       }
                                }
                                echo $cont;
                                ?>
                               </ul>
                        </div>
                        <div class="enemy_side">
                            <ul>
                                <?php
                                $cont = "";
                                
                                    foreach ($heros  as $oneHero){
                                        
                                       if($oneHero["side"] == "0"){
                                            $tr_1 = "";
                                            $tr_2 = "";
                                            for( $iii = 1 ; $iii <= 3 ; $iii++){
                                                $f_pre = "f_".$iii."_pre";
                                                $f_post = "f_".$iii."_post";
                                                $f_type = "f_".$iii."_type";

                                                if($oneHero[$f_pre] != 0){
                                                    $tr_1 .= ' <li>
                                                             '.$army_icon[$oneHero[$f_type]].'
                                                            <div class="pre-amount stroke">'.$oneHero[$f_pre].'</div>
                                                            <div class="post-amount">'.$oneHero[$f_post].'</div>
                                                        </li>';
                                                }
                                            }
                                            for( $kkk = 1 ; $kkk <= 3 ; $kkk++){

                                                $b_pre  = "b_".$kkk."_pre";
                                                $b_post = "b_".$kkk."_post";
                                                $b_type = "b_".$kkk."_type";
                                                if($oneHero[$b_pre] != 0){
                                                    
                                                    $tr_2 .= ' <li>
                                                             '.$army_icon[$oneHero[$b_type]].'
                                                            <div class="pre-amount stroke">'.$oneHero[$b_pre].'</div>
                                                            <div class="post-amount">'.$oneHero[$b_post].'</div>
                                                        </li>';
                                                }
                                        }
                                        $cont .= '<li>
                                                    <div class="hero">
                                                        <div class="name ellipsis">
                                                            '.($oneHero["h_name"] ?$oneHero["h_name"] : "بطل النظام")." (".($oneHero["p_name"] ?$oneHero["p_name"] : "").")".'
                                                        </div>
                                                        '.
                                                        
                                                        '<div class="image">
                                                            <img src="'.(isset($hero_avatars[$oneHero["avatar"]]) ? $hero_avatars[$oneHero["avatar"]]  :  "images/icons/hero/eq-bg.png").'" />
                                                            <div class="xp stroke">+'.$oneHero["xp"].'</div>
                                                        </div>'
            
                                                        .'
                                                    </div>
                                                    <div class="army">
                                                        <ol>
                                                        '.$tr_1.'
                                                        '.$tr_2.'
                                                        </ol>
                                                    </div>
                                                </li>';
                                       }
                                }
                                echo $cont;
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <script src="js<?=JS_VERSION?>/jquery-3.2.1.min.js"></script>
    <script src="js<?=JS_VERSION?>/lib/jquery.nicescroll.min.js"></script>
    <script>
        $("#battel-detail").niceScroll();
        
    </script>
</html>


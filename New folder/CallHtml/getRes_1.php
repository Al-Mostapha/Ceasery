<?php


set_time_limit(0);
ini_set('memory_limit', '2048M');

$file = file_get_contents("BattelRes.json");
$Arr = json_decode($file, true);


echo count($Arr["resources"]);

foreach ($Arr["resources"] as $one){
    $t = explode("/", $one["url"]);
    $n = end($t);
    file_put_contents("Res/".$n, file_get_contents("https://s2.callofroma.com/replay/kaisa_replay_player/resource/".$one["url"]));
    echo $n."   DownLoaded"."\n";

}


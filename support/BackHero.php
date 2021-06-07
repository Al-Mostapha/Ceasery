<?php
ini_set("memory_limit", "-1");
set_time_limit(0);
define("SERVER_ID", 1);
require_once '../config.php';

foreach ($SERVER_LIST as $key => $one){
    
    dbConnect($key);
    updateTable("in_city = 1", "hero", "in_city = 0");
    deleteTable("battel", "time_end < :t AND done = 1", ["t" => time()*1000 - 15000]);
    deleteTable("battel_member", "id_battel NOT IN (SELECT id_battel FROM battel WHERE 1)");
    deleteTable("hero_back"," task != 5");
    echo '';
    
}
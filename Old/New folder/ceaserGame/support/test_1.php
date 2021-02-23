<?php
ini_set("memory_limit", "-1");
set_time_limit(0);
define("SERVER_ID", 1);
require_once '../config.php';

foreach ($SERVER_LIST as $key => $one){
    
    dbConnect($key);
    updateTable("in_city = 1", "hero", "1");
    deleteTable("battel_member", "id_battel NOT IN (SELECT id_battel FROM battel WHERE 1)");
    deleteTable("hero_back","1");
    
}
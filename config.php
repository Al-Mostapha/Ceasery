<?php

    $SERVER_LIST = [
        "1"=>[
            "db_name"=>"elkaisar",
            "port"=>8080,
            "name"=>"الجبابرة"
        ],
        "2"=>[
            "db_name"=>"elkaisar",
            "port"=>8081,
            "name"=>"الليث"
        ],
         "3"=>[
            "db_name"=>"elkaisar",
            "port"=>8082,
            "name"=>"صلاح الدين"
        ],
         "4"=>[
            "db_name"=>"elkaisar",
            "port"=>8083,
            "name"=>"القمة"
        ]
    ];

    $dbh = NULL;
    
    function dbConnect ($serverID){
       global $SERVER_LIST;
        if(!array_key_exists($serverID, $SERVER_LIST)){
            file_put_contents("SERVER_INDEX_____16.txt", print_r($_GET, TRUE), FILE_APPEND);
	file_put_contents("SERVER_INDEX_____16.txt", print_r($serverID, TRUE), FILE_APPEND);
            file_put_contents("SERVER_INDEX_____16.txt", print_r($SERVER_LIST, TRUE), FILE_APPEND);
            exit();
        }
        
        global  $dbh;
         $dbh = new PDO("mysql:host=localhost;dbname={$SERVER_LIST[$serverID]["db_name"]};charset=utf8mb4", "root", "");
         $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    
    if(isset($_GET["server"])){
        dbConnect($_GET["server"]);
    }else if(isset ($_POST["server"])){
        dbConnect($_POST["server"]);
    }else if(defined("SERVER_ID")){
        dbConnect(SERVER_ID);
    }else{
       dbConnect(1);
    }

   // $dbh = new PDO("mysql:host=localhost;dbname=elkaisar_server_1;charset=utf8mb4", "elkaisar_server", "mywifesoma1231");
   
    define("DEV_MODE", "1");
    
   
    define("WEB_SOCKET_HOST", "localhost");
    
    
    define('BASE_BATH',      dirname(__FILE__) . DIRECTORY_SEPARATOR);
    define('BASE_URL',      "http://localhost/ceaserGame");
    define('API_URL',      "http://localhost/Elkaisar");
     define("JS_VERSION", "-10.55.85");
     
  
    
     define("ITEM_MAX_TAKE", 10);
     define("SIDE_ATTACK", 1);
    define("SIDE_DEFANCE", 0);
    define("TASK_FIGHT_ATTACK", 0);
    define("TASK_FIGHT_DOMINATE", 1);
    define("HERO_SIDE_ATTACK", 1);
    define("HERO_SIDE_DEFENCE", 0);
    define("BATTEL_GAIN_HONOR_FACTOR", 1);
    
    
    define("SPACE"     ,0 ) ; // 
    define("COTTAGE"   ,1 ) ; //
    define("STORE"     ,2 ) ; //
    define("BARRACKS"  ,3 ) ; //
    define("STABL"     ,4 ) ; //
    define("WORKSHOP"  ,5 ) ; //
    define("THEATER"   ,6 ) ; //
    define("STATION"   ,7 ) ; //
    define("UNIVERSITY",8 ) ; //
    define("ACADEMY"   ,9 ) ; //
    define("WORSHIP"   ,10) ; //
    define("HOSPITAL"  ,11) ; //
    define("PALACE"    ,12) ; //
    define("WALL"      ,13) ; //
    define("MARKET"    ,14) ; //
    define("WOOD"      ,15) ; //
    define("FARM"      ,16) ; //
    define("MINE"      ,17) ; //
    define("STONE"     ,18) ; //
    define("SEAPORT"   ,19) ; //
    define("LIGHTHOUSE",20 ); //
    
    
    //  barary type start
    define("BAR_FOOD_TYPE_START"      ,1) ; //
    define("BAR_FOOD_TYPE_END"      ,16) ; //
    
    define("BAR_METAL_TYPE_START"      ,21) ; //
    define("BAR_METAL_TYPE_END"      ,23) ; //
    
    define("BAR_STONE_TYPE_START"      ,24) ; //
    define("BAR_STONE_TYPE_END"      ,26) ; //
    
    define("BAR_WOOD_TYPE_START"      ,27) ; //
    define("BAR_WOOD_TYPE_END"      ,29) ; //
    
    
    define("ARMY_CANCEL_LOSE_RATIO"  ,0.5) ; //
    define("BUILDING_CANCEL_LOSE_RATIO"  ,0.5) ; //
    
    
   
    
    
    
   
    
    
    define("ARMY_A", 1);
    define("ARMY_B", 2);
    define("ARMY_C", 3);
    define("ARMY_D", 4);
    define("ARMY_E", 5);
    define("ARMY_F", 6);
    define("SPIES", "spies" );
    
    
    
    
    define("HELPER_BUILD", 1);
    define("HELPER_POP", 2);
    define("HELPER_ARMY", 3);
   
    define("lOCKED_UNIT", 1);
    
   
    
 
    
       require_once BASE_BATH.'lib/worldunit.php';
        require_once BASE_BATH.'lib/afterfight.php';
        require_once BASE_BATH.'lib/army.php';
        require_once BASE_BATH.'lib/battel.php';
        require_once BASE_BATH.'lib/battelreport.php';
        require_once BASE_BATH.'lib/building.php';
        require_once BASE_BATH.'lib/city.php';
        require_once BASE_BATH.'lib/eduutil.php';
        require_once BASE_BATH.'lib/equipment.php';
        require_once BASE_BATH.'lib/fight.php';
        require_once BASE_BATH.'lib/firsthero.php';
        require_once BASE_BATH.'lib/guild.php';
        require_once BASE_BATH.'lib/hero.php';
        require_once BASE_BATH.'lib/horus.php';
        require_once BASE_BATH.'lib/matrial.php';
        require_once BASE_BATH.'lib/player.php';
        require_once BASE_BATH.'lib/prize.php';
        require_once BASE_BATH.'lib/quest.php';
        require_once BASE_BATH.'lib/savestate.php';
        require_once BASE_BATH.'lib/upgradefollow.php';
        require_once BASE_BATH.'lib/worldmap.php';
        require_once BASE_BATH.'lib/Prestige.php';
        require_once BASE_BATH.'lib/godgate.php';
        require_once BASE_BATH.'lib/websocket.php';
    
define("GUILD_R_MEMBER"    , 0);  // member   
define("GUILD_R_SENIOR"    , 1);  // senior memember
define("GUILD_R_SUPERVISOR_2", 2);    
define("GUILD_R_SUPERVISOR", 3);    
define("GUILD_R_DEPUTY_2"  , 4);    
define("GUILD_R_DEPUTY"    , 5);    
define("GUILD_R_LEADER"    , 6);  

 

define("PROVINCE_BRITONS", 1);
define("PROVINCE_REICH", 2);
define("PROVINCE_ASIANA", 3);
define("PROVINCE_GAULS", 4);
define("PROVINCE_HISPANIA", 5);
define("PROVINCE_ITALIA", 6);
define("PROVINCE_MACEDON", 7);
define("PROVINCE_CARTHAGE", 8);
define("PROVINCE_EGYPT", 9);
define("PROVINCE_PARTHIA", 10);
    



$RESOURCE_AR_TITLE = [
    "food" =>"غذاء",
    "wood" =>"اخشاب",
    "stone"=>"صخور",
    "metal"=>"حديد",
    "coin" =>"معادن",
];
    



function selectFromTable($string , $table , $condetion, $parm = [])
{
    
    global $dbh;
    $sql = $dbh->prepare("SELECT $string FROM $table WHERE $condetion");
    if(!$sql->execute($parm)){
        
            file_put_contents("Qurary-select-errors.txt", print_r($_POST, TRUE), FILE_APPEND);
            file_put_contents("Qurary-select-errors.txt", print_r($_GET, TRUE), FILE_APPEND);
            file_put_contents("Qurary-select-errors.txt", print_r($sql, TRUE), FILE_APPEND);
            file_put_contents("Qurary-select-errors.txt", print_r($parm, TRUE), FILE_APPEND);
            
        
    }
   
   
    return $sql->fetchAll(PDO::FETCH_ASSOC);
    
}

function existInTable( $table , $condetion, $parm = [])
{
    
    global $dbh;
    $sql = $dbh->prepare("SELECT EXISTS(SELECT * FROM $table WHERE $condetion) AS val");
    if(!$sql->execute($parm)){
        
        try{
            throw new Exception();
        }catch ( Exception $e ){
            $trace = $e->getTrace();
            file_put_contents("Qurary-errors.txt", print_r($trace, TRUE), FILE_APPEND);
            file_put_contents("Qurary-errors.txt", print_r($sql, TRUE), FILE_APPEND);
            file_put_contents("Qurary-errors.txt", print_r($parm, TRUE), FILE_APPEND);
            
        }
    }
   
   
    return $sql->fetch(PDO::FETCH_ASSOC)["val"];
    
}

function updateTable($string , $table , $condetion, $parm = [])
{
    
    global $dbh;
    $sql = $dbh->prepare("UPDATE $table SET  $string WHERE $condetion");
    if(!$sql->execute($parm)){

        file_put_contents("Qurary-update-errors.txt", print_r($_POST, TRUE), FILE_APPEND);
        file_put_contents("Qurary-update-errors.txt", print_r($_GET, TRUE), FILE_APPEND);
        file_put_contents("Qurary-update-errors.txt", print_r($sql, TRUE), FILE_APPEND);
        file_put_contents("Qurary-update-errors.txt", print_r($parm, TRUE), FILE_APPEND);

    }
    
    
    return $sql->rowCount();
    
}
function deleteTable($table , $condetion, $parm = [])
{
    
    global $dbh;
    $sql = $dbh->prepare("DELETE FROM  $table WHERE $condetion");
   
    if(!$sql->execute($parm)){
        
        
            file_put_contents("Qurary-delete-errors.txt", print_r($_POST, TRUE), FILE_APPEND);
            file_put_contents("Qurary-delete-errors.txt", print_r($_GET, TRUE), FILE_APPEND);
            file_put_contents("Qurary-delete-errors.txt", print_r($sql, TRUE), FILE_APPEND);
            file_put_contents("Qurary-delete-errors.txt", print_r($parm, TRUE), FILE_APPEND);
        
    }
    $row_count = $sql->rowCount();
    
    return $row_count;
    
}

function insertIntoTable($string ,$table, $parm = [])
{
    
    global $dbh;
    $sql = $dbh->prepare("INSERT IGNORE INTO $table SET  $string ");

    if(!$sql->execute($parm)){
        
        
            file_put_contents("Qurary-insert-errors.txt", print_r($_POST , TRUE), FILE_APPEND);
            file_put_contents("Qurary-insert-errors.txt", print_r($_GET , TRUE), FILE_APPEND);
            file_put_contents("Qurary-insert-errors.txt", print_r($sql , TRUE), FILE_APPEND);
            file_put_contents("Qurary-insert-errors.txt", print_r($parm , TRUE), FILE_APPEND);
          
    }
    
    
    
    return $sql->rowCount();
    
}


function queryExe($quray, $pram = []){
    
    global $dbh;
    $sql = $dbh->prepare($quray);
    return [
        "suc"=>$sql->execute($pram ),
        "count"=>$sql->rowCount(),
        "lastId"=>$dbh->lastInsertId(),
        "sql"=>$sql
    ];
    
}
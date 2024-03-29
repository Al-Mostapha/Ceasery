<?php


$dbhIndex = new PDO("mysql:dbname=elkaisar_home;host=localhost" , "root" , "");

$server_list = [
    
    "لا يوجد",
    "الجبابرة",
    "الليث",
   "الليث",
   "القمة"
    
];

function serverName($index){
    global $server_list;
    return  $server_list[$index] ? $server_list[$index] : "لا يوجد";
}

function selectFromTableIndex($string , $table , $condetion, $parm = [])
{
    
    global $dbhIndex;
    $sql = $dbhIndex->prepare("SELECT $string FROM $table WHERE $condetion");
    $sql->execute($parm);
    
    return $sql->fetchAll(PDO::FETCH_ASSOC);
    
}
function updateTableIndex($string , $table , $condetion, $parm = [])
{
    
    global $dbhIndex;
    $sql = $dbhIndex->prepare("UPDATE $table SET  $string WHERE $condetion");
    $sql->execute($parm);
    
    $row_count = $sql->rowCount();
    
    return $row_count;
    
}
function deleteTableIndex($table , $condetion, $parm = [])
{
    
    global $dbhIndex;
    $sql = $dbhIndex->prepare("DELETE FROM  $table WHERE $condetion");
    $sql->execute($parm);
    
    $row_count = $sql->rowCount();
    if($row_count < 1){
        try{
            throw new Exception();
        }catch ( Exception $e ){
            $trace = $e->getTrace();
            print_r($trace);
        }
        print_r($sql);
    }
    return $row_count;
    
}

function insertIntoTableIndex($string ,$table, $parm = [])
{
    
    global $dbhIndex;
    $sql = $dbhIndex->prepare("INSERT INTO $table SET  $string ");

    $sql->execute($parm);
    
    $row_count = $sql->rowCount();
    /*
    if($row_count < 1){
        
        try{
            throw new Exception();
        }catch ( Exception $e ){
            $trace = $e->getTrace();
            print_r($trace);
        }
        
        print_r($sql);
    }*/
    return $dbhIndex->lastInsertId();
    
}

function queryExeIndex($quray, $pram = []){
    
    global $dbhIndex;
    $sql = $dbhIndex->prepare($quray);
    return [
        "suc"=>$sql->execute($pram),
        "count"=>$sql->rowCount(),
        "lastId"=>$dbhIndex->lastInsertId(),
        "sql"=>$sql
    ];
    
}

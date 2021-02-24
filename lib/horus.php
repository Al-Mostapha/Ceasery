<?php

class Horus
{
    
    private $id_player;
    
    public function __construct($id_player)
    {
        $this->id_player = $id_player;
    }
    
    public function useGold($amount)
    {
        global $dbh;
        if($amount < 0 || !$amount){
            return;
        }
        $sql = $dbh->prepare("UPDATE player SET gold = gold - $amount WHERE "
                . "id_player = $this->id_player AND gold >= $amount");
        $sql->execute();
        
        return $sql->rowCount();
    }
    
    public function recordeGoldUseMatrial($amount , $matrial)
    {
        
        global $dbh;
        
        $sql = $dbh->prepare("INSERT INTO horus_mat_gold SET gold_amount = $amount , "
                . " id_player = $this->id_player  , purchase = '$matrial'");
        $sql->execute();
        
        return $sql->rowCount();
        
    }
    
}


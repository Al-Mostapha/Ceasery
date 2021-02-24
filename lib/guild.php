<?php



class Guild
{
    private $id_player;
    private $id_guild;
    
    
    public function __construct($id_player , $id_guild="") 
    {
        
        $this->id_player = $id_player;
        $this->id_guild = $id_guild;
        
    }
    
    public function creat($name , $slog_top , $slog_cnt ,$slog_btm )
    {
        global $dbh;
        
        $sql = $dbh->prepare("INSERT INTO  guild SET id_leader = '$this->id_player' ,   name = :na , slog_top = $slog_top , slog_cnt = $slog_cnt , slog_btm = $slog_btm");
        $sql->execute([
            "na"=> $name
        ]);
        
        $this->id_guild = $dbh->lastInsertId();
        $this->addPlayer(GUILD_R_LEADER);
        return $this->id_guild;
        
    }
    
    public function  addPlayer($rank)
    {
        if(!$rank){
            $rank = 0;
        }
        
        $time_join = time();
        insertIntoTable(" id_player = '$this->id_player' , id_guild = '$this->id_guild'  , rank = $rank , time_join = $time_join", "guild_member");
        updateTable("id_guild = $this->id_guild , guild = (SELECT name FROM guild WHERE id_guild = $this->id_guild)", "player", "id_player = $this->id_player");
       
    }
    
    public function updateGuildResource($sign , $resource)
    {
        
        global $dbh;
        $sql = $dbh->prepare("UPDATE guild SET food = food $sign ".$resource['food']." , "
                . " wood  = wood $sign ".$resource['wood']." , "
                . " stone = stone $sign ".$resource['stone']." , "
                . " metal = metal $sign ".$resource['metal']." ,"
                . " coin  = coin $sign ".$resource['coin']." WHERE "
                . "id_guild = $this->id_guild ");
        $sql->execute();
        return $sql->rowCount();
        
    }
    
    public function  changeGuildWord($word)
    {
        
        return updateTable(" word = :wo", "guild", "id_guild = :idg  AND id_leader = :idp", ["wo" => $word, "idg"=> $this->id_guild, "idp"=> $this->id_player]);
        
        
    }
    
    public static function updateGuildData($id_guild)
    {
        
        global $dbh;
        
        $sql = $dbh->prepare("UPDATE guild SET mem_num = (SELECT COUNT(*) FROM guild_member WHERE id_guild = $id_guild) , "
                . " prestige = (SELECT SUM(player.prestige) FROM player JOIN guild_member ON player.id_player = guild_member.id_player WHERE guild_member.id_guild = $id_guild) , "
                . " honor = (SELECT SUM(player.honor) FROM player JOIN guild_member ON player.id_player = guild_member.id_player WHERE guild_member.id_guild = $id_guild) WHERE"
                . " id_guild = $id_guild ");
        
        $sql->execute();
        
        return $sql->rowCount();
    
    }
    
    public static function getPlayerGuildData($id_player)
    {
        
        global $dbh;
        $sql = $dbh->prepare("SELECT guild_member.* , guild.name FROM guild_member JOIN guild  ON guild.id_guild = guild_member.id_guild WHERE guild_member.id_player = $id_player");
        $sql->execute();
        
        return $sql->fetch(PDO::FETCH_ASSOC);
    
    }
}

/*$guild = new Guild(1 ,11);
echo $guild->addPlayer(4);*/
/*
echo Guild::updateGuildData(12);*/
/*require_once '../config.php';
print_r(Guild::getPlayerGuildData(1));*/
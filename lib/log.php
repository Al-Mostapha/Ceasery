<?php

function signUp($email , $username , $enc_pass)
{
    global $dbh;
        
        $sql = $dbh->prepare("INSERT INTO game_user SET user_name = '$username' , "
                . " email = '$email' , user_password = '$enc_pass'");
        
        $sql->execute();
        return  $dbh->lastInsertId();
    
}


class Log
{
    
    public static function userLoged($id_user , $user_name , $last_server)
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION["id_player"]     = $id_user;
        $_SESSION["auth"]          = returnIAuthToken();
        $OuthToken = passEnc($id_user. time(). random_int(0, 5e10)."newOth");
        $_SESSION["OuthToken"]     = $OuthToken;
        
        queryExeIndex("INSERT INTO user_auth(id_user,  auth_token) VALUES (:idp, :t) ON DUPLICATE KEY UPDATE  auth_token = :ot", ["idp" => $id_user, "t" => $OuthToken, "ot" => $OuthToken]);
        
        session_write_close();
        return $OuthToken;
        
    }
    private function addGoogleUser($id_google , $id_user)
    {
        
        global $dbh;
        $sql = $dbh->prepare("INSERT INTO external_log_g SET id_google = '$id_google' , id_user = $id_user");
        $sql->execute();
        return $sql->rowCount();
    }

    public function googleLogIn($g_id_user , $email , $user_name)
    {
       
        global $dbh;
        $sql = $dbh->prepare("SELECT * FROM external_log_g WHERE id_google = '$g_id_user'");
        $sql->execute();
        $user = $sql->fetch(PDO::FETCH_ASSOC);
        
        if($user != FALSE){
           
            
            $game_user = $this->getUserGame($user["id_user"]);
            
            
            if($game_user != FALSE){
                
                static::userLoged($game_user["id_user"], $game_user["user_name"], $game_user["last_server"]);
                return "user_loged";
                
            }else{
                
                echo 'error  retrive player';
                
            }
            
            
        }else{
            
           $enc_pass = md5($email);
           $id_user =  signUp($email, $user_name, $enc_pass);
           
           if($this->addGoogleUser($g_id_user, $id_user) > 0){
               
               return "user_add";
               
           }else{
               
               return "user_error_add";
               
           }
           
            
        }
    
    }
    
    public  function getUserGame($id_user)
    {
        
        global $dbh;
        $sql = $dbh->prepare("SELECT id_user , user_name , last_server "
                . " FROM  game_user WHERE id_user = $id_user ");
        $sql->execute();
        
        return $sql->fetch(PDO::FETCH_ASSOC);
        
    }
    
    
}





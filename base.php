<?php

function cryptUserId($string, $action = 'e') {
    // you may change these values to your own
    $secret_key = 'my_simple_secret_key';
    $secret_iv = 'my_simple_secret_iv';

    $output = false;
    $encrypt_method = "AES-256-CBC";
    $key = hash('sha256', $secret_key);
    $iv = substr(hash('sha256', $secret_iv), 0, 16);

    if ($action == 'e') {
        $output = base64_encode(openssl_encrypt($string, $encrypt_method, $key, 0, $iv));
    } else if ($action == 'd') {
       $Player = selectFromTable("*", "player_auth", "auth_token = :outh", ["outh" => $string]);
       if(!count($Player))
       {
           return 0;
       }
       
       return $Player[0]["id_player"];
        
    }

    return $output;
}

function mres($value) {
    $search = array("\\", "\x00", "\n", "\r", "'", '"', "\x1a", ";", "=", "delete", "+", "update", "set", "`");
    $replace = array("\\\\", "\\0", "\\n", "\\r", "\'", '\"', "\\Z", "", "", "d el te", "⧼ ± ⧽", "up date", "s e t", "");

    return str_ireplace($search, $replace, $value);
}

function validateId($id) {

    if (!is_numeric($id)  ) {
        try {
            throw new Exception();
        } catch (Exception $e) {
            $trace = $e->getTrace();
            file_put_contents("OverNumber.txt", print_r($trace, TRUE), FILE_APPEND);
            file_put_contents("OverNumber.txt", print_r($_POST, TRUE), FILE_APPEND);
            file_put_contents("OverNumber.txt", print_r($_GET, TRUE), FILE_APPEND);
        }
        return 0;
    }else if($id < 0){
        try {
            throw new Exception();
        } catch (Exception $e) {
            $trace = $e->getTrace();
            file_put_contents("OverNumber4.txt", print_r($trace, TRUE), FILE_APPEND);
            file_put_contents("OverNumber4.txt", print_r($_POST, TRUE), FILE_APPEND);
            file_put_contents("OverNumber4.txt", print_r($_GET, TRUE), FILE_APPEND);
        }
        return 0;
    }

    return htmlspecialchars(mres(((trim(($id))))));
}

function validateName($id) {
if (mb_strlen($id) > 15) {
        try {
            throw new Exception();
        } catch (Exception $e) {
            $trace = $e->getTrace();
            file_put_contents("OverNumber5.txt", print_r($trace, TRUE), FILE_APPEND);
            file_put_contents("OverNumber5.txt", print_r($_POST, TRUE), FILE_APPEND);
            file_put_contents("OverNumber5.txt", print_r($_GET, TRUE), FILE_APPEND);
        }
        
    }

    return mres(htmlspecialchars((trim(($id)))));
}

function validateEnStr($id) {

    if (mb_strlen($id) > 15) {
        try {
            throw new Exception();
        } catch (Exception $e) {
            $trace = $e->getTrace();
            file_put_contents("OverNumber2.txt", print_r($trace, TRUE), FILE_APPEND);
            file_put_contents("OverNumber2.txt", print_r($_POST, TRUE), FILE_APPEND);
            file_put_contents("OverNumber2.txt", print_r($_GET, TRUE), FILE_APPEND);
        }
        
    }
    return preg_replace('/\s+/', '&nbsp;', mres(htmlspecialchars((trim($id)))));
}

function validateOurStr($id) {

    if (mb_strlen($id) > 15) {
        try {
            throw new Exception();
        } catch (Exception $e) {
            $trace = $e->getTrace();
            file_put_contents("OverNumber3.txt", print_r($trace, TRUE), FILE_APPEND);
            file_put_contents("OverNumber3.txt", print_r($_POST, TRUE), FILE_APPEND);
            file_put_contents("OverNumber3.txt", print_r($_GET, TRUE), FILE_APPEND);
        }
        
    }
    
    return preg_replace('/\s+/', '&nbsp;', htmlentities(mres(trim($id))));
}

function passEnc($pass) {
    return password_hash(substr_replace(md5($pass), "!%@!((&", 15, 0), PASSWORD_BCRYPT);
}

function passCheck($password, $encPass) {

    return password_verify(substr_replace(md5($password), "!%@!((&", 15, 0), $encPass);
}

function returnIAuthToken() {
    return md5((isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR']) ) . (!empty($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'no ua'));
}

function isJson($string) {
    $json = json_decode($string);
    if ((json_last_error() == JSON_ERROR_NONE)) {
        return $json;
    }
    file_put_contents(BASE_BATH . "jsonError.txt", print_r($string, true), FILE_APPEND);
    file_put_contents(BASE_BATH . "jsonError.txt", print_r(debug_backtrace(), true), FILE_APPEND);
    return false;
}

function get_ip_address($id_player) {
    foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip); // just to be safe

                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                    insertIntoTable("id_player = $id_player, ipv4 = ('$ip') ON DUPLICATE KEY UPDATE  times  =  times + 1 , time_stamp = NOW()", "player_logs");
                }
            }
        }
    }
}

function sendPostReqCurl($field, $url) {

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $field);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $textResponce = curl_exec($ch);
    curl_close($ch);
    return $textResponce;
}


function catchHack() {

   
        try {
            throw new Exception();
        } catch (Exception $e) {
            $trace = $e->getTrace();
            file_put_contents("catchHack.txt", print_r($trace, TRUE), FILE_APPEND);
            file_put_contents("catchHack.txt", print_r($_POST, TRUE), FILE_APPEND);
            file_put_contents("catchHack.txt", print_r($_GET, TRUE), FILE_APPEND);
        }
        
   
}



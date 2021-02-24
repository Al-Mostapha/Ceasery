<?php 

require_once 'Firebase.php';

$servername = "localhost";
$username = "id3817927_abdoeladl";
$password = "Abdo123456";
$dbname = "id3817927_3malldatabase";

// Create connection
$dbh = new PDO('mysql:host='.$servername.';dbname='.$dbname , $username , $password );
function retriveTokens($mytoken)
{
    global $dbh;
    $sql = $dbh->prepare("SELECT Tokenum FROM Token WHERE NOT (Tokenum = '$mytoken')");
    $sql->execute();
    while ($fetch = $sql->fetch(PDO::FETCH_ASSOC)){
        $data[] = $fetch['Tokenum'];
    }
    if(is_array($data) && count($data)>0){
        return $data; // data is array
    }else{
        return FALSE;
    }
}

$cusemail = $_POST['email'];
$mytoken = $_POST['mytoken'];

// create array that contains notification details
$res = array();


//push title, message, & image url for big notification  like as below
$res['data']['title'] = $custitle;
$res['data']['message'] = $cusmessage;
$res['data']['vibrate'] = 1;
$res['data']['sound'] = 1;
$res['data']['image'] = "null";

/* //push title, message for small notification like as below 
$res['data']['title'] = "FCM Demo";
$res['data']['message'] = "Testing message";*/


//creating firebase class object 
$firebase = new Firebase(); 

//sending push notification and displaying result 
$allTokens  = retriveTokens($mytoken);
print_r($allTokens);
foreach ( $allTokens as $token){
    echo $firebase->send($tocken, $res);
}


?>
	
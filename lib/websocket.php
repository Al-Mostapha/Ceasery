<?php

require_once BASE_BATH.'vendor/autoload.php';
use WebSocket\Client;

class WS {
    
    public $client ;
    function __construct($url) 
    {
        $this->client = new Client($url);
    }
    
    function send($jsonData)
    {
        $this->client->send($jsonData);
    }
    
}



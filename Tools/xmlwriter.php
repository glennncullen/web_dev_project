<?php

    function setWord(){
        
        echo 'here';
        
        $file = 'storage.xml';
        
        $xml = simplexml_load_file($file);
        
        $words = $xml->words;
        
        $nextWord = $words.addChild('threeLetter');
        $nextword = $words.addChild('word');
        $nextword->addChild('content', 'the');
        $nextword->addChild('times_occured', '0');
        $nextword->addChild('times_found', '0');
        $nextword->addChild('diffictulty', '50');
        $nextword->addChild('score', '3');
        
        $xml->asXML($file);
    
    }

?>
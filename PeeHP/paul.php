<?php

/*
 * PHP SimpleXML
 * Loading a XML from a file, adding new elements and editing elements
 */
//get author from form
$wordOne = strtolower($_POST["newWord1"]);
$wordTwo = strtolower($_POST["newWord2"]);
$wordThree = strtolower($_POST["newWord3"]);
$wordFour = strtolower($_POST["newWord4"]);
$wordFive = strtolower($_POST["newWord5"]);
$wordSix = strtolower($_POST["newWord6"]);
$wordSeven = strtolower($_POST["newWord7"]);
$wordEight = strtolower($_POST["newWord8"]);
$wordNine = strtolower($_POST["newWord9"]);
$wordTen = strtolower($_POST["newWord10"]);




if (file_exists('../wordStorage.xml')) {
    //loads the xml and returns a simplexml object
    $xml = simplexml_load_file('../wordStorage.xml');

    //transforming the object in xml format
    $sxe = new SimpleXMLElement($xml->asXML());
    //displaying the element in proper format
    echo '<u><b>This is the xml code from test2.xml:</b></u>
     <br /><br />
     <pre>' . htmlentities($xmlFormat, ENT_COMPAT | ENT_HTML401, "ISO-8859-1") . '</pre><br /><br />';

    //adding new child to the xml
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordOne);
        $newChild->addChild('times_occured', 0);
            
    
    //transforming the object in xml format
    $xmlFormat = $xml->asXML();
    //displaying the element in proper format
    echo '<u><b>This is the xml code from test2.xml with new elements added:</b></u>
     <br /><br />
     <pre>' . htmlentities($xmlFormat, ENT_COMPAT | ENT_HTML401, "ISO-8859-1") . '</pre>';

    //changing the nodes values
    //in this case we are changing the value 
    //of all children called <name>
    //displaying the element in proper format
    echo '<br /><u><b>This is the xml code from ../wordStorage.xml with all genre changed:</b></u>
     <br /><br />
     <pre>' . htmlentities($xml->asXML(), ENT_COMPAT | ENT_HTML401, "ISO-8859-1") . '</pre>';
    } else {
        exit('Failed to open ../wordStorage.xml.');
    }
    $sxe->asXML("../wordStorage.xml");
    
    $dom = new DOMDocument('1.0');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    /* @var $xml SimpleXMLElement */
    $dom->loadXML($sxe->asXML());
    $dom->save("../wordStorage.xml");
    exit();
    //file_put_contents('/home/ubuntu/workspace/../wordStorage.xml', $xml->asXML());
    
    
    
    if(isset($_SERVER['HTTP_REFERER'])){
    header("Location: " . $_SERVER['HTTP_REFERER']);    
    } else {
        echo "An Error";
    }
    
?>

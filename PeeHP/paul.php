<?php

/*
 * PHP SimpleXML
 * Loading a XML from a file, adding new elements and editing elements
 */
//get author from form
$wordOne = strtolower($_POST["newWordOne"]);
$wordTwo = strtolower($_POST["newWordTwo"]);
$wordThree = strtolower($_POST["newWordThree"]);
$wordFour = strtolower($_POST["newWordFour"]);
$wordFive = strtolower($_POST["newWordFive"]);
$wordSix = strtolower($_POST["newWordSix"]);
$wordSeven = strtolower($_POST["newWordSeven"]);
$wordEight = strtolower($_POST["newWordEight"]);
$wordNine = strtolower($_POST["newWordNine"]);
$wordTen = strtolower($_POST["newWordTen"]);




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
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordTwo);
        $newChild->addChild('times_occured', 0);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordThree);
        $newChild->addChild('times_occured', 0);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordFour);
        $newChild->addChild('times_occured', 0);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordFive);
        $newChild->addChild('times_occured', 0);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordSix);
        $newChild->addChild('times_occured', 0);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordSeven);
        $newChild->addChild('times_occured', 0);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordEight);
        $newChild->addChild('times_occured', 0);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordNine);
        $newChild->addChild('times_occured', 0);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordTen);
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

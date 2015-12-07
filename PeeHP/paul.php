<?php

/*
 * PHP SimpleXML
 * Loading a XML from a file, adding new elements and editing elements
 */
 
//Taking in all the words from the form when it submits and posts using AJAX
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



//Checking for the wordStoage.xml file on the server
if (file_exists('../wordStorage.xml')) {
    //loads the xml and returns a simplexml object
    $xml = simplexml_load_file('../wordStorage.xml');

    //transforming the object in xml format
    $sxe = new SimpleXMLElement($xml->asXML());
    
    
    //Adding all the new words to wordStorage
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordOne);
        $newChild->addChild('times_occured', 1);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordTwo);
        $newChild->addChild('times_occured', 1);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordThree);
        $newChild->addChild('times_occured', 1);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordFour);
        $newChild->addChild('times_occured', 1);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordFive);
        $newChild->addChild('times_occured', 1);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordSix);
        $newChild->addChild('times_occured', 1);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordSeven);
        $newChild->addChild('times_occured', 1);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordEight);
        $newChild->addChild('times_occured', 1);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordNine);
        $newChild->addChild('times_occured', 1);
            
        $newChild = $sxe->addChild("word");
        $newChild->addChild('content', $wordTen);
        $newChild->addChild('times_occured', 1);
            
            
        
    

    } else {
        exit('Failed to open ../wordStorage.xml.');
    }
    $sxe->asXML("../wordStorage.xml");


    //Styling the XML to conventional XML indentaiton    
    //Used this thread to help on Stack Overflow http://stackoverflow.com/questions/1191167/format-output-of-simplexml-asxml
    $dom = new DOMDocument('1.0');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    $dom->loadXML($sxe->asXML());
    $dom->save("../wordStorage.xml");
    
    
    
    writeRSS();
    
    
        function writeRSS(){
            global $wordOne, $wordTwo, $wordThree, $wordFour, $wordFive, $wordSix, $wordSeven, $wordEight, $wordNine, $wordTen;
            
            if (file_exists('../rss.xml')) {
                //loads the xml and returns a simplexml object
                $rssxml = simplexml_load_file('../rss.xml');
                $newChild = $rssxml->channel->addChild('item');
                $newChild->addChild('title', "Newest words added");
                $newChild->addChild('link', 'https://web-dev-project-glennncullen-1.c9users.io');
                $newChild->addChild('description', $wordOne.", " . $wordTwo . ", " . $wordThree . ", " . $wordFour . ", " . $wordFive . ", " . $wordSix . ", " . $wordSeven . ", " . $wordEight . ", " . $wordNine . ", " . $wordTen);
                file_put_contents('../rss.xml', $rssxml->asXML());
            }
        }
    
    
    
    if(isset($_SERVER['HTTP_REFERER'])){
    header("Location: " . $_SERVER['HTTP_REFERER']);    
    } else {
        echo "An Error";
    }
    
    exit();

    
?>

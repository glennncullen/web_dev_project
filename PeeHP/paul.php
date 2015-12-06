<?php

/*
 * PHP SimpleXML
 * Loading a XML from a file, adding new elements and editing elements
 */
//get author from form
$suggestion = strtolower($_POST["newWord"]);



if (file_exists('wordStorage.xml')) {
    //loads the xml and returns a simplexml object
    $xml = simplexml_load_file('books.xml');

    //transforming the object in xml format
    $sxe = new SimpleXMLElement($xml->asXML());
    //displaying the element in proper format
    echo '<u><b>This is the xml code from test2.xml:</b></u>
     <br /><br />
     <pre>' . htmlentities($xmlFormat, ENT_COMPAT | ENT_HTML401, "ISO-8859-1") . '</pre><br /><br />';

    //adding new child to the xml
    
    
    switch($suggestion){
        
        case (strlen($suggestion) == 3):
            $newChild = $sxe->addChild("threeLetter");
            $newChild->addChild('word', $suggestion);
            $newChild->addChild('word', $suggestion);
            $newChild->addChild('word', $suggestion);
            $newChild->addChild('word', $suggestion);
            $newChild->addChild('word', $suggestion);
            break;
        
        case (strlen($suggestion) == 4):
            $newChild = $sxe->addChild("fourLetter");
            $newChild->addChild('word', $suggestion);
            break;
        
        case (strlen($suggestion) == 5):
            $newChild = $sxe->addChild("fiveLetter");
            $newChild->addChild('word', $suggestion);
            break;
        
        case (strlen($suggestion) == 6):
            $newChild = $sxe->addChild("sixLetter");
            $newChild->addChild('word', $suggestion);
            break;
        
        case (strlen($suggestion) == 7):
            $newChild = $sxe->addChild("sevenLetter");
            $newChild->addChild('word', $suggestion);
            break;
        
        case (strlen($suggestion) == 8):
            $newChild = $sxe->addChild("eightLetter");
            $newChild->addChild('word', $suggestion);
            break;
        
        default:
            echo "Error adding word - "+$suggestion;
            break;
        
    }
    
    
    //transforming the object in xml format
    $xmlFormat = $xml->asXML();
    //displaying the element in proper format
    echo '<u><b>This is the xml code from test2.xml with new elements added:</b></u>
     <br /><br />
     <pre>' . htmlentities($xmlFormat, ENT_COMPAT | ENT_HTML401, "ISO-8859-1") . '</pre>';

    //changing the nodes values
    //in this case we are changing the value 
    //of all children called <name>
    foreach ($sxe->children() as $child)
        $child->genre = "CHANGED";
    //displaying the element in proper format
    echo '<br /><u><b>This is the xml code from books.xml with all genre changed:</b></u>
     <br /><br />
     <pre>' . htmlentities($xml->asXML(), ENT_COMPAT | ENT_HTML401, "ISO-8859-1") . '</pre>';
    } else {
        exit('Failed to open books.xml.');
    }
    $sxe->asXML("books.xml");
    
    $dom = new DOMDocument('1.0');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    /* @var $xml SimpleXMLElement */
    $dom->loadXML($sxe->asXML());
    $dom->save("books.xml");
    exit();
    //file_put_contents('/home/ubuntu/workspace/books.xml', $xml->asXML());
    
    
    
    if(isset($_SERVER['HTTP_REFERER'])){
    header("Location: " . $_SERVER['HTTP_REFERER']);    
    } else {
        echo "An Error";
    }
    
?>

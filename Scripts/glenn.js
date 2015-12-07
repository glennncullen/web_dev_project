
    
var gameLetters = []; // stores the Letter objects of the current board
var tempWords = []; // stores the most recent words in wordStorage.xml
var gameWords = []; // stores the current words the user is searching for
var score = 0; // this stores the running score of the game
var wonTheGame = false;

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
                'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 
                'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 
                'y', 'z'] // em -- this, eh -- this is the alphabet...

var playerSelectedLetters = []; // tracks and stores the Letter objects the player has selected



$(document).ready(function(){
    
    // starts the game when the user presses the New Game Button
    $('#newGameBtn').click(function(){
        clearPreviousGame();
        randomWords();
        $(document).ajaxComplete(function(e, xhr, options){  
            fillGameArea();
        $(this).unbind('ajaxComplete');
        });
    });
    
    
    // clicking on a letter will select it. Clicking on a second
    // letter will check to see if a word has been found
    $('#horseBox').on('click', '.letterDiv',function(){
        if($(this).hasClass('wordFound')){
            if(playerSelectedLetters.length === 1){
                $('#' + playerSelectedLetters[0].id).animate({backgroundColor: 'white'}, 400);
                playerSelectedLetters = [];
            }
        }else{
            $(this).animate({backgroundColor: 'green'}, 400);
            for(var i = 0; i < gameLetters.length; i++){
                if(this.id === gameLetters[i].id){
                   playerSelectedLetters.push(gameLetters[i]);
                   i = gameLetters.length; 
                }
            }
        }
        
        if(playerSelectedLetters.length === 2){
            checkForWord(playerSelectedLetters);
            playerSelectedLetters = [];
        }
    });
    
});



// Generates the random words needed for a new game
function randomWords(){
    // retrieve all the words listed in wordStorage.xml using ajax
    $.get('wordStorage.xml', function(data){
        $(data).find("word").each(function(){
            tempWords.push($(this).find('content').text())
        });
    });

    // because ajax is asynchronous, we need to wait until it has completed its function
    // before carrying out the next part of the randomrds function
    $(document).ajaxComplete(function(e, xhr, options){  
        for(var i = 0; i < 10; i ++){
            var nextWord = tempWords[randomise(0, tempWords.length-1)]
            var notAlreadyUsed = true;
            for(var y = 0; y < gameWords.length; y++){
                if(gameWords[y] === nextWord){
                    notAlreadyUsed = false;
                    i--;
                    y = gameWords.length;
                }else if(y === gameWords.length - 1 && gameWords[y] !== nextWord){
                    notAlreadyUsed = true;
                }
            }
            if(notAlreadyUsed){
                gameWords.push(nextWord)
            }
        }
        
    $(this).unbind('ajaxComplete');
    });

}



// reset any outstanding divs or arrays
function clearPreviousGame(){
    $('.letterDiv').remove()
    $('.wordList').remove();
    gameLetters = [];
    gameWords = [];
    tempWords = [];
    score = 0;
    wonTheGame = false;
    playerSelectedLetters = [];
} // end of clearPreviousGame


// takes in the array of words the user has created, adds them to the
// gameWords array and fills out the game area using them.
function startUniqueGame(uniqueWords){
    clearPreviousGame()
    gameWords = uniqueWords;
    fillGameArea();
} // end of startUniqueGame



// fill out the game area as appropriate
function fillGameArea(){
    // randomly fill out the game area with letters
    for( var y = 0; y < 16; y++ ){
        for( var x = 0; x < 16; x++ ){
            var id = 'L' + 'x' + x + 'y' + y;
            var letter = alphabet[randomise(0, 25)];
            gameLetters.push(new Letter(id, letter, null, x, y, null, false, null));
            $('#horseBox').append('<div class="letterDiv" id="' + gameLetters[gameLetters.length - 1].id + '">' + gameLetters[gameLetters.length - 1].letter + '</div>');
        }
    }
    
    // fill in the actual words needed to be found into the game area
    for(var i = 0; i < gameWords.length; i++){
        plotWord(gameWords[i])
        $('#findTheseWords').append('<div class="wordList" id="word' + i + '">' + gameWords[i] + '</div>')
    }
} // end of fillGameArea




// takes in the two selected letters and checks to see if a word has been found.
// If a word has been found it will highlight the word and if not, it will deselect
// the selected letters.
function checkForWord(selectedWords){
    if(selectedWords[0].word !== selectedWords[1].word){
        $('#' + selectedWords[0].id).delay(400).animate({backgroundColor: '#89C4F4'}, 400);
        $('#' + selectedWords[1].id).animate({backgroundColor: '#89C4F4'}, 400);            
    }else if(selectedWords[0].position === 'first' && selectedWords[1].position === 'last'
                ||
    selectedWords[1].position === 'first' && selectedWords[0].position === 'last'){
        score += 1;
        for(var i = 0; i < gameLetters.length; i++){
            if(gameLetters[i].word === selectedWords[0].word){
                $('#' + gameLetters[i].id).animate({backgroundColor: 'green'}, 400);
                $('#' + gameLetters[i].id).addClass('wordFound');
                document.getElementById('wordFoundAudio').src = soundEffects[userTheme]['wordFound'];
            }
        }
        for(var i = 0; i < gameWords.length; i++){
            if($('#word' + i).text() === selectedWords[0].word){
                $('#word' + i).animate({backgroundColor: 'green'}, 400);
                i = gameWords.length;
            }
        }
        if(score === 10){
            wonTheGame = true;
            document.getElementById('gameFinishedAudio').src = soundEffects[userTheme]['gameFinished'];
            winner();
        }
        
    }else{
        $(function(){
            $('#' + selectedWords[0].id).delay(400).animate({backgroundColor: '#89C4F4'}, 400);
            $('#' + selectedWords[1].id).animate({backgroundColor: '#89C4F4'}, 400);            
        });
    }
    
} // end of checkForWord



    
// this function takes a word and places it on the board making
// checks along the way to make sure the letter can be placed
function plotWord(word){
    var tempX = randomise(0, 15);
    var tempY = randomise(0, 15);
    var tempId = 'L' + 'x' + tempX + 'y' + tempY;
    var direction = setDirection();
    
    var letters = [];
    
    // add the first letter of the word to the first position in the letters array
    letters[0] = new Letter(tempId, word.charAt(0), word, tempX, tempY, direction, true, 'first');
    
    // checks to see if the first letter in the letters array is
    // able to be placed and if not, it will start the function again.
    if(!canPlaceLetter(letters[0])){
        return plotWord(word)
    }
    
    // Goes through each letter in the word and adds it to the letters array.
    // It uses the previous entry in the array to determine its position
    // depending on the direction the word is going.
    // Finally, it checks whether the letter is able to be placed and if
    // not, it will start the function again.
    for(var i = 1; i < word.length; i++){
        switch(direction){
            case 'N':
                var id = ('L' + 'x' + letters[i-1].xPos + 'y' + (letters[i-1].yPos - 1));
                letters[i] = new Letter(id, word.charAt(i), word, letters[i-1].xPos, letters[i-1].yPos - 1, letters[0].direction, true, null);
                break;
            case 'NE':
                var id = ('L' + 'x' + (letters[i-1].xPos + 1) + 'y' + (letters[i-1].yPos - 1));
                letters[i] = new Letter(id, word.charAt(i), word, letters[i-1].xPos + 1, letters[i-1].yPos - 1, letters[0].direction, true, null);
                break;
            case 'E':
                var id = ('L' + 'x' + (letters[i-1].xPos + 1) + 'y' + (letters[i-1].yPos));
                letters[i] = new Letter(id, word.charAt(i), word, letters[i-1].xPos + 1, letters[i-1].yPos, letters[0].direction, true, null);
                break;
            case 'SE':
                var id = ('L' + 'x' + (letters[i-1].xPos + 1) + 'y' + (letters[i-1].yPos + 1));
                letters[i] = new Letter(id, word.charAt(i), word, letters[i-1].xPos + 1, letters[i-1].yPos + 1, letters[0].direction, true, null);
                break;
            case 'S':
                var id = ('L' + 'x' + (letters[i-1].xPos) + 'y' + (letters[i-1].yPos + 1));
                letters[i] = new Letter(id, word.charAt(i), word, letters[i-1].xPos, letters[i-1].yPos + 1, letters[0].direction, true, null);
                break;
            case 'SW':
                var id = ('L' + 'x' + (letters[i-1].xPos - 1) + 'y' + (letters[i-1].yPos + 1));
                letters[i] = new Letter(id, word.charAt(i), word, letters[i-1].xPos - 1, letters[i-1].yPos + 1, letters[0].direction, true, null);
                break;
            case 'W':
                var id = ('L' + 'x' + (letters[i-1].xPos - 1) + 'y' + (letters[i-1].yPos));
                letters[i] = new Letter(id, word.charAt(i), word, letters[i-1].xPos - 1, letters[i-1].yPos, letters[0].direction, true, null);
                break;
            case 'NW':
                var id = ('L' + 'x' + (letters[i-1].xPos - 1) + 'y' + (letters[i-1].yPos - 1));
                letters[i] = new Letter(id, word.charAt(i), word, letters[i-1].xPos - 1, letters[i-1].yPos - 1, letters[0].direction, true, null);
                break;
            default:
                alert('Something went mental! Refresh dis!')
                break;
        }
        if(!canPlaceLetter(letters[i])){
            return plotWord(word)
        }
    }
    
    // sets the position attribute for the last Object in the letters
    // array to last
    letters[word.length-1].position = 'last';
    

    
    // Changes the object in the gameLetters array to the letter being placed.
    // It traverses each id in the gameLetters array until it finds the matching
    // id for the letter it is currently checking and then assigns the object to
    // that position in the gameLetters array.
    // Finally, it will change the divs associated with the new entries into the gameLetters
    // array.
    for( var y = 0; y < word.length; y++ ){
        for(var i = 0; i < gameLetters.length; i++){
            if(letters[y].id === gameLetters[i].id){
                gameLetters[i] = letters[y];
                i = gameLetters.length;
            }
        }
        $('#' + letters[y].id).replaceWith('<div class="letterDiv" id="' + letters[y].id + '">' + letters[y].letter + '</div>');
    }
} // end of plotWord function
    
    
    
// This function checks to see whether the letter Object being passed in
// is able to be placed in the square it is trying to be placed in.
function canPlaceLetter(letter){
    var tempObj;
    
    // finds the Object in the gameLetters array which matches the letter's id
    // and then assigns the gameLetters Object to a temporary variable for testing
    // edge cases efficiently.
    for(var i = 0; i < gameLetters.length; i++){
        if(letter.id === gameLetters[i].id){
            tempObj = gameLetters[i];
            i = gameLetters.length;
        }
    }

    // firstly checks to make sure that the Letter is within the boundaries of the 
    // gameboard. Next it will check to see if the temp Object is part Of a selectable Word,
    // and if so, that it's not the same word as the word Letter is coming from, and finally
    // that the Letter's letter is not the same as the temp Object's letter.
    if(letter.xPos < 0 || letter.xPos > 15 || letter.yPos < 0 || letter.yPos > 15){
        return false;
    }else if(tempObj.partOfWord){
        return false;
    }else{
        return true;
    }
} // end of canPlaceLetter()


// plays a little animation when the player wins the game
function winner(){
    var colours = ['#ffddcc', '#ffccb3', '#ffbb99', '#ffaa80', '#ff9966', '#ff884d', '#ff7733', '#ff661a', '#ff5500', '#ffeee5', '#7FFF00', '#D2691E', '#FF7F50', '#6495ED', '#FFF8DC', '#DC143C', '#00FFFF', '#008B8B', '#B8860B', '#A9A9A9', '#BDB76B', '#F0F8FF', '#FAEBD7', '#00FFFF', '#7FFFD4', '#F0FFFF', '#F5F5DC', '#FFE4C4', '#DCDCDC']
    var newColour = colours[randomise(0, colours.length-1)]
    var x = randomise(0, 255)

    $('#' + gameLetters[x].id).delay(randomise(100, 700)).animate({
        backgroundColor: newColour
    })
    if(wonTheGame){
        return winner();
    }
}







// This is the Letter object which stores its x and y position, as well as what
// letter it is, it's id which matches the Div it's assigned to, the direction
// the word it comes from is facing, the word it comes from,  whether or not
// it is part of a selectable word and its position within the selectable word.
function Letter(id, letter, word, xPos, yPos, direction, partOfWord, position){
    this.xPos = xPos;
    this.yPos = yPos;
    this.letter = letter;
    this.id = id;
    this.direction = direction;
    this.word = word;
    this.partOfWord = partOfWord;
    this.position = position;
} // end of Letter object


// This function randomly selects a direction for the word to move in
function setDirection(){
        switch(randomise(1, 8)){
            case 1:
                return 'N';
            case 2:
                return 'NE';
            case 3:
                return 'E';
            case 4:
                return 'SE';
            case 5:
                return 'S';
            case 6:
                return 'SW';
            case 7:
                return 'W';
            case 8:
                return 'NW';
            default:
                break;
        }
    } // end of setDirection()
    

// This function takes in the minimum and maximum values in a range
// and chooses a random number therein.
function randomise(min, max){
    return Math.round(Math.random() * (max - min) + min);
} // end of randomise
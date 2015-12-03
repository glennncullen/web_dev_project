
var gameLetters = [[], []];

$(document).ready(function(){
    
    
    var words;
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    
    
    
    $('#pencil').click(function(){
        console.log('clicked')

        for( var y = 0; y < 16; y++ ){
            for( var x = 0; x < 16; x++ ){
                var id = 'L' + x + y;
                var letter = alphabet[randomise(0, 25)];

                gameLetters[[x][y]] = new Letter(id, letter, x, y, null, false);
            
                $('#horseBox').append('<div class="letterDiv" id="' + gameLetters[[x][y]].id + '">' + gameLetters[[x][y]].letter + '</div>');
                console.log(id + '---' + letter + '---' + gameLetters[[x][y]].id + '---' + gameLetters[[x][y]].letter  + '---' + gameLetters[[x][y]].partOfWord)
            }
        }
        
        words = [new word('test'), new word('penis'), new word('great'), new word('higher'), new word('example')];
        
    });
    
});



function word(word){
    this.word = word;

    plotWord();
    
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
    
    
    
    function plotWord(){
        var tempX = randomise(0, 15);
        var tempY = randomise(0, 15);
        var tempId = 'L' + tempX + tempY;
        
        var letters = [];
        
        letters[0] = new Letter(tempId, word.charAt(0), tempX, tempY, setDirection(), true);
        
        console.log(letters[0].id + '--' + letters[0].direction + '--' + word)
        
        for(var i = 1; i < word.length; i++){
            
            switch(letters[0].direction){
                case 'N':
                    var id = ('L' + letters[i-1].xPos + (letters[i-1].yPos - 1));
                    letters[i] = new Letter(id, word.charAt(i), letters[i-1].xPos, letters[i-1].yPos - 1, letters[0].direction, true);
                    if(letters[i].xPos >= 0 && letters[i].xPos <= 15 && letters[i].yPos >= 0 && letters[i].yPos <= 15 
                            && 
                        gameLetters[[letters[i].xPos][letters[i].yPos]]
                            &&
                        letters[i].letter === gameLetters[[letters[i].xPos][letters[i].yPos]].letter){
                            plotWord()
                    }else{
                        gameLetters[[letters[i].xPos][letters[i].yPos]] = letters[i]
                    }
                    break;
                case 'NE':
                    var id = ('L' + (letters[i-1].xPos + 1) + (letters[i-1].yPos - 1));
                    letters[i] = new Letter(id, word.charAt(i), letters[i-1].xPos + 1, letters[i-1].yPos - 1, letters[0].direction, true);
                    if(letters[i].xPos >= 0 && letters[i].xPos <= 15 && letters[i].yPos >= 0 && letters[i].yPos <= 15 
                            && 
                        gameLetters[[letters[i].xPos][letters[i].yPos]]
                            &&
                        letters[i].letter === gameLetters[[letters[i].xPos][letters[i].yPos]].letter){
                            plotWord()
                    }else{
                        gameLetters[[letters[i].xPos][letters[i].yPos]] = letters[i]
                    }
                    break;
                case 'E':
                    var id = ('L' + (letters[i-1].xPos + 1) + (letters[i-1].yPos));
                    letters[i] = new Letter(id, word.charAt(i), letters[i-1].xPos + 1, letters[i-1].yPos, letters[0].direction, true);
                    if(letters[i].xPos >= 0 && letters[i].xPos <= 15 && letters[i].yPos >= 0 && letters[i].yPos <= 15 
                            && 
                        gameLetters[[letters[i].xPos][letters[i].yPos]]
                            &&
                        letters[i].letter === gameLetters[[letters[i].xPos][letters[i].yPos]].letter){
                            plotWord()
                    }else{
                        gameLetters[[letters[i].xPos][letters[i].yPos]] = letters[i]
                    }
                    break;
                case 'SE':
                    var id = ('L' + (letters[i-1].xPos + 1) + (letters[i-1].yPos + 1));
                    letters[i] = new Letter(id, word.charAt(i), letters[i-1].xPos + 1, letters[i-1].yPos + 1, letters[0].direction, true);
                    if(letters[i].xPos >= 0 && letters[i].xPos <= 15 && letters[i].yPos >= 0 && letters[i].yPos <= 15 
                            && 
                        gameLetters[[letters[i].xPos][letters[i].yPos]]
                            &&
                        letters[i].letter === gameLetters[[letters[i].xPos][letters[i].yPos]].letter){
                            plotWord()
                    }else{
                        gameLetters[[letters[i].xPos][letters[i].yPos]] = letters[i]
                    }
                    break;
                case 'S':
                    var id = ('L' + (letters[i-1].xPos) + (letters[i-1].yPos + 1));
                    letters[i] = new Letter(id, word.charAt(i), letters[i-1].xPos, letters[i-1].yPos + 1, letters[0].direction, true);
                    if(letters[i].xPos >= 0 && letters[i].xPos <= 15 && letters[i].yPos >= 0 && letters[i].yPos <= 15 
                            && 
                        gameLetters[[letters[i].xPos][letters[i].yPos]]
                            &&
                        letters[i].letter === gameLetters[[letters[i].xPos][letters[i].yPos]].letter){
                            plotWord()
                    }else{
                        gameLetters[[letters[i].xPos][letters[i].yPos]] = letters[i]
                    }
                    break;
                case 'SW':
                    var id = ('L' + (letters[i-1].xPos - 1) + (letters[i-1].yPos + 1));
                    letters[i] = new Letter(id, word.charAt(i), letters[i-1].xPos - 1, letters[i-1].yPos + 1, letters[0].direction, true);
                    if(letters[i].xPos >= 0 && letters[i].xPos <= 15 && letters[i].yPos >= 0 && letters[i].yPos <= 15 
                            && 
                        gameLetters[[letters[i].xPos][letters[i].yPos]]
                            &&
                        letters[i].letter === gameLetters[[letters[i].xPos][letters[i].yPos]].letter){
                            plotWord()
                    }else{
                        gameLetters[[letters[i].xPos][letters[i].yPos]] = letters[i]
                    }
                    break;
                case 'W':
                    var id = ('L' + (letters[i-1].xPos - 1) + (letters[i-1].yPos));
                    letters[i] = new Letter(id, word.charAt(i), letters[i-1].xPos - 1, letters[i-1].yPos, letters[0].direction, true);
                    if(letters[i].xPos >= 0 && letters[i].xPos <= 15 && letters[i].yPos >= 0 && letters[i].yPos <= 15 
                            && 
                        gameLetters[[letters[i].xPos][letters[i].yPos]]
                            &&
                        letters[i].letter === gameLetters[[letters[i].xPos][letters[i].yPos]].letter){
                            plotWord()
                    }else{
                        gameLetters[[letters[i].xPos][letters[i].yPos]] = letters[i]
                    }
                    break;
                case 'NW':
                    var id = ('L' + (letters[i-1].xPos - 1) + (letters[i-1].yPos - 1));
                    letters[i] = new Letter(id, word.charAt(i), letters[i-1].xPos - 1, letters[i-1].yPos - 1, letters[0].direction, true);
                    if(letters[i].xPos >= 0 && letters[i].xPos <= 15 && letters[i].yPos >= 0 && letters[i].yPos <= 15 
                            && 
                        gameLetters[[letters[i].xPos][letters[i].yPos]]
                            &&
                        letters[i].letter === gameLetters[[letters[i].xPos][letters[i].yPos]].letter){
                            plotWord()
                    }else{
                        gameLetters[[letters[i].xPos][letters[i].yPos]] = letters[i]
                    }
                    break;
                default:
                    alert('Something went mental! Refresh dis bitch!')
                    break;
            }
            console.log(word.charAt(i) + '--' + letters[i].letter + '--' + letters[i].id)
            
        }
        
        if(!letters[word.length - 2].canPlace(letters[0].direction)){
            plotWord();
        }else{
            for(var i = 0; i < word.length; i++){
                gameLetters[[letters[i].xPos][letters[i].yPos]] = new Letter(letters[i].id, letters[i].letter, letters[i].xPos, letters[i].yPos, letters[i].direction, true);
                $('#' + letters[i].id).replaceWith('<div style="background-color: red" class="letterDiv" id="' + letters[i].id + '">' + letters[i].letter + '</div>');
            }
        }
    } // end of plotWord()
    
}



function Letter(id, letter, xPos, yPos, direction, partOfWord){
    this.xPos = xPos;
    this.yPos = yPos;
    this.letter = letter;
    this.id = id;
    this.direction = direction;
    
    this.partOfWord = partOfWord;
    
    this.canPlace = function(direction){
        if( direction === 'N' && this.yPos - 1 < 0 ||
            direction === 'NE' && (this.yPos - 1 < 0 && this.xPos + 1 > 15) ||
            direction === 'E' && this.xPos + 1 > 15 ||
            direction === 'SE' && (this.yPos + 1 > 15 && this.xPos + 1 > 15) ||
            direction === 'S' && this.yPos + 1 > 15 ||
            direction === 'SW' && (this.yPos + 1 > 15 && this.xPos - 1 < 0) ||
            direction === 'W' && this.xPos - 1 < 0 ||
            direction === 'NW' && (this.yPos - 1 < 0 && this.xPos - 1 < 0)
        ){
            return false;
        // }else if(gameLetters[[x][y]].partOfWord && gameLetters[[x][y]].letter !== this.letter){
            // return false;
        }else{
            return true;
        }
    }

}


function randomise(min, max){
    return Math.round(Math.random() * (max - min) + min);
}
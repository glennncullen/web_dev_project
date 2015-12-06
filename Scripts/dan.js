var trackLibrary = new Array(); //Holds links for the playlist
var currentSong; //Tracks the current position in the playlist
var trackPosition; //For holding the current position in the song
var musicVolume = 0.8;  //Sets the default volume for the Soundcloud player
var alreadyExecuted = false;    //Flag to prevent $(document) replication 
var songChangeAudio, wordFoundAudio, gameFinishedAudio;
var userTheme = "funny";  //Theme set by the user. "default", "funny", "christmas"

//Stores user settings for the Soundcloud widget
var playerSettings = {
    "autoPlay":"true", //Sets the player to play automatically when the page loads or a new song loads
    "hideRelated":"false",
    "showComments":"false",
    "showUser":"false",
    "showReposts":"false",
    "showArtwork":"false"   //Shows or hides the song artwork
}; 

//Object structure for holding the sound effects
var soundEffects = {};

//Compiles the settings for the Soundcloud URL
var trackSettings = "";
    
//------SONG LIBRARY------//
//Immediately grabs the links for the background music and stores it in an array for use with the Soundcloud widget
//Use following line to call from the library
//trackLibrary[/*index*/];
(function(){
    $.get('storage.xml',function(data){
        $(data).find("backgroundMusic").each(function(){
            $(this).find('song').each(function(){
                var x = $(this);    //Stores selected tag in a variable
                trackLibrary.push(x.find('musicLink').text());      //Adds any music links to the array
            });
        });
    });
}());

//------SOUND EFFECTS------//
//Immediately grabs the paths for the sound effects and stores them in an array
//Current themes are: default, funny
//Current sound names are: songChange, wordFound, gameFinished
//Use following line to call from the object
//soundEffects[/*theme*/][/*soundName*/];
(function(){
    $.get('storage.xml',function(data){
        $(data).find('soundEffects').each(function(){
            $(this).find("theme").each(function(){    //Finds any theme tags with the current theme as an attribute
                var themeName = $(this).attr('name');
                var tempObj = {};   //Temporary obj to hold the sound name and reference
                $(this).find('sound').each(function(){  //Finds sound tags within the selected theme
                    var fileName = $(this).attr('name');
                    var fileRef = $(this).find('reference').text();
                    tempObj[fileName] = fileRef;
                    soundEffects[themeName] = tempObj; //Adds the temporary object to the sound effects object so they can be called as needed
                });
            });
        });
    });
}());

//Checks for any Ajax completions to make sure the music library has been loaded before trying to use the links
$(document).ajaxComplete(function(e, xhr, options){  
    currentSong = Math.floor((Math.random() * trackLibrary.length));  //Randomises the starting song
    scWidget();
    $(this).unbind('ajaxComplete');  //Removes the ajaxComplete to prevent $(document) replication and calculation errors
});

//Runs all initialisation functions when the page loads
function initDanJS(songChangeTag, wordFoundTag, gameFinishedTag){
    songChangeAudio = songChangeTag;
    wordFoundAudio = wordFoundTag;
    gameFinishedAudio = gameFinishedTag;
}

    //Sets up the SoundCloud widget
    function scWidget(){ 
        iFrameSettings();   
        getNextSongIndex();
        document.getElementById('myPlayer').src = trackLibrary[currentSong]+trackSettings;   //Changes the source of the iFrame allowing a new song to play
                    
        var iFramePlayer = document.getElementById('myPlayer');
        var widget = SC.Widget(iFramePlayer);
        widget.setVolume(musicVolume);
        widget.unbind(SC.Widget.Events.READY);  //Removes any READY event listeners so the recursive function doesn't multiply them
        widget.unbind(SC.Widget.Events.FINISH); //Removes any FINISH event listeners so the recursive function doesn't multiply them
        widget.bind(SC.Widget.Events.READY, function(){
            widget.bind(SC.Widget.Events.FINISH, function(){    //Adds a new FINISH event listener to exectute when a song ends
                songChangeAudio.src = soundEffects[userTheme]['songChange'];
                widget.load(trackLibrary[currentSong], playerSettings);    //Loads the next song in the playlist// stop the ready handler
                return scWidget();  //Recursively calls widget function
            });
        });
        
        //Works out which song index is next, avoiding out of bounds where necessary
        function getNextSongIndex(){
            if(currentSong>=trackLibrary.length-1){ //If index is bigger than array boundaries, makes equal to first index
                currentSong=0;
            }else if(currentSong<-1){   //If index is smaller that first index, makes equal to last index
                currentSong=((trackLibrary.length)-1);
            }else{  //Otherwise, increment index by one
                currentSong++;
            }
        }
        
        //Handles the arguments for the player URL settings
        function iFrameSettings(){
            trackSettings = "&amp;auto_play="+playerSettings["autoPlay"]+"&amp;hide_related="+playerSettings["hideRelated"]
                        +"&amp;show_comments="+playerSettings["showComments"]+"&amp;show_user="+playerSettings["showUser"]
                        +"&amp;show_reposts="+playerSettings["showReposts"]+"&amp;visual="+playerSettings["showArtwork"];
            if(playerSettings['showArtwork']==="false"){
                document.getElementById('myPlayer').height = 180;   //Reduces the height of the iFrame if the artwork IS NOT being shown
            }else if(playerSettings['showArtwork']==="true"){
                document.getElementById('myPlayer').height = 450;   //Increases the height of the iFrame if the artwork IS being shown
            }
        }
        
        //All player settings are true or false. Swaps setting if needed
        function toggleSetting(setting){
            if(setting==="true"){
                return "false";
            }else{
                return "true";
            }
        }
        
        ///////////////TEMPORARY TO CHECK FUNCTIONALITY///////////////////
        function userThemeToggle(){
            if(userTheme=="default"){
                userTheme="funny";
            }else{
                userTheme="default";
            }
        }
        
        //When a setting is clicked, it is toggled between true and false
        if(!alreadyExecuted){   //Prevents duplication of the document ready
            $(document).ready(function(){
                alreadyExecuted = true; //Flag indicating that document ready was already created
                

                //Allows autoplaying of songs
                $('#autoPlay').click(function(){
                    playerSettings['autoPlay'] = toggleSetting(playerSettings['autoPlay']);
                    if(playerSettings['autoPlay']==="true"){
                        document.getElementById('autoPlay').innerHTML = "AutoPlay Enabled!";
                    }else{
                        document.getElementById('autoPlay').innerHTML = "AutoPlay Disabled!";
                    }
                    
                                    userThemeToggle();///////////////TEMPORARY TO CHECK FUNCTIONALITY///////////////////
                });

                //Lower volume of Soundcloud player
                $('#volumeDown').click(function(){
                    musicVolume-=0.05;
                    $("#slider-vertical").slider("value", musicVolume*100); 
                    widget.setVolume(musicVolume);
                    
                                    wordFoundAudio.src = soundEffects[userTheme]['wordFound'];///////////////TEMPORARY TO CHECK FUNCTIONALITY///////////////////
                });
                //Higher volume of Soundcloud player
                $('#volumeUp').click(function(){
                    musicVolume+=0.05;
                    $("#slider-vertical").slider("value", musicVolume*100); 
                    widget.setVolume(musicVolume);
                    
                                    gameFinishedAudio.src = soundEffects[userTheme]['gameFinished'];///////////////TEMPORARY TO CHECK FUNCTIONALITY///////////////////
                })

                
                //Skips current song
                $('#skipSong').click(function(){    //Jumps to the next song
                    widget.isPaused(function(paused){   //Checks if the player is currently paused (Can't skip song if it isn't playing)
                        if(!paused){
                            widget.getDuration(function(duration){  //Get duration of current song
                                widget.seekTo(duration);    //Seeks out specified timestamp of the song
                            });
                        }
                    })
                });
                
            })
        }
        
    }
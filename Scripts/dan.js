var trackLibrary = new Array(); //Holds links for the playlist
var currentSong; //Tracks the current position in the playlist
var trackPosition; //For holding the current position in the song
var musicVolume = 0.8;
var alreadyExecuted = false;    //Flag to prevent document ready from replicating

//Stores user settings for the Soundcloud widget
var playerSettings = {
    "autoPlay":"false",
    "hideRelated":"false",
    "showComments":"false",
    "showUser":"false",
    "showReposts":"false",
    "showArtwork":"false"
}; 
//Compiles the settings for the Soundcloud URL
var trackSettings = "";
    
//Immediately grabs the links for the background music and stores it in an array for use with the Soundcloud widget
(function(){
    $.get('storage.xml',function(data){
        $(data).find("backgroundMusic").each(function(){
            $(data).find('song').each(function(){
                var x = $(this);
                trackLibrary.push(x.find('musicLink').text());      //Adds any music links to the array
            });
        });
    });
}());

//Runs all initialisation functions when the page loads
function initDanJS(){
    currentSong = Math.floor((Math.random() * trackLibrary.length))-1;  //Randomises the starting song
    scWidget();
}

    //Sets up the SoundCloud widget
    function scWidget(){ 
        iFrameSettings();   
        getNextSongIndex();
            console.log("continuing");
        document.getElementById('myPlayer').src = trackLibrary[currentSong]+trackSettings;   //Changes the source of the iFrame allowing a new song to play
                    
        var iFramePlayer = document.getElementById('myPlayer');
        var widget = SC.Widget(iFramePlayer);
        widget.setVolume(musicVolume);
        widget.unbind(SC.Widget.Events.READY);  //Removes any READY event listeners so the recursive function doesn't multiply them
        widget.unbind(SC.Widget.Events.FINISH); //Removes any FINISH event listeners so the recursive function doesn't multiply them
        widget.bind(SC.Widget.Events.READY, function(){
            widget.bind(SC.Widget.Events.FINISH, function(){    //Adds a new FINISH event listener to exectute when a song ends
                widget.load(trackLibrary[currentSong], playerSettings);    //Loads the next song in the playlist// stop the ready handler
                return scWidget();  //Recursively calls widget function
            });
        });
        
        function getNextSongIndex(){
            if(currentSong>=trackLibrary.length-1){
                currentSong=0;
            }else if(currentSong<-1){
                currentSong=((trackLibrary.length)-1);
            }else{
                currentSong++;
            }
            console.log("Current Song = "+currentSong);
        }
        
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
        
        function toggleSetting(setting){
            if(setting==="true"){
                return "false";
            }else{
                return "true";
            }
        }
        
        //When a setting is clicked, it is toggled between true and false
        if(!alreadyExecuted){
            $(document).ready(function(){
                alreadyExecuted = true;
                $('#autoPlay').click(function(){
                    playerSettings['autoPlay'] = toggleSetting(playerSettings['autoPlay']);
                    if(playerSettings['autoPlay']==="true"){
                        document.getElementById('autoPlay').innerHTML = "Auto Play is Enabled!";
                    }else{
                        document.getElementById('autoPlay').innerHTML = "Auto Play is Disabled!";
                    }
                });
                $('#volumeDown').click(function(){
                    musicVolume-=0.1;
                    widget.setVolume(musicVolume);
                });
                $('#volumeUp').click(function(){
                    musicVolume+=0.1;
                    widget.setVolume(musicVolume);
                })
                $('#skipSong').click(function(){    //Jumps to the next song
                    widget.isPaused(function(paused){   //Checks if the player is currently paused
                        if(!paused){
                            widget.getDuration(function(duration){  //Get duration of current song
                                widget.seekTo(duration);
                            });
                        }
                    })
                });
                /*$('#prevSong').click(function(){    //Jumps to the prev song
                    widget.isPaused(function(paused){   //Checks if the player is currently paused
                        if(!paused){
                            widget.getDuration(function(duration){  //Get duration of current song
                                currentSong=currentSong-2;
                                console.log("");
                                widget.seekTo(duration);    //Seeks the end of the track to prematurely end it
                            });
                        }else{}
                    })
                });*/
                $('#showArtwork').click(function(){
                    playerSettings['showArtwork'] = toggleSetting(playerSettings['showArtwork']);
                });
            })
        }
        
        
    }
    
    
var trackLibrary = new Array(); //Holds links for the playlist
var currentSong; //Tracks teh current position in the playlist

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
    var trackSettings = "&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true";  //Sets the iFrames settings, i.e. showing comments, artwork, usernames
    currentSong++;
    document.getElementById('myPlayer').src = trackLibrary[currentSong]+trackSettings;   //Changes the source of the iFrame allowing a new song to play
                
    var iFramePlayer = document.getElementById('myPlayer'),
    widget = SC.Widget(iFramePlayer);
    widget.bind(SC.Widget.Events.READY, function(){
        widget.unbind(SC.Widget.Events.FINISH); //Removes any FINISH event listeners so the recursive function doesn't multiply them
        widget.bind(SC.Widget.Events.FINISH, function(){    //Adds a new FINISH event listener to exectute when a song ends
            widget.load(trackLibrary[currentSong], null);    //Loads the next song in the playlist
            return scWidget();  //Recursively calls widget function
        });
    });
}

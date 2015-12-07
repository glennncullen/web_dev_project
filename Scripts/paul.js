/*global startUniqueGame*/

$(document).ready(function (){
    
    // PAUL!! can you change the size of the fonts for the letterDiv when it switches to mobile??
    // Make them like, half the size they are now? I think that'll sort out all our worries with 
    // the mobile version! Pleasy find handy guide below
    
    $('#createGameBtn').click(function(){
        $('.letterDiv').remove()
        $('.wordList').remove();
        $('.addWordForm').toggleClass("inputFormShow inputFormHide");
        // $('#addWordForm').remove();
    });
    
    $('#newGameBtn').click(function(){
        if($('.addWordForm').hasClass('inputFormShow')){
            $('.addWordForm').toggleClass("inputFormShow inputFormHide");
        }
        
        // $('#addWordForm').remove();
    });
    
    // END of handy guide
    
   $(function() {
    $( "#accordion" ).accordion({
      collapsible: true
    });
  });


    $("#applyButton").on("click", function(){
        
     var checkTest = $("#nightCheck").is(":checked");
     
    if(checkTest){
        $("body").css('background-color','#2c3e50');
        $("p").css('color','#95a5a6');
        $("h2").css('color','#95a5a6');
        $("h3").css('color','#95a5a6');
        $(".text").css('color','#95a5a6');
        $(".nightText").css('color','#95a5a6');
        
    }else{
        
        $("body").css('background-color','white');
        $("p").css('color','black');
        $("h2").css('color','black');
        $("h3").css('color','black');
        $(".text").css('color','black');
        $(".text").css('color','black');
    }
    
}); 
    



    //  $('#addWordForm').validate({
    //     rules: {
    //         newWord1: {
    //             required: true,
    //             minlength: 3,
    //             maxLength: 8
    //         },
    //         newWord2: {
    //             required: true,
    //             minlength: 3,
    //             maxLength: 8
    //         },
    //         newWord3: {
    //             required: true,
    //             minlength: 3,
    //             maxLength: 8
    //         },
    //         newWord4: {
    //             required: true,
    //             minlength: 3,
    //             maxLength: 8
    //         },
    //         newWord5: {
    //             required: true,
    //             minlength: 3,
    //             maxLength: 8
    //         },
    //         newWord6: {
    //             required: true,
    //             minlength: 3,
    //             maxLength: 8
    //         },
    //         newWord7: {
    //             required: true,
    //             minlength: 3,
    //             maxLength: 8
    //         },
    //         newWord8: {
    //             required: true,
    //             minlength: 3,
    //             maxLength: 8
    //         },
    //         newWord9: {
    //             required: true,
    //             minlength: 3,
    //             maxLength: 8
    //         },
    //         newWord10: {
    //             required: true,
    //             minlength: 3,
    //             maxLength: 8
    //         },
    //     }
    // });

});



/*
Grabbing words

var words = [];

words.push(dataFromForm);

startUniqueGame(words);

*/
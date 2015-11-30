$(document).ready(function (){
    
    
    $(function() {
    var icons = {
      header: "ui-icon-circle-arrow-e",
      activeHeader: "ui-icon-circle-arrow-s"
    };
    $( "#accordion" ).accordion({
      icons: icons
    });
    $( "#toggle" ).button().click(function() {
      if ( $( "#accordion" ).accordion( "option", "icons" ) ) {
        $( "#accordion" ).accordion( "option", "icons", null );
      } else {
        $( "#accordion" ).accordion( "option", "icons", icons );
      }
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
        
    }else{
        
        $("body").css('background-color','white');
        $("p").css('color','black');
        $("h2").css('color','black');
        $("h3").css('color','black');
        $(".text").css('color','black');
        
    }
    
}); 
    
    
    
    
    
    
});
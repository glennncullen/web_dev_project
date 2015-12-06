$(document).ready(function (){
    
    
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
    
    $("#addWordForm").on("submit", function(e){
            e.preventDefault();
            $this = $(this);
            
            $.ajax({
               type: "POST",
               url: $this.attr('action'),
               data: $this.serialize(),
               success : function(){
                  alert('Done');
                  document.getElementById("addWordForm").reset();
               }
            });
        });
               
    
  
});
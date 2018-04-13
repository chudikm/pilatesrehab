$( document ).ready(function() {
    $(".card").hover(function(){
      $(this).find("a").addClass("active");
      $(this).find(".card-body").addClass("active");
      $(this).find(".card-text").addClass("active");
     },
     function(){
      $(this).find("a").removeClass("active");
      $(this).find(".card-body").removeClass("active");
      $(this).find(".card-text").removeClass("active");
    }
   );
    
   $('.carousel-caption').each(function(index, element){     
       console.log($(element).data("id"));
       
       loadImageData(element);
   });
    
}); 


function loadImageData(element){
    console.log("Fetching data for:"+ element.id);
   
    $.ajax({
    type: 'GET',
    url: 'https://lmn1yd9q24.execute-api.eu-west-1.amazonaws.com/dev/PR_Image?id='+$(element).data("id"),
    crossDomain: true,
    dataType: 'json',
    success: function( data, status, jqXHR){ 
        console.log(data);
        $("#"+element.id + " h3").html(data.Items[0].Title);
        $("#"+element.id + " p").html(data.Items[0].Description);
        
    },
    error: function (responseData, textStatus, errorThrown) {
        console.log('GET Image details failed for:' + element.id);
    }

  } );   
}
 

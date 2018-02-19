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
});    

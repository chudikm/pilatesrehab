$( document ).ready(function() {
    var dataToPost = {
        "payload" : {
            "sortBy" : "date"
        }
    }
    $.ajax({
        type: 'POST',
        url: 'https://4e392y3tu3.execute-api.eu-west-1.amazonaws.com/dev/PR_readTags',
        crossDomain: true,
        data: JSON.stringify(dataToPost),
        dataType: 'json',
        success: function( data, status, jqXHR){
            console.log(data);
            processResponse(data);
        },
        error: function (responseData, textStatus, errorThrown) {
            console.log('POST failed.');
        }
    
    });
        
    function processResponse(data){
        console.log("Count:" + data.Count);
        console.log("Items:" + data.Items[0].Title);
        
        var divRow;
        var divObrazkyGaleria = document.getElementById("obrazky_galeria");
        for(i=0;i<data.Count; i++){
            if(i % 3 == 0){
                divRow = document.createElement("div");
                divObrazkyGaleria.appendChild(divRow)
                divRow.className = "row";
            }
            
            var aElem = document.createElement("a");
            divRow.appendChild(aElem);
            aElem.id = "image"+(i+1);
            
            aElem.className = "col-sm-4";
            aElem.href = "./galeria/full/"+data.Items[i].ImageName;
            aElem.setAttribute("data-toggle","lightbox");
            aElem.setAttribute("data-gallery","pilatesRehab");
            
            var imgElem =  document.createElement("img");
            aElem.appendChild(imgElem);
            imgElem.src = "./galeria/thumb/"+data.Items[i].ImageName;
            imgElem.className = "img-fluid";
            
           // $("#image"+(i+1)+" img").attr("src","./galeria/thumb/"+data.Items[i].ImageName);
          //  $("#image"+(i+1)).attr("href","./galeria/full/"+data.Items[i].ImageName);

        }
    }
    
}); 

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
                event.preventDefault();
                $(this).ekkoLightbox({
                    alwaysShowClose: true,
                    onShown: function() {
                        console.log('Checking our the events huh?');
                    },
                    onNavigate: function(direction, itemIndex){
                        console.log('Navigating '+direction+'. Current item: '+itemIndex);
                    }
                });
});

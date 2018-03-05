$( document ).ready(function() {
   
    
    loadGallery();
    loadTags();
    
    $("button").on('click', processTagFilterClick);
    
        
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
            aElem.setAttribute("data-title",data.Items[i].Title);
            aElem.setAttribute("data-footer",data.Items[i].Description);
            
            var imgElem =  document.createElement("img");
            aElem.appendChild(imgElem);
            imgElem.src = "./galeria/thumb/"+data.Items[i].ImageName;
            imgElem.className = "img-fluid";
            
        }
    }
    
    function loadGallery(){
        
            $("#galeria_loading").show();
            var myNode = document.getElementById("obrazky_galeria");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }



             var dataToPost = {
                "payload" : {
                    "sortBy" : "date"
                }
            }

             if($("#tag").attr('value') !=undefined){
                dataToPost.payload.tag = $("#tag").attr('value');
            } 

            $.ajax({
            type: 'POST',
            url: 'https://2jm70ks4vj.execute-api.eu-west-1.amazonaws.com/dev/PR_readGallery',
            crossDomain: true,
            data: JSON.stringify(dataToPost),
            dataType: 'json',
            success: function( data, status, jqXHR){
                console.log(data);
                processResponse(data);
                $("#galeria_loading").hide();
            },
            error: function (responseData, textStatus, errorThrown) {
                console.log('POST failed.');
            }

        });
    }
    
    function loadTags(){
        

            $.ajax({
            type: 'GET',
            url: 'https://4e392y3tu3.execute-api.eu-west-1.amazonaws.com/dev/PR_readTags',
            crossDomain: true,
            dataType: 'json',
            success: function( data, status, jqXHR){
                console.log(data);
                processTagResponse(data);
            },
            error: function (responseData, textStatus, errorThrown) {
                console.log('GET failed.');
            }

        });
        
        
    }
    
    function processTagResponse(data){
        var button;
        var divTags = document.getElementById("tags");
        for(i=0;i<data.Count; i++){   
            button = document.createElement("button");
            divTags.appendChild(button);
            button.className="btn btn-secondary";
            button.setAttribute("type","button");
            button.setAttribute("data-tag",data.Items[i].Tag);
            button.innerHTML=data.Items[i].Value;
            button.onclick = processTagFilterClick;
        }
    }
    
    function processTagFilterClick(event){
        $("#tag").attr('value',event.currentTarget.dataset["tag"]);
        loadGallery();    
    }
    
});



$(document).on('click', '[data-toggle="lightbox"]', function(event) {
                event.preventDefault();
                $(this).ekkoLightbox({
                    alwaysShowClose: true
  
                });
});

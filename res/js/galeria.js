$( document ).ready(function() {
   
    loadTags();
     
    $("button").on('click', processTagFilterClick);
    
        
    function processResponse(data){
        console.log("Count:" + data.Count);
        console.log("Items:" + data.Items[0].Title);
        
        var divRow;
        var tagContainer;
        var tagContainerCount;
        var tagRowMap = new Object();
        for(var i=0;i<data.Count; i++){
            
            tagContainer = findTagContainer(data.Items[i].Tag);
            tagContainerCount = Number(tagContainer.getAttribute("data-gallery-count"));
            if(tagContainerCount % 3 == 0){
                divRow = document.createElement("div");
                tagContainer.appendChild(divRow)
                divRow.className = "row";
                tagRowMap[data.Items[i].Tag] = divRow;
            }
            divRow = tagRowMap[data.Items[i].Tag];
            
            var aElem = document.createElement("a");
            divRow.appendChild(aElem);
            aElem.id = "image"+(i+1);
            
            aElem.className = "col-sm-4";
            aElem.href = "http://pilatesrehab-galeria.s3-website-eu-west-1.amazonaws.com/F/"+data.Items[i].ImageName;
            aElem.setAttribute("data-toggle","lightbox");
            aElem.setAttribute("data-gallery","pilatesRehab");
            aElem.setAttribute("data-title",data.Items[i].Title);
            aElem.setAttribute("data-footer",data.Items[i].Description);
            
            var imgElem =  document.createElement("img");
            aElem.appendChild(imgElem);
            imgElem.src = "http://pilatesrehab-galeria.s3-website-eu-west-1.amazonaws.com/T/"+data.Items[i].ImageName;
            imgElem.className = "img-fluid";
            
            tagContainer.setAttribute("data-gallery-count", tagContainerCount + 1); 
            
        }
    }
    
    function findTagContainer(tagName){
        var tagContainers = $(".tag-container");
        for(var j=0;j<tagContainers.length;j++){
            if(tagContainers[j].getAttribute("data-gallery-tag") == tagName){
                return tagContainers[j];
            }
        }
        return document.getElementById("obrazky_galeria");
            
    }
    
    function loadGallery(){
        
            $("#galeria_loading").show();
            cleanTagContainers();
        
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
    
    function cleanTagContainers(){
        var tagContainers = $(".tag-container");
        for(var j=0;j<tagContainers.length;j++){
            tagContainers[j].setAttribute("data-gallery-count", 0);
            var children = tagContainers[j].children;
            for(var z=children.length-1; z >= 0; z--){
                if(!children[z].classList.contains("tag-name")){
                    tagContainers[j].removeChild(children[z]);
                }
            }
            if($("#tag").attr('value') == "ALL"){
               tagContainers[j].style.display="block";
            }else{
                if(tagContainers[j].getAttribute("data-gallery-tag") == $("#tag").attr('value')){
                    tagContainers[j].style.display="block";
                }else{
                    tagContainers[j].style.display="none";
                }

            }

        }
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
                loadGallery();
            },
            error: function (responseData, textStatus, errorThrown) {
                console.log('GET failed.');
            }

        });
        
        
    }
    
    function processTagResponse(data){
        data.Items.sort(function(a, b){return a.Order - b.Order});
        var button;
        var tagContainer;
        var tagRow;
        var divTags = document.getElementById("tags");
        var divObrazkyGaleria = document.getElementById("obrazky_galeria");
        
        for(i=0;i<data.Count; i++){   
            button = document.createElement("button");
            divTags.appendChild(button);
            button.className="btn btn-secondary";
            button.setAttribute("type","button");
            button.setAttribute("data-tag",data.Items[i].Tag);
            button.innerHTML=data.Items[i].Value;
            button.onclick = processTagFilterClick;
            
            tagContainer = document.createElement("div");
            divObrazkyGaleria.appendChild(tagContainer);
            tagContainer.className = "tag-container"
            tagContainer.setAttribute("data-gallery-tag", data.Items[i].Tag);
            tagContainer.setAttribute("data-gallery-count", 0);
            
            tagRow = document.createElement("div");
            tagContainer.appendChild(tagRow);
            tagRow.className = "row tag-name";
            tagRow.innerHTML = data.Items[i].Value; 
            
            
            
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

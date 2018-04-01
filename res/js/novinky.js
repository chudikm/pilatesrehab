$( document ).ready(function() {
   
    var converter = new showdown.Converter();

    
    loadNovinky();
    
        
    function processResponse(data){
        console.log("Count:" + data.Count);
        console.log("Items:" + data.Items[0].Title);
        
        var divRow;
        var divContainer = document.getElementById("container");
        for(i=0;i<data.Count; i++){
            divRow = document.createElement("div");
            divContainer.appendChild(divRow)
            divRow.className = "row";
            
            divRow.appendChild(createCardData((i%2)==0,data.Items[i]));            
        }
    }
    
    
    function createCardData(leftImage, dataItem){
        var divCardTop = document.createElement("div");
        divCardTop.className = "card col-lg-12";
        
        
        var divCardBody = document.createElement("div");
        var divImg = document.createElement("div");
        divImg.className= leftImage? "card-body-img-left" : "card-body-img-right";
        
        var imgElem =  document.createElement("img");
        imgElem.src = "http://pilatesrehab-galeria.s3-website-eu-west-1.amazonaws.com/T2x3/"+dataItem.ImageName;
        divImg.appendChild(imgElem);
        divCardBody.appendChild(divImg);
        
        var divMainText = document.createElement("div");
        divMainText.className = "card-main-text";
        
        var pTitle = document.createElement("p");
        pTitle.className="card-title";
        pTitle.innerText = dataItem.Title;
        
        divMainText.appendChild(pTitle);
        
        var pText = document.createElement("p");
        pText.className="card-text";
        pText.innerHTML = converter.makeHtml(dataItem.Text);
        
        divMainText.appendChild(pText);
        
        var pCardDate = document.createElement("p");
        pCardDate.className="card-date";
        
        
        divMainText.appendChild(pCardDate);
        
        var pCardDateText = document.createElement("span");
        pCardDateText.innerHTML = "Pridané ";
        
        pCardDate.appendChild(pCardDateText);
        
        var pCardDateDate = document.createElement("span");
        var createDate = new Date(dataItem.CreateTime*1000);
        pCardDateDate.innerHTML = createDate.getFullYear() + "-" + (createDate.getMonth()+1) + "-" + createDate.getUTCDate();
        pCardDate.appendChild(pCardDateDate);
        
        divCardBody.appendChild(divMainText);
        
        
        divCardTop.appendChild(divCardBody);
        
        return divCardTop;
        
    }
     
    function loadNovinky(){
        
            $("#loading_panel").show();
            var myNode = document.getElementById("container");
            
            $.ajax({
            type: 'GET',
            url: 'https://84zs0n1peh.execute-api.eu-west-1.amazonaws.com/dev/pilatesrehab-getNews',
            crossDomain: true,
            dataType: 'json',
            success: function( data, status, jqXHR){
                console.log(data);
                processResponse(data);
                $("#loading_panel").hide();
            },
            error: function (responseData, textStatus, errorThrown) {
                console.log('POST failed.');
            }

        });
    }
    
});
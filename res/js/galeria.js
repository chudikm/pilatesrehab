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
        
        for(i=0;i<data.Count; i++){
            $("#image"+(i+1)).css('background-image', 'url(' + "./galeria/thumb/"+data.Items[i].ImageName + ')');
        }
    }
    
}); 
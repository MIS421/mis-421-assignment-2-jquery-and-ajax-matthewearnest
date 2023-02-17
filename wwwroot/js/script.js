var len;
var results = '';

//function that calls api search
function getApiSearchonClick() {
    apiSearch();
}



function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "09f32d1924664960954dc3679bf4d1cc");
      },
      type: "GET",
    })
    .done(function (data) {
        len = data.webPages.value.length;
    
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
        }

        //css visibility left blank box, fixed now
        $('#searchResults').css("visibility", "visible");
        $('#searchResults').html(results);
        $('#searchResults').dialog(
            {
                modal: true,
                width: 600,
                height: 300,
                title: "Search Results",

                }        );
    })
    .fail(function () {
      alert("error");
    });
}


//EXTRA CREDIT Background Image change, toggles between image array on click of div-- no refresh
function changeBackgroundImage() {
      var images = ["../images/earth.jpg", "../images/satellite.jpg"];
    var randomImage = images[Math.floor(Math.random() * images.length)];
    $("body").css("background-image", "url(" + randomImage + ")");
}


//Time button dialog box
function getTimeJQueryDialog() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    
    var minutes = currentTime.getMinutes();
    var time = hours + ":" + minutes;
    if( hours > 12) {
        time = hours - 12 + ":" + minutes + " PM";
    }
    else if (hours <= 12) {
        time = hours + ":" + minutes + " AM";
    }

    $('#time').css("visibility", "visible");
    $('#time').html(time);
    $('#time').dialog({
        modal: true,
        width: 200,
        height: 100,
        title: "Current Time",
        
    });
}

function imFeelingLucky() {
    var params = {
        "q": $("#query").val(),
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };
    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "09f32d1924664960954dc3679bf4d1cc");
        },
        type: "GET",
    }).done((data) => {
    window.open(data.webPages.value[0].url, "_blank")
  })
    .fail(() => alert("error"))
}




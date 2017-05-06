function loadJSON(myfile, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', myfile, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function init() {

    var url = window.location.href;
    var n = url.indexOf("?data=");
    if (n != -1) { data = url.substr(n+6,5) }

 	loadJSON("https://mdjhoel.github.io/lessonmaker/" + data + ".json", function(response) {
  	
  		// Parse JSON string into object
    	var actual_JSON = JSON.parse(response);
    	
        var n = url.indexOf("&page=");
        if (n != -1) { n = url.substr(n+6) }
    
    	var slab = [];
    	slab.push("<header><title>Lesson</title>");
    	slab.push("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>");
    	slab.push("<link rel='stylesheet' href='site.css'>");
        slab.push("<script src='https://code.jquery.com/jquery-1.12.4.min.js' integrity='sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=' crossorigin='anonymous'></script>");
        slab.push("</header>");
    	slab.push("<nav class='navbar navbar-inverse navbar-fixed-top' role='navigation'><div class='container'><a class='navbar-brand' href='course.html?data=" + data + "'>course outline</a></div></nav>");
    	slab.push("<body>");
        slab.push("<div class='container'>");


        slab.push("<div class='jumbotron'>");
           slab.push("<h2>" + actual_JSON.lessons[n].name + "</h2>");
        slab.push("</div>");
        
        slab.push("<div class='panel panel-default'>");
        slab.push("<div class='panel-heading'><h3><b>Lesson progression</b></h3></div>");
        slab.push("<div class='list-group'>");
        
        for (var key in actual_JSON.lessons[n].outcomes) { 
            if (actual_JSON.lessons[n].outcomes[key].link != "") { 
                slab.push("<a href='" + actual_JSON.lessons[n].outcomes[key].link + "' target='_blank' class='list-group-item' data-toggle='tooltip' title='" + actual_JSON.lessons[n].outcomes[key].note + "'>");
                slab.push("<h4 class='list-group-item-heading'>" + actual_JSON.lessons[n].outcomes[key].title + "</h4><img src='http://www.pixempire.com/images/preview/chevron-arrow-down-icon.jpg' id='helpico'>");
                slab.push("<p class='list-group-item-text'>... <i>" + actual_JSON.lessons[n].outcomes[key].plan + "</i></p>");
                slab.push("</a>");
           } else { 
                    slab.push("<a class='list-group-item' data-toggle='tooltip' title=" + actual_JSON.lessons[n].outcomes[key].note + ">");
                    slab.push("<h4 class='list-group-item-heading'>" + actual_JSON.lessons[n].outcomes[key].title + "</h4>");
                    slab.push("<p class='list-group-item-text'>... <i>" + actual_JSON.lessons[n].outcomes[key].plan + "</i></p>");
                    slab.push("</a>");
           } 
        }
        
        slab.push("</div>");
        slab.push("</body>");

    	var myhtml = slab.join("");
    	document.write(myhtml);

 	});
}

function loadJSON(myfile,callback) {   
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
    if (n != -1) { data = url.substr(n+6) }

 	loadJSON("https://2018courses.github.io/lessonmaker/" + data + ".json",function(response) {
  	
  		// Parse JSON string into object
    	var actual_JSON = JSON.parse(response);
    	
    
    	var slab = [];
    	slab.push("<header><title>Course outline</title>");
    	slab.push("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>");
    	slab.push("<link rel='stylesheet' href='site.css'>");
        slab.push("<script src='https://code.jquery.com/jquery-1.12.4.min.js' integrity='sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=' crossorigin='anonymous'></script>");
        slab.push("</header>");
    	slab.push("<nav class='navbar navbar-inverse navbar-fixed-top' role='navigation'><div class='container'><a class='navbar-brand' href='course.html?data=" + data + "'>course outline</a></div></nav>");
    	slab.push("<body>");
        slab.push("<div class='container'>");
            
            slab.push("<div id='invisi-panel' class='panel panel-primary'>");
    	    
                slab.push("<div class='panel-body'>");
                    slab.push("<p><h4>Units and Lessons</h4></p>");
                slab.push("</div>");
    	
                for (i in actual_JSON.lessons) {
    		      if (actual_JSON.lessons[i].unit != "") {

                    // end unit
                    if (i > 0) { 
                        slab.push("</div></div>");
                    }

                    slab.push("<div class='panel-group' >");
                        slab.push("<div class='panel panel-primary'>");
                            slab.push("<div class='panel-heading'>");
                                slab.push(actual_JSON.lessons[i].unit);
                            slab.push("</div>");
                        slab.push("</div>");
                
                        slab.push("<div id='collapse'" + i + "class='panel-collapse collapse'>");
                        slab.push("<ul class='list-group'>");

    		      }  		
        
                slab.push("<li class='list-group-item'>");

                var mycourse = "?data=" + data; 
                var myid = "&page=" + i;
                //slab.push(myid);
         
                if (actual_JSON.lessons[i].id != -99) {
                    slab.push("<a href='builder.html" + mycourse + myid + "'>" + actual_JSON.lessons[i].name + "</a>");
                } else { 
                    slab.push(actual_JSON.lessons[i].name);
            }
         
            slab.push("</li>");
           
        }

        slab.push("</ul>");
    	slab.push("</div>");
        slab.push("</body>");

    	var myhtml = slab.join("");
    	document.write(myhtml);

 	});
}


    var index = 'file:///Users/jaume/Dropbox/Public/skylabCoders/precourse/projectes/proj_02_skylabAirlines/versio_html/index.html';

    var headerIconContent = function(name){
        var hrefIcon = `${index}?usename=${encodeURI(name)}`;
        var strHTML = `<div class='col-md-1'>`;
        strHTML += `<a href=${hrefIcon}><img id='logo_Skylab' src='img/skylabCoders_iso.jpg' alt='Skylab logo' /></a>`;
        strHTML += `</div>`;
        strHTML += `<div class='col-md-7'><h1>SKYLAB AIRLINES</h1></div>`;
        return strHTML;
    };

    var headerUserIdentification = function(name){
        var strHTML = `<div id='headerUserID' class='col-md-4'>`;
        strHTML += `<span>${name}</span>`;
        strHTML += `<a href='login.html'><img class='glyph-icon' src="img/glyph/svg/si-glyph-sign-out.svg"/></a>`;
        strHTML += `</div>`;
        return strHTML;
    };


            
                
            
            
"use strict";
/**
 * 
 * Presentation
 */
var panels=document.getElementsByClassName("panel");

//Initial panel

var landing=new landing(panels[0]);

landing.onNavigatetoRegister(function(){
    landing.hide();
    register.show();
});


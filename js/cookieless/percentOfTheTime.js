/*
    
       ##    #####      Copyright (c) - Kevin McGinty
     # _ #  ###        
    #   #  #            AtomicFrameworks
    
*/
/*jslint         browser : true, continue : true,
  devel  : true, indent  : 4,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

var percentOfTheTime = (function (){
    var init, destroy;
    // Begin Public method /initModule/
    // Purpose    : Extend the base Number object with percentOfTheTime
    init = function () {
        // Begin Number prototype method /percentOfTheTime/        
        // Purpose : 
        //      Extend Numbers to allow a callback to be called a percentage of the time
        // Arguments :
        //  * callbackObj - (optional) a function or object to be executed if the random passes
        //      * Optionally callbackObj can be an object (instead of a function) 
        //          with true and false properties that are callbacks to be executed if based on random check
        // Returns    : boolean
        //      * true  - random check passes and the callback is run
        //      * false - random check fails and the callback is not run
        
        Number.prototype.percentOfTheTime = function (callbackObj) {
                
            // Check if it passes random
            if ( this / 100 >= Math.random() ) {
                // Run true callback if set
                if ( callbackObj ) {                        
                    if ( typeof callbackObj === 'function') {
                        callbackObj();
                    } else if ( typeof callbackObj === 'object' ) {
                        if ( callbackObj['true'] ) {
                            callbackObj['true']();
                        }
                    }
                }
                return true;
            }
            
            // Either random or cookie check failed - run false callback if set
            if ( callbackObj && typeof callbackObj === 'object' ) {
                if ( callbackObj['false'] ) {
                    callbackObj['false']();
                }
            }
            return false;
        };
    };
    // End public method /initModule/
    
    // Begin public method /destroy/
    // Purpose : 
    //      Reset the config defaults & remove the percentOfTheTime method from Number
    // Arguments :
    //  * callbackObj - (optional) a function or object to be executed if the random passes
    //      * Optionally callbackObj can be an object (instead of a function) 
    //          with true and false properties that are callbacks to be executed if based on random check
    // Returns    : boolean
    //      * true  - random check passes and the callback is run
    //      * false - random check fails and the callback is not run
    destroy = function () {
        delete Number.prototype.percentOfTheTime;
    };
    // End public method /destroy/
    //------------------- END PUBLIC METHODS ---------------------
    
    return {
        init : init,
        destroy : destroy
    };
    
}());
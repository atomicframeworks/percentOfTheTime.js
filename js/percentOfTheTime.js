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
    //---------------- BEGIN MODULE SCOPE VARIABLES ---------------
    // Static default options -  used for resetting when destroyed & init with no config
    var defaults = {
            // Cookie name & value to set
            cookieName: 'percentOfTheTime',
            cookieValue: 1,
            // Days to expire
            expires: 30,
            // root default path
            path: '/',
            // Cookie domain defaults to document if not set
            domain: '',
            // Secure cookie - only https
            secure: false
        },
        // Configurable option object
        options = {},
        // Utility methods
        checkCookie, setCookie, esc,
        // Public methods
        config, init, destroy;
    //----------------- END MODULE SCOPE VARIABLES ---------------

    //------------------- BEGIN UTIL METHODS -------------------
    // Escape only characters not allowed in cookies ( the = is allowed in values but not name so pass it in optionally for a replace)
    esc = function (string, equalsSign) {
        if (equalsSign) {
            string = string.replace(/\=/g, '%3D');
        }        
        return string.replace(/\s/g, '%20').replace(/;/g, '%3B').replace(/,/g, '%2C');
    };
    
    setCookie = function() {
        var date = new Date();
        if ( typeof options.expires === 'number') {
            // If expires is a number - treat as setting expires in x days
            date.setDate( date.getDate() + options.expires );
        } else if ( options.expires instanceof Date ) {
            // If expires is a Date object - set to the object
            date = options.expires;
        }
        
        document.cookie = [
            esc(options.cookieName, 1) + '=' + esc(options.cookieValue),
            options.expires ? '; expires=' + date.toUTCString() : '',
            options.domain ? '; domain=' + options.domain : '',
            options.path ? '; path=' + options.path : '',
            options.secure ? '; secure' : ''
        ].join('');        
    };
    
    // Check for existance of cookie
    checkCookie = function() {
        return ( document.cookie.search( new RegExp( '(;\\s{0,1}|^)' + esc(options.cookieName, 1) + '=' , 'g') ) !== -1 );
    };
    //------------------- END UTIL METHODS -------------------
    
    
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin Public method /configModule/    
    // Purpose    : Set config variables on the percentOfTheTime module
    // Arguments  :
    //      * configObj - Extends the module options variable
    config = function( configObj ) {
        var key;             
        for (key in configObj) {
            if ( configObj.hasOwnProperty(key) ) {                    
                options[key] = configObj[key];
            }
        }
    };
    
    // Begin Public method /initModule/
    // Purpose    : Extend the base Number object with percentOfTheTime
    // Arguments  :
    //      * configObj - Extends the module options variable
    init = function ( configObj ) {
        
        if ( configObj ){
            config(defaults);
            config(configObj);
        } else {
            config(defaults);
        }
        
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
                
                // If there is no cookie run true
                if ( ! checkCookie() || ! options.cookieName ) {
                    // If we have a cookie name set it 
                    if ( options.cookieName ) {
                        setCookie();
                    }
                    
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
        config(defaults);
        delete Number.prototype.percentOfTheTime;
    };
    // End public method /destroy/
    //------------------- END PUBLIC METHODS ---------------------
    
    return {
        init : init,
        config : config,
        destroy : destroy
    };
    
}());
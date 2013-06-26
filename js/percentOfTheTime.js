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
    // Static default options -  used for resetting when destroyed
    var cookieName = 'percentOfTheTime', cookieValue = true,
        expires = 30, path = '/', domain = '', secure = false,
        // Configurable defaults
        options = {
            // Cookie name & value to set
            cookieName: cookieName,
            cookieValue: cookieValue,
            // Days to expire
            expires: expires,
            // root default path
            path: path,
            // Cookie domain defaults to document if not set
            domain: domain,
            // Secure cookie - only https
            secure: secure
        },
        // Utility methods
        readCookie, setCookie,
        // Public methods
        config, init, destroy;
    //----------------- END MODULE SCOPE VARIABLES ---------------

    //------------------- BEGIN UTIL METHODS -------------------
    setCookie = function() {
        var date = new Date();
        if ( typeof options.expires === 'number') {
            // If expires is a number - treat as setting expires in x days
            date.setDate( date.getDate() + options.expires );
        } else if ( options.expires instanceof Date ) {
            // If expires is a Date object - set to the object
            date = options.expires;
        } else {
            console.warn('Warning: Expires must either be number of days to expire in or a Date object');
        }
        
        document.cookie = [
            options.cookieName + '=' + options.cookieValue + '; expires=' + date.toUTCString() ,
            options.domain ? '; domain=' + options.domain : '',
            options.path ? '; path=' + options.path : '',
            options.secure ? '; secure' : ''
        ].join('');        
    };
    
    readCookie = function() {
        var name = options.cookieName + '=', ca = document.cookie.split(/;\s*/), i;
        for ( i = ca.length - 1; i >= 0; i--) {
            if (ca[i].indexOf(name) !== -1) {
                return ca[i].replace(name, '');
            }
        }
    };
    //------------------- END UTIL METHODS -------------------
    
    
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin Public method /configModule/    
    // Purpose    : Set config variables on the percentOfTheTime module
    // Arguments  :
    //      * configObj - Extends the module options variable
    config = function ( configObj ) {
        var key;             
        for (key in configObj) {
            if (configObj.hasOwnProperty(key)) {
                if (options.hasOwnProperty(key)) {                    
                    options[key] = configObj[key];
                }
            }
        }
        if ( String.hasOwnProperty('percentOfTheTime') ) {
            init();
        }
    };
    
    // Begin Public method /initModule/
    // Purpose    : Extend the base String object with percentOfTheTime
    // Arguments  :
    //      * configObj - Extends the module options variable
    init = function ( configObj ) {
        
        if ( configObj ){
            config(configObj);
        }
        
        // Begin String method /percentOfTheTime/        
        // Purpose : 
        //      Extend strings to allow a callback to be called a percentage of the time
        // Arguments :
        //  * callbackObj - (optional) a function or object to be executed if the random passes
        //      * Optionally callbackObj can be an object (instead of a function) 
        //          with true and false properties that are callbacks to be executed if based on random check
        // Returns    : boolean
        //      * true  - random check passes and the callback is run
        //      * false - random check fails and the callback is not run
        
        String.prototype.percentOfTheTime = function (callbackObj) {
            var thisString = this, divisor = 100, 
                parseNum, percentage, split,
                random = Math.random();
                    
            if ( thisString.indexOf(".") !== -1 ) {
                // Else if it is a float
                parseNum = parseFloat(thisString);
        
            } else if ( thisString.indexOf("/") !== -1) {
                // Only simple division is supported ( ie - only one / is allowed )
        
                // Split out the two to divide & set to vars
                split = thisString.split('/');
                parseNum = parseInt(split[0], 10);
                divisor = parseInt(split[1], 10);
    
            } else if (! isNaN( parseInt(thisString, 10) ) ) {        
                // Not a % . or / - parse it
                parseNum = parseInt(thisString, 10);
    
            } else {
                console.warn(this + ' could not be parsed');
            }
    
            // Check divide by 0
            if ( divisor ) {
                percentage = parseNum / divisor;
            } else {          
                console.warn('Warning: Divide by 0');
            }
    
            // Check if it passes random
            if ( percentage >= random ) {
                
                // If there is no cookie run true
                if ( ! readCookie() || options.cookieName === '') {
                    if ( options.cookieName ) {
                        setCookie();
                    }
                    
                    // Run true callback if set
                    if ( callbackObj ) {                        
                        if ( typeof callbackObj === 'function') {
                            callbackObj();
                        } else if ( typeof callbackObj === 'object' ) {
                            if ( callbackObj.hasOwnProperty('true') ) {
                                callbackObj['true']();
                            }
                        }
                    }
                    return true;
                } 
   
            }
            
            // Either random or cookie check failed - run false
            // Run false callback if set
            if ( callbackObj && typeof callbackObj === 'object' ) {
                if ( callbackObj.hasOwnProperty('false') ) {
                    callbackObj['false']();
                }
            }
            return false;
        };
    };
    // End public method /initModule/
    
    // Begin public method /destroy/
    // Purpose : 
    //      Reset the config defaults
    // Arguments :
    //  * callbackObj - (optional) a function or object to be executed if the random passes
    //      * Optionally callbackObj can be an object (instead of a function) 
    //          with true and false properties that are callbacks to be executed if based on random check
    // Returns    : boolean
    //      * true  - random check passes and the callback is run
    //      * false - random check fails and the callback is not run
    destroy = function () {
        config({
            // Cookie name & value to set
            cookieName: cookieName,
            cookieValue: cookieValue,
            // Days to expire
            expires: expires,
            // root default path
            path: path,
            // Cookie domain defaults to document if not set
            domain: domain,
            // Secure cookie - only https
            secure: secure
        });
        delete String.prototype.percentOfTheTime;
    };
    // End public method /destroy/
    //------------------- END PUBLIC METHODS ---------------------
    
    return {
        init : init,
        config : config,
        destroy : destroy
    };
    
}());
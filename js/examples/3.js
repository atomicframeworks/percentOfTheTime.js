////
//  Example 3
//      Use function return in a conditional statement

    percentOfTheTime.init();

    percentOfTheTime.config({
        cookieName: 'tenDays',
        expires: 10
    });

    // Can be used in an if statement because it will return
    //      true if the random & cookie checks pass
    //      false if either check fails
    
    if ( (25).percentOfTheTime() ){
        console.log('Example 3 - Conditional statement');
    }
     
    // Unload the module ( unsets the String's prototype method )
    percentOfTheTime.destroy();
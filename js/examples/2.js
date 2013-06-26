////
//  Example 2
//      Init with custom configs

    // Init the module with an optional config to overwrite module defaults
    percentOfTheTime.init({
        cookieName: 'fiveDays',
        expires: 5
    });

    (25).percentOfTheTime(function () {
       console.log('Example 2 - init & config'); 
    });
    
    percentOfTheTime.destroy();
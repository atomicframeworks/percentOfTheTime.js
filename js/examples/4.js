////
//  Example 4
//      Calling .destory will reset the config to defaults. So if you reinit the module it will use the defaults

    percentOfTheTime.init();

    percentOfTheTime.config({
        cookieName: 'thisWillBeLost',
    });
    
    // Unload the module by:
    //      Reset module configs to defaults 
    //      Delete the new percentOfTheTime method on String objects
    percentOfTheTime.destroy();
    
    // Reinit the module - Add the percentOfTheTime method back to String objects
    // Note because we called destory() the configs were set to default
    percentOfTheTime.init();
    
    
    // Can be used in an if statement because it will return
    //      true if the random & cookie checks pass
    //      false if either check fails
    
    if ( (25).percentOfTheTime() ){
        console.log('Example 4 - default config after destroying & reinitializing');
    }
    
    // Remove the module
    percentOfTheTime.destroy();
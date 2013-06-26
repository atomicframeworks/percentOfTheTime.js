////
//  Example 1
//      Init and use defaults ( 30 day cookie called percentOfTheTime )

    percentOfTheTime.init();
    
    (25).percentOfTheTime(function () {
       console.log('Example 1 - default'); 
    });
    
    percentOfTheTime.destroy();
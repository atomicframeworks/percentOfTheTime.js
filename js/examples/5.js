////
//  Example 5
//      Instead of a single callback function 
//      You can pass an object with true and false properties that are functions
//      The proper functions will run depending on if the random & cookie tests pass

//      Also cookieName is set to empty 
//      This means - do not set or check a cookies when the function is executed 
    percentOfTheTime.init({
        cookieName: '',
    });

    '50'.percentOfTheTime({
        true: function () {
            console.log('Example 5 - True - Heads');
        }, 
        false: function () {
            console.log('Example 5 - False - Tails');
        }
    });
    
    // Remove the module
    percentOfTheTime.destroy();
////
//  Example 6
//      According to spec these characters are escaped for cookie names & values
//      Spaces commas and semicolons are encoded for the cookie name and value
//      Equals signs are escaped only for the cookie name (equals signs are allowed in the cookie value - not name)

    percentOfTheTime.init({
        cookieName: 'encode name ; , =',
        cookieValue: ' , ; encode = value'
    });

    (100).percentOfTheTime(function(){
        console.log('Example 6 - Cookies are encoded');
    });

    // Remove the module
    percentOfTheTime.destroy();
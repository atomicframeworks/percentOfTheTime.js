# percentOfTheTime.js
Run a function (n) percent of the time. If the function executes store a cookie called percentOfTheTime (configurable) for 30 days (configurable) to prevent execution again. <br>
<br>
When determining if the user is cookied, <em>only the existance is checked</em>. The value can be anything, but if the user has the cookie they are treated as cookied. <br> 
<br>
If you do not plan to use the cookie feature or want to manage cookies yourself inside the callback you can download a cookieless version in the /js/cookieless directory.  This version has the cookie feature removed so it about 1kb smaller compared to the other version. The cookieless module is unconfigurable (because all configs are cookie related).

## Installation
1. Include the source script in your html <br>
This script will create a percentOfTheTime variable that can be used to init, config, and destroy the module.
```html
<script src="/js/percentOfTheTime.min.js"></script>
```

2. Initialize the percentOfTheTime js module
This will extend the Number class prototype with percentOfTheTime so we can call the method on any number.
```js
percentOfTheTime.init();
```


## Usage
Call .percentOfTheTime(callbackObj) on a Number and pass a callback function. <br>
    Optionally an object containing true and false properties that are functions can passed instead.  (example 5.js)<br>
    The corresponding function will be executed depending on the random and cookie tests

#### Example
The example callback will run 10% of the time the function is run.
Once the callback is run a cookie is stored so that it does not run again.
```js
(10).percentOfTheTime(function() {
    console.log('Run 10%');
});
```


## Configuration
Pass an object containing key : value pairs to the percentOfTheTime module config method.

#### Example
```js
percentOfTheTime.config({ cookieName: 'monthlyRoadblock' });
```

Configurable properties: <br>
* cookieName: Name of the cookie to be store - String, Number, or Boolean - ( converted toString() via concatenation )
* cookieValue: The value of the store cookie - String, Number, or Boolean - ( converted toString() via concatenation )
* expires: Number of days to expire in or date of expiration if Date object - Number or Date Object
* path: The path for the cookie - String
* domain: The domain for the cookie - String
* secure: Should the cookie be secure (served only over https) - Boolean


## percentOfTheTime Module Methods
There are three methods for the percentOfTheTime module variable- init(), config(), destroy().

### percentOfTheTime.init(configObj);
Extends the Number object with .percentOfTheTime() method.
###### Arguments: <br>
        configObj - (Optional) Extends the module options variable during init (example 2.js)
                
### percentOfTheTime.config(configObj);
Sets options for the module
###### Arguments: <br>
        configObj - Object with properties to extends the module options variable
#### Example - Set defaults
The example below shows all config options and their defaults.  Running the code will set all options to defaults.  You can also reset to defaults by calling percentOfTheTime.destroy() and percentOfTheTime.init()  (example 4).
 
```js
var defaults = {
    // Cookie name & value to set
    cookieName: 'percentOfTheTime',
    cookieValue: true,
    // Days to expire
    expires: 30,
    // root default path
    path: '/',
    // Cookie domain defaults to document if not set
    domain: '',
    // Secure cookie - only https
    secure: false
};

percentOfTheTime.config(defaults);
```

### percentOfTheTime.destroy();
Reset the module config to defaults & remove percentOfTheTime from Number.prototype

## License 
percentOfTheTime.js is released under the MIT license <br>
[www.opensource.org/licenses/MIT](www.opensource.org/licenses/MIT)

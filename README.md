# percentOfTheTime.js</h1>

## Installation
1. Include the source script in your html

```html
    <script src="/js/percentOfTheTime.min.js"></script>
```


2. Initialize the percentOfTheTime module

```html
    <script>
        percentOfTheTime.init();
    </script>
```


## Useage
Call percentOfTheTime on a string and pass a callback function. <br>
    Optionally an object containing true and false properties that are functions can passed instead.
    The corresponding function will be executed depending on the random and cookie tests

#### Example
The example callback will run 10% of the time the function is run.
Once the callback is run a cookie is stored so that it does not run again.

```js
'10'.percentOfTheTime(function{
    console.log('Run 10%');
});
```


## Module Methods
There are three methods for the percentOfTheTime variable- init(), config(), destroy().

### percentOfTheTime.init(configObj);
Extends the String object with .percentOfTheTime() method.
###### Arguments: <br>
        configObj - (Optional) Extends the module options variable during init (example 2.js)
                
### percentOfTheTime.config(configObj);
Sets options for the module
###### Arguments: <br>
        configObj - Object with properties to extends the module options variable
#### Example - Set current defaults
The example below shows config options and their defaults.  Running the code will set all options to defaults.  You can also reset to defaults by calling percentOfTheTime.destroy() and percentOfTheTime.init()  (example 4).
 
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
Reset the module config & remove percentOfTheTime from String.prototype

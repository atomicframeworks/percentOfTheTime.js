# percentOfTheTime.js</h1>

## Installation
1. Include the source script on the page

```html
    <script src="/js/percentOfTheTime.min.js"></script>
```


2. initialize the percentOfTheTime module

```js
percentOfTheTime.init();
```


## Useage
Call percentOfTheTime on a string and pass a callback function.
    Optionally an object containing true and false properties that are functions can passed instead.
    The corresponding function will be executed depending on the random and cookie tests

### Example
The example callback will run 10% of the time the function is run.
Once the callback is run a cookie is stored so that it does not run again.

```js
'10'.percentOfTheTime(function{
    console.log('Run 10%');
});
```


## Module Methods
There are three methods for the percentOfTheTime variable

### Init Method

percentOfTheTime.init() - Extends the String object with a .percentOfTheTime() method.
    Arguments:
        configObj - Extends the module options variable <br>
        
        
### Config Method

percentOfTheTime.config(configObj) - Sets options for the module
    Arguments:
        configObj - Object with properties to extends the module options variable


### Destroy Method

percentOfTheTime.destroy() - Reset the module config & remove percentOfTheTime from String.prototype

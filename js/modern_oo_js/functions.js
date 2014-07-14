/*
 * Converts arguments to string.
 * Usage:
 * argsToString(1, null, "imba") => "1, null, imba"
 * */
function argsToString() {
    var s = '';
    for(var i= 0;i<arguments.length;i++){
        s += arguments[i] + (i==arguments.length-1?'':', ');
    }
    return s;
}

function argsToStringExampleUsage() {
  var result = argsToString(1, 'qq', [], 997); // => "1, qq, Object[], 997"
  console.log(result);
}
//argsToStringExampleUsage();

/*
 * Returns an Array instance containing all arguments passed to function
 * Usage:
 * argsToArray(1, null, "imba") => [1, null, "imba"]
 * */
function argsToArray() {
}

/*
 * Calls function passed as first parameter fn, with every other param passed to it
 * Usage:
 * callWithArgs(myFunction, 1, "xxx") => myFunction(1, "xxx")
 * callWithArgs(myFunction, [], "a", 123) => myFunction([], "a", 123)
 * */
function callWithArgs(fn) {

}

function callWithArgsExampleUsage() {
  var myFunction = function() {
    console.log(arguments);
  };

  myFunction(1, "qq", []);
  callWithArgs(myFunction, 1, "qq", []); // => 1, "qq", []
}
//callWithArgsExampleUsage();

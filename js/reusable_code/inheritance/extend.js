function extend(BaseClass, prototypeMethods) {

    var c = prototypeMethods.hasOwnProperty('constructor') ? prototypeMethods.constructor : function () {
    };

    var NewClass = c;

    if (BaseClass) {
        NewClass.prototype = new BaseClass();
        NewClass.prototype.super = function (name, args) {
            var superFn = BaseClass.prototype[name];
            var val = superFn.apply(this, args);
            return val;
        };
    }
    NewClass.prototype.constructor = c;

    //do not use
//    for (var prop1 in BaseClass) {
////        debugger;
//        if (prop != 'constructor')
//            NewClass.prototype[prop1] = BaseClass[prop1];
//    }


    for (var prop in prototypeMethods) {
        NewClass.prototype[prop] = prototypeMethods[prop];
    }

    return NewClass;
}


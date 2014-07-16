Motorola.mixin = function mixin(destination, source) {
    var afterMixed = 'afterMixed';

    for (var prop in source) {
        if (prop != afterMixed)
            destination[prop] = source[prop];
    }
    if (source.hasOwnProperty(afterMixed)) {
        source[afterMixed].apply(destination);
    }
}

Motorola.Evented = (function () {

    function on(eventName, listenerFn) {
        if (!this.events[eventName])
            this.events[eventName] = [];
        this.events[eventName].push(listenerFn);
    }

    function trigger(eventName, args) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                this.events[eventName][i].apply(this, args);
            }
        }
    }

    function off(eventName) {
        if (this.events[eventName])
            delete this.events[eventName]
    }

    return {
        on: on,
        trigger: trigger,
        off: off,
        afterMixed: function () {
            this.events = {};
        }
    }

})();

// var timeoutId = setTimeout(fn, delay);
// clearTimeout(timeoutId);

// var intervalId = setInterval(fn, delay);
// clearInterval(intervalId);
// reuse modules: mixin, Evented

Motorola.Timer = (function (Evented, mixin) {

    function timer(params) {
        this.duration = params.duration * 1000 || 0;
        this.step = params.step ? params.step * 1000 : 1000;
        this.currentStep = 0;
    }

    mixin(timer.prototype, Evented);

    //'start", "pause", "tick", "end"
    timer.prototype.start = function () {
        this.trigger('start', [this.currentStep]);
        var that = this;

        this.intervalId = setInterval(function () {
            that.trigger('tick', [ ++that.currentStep]);
        }, this.step);

        this.timeoutId = setTimeout(function () {
            that.trigger('end', [that.currentStep]);
            clearInterval(that.intervalId);
        }, this.duration - (this.currentStep * this.step));
    };

    timer.prototype.pause = function () {
        this.trigger('pause', [this.currentStep]);
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
    };

    return timer;
})(Motorola.Evented, Motorola.mixin);

function timerExampleUsage(Timer) {
    var params = {
        duration: 20, // in sec, default: Infinity
        step: 2 // in sec, default: 1
    };
    var timer = new Timer(params);

    // on(eventName, listener) - assigns listener to given eventName ("start", "pause", "tick", "end")
    // triggered when timer is started
    timer.on("start", function (currentStep) {
        console.log("started at: " + currentStep);
    });

    // triggered when timer finishes or has been stopped
    timer.on("end", function (currentStep) {
        console.log("ended at: " + currentStep);
    });

    // triggered when timer is paused
    timer.on("pause", function (currentStep) {
        console.log("paused at: " + currentStep);
    });

    // triggers every step seconds
    timer.on("tick", function (currentStep) {
        console.log("current time: " + currentStep);
    });

    // start() - starts timer
    timer.start();

    //pause() - pauses timer
    setTimeout(function () {
        timer.pause();

        setTimeout(function () {
            timer.start(); // resumes timer
        }, 3000);
    }, 5000);


//
//  // stop() - stops timer
//  setTimeout(function() {
//    timer.stop();
//  }, 14000);
//
//  // start again from currentStep == 0
//  setTimeout(function() {
//    timer.start();
//  }, 19000);
}
console.log('timerExampleUsage');
timerExampleUsage(Motorola.Timer);
console.log('//timerExampleUsage');
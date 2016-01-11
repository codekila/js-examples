/*
    events and setInterval exercise
 */

var events = require("events");

class MyEvent extends events.EventEmitter {
    private intervalObj;
    // start firing every 500ms
    fire(str:string) {
        var count = 0;
        var self = this;

        this.intervalObj = setInterval(function(){
            self.emit('shoot', count++);
        }, 500);
        self.emit('started', str);
    }
    // stop firing
    stop() {
        if (this.intervalObj) {
            clearInterval(this.intervalObj);
            this.intervalObj = null;
        }
        this.emit("stopped");
    }

    constructor() {
        super();
        this.intervalObj = null;
    }
}

var ev = new MyEvent();

ev.on("started", function(arg) {
  console.log("start firing " + arg);
});

ev.on("shoot", function(arg){
    console.log("shooting: " + arg);
});

ev.on("stopped", function(){
    console.log("stopped");
});

// go firing
ev.fire("bad guy");

// stop it after 3.x sec
setTimeout(function() {
    ev.stop();
    }, 3100
);
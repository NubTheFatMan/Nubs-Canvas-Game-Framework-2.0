/*

    Nub's Canvas 2D Game Framework

*/

"use strict";

// Some basic functions
class Vector {
    constructor (x = 0, y = x) {
        if (typeof x !== "number") throw new Error("Vector: bad argument #1: expected a number, got " + typeof x);
        if (typeof y !== "number") y = x;
        this[0] = x;
        this[1] = y;
        this.length = 2; // Allow for looping, if necessary
    }
    get x() {return this[0];}
    get y() {return this[1];}

    get w() {return this[0];}
    get h() {return this[1];}

    set x(x) {
        if (typeof x !== "number") throw new Error("The x position must be a number.");
        this[0] = x;
    }
    set y(y) {
        if (typeof y !== "number") throw new Error("The y position must be a number.");
        this[0] = y;
    }
    set w(w) {
        if (typeof w !== "number") throw new Error("The width must be a number.");
        this[0] = w;
    }
    set h(h) {
        if (typeof h !== "number") throw new Error("The height must be a number.");
        this[0] = h;
    }

    set(x, y = x) {
        if (typeof x === "number") this[0] = x;
        if (typeof y === "number") this[1] = y;
    }
}

class Color {
    constructor (r = 0, g = r, b = r, a = 255) {
        if (typeof r !== "number") throw new Error("Color: bad argument #1: expected a number, got " + typeof r);
        if (typeof g !== "number") g = r;
        if (typeof b !== "number") b = r;
        if (typeof a !== "number") a = 255;
        this[0] = r;
        this[1] = g;
        this[2] = b;
        this[3] = a;
        this.length = 4; // Allow looping if necessary
    }
    get r() {return this[0];}
    get g() {return this[1];}
    get b() {return this[2];}
    get a() {return this[3];}
    get rgba() {return "rgba(" + [this[0], this[1], this[2], this[3]].join(',') + ")";}
    get rgb()  {return "rgb(" + [this[0], this[1], this[2]].join(',') + ")";}

    get hex()  {
        let r = this[0].toString(16);
        let g = this[1].toString(16);
        let b = this[2].toString(16);
        let a = this[3].toString(16);

        if (r.length === 1) r = "0" + r;
        if (g.length === 1) g = "0" + g;
        if (b.length === 1) b = "0" + b;
        if (a.length === 1) a = "0" + a;

        return "#" + r + g + b + a;
    }

    set r(r) {
        if (typeof r !== "number") throw new Error("The value of red must be a number.");
        this[0] = r;
    };
    set g(g) {
        if (typeof g !== "number") throw new Error("The value of green must be a number.");
        this[1] = g;
    };
    set b(b) {
        if (typeof b !== "number") throw new Error("The value of blue must be a number.");
        this[2] = b;
    };
    set a(a) {
        if (typeof a !== "number") throw new Error("The value of alpha must be a number.");
        this[3] = a;
    };

    set hex(hex) {
        if (typeof hex !== "string") throw new Error("The value of your input hex must be a string.");
        hex = hex.replace(/#/g, '');

        switch (hex.length) {
            // #rgb(a)
            case 3: case 4: {
                this[0] = parseInt(hex[0] + hex[0], 16);
                this[1] = parseInt(hex[1] + hex[1], 16);
                this[2] = parseInt(hex[2] + hex[2], 16);
                if (hex[3]) this[3] = parseInt(hex[3] + hex[3], 16);
            } break;

            // #rrggbb(aa)
            case 6: case 8: {
                this[0] = parseInt(hex.substring(0, 2), 16);
                this[1] = parseInt(hex.substring(2, 4), 16);
                this[2] = parseInt(hex.substring(4, 6), 16);
                if (hex[7]) this[3] = parseInt(hex.substring(6, 8), 16);
            } break;

            default: {
                throw new Error("Invalid hexadecimal specified.");
            } break;
        }
    }

    set (r, g = r, b = r, a) {
        if (typeof r === "number") this[0] = r;
        if (typeof g === "number") this[1] = g;
        if (typeof b === "number") this[2] = b;
        if (typeof a === "number") this[3] = a;
    }
}

function inrange(point, start, end) {
    if (!(point instanceof Vector)) throw new Error("inrange: bad argument #1: expected a Vector, got " + typeof point);
    if (!(start instanceof Vector)) throw new Error("inrange: bad argument #2: expected a Vector, got " + typeof start);
    if (!(end instanceof Vector))   throw new Error("inrange: bad argument #3: expected a Vector, got " + typeof end);

    return (point[0] >= start[0] && point[0] <= start[0] + end[0]) && (point[1] >= start[1] && point[1] <= start[1] + end[1]);
}

// A table that contains all of the essential framework variables
let ngf = {};

ngf.entities = new Map(); // Map of all objects
ngf.animations = new Map(); // Map of all running animations
ngf.mouse = {pos: new Vector(-1), down: false}; // Tracks the mouse for user input
ngf.canvas = null; // The canvas the mouse is tracked to
ngf.context = null; // What this framework draws to
ngf.fps = 0; // 0 is as many frames as possible. Any higher number is the actual FPS
ngf.tickRate = 66; // How many times an entity "thinks" every second


// Now functions and classes that require the variables above
ngf.mouse.hovering = function(obj) {
    if (!(obj instanceof Entity)) throw new Error("ngf.mouse.hovering: bad argument #1: expected an entity, got " + typeof obj);
    if (!obj.pos)                 throw new Error("ngf.mouse.hovering: bad argument #1: invalid entity supplied, has no position.");
    if (!obj.size)                throw new Error("ngf.mouse.hovering: bad argument #1: invalid entity supplied, has no size.");

    return inrange(ngf.mouse.pos, obj.pos, obj.size);
}

function setCanvas(id) {
    let canvas = document.getElementById(id);
    if (!canvas) throw new Error("setCanvas: bad argument #1: expected an object ID, but didn't get a valid one.");
    
    ngf.canvas = canvas;

    // Keep track of the mouse position for hover detection
    ngf.canvas.onmousemove = function(e) {
        let rect = this.getBoundingClientRect();
        ngf.mouse.pos[0] = (e.clientX - rect.x) / rect.width * this.width;
        ngf.mouse.pos[1] = (e.clientY - rect.y) / rect.height * this.height;
    }

    // Keep track of whether or not the mouse is clicked
    ngf.canvas.onmousedown = function() {
        ngf.mouse.down = true;
    }
    ngf.canvas.onmouseup = function() {
        ngf.mouse.down = false;
    }

    // Reset values if the mouse isn't even on the canvas
    ngf.canvas.onmouseout = function() {
        ngf.mouse.down = false;
        ngf.mouse.pos.set(-1);
    }

    ngf.context = canvas.getContext("2d");
    ngf.context.font = "16px Arial";
    ngf.context.fillStyle = "rgb(255, 255, 255)";
    ngf.context.strokeStyle = "rgb(255, 255, 255)";
    ngf.context.imageSmoothingEnabled = false;
    ngf.context.lineWidth = 1;
}

/*

    Entity tree:
    Entity
        Graphic
            Box
                Button
                CheckBox
                TextEntry
                Img
                    SpriteSheet
            Text
            Circle
            Poly
            Line
        Animation
        NPC
        PlayerController

*/

class Entity {
    constructor () {
        this.id = ngf.entities.size;
        ngf.entities.set(this.id, this);
    }
}

class Graphic extends Entity {
    constructor (data) {
        super();
        this.pos = new Vector(0);
        this.color = new Color(255);
        this.visible = true;
        this.enabled = true;

        // Copy data to this
        Object.assign(this, data);

        // Internal properties that cannot be overriden with data
        this._isDown = false;
        this._isHovered = false;
        this._downStart = 0;
        this._hoverStart = 0;
    }

    think() {
        // Check if the mouse is hovering this entity. If so, we want to do hover and click events
        if (ngf.mouse.hovering(this)) {
            // Since we are hovering, check if we're hovering and run .onHoverStart()
            if (!this._isHovered) {
                this._isHovered = true;
                this._hoverStart = Date.now();
                if (this.onHoverStart instanceof Function) this.onHoverStart();
            }
            // This runs ever tick, with the time it's been hovered
            if (this.whileHovered instanceof Function) this.whileHovered(Date.now() - this._hoverStart);

            // Check if the mouse is clicked. If so, we want to do click events
            if (ngf.mouse.down) {
                // Since the mouse is clicked, run the .onMouseDown() event
                if (!this._isDown) {
                    this._isDown = true;
                    this._downStart = Date.now();
                    if (this.onMouseDown instanceof Function) this.onMouseDown();
                }
                // This is used for click and hold events
                if (this.whileMouseDown instanceof Function) this.whileMouseDown(Date.now() - this._downStart);
            } else { // The mouse is not clicked
                // Since the mouse is not clicked, check if it was just released
                if (this._isDown && this.onMouseUp instanceof Function) this.onMouseUp();
                this._isDown = false;
                this._downStart = 0;
            }
        } else { // Mouse is no longer hovering this entity
            // Since the mouse isn't even on the object anymore, we want to stop all calls
            if (this._isHovered && this.onHoverStop instanceof Function) this.onHoverStop();
            if (this._isDown    && this.onMouseUp   instanceof Function) this.onMouseUp();
            
            this._isHovered = false;
            this._hoverStart = 0

            this._isDown = false;
            this._downStart = 0;
        }
    }
}

class Box extends Graphic {
    constructor (data) {
        super(data);

        if (!(this.size instanceof Vector)) this.size = new Vector(16);
        if (typeof this.cornerRadius !== "number") this.cornerRadius = 0;
    }
    
    draw() {
        ngf.context.fillStyle = this.color.rgba;
        if (this.cornerRadius === 0) {
            ngf.context.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
        } else {
            let [x, y, w, h] = [this.pos[0], this.pos[1], this.size[0], this.size[1]];
            ngf.context.beginPath();
            ngf.context.moveTo(x, y + this.cornerRadius);
            ngf.context.lineTo(x, y + h - this.cornerRadius);
            ngf.context.arcTo (x, y + h, x + this.cornerRadius, y + h, this.cornerRadius);
            ngf.context.lineTo(x + w - this.cornerRadius, y + h);
            ngf.context.arcTo (x + w, y + h, x + w, y + h - this.cornerRadius, this.cornerRadius);
            ngf.context.lineTo(x + w, y + this.cornerRadius);
            ngf.context.arcTo (x + w, y, x + w - this.cornerRadius, y, this.cornerRadius);
            ngf.context.lineTo(x + this.cornerRadius, y);
            ngf.context.arcTo (x, y, x, y + this.cornerRadius, this.cornerRadius);
            ngf.context.fill();
            ngf.context.closePath();
        }
    }
}


// Rendering
function drawFrame() {
    if (ngf.context) { // We can only render if there is a context, however we don't want to error if it's not set
        ngf.context.clearRect(0, 0, ngf.canvas.width, ngf.canvas.height);
        
        // Loop through all entities and call .draw
        ngf.entities.forEach((ent, id, map) => {
            if (ent instanceof Graphic) { // Only draw if it's a graphic entity
                if (ent.visible && ent.draw instanceof Function) ent.draw();
            }
        });
    }

    // Start the next frame
    if (ngf.fps > 0) {
        setTimeout(() => {
            requestAnimationFrame(drawFrame);
        }, Math.round(1000/ngf.fps));
    } else requestAnimationFrame(drawFrame);
}
requestAnimationFrame(drawFrame);

// Thinking/Ticking
function tick() {
    // Update all entities
    ngf.entities.forEach((ent, id, map) => {
        if (ent instanceof Entity) {
            if (ent.enabled && ent.think instanceof Function) ent.think();
        }
    });

    setTimeout(tick, Math.round(1000/ngf.tickRate));
    // console.log(ngf.mouse.pos);
}
tick();
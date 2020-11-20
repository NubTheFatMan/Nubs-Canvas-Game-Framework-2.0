/*

    Nub's Canvas 2D Game Framework
    Developed by Nub#0002 (Discord)

*/

"use strict";

// Some basic functions

// lerp, Linear Interpolation
// -> Used for transitions, used in animations.
//      Number x: the start number
//      Number y: the end number
//      Number p: the progress %; should be a number between 0 and 1
// -> Returns a boolean
function lerp(x, y, p) {
    if (typeof x !== "number") throw new Error("lerp: bad argument #1: expected a number, got " + typeof x);
    if (typeof y !== "number") throw new Error("lerp: bad argument #2: expected a number, got " + typeof y);
    if (typeof p !== "number") throw new Error("lerp: bad argument #3: expected a number, got " + typeof p);
    return x + p * (y - x);
}

// Vectors, used for positions and sizes. 
// Since the usage would be a bit lengthy, please see https://github.com/that1nub/Nubs-Canvas-Game-Framework-2.0/wiki/Class:-Vector
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

    get copy() {
        return new this(this[0], this[1]);
    }

    static add(a, b) {
        if (!(a instanceof Vector)) throw new Error("Vector.add: bad argument #1: Expected a Vector, got " + typeof a);
        if (!(b instanceof Vector)) throw new Error("Vector.add: bad argument #2: Expected a Vector, got " + typeof b);
        return new this(a[0] + b[0], a[1] + b[1]);
    }
    add(a) {
        if (!(a instanceof Vector)) throw new Error("Vector.add: bad argument #1: Expected a Vector, got " + typeof a);
        this[0] += a[0];
        this[1] += a[1];
    }

    static sub(a, b) {
        if (!(a instanceof Vector)) throw new Error("Vector.sub: bad argument #1: Expected a Vector, got " + typeof a);
        if (!(b instanceof Vector)) throw new Error("Vector.sub: bad argument #2: Expected a Vector, got " + typeof b);
        return new this(a[0] - b[0], a[1] - b[1]);
    }
    sub(a) {
        if (!(a instanceof Vector)) throw new Error("Vector.sub: bad argument #1: Expected a Vector, got " + typeof a);
        this[0] -= a[0];
        this[1] -= a[1];
    }
    
    static mult(a, b) {
        if (!(a instanceof Vector)) throw new Error("Vector.mult: bad argument #1: Expected a Vector, got " + typeof a);
        if (!(b instanceof Vector)) throw new Error("Vector.mult: bad argument #2: Expected a Vector, got " + typeof b);
        return new this(a[0] * b[0], a[1] * b[1]);
    }
    mult(a) {
        if (!(a instanceof Vector)) throw new Error("Vector.mult: bad argument #1: Expected a Vector, got " + typeof a);
        this[0] *= a[0];
        this[1] *= a[1];
    }

    static div(a, b) {
        if (!(a instanceof Vector)) throw new Error("Vector.div: bad argument #1: Expected a Vector, got " + typeof a);
        if (!(b instanceof Vector)) throw new Error("Vector.div: bad argument #2: Expected a Vector, got " + typeof b);
        return new this(a[0] / b[0], a[1] / b[1]);
    }
    div(a) {
        if (!(a instanceof Vector)) throw new Error("Vector.div: bad argument #1: Expected a Vector, got " + typeof a);
        this[0] /= a[0];
        this[1] /= a[1];
    }

    static distance(a, b) {
        if (!(a instanceof Vector)) throw new Error("Vector.distance: bad argument #1: Expected a Vector, got " + typeof a);
        if (!(b instanceof Vector)) throw new Error("Vector.distance: bad argument #2: Expected a Vector, got " + typeof b);
        let x = a[0] - b[0];
        let y = a[1] - b[1];
        return Math.sqrt(x*x + y*y);
    }

    get magnitude() {
        return Vector.distance(new Vector(), this);
    }

    dot(a) {
        if (!(a instanceof Vector)) throw new Error("Vector.dot: bad argument #1: Expected a Vector, got " + typeof a);
        return this[0] * a[0] + this[1] * a[1];
    }

    static lerp(a, b, p) {
        if (!(a instanceof Vector)) throw new Error("Vector.lerp: bad argument #1: Expected a Vector, got " + typeof a);
        if (!(b instanceof Vector)) throw new Error("Vector.lerp: bad argument #2: Expected a Vector, got " + typeof b);
        if (typeof p !== "number")  throw new Error("Vector.lerp: Bad argument #3: Expected a number, got " + typeof p);

        return new this(lerp(a[0], b[0], p), lerp(a[1], b[1], p));
    }

    static rotate(a, angle, origin) {
        if (!(a instanceof Vector)) throw new Error("Vector.lerp: bad argument #1: Expected a Vector, got " + typeof a);
        if (typeof angle !== "number")   throw new Error("Vector.rotate: bad argument #2: Expected a number, got " + typeof angle);
        let rad = (Math.PI / 180) * angle;
        let cos = Math.cos(rad);
        let sin = Math.sin(rad);

        if (origin instanceof Vector) {
            let x = (cos * (a[0] - origin[0])) + (sin * (a[1] - origin[1])) + origin[0]; 
            let y = (cos * (a[1] - origin[1])) - (sin * (a[0] - origin[0])) + origin[1];
            return new this(x, y);
        } else {
            let x = (cos * a[0]) + (sin * a[1]); 
            let y = (cos * a[1]) - (sin * a[0]);
            return new this(x, y);
        }
    }
    rotate(angle, origin) {
        if (typeof angle !== "number")   throw new Error("Vector.rotate: bad argument #1: Expected a number, got " + typeof angle);
        let rad = (Math.PI / 180) * angle;
        let cos = Math.cos(rad);
        let sin = Math.sin(rad);

        if (origin instanceof Vector) {
            this[0] = (cos * (this[0] - origin[0])) + (sin * (this[1] - origin[1])) + origin[0]; 
            this[1] = (cos * (this[1] - origin[1])) - (sin * (this[0] - origin[0])) + origin[1];
        } else {
            //         cos * x        +  sin * y 
            this[0] = (cos * this[0]) + (sin * this[1]); 
            //         cos * y        -  sin * x
            this[1] = (cos * this[1]) - (sin * this[0]);
        }
    }
}

// Colors, used for coloring entities.
// Since the usage would be a bit length, please see [not yet created]
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

    static add(a, b) {
        if (!(a instanceof Color)) throw new Error("Color.add: bad argument #1: Expected a Color, got " + typeof a);
        if (!(b instanceof Color)) throw new Error("Color.add: bad argument #2: Expected a Color, got " + typeof b);
        return new this(a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3]);
    }
    add(a) {
        if (!(a instanceof Color)) throw new Error("Color.add: bad argument #1: Expected a Color, got " + typeof a);
        this[0] += a[0];
        this[1] += a[1];
        this[2] += a[2];
    }

    static sub(a, b) {
        if (!(a instanceof Color)) throw new Error("Color.sub: bad argument #1: Expected a Color, got " + typeof a);
        if (!(b instanceof Color)) throw new Error("Color.sub: bad argument #2: Expected a Color, got " + typeof b);
        return new this(a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3]);
    }
    sub(a) {
        if (!(a instanceof Color)) throw new Error("Color.sub: bad argument #1: Expected a Color, got " + typeof a);
        this[0] -= a[0];
        this[1] -= a[1];
        this[2] -= a[2];
    }
    
    static mult(a, b) {
        if (!(a instanceof Color)) throw new Error("Color.mult: bad argument #1: Expected a Color, got " + typeof a);
        if (!(b instanceof Color)) throw new Error("Color.mult: bad argument #2: Expected a Color, got " + typeof b);
        return new this(a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3]);
    }
    mult(a) {
        if (!(a instanceof Color)) throw new Error("Color.mult: bad argument #1: Expected a Color, got " + typeof a);
        this[0] *= a[0];
        this[1] *= a[1];
        this[2] *= a[2];
    }

    static div(a, b) {
        if (!(a instanceof Color)) throw new Error("Color.div: bad argument #1: Expected a Color, got " + typeof a);
        if (!(b instanceof Color)) throw new Error("Color.div: bad argument #2: Expected a Color, got " + typeof b);
        return new this(a[0] / b[0], a[1] / b[1], a[2] / b[2], a[3]);
    }
    div(a) {
        if (!(a instanceof Color)) throw new Error("Color.div: bad argument #1: Expected a Color, got " + typeof a);
        this[0] /= a[0];
        this[1] /= a[1];
        this[2] /= a[2];
    }
}

// inrange(point, start, end)
// -> Check if the point is within the bounds of start and end
//      Vector point: the point we want to check the position of
//      Vector start: the upper left corner of the box we are checking for the point to be in
//      Vector end: the lower right corner of the box we are checking for the point to be in
// -> Returns a boolean
function inrange(point, start, end) {
    if (!(point instanceof Vector)) throw new Error("inrange: bad argument #1: expected a Vector, got " + typeof point);
    if (!(start instanceof Vector)) throw new Error("inrange: bad argument #2: expected a Vector, got " + typeof start);
    if (!(end instanceof Vector))   throw new Error("inrange: bad argument #3: expected a Vector, got " + typeof end);

    return (point[0] >= start[0] && point[0] <= start[0] + end[0]) && (point[1] >= start[1] && point[1] <= start[1] + end[1]);
}

// A table that contains all of the essential framework variables
let ngf = {};

ngf.entities = new Map(); // Map of all objects
ngf.entCount = 0; // We could use ngf.entities.size, but if a random entity is deleted, new entities will be deleted, so we just store a count that doesn't decrement
ngf.animations = new Map(); // Map of all running animations
ngf.mouse = {pos: new Vector(-1), down: false}; // Tracks the mouse for user input
ngf.canvas = null; // The canvas the mouse is tracked to
ngf.context = null; // What this framework draws to
ngf.fps = 0; // 0 is as many frames as possible. Any higher number is the actual FPS
ngf.tickRate = 66; // How many times an entity "thinks" every second


// Now functions and classes that require the variables above

// 
ngf.mouse.hovering = function(obj) {
    if (!(obj instanceof Entity)) throw new Error("ngf.mouse.hovering: bad argument #1: expected an entity, got " + typeof obj);
    if (!obj.pos)                 throw new Error("ngf.mouse.hovering: bad argument #1: invalid entity supplied, has no position.");
    if (!obj.size)                throw new Error("ngf.mouse.hovering: bad argument #1: invalid entity supplied, has no size.");

    return inrange(ngf.mouse.pos, obj.pos, obj.size);
}

function setCanvas(id) {
    // Find the HTML element with this ID, or error if it can't find one
    let canvas = document.getElementById(id);
    if (!canvas) throw new Error("setCanvas: bad argument #1: expected an element ID, but didn't find a valid element.");
    
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

    // Default context stuff
    ngf.context = canvas.getContext("2d");
    ngf.context.font = "16px Arial";
    ngf.context.fillStyle = "rgb(255,255,255)";
    ngf.context.strokeStyle = "rgb(255,255,255)";
    ngf.context.imageSmoothingEnabled = false;
    ngf.context.lineWidth = 1;
}

/*

    Tree:
    Note: - means it's been started, ✓ means that it and all of it's sub-items are complete

    - Entity
        - Graphic
            - Box
                ✓ Button
                CheckBox
                TextEntry
                - Img
                    SpriteSheet
            ✓ Text
            ✓ Circle
            ✓ Line
            ✓ Poly
        Animation
        NPC
        PlayerController

*/

// For a complete documentation of all the classes below, see [not yet created]

class Entity {
    constructor () {
        this.id = ngf.entCount++;
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
        if (this.pos instanceof Vector && this.size instanceof Vector && ngf.mouse.hovering(this)) {
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

        // If the corner radius is 0, we don't need to waste time tracing a path and just fill a rectangle
        if (this.cornerRadius === 0) {
            ngf.context.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
        } else {
            let [x, y, w, h] = [this.pos[0], this.pos[1], this.size[0], this.size[1]];
            ngf.context.beginPath();
            ngf.context.moveTo(x, y + this.cornerRadius);                                          // Move to the top left corner
            ngf.context.lineTo(x, y + h - this.cornerRadius);                                      // Trace a line to the bottom left corner
            ngf.context.arcTo (x, y + h, x + this.cornerRadius, y + h, this.cornerRadius);         // Arc around the bottom left corner
            ngf.context.lineTo(x + w - this.cornerRadius, y + h);                                  // Trace a line to the bottom right corner
            ngf.context.arcTo (x + w, y + h, x + w, y + h - this.cornerRadius, this.cornerRadius); // Arc around the bottom right corner
            ngf.context.lineTo(x + w, y + this.cornerRadius);                                      // Trace a line to the top right corner
            ngf.context.arcTo (x + w, y, x + w - this.cornerRadius, y, this.cornerRadius);         // Arc around the top right corner
            ngf.context.lineTo(x + this.cornerRadius, y);                                          // Trace back to the top left corner
            ngf.context.arcTo (x, y, x, y + this.cornerRadius, this.cornerRadius);                 // Complete the arc corners
            ngf.context.fill();
            ngf.context.closePath();
        }
    }
}

class Button extends Box {
    constructor(data) {
        super(data);

        if (typeof this.text !== "string") this.text = "Lorem";
        if (typeof this.font !== "string") this.font = "16px Arial";
        if (!(this.textColor instanceof Color)) this.textColor = new Color();
    }
    draw() {
        super.draw();

        ngf.context.font = this.font;
        ngf.context.fillStyle = this.textColor.rgba;

        // For some reason, measureText only gets the width, so we have to calculate the height by checking the font for a number
        let w = ngf.context.measureText(this.text).width;
        let h = Number(ngf.context.font.match(/[0-9]+/g)[0]) || 0;

        ngf.context.fillText(this.text, this.pos[0] + (this.size[0]/2) - w/2, this.pos[1] + (this.size[1]/2) + h/3);
    }
}

class Img extends Box {
    constructor(data) {
        super(data);
    }

    set url(url) {
        if (typeof url !== "string") throw new Error("The URL you provide must be a string");
        let image = new Image();
        image.src = url;
        image.onload = () => {
            this._image = image;
        }
    }

    draw() {
        if (this._image) {
            ngf.context.drawImage(this._image, this.pos[0], this.pos[1], this.size[0], this.size[1]);
        }
    }
}

class Text extends Graphic {
    constructor(data) {
        super(data);

        if (typeof this.text !== "string") this.text = "Lorem";
        if (typeof this.font !== "string") this.font = "16px Arial";
        if (!(this.textColor instanceof Color)) this.textColor = new Color();
    }
    draw() {
        ngf.context.font = this.font;
        ngf.context.fillStyle = this.textColor.rgba;
        ngf.context.fillText(this.text, this.pos[0], this.pos[1] + Number(ngf.context.font.match(/[0-9]+/g)[0]));
    }
}

class Circle extends Graphic {
    constructor(data) {
        super(data);

        if (typeof this.radius !== "number") this.radius = 16;
    }
    draw() {
        ngf.context.fillStyle = this.color.rgba;
        ngf.context.beginPath();
        ngf.context.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);
        ngf.context.fill();
        ngf.context.closePath();
    }
}

class Line extends Graphic {
    constructor(data) {
        super(data);

        if (typeof this.start  !== "number") this.start  = new Vector(4);
        if (typeof this.end    !== "number") this.end    = new Vector(16);
        if (typeof this.weight !== "number") this.weight = 1;
    }
    draw() {
        ngf.context.strokeStyle = this.color.rgba;
        ngf.context.lineWidth = this.weight;

        ngf.context.beginPath();
        ngf.context.moveTo(this.start[0], this.start[1]);
        ngf.context.lineTo(this.end[0], this.end[1]);
        ngf.context.stroke();
        ngf.context.closePath();
    }
}

class Poly extends Graphic {
    constructor(data) {
        super(data);

        if (!(this.points instanceof Array)) this.points = [new Vector(4), new Vector(16), new Vector(4, 16)];
    }
    draw() {
        ngf.context.fillStyle = this.color.rgba;
        
        ngf.context.beginPath();
        let drawn = 0;
        for (let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            if (point instanceof Vector) {
                drawn++;
                if (drawn === 1) {
                    ngf.context.moveTo(point[0], point[1]);
                } else {
                    ngf.context.lineTo(point[0], point[1]);
                }
            }
        }
        ngf.context.fill();
        ngf.context.closePath();
    }
}


// Rendering
function drawFrame() {
    if (ngf.context) { // We can only render if there is a context, however we don't want to error if it's not set
        ngf.context.clearRect(0, 0, ngf.canvas.width, ngf.canvas.height);
        
        // Ensure the background is black
        ngf.context.fillStyle = "rgb(0,0,0)";
        ngf.context.fillRect(0, 0, ngf.canvas.width, ngf.canvas.height);


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
}
tick();
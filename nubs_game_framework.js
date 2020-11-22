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

    get array() {return [this[0], this[1]];}
    get object() {return {x: this[0], y: this[1]};}

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

function hexToRGBA(hex) {
    if (typeof hex !== "string") throw new Error("The value of your input hex must be a string.");
    hex = hex.replace(/#/g, '');

    let out = [];

    switch (hex.length) {
        // #rgb(a)
        case 3: case 4: {
            out.push(parseInt(hex[0] + hex[0], 16));
            out.push(parseInt(hex[1] + hex[1], 16));
            out.push(parseInt(hex[2] + hex[2], 16));
            if (hex[3]) out.push(parseInt(hex[3] + hex[3], 16));
        } break;

        // #rrggbb(aa)
        case 6: case 8: {
            out.push(parseInt(hex.substring(0, 2), 16));
            out.push(parseInt(hex.substring(2, 4), 16));
            out.push(parseInt(hex.substring(4, 6), 16));
            if (hex[7]) out.push(parseInt(hex.substring(6, 8), 16));
        } break;

        default: {
            throw new Error("hexToRGBA: Bad argument #1: Invalid hexadecimal specified.");
        } break;
    }

    return out;
}

// Colors, used for coloring entities.
// Since the usage would be a bit length, please see [not yet created]
class Color {
    constructor (r = 0, g = r, b = r, a = 255) {
        let [red, green, blue, alpha] = [0, 0, 0, 255];
        switch (typeof r) {
            case "number":
                if (typeof g !== "number") throw new Error("Color: Bad argument #2: Expected a number, got " + typeof g);
                if (typeof b !== "number") throw new Error("Color: Bad argument #3: Expected a number, got " + typeof b);
                if (typeof a !== "number") throw new Error("Color: Bad argument #4: Expected a number, got " + typeof a);
                red   = r;
                green = g;
                blue  = b;
                alpha = a;
            break;

            case "string":
                let col = hexToRGBA(r);
                red   = col[0];
                green = col[1];
                blue  = col[2];
                if (col[3] !== undefined) alpha = col[3];
            break;

            default:
                throw new Error("Color: Bad argument #1: Expected a string or number, got " + typeof r);
            break;
        }
        this[0] = red;
        this[1] = green;
        this[2] = blue;
        this[3] = alpha;
        this.length = 4; // Allow looping if necessary
    }
    get r() {return this[0];}
    get g() {return this[1];}
    get b() {return this[2];}
    get a() {return this[3];}

    get red()   {return this[0];}
    get green() {return this[1];}
    get blue()  {return this[2];}
    get alpha() {return this[3];}

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

    get array() {return [this[0], this[1], this[2], this[3]];}
    get object() {return {r: this[0], g: this[1], b: this[2], a: this[3], red: this[0], green: this[1], blue: this[2], alpha: this[3]};}
    get copy() {return new this(this[0], this[1], this[2], this[3]);}

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

    set red(r)   {this.r = r;}
    set green(g) {this.g = g;}
    set blue(b)  {this.b = b;}
    set alpha(a) {this.a = a;}

    set hex(hex) {
        let col = hexToRGBA(hex);
        this[0] = col[0];
        this[1] = col[1];
        this[2] = col[2];
        if (col[3] !== undefined) this[3] = col[3];
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

    // I used a node script to generate this :^)
    static black = new this("#000000ff");
    static silver = new this("#c0c0c0ff");
    static gray = new this("#808080ff");
    static white = new this("#ffffffff");
    static maroon = new this("#800000ff");
    static red = new this("#ff0000ff");
    static purple = new this("#800080ff");
    static fuchsia = new this("#ff00ffff");
    static green = new this("#008000ff");
    static lime = new this("#00ff00ff");
    static olive = new this("#808000ff");
    static yellow = new this("#ffff00ff");
    static navy = new this("#000080ff");
    static blue = new this("#0000ffff");
    static teal = new this("#008080ff");
    static aqua = new this("#00ffffff");
    static orange = new this("#ffa500ff");
    static aliceblue = new this("#f0f8ffff");
    static antiquewhite = new this("#faebd7ff");
    static aquamarine = new this("#7fffd4ff");
    static azure = new this("#f0ffffff");
    static beige = new this("#f5f5dcff");
    static bisque = new this("#ffe4c4ff");
    static blanchedalmond = new this("#ffebcdff");
    static blueviolet = new this("#8a2be2ff");
    static brown = new this("#a52a2aff");
    static burlywood = new this("#deb887ff");
    static cadetblue = new this("#5f9ea0ff");
    static chartreuse = new this("#7fff00ff");
    static chocolate = new this("#d2691eff");
    static coral = new this("#ff7f50ff");
    static cornflowerblue = new this("#6495edff");
    static cornsilk = new this("#fff8dcff");
    static crimson = new this("#dc143cff");
    static cyan = new this("#00ffffff");
    static darkblue = new this("#00008bff");
    static darkcyan = new this("#008b8bff");
    static darkgoldenrod = new this("#b8860bff");
    static darkgray = new this("#a9a9a9ff");
    static darkgreen = new this("#006400ff");
    static darkgrey = new this("#a9a9a9ff");
    static darkkhaki = new this("#bdb76bff");
    static darkmagenta = new this("#8b008bff");
    static darkolivegreen = new this("#556b2fff");
    static darkorange = new this("#ff8c00ff");
    static darkorchid = new this("#9932ccff");
    static darkred = new this("#8b0000ff");
    static darksalmon = new this("#e9967aff");
    static darkseagreen = new this("#8fbc8fff");
    static darkslateblue = new this("#483d8bff");
    static darkslategray = new this("#2f4f4fff");
    static darkslategrey = new this("#2f4f4fff");
    static darkturquoise = new this("#00ced1ff");
    static darkviolet = new this("#9400d3ff");
    static deeppink = new this("#ff1493ff");
    static deepskyblue = new this("#00bfffff");
    static dimgray = new this("#696969ff");
    static dimgrey = new this("#696969ff");
    static dodgerblue = new this("#1e90ffff");
    static firebrick = new this("#b22222ff");
    static floralwhite = new this("#fffaf0ff");
    static forestgreen = new this("#228b22ff");
    static gainsboro = new this("#dcdcdcff");
    static ghostwhite = new this("#f8f8ffff");
    static gold = new this("#ffd700ff");
    static goldenrod = new this("#daa520ff");
    static greenyellow = new this("#adff2fff");
    static grey = new this("#808080ff");
    static honeydew = new this("#f0fff0ff");
    static hotpink = new this("#ff69b4ff");
    static indianred = new this("#cd5c5cff");
    static indigo = new this("#4b0082ff");
    static ivory = new this("#fffff0ff");
    static khaki = new this("#f0e68cff");
    static lavender = new this("#e6e6faff");
    static lavenderblush = new this("#fff0f5ff");
    static lawngreen = new this("#7cfc00ff");
    static lemonchiffon = new this("#fffacdff");
    static lightblue = new this("#add8e6ff");
    static lightcoral = new this("#f08080ff");
    static lightcyan = new this("#e0ffffff");
    static lightgoldenrodyellow = new this("#fafad2ff");
    static lightgray = new this("#d3d3d3ff");
    static lightgreen = new this("#90ee90ff");
    static lightgrey = new this("#d3d3d3ff");
    static lightpink = new this("#ffb6c1ff");
    static lightsalmon = new this("#ffa07aff");
    static lightseagreen = new this("#20b2aaff");
    static lightskyblue = new this("#87cefaff");
    static lightslategray = new this("#778899ff");
    static lightslategrey = new this("#778899ff");
    static lightsteelblue = new this("#b0c4deff");
    static lightyellow = new this("#ffffe0ff");
    static limegreen = new this("#32cd32ff");
    static linen = new this("#faf0e6ff");
    static magenta = new this("#ff00ffff");
    static mediumaquamarine = new this("#66cdaaff");
    static mediumblue = new this("#0000cdff");
    static mediumorchid = new this("#ba55d3ff");
    static mediumpurple = new this("#9370dbff");
    static mediumseagreen = new this("#3cb371ff");
    static mediumslateblue = new this("#7b68eeff");
    static mediumspringgreen = new this("#00fa9aff");
    static mediumturquoise = new this("#48d1ccff");
    static mediumvioletred = new this("#c71585ff");
    static midnightblue = new this("#191970ff");
    static mintcream = new this("#f5fffaff");
    static mistyrose = new this("#ffe4e1ff");
    static moccasin = new this("#ffe4b5ff");
    static navajowhite = new this("#ffdeadff");
    static oldlace = new this("#fdf5e6ff");
    static olivedrab = new this("#6b8e23ff");
    static orangered = new this("#ff4500ff");
    static orchid = new this("#da70d6ff");
    static palegoldenrod = new this("#eee8aaff");
    static palegreen = new this("#98fb98ff");
    static paleturquoise = new this("#afeeeeff");
    static palevioletred = new this("#db7093ff");
    static papayawhip = new this("#ffefd5ff");
    static peachpuff = new this("#ffdab9ff");
    static peru = new this("#cd853fff");
    static pink = new this("#ffc0cbff");
    static plum = new this("#dda0ddff");
    static powderblue = new this("#b0e0e6ff");
    static rosybrown = new this("#bc8f8fff");
    static royalblue = new this("#4169e1ff");
    static saddlebrown = new this("#8b4513ff");
    static salmon = new this("#fa8072ff");
    static sandybrown = new this("#f4a460ff");
    static seagreen = new this("#2e8b57ff");
    static seashell = new this("#fff5eeff");
    static sienna = new this("#a0522dff");
    static skyblue = new this("#87ceebff");
    static slateblue = new this("#6a5acdff");
    static slategray = new this("#708090ff");
    static slategrey = new this("#708090ff");
    static snow = new this("#fffafaff");
    static springgreen = new this("#00ff7fff");
    static steelblue = new this("#4682b4ff");
    static tan = new this("#d2b48cff");
    static thistle = new this("#d8bfd8ff");
    static tomato = new this("#ff6347ff");
    static turquoise = new this("#40e0d0ff");
    static violet = new this("#ee82eeff");
    static wheat = new this("#f5deb3ff");
    static whitesmoke = new this("#f5f5f5ff");
    static yellowgreen = new this("#9acd32ff");
    static rebeccapurple = new this("#663399ff");
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
                DropDownMenu
                TextEntry
                Slider
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
        this.enabled = true;
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
        this.drawFromOrigin = false;
        this.angle = 0;
        this.useRadians = false;

        // Copy data to this
        Object.assign(this, data);

        // Internal properties that cannot be overriden with data
        this._isDown = false;
        this._isHovered = false;
        this._downStart = 0;
        this._hoverStart = 0;
        this._angDeg = 0;
    }

    get angle() {
        if (this.useRadians) {
            return this._angDeg * Math.PI / 180;
        } else {
            return this._angDeg;
        }
    }
    set angle(a) {
        if (typeof a !== "number") throw new Error("The angle must be a number.");
        this._angDeg = a;
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
    
    draw(w, h) {
        ngf.context.fillStyle = this.color.rgba;

        // If the corner radius is 0, we don't need to waste time tracing a path and just fill a rectangle
        if (this.cornerRadius === 0) {
            ngf.context.fillRect(0, 0, w, w);
        } else {
            let [x, y] = [0, 0];
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
    draw(w, h) {
        super.draw(w, h);

        ngf.context.font = this.font;
        ngf.context.fillStyle = this.textColor.rgba;

        // For some reason, measureText only gets the width, so we have to calculate the height by checking the font for a number
        let wid = ngf.context.measureText(this.text).width;
        let hei = Number(ngf.context.font.match(/[0-9]+/g)[0]) || 0;

        ngf.context.fillText(this.text, (w/2) - wid/2, (h/2) + hei/3);
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

    draw(w, h) {
        if (this._image) {
            ngf.context.drawImage(this._image, 0, 0, w, h);
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
        ngf.context.fillText(this.text, 0, Number(ngf.context.font.match(/[0-9]+/g)[0]));
    }
}

class Circle extends Graphic {
    constructor(data) {
        super(data);

        if (typeof this.radius !== "number") this.radius = 16;
        this.drawFromOrigin = true;
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
        this.drawFromOrigin = true;
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

        if (!(this.points instanceof Array)) this.points = [];
        this.drawFromOrigin = true;
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


ngf.frameRenderTracking = 50; // The previous frame render times to keep track of
ngf.frameRenderIndex = -1; // Internal, the current index in the measurement array
ngf.frameRenderTime = []; // Cache of previous render times
ngf.averageFrameRenderTime = 0; // Calculated at the end of a frame render

for (let i = 0; i < ngf.frameRenderTracking; i++) {
    ngf.frameRenderTime.push(0);
}

// Rendering
function drawFrame() {
    let startTime = Date.now();
    if (ngf.context) { // We can only render if there is a context, however we don't want to error if it's not set
        ngf.context.clearRect(0, 0, ngf.canvas.width, ngf.canvas.height);
        
        // Ensure the background is black
        ngf.context.fillStyle = "rgb(0,0,0)";
        ngf.context.fillRect(0, 0, ngf.canvas.width, ngf.canvas.height);

        // Loop through all entities and call .draw
        ngf.entities.forEach((ent, id, map) => {
            if (ent instanceof Graphic) { // Only draw if it's a graphic entity
                if (ent.visible && ent.draw instanceof Function) {
                    let [w, h] = [0, 0];
                    if (ent.size instanceof Vector) {
                        [w, h] = [ent.size[0], ent.size[1]];
                    } else if (ent.radius) {
                        [w, h] = [ent.radius, ent.radius];
                    }

                    // Only transform the canvas if it's not drawing from 0, 0
                    let noDrawFromOrigin = (typeof ent.drawFromOrigin === "boolean" && !ent.drawFromOrigin);
                    if (noDrawFromOrigin) {
                        ngf.context.save();

                        // We want `Graphic.draw()` to be drawn from 0, 0
                        let [x, y] = [ent.pos[0], ent.pos[1]];

                        // Circles draw from the center
                        if (typeof ent.radius === "number") {
                            x -= ent.radius;
                            y -= ent.radius;
                        }
                        
                        if (x !== 0 || y !== 0) ngf.context.translate(x, y);
                        if (typeof ent.angle === "number" && ent.angle !== 0) ngf.context.rotate(ent.angle);

                        if (w > 0 && h > 0) {
                            ngf.context.rect(0, 0, w, h);
                            ngf.context.clip();
                        }
                    }

                    ent.draw(w, h);

                    // Reset the matrix if we didn't draw from origin
                    if (noDrawFromOrigin) ngf.context.restore();
                }
            }
        });
    }

    let endTime = Date.now();

    let deltaTime = endTime - startTime;
    ngf.frameRenderIndex++;
    ngf.frameRenderTime[ngf.frameRenderIndex] = deltaTime;

    if (ngf.frameRenderIndex >= ngf.frameRenderTracking) ngf.frameRenderIndex = 0;
    
    let sum = 0;
    for (let i = 0; i < ngf.frameRenderTracking; i++) {
        sum += ngf.frameRenderTime[i]/1000;
    }
    ngf.averageFrameRenderTime = sum/ngf.frameRenderTracking;
    
    ngf.actualFrameRate = Math.floor(1/ngf.averageFrameRenderTime);

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
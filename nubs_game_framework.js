/*

    Nub's Canvas 2D Game Framework
    Developed by Nub#0002 (Discord)

*/

"use strict";

// Some basic functions

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
        this[1] = y;
    }
    set w(w) {
        if (typeof w !== "number") throw new Error("The width must be a number.");
        this[0] = w;
    }
    set h(h) {
        if (typeof h !== "number") throw new Error("The height must be a number.");
        this[1] = h;
    }

    set(x, y = x) {
        if (typeof x === "number") this[0] = x;
        if (typeof y === "number") this[1] = y;
    }

    get copy() {
        return new this(this[0], this[1]);
    }

    get array() {return [this[0], this[1]];}
    get object() {return {x: this[0], y: this[1], w: this[0], h: this[1]};}

    inrange(min, max) {
        if (!(min instanceof Vector)) throw new Error("Vector.inrange: bad argument #1: epxected a Vector, got " + typeof min);
        if (!(max instanceof Vector)) throw new Error("Vector.inrange: bad argument #2: epxected a Vector, got " + typeof max);
        return Math.inrange(this[0], min[0], max[0]) && Math.inrange(this[1], min[1], max[1])
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

    static rotate(a, angle, origin) {
        if (!(a instanceof Vector)) throw new Error("Vector.rotate: bad argument #1: Expected a Vector, got " + typeof a);
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
// Since the usage would be a bit lengthy, please see [not yet created]
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
                let col = Color.fromHex(r);
                red   = col[0];
                green = col[1];
                blue  = col[2];
                alpha = col[3];
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

    // Getters

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

    get hex() {
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

    get hsl() {
        let hsl = this.hslArray;
        return "hsl(" + [hsl[0], hsl[1] * 100, hsl[2] * 100].join(',') + ")"
    }
    get hslArray() {
        // Math of this function is from https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
        let [r, g, b] = [this[0], this[1], this[2]];
        
        let R = r/255;
        let G = g/255;
        let B = b/255;

        let min = Math.min(R, G, B);
        let max = Math.max(R, G, B);
        let dif = max - min;
        let sum = max + min;

        let L = sum / 2;

        let S = 0;
        let H = 0;
        if (min === max) { // We don't need to calculate the Hue or Saturation if the min and max are the same
            return [H, S, L];
        } else {
            if (L <= 0.5) {
                S = dif / sum;
            } else {
                S = dif / (2 - dif);
            }
        }

        if      (R === max) H =     (G - B) / dif;
        else if (G === max) H = 2 + (B - R) / dif;
        else if (B === max) H = 4 + (R - G) / dif;

        // Now convert to degrees
        H *= 60;
        return [Math.round(H), S, L];
    }

    get h() {return this.hslArray[0];}
    get s() {return this.hslArray[1];}
    get l() {return this.hslArray[2];}
    
    get hue()        {return this.hslArray[0];}
    get saturation() {return this.hslArray[1];}
    get luminance()  {return this.hslArray[2];}

    get array()  {return [this[0], this[1], this[2], this[3]];}
    get object() {
        let hsl = this.hslArray;
        return {r: this[0], g: this[1], b: this[2], a: this[3], red: this[0], green: this[1], blue: this[2], alpha: this[3], h: hsl[0], s: hsl[1], l: hsl[2], hue: hsl[0], saturation: hsl[1], luminance: hsl[2]};
    }
    get objectRGBA() {return {r: this[0], g: this[1], b: this[2], a: this[3], red: this[0], green: this[1], blue: this[2], alpha: this[3]};}
    get objectRGB() {return {r: this[0], g: this[1], b: this[2], red: this[0], green: this[1], blue: this[2]};}
    get objectHSLA() {
        let hsl = this.hslArray;
        return {h: hsl[0], s: hsl[1], l: hsl[2], a: this[3], hue: hsl[0], saturation: hsl[1], luminance: hsl[2], alpha: this[3]};
    }
    get objectHSL() {
        let hsl = this.hslArray;
        return {h: hsl[0], s: hsl[1], l: hsl[2], hue: hsl[0], saturation: hsl[1], luminance: hsl[2]};
    }
    
    get copy() {return new this.constructor(this[0], this[1], this[2], this[3]);}

    // Setters

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

    set rgba(ar) {
        if (!(ar instanceof Array)) throw new Error("You must set the rgba value as an array value.");
        this.set(...ar);
    }
    set rgb(ar) {
        if (!(ar instanceof Array)) throw new Error("You must set the rgb value as an array value.");
        this.set(...ar);
    }

    set hex(hex) {  
        let col = Color.fromHex(hex);
        this[0] = col[0];
        this[1] = col[1];
        this[2] = col[2];
        this[3] = col[3];
    }

    set h(hue) {
        if (typeof hue !== "number") throw new Error("Can't set the hue to a non-numerical value.");
        let hsl = this.hslArray;
        let rgb = this._hslrgbar(hue, hsl[1], hsl[2]);
        this.set(rgb[0], rgb[1], rgb[2]);
    }
    set s(sat) {
        if (typeof sat !== "number") throw new Error("Can't set the saturation to a non-numerical value.");
        let hsl = this.hslArray;
        let rgb = this._hslrgbar(hsl[0], sat, hsl[2]);
        this.set(rgb[0], rgb[1], rgb[2]);
    }
    set l(lum) {
        if (typeof lum !== "number") throw new Error("Can't set the luminance to a non-numerical value.");
        let hsl = this.hslArray;
        let rgb = this._hslrgbar(hsl[0], hsl[1], lum);
        this.set(rgb[0], rgb[1], rgb[2]);
    }

    set hue(hue) {this.h = hue;}
    set saturation(sat) {this.s = sat;}
    set luminance(lum) {this.l = lum;}

    // Functions 

    set (r, g = r, b = r, a) {
        if (typeof r === "number") this[0] = r;
        if (typeof g === "number") this[1] = g;
        if (typeof b === "number") this[2] = b;
        if (typeof a === "number") this[3] = a;
    }

    static _testValue(v, t1, t2) {
        // Math of this function is from https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
        if (6 * v < 1) return t2 + (t1 - t2) * 6 * v;
        else if (6 * v > 1) {
            if (2 * v < 1) return t1;
            else if (2 * v > 1) {
                if (3 * v < 2) return t2 + (t1 - t2) * (0.666 - v) * 6;
                else if (3 * v > 2) return t2;
            }
        }
    }

    static _hslrgbar(h, s, l) {
        if (typeof h !== "number") throw new Error("The hue must be a number.");
        if (typeof s !== "number") throw new Error("The saturation must be a number.");
        if (typeof l !== "number") throw new Error("The luminance must be a number.");
        // Math of this function is from https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
        if (s === 0) return new this(Math.round(l * 255));

        let temp1 = 0;
        if (l < 0.5) temp1 = l * (1 + s);
        else temp1 = l + s - l * s

        let temp2 = 2 * l - temp1;

        let hue = h / 360;

        let tempR = hue + 0.333;
        let tempG = hue;
        let tempB = hue - 0.333;

        if (tempR < 0) tempR += 1;
        else if (tempR > 1) tempR -= 1;

        if (tempG < 0) tempG += 1;
        else if (tempG > 1) tempG -= 1;

        if (tempB < 0) tempB += 1;
        else if (tempB > 1) tempB -= 1;

        let r = this._testValue(tempR, temp1, temp2);
        let g = this._testValue(tempG, temp1, temp2);
        let b = this._testValue(tempB, temp1, temp2);

        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);
        return [r, g, b];
    }

    static hslToRGB(h, s, l) {
        let [r, g, b] = this._hslrgbar(h, s, l);
        return new this(r, g, b);
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

    static fromHex = function(hex) {
        if (typeof hex !== "string") throw new Error("Color.fromHex: Bad argument #1: expected a string hex, got " + typeof hex);
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
                throw new Error("Color.fromHex: Bad argument #1: Invalid hexadecimal specified.");
            } break;
        }

        return new this(...out);
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

// Because the input system is inspired by Unity's input system, these are classes instead of Objects
class KeyCode {
    // All these keys were either generated using a node script, or manually recorded
    static KeyA = 65;
    static KeyB = 66;
    static KeyC = 67;
    static KeyD = 68;
    static KeyE = 69;
    static KeyF = 70;
    static KeyG = 71;
    static KeyH = 72;
    static KeyI = 73;
    static KeyJ = 74;
    static KeyK = 75;
    static KeyL = 76;
    static KeyM = 77;
    static KeyN = 78;
    static KeyO = 79;
    static KeyP = 80;
    static KeyQ = 81;
    static KeyR = 82;
    static KeyS = 83;
    static KeyT = 84;
    static KeyU = 85;
    static KeyV = 86;
    static KeyW = 87;
    static KeyX = 88;
    static KeyY = 89;
    static KeyZ = 90;

    static a = 65;
    static b = 66;
    static c = 67;
    static d = 68;
    static e = 69;
    static f = 70;
    static g = 71;
    static h = 72;
    static i = 73;
    static j = 74;
    static k = 75;
    static l = 76;
    static m = 77;
    static n = 78;
    static o = 79;
    static p = 80;
    static q = 81;
    static r = 82;
    static s = 83;
    static t = 84;
    static u = 85;
    static v = 86;
    static w = 87;
    static x = 88;
    static y = 89;
    static z = 90;

    static [65] = 65; // a
    static [66] = 66; // b
    static [67] = 67; // c
    static [68] = 68; // d
    static [69] = 69; // e
    static [70] = 70; // f
    static [71] = 71; // g
    static [72] = 72; // h
    static [73] = 73; // i
    static [74] = 74; // j
    static [75] = 75; // k
    static [76] = 76; // l
    static [77] = 77; // m
    static [78] = 78; // n
    static [79] = 79; // o
    static [80] = 80; // p
    static [81] = 81; // q
    static [82] = 82; // r
    static [83] = 83; // s
    static [84] = 84; // t
    static [85] = 85; // u
    static [86] = 86; // v
    static [87] = 87; // w
    static [88] = 88; // x
    static [89] = 89; // y
    static [90] = 90; // z

    static Digit0 = 48;
    static Digit1 = 49;
    static Digit2 = 50;
    static Digit3 = 51;
    static Digit4 = 52;
    static Digit5 = 53;
    static Digit6 = 54;
    static Digit7 = 55;
    static Digit8 = 56;
    static Digit9 = 57;

    static [48] = 48; // 0
    static [49] = 49; // 1
    static [50] = 50; // 2
    static [51] = 51; // 3
    static [52] = 52; // 4
    static [53] = 53; // 5
    static [54] = 54; // 6
    static [55] = 55; // 7
    static [56] = 56; // 8
    static [57] = 57; // 9

    static ['0'] = 48;
    static ['1'] = 49;
    static ['2'] = 50;
    static ['3'] = 51;
    static ['4'] = 52;
    static ['5'] = 53;
    static ['6'] = 54;
    static ['7'] = 55;
    static ['8'] = 56;
    static ['9'] = 57;

    static Numpad0 = 96;
    static Numpad1 = 97;
    static Numpad2 = 98;
    static Numpad3 = 99;
    static Numpad4 = 100;
    static Numpad5 = 101;
    static Numpad6 = 102;
    static Numpad7 = 103;
    static Numpad8 = 104;
    static Numpad9 = 105;

    static [96] = 96;   // 0
    static [97] = 97;   // 1
    static [98] = 98;   // 2
    static [99] = 99;   // 3
    static [100] = 100; // 4
    static [101] = 101; // 5
    static [102] = 102; // 6
    static [103] = 103; // 7
    static [104] = 104; // 8
    static [105] = 105; // 9

    static NumpadDecimal  = 110;
    static NumpadAdd      = 107;
    static NumpadSubtract = 109;
    static NumpadMultiply = 106;
    static NumpadDivide   = 111;

    static [110] = 110; // numDec
    static [107] = 107; // numAdd
    static [109] = 109; // numSub
    static [106] = 106; // numMul
    static [111] = 111; // numDiv

    static ArrowLeft  = 37;
    static ArrowUp    = 38;
    static ArrowRight = 39;
    static ArrowDown  = 40;

    static [37] = 37; // arrowleft
    static [38] = 38; // arrowUp
    static [39] = 39; // arrowRight
    static [40] = 40; // arrowDown

    static Enter       = 13;
    static NumpadEnter = 13;
    
    static [13] = 13; // enter

    static Shift      = 16;
    static ShiftLeft  = "ShiftLeft";
    static ShiftRight = "ShiftRight";
    
    static Control      = 17;
    static ControlLeft  = "ControlLeft";
    static ControlRight = "ControlRight";
    
    static Alt      = 18;
    static AltLeft  = "AltLeft";
    static AltRight = "AltRight";

    static [16] = 16; // shift
    static [17] = 17; // control
    static [18] = 18; // alt

    static Backspace = 8;
    static Space     = 32;
    static CapsLock  = 20;
    static [' ']     = 32;

    static [8] = 8;
    static [32] = 32;
    static [20] = 20;

    static BracketLeft  = 219;
    static BracketRight = 221;
    static ['[']        = 219;
    static [']']        = 221;

    static [219] = 219; // [
    static [221] = 221; // ]

    static Equal = 187;
    static Minus = 189;
    static ['='] = 187;
    static ['-'] = 189;

    static [187] = 187; // =
    static [189] = 189; // -

    static Semicolon = 186;
    static Quote     = 222;
    static [';']     = 186;
    static ["'"]     = 222;

    static [186] = 186; // ;
    static [222] = 222; // '

    static Comma  = 188;
    static Period = 190;
    static [',']  = 188;
    static ['.']  = 190;

    static [188] = 188; // ,
    static [190] = 190; // .

    static Slash     = 191;
    static Backslash = 220;
    static ['/']     = 191;
    static ['\\']    = 220;

    static [191] = 191; // /
    static [220] = 220; // \

    static Backquote = 192;
    static ['`']     = 192;

    static [192] = 192; // `

    static _downKeys = new Map(); // Current keys that are pressed
    static _lastDownKeys = new Map(); // The keys that were pressed in the previous frame (tick)
}

class MouseCode {
    static left   = 0;
    static middle = 1;
    static right  = 2;

    static [0] = 0;
    static [1] = 1;
    static [2] = 2;

    static _down = new Map(); // Current mouse buttons pressed
    static _lastDown = new Map(); // Mouse buttons pressed in the previous frame
}

class Input {
    static isKeyDown(key) {
        if (typeof key !== "string" && typeof key !== "number") throw new Error("KeyCode.isKeyDown: Bad argument #1: string or number expected, got " + typeof key);
        return KeyCode._downKeys.get(key);
    }

    static keyPressed(key) {
        if (typeof key !== "string" && typeof key !== "number") throw new Error("KeyCode.keyPressed: Bad argument #1: string or number expected, got " + typeof key);
        if (KeyCode[key]) {
            // Return if down this frame and not down last frame
            return KeyCode._downKeys.get(key) && !KeyCode._lastDownKeys.get(key);
        }
        return false;
    }

    static keyReleased(key) {
        if (typeof key !== "string" && typeof key !== "number") throw new Error("KeyCode.keyReleased: Bad argument #1: string or number expected, got " + typeof key);
        if (KeyCode[key]) {
            // Return if released this frame and down last frame
            return !KeyCode._downKeys.get(key) && KeyCode._lastDownKeys.get(key);
        }
        return false;
    }

    static isMouseButtonDown(btn) {
        if (typeof btn !== "string" && typeof btn !== "number") throw new Error("MouseCode.isMouseButtonDown: Bad argument #1: string or number expected, got " + typeof btn);
        return MouseCode._down.get(btn);
    }

    static mouseButtonPressed(btn) {
        if (typeof btn !== "string" && typeof btn !== "number") throw new Error("MouseCode.mouseButtonPressed: Bad argument #1: string or number expected, got " + typeof btn);
        if (MouseCode[btn]) {
            // Return if down this frame and not down last frame
            return MouseCode._down.get(btn) && !MouseCode._lastDown.get(btn);
        }
        return false;
    }

    static mouseButtonReleased(btn) {
        if (typeof btn !== "string" && typeof btn !== "number") throw new Error("MouseCode.mouseButtonReleased: Bad argument #1: string or number expected, got " + typeof btn);
        if (MouseCode[btn]) {
            // Return if released this frame and down last frame
            return !MouseCode._down.get(btn) && MouseCode._lastDown.get(btn);
        }
        return false;
    }
}

// lerp, Linear Interpolation
// -> Used for transitions, used in animations.
//      Number x: the start number
//      Number y: the end number
//      Number p: the progress %; should be a number between 0 and 1
// -> Returns a number (float format)
Math.lerp = function(start, end, prog) {
    if (typeof start !== "number") throw new Error("lerp: bad argument #1: expected a number, got " + typeof start);
    if (typeof end !== "number") throw new Error("lerp: bad argument #2: expected a number, got " + typeof end);
    if (typeof prog !== "number") throw new Error("lerp: bad argument #3: expected a number, got " + typeof prog);
    return start + prog * (end - start);
}

Math.clamp = function(x, min, max) {
    if (typeof x !== "number") throw new Error('Math.clamp: bad argument #1: number expected, got ' + typeof x);
    if (typeof min !== "number") throw new Error('Math.clamp: bad argument #2: number expected, got ' + typeof min);
    if (typeof max !== "number") throw new Error('Math.clamp: bad argument #3: number expected, got ' + typeof max);
    return Math.min(Math.max(x, min), max);
}

Math.inrange = function(x, min, max) {
    if (typeof x !== "number") throw new Error('Math.inrange: bad argument #1: number expected, got ' + typeof x);
    if (typeof min !== "number") throw new Error('Math.inrange: bad argument #2: number expected, got ' + typeof min);
    if (typeof max !== "number") throw new Error('Math.inrange: bad argument #3: number expected, got ' + typeof max);
    return (x >= min && x <= max);
}

// A table that contains all of the essential framework variables
let ngf = {};

ngf.entities = new Map(); // Map of all objects
ngf.entCount = 0; // We could use ngf.entities.size, but if a random entity is deleted, new entities will be deleted, so we just store a count that doesn't decrement
ngf.renderedEnts = new Set(); // We will store rendering objects in this set so they aren't rendered twice. Cleared at the end of every frame.
ngf.animations = new Map(); // Map of all running animations
ngf.canvas = null; // The canvas the mouse is tracked to
ngf.context = null; // What this framework draws to
ngf.fps = 60; // 0 is as many frames as possible. Any higher number is the actual FPS. 0 is not recommended, the deltaTime will be incorrect.
ngf.tickRate = 66; // How many times an entity "thinks" every second
ngf.onFrameRender = []; // User defined functions to run every frame
ngf.clearFrame = true; // Should the frame be cleared before redrawing?

class Mouse { // used to track the mouse around the canvas for inputs
    static pos = new Vector(-1);
    static down = false;

    // Function used to check if the mouse is hovering a certain object. Will become more indepth later to include overlapping objects
    static isHovering = function(ent) {
        if (!(ent instanceof Entity)) throw new Error("Mouse.isHovering: bad argument #1: expected an entity, got " + typeof obj);
        if (!ent.pos)                 throw new Error("Mouse.isHovering: bad argument #1: invalid entity supplied, has no position.");
        if (!ent.size)                throw new Error("Mouse.isHovering: bad argument #1: invalid entity supplied, has no size.");
        return Mouse.pos.inrange(ent.pos, ent.size);
    }
}


// Now functions and classes that require the variables above

function setCanvas(id) {
    // Find the HTML element with this ID, or error if it can't find one
    let canvas = document.getElementById(id);
    if (!canvas) throw new Error("setCanvas: bad argument #1: expected an element ID, but didn't find a valid element.");
    
    ngf.canvas = canvas;

    // Keep track of the mouse position for hover detection
    ngf.canvas.onmousemove = function(e) {
        let rect = this.getBoundingClientRect();
        Mouse.pos[0] = (e.clientX - rect.x) / rect.width * this.width;
        Mouse.pos[1] = (e.clientY - rect.y) / rect.height * this.height;
    }

    // Keep track of whether or not the mouse is clicked
    ngf.canvas.onmousedown = function(e) {
        Mouse.down = true;
        ngf.canvas.focus();

        if (MouseCode[e.button] !== undefined) {
            MouseCode._down.set(e.button, true);
        }
    }
    ngf.canvas.onmouseup = function(e) {
        Mouse.down = false;
        ngf.canvas.focus();
        if (MouseCode._down.get(e.button)) {
            MouseCode._down.set(e.button, false);
        }
    }
    ngf.canvas.oncontextmenu = function(e) {
        e.stopPropagation();
        e.cancelBubble = true;
        return false;
    }

    // Reset values if the mouse isn't even on the canvas
    ngf.canvas.onmouseout = function() {
        Mouse.down = false;
        Mouse.pos.set(-1);
    }

    ngf.canvas.onkeydown = function(e) {
        if (KeyCode[e.key] !== undefined || KeyCode[e.code] !== undefined) {
            KeyCode._downKeys.set(e.code, true);
            KeyCode._downKeys.set(e.key, true);
            KeyCode._downKeys.set(e.keyCode, true);
        }
    }
    ngf.canvas.onkeyup = function(e) {
        if (KeyCode._downKeys.get(e.code)) {
            KeyCode._downKeys.set(e.code, false);
            KeyCode._downKeys.set(e.key, false);
            KeyCode._downKeys.set(e.keyCode, false);
        }
    }

    ngf.canvas.focus();

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
                - Button
                    CheckBox
                    DropDownMenu
                    TextEntry
                    Slider
                - Img
                    SpriteSheet
                Gradient
                    ColorMixer
            ✓ Text
            ✓ Circle
            ✓ Line
            ✓ Poly
        - Animation
        NPC
        PlayerController

*/

// Functions easing animations. Referenced from https://easings.net/
function easeInOut(value, exponent) {
    if (typeof value !== "number")    throw new Error("easeIn: Bad argument #1: Expected a number, got " + typeof value);
    if (typeof exponent !== "number") throw new Error("easeIn: Bad argument #2: Expected a number, got " + typeof exponent);
    return value < 0.5 ? (2 ** (exponent - 1)) * (value ** exponent) : 1 - ((-2 * value + 2) ** exp) / 2;
}

// For a complete documentation of all the classes below, see [not yet created]

class Entity {
    constructor (data) {
        this.id = ngf.entCount++;
        this.enabled = true;
        this.parent = null;
        this.children = new Map();

        Object.assign(this, data);

        // Internal variables of the ones above, used to validate input types since Javascript doesn't let me do "bool enabled = true;"
        this._enabled = true;
        this._parent = null;

        ngf.entities.set(this.id, this);
    }

    set enabled(en) {
        if (typeof en !== "boolean") throw new Error("You must give a boolean to enable/disable an entity");
        this._enabled = en;
    }
    get enabled() {return this._enabled;}

    set parent(par) {
        if (par === null || par === undefined || par instanceof Entity) {
            this._parent = par;
        } else throw new Error("You must set the parent to a valid entity object, but got " + typeof par)
    }
    get parent() {
        if (this._parent instanceof Entity) return this._parent;
        else return null;
    }

    static null = new this({enabled: false});
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

    moveTo(pos, duration = 1000, ease, onFinish) {
        if (!(pos instanceof Vector)) throw new Error("<Graphic>.moveTo: Bad argument #1: Expected a Vector, got " + typeof pos);

        let animX = new Animation();
        let animY = new Animation();

        animX.object = this.pos;
        animY.object = this.pos;

        animX.modifying = 0;
        animY.modifying = 1;
        
        animX.start = this.pos[0];
        animY.start = this.pos[1];
        
        animX.end = pos[0];
        animY.end = pos[1];
        
        if (typeof duration === "number") animX.duration = duration;
        if (typeof duration === "number") animY.duration = duration;

        if (typeof ease === "number") animX.ease = ease;
        if (typeof ease === "number") animY.ease = ease;

        if (onFinish instanceof Function) animY.onFinish = onFinish;

        animX.startAnim();
        animY.startAnim();
        return animY;
    }

    curveTo(pos, duration = 1000, ease, onFinish) {
        if (!(pos instanceof Vector)) throw new Error("<Graphic>.curveTo: Bad argument #1: Expected a Vector, got " + typeof pos);

        let animX = new Animation();
        let animY = new Animation();
        
        animX.object = this.pos;
        animY.object = this.pos;
        
        animX.modifying = 0;
        animY.modifying = 1;
        
        animX.start = this.pos[0];
        animY.start = this.pos[1];
        
        animX.end = pos[0];
        animY.end = pos[1];
        
        if (typeof duration === "number") animX.duration = duration;
        if (typeof duration === "number") animY.duration = duration;
        
        animX.ease = 2;
        if (typeof ease === "number") animX.ease = ease;

        if (onFinish instanceof Function) animY.onFinish = onFinish;

        animX.startAnim();
        animY.startAnim();
        return animY;
    }

    colorTo(col, duration = 1000, ease, onFinish) {
        if (!(col instanceof Color)) throw new Error("<Graphic>.colorTo: Bad argument #1: Expected a Color, got " + typeof col);

        let animR = new Animation();
        let animG = new Animation();
        let animB = new Animation();
        let animA = new Animation();

        animR.object = this.color;
        animG.object = this.color;
        animB.object = this.color;
        animA.object = this.color;

        animR.modifying = 0;
        animG.modifying = 1;
        animB.modifying = 2;
        animA.modifying = 3;
        
        animR.start = this.color[0];
        animG.start = this.color[1];
        animB.start = this.color[2];
        animA.start = this.color[3];
        
        animR.end = col[0];
        animG.end = col[1];
        animB.end = col[2];
        animA.end = col[3];
        
        if (typeof duration === "number") animR.duration = duration;
        if (typeof duration === "number") animG.duration = duration;
        if (typeof duration === "number") animB.duration = duration;
        if (typeof duration === "number") animA.duration = duration;

        if (typeof ease === "number") animR.ease = ease;
        if (typeof ease === "number") animG.ease = ease;
        if (typeof ease === "number") animB.ease = ease;
        if (typeof ease === "number") animA.ease = ease;

        if (onFinish instanceof Function) animA.onFinish = onFinish;

        animR.startAnim();
        animG.startAnim();
        animB.startAnim();
        animA.startAnim();
        return animA;
    }

    think() {
        // Check if the mouse is hovering this entity. If so, we want to do hover and click events
        if (this.pos instanceof Vector && this.size instanceof Vector && Mouse.isHovering(this)) {
            // Since we are hovering, check if we're hovering and run .onHoverStart()
            if (!this._isHovered) {
                this._isHovered = true;
                this._hoverStart = Date.now();
                if (this.onHoverStart instanceof Function) this.onHoverStart();
            }
            // This runs ever tick, with the time it's been hovered
            if (this.whileHovered instanceof Function) this.whileHovered(Date.now() - this._hoverStart);

            // Check if the mouse is clicked. If so, we want to do click events
            if (Mouse.down) {
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
        if (typeof this.drawMask !== "boolean") this.drawMask = true;
    }
    
    sizeTo(size, duration = 1000, ease, onFinish) {
        if (!(size instanceof Vector)) throw new Error("<Graphic>.moveTo: Bad argument #1: Expected a Vector, got " + typeof size);

        let animX = new Animation();
        let animY = new Animation();

        animX.object = this.size;
        animY.object = this.size;

        animX.modifying = 0;
        animY.modifying = 1;
        
        animX.start = this.size[0];
        animY.start = this.size[1];
        
        animX.end = size[0];
        animY.end = size[1];
        
        if (typeof duration === "number") animX.duration = duration;
        if (typeof duration === "number") animY.duration = duration;

        if (typeof ease === "number") animX.ease = ease;
        if (typeof ease === "number") animY.ease = ease;

        if (onFinish instanceof Function) animY.onFinish = onFinish;

        animX.startAnim();
        animY.startAnim();
        return animY;
    }

    draw(w, h) {
        ngf.context.fillStyle = this.color.rgba;

        // If the corner radius is 0, we don't need to waste time tracing a path and just fill a rectangle
        if (this.cornerRadius === 0) {
            ngf.context.fillRect(0, 0, w, h);
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

    textColorTo(col, duration = 1000, ease, onFinish) {
        if (!(col instanceof Color)) throw new Error("<Graphic>.textColorTo: Bad argument #1: Expected a Color, got " + typeof col);

        let animR = new Animation();
        let animG = new Animation();
        let animB = new Animation();
        let animA = new Animation();

        animR.object = this.textColor;
        animG.object = this.textColor;
        animB.object = this.textColor;
        animA.object = this.textColor;

        animR.modifying = 0;
        animG.modifying = 1;
        animB.modifying = 2;
        animA.modifying = 3;
        
        animR.start = this.textColor[0];
        animG.start = this.textColor[1];
        animB.start = this.textColor[2];
        animA.start = this.textColor[3];
        
        animR.end = col[0];
        animG.end = col[1];
        animB.end = col[2];
        animA.end = col[3];
        
        if (typeof duration === "number") animR.duration = duration;
        if (typeof duration === "number") animG.duration = duration;
        if (typeof duration === "number") animB.duration = duration;
        if (typeof duration === "number") animA.duration = duration;

        if (typeof ease === "number") animR.ease = ease;
        if (typeof ease === "number") animG.ease = ease;
        if (typeof ease === "number") animB.ease = ease;
        if (typeof ease === "number") animA.ease = ease;

        if (onFinish instanceof Function) animA.onFinish = onFinish;

        animR.startAnim();
        animG.startAnim();
        animB.startAnim();
        animA.startAnim();
        return animA;
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

class CheckBox extends Button {
    constructor(data) {
        super(data);

        if (typeof this.style !== "string") this.style = "box";
        if (!(this.tickColor instanceof Color)) this.tickColor = new Color();
    }

    draw(w, h) {
        super.draw(w, h);

        
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

    textColorTo(col, duration = 1000, ease, onFinish) {
        if (!(col instanceof Color)) throw new Error("<Graphic>.textColorTo: Bad argument #1: Expected a Color, got " + typeof col);

        let animR = new Animation();
        let animG = new Animation();
        let animB = new Animation();
        let animA = new Animation();

        animR.object = this.textColor;
        animG.object = this.textColor;
        animB.object = this.textColor;
        animA.object = this.textColor;

        animR.modifying = 0;
        animG.modifying = 1;
        animB.modifying = 2;
        animA.modifying = 3;
        
        animR.start = this.textColor[0];
        animG.start = this.textColor[1];
        animB.start = this.textColor[2];
        animA.start = this.textColor[3];
        
        animR.end = col[0];
        animG.end = col[1];
        animB.end = col[2];
        animA.end = col[3];
        
        if (typeof duration === "number") animR.duration = duration;
        if (typeof duration === "number") animG.duration = duration;
        if (typeof duration === "number") animB.duration = duration;
        if (typeof duration === "number") animA.duration = duration;

        if (typeof ease === "number") animR.ease = ease;
        if (typeof ease === "number") animG.ease = ease;
        if (typeof ease === "number") animB.ease = ease;
        if (typeof ease === "number") animA.ease = ease;

        if (onFinish instanceof Function) animA.onFinish = onFinish;

        animR.startAnim();
        animG.startAnim();
        animB.startAnim();
        animA.startAnim();
        return animA;
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

class Animation extends Entity {
    constructor (data) {
        super();

        this.object = null;    // The entity we are performing this animation on
        this.modifying = null; // The key we are modifying on the entity
        this.value = 0;        // The current value of of the number
        this.start = 0;        // The starting number to animate from
        this.end = 0;          // The ending number to animate to
        this.progress = 0;     // Number between 0 and 1; the progress (%) between the start and end value
        this.duration = 0;     // How long it should take to get from one point to the other
        this.ease = 1;         // The exponential ease value
        this.ellapsedTime = 0; // How long the animation has ran since it started
        
        // Assign all input data to this
        Object.assign(this, data);

        // Internal variables
        this._startedTimestamp = 0;
        this._finishedTimestamp = null;
        this._running = false;
        this._object = null;
        this._modifying = null;

        ngf.animations.set(this.id, this);
    }

    set object(ent) {
        if (ent instanceof Object || ent === null || ent === undefined) {
            this._object = ent;
        } else console.warn("Attempted to set the object to an invalid value.");
    }
    get object() {
        if (this._object instanceof Object) return this._object;
        return null;
    }

    startAnim(restart) {
        if (!(this.object instanceof Object))   throw new Error("Attempted to start an animation without a valid object.");
        if (typeof this.modifying !== "string" && typeof this.modifying !== "number") throw new Error("Attempted to start an animation without a valid object modification key.");
        if (typeof this.start     !== "number") throw new Error("Attempted to start an animation with an invalid start value; it must be a number.");
        if (typeof this.end       !== "number") throw new Error("Attempted to start an animation with an invalid ending value; it must be a number.");

        if (typeof this.value        !== "number") this.value = this.start;
        if (typeof this.progress     !== "number") this.progress = 0;
        if (typeof this.ease         !== "number") this.ease = 1;
        if (typeof this.ellapsedTime !== "number") this.ellapsedTime = 0;

        this._startedTimestamp = Date.now();
        this._running = true;

        if (this.ellapsedTime > 0 && !restart) {
            this._startedTimestamp -= this.ellapsedTime;            
        }
    }
    pauseAnim() {
        this._running = false;
        this.ellapsedTime = Date.now() - this._startedTimestamp;
    }
    finishAnim() {
        if (this._running) {
            if (typeof this.object[this.modifying] !== "number") throw new Error("The modification key is supposed to be assigned to a numerical value.");
            this._running = false;
            this.object[this.modifying] = this.end;
            this.progress = 1;
            this._finishedTimestamp = Date.now();

            if (this.onFinish instanceof Function) this.onFinish();
        } else console.warn("Attempted to finish an animation that wasn't running.");
    }

    update() {
        if (typeof this.object[this.modifying] !== "number") throw new Error("The modification key is supposed to be assigned to a numerical value.");

        if (!this._running) return;

        this.ellapsedTime = Date.now() - this._startedTimestamp;
        this.progress = this.ellapsedTime / this.duration;

        if (this.ellapsedTime >= this.duration) {
            this.finishAnim();
        }

        let prog = this.ease !== 1 ? easeInOut(this.progress, this.ease) : this.progress;

        this.object[this.modifying] = Math.lerp(this.start, this.end, prog);

        if (this.onUpdate instanceof Function) this.onUpdate(this.progress);
    }
}


ngf.frameRenderTracking = 50; // The previous frame render times to keep track of
ngf.frameRenderIndex = -1;    // Internal, the current index in the measurement array
ngf.frameRenderTime = [];     // Cache of previous render times
ngf.deltaTime = 0;            // Calculated at the end of a frame render

// Fill the render time so it is constantly the same length
for (let i = 0; i < ngf.frameRenderTracking; i++) {
    ngf.frameRenderTime.push(0);
}

// Rendering
function drawFrame() {
    let startTime = Date.now();
    if (ngf.context) { // We can only render if there is a context, however we don't want to error if it's not set
        if (ngf.clearFrame) {
            ngf.context.clearRect(0, 0, ngf.canvas.width, ngf.canvas.height);
        
            // Ensure the background is black
            ngf.context.fillStyle = "rgb(0,0,0)";
            ngf.context.fillRect(0, 0, ngf.canvas.width, ngf.canvas.height);
        }

        // Loop through all animations and update them before drawing the frame
        ngf.animations.forEach((anim, id, map) => {
            if (anim instanceof Animation) {
                if (anim._running) {
                    anim.update();
                }
            }
        });

        // Loop through all entities and call .draw
        ngf.entities.forEach((ent, id, map) => {
            if (ent instanceof Graphic) { // Only draw if it's a graphic entity
                if (ent.thinkFrame instanceof Function) ent.thinkFrame();
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

                        if (w > 0 && h > 0 && ent.drawMask) {
                            ngf.context.beginPath();
                            ngf.context.rect(0, 0, w, h);
                            ngf.context.clip();
                            ngf.context.closePath();
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
    if (ngf.fps > 0) {
        deltaTime += 1000/ngf.fps;
    }

    ngf.frameRenderIndex++;
    ngf.frameRenderTime[ngf.frameRenderIndex] = deltaTime;

    if (ngf.frameRenderIndex >= ngf.frameRenderTracking) ngf.frameRenderIndex = 0;
    
    let sum = 0;
    for (let i = 0; i < ngf.frameRenderTracking; i++) {
        sum += ngf.frameRenderTime[i]/1000;
    }
    ngf.deltaTime = sum/ngf.frameRenderTracking;
    
    ngf.actualFrameRate = Math.floor(1/ngf.deltaTime);

    for (let i = 0; i < ngf.onFrameRender.length; i++) {
        if (ngf.onFrameRender[i] instanceof Function) ngf.onFrameRender[i]();
    }

    // Update the last down keys to the current down keys
    KeyCode._lastDownKeys.clear();
    MouseCode._lastDown.clear();

    for (let [key, value] of KeyCode._downKeys) {
        KeyCode._lastDownKeys.set(key, value);
    }
    for (let [key, value] of MouseCode._down) {
        MouseCode._lastDown.set(key, value);
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
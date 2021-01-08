# Nub's Canvas Game Framework 2.0
A game framework for an HTML canvas. Very early in development. This is a rewrite of a previous, unfinished version. Please check the wiki for documentation.

# Notice
This is not a final product, everything is subject to change. It is also lacking in major key features.

# Installation
1. Downlaod `nubs_game_framework.js`.
2. In the HTML file where you have your canvas, add `<script src="nubs_game_framework.js"></script>` in the header.
3. Make a new JavaScript file in the directory your HTML file is located.
4. In the body, after you make the canvas element, add `<script scr="game.js"></script>`, however you need to replace `game.js` with whatever you named the file.
5. In the JavaScript game file, before you try to do anything, you need to add `setCanvas("id")`, but replace `id` with your canvas ID.
6. Finished

# Sample
I have given some starter code below, it is now up to you to make your game :)
### HTML
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <script src="nubs_game_framework.js"></script>
    </head>
    <body>
        <canvas id="game" width="512" height="512"></canvas>
        <script src="game.js"></script>
    </body>
</html>
```
### JavaScript
This features a demonstration of all functional entity types.
#### game.js (whatever you named it as)
```javascript
setCanvas("game");

let box = new Box();
box.pos.set(8);
box.size.set(64);
box.color.hex = "#0096ff";

let box2 = new Box();
box2.pos.set(80, 8);
box2.size.set(64);
box2.color.hex = "#ff3e3e";
box2.cornerRadius = 24;

let circle =  new Circle();
circle.pos.set(184, 40);
circle.radius = 32;

let img = new Img();
img.url = "https://nubstoys.xyz/favicon.ico";
img.pos.set(224, 8);
img.size.set(64);

let line = new Line();
line.start.set(304, 8);
line.end.set(368, 72);
line.weight = 8;

let poly = new Poly();
poly.points.push(new Vector(376, 8));
poly.points.push(new Vector(376, 72));
poly.points.push(new Vector(440, 72));

let txt = new Text();
txt.pos.set(8, 72)
txt.text = "Yeet Yote";
txt.font = "64px Arial";
txt.textColor = new Color(255);
```
## Sample Output
![Screenshot](https://nubstoys.xyz/gfd/example_code.png)

# Feb 10, 2021
* Working to simpe matrix
* ideal wodl be a mix of LISP, Python, JavaScript

# Jan 11, 2021 
* Starting on the  mappig pipeline
* Geomotry class is an experiment wiht generators iterators
* Need to switch to composable surfaces ( e.g. a rotated grid on a grid)
* Absolute positioning for paths

# Dec 31, 2020 
* Each spider ads elements to its own group
properties like color, widt, heading and location are 
now spider specific.
* Sure need exec system running now.

# Dec 31, 2020
* Added SVGSurface Class
This will likely be part of a Surface drawing hierarchy ( SVG, BitMap, ???)
The purpose is to make it easy to see the core parts of
of these pipelines, So for example Bit maps will bee chunky even on retina 
displays. Un clear at this point if canvas will will be used,
for smaller bitmaps ( e.g. 10x10 or 20x20- they still map be SVGs)
* Added Spriral
* TODO allow aging on path elements, 
they can change color other properteis or be delted completely. This will help 
contoniousy running programs that exceed reasonable complexity.
(thath is oldest may be delted automatically)
* TODO, pined, vs free-gravity affected points
* FATbit scaling of HTML canvas objects doe not seem too easy
See notes here. http://jsfiddle.net/alnitak/LwJJR/
and here https://stackoverflow.com/questions/8597081/how-to-stretch-images-with-no-antialiasing
The best approach may be to sipley have native resolution canvas wiht
JS array backing store. when it is changes, the data will be remapped

# Dec 30, 2020
* Drawing simple vectors wiht color and width
* stlye/class woudl be good to include as intro to CSS
even if just done as a JS object, introduces defining and reusing style
aso hlpe introdut properties specific to each graphical element
such as text.
* Using vector math instrad fo x,y at more levels. 
* Next up animation

# Dec 29, 2020 - SDG
* Trivial html to method call
* Trivial SVG side effect.
* TODO like spider consider amounthe ares to crawl brick or tile walls
These are very coarse grids or other geometries like a chess board, tik tack to
They become simple data models with easy/fun views that students can index and modify
key point is the the binding is automatic , ( and simoe insid the code) a bit
old LED or light bulb panels of early computers
* Changed origin github URL

# Dec 28, 2020
Learning more ES6
* stubs for a few classes Spider, Web, Vector
Ther are a few coomonly used libs fro vector/complex,right now
Using as sample projects to just lear ES6 like students might do.
* Body onload works for call after ES6 modules has asyn loaded.
* async loaded is different from POJS style
* LiveServer (does dyamic auto reload throgh code injection, interesting-nice)

# Dec 27, 2020
* Pulled svgbuilder form 2016 and converted to class and module ES6
* GIT and VS code is working well
* install VSCode - LiveServer (does dyamic auto reload throgh code injection)
* Tweaked ESLint settings
* Looking at using interact.js again
* TODO add favicon.ico (to clear error from chrome/safari)
* DONE how to call module functions from HTML (will be avoiding this mostly)

Notes ES6, seem reasomable now, modules require hosting from server, file no longer works
TODO - What about building web view based apps for iOS/Android?

# Dec 26, 2020
After a semester of projects with Turtle, scratch, Makecode, using blocks and snippets of text, thre is a beter sense of what thing to put in a backpack for a mountain climbing journey. 

* Fun to use, dilightful visuals
* Simple visulaization of data structures
* A glimpse of a simulated memory layout (Like HeepPeek) 
* Run everywhere, and pretty fast. JS does that well. Python is runner up. SVG and Canvas well defined and optimized

# Spider (JS) 
A turtle that can spin webs, webs that can be crawled in many dimenstions. 


# Iniitial todo
* todo Rules DONE
* html + JS baisc file DONE
* Spider object  ( Done Stubbed 12/28)
* Web Object
* Button Object
* Slide Object
* A library for JS use DONE (Using ES6 modules)
* A meta shell for simple inteactive lisp like programs

# Some helpful sites along the way
https://www.w3schools.com/
https://flaviocopes.com/svg/
https://svgjs.com/docs/3.0/

# TODO rules
* Simple stements (avoid compound statements like and)
* 1.0 place holders are great. Build and ooch (Credit Jeff K and Dr T., Perfection is the enemy of good, Col Mac Leod)
* Make impossible, elegant, easy beautiful. the rest will follow (Paul A)
* tell stories along the way.

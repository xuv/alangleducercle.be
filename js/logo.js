function logoPath(x, y, r) {

    var angle = [
        Math.random()*Math.PI*2,
        Math.random()*Math.PI*2,
        Math.random()*Math.PI*2
    ];

    angle.sort(function(a,b){return a - b});

    var triangle = {
        x1: Math.cos(angle[0])*r,
        y1: Math.sin(angle[0])*r,
        x2: Math.cos(angle[1])*r,
        y2: Math.sin(angle[1])*r,
        x3: Math.cos(angle[2])*r,
        y3: Math.sin(angle[2])*r
    }

    var logoParams = {
        cx: x,
        cy: y,
        radius: r,
        a1: {
            x1: triangle.x1,
            y1: triangle.y1,
            x2: triangle.x2-triangle.x1,
            y2: triangle.y2-triangle.y1,
            laf: (angle[1]-angle[0] > Math.PI)? 1 : 0
        },
        a2: {
            x1: triangle.x2,
            y1: triangle.y2,
            x2: triangle.x3-triangle.x2,
            y2: triangle.y3-triangle.y2,
            laf: (angle[2]-angle[1] > Math.PI)? 1 : 0
        },
        a3: {
            x1: triangle.x3,
            y1: triangle.y3,
            x2: triangle.x1-triangle.x3,
            y2: triangle.y1-triangle.y3,
            laf: (angle[0]-angle[2] > Math.PI || -Math.PI < angle[0]-angle[2] && angle[0]-angle[2] < 0 )? 1 : 0
        }
    }

    var logoPath = Raphael.fullfill("M {cx} {cy} m {a1.x1} {a1.y1} a {radius} {radius} 0 {a1.laf} 1 {a1.x2} {a1.y2} z M {cx} {cy} m {a2.x1} {a2.y1} a {radius} {radius} 0 {a2.laf} 1 {a2.x2} {a2.y2} z M {cx} {cy} m {a3.x1} {a3.y1} a {radius} {radius} 0 {a3.laf} 1 {a3.x2} {a3.y2} z", logoParams );

    return logoPath;
}


function drawLogo(x, y, r){
    // x, y : position du centre du logo
    // r : rayon du logo
    var logo = paper.path(logoPath(x, y, r));

    logo.attr({"fill": "#ffdb00", "stroke": "none"});

    var animate = function() { 
        logo.animate(
            {path : logoPath(x, y, r)},
            500,
            "<>",
            setTimeout(animate, 7000)
        );
    }
    setTimeout(animate, 7000);

    return logo;
}

var paper = Raphael("logo", 200, 300);
var circle = paper.circle(100, 150, 100);
circle.attr({"fill" : "none",  "stroke": "#ffdb00"});
var logo = drawLogo(100,150,100);
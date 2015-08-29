var score = 0;
var highScore = 0;
var collisions = 0;

var gameBoardData = [{
  background: "MidnightBlue",
  height: '700px',
  width: '700px'
}];

var colors = [
  "blue",
  "purple",
  "MediumOrchid",
  "RebeccaPurple",
  "MediumPurple",
  "LightSkyBlue",
  "MediumTurquoise",
  "MediumVioletRed",
  "Orchid",
  "PaleVioletRed",
  "Plum",
  "RoyalBlue",
  "SkyBlue",
  "SlateBlue",
  "SteelBlue",
  "Turquoise",
  "Maroon",
  "LightBlue",
  "LightCyan",
  "HotPink",
  "LightSeaGreen",
  "Indigo",
  "DodgerBlue",
  "DeepSkyBlue",
  "DarkTurquoise",
  "DarkOrchid",
  "DarkMagenta",
  "Cyan",
  "CornflowerBlue",
  "Aqua"];

var numEnemies = 30;

// var enemyData = _.map(_.range(0, numEnemies), function(item, key) {
//   return {
//     color: colors[Math.floor(Math.random() * colors.length)],
//     id: key,
//     x: function() { return Math.random() * 700 },
//     y: function() { return Math.random() * 700 },
//     radius: 10
//   }
// });

var enemyData = _.map(_.range(0, numEnemies), function(item, key) {
  return {
    color: colors[Math.floor(Math.random() * colors.length)],
    id: key,
    x: function() { return Math.random() * 700 },
    y: function() { return Math.random() * 700 },
    width: 30,
    height: 30
  }
});

var playerData = [
  {
    cx: 350,
    cy: 350,
    color: 'yellow',
    r: 15
  }
];

var drag = d3.behavior.drag()
  .on('drag', function() {
    player.attr('cx', d3.event.x)
          .attr('cy', d3.event.y);
  });


var board = d3.select("body").selectAll("svg").data(gameBoardData, function(d) {return d})
  .enter().append("svg")
    .style("width", function(d) {return d.width})
    .style("height", function(d) {return d.height})
    .style("background-color", function(d) {return d.background})

// var enemies = d3.select("svg").selectAll("circle")
//   .data(enemyData)
//   .enter().append("circle")
//     .attr("cx", function(d) {return d.x()})
//     .attr("cy", function(d) {return d.y()})
//     .attr("r", function(d) {return d.radius})
//     .style("fill", function(d) {return d.color})
//     .classed("circle", true);

var enemies = d3.select("svg").selectAll("image")
  .data(enemyData)
  .enter().append("image")
    .attr("x", function(d) {return d.x()})
    .attr("y", function(d) {return d.y()})
    .attr("width", function(d) {return d.width})
    .attr("height", function(d) {return d.height})
    .attr("xlink:href", "shuriken.svg")
    .style("fill", function(d) {return d.color})
    .classed("circle", true);

var player = d3.select("svg").selectAll("ellipse")
  .data(playerData)
  .enter().append("ellipse")
    .attr("cx", function(d) {return d.cx})
    .attr("cy", function(d) {return d.cy})
    .attr("rx", function(d) {return d.r})
    .attr("ry", function(d) {return d.r})
    .classed("player", true)
    .style("fill", function(d) {return d.color})
    .call(drag);

var moveEnemies = function() {
  d3.selectAll(".circle")
    .transition()
      .ease("elastic")
      .duration(5000)
      .attr("x", function(d) {return d.x()})
      .attr("y", function(d) {return d.y()})
};

moveEnemies();

// var findDistance = function(enemy) {
//   var enemyX = enemy.getAttribute("cx");
//   var enemyY = enemy.getAttribute("cy");
//   var playerX = document.getElementsByClassName("player")[0].getAttribute("cx");
//   var playerY = document.getElementsByClassName("player")[0].getAttribute("cy");
//   return Math.sqrt(Math.pow((playerX - enemyX), 2) + Math.pow((playerY - enemyY), 2));
// };

var findDistance = function(enemy) {
  var enemyX = enemy.getAttribute("x");
  var enemyY = enemy.getAttribute("y");
  var playerX = document.getElementsByClassName("player")[0].getAttribute("cx");
  var playerY = document.getElementsByClassName("player")[0].getAttribute("cy");
  return Math.sqrt(Math.pow((playerX - enemyX), 2) + Math.pow((playerY - enemyY), 2));
};

var detectCollision = function(enemy) {
  var dist = findDistance(enemy);
  if (dist < 25) {
    return true;
  }
};


var detectCollisions = function() {
  _.each(document.getElementsByClassName("circle"), function(enemy) { //enemy should be an object with an x prop
    if (detectCollision(enemy)) {
      if (score > highScore) {
        highScore = score;
        d3.selectAll(".high")
          .text("High Score is: " + highScore);
      }
      collisions++;
      score = 0;
    }
  });
};

detectCollisions();

setInterval(detectCollisions, 100);

setInterval(function() {
  moveEnemies();
}, 5000);


var increaseScore = function() {
  score++;
  d3.selectAll(".current")
    .text("Current Score is: " + score);
};

setInterval(increaseScore, 50);












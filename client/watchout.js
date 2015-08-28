var gameBoardData = [{
  background: "MidnightBlue",
  height: '700px',
  width: '700px'
}];

var numEnemies = 30;

var playerData = [
  {
    x: '350px',
    y: '350px',
    color: 'yellow',
    sideLength: 20
  }
];

var drag = d3.behavior.drag()
  .on('drag', function() {
    player.attr('x', d3.event.x)
                   .attr('y', d3.event.y);
  });

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

var enemyData = _.map(_.range(0, numEnemies), function(item, key) {
  return {
    color: colors[Math.floor(Math.random() * colors.length)],
    id: key,
    x: function() { return Math.random() * 700 },
    y: function() { return Math.random() * 700 },
    radius: 10
  }
});

var board = d3.select("body").selectAll("svg").data(gameBoardData, function(d) {return d})
  .enter().append("svg")
    .style("width", function(d) {return d.width})
    .style("height", function(d) {return d.height})
    .style("background-color", function(d) {return d.background})

var enemies = d3.select("svg").selectAll("circle")
  .data(enemyData)
  .enter().append("circle")
    .attr("cx", function(d) {return d.x()})
    .attr("cy", function(d) {return d.y()})
    .attr("r", function(d) {return d.radius})
    .style("fill", function(d) {return d.color});

var player = d3.select("svg").selectAll("rect")
  .data(playerData)
  .enter().append("rect")
    .attr("x", function(d) {return d.x})
    .attr("y", function(d) {return d.y})
    .attr("width", function(d) {return d.sideLength})
    .attr("height", function(d) {return d.sideLength})
    .style("fill", function(d) {return d.color})
    .call(drag);

var moveEnemies = function() {
  d3.selectAll("circle")
    .transition()
      .ease("elastic")
      .duration(5000)
      .attr("cx", function(d) {return d.x()})
      .attr("cy", function(d) {return d.y()})
};

moveEnemies();

setInterval(function() {
  moveEnemies();
}, 5000);
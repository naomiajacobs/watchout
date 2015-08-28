var gameBoardData = [{
  background: "black",
  height: '700px',
  width: '700px'
}];

var numEnemies = 30;

var enemyData = _.map(_.range(0, numEnemies), function(item, key) {
  return {
    color: "blue",
    id: key,
    x: Math.random() * 700,
    y: Math.random() * 700,
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
    .attr("cx", function(d) {return d.x})
    .attr("cy", function(d) {return d.y})
    .attr("r", function(d) {return d.radius})
    .style("fill", function(d) {return d.color});
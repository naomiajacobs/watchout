var gameBoardData = [{
  background: "black",
  height: '500px',
  width: '500px'
}];

d3.select("body").selectAll("div").data(gameBoardData, function(d) {return d})
  .enter().append("div")
    .style("width", function(d) {return d.width})
    .style("height", function(d) {return d.height})
    .style("background-color", function(d) {return d.background});
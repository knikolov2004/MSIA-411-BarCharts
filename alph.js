var outerWidth = 600;
var outerHeight = 650;
var outerWidth2 = outerWidth*2
var margin = { left: 110, top: 16, right: 30, bottom: 85 };
var barPadding = 0.2;

var yColumn = "Name";
var xColumn = "Height";
var colorColumn = "Eye Color";

var innerWidth  = outerWidth  - margin.left - margin.right;
var innerHeight = outerHeight - margin.top  - margin.bottom;

var svg = d3.select("body").append("svg")
  .attr("width",  outerWidth2)
  .attr("height", outerHeight);
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var xAxisG = g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + innerHeight + ")");
var yAxisG = g.append("g")
  .attr("class", "y axis");

var xScale = d3.scale.linear().range([0, innerWidth], barPadding);
var yScale = d3.scale.ordinal().rangeBands([0, innerHeight]);
var colorScale = d3.scale.category10();


var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
  .ticks(5)
  .outerTickSize(0);
var yAxis = d3.svg.axis().scale(yScale).orient("left")
  .outerTickSize(0);

svg.append("circle").attr("cx",600).attr("cy",500).attr("r", 6).style("fill", "blue")
svg.append("circle").attr("cx",600).attr("cy",520).attr("r", 6).style("fill", "black")
svg.append("circle").attr("cx",600).attr("cy",540).attr("r", 6).style("fill", "#92421d")
svg.append("text").attr("x", 600).attr("y", 480).text("Eye Color").style("font-size","18px").attr("alignment-baseline","left")
svg.append("text").attr("x", 615).attr("y", 500).text("Blue").style("font-size","15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 615).attr("y", 520).text("Black").style("font-size","15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 615).attr("y", 540).text("Brown").style("font-size","15px").attr("alignment-baseline","middle")


	function render(data){

  if (data.Height == NaN) {
    data.Height = 0
  }
	console.log(data)

  data.sort(function(a,b) {
    return b.Height - a.Height })


  yScale.domain(data.map( function (d){ return d[yColumn]; }));
  xScale.domain([0, d3.max(data, function (d){ return d[xColumn]; })]);
  colorScale.domain(data.map(function (d){ return d[colorColumn]; }));

  yAxisG
    .call(yAxis)
    .selectAll("text");

  xAxisG.call(xAxis);

  var bars = g.selectAll("rect").data(data);
  bars.enter().append("rect")
    .attr("height", yScale.rangeBand());
  bars
    .attr("y", function (d){ return yScale(d[yColumn]); })
    .attr("x", function (d){ return xScale(d[-xColumn]/2); })
    .attr("width", function (d){ return  xScale(d[xColumn]); })
    .attr("fill", function (d){if (d[colorColumn].trim() == "Brown"){
    return "#92421d"} else {return d[colorColumn]}; });
  bars.exit().remove();
}

function type(d){
  d.Height = +d.Height;
  return d;
}
d3.csv("/data/eyecol.csv", render);

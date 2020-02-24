var outerWidth = 600;
var outerHeight = 350;
var outerWidth2 = outerWidth*2
var margin = { left: 120, top: 16, right: 30, bottom: 85 };
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

function render(data){

  data.sort(function(a,b) { return +b.Height - +a.Height })

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

d3.csv("https://raw.githubusercontent.com/myt00seven/msia-data-vis-data/master/AnonymousStudentNameHeightEye.csv", type, render);

var outerWidth = 600;
var outerHeight = 650;
var outerWidth2 = outerWidth*2 + 300
var margin = { left: 130, top: 30, right: 30, bottom: 85 };
var margin2 = { left: 850, top: 30, right: 30, bottom: 85 };
var barPadding = 0;

var yColumn = "Name";
var xColumn = "Height";
var colorColumn = "Eye Color";

var innerWidth  = outerWidth  - margin.left - margin.right;
var innerHeight = outerHeight - margin.top  - margin.bottom;

var svg = d3.select("body").append("svg")
  .attr("width",  outerWidth2)
  .attr("height", outerHeight);
// appending gridlines
svg.append("line").attr("x1",243).attr("y1",margin.top).attr("x2",243).attr("y2",565).style("stroke", "black")
svg.append("line").attr("x1",243+112).attr("y1",margin.top).attr("x2",243+112).attr("y2",565).style("stroke", "black")
svg.append("line").attr("x1",243+224).attr("y1",margin.top).attr("x2",243+224).attr("y2",565).style("stroke", "black")

svg.append("line").attr("x1",243+720).attr("y1",margin.top).attr("x2",243+720).attr("y2",565).style("stroke", "black")
svg.append("line").attr("x1",243+112+720).attr("y1",margin.top).attr("x2",243+112+720).attr("y2",565).style("stroke", "black")
svg.append("line").attr("x1",243+224+720).attr("y1",margin.top).attr("x2",243+224+720).attr("y2",565).style("stroke", "black")

//apending the barchart
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var g2 = svg.append("g")
        .attr("transform", "translate(" + margin2.left + "," + margin.top + ")");
var xAxisG = g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + innerHeight + ")");
var xAxisG2 = g2.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + innerHeight + ")");
var yAxisG = g.append("g")
  .attr("class", "y axis");
var yAxisG2 = g2.append("g")
  .attr("class", "y axis");


var xScale = d3.scale.linear().range([0, innerWidth], barPadding);
var yScale = d3.scale.ordinal().rangeBands([0, innerHeight]);
var colorScale = d3.scale.category10();

var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
  .ticks(5)
  .outerTickSize(0);
var yAxis = d3.svg.axis().scale(yScale).orient("left")
  .outerTickSize(0);

//appending x axes labels
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", innerWidth)
    .attr("y", innerHeight + 70)
    .style("font-size","20px")
    .text("Height (in cm)");

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", outerWidth2-350)
    .attr("y", innerHeight + 70)
    .style("font-size","20px")
    .text("Height (in cm)");

//appending y axes labels
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
		.attr("x", -200)
    .attr("y", 0)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .style("font-size","20px")
    .text("Names");

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
		.attr("x", -200)
    .attr("y", 720)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .style("font-size","20px")
    .text("Names");

//apending the titles
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", innerWidth)
    .attr("y", 20)
    .style("font-size","25px")
    .text("Student Height (sorted by height)");

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", outerWidth2-250)
    .attr("y", 20)
    .style("font-size","25px")
    .text("Student Height (sorted alphabetically)");

//appending the legend
svg.append("circle").attr("cx",600).attr("cy",500).attr("r", 6).style("fill", "blue")
svg.append("circle").attr("cx",600).attr("cy",520).attr("r", 6).style("fill", "black")
svg.append("circle").attr("cx",600).attr("cy",540).attr("r", 6).style("fill", "#92421d")
svg.append("text").attr("x", 600).attr("y", 480).text("Eye Color").style("font-size","18px").attr("alignment-baseline","left")
svg.append("text").attr("x", 615).attr("y", 500).text("Blue").style("font-size","15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 615).attr("y", 520).text("Black").style("font-size","15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 615).attr("y", 540).text("Brown").style("font-size","15px").attr("alignment-baseline","middle")

function render(data){
  data.sort(function(a,b) { return b.Height - a.Height })
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

function render_alph(data){
  data.sort((a, b) => d3.ascending(a.Name, b.Name))
  yScale.domain(data.map( function (d){ return d[yColumn]; }));
  xScale.domain([0, d3.max(data, function (d){ return d[xColumn]; })]);
  colorScale.domain(data.map(function (d){ return d[colorColumn]; }));
  yAxisG2
    .call(yAxis)
    .selectAll("text");
  xAxisG2.call(xAxis);
  var bars = g2.selectAll("rect").data(data);
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
d3.csv("https://raw.githubusercontent.com/knikolov2004/MSIA-411-BarCharts/master/data/eyecol.csv", render);
d3.csv("https://raw.githubusercontent.com/knikolov2004/MSIA-411-BarCharts/master/data/eyecol.csv", render_alph);

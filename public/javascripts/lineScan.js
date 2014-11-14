
var n = 40,
    random = d3.random.normal(0, .2),
    data = d3.range(n).map(random);
 
var margin = {top: 20, right: 20, bottom: 20, left: 50},
	width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
 
var x = d3.scale.linear()
    .domain([0, n - 1])
    .range([0, width]);
 
var y = d3.scale.linear()
	.domain([1,95000])
   // .domain([d3.min(data, function(d) {return d.value;}), d3.max(data, function(d) {return d.value;})])
    .range([height, 0]);
 
var line = d3.svg.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });
 
var svg = d3.select("#lineGraphDiv").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);
 
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.svg.axis().scale(x).orient("bottom"));
 
svg.append("g")
    .attr("class", "y axis")
    .call(d3.svg.axis().scale(y).orient("left"));
 
var path = svg.append("g")
    .attr("clip-path", "url(#clip)")
  .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
 

 
function tick( value ) {

 // var y = d3.scale.linear()
  //  .domain([d3.min(data, function(d) {return d.value;}), d3.max(data, function(d) {return d.value;})])
 //   .range([height, 0]);
	
  // push a new data point onto the back
 // data.push(random());
 // console.log('tick value: '+value);
 if (value >= 0) {
  data.push(+value);
 
	var ymin = d3.min(data);
	var ymax = d3.max(data);
	var axisMargin = (ymax-ymin)/10;
	var yminAxis = ymin - axisMargin;
	if (yminAxis < 0) yminAxis = 0;
	
  y.domain([yminAxis, ymax+axisMargin]);
 var newsvg = d3.select("#lineGraphDiv").transition();
 
 newsvg.select(".y.axis")
	.duration(500)
	.call(d3.svg.axis().scale(y).orient("left"));
  // redraw the line, and slide it to the left
  path
      .attr("d", line)
      .attr("transform", null)
    .transition()
      .duration(500)
      .ease("linear")
      .attr("transform", "translate(" + x(-1) + ",0)")
      .each("end", tick);
 
  // pop the old data point off the front
  data.shift();
  }
  // console.log("tick value in lineScan: "+value);
 
}
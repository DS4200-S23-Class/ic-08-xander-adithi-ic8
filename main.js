const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = (FRAME_HEIGHT - (MARGINS.top + MARGINS.bottom));
const VIS_WIDTH = (FRAME_WIDTH - (MARGINS.left + MARGINS.right));

// creating the frame
const FRAME1 = 
  d3.select("#vis1")
    .append("svg")
      .attr("height", FRAME_HEIGHT)
      .attr("width", FRAME_WIDTH)

d3.csv("data/data.csv").then((data) => {
  const MAX_Y = d3.max(data, (d) => {return d.Value;})

  const xScale = d3.scaleBand()
    .domain(data.map(function(d) {return d.Category;}))
    .range([MARGINS.left, VIS_WIDTH]);

  const yScale = d3.scaleLinear()
    .domain([0, MAX_Y*1.1])
    .range([0, VIS_HEIGHT])

  // adding the data points
  FRAME1.selectAll("points")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return xScale(d.Category); })
      .attr("y", function(d) { return yScale(d.Value); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return VIS_HEIGHT - yScale(d.Value); })
      .attr("class", "bar");

  // creating axis
  FRAME1.append("g")
    .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
    .call(d3.axisBottom(xScale))
    .call(d3.axisLeft(yScale).ticks(5));

});

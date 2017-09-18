var dataArray = [5,11,15];

var svg = d3.select('body')
  .append('svg')
  .attr('height', '100%')
  .attr('width', '100%');

// Rectangles
svg.selectAll('rect')
  // create an array of undefined values
  // create exit selection with length 0, link rectanges to datapoints
  .data(dataArray)
  // Create an enter selection and add the data points when there are less rectangles than datapoints,
  // added to exit selection if there are more rectagles than datapoints
  // append rectagles to enter selection
  .enter().append('rect')
  .attr('height', function(d,i) { return d*15; })
  .attr('width', '40')
  .attr('x', function(d, i) { return i*50 + 10; })
  .attr('y', function(d, i) { return 300 - (d*15); })
  .attr('rx', function(d, i) { return 2; })
  .attr('ry', function(d, i) { return 2; })
  .attr('fill', 'green');

// Circles
var newX = 200;
svg.selectAll('circle.first')
  .data(dataArray)
  .enter().append('circle')
  .attr("class", "first")
  .attr('cx', function(d, i) { newX += (d*3)+(i*20);  return newX; })
  .attr('cy', 100)
  .attr('r', function(d, i) { return d*3; })
  .attr('fill', 'blue');

// Circles already exist that match the given datapoints, so must add classes
var newX = 400;
svg.selectAll('circle.second')
  .data(dataArray)
  .enter().append('circle')
  .attr("class", "second")
  .attr('cx', function(d, i) { newX += (d*3)+(i*20);  return newX; })
  .attr('cy', 100)
  .attr('r', function(d, i) { return d*3; })
  .attr('fill', 'blue');

// Line
var newX = 200;
svg.selectAll('line')
  .data(dataArray)
  .enter().append('line')
  .attr('x1', newX)
  .attr('y1', function(d, i) { return 200 + (i*20); })
  .attr('x2', function(d, i) { newX += (d*15);  return newX; })
  .attr('y2', function(d, i) { return 200 + (i*20); })
  .attr('stroke-width', 2)
  // level 1
  .attr('stroke', 'blue')
  // css level 2
  // level 3
  // .style('stroke', 'purple');

// Text
var newY = 400;
svg.append('text')
  .attr('x', '0')
  .attr('y', '50')
  .attr('font-size', '30')
  .text('start');

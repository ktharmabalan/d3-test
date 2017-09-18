var dataArray = [];

var height = 50;
var width = 50;
var padding = 0;
var round = 5;
var scale = 1;
var minScale = .01;
var maxScale = 2;
var step = .05;

for(var p=0; p < 10; p++) {
  for(var q=0; q < 10; q++) {
    dataArray.push({
      x: p,
      y: q
    });
  }
}

var svg = d3.select('body')
  .append('svg')
  .attr('id', 'svg')
  .attr('height', '100%')
  .attr('width', '100%');

var tileGroup = svg.append('g').attr('class', 'tiles').attr('id', 'tiles').attr('transform', 'translate(0, 0)');

tileGroup.selectAll('rect.tiles')
  .data(dataArray)
  .enter().append('rect')
  .attr('class', 'tiles')
  .attr('x', function(d, i) { return (width*d.x) + (d.x*padding); })
  .attr('y', function(d, i) { return (height*d.y) + (d.y*padding); })
  .attr('width', width)
  .attr('height', height)
  .attr('rx', round)
  .attr('ry', round)
  .attr('fill', 'white')
  .attr('stroke', 'gray');

var svgItem = $("#svg");
var tileItems = $('#tiles');

svgItem.bind('mousewheel', function(e) {
  if (e.originalEvent.deltaY < 0 && (scale + step)  < maxScale) {
    scale += step;
    if(scale > maxScale) {
      scale = maxScale;
    }
  }
  // scale down/scroll down
  if (e.originalEvent.deltaY > minScale && (scale - step) > minScale) {
    scale -= step;
    if(scale < minScale) {
      scale = minScale;
    }
  }

  tileItems.css({'transform': 'scale(' + scale + ')'});
});

var selectItem = null;

svgItem.on('mousedown', function(e) {
  if(e.target.classList[0] === 'tiles') {
    selectItem = e;
  }
});

var bigTiles = [0];
svgItem.on('mouseup', function(e) {
  if(e.target.classList[0] === 'tiles') {
    var start = {};
    var end = {};

    console.log("START", selectItem.target.x.baseVal.value, selectItem.target.y.baseVal.value);
    console.log("END", e.target.x.baseVal.value, e.target.y.baseVal.value);

    if(e.target.x.baseVal.value < selectItem.target.x.baseVal.value) {
      // left
      start['x'] = e.target.x.baseVal.value;
      end['x'] = (selectItem.target.x.baseVal.value - e.target.x.baseVal.value) + width;
    } else {
      // moving right
      start['x'] = selectItem.target.x.baseVal.value;
      end['x'] = (e.target.x.baseVal.value - selectItem.target.x.baseVal.value) + width;
    }

    if(e.target.y.baseVal.value < selectItem.target.y.baseVal.value) {
      start['y'] = e.target.y.baseVal.value;
      end['y'] = (selectItem.target.y.baseVal.value - e.target.y.baseVal.value) + height;
    } else {
      start['y'] = selectItem.target.y.baseVal.value;
      end['y'] = (e.target.y.baseVal.value - selectItem.target.y.baseVal.value) + height;
    }

    bigTiles.push(0);
    tileGroup.selectAll('rect.bigTile')
      .data(bigTiles)
      .enter().append('rect')
      .attr('class', 'bigTile')
      .attr('x', start['x'])
      .attr('y', start['y'])
      .attr('width', end['x'])
      .attr('height', end['y'])
      .attr('rx', round)
      .attr('ry', round)
      .attr('fill', 'rgba(128, 128, 128, 0.7)')
      .attr('stroke', 'gray');
    selectItem = null;
  }
});
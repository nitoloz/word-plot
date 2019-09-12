import * as d3 from 'd3';
import * as d3Tip from 'd3-tip';
import { Utils } from './utils';

const margin = {top: 50, right: 50, bottom: 50, left: 100};

export function wordPlotD3() {

  const initialConfiguration = {
    width: 1000,
    height: 600,
    data: [],
    xAxisProperty: 'xCoordinate',
    yAxisProperty: 'yCoordinate',
    trellisingProperty: 'color',
    xAxisLabel: 'Pain/Symptoms',
    yAxisLabel: 'Scientific Speak',
    tooltipFormatter: (d) => {
      return `Pain/Symptoms: ${d.xCoordinate}<br>
            Scientific Speak ${d.yCoordinate}<br>
            Name: ${d.text}<br>`;
    }
  };

  const markers = [
    {text: 'EMERGENT', x: 5, y: 10, color: '#ef999c'},
    {text: 'DOMINANT', x: 10, y: 10, color: '#cfcbd2'}
  ];

  let width = initialConfiguration.width,
    height = initialConfiguration.height,
    data = initialConfiguration.data,
    xAxisLabel = initialConfiguration.xAxisLabel,
    yAxisLabel = initialConfiguration.yAxisLabel,
    xAxisProperty = initialConfiguration.xAxisProperty,
    yAxisProperty = initialConfiguration.yAxisProperty,
    trellisingProperty = initialConfiguration.trellisingProperty,
    tooltipFormatter = initialConfiguration.tooltipFormatter;
  let updateData,
    zoomIn, zoomOut, resetZoom,
    forceNodesData,
    toggleXAxis, toggleYAxis, toggleTitle, changeTicksStyle = null;

  let xAxisVisible = true;
  let yAxisVisible = true;
  let titleVisible = true;
  let solidAxisTicks = true;

  function chart(selection) {
    selection.each(function () {
      data = data.filter(d => parseFloat(d[yAxisProperty]) > 0 && parseFloat(d[xAxisProperty]) > 0);
      let yAxisValues = data.map(d => parseFloat(d[yAxisProperty]));
      let xAxisValues = data.map(d => parseFloat(d[xAxisProperty]));

      const xScale = d3.scaleLinear()
        .domain([
          d3.min([0, d3.min(xAxisValues)]),
          d3.max([0, d3.max(xAxisValues)])
        ]).range([margin.left, width - margin.right]);
      let zoomedXScale = xScale;

      const yScale = d3.scaleLinear()
        .domain([
          d3.min([d3.min(yAxisValues)]),
          d3.max([d3.max(yAxisValues)])
        ])
        .range([height - margin.bottom, margin.top]);
      let zoomedYScale = yScale;

      const svg = selection.append('svg')
        .attr('height', height)
        .attr('width', width)
        .append('g');

      // Clippath in order to prevent points from being visible outside of chart area
      // https://developer.mozilla.org/ru/docs/Web/CSS/clip-path
      svg.append('defs').append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const xAxis = d3.axisBottom(xScale)
        .tickSize(-height + margin.top + margin.bottom)
        .tickSizeOuter(0);

      const gXAxis = svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${(height - margin.top)})`)
        .call(xAxis);

      Utils.appendXAxisTitle(gXAxis, width / 2, 15, xAxisLabel);

      const yAxis = d3.axisLeft(yScale)
        .tickSize(-width + margin.left + margin.right)
        .tickSizeOuter(0);

      const gYAxis = svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);

      Utils.appendYAxisTitle(gYAxis, -height / 2, -25, yAxisLabel);

      Utils.appendTitle(svg, width / 2, margin.top / 2, `${yAxisLabel} vs ${xAxisLabel}`);

      // Zoom setup
      const zoom = d3.zoom()
        .scaleExtent([1 / 2, 20])
        .extent([[0, 0], [width, height]])
        .filter(function () {
          return d3.event.type === 'touchstart'
            ? false : d3.event.type === 'wheel'
              ? d3.event.ctrlKey : true;
        })
        .on('zoom', zoomed)
        .on('end', zoomEnd);

      function zoomed() {
        zoomedXScale = d3.event.transform.rescaleX(xScale);
        zoomedYScale = d3.event.transform.rescaleY(yScale);
        if (xAxisVisible) {
          gXAxis.call(xAxis.scale(zoomedXScale));
        }
        if (yAxisVisible) {
          gYAxis.call(yAxis.scale(zoomedYScale));
        }
        Utils.styleAxisTicks(svg, solidAxisTicks);

        // labelsG.selectAll('.text-data').data(data)
        //   .attr('x', d => zoomedXScale(parseFloat(d[xAxisProperty])))
        //   .attr('y', d => zoomedYScale(parseFloat(d[yAxisProperty])));
        labelsG.selectAll('.text-headers').data(markers)
          .attr('x', d => zoomedXScale(parseFloat(d.x)))
          .attr('y', d => zoomedYScale(parseFloat(d.y)));
      }

      function zoomEnd() {
        // zoomedXScale = d3.event.transform.rescaleX(xScale);
        // zoomedYScale = d3.event.transform.rescaleY(yScale);
        forceNodesData = getForceNodesData();
        simulation.nodes(forceNodesData);
        simulation.alpha(3).restart();
      }

      const zoomHost = svg.append('rect')
        .attr('class', 'zoom-rect')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .call(zoom);

      const tooltip = d3Tip()
        .attr('class', 'd3-tip')
        .offset([-5, 0])
        .html(tooltipFormatter);

      svg.call(tooltip);

      const labelsG = svg.append('g')
        .attr('clip-path', 'url(#clip)');

      labelsG.selectAll('.text-headers')
        .data(markers)
        .enter()
        .append('text')
        .attr('class', 'text-headers')
        .attr('x', d => xScale(parseFloat(d.x)))
        .attr('y', d => yScale(parseFloat(d.y)))
        .style('text-anchor', 'end')
        .attr('font-size', '20')
        .attr('fill', (d) => d.color)
        .text(d => d.text);

      forceNodesData = getForceNodesData();

      labelsG.selectAll('.text-data')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'text-data')
        .attr('x', d => xScale(parseFloat(d[xAxisProperty])))
        .attr('y', d => yScale(parseFloat(d[yAxisProperty])))
        .text(d => d.text)
        .on('mouseover', function (d) {
          tooltip.show(d, this);
        })
        .on('mouseout', function () {
          tooltip.hide();
        });

      function ticked() {
        labelsG.selectAll('.text-data')
          .data(forceNodesData)
          .transition()
          .ease(d3.easeLinear)
          .duration(100)
          .attr('x', function (d) {
            return d.x;
          })
          .attr('y', function (d) {
            return d.y;
          });
      }

      const repelForce = d3.forceManyBody().strength(-150).distanceMax(100).distanceMin(0);
      // const attractForce = d3.forceManyBody().strength(50).distanceMax(200).distanceMin(100);
      const simulation = d3.forceSimulation(forceNodesData)
        .alphaDecay(0.15)
        // .force('attractForce', attractForce)
        .force('repelForce', repelForce)
        .on('tick', ticked);

      function getForceNodesData() {
        return data.map(d => {
          return Object.assign(d, {
            x: zoomedXScale(parseFloat(d[xAxisProperty])),
            y: zoomedYScale(parseFloat(d[yAxisProperty]))
          });
        });
      }

      // const scatterPlotLegend = stackedLegendD3()
      //     .colorScale(colorScale)
      //     .data(colorScale.domain());
      //
      // svg.append('g')
      //     .attr('transform', `translate(${width - 120}, 0)`)
      //     .call(scatterPlotLegend);

      updateData = function () {
        data = data.filter(d => parseFloat(d[yAxisProperty]) > 0 && parseFloat(d[xAxisProperty]) > 0);
        yAxisValues = data.map(d => parseFloat(d[yAxisProperty]));
        xAxisValues = data.map(d => parseFloat(d[xAxisProperty]));

        const xScaleMin = d3.min([0, d3.min(xAxisValues)]);
        const xScaleMax = d3.max([0, d3.max(xAxisValues)]);
        xScale.domain([xScaleMin - xScaleMin * 0.1, xScaleMax + xScaleMax * 0.1]);

        xAxis.scale(xScale);

        const yScaleMin = d3.min([d3.min(yAxisValues)]);
        const yScaleMax = d3.max([d3.max(yAxisValues)]);
        yScale.domain([yScaleMin - yScaleMin * 0.1, yScaleMax + yScaleMax * 0.1]);

        yAxis.scale(yScale);

        const t = d3.transition().duration(750);

        if (xAxisVisible) {
          gXAxis.transition(t).call(xAxis);
        }

        if (yAxisVisible) {
          gYAxis.transition(t).call(yAxis);
        }
        Utils.styleAxisTicks(svg, solidAxisTicks);

        const updatedHeaders = labelsG.selectAll('.text-headers').data(markers);
        updatedHeaders
          .transition()
          .ease(d3.easeLinear)
          .duration(100)
          .attr('x', d => xScale(parseFloat(d[xAxisProperty])))
          .attr('y', d => yScale(parseFloat(d[yAxisProperty])));

        const updatedPoints = labelsG.selectAll('.text-data').data(data);
        updatedPoints
          .enter()
          .append('text')
          .attr('class', 'text-data')
          .attr('x', d => xScale(parseFloat(d[xAxisProperty])))
          .attr('y', d => yScale(parseFloat(d[yAxisProperty])))
          .text(d => d.text)
          .on('mouseover', function (d) {
            tooltip.show(d, this);
          })
          .on('mouseout', function () {
            tooltip.hide();
          });

        updatedPoints
          .transition()
          .ease(d3.easeLinear)
          .duration(750)
          .attr('x', d => xScale(parseFloat(d[xAxisProperty])))
          .attr('y', d => yScale(parseFloat(d[yAxisProperty])));

        updatedPoints.exit()
          .transition()
          .ease(d3.easeLinear)
          .duration(100)
          .remove();

        if (titleVisible) {
          svg.select('.title').text(`${yAxisLabel} vs ${xAxisLabel}`);
        }

        if (xAxisVisible) {
          svg.select('.x.axis.label').text(xAxisLabel);
        }

        if (yAxisVisible) {
          svg.select('.y.axis.label').text(yAxisLabel);
        }

        forceNodesData = getForceNodesData();
        simulation.nodes(forceNodesData);
        resetZoom();
      };

      zoomIn = function () {
        zoom.scaleBy(zoomHost.transition().duration(750), 2);
      };

      zoomOut = function () {
        zoom.scaleBy(zoomHost.transition().duration(750), 0.5);
      };

      resetZoom = function () {
        zoom.scaleTo(zoomHost.transition().duration(750), 0.9);
      };

      toggleXAxis = function () {
        xAxisVisible = !xAxisVisible;
        const xAxisSelection = svg.select('.x.axis').selectAll('*');
        if (xAxisSelection.empty()) {
          gXAxis.call(xAxis.scale(zoomedXScale));
          Utils.appendXAxisTitle(gXAxis, width / 2, 15, xAxisLabel);
        } else {
          xAxisSelection.remove();
        }
        Utils.styleAxisTicks(svg, solidAxisTicks);
      };

      toggleYAxis = function () {
        yAxisVisible = !yAxisVisible;
        const yAxisSelection = svg.select('.y.axis').selectAll('*');
        if (yAxisSelection.empty()) {
          gYAxis.call(yAxis.scale(zoomedYScale));
          Utils.appendYAxisTitle(gYAxis, -height / 2, -25, yAxisLabel);
        } else {
          yAxisSelection.remove();
        }
        Utils.styleAxisTicks(svg, solidAxisTicks);
      };

      toggleTitle = function () {
        titleVisible = !titleVisible;
        if (titleVisible) {
          svg.select('.title').text(`${yAxisLabel} vs ${xAxisLabel}`);
        } else {
          svg.select('.title').text(``);
        }
      };

      changeTicksStyle = function () {
        solidAxisTicks = !solidAxisTicks;
        Utils.styleAxisTicks(svg, solidAxisTicks);
      };

    });
  }

  chart.width = function (value) {
    if (!arguments.length) return width;
    width = value;
    return chart;
  };

  chart.height = function (value) {
    if (!arguments.length) return height;
    height = value;
    return chart;
  };

  chart.xAxisLabel = function (value) {
    if (!arguments.length) return xAxisLabel;
    xAxisLabel = value;
    return chart;
  };

  chart.yAxisLabel = function (value) {
    if (!arguments.length) return yAxisLabel;
    yAxisLabel = value;
    return chart;
  };

  chart.xAxisProperty = function (value) {
    if (!arguments.length) return xAxisProperty;
    xAxisProperty = value;
    return chart;
  };

  chart.yAxisProperty = function (value) {
    if (!arguments.length) return yAxisProperty;
    yAxisProperty = value;
    return chart;
  };

  chart.trellisingProperty = function (value) {
    if (!arguments.length) return trellisingProperty;
    trellisingProperty = value;
    return chart;
  };

  chart.tooltipFormatter = function (value) {
    if (!arguments.length) {
      return tooltipFormatter;
    } else {
      if (value == null) {
        tooltipFormatter = initialConfiguration.tooltipFormatter;
      } else {
        tooltipFormatter = value;
      }
      return chart;
    }
  };

  chart.data = function (value) {
    if (!arguments.length) return data;
    data = value;
    if (typeof updateData === 'function') updateData();
    return chart;
  };

  chart.zoomIn = function () {
    if (typeof zoomIn === 'function') zoomIn();
    return chart;
  };

  chart.zoomOut = function () {
    if (typeof zoomOut === 'function') zoomOut();
    return chart;
  };

  chart.resetZoom = function () {
    if (typeof resetZoom === 'function') resetZoom();
    return chart;
  };

  chart.toggleXAxis = function () {
    if (typeof toggleXAxis === 'function') toggleXAxis();
    return chart;
  };

  chart.toggleYAxis = function () {
    if (typeof toggleYAxis === 'function') toggleYAxis();
    return chart;
  };

  chart.toggleTitle = function () {
    if (typeof toggleTitle === 'function') toggleTitle();
    return chart;
  };

  chart.changeTicksStyle = function () {
    if (typeof changeTicksStyle === 'function') changeTicksStyle();
    return chart;
  };

  return chart;
}

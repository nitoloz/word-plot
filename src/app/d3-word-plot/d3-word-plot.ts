import * as d3 from 'd3'
import {Utils} from "./utils";

const margin = {top: 50, right: 50, bottom: 50, left: 100};
const height = 600;
const width = 1000;

export function wordPlotD3() {

  let initialConfiguration = {
    width: 1000,
    height: 600,
    data: [],
    xAxisProperty: 'x',
    yAxisProperty: 'y',
    trellisingProperty: 'color',
    xAxisLabel: 'Pain/Symptoms',
    yAxisLabel: 'Scientific Speak',
    tooltipFormatter: (d) => {
      return ``;
    }
  };

  let width = initialConfiguration.width,
    height = initialConfiguration.height,
    data = initialConfiguration.data,
    xAxisLabel = initialConfiguration.xAxisLabel,
    yAxisLabel = initialConfiguration.yAxisLabel,
    xAxisProperty = initialConfiguration.xAxisProperty,
    yAxisProperty = initialConfiguration.yAxisProperty,
    trellisingProperty = initialConfiguration.trellisingProperty,
    tooltipFormatter = initialConfiguration.tooltipFormatter;
  let updateData = null;

  function chart(selection) {
    selection.each(function () {
      data = data.filter(d => parseInt(d[yAxisProperty]) > 0 && parseInt(d[xAxisProperty]) > 0);
      let yAxisValues = data.map(d => parseInt(d[yAxisProperty]));
      let xAxisValues = data.map(d => parseInt(d[xAxisProperty]));

      const xScale = d3.scaleLinear()
        .domain([
          d3.min([0, d3.min(xAxisValues)]),
          d3.max([0, d3.max(xAxisValues)])
        ]).range([margin.left, width - margin.right]);

      const yScale = d3.scaleLinear()
        .domain([
          d3.min([d3.min(yAxisValues)]),
          d3.max([d3.max(yAxisValues)])
        ])
        .range([height - margin.bottom, margin.top]);

      const svg = selection.append('svg')
        .attr('height', height)
        .attr('width', width)
        .append("g");

      //Clippath in order to prevent points from being visible outside of chart area
      //https://developer.mozilla.org/ru/docs/Web/CSS/clip-path
      svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom)
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const xAxis = d3.axisBottom(xScale)
        .tickSize(-height + margin.top + margin.bottom)
        .tickSizeOuter(0);

      const gXAxis = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${(height - margin.top)})`)
        .call(xAxis);

      const yAxis = d3.axisLeft(yScale)
      // .tickFormat((d:any) => `EUR ${d / 1000}K`)
        .tickSize(-width + margin.left + margin.right)
        .tickSizeOuter(0);

      const gYAxis = svg.append("g")
        .attr("class", "y axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);

      Utils.appendXAxisTitle(gXAxis, width / 2, 15, xAxisLabel);
      Utils.appendYAxisTitle(gYAxis, -height/2, -25, yAxisLabel);
      Utils.appendTitle(svg, width / 2, margin.top / 2, `${yAxisLabel} vs ${xAxisLabel}`);

      //Zoom setup
      const zoom = d3.zoom()
        .scaleExtent([1 / 2, 10])
        .extent([[0, 0], [width, height]])
        .filter(function () {
          return d3.event.type === 'touchstart'
            ? false : d3.event.type === 'wheel'
              ? d3.event.ctrlKey : true;
        })
        .on("zoom", zoomed);

      function zoomed() {
        let newXScale = d3.event.transform.rescaleX(xScale);
        let newYScale = d3.event.transform.rescaleY(yScale);
        gXAxis.call(xAxis.scale(newXScale));
        gYAxis.call(yAxis.scale(newYScale));
        labelsG.selectAll('text').data(data)
          .attr('x', d => newXScale(parseInt(d[xAxisProperty])))
          .attr('y', d => newYScale(parseInt(d[yAxisProperty])));
      }

      svg.append("rect")
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .call(zoom);
      //
      // const tooltip = d3.tip()
      //     .attr("class", "d3-tip")
      //     .offset([-8, 0])
      //     .html(tooltipFormatter);
      //
      // svg.call(tooltip);

      const labelsG = svg.append("g")
        .attr("clip-path", "url(#clip)");

      labelsG.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', d => xScale(parseInt(d[xAxisProperty])))
        .attr('y', d => yScale(parseInt(d[yAxisProperty])))
        .text(d => d.text);
      // .attr('r', '5')
      // .attr('stroke', 'grey')
      // .attr('stroke-width', 1)
      // .attr('fill', d => colorScale(d[trellisingProperty]))
      // .on('mouseover', (d) => {
      //     d3.select(this)
      //         .transition()
      //         .duration(100)
      //         .attr('r', 10)
      //         .attr('stroke-width', 3);
      //     tooltip.show(d);
      // })
      // .on('mouseout', () => {
      //     d3.select(this)
      //         .transition()
      //         .duration(100)
      //         .attr('r', 5)
      //         .attr('stroke-width', 1);
      //     tooltip.hide();
      // });

      // const scatterPlotLegend = stackedLegendD3()
      //     .colorScale(colorScale)
      //     .data(colorScale.domain());
      //
      // svg.append("g")
      //     .attr("transform", `translate(${width - 120}, 0)`)
      //     .call(scatterPlotLegend);

      updateData = function () {
        data = data.filter(d => parseInt(d[yAxisProperty]) > 0 && parseInt(d[xAxisProperty]) > 0);
        yAxisValues = data.map(d => parseInt(d[yAxisProperty]));
        xAxisValues = data.map(d => parseInt(d[xAxisProperty]));

        xScale.domain([
          d3.min([0, d3.min(xAxisValues)]),
          d3.max([0, d3.max(xAxisValues)])]);

        xAxis.scale(xScale);

        yScale.domain([
          d3.min([d3.min(yAxisValues)]),
          d3.max([d3.max(yAxisValues)])
        ]);

        yAxis.scale(yScale);

        const t = d3.transition()
          .duration(750);

        gXAxis.transition(t)
          .call(xAxis);

        gYAxis.transition(t)
          .call(yAxis);

        const updatedPoints = labelsG.selectAll('text').data(data);

        updatedPoints
          .enter()
          .append('text')
          .attr('x', d => xScale(parseInt(d[xAxisProperty])))
          .attr('y', d => yScale(parseInt(d[yAxisProperty])))
          .text(d => d.text);
        // .attr('r', '5')
        // .attr('stroke', 'grey')
        // .attr('stroke-width', 1)
        // .attr('fill', d => colorScale(d[trellisingProperty]))
        // .on('mouseover', function (d) {
        //     d3.select(this)
        //         .transition()
        //         .duration(100)
        //         .attr('r', 10)
        //         .attr('stroke-width', 3);
        //     tooltip.show(d);
        // })
        // .on('mouseout', function () {
        //     d3.select(this)
        //         .transition()
        //         .duration(100)
        //         .attr('r', 5)
        //         .attr('stroke-width', 1);
        //     tooltip.hide();
        // });

        updatedPoints
          .transition()
          .ease(d3.easeLinear)
          .duration(750)
          .attr('x', d => xScale(parseInt(d[xAxisProperty])))
          .attr('y', d => yScale(parseInt(d[yAxisProperty])))

        updatedPoints.exit()
          .transition()
          .ease(d3.easeLinear)
          .duration(100)
          .remove();

        svg.select('.title').text(`${yAxisLabel} vs ${xAxisLabel}`);
        svg.select('.x.axis.label').text(xAxisLabel);
        svg.select('.y.axis.label').text(yAxisLabel);
      };
    })
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

  // chart.colorScale = function (value) {
  //     if (!arguments.length) return colorScale;
  //     colorScale = value;
  //     return chart;
  // };

  chart.tooltipFormatter = function (value) {
    if (!arguments.length) {
      return tooltipFormatter
    }
    else {
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

  return chart;
}

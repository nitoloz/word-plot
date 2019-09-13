export class Utils {

  static appendXAxisTitle(selection, x, y, text) {
    selection.append('text')
      .attr('class', 'label x axis')
      .attr('y', y)
      .attr('x', x)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .style('font-size', '14')
      .style('fill', 'black')
      .text(text);
  }

  static appendYAxisTitle(selection, x, y, text) {
    selection.append('text')
      .attr('class', 'label y axis')
      .attr('transform', 'rotate(-90)')
      .attr('x', x)
      .attr('y', y)
      .attr('dy', '.71em')
      .style('font-size', '14')
      .style('fill', 'black')
      .style('text-anchor', 'middle')
      .text(text);
  }

  static appendTitle(selection, x, y, text) {
    selection.append('text')
      .attr('class', 'title')
      .attr('x', x)
      .attr('y', y)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('text-decoration', 'underline')
      .text(text);
  }

  static styleAxisTicks(svg, solidAxisTicks) {
    svg.selectAll('.tick line').style('stroke-dasharray', solidAxisTicks ? null : '5 5');
  }

  static changeYAxisGridVisibility(svg, yAxisGridVisible) {
    svg.select('.y.axis')
      .selectAll('.tick line')
      .attr('stroke', yAxisGridVisible ? 'rgba(0, 0, 0, 0.1)' : null)  }

  static changeXAxisGridVisibility(svg, xAxisGridVisible) {
    svg.select('.x.axis')
      .selectAll('.tick line')
      .attr('stroke', xAxisGridVisible ? 'rgba(0, 0, 0, 0.1)' : null)  }
}

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
        selection.append("text")
            .attr('class', 'title')
            .attr("x", x)
            .attr("y", y)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(text);
    }
}

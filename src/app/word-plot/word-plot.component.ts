import {AfterViewInit, Component, OnInit} from '@angular/core';
import {wordPlotD3} from "../d3-word-plot/d3-word-plot";
// import {Utils} from "../d3-word-plot/utils";
import * as d3 from 'd3'

@Component({
  selector: 'app-word-plot',
  templateUrl: './word-plot.component.html',
  styleUrls: ['./word-plot.component.scss']
})
export class WordPlotComponent implements AfterViewInit {
  salaryScatterChart: any;
  data = [
    {x: "2", y: "1.1", text: "Software-Engineer"},
    {x: "37", y: "2", text: "It support engineer"},
    {x: "32", y: "3.5", text: "Sr. QA"}, {x: "", y: "80000", text: "DevOps"},
    {x: "39", y: "6", text: "Java Developer"},
    {x: "30", y: "2.7", text: "C++ Developer"}, {x: "", y: "60000", text: "C++ developer"},
    {x: "34", y: "5", text: "Team manager"},
    {x: "32", y: "8", text: "Tech lead"},
    {x: "23", y: "3", text: "Senior Software Engineer (Ruby)"},
    {x: "3", y: "6.7", text: "QA Manager"},
    {x: "9", y: "1", text: "Frontend Developer"},
    {x: "35", y: "4", text: "Sr. JS developer"},
    {x: "1", y: "8", text: "C++/C# Developer"},
    {x: "30", y: "9", text: "Frontend Developer"},
    {x: "32", y: "10", text: "PHP Developer"},
    {x: "42", y: "7", text: "SAP Berater"},
    {x: "23", y: "2.9", text: "Senior Software Engineer (Ruby)"},
    {x: "27", y: "4.6", text: ".NET"},
    {x: "43", y: "6.3", text: "Project Manager"},
    {x: "32", y: "6", text: "QA Manager"},
    {x: "30", y: "3", text: "Software Development Engineer"},
    {x: "34", y: "2", text: "Software Engineer"},
    {x: "27", y: "8.5", text: "Senior Android Engineer"},
    {x: "25", y: "1.9", text: "Java/Node.js developer"},
    {x: "31", y: "3", text: "C++ Senior Software Developer"},
    {x: "32", y: "7", text: "Senior Software Engeneer"},
    {x: "27", y: "9", text: "JS Developer"},
    {x: "4", y: "5", text: "team lead"},
    {x: "", y: "7.3", text: "Data Science"}];

  constructor() {
  }

  ngAfterViewInit() {
    this.salaryScatterChart = wordPlotD3();
    this.salaryScatterChart.height(600);
    this.salaryScatterChart.width(1000);

    d3.select("#word-plot-area")
      .call(this.salaryScatterChart);

    this.salaryScatterChart.data(this.data)
  }

}

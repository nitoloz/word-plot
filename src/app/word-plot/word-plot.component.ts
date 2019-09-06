import {AfterViewInit, Component, OnInit} from '@angular/core';
import {scatterPlotD3} from "../d3-word-plot/d3-word-plot";
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
    {"x": "", "y": "48000", "text": "Software-Engineer"},
    {
    "x": "37",
    "y": "45000",
    "text": "It support engineer"
  }, {"x": "32", "y": "60000", "text": "Sr. QA"}, {"x": "", "y": "80000", "text": "DevOps"}, {
    "x": "39",
    "y": "75000",
    "text": "Java Developer"
  }, {"x": "30", "y": "55000", "text": "C++ Developer"}, {"x": "", "y": "60000", "text": "C++ developer"}, {
    "x": "34",
    "y": "82000",
    "text": "Team manager"
  }, {"x": "32", "y": "75000", "text": "Tech lead"}, {
    "x": "23",
    "y": "73000",
    "text": "Senior Software Engineer (Ruby)"
  }, {"x": "", "y": "66000", "text": "QA Manager"}, {"x": "", "y": "74000", "text": "Frontend Developer"}, {
    "x": "35",
    "y": "60000",
    "text": "Sr. JS developer"
  }, {"x": "", "y": "63000", "text": "C++/C# Developer"}, {
    "x": "30",
    "y": "60000",
    "text": "Frontend Developer"
  }, {"x": "32", "y": "65000", "text": "PHP Developer"}, {"x": "42", "y": "60000", "text": "SAP Berater"}, {
    "x": "23",
    "y": "73000",
    "text": "Senior Software Engineer (Ruby)"
  }, {"x": "27", "y": "53000", "text": ".NET"}, {"x": "43", "y": "70000", "text": "Project Manager"}, {
    "x": "32",
    "y": "67300",
    "text": "QA Manager"
  }, {"x": "30", "y": "75000", "text": "Software Development Engineer"}, {
    "x": "34",
    "y": "68000",
    "text": "Software Engineer"
  }, {"x": "27", "y": "50400", "text": "Senior Android Engineer"}, {
    "x": "25",
    "y": "50000",
    "text": "Java/Node.js developer"
  }, {"x": "31", "y": "65000", "text": "C++ Senior Software Developer"}, {
    "x": "32",
    "y": "66000",
    "text": "Senior Software Engeneer"
  }, {"x": "27", "y": "65000", "text": "JS Developer"}, {"x": "", "y": "70000", "text": "team lead"}, {
    "x": "",
    "y": "85000",
    "text": "Data Science"
  }];

  constructor() {
  }

  ngAfterViewInit() {
    this.salaryScatterChart = scatterPlotD3();
    this.salaryScatterChart.height(600);
    this.salaryScatterChart.width(1000);

    d3.select("#scatter-chart-area")
      .call(this.salaryScatterChart);

    this.salaryScatterChart.data(this.data)
  }

}

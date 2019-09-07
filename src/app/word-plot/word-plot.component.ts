import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {wordPlotD3} from "../d3-word-plot/d3-word-plot";
import * as d3 from 'd3'

@Component({
  selector: 'app-word-plot',
  templateUrl: './word-plot.component.html',
  styleUrls: ['./word-plot.component.scss']
})
export class WordPlotComponent implements AfterViewInit, OnChanges {
  salaryScatterChart: any;
  @ViewChild('chartWrapper', {static: false}) chartWrapper: ElementRef;

  @Input() plotData: any[];

  constructor() {
    this.salaryScatterChart = wordPlotD3();
    this.salaryScatterChart.height(600);
    this.salaryScatterChart.width(1000);
  }

  ngAfterViewInit() {
    d3.select(this.chartWrapper.nativeElement)
      .call(this.salaryScatterChart);
    if (this.plotData) {
      this.salaryScatterChart.data(this.plotData)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['plotData'] && this.plotData && this.salaryScatterChart) {
      this.salaryScatterChart.data(this.plotData)
    }
  }

  zoomIn() {
    if (this.salaryScatterChart) {
      this.salaryScatterChart.zoomIn();
    }
  }

  zoomOut() {
    if (this.salaryScatterChart) {
      this.salaryScatterChart.zoomOut();
    }
  }

  resetZoom() {
    if (this.salaryScatterChart) {
      this.salaryScatterChart.resetZoom();
    }
  }

}

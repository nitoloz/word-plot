import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WordPlotComponent} from './word-plot.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('WordPlotComponent', () => {
  let component: WordPlotComponent;
  let fixture: ComponentFixture<WordPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordPlotComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

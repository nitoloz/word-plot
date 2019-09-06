import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordPlotComponent } from './word-plot.component';

describe('WordPlotComponent', () => {
  let component: WordPlotComponent;
  let fixture: ComponentFixture<WordPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordPlotComponent ]
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

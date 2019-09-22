import {Component, OnInit} from '@angular/core';
import {PlotData} from './word-plot/word-plot.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  private symptoms = ['night_blindness', 'diplopia', 'nearsighted', 'myokymia', 'presbyopia', 'acanthamoeba', 'chalazion', 'pinguecula',
    'macula_edema', 'dry_eye', 'keratokonus', 'conjunctivitis', 'retimoblastoma', 'retinal detachment', 'myopia', 'glaucoma', 'retinopathy',
    'uveitis', 'blepharitis', 'ptosis', 'keratitis', 'diabetic retinopathy', 'aging_eye', 'macular_edema', 'pterygium',
    'macular_degeneration', 'bad_vision'];

  public data: PlotData[] = [];

  ngOnInit () {
    this.data = this.symptoms.map(text => {
      return {xCoordinate: Math.random() * 10, yCoordinate: Math.random() * 10, text};
    });
  }

  changeData () {
    this.data = this.symptoms.map(text => {
      return {xCoordinate: Math.random() * 10, yCoordinate: Math.random() * 10, text: text.slice(1)};
    });
  }

}

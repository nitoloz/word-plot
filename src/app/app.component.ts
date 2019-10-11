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
    'macular_degeneration', 'bad_vision', 'bloating', 'cough', 'diarrhea', 'dizziness', 'fatigue', 'fever', 'headache', 'muscle_cramp',
    'nausea', 'knee pain', 'low back pain', 'wheezing', 'night_blindness_test', 'diplopia_test', 'nearsighted_test', 'myokymia_test',
    'presbyopia_test', 'acanthamoeba_test', 'chalazion_test', 'pinguecula_test', 'macula_edema_test', 'dry_eye_test', 'keratokonus_test',
    'conjunctivitis_test', 'retimoblastoma_test', 'retinal detachment_test', 'myopia_test', 'glaucoma_test', 'retinopathy_test',
    'uveitis_test', 'blepharitis_test', 'ptosis_test', 'keratitis_test', 'diabetic retinopathy_test', 'aging_eye_test',
    'macular_edema_test', 'pterygium_test', 'macular_degeneration_test', 'bad_vision_test', 'bloating_test', 'cough_test', 'diarrhea_test',
    'dizziness_test', 'fatigue_test', 'fever_test', 'headache_test', 'muscle_cramp_test', 'nausea_test', 'knee pain_test',
    'low back pain_test', 'wheezing_test'];

  public data: PlotData[] = [];

  ngOnInit() {
    this.data = this.symptoms.map(text => {
      return {xCoordinate: Math.random() * 10, yCoordinate: Math.random() * 10, text};
    });
  }

  changeData() {
    this.data = this.symptoms.map(text => {
      return {xCoordinate: Math.random() * 10, yCoordinate: Math.random() * 10, text: text};
    });
  }

}

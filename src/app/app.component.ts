import {Component} from '@angular/core';
import {PlotData} from './word-plot/word-plot.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public data: PlotData[] = [
    {xCoordinate: '1', yCoordinate: '1.1', text: 'night_blindness'},
    {xCoordinate: '3.7', yCoordinate: '2', text: 'diplopia'},
    {xCoordinate: '3.2', yCoordinate: '3.5', text: 'nearsighted'},
    {xCoordinate: '6.2', yCoordinate: '3', text: 'myokymia'},
    {xCoordinate: '9.3', yCoordinate: '6', text: 'presbyopia'},
    {xCoordinate: '3', yCoordinate: '2.7', text: 'acanthamoeba'},
    {xCoordinate: '3.7', yCoordinate: '7.2', text: 'chalazion'},
    {xCoordinate: '4.2', yCoordinate: '5', text: 'pinguecula'},
    {xCoordinate: '2.3', yCoordinate: '8', text: 'macula_edema'},
    {xCoordinate: '6', yCoordinate: '6.7', text: 'dry_eye'},
    {xCoordinate: '8', yCoordinate: '1', text: 'keratokonus'},
    {xCoordinate: '7.5', yCoordinate: '4', text: 'conjunctivitis'},
    {xCoordinate: '1.9', yCoordinate: '8', text: 'retimoblastoma'},
    {xCoordinate: '5.9', yCoordinate: '9', text: 'retinal detachment'},
    {xCoordinate: '7.6', yCoordinate: '10', text: 'myopia'},
    {xCoordinate: '6.3', yCoordinate: '7', text: 'glaucoma'},
    {xCoordinate: '7.2', yCoordinate: '4.6', text: 'retinopathy'},
    {xCoordinate: '4.1', yCoordinate: '6.3', text: 'uveitis'},
    {xCoordinate: '6', yCoordinate: '6', text: 'blepharitis'},
    {xCoordinate: '8', yCoordinate: '3', text: 'ptosis'},
    {xCoordinate: '5', yCoordinate: '2', text: 'keratitis'},
    {xCoordinate: '7.1', yCoordinate: '8.5', text: 'diabetic retinopathy'},
    {xCoordinate: '9.1', yCoordinate: '1.9', text: 'aging_eye'},
    {xCoordinate: '4', yCoordinate: '7', text: 'macular_edema'},
    {xCoordinate: '6', yCoordinate: '9', text: 'pterygium'},
    {xCoordinate: '2', yCoordinate: '5', text: 'macular_degeneration'},
    {xCoordinate: '2', yCoordinate: '7.3', text: 'bad_vision'}
  ];

}

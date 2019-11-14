## Word plot
Chart allow user to display an array of words and zoom to every word using double click, mouse wheel + `Ctrl` 
or buttons located above the plot.

Labels positioning is performed using simulated annealing implemented within the [D3-Labeler](https://github.com/tinker10/D3-Labeler) library.

### Technologies
 Project is built using following frameworks and visualization libraries:
 * angular v8.2.4;
 * d3.js v5.11.0;
 * d3-tip v0.7.1
 
Word plot is drawn by `word-plot` component. `word-plot` component has a single input parameter - `plotData` of type `PlotData[]` 
where `PlotData` has 3 parameters: `xCoordinate`, `yCoordinate` and `text` corresponding to XY coordinates 
and text that should be displayed. All manipulations with SVG elements are done within files located in `d3-word-plot` folder.
 
## Install and run

In order to install all dependencies run `npm install` from the root folder (where `package.json` is stored).
After that run `npm run start` to start a development server and open `http://localhost:4200/` in browser.
 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Deploy

Run `ng deploy` to deploy the project to Github pages.

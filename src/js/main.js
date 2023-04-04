import '../scss/index.scss'

import { AppModel } from './model/app.model';
import { AppPresenter } from './presenter/app.presenter';


let model = new AppModel();
let presenter = new AppPresenter();

model.init();
presenter.init(model);



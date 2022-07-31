import './style.css';
import { renderAllBlocks } from './views/renderApp';
import { listenEvent } from './controllers/catchEvents';
import { updateGarage } from './model/manageGarage';
import './model/createRandomCar';

renderAllBlocks();

await updateGarage();

listenEvent();








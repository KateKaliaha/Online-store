import './style.css';
import { renderAllBlocks } from './views/renderApp';
import { listenEvent } from './controllers/catchEvents';
import { updateGarage } from './model/manageGarage';

renderAllBlocks();

await updateGarage();

listenEvent();








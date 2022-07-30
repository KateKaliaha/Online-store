import './style.css';
import './views/renderApp';
import './model/manageGarage';
import './views/renderGarage';
import './controllers/catchEvents';
import {renderApp} from './views/renderApp';
import {listenEvent} from './controllers/catchEvents';

renderApp();

listenEvent();








import App from './components/app/app';
import './global.css';
import { scrollFunction, topFunction } from './components/controller/buttonScroll';

const app: App = new App();
app.start();

window.onscroll = function (): void {
    scrollFunction();
};

const topBtn = document.getElementById('myBtn');
topBtn?.addEventListener('click', topFunction);

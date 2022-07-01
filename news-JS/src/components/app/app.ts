import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DataArticle, DataSources } from '../controller/interfaces';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: DataArticle) => this.view.drawNews(data))
        );
        this.controller.getSources((data: DataSources): void => this.view.drawSources(data));
    }
}

export default App;

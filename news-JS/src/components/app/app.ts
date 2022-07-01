import AppController from '../controller/controller';
import { AppView } from '../view/appView';
interface article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
interface DataArticle {
    status: string;
    totalResults: number;
    articles: Array<article>;
}

interface source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
interface DataSources {
    status: string;
    sources: Array<source>;
}
class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: DataArticle) => this.view.drawNews(data))
        );
        this.controller.getSources((data: DataSources): void => this.view.drawSources(data));
    }
}

export default App;

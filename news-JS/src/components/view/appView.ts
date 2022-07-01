import News from './news/news';
import Sources from './sources/sources';
import { source, DataSources, article, DataArticle } from '../controller/interfaces';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: DataArticle) {
        const values: article[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: DataSources) {
        const values: source[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

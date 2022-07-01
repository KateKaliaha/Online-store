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

    public drawNews(data: Partial<DataArticle>): void {
        const values: article[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Partial<DataSources>): void {
        const values: source[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

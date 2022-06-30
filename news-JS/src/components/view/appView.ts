import News from './news/news';
import Sources from './sources/sources';
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

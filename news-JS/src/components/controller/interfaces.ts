export interface Result {
    ok: boolean;
    status: number;
    statusText: string;
    json: () => Promise<string>;
}

export interface article {
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
export interface DataArticle {
    status: string;
    totalResults: number;
    articles: Array<article>;
}

export interface source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
export interface DataSources {
    status: string;
    sources: Array<source>;
}

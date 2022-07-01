import { Result } from './interfaces';

class Loader {
    baseLink: string;
    options: Record<string, string>;

    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: { endpoint: string; options?: Record<string, string> },
        callback: (data: T) => void = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        void this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Result): Result | never {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string>, endpoint: string): string {
        const urlOptions: Record<string, string> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }
    load<T>(method: string, endpoint: string, callback: (data: T) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => (<Response>res).json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;

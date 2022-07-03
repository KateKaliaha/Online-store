import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '08ab426d825742b293c8231e24d0a958', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;

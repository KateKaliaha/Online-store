import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '09a659ea28d346a4b74415ac6bd1e634', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;

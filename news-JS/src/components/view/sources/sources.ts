import './sources.css';
import { source } from '../../controller/interfaces';

class Sources {
    public draw(data: Readonly<source[]>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        const fragment1 = document.createDocumentFragment();
        const fragment2 = document.createDocumentFragment();
        const fragment3 = document.createDocumentFragment();
        const fragment4 = document.createDocumentFragment();
        const fragment5 = document.createDocumentFragment();
        data.forEach((item: source) => {
            const sourceClone = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;
            (sourceClone.querySelector('.source__item-name') as HTMLTemplateElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLTemplateElement).setAttribute('data-source-id', item.id);
            if (item.category === 'general') {
                fragment.append(sourceClone);
            } else if (item.category === 'business') {
                fragment1.append(sourceClone);
            } else if (item.category === 'technology') {
                fragment2.append(sourceClone);
            } else if (item.category === 'sports') {
                fragment3.append(sourceClone);
            } else if (item.category === 'entertainment') {
                fragment4.append(sourceClone);
            } else {
                fragment5.append(sourceClone);
            }
        });
        (document.querySelector('.general') as HTMLTemplateElement).append(fragment);
        (document.querySelector('.business') as HTMLTemplateElement).append(fragment1);
        (document.querySelector('.technology') as HTMLTemplateElement).append(fragment2);
        (document.querySelector('.sports') as HTMLTemplateElement).append(fragment3);
        (document.querySelector('.entertainment') as HTMLTemplateElement).append(fragment4);
        (document.querySelector('.health-science') as HTMLTemplateElement).append(fragment5);
    }
}

export default Sources;

import { arrSellers, arrTypeChair, arrColors, arrPopular, filters} from './filters';
import { sliderQuantity, sliderPrice} from './slider';
import { arrSortValue, getSort} from './sort';
import { filterQuality } from './filters';
import { renderContent, goods, content} from './content';
import { getChangeInBasket, findActiveCards } from './basket';

const btnReset = document.querySelector('.reset-filters');

  btnReset?.addEventListener('click', () => {
    arrColors.length = 0;
    arrTypeChair.length = 0;
    arrSellers.length = 0;
    arrPopular.length = 0;
    filters.forEach((filter) => 
     { (filter as HTMLInputElement).checked = false;}
    );
    sliderQuantity.noUiSlider?.reset();
    sliderPrice.noUiSlider?.reset();
    filterQuality.length = 0;
    renderContent(goods, content);
    getSort(arrSortValue);
    getChangeInBasket();
    findActiveCards();
  });



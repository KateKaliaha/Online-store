import { arrSellers, arrTypeChair, arrColors, arrPopular, filters} from './filters';
import { sliderQuantity, sliderPrice} from './slider';
import { arrSortValue, getSort, select} from './sort';
import { arrAllFilters, newArr } from './filters';
import { renderContent, goods, content} from './content';
import { getChangeInBasket, findActiveCards } from './basket';
import { input } from './search';

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
  arrAllFilters.length = 0;
  newArr.length = 0;
  input.value = '';
  renderContent(goods, content);
  if (arrSortValue.length !== 0) {
  select.dispatchEvent(new Event('change'));
  getSort(arrSortValue);
  }
  getChangeInBasket();
  findActiveCards();
});




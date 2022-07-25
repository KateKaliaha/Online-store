import { arrSellers, arrTypeChair, arrColors, arrPopular, filters, findButton, resetArrAllFilters } from './filters';
import { sliderQuantity, sliderPrice, changeStyles} from './slider';
import { arrSortValue, select} from './sort';
import { input } from './search';
import { renderContent,goods, content, goodsCopy} from './content';
import { countGoodsBasket, resetBasket} from './basket';

const btnClearAll = document.querySelector('.reset-all');

btnClearAll?.addEventListener('click', () => {
  arrTypeChair.length = 0;
  arrSellers.length = 0;
  arrPopular.length = 0;
  arrColors.length = 0;
  countGoodsBasket === 0;
  filters.forEach((filter) => {
    (filter as HTMLInputElement).checked = false;}
  );
  input.value = '';
  sliderQuantity.noUiSlider?.reset();
  sliderPrice.noUiSlider?.reset();
  arrSortValue.length = 0;
  select.selectedIndex= 0;
  select.dispatchEvent(new Event('change'));
  changeStyles(goodsCopy.length);
  (document.querySelector('.phrase') as HTMLSpanElement).style.display = 'none';
  (document.querySelector('.content') as HTMLElement).style.display = '';
  renderContent(goods, content);
  resetBasket();
  resetArrAllFilters ();
  localStorage.clear();
  findButton();
});

import { arrSellers, arrTypeChair, arrColors, arrPopular, setLocalStorage} from './filters';
import { sliderQuantity, sliderPrice, changeStyles} from './slider';
import { arrSortValue, getSort, select} from './sort';
import { resetArrAllFilters} from './filters';
import { renderContent, goods, content, catalogGoods} from './content';
import { applyChangeInBasket, findActiveCards } from './basket';
import { input } from './search';

const btnReset = document.querySelector('.reset-filters');

btnReset?.addEventListener('click', () => {
  arrColors.length = 0;
  arrTypeChair.length = 0;
  arrSellers.length = 0;
  arrPopular.length = 0;
  sliderQuantity.noUiSlider?.reset();
  sliderPrice.noUiSlider?.reset();
  localStorage.setItem('arrMinMaxSliders', JSON.stringify([1, 15, 100, 1500]));
  resetArrAllFilters();
  input.value = '';
  renderContent(goods, content);

  document.querySelectorAll('.filter-checkbox').forEach((filter) => {
    (filter as HTMLInputElement).checked = false;
  });

  if (arrSortValue.length !== 0) {
    if (arrSortValue[0] !== 'empty') {
      select.dispatchEvent(new Event('change'));
      getSort(arrSortValue);
    }
  }

  setLocalStorage();
  changeStyles(catalogGoods.length);
  findActiveCards();
  applyChangeInBasket (document.querySelectorAll('.good-btn'));
});

import { arrSellers, arrTypeChair, arrColors, arrPopular, filters} from './filters';
import { sliderQuantity, sliderPrice} from './slider';
import { arrSortValue, select} from './sort';
import { input } from './search';
import { arrAllFilters } from './filters';
import { renderContent,goods, content} from './content';
import { countGoodsBasket, resetBasket } from './basket';

const btnClearAll = document.querySelector('.reset-all');

btnClearAll?.addEventListener('click', () => {
  arrColors.length = 0;
  arrTypeChair.length = 0;
  arrSellers.length = 0;
  arrPopular.length = 0;
  countGoodsBasket === 0;
  filters.forEach((filter) => {
    (filter as HTMLInputElement).checked = false;}
  );
  input.value = '';
  sliderQuantity.noUiSlider?.reset();
  sliderPrice.noUiSlider?.reset();
  arrAllFilters .length = 0;
  arrSortValue.length = 0;
  select.selectedIndex= 0;
  select.dispatchEvent(new Event('change'));
  renderContent(goods, content);
  resetBasket();

  localStorage.clear();
});



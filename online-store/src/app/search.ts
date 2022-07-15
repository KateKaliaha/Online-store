const input= document.getElementById('q') as HTMLInputElement;
export const phrase = document.querySelector('.phrase') as HTMLBaseElement;
const contentCard = document.querySelector('.content') as HTMLBaseElement;
const filterSearch = function (): void {
  input?.addEventListener('keyup', () => onSearch());
  input?.addEventListener('click', () => {
    input.addEventListener('search', onClear);
    setTimeout(() => input.removeEventListener('search', onClear));
  });
};


function onClear() {
  if (input.value === '') {
    const filterElement = document.querySelectorAll('.card h3');
    filterElement.forEach((el) => {
      const content = el.closest('.card') as HTMLBaseElement;
      content.style.display = '';
      phrase.style.display = 'none';
      contentCard.style.display = '';
    });
  }
}

 function onSearch(): void {
  const filterElement = document.querySelectorAll('.card h3');
  const filter: string = input?.value.toLocaleLowerCase();
  filterElement.forEach((el) => {
    const content = el.closest('.card') as HTMLBaseElement;
    if (el.innerHTML.toLocaleLowerCase().indexOf(filter) > -1 ) {
      content.style.display = '';
      phrase.style.display = 'none';
      contentCard.style.display = '';
    } else {
      content.style.display = 'none';
      phrase.style.display = 'block';
      contentCard.style.display = 'none';
    }
  });
 }

filterSearch();
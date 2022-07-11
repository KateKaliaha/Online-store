const input= document.getElementById('q') as HTMLInputElement;

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
    } else {
      content.style.display = 'none';
    }
  });
 }

filterSearch();
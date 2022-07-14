const select = document.querySelector('.sort-list') as HTMLSelectElement;

select.addEventListener('change', function() {
  if (this.value === 'price-up') {
    sort('data-price','price-up');
  }
  if(this.value === 'price-down') {
    sort('data-price', 'price-down');
  }
  if(this.value === 'alphabet-up') {
    sort('data-name', 'alphabet-up');
  }
  if(this.value === 'alphabet-down') {
    sort('data-name', 'alphabet-down');
  }
});

function sort(sortType: string, valueSelect:string) {
  const content = document.querySelector('.content') as Element;
  for (let i = 0; i < content?.children.length; i++) {
    for (let j = i; j < content?.children.length; j++) {
      if(content.children[i].getAttribute(sortType) !== null) {
        if (valueSelect === 'price-up') {
          if(+(content.children[i].getAttribute(sortType) as string) > +(content.children[j].getAttribute(sortType) as string)) {
          const replacedNode = content.replaceChild(content.children[j], content.children[i]);
          insertAfter(replacedNode, content.children[i]);
          }
        }
        if (valueSelect === 'alphabet-up') {
          if((content.children[i].getAttribute(sortType) as string) > (content.children[j].getAttribute(sortType) as string)) {
            const replacedNode = content.replaceChild(content.children[j], content.children[i]);
            insertAfter(replacedNode, content.children[i]);
          }
        }
        if (valueSelect === 'price-down') {
          if(+(content.children[i].getAttribute(sortType) as string) < +(content.children[j].getAttribute(sortType) as string)) {
            const replacedNode = content.replaceChild(content.children[j], content.children[i]);
            insertAfter(replacedNode, content.children[i]);
          }
        }
        if (valueSelect === 'alphabet-down') {
          if((content.children[i].getAttribute(sortType) as string) < (content.children[j].getAttribute(sortType) as string)) {
            const replacedNode = content.replaceChild(content.children[j], content.children[i]);
            insertAfter(replacedNode, content.children[i]);
          }
        }
      }
    }
  }
}

function insertAfter(elem: Element, refElem: Element) {
  return refElem.parentNode?.insertBefore(elem, refElem.nextSibling);
}



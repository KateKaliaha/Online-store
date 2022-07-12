const select = document.querySelector('.sort-list') as HTMLSelectElement;
select.addEventListener('change', function(){
  if (this.value === 'price-up') {
    sortUpNumber('data-price');
  }
  if(this.value === 'price-down') {
    sortDownNumber('data-price');
  }
  if(this.value === 'alphabet-up') {
    sortUpLetter('data-name');
  }
  if(this.value === 'alphabet-down') {
    sortDownLetter('data-name');
  }
});

function sortUpNumber(sortType: string) {
  const content = document.querySelector('.content') as Element;
  for (let i = 0; i < content?.children.length; i++) {
    for (let j = i; j < content?.children.length; j++) {
      if(content.children[i].getAttribute(sortType) !== null) {
        if(+(content.children[i].getAttribute(sortType) as string) > +(content.children[j].getAttribute(sortType) as string)) {
        const replacedNode = content.replaceChild(content.children[j], content.children[i]);
        insertAfter(replacedNode, content.children[i]);
        }
      }
    }
  }
}

function sortUpLetter(sortType: string) {
  const content = document.querySelector('.content') as Element;
  for (let i = 0; i < content?.children.length; i++) {
    for (let j = i; j < content?.children.length; j++) {
      if(content.children[i].getAttribute(sortType) !== null) {
        if((content.children[i].getAttribute(sortType) as string) > (content.children[j].getAttribute(sortType) as string)) {
        const replacedNode = content.replaceChild(content.children[j], content.children[i]);
        insertAfter(replacedNode, content.children[i]);
        }
      }
    }
  }
}

function sortDownNumber(sortType: string) {
  const content = document.querySelector('.content') as Element;
  for (let i = 0; i < content?.children.length; i++) {
    for (let j = i; j < content?.children.length; j++) {
      if(content.children[i].getAttribute(sortType) !== null) {
        if(+(content.children[i].getAttribute(sortType) as string) < +(content.children[j].getAttribute(sortType) as string)) {
          const replacedNode = content.replaceChild(content.children[j], content.children[i]);
          insertAfter(replacedNode, content.children[i]);
        }
      }
    }
  }
}

function sortDownLetter(sortType: string) {
  const content = document.querySelector('.content') as Element;
  for (let i = 0; i < content?.children.length; i++) {
    for (let j = i; j < content?.children.length; j++) {
      if(content.children[i].getAttribute(sortType) !== null) {
        if((content.children[i].getAttribute(sortType) as string) < (content.children[j].getAttribute(sortType) as string)) {
          const replacedNode = content.replaceChild(content.children[j], content.children[i]);
          insertAfter(replacedNode, content.children[i]);
        }
      }
    }
  }
}

function insertAfter(elem: Element, refElem: Element) {
  return refElem.parentNode?.insertBefore(elem, refElem.nextSibling);
}



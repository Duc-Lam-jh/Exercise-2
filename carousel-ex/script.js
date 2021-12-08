const data = ["./images/Diluc.png",
              "./images/Mona.png",
              "./images/Qiqi.png",
              "./images/Xiao.png",
              "./images/Tartaglia.png",
              "./images/Hutao.png"];
const length = data.length;

function LoadItemsIntoCarousel(){
  data.forEach((element, index) => {
    const item = document.createElement('div');
    item.classList.add('item');

    const id = 'slide-' + index;
    item.setAttribute('id', id)
    if(index == 0){
      item.classList.add('active');
    }
    if(index == 1){
      item.classList.add('right');
    }
    if(index == length - 1){
      item.classList.add('left');
    }
    item.style.backgroundImage = "url('" + element + "')";

    const items = document.getElementById('carousel-items');
    items.appendChild(item);
  })
}

function CarouselButtonClick(direction){
  let previous, next;
  let current = document.getElementsByClassName('item active')[0].id;
  const currItem = document.getElementById(current);
  
  //get the current item's index
  current = current.split('-')[1];
  current = parseInt(current);
  console.log(current);

  //check if start of array
  if(current == 0){
    previous = length - 1;
    next = 1;
  }
  else if (current == length - 1){
    previous = current - 1;
    next = 0;
  }
  else {
    previous = current - 1;
    next = current + 1;
  }

  const prevID = 'slide-' + previous;
  const nextID = 'slide-' + next;

  console.log(prevID, nextID);

  const prevItem = document.getElementById(prevID);
  const nextItem = document.getElementById(nextID);
  
  prevItem.classList.remove('left');
  currItem.classList.remove('active');
  nextItem.classList.remove('right');

  switch (direction){
    case 'prev':
      GoToItem(previous);
      break;
    case 'next':
      GoToItem(next);
      break;
  }
}

function GoToItem(current){
  let prev, next;
  console.log(current);

  if(current == 0){
    prev = length - 1;
    next = 1;
  }
  else if (current == length - 1){
    prev = current - 1;
    next = 0;
  }
  else {
    prev = current - 1;
    next = current + 1;
  }
  console.log(prev, next);

  const prevID = 'slide-' + prev;
  const currID = 'slide-' + current;
  const nextID = 'slide-' + next;

  const prevItem = document.getElementById(prevID);
  const currItem = document.getElementById(currID);
  const nextItem = document.getElementById(nextID);

  prevItem.classList.add('left');
  nextItem.classList.add('right');
  currItem.classList.add('active');
}


function PrevItem(){
  let prev;
  let current = document.getElementsByClassName('item active')[0].id;
  const currItem = document.getElementById(current);
  
  //get the current item's index
  current = current.split('-')[1];

  //check if start of array
  if(current == 0){
    prev = length - 1;
  }
  else{
    prev = parseInt(current) - 1;
  }
  
  const prevID = 'slide-' + prev;
  console.log(prevID);
  const prevItem = document.getElementById(prevID);
  
  currItem.classList.remove('active');
  prevItem.classList.add('active');
}

function NextItem(){
  let next;
  let current = document.getElementsByClassName('item active')[0].id;
  const currItem = document.getElementById(current);
  
  //get the current item's index
  current = current.split('-')[1];

  //check if end of array
  if(current == length - 1){
    next = 0;
  }
  else{
    next = parseInt(current) + 1;
  }
  
  const nextID = 'slide-' + next;
  const nextItem = document.getElementById(nextID);
  
  currItem.classList.remove('active');
  nextItem.classList.add('active');

}


LoadItemsIntoCarousel();
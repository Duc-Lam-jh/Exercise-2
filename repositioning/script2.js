function SetUpMoveable () {
	//get items that are marked moveable
	const items = [ ...document.getElementsByClassName('moveable') ];
	//console.log(items);

	//add event to each of them
	items.forEach(item => {
		DragItem(item);
	});
}

function RemoveMoveable(){
  //get items that are marked moveable
	const items = [ ...document.getElementsByClassName('moveable') ];
	//console.log(items);

	//add event to each of them
	items.forEach(item => {
		item.removeEventListener('onmousedown', function(){});
	});
}

function DragItem (item) {
  const parent = item.parentElement;

  //set click listener
	item.onmousedown = function (event) {
    //turn on mouse down flag
    this.isDown = true;
    //get starting mouse coords
		this.mouseOldX = event.clientX;
		this.mouseOldY = event.clientY;
    //get sizes of element and its parent's
    this.height = this.offsetHeight;
    this.width = this.offsetWidth;
    this.parentHeight = parent.offsetHeight;
    this.parentWidth = parent.offsetWidth;
    
    //set starting style if it isnt already a number
		if (isNaN(parseInt(this.style.left))) {
			this.style.left = this.offsetLeft + 'px';
		}
		if (isNaN(parseInt(this.style.top))) {
			this.style.top = this.offsetTop + 'px';
		}
	};

  //set mouse move listener
	item.onmousemove = function (event) {
    //if mouse down flag is true = mouse is dragging
		if (this.isDown) {
      //calculate the length of mouse's path
			const dX = event.clientX - this.mouseOldX,
				    dY = event.clientY - this.mouseOldY;

      //calculate new coords of element
      let newLeft = parseInt(this.style.left) + dX;
      let newTop = parseInt(this.style.top) + dY;
      
      //if it's out of bounds horizontally
      if(newLeft > 0){
        newLeft = 0;
      }
      else if(newLeft < -(this.width - this.parentWidth)){
        newLeft = -(this.width - this.parentWidth);
      }

      //if it's out of bounds vertically
      if(newTop > 0){
        newTop = 0;
      }
      else if(newTop < -(this.height - this.parentHeight)){
        newTop = -(this.height - this.parentHeight);
      }

      //apply the new position
			this.style.left = newLeft + 'px';
			this.style.top = newTop + 'px';

      //reset the starting mouse coords to the current coords
			this.mouseOldX = event.clientX;
			this.mouseOldY = event.clientY;
		}
	};

  //set mouse up listener
	item.onmouseup = function (event) {
    //remove mouse down flag
		this.isDown = false;
	};
}

function ToggleReposition(){
  if(!document.getElementsByClassName("non-moveable")[0].classList.contains("moveable")){
    document.getElementsByClassName("non-moveable")[0].classList.add("moveable");
    SetUpMoveable();
  }
  else{
    document.getElementsByClassName("non-moveable")[0].classList.remove("moveable");
    RemoveMoveable();
  }
}

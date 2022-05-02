document.body.appendChild(createLayout());

const getDataButton = document.querySelector(".get-data");
const spanCount = document.querySelector(".counter");
const ol = document.querySelector("ol");


getDataButton.addEventListener("click", handler);


function createLi(res){
    ol.textContent = "";
    ol.setAttribute("start", (Number(spanCount.textContent) * 20 - 19));
    res.results.forEach(el => {
        const li = document.createElement("li");
        li.classList.add("li-item");
        li.textContent = el.name;
        ol.appendChild(li);
    });
}



class Field{
    #element
    arr = [];
    constructor(){
        this.#element = document.createElement("div");
        this.#element.classList.add("field")

    }
    
    createCells(){
        for(let i = 0; i < 100; i++){
            this.arr.push(new Cell(i).render());
        }
    }


    renderCells(){
        this.createCells();
        this.arr.map(item => this.#element.appendChild(item));
    }

    renderField(){
        this.renderCells();
        return this.#element;
    }

    returnArr(){
        return this.arr
    }
}

class Cell{
    #element
    defaultClass = "cell"
    constructor(_class){
        this.#element = document.createElement("div");
        this.#element.classList.add(this.defaultClass);
        this.#element.setAttribute("data-id", _class);       
    }

    render(){
        return this.#element;
    }
}

class Snake{
    constructor(){
        this.x = 6;
        this.y = 6;
        this.speedX = 1;
        this.speedY = 10;
    }

    #moveUp(){
        if(this.y > 0) this.x -= this.speedY;
    }

    #moveDown(){
        if(this.y <= 90) this.x += this.speedY;
    }

    #moveRight(){
        if(this.x > 0) this.x += this.speedX;
    }

    #moveLeft(){
        if(this.x <= 90) this.x -= this.speedX;
    }

    move(direction){
        if(direction === "up") this.#moveUp();
        if(direction === "down") this.#moveDown();
        if(direction === "left") this.#moveLeft();
        if(direction === "right") this.#moveRight();
    }
}

function game(){
    const snake = new Snake();

    let head = document.querySelector(`.cell[data-id='${snake.x}']`);

    head.classList.add("red");
    document.addEventListener("keydown", (e)=>{
        if(e.keyCode === 38){
            snake.move("up");
            head.classList.remove("red")
            head = document.querySelector(`.cell[data-id='${snake.x}']`);
            head.classList.add("red")
        }
        if(e.keyCode === 39){
            snake.move("right");
            head.classList.remove("red")
            head = document.querySelector(`.cell[data-id='${snake.x}']`);
            head.classList.add("red")
        }
        if(e.keyCode === 40){
            snake.move("down");
            head.classList.remove("red")
            head = document.querySelector(`.cell[data-id='${snake.x}']`);
            head.classList.add("red")
        }
        if(e.keyCode === 37){
            snake.move("left");
            head.classList.remove("red")
            head = document.querySelector(`.cell[data-id='${snake.x}']`);
            head.classList.add("red")
        }
    })
}

const fild = new Field();
document.body.appendChild(fild.renderField());
game()


class Field{
    #element
    arr = [];
    constructor(){
        this.#element = document.createElement("div");
        this.#element.classList.add("field")

    }
    
    createCells(){
        for(let i = 1; i < 101; i++){
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
    constructor(head){
        this.x = 6;
        this.speedX = 1;
        this.speedY = 10;
        this.dir = "";
        this.snake = [this.x]; 
        this.maxLength = 5;
    }

    #moveUp(){
        if(this.x > 10) {
            this.dir = "up";
            this.x -= this.speedY
        };
    }

    #moveDown(){
        if(this.x <= 90) {
            this.dir = "down"
            this.x += this.speedY;
        }
    }

    #moveRight(){
        if(this.x%10 != 0) {
            this.dir = "Right";
            this.x += this.speedX;
        }
    }

    #moveLeft(){
        if(this.x%10 != 1) {
            this.x -= this.speedX;
            this.dir = "Left";
        }
    }

    #moveSnake(arr,x){
        arr.unshift(x);
        const oldHead = document.querySelector(`.cell[data-id='${arr[arr.length-1]}']`);
        if(this.maxLength < arr.length){
            oldHead.classList.remove("red");
            arr.pop();
        }
        const newHead = document.querySelector(`.cell[data-id='${arr[0]}']`);
        newHead.classList.add("red");
    }

    move(direction){
        if(direction === "up") {
            this.#moveUp()
            this.#moveSnake(this.snake,this.x);
        };
        if(direction === "down") {
            this.#moveDown();
            this.#moveSnake(this.snake,this.x);
        }
        if(direction === "left") {
            this.#moveLeft();
            this.#moveSnake(this.snake,this.x);
        }
        if(direction === "right") {
            this.#moveRight();
            this.#moveSnake(this.snake,this.x);
        }
    }





}

function game(){
    const snake = new Snake();
    let head = document.querySelector(`.cell[data-id='${snake.x}']`);

    head.classList.add("red");
    document.addEventListener("keydown", (e)=>{
        if(e.keyCode === 38){
            snake.move("up");
        }
        if(e.keyCode === 39){
            snake.move("right");
        }
        if(e.keyCode === 40){
            snake.move("down");
        }
        if(e.keyCode === 37){
            snake.move("left");
        }
    })
}

const fild = new Field();
document.body.appendChild(fild.renderField());
game()


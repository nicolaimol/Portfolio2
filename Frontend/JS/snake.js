
class Snake2 {

    constructor(name) {
        this.body = [];
        this.dir = [];
        this.x = Math.floor(Math.random() * 710) + 5;
        this.y = Math.floor(Math.random() * 490) + 5;
        this.body[0] = new Point(this.x, this.y);
        this.dir[0] = new Point(0, 0)
        this.xdir = 0;
        this.ydir = 0;
        this.size = 0;
        this.score = 0;
        this.rgb = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.name = name;
        this.counter = 1;
    }

    setDir(x, y) {
        this.xdir = x;
        this.ydir = y;
        this.dir[this.dir.length - 1] = { x: this.xdir, y: this.ydir };
    }

    show() {

        textSize(8);
        fill(this.rgb[0], this.rgb[1], this.rgb[2]);
        text(this.name, this.body[this.body.length - 1].x, this.body[this.body.length - 1].y);


        for (let i = 0; i < this.body.length; i++) {
            fill(this.rgb[0], this.rgb[1], this.rgb[2]);
            noStroke();
            rect(this.body[i].x, this.body[i].y, 5, 5, 2)
        }

    }

    update() {

        let head = this.body[this.body.length - 1];
        this.x += this.xdir;
        this.y += this.ydir;
        head.x += this.xdir;
        head.y += this.ydir;

        for (let i = 0; i < this.body.length - 1; i++) {
            this.body[i].x += this.dir[i + 1].x;
            this.body[i].y += this.dir[i + 1].y;
            if (this.counter % 6 === 0) {
                this.dir[i] = this.dir[i + 1].copy();
            }

        }
        if (this.counter % 6 === 0) { 
            this.counter = 1;
        }

    }

    grow() {

        let tail = this.body[0].copy();
        let tailDir = this.dir[0].copy();
        /*
        head.x += this.xdir * 5;
        head.y += this.ydir * 5;
        this.x += this.xdir * 5;
        this.y += this.ydir * 5;
        this.body.push(head);
        this.dir.push(headDir);
        */
        tail.x -= 5 * tailDir.x;
        tail.y -= 5 * tailDir.y;
        this.body.unshift(tail);
        this.dir.unshift(tailDir);
        this.len++;
    }


    checkDead() {
        //console.log(this.x + " " + this.y);
        if (this.x < 0 || this.x > 720 || this.y < 0 || this.y > 500) {
            return true;
        }
        return false;
    }

    hitSnake(snake) {
        let i = 0;
        for (i; i < snake.body.length; i++) {
            if (this.x - 2.5 < snake.body[i].x && this.x + 2.5 > snake.body[i].x
                && this.y - 2.5 < snake.body[i].y && this.y + 2.5 > snake.body[i].y) {
                console.log(this.name + " died trying to take a bite of " + snake.name);
                return true;
            }
            else if (this.x - 2.5 < snake.body[i].x + 5 && this.x + 2.5 > snake.body[i].x + 5
                && this.y - 2.5 < snake.body[i].y + 5 && this.y + 2.5 > snake.body[i].y + 5) {
                console.log(this.name + " died trying to take a bite of " + snake.name);
                return true;
            }
            else if (this.x - 2.5 < snake.body[i].x && this.x + 2.5 > snake.body[i].x
                && this.y - 2.5 < snake.body[i].y + 5 && this.y + 2.5 > snake.body[i].y + 5) {
                console.log(this.name + " died trying to take a bite of " + snake.name);
                return true;
            }
            else if (this.x - 2.5 < snake.body[i].x + 5 && this.x + 2.5 > snake.body[i].x + 5
                && this.y - 2.5 < snake.body[i].y && this.y + 2.5 > snake.body[i].y) {
                console.log(this.name + " died trying to take a bite of " + snake.name);
                return true;
            }
        }
        return false;
    }


    eatFood(food) {
        if (food.x - 2.5 < this.x && food.x + 2.5 > this.x && food.y - 2.5 < this.y && food.y + 2.5 > this.y) {
            food.refreshFood();
            foodUpdate({ food: food, name: food.name })
            console.log("nom nom")
            let i;
            for (i = 0; i < 2; i++) {
                this.grow();
            }

        }
        else if (food.x - 2.5 < this.x + 5 && food.x + 2.5 > this.x + 5
            && food.y - 2.5 < this.y + 5 && food.y + 2.5 > this.y + 5) {
            food.refreshFood();
            foodUpdate({ food: food, name: food.name })
            console.log("treff")
            let i;
            for (i = 0; i < 2; i++) {
                this.grow();
            }
        }
        else if (food.x - 2.5 < this.x && food.x + 2.5 > this.x
            && food.food.y - 2.5 < this.y + 5 && food.food.y + 2.5 > this.y + 5) {
            food.refreshFood();
            foodUpdate({ food: food, name: food.name })
            console.log("treff")
            let i;
            for (i = 0; i < 2; i++) {
                this.grow();
            }
        }
        else if (food.food.x - 2.5 < this.x + 5 && food.food.x + 2.5 > this.x + 5
            && food.food.y - 2.5 < this.y && food.food.y + 2.5 > this.y) {
            food.refreshFood();
            foodUpdate({ food: food, name: food.name })
            console.log("treff")
            let i;
            for (i = 0; i < 2; i++) {
                this.grow();
            }
        }


        return false;
    }
}
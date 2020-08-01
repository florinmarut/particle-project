class Particle{
    constructor(_x, _y, _directionX, _directionY, _size, _color){
        this.x = _x;
        this.y = _y;
        this.directionX = _directionX;
        this.directionY = _directionY;
        this.size = _size;
        this.color = _color;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    //update va verifica pozitia fiecarei particule si va redesena fiecare particula in functie de pozitia cursorului in canvas (esential pentru collision detection)
    update(){
        // verifica daca particula se afla inca in canvas
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        // verifica collision detection cu cursorul
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size){
            //trebuie sa verificam din ce directie vine cursorul si sa ne asiguram ca particula se afla inca in canvas,
            //pentru ca coliziunea cu cercul care inconjoara cursorul sa aiba efect, iar buffer area intre canvas si particula este de 10 ori dimensiunea sa
           if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
               this.x += 10;
           }
           if(mouse.x > this.x && this.x > this.size * 10){
               this.x -= 10;
           }
           if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
               this.y += 10;
           }
           if(mouse.y > this.y && this.y > this.size * 10){
               this.y -= 10;
           }
        }
        // pentru formula asta, m-a ajutat foarte mult documentatia celor de la MDN https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        

        // codul de mai jos asigura ca particulele se vor misca in permanenta, pe axele lor, asta pana in momentul in care este intalnita coliziunea
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}
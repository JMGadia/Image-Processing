const envelope=document.getElementById("envelope");
const music=document.getElementById("bg-music");
const snowContainer=document.getElementById("snow-container");
const glitterContainer=document.getElementById("glitter-container");
const fullscreen=document.getElementById("fullscreen");
const balloonField=document.getElementById("balloon-field");
const zoomOverlay=document.getElementById("zoom-overlay");
const zoomImage=document.getElementById("zoom-image");
const resetText=document.querySelectorAll("#reset-text");
const confettiContainer=document.getElementById("confetti-container");

let opened=false;
const balloonImages=["assets/photo1.jpg","assets/photo2.jpg","assets/photo3.jpg","assets/photo4.jpg","assets/photo5.jpg",
    "assets/photo6.jpg","assets/photo7.jpg","assets/photo8.jpg","assets/photo9.jpg","assets/photo10.jpg","assets/photo11.jpg",
    "assets/photo12.jpg","assets/photo13.jpg","assets/photo14.jpg","assets/photo15.jpg","assets/photo16.jpg","assets/photo17.jpg",
    "assets/photo18.jpg","assets/photo19.jpg","assets/photo20.jpg","assets/photo21.jpg","assets/photo22.jpg","assets/photo23.jpg",
    "assets/photo24.jpg","assets/photo25.jpg"
];

envelope.addEventListener("click",()=>{
    if(opened) return;
    opened=true;
    envelope.classList.add("open");
    music.play().catch(e=>console.log("Audio play blocked"));
    startSnow();
    startGlitter();
    setTimeout(()=>{
        fullscreen.classList.add("show");
        document.querySelector(".card-container").style.display="none";
        createBalloons();
    },1800);
});

function startSnow(){for(let i=0;i<40;i++)createSnowflake();}
function createSnowflake(){
    const s=document.createElement("div");
    s.className="snowflake";
    s.textContent="❄";
    s.style.left=Math.random()*window.innerWidth+"px";
    s.style.fontSize=8+Math.random()*14+"px";
    s.style.animationDuration=5+Math.random()*5+"s";
    snowContainer.appendChild(s);
    setTimeout(()=>{s.remove(); if(opened) createSnowflake();},8000);
}

function startGlitter(){
    setInterval(()=>{
        if(!opened) return;
        const g=document.createElement("div");
        g.className="glitter";
        g.style.left=Math.random()*window.innerWidth+"px";
        g.style.top=Math.random()*window.innerHeight+"px";
        glitterContainer.appendChild(g);
        setTimeout(()=>g.remove(),2000);
    },200);
}

function createConfetti(x,y){
    for(let i=0;i<15;i++){
        const confetti=document.createElement("div");
        confetti.className="confetti";
        confetti.style.left=`${x}px`;
        confetti.style.top=`${y}px`;
        confetti.style.background=`hsl(${Math.random()*360},80%,60%)`;
        confetti.style.animationDuration=`${Math.random()*1+1.5}s`;
        confettiContainer.appendChild(confetti);
        setTimeout(()=>confetti.remove(),2000);
    }
}

function createBalloons(){
    balloonField.innerHTML="";
    const columns = window.innerWidth < 600 ? 3 : 5;
    const rows = Math.ceil(balloonImages.length / columns);

    // Set safe area (80% of screen to avoid edges)
    const padding = 10;
    const stepX = 80 / (columns - 1 || 1);
    const stepY = 75 / (rows - 1 || 1);

    balloonImages.forEach((src, index)=>{
        const balloon=document.createElement("div");
        balloon.className="balloon";

        const col = index % columns;
        const row = Math.floor(index / columns);

        // Position with slight randomness for a natural look
        const xPos = padding + (col * stepX) + (Math.random() * 5 - 2.5);
        const yPos = padding + (row * stepY) + (Math.random() * 5 - 2.5);

        balloon.style.left=`${xPos}%`;
        balloon.style.top=`${yPos}%`;
        balloon.style.animationDelay=Math.random()*2 + "s";

        const img=document.createElement("img");
        img.src=src;
        // Fallback for missing images
        img.onerror = () => { img.src = "https://via.placeholder.com/150/ffffff/c0392b?text=❤️"; };

        balloon.appendChild(img);
        balloon.addEventListener("click",(e)=>{
            e.stopPropagation();
            balloon.classList.add("pop");
            const rect = balloon.getBoundingClientRect();
            createConfetti(rect.left + rect.width/2, rect.top + rect.height/2);

            zoomImage.src=src;
            zoomOverlay.classList.add("show");

            setTimeout(()=>{
                balloon.style.visibility = "hidden";
                setTimeout(()=>{
                    balloon.style.visibility = "visible";
                    balloon.classList.remove("pop");
                },10000);
            },300);
        });
        balloonField.appendChild(balloon);
    });
}

zoomOverlay.addEventListener("click",()=>{zoomOverlay.classList.remove("show");});

resetText.forEach(text=>{
    text.addEventListener("click",()=> location.reload());
});
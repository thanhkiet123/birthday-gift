const btn = document.getElementById("startBtn");
const audio = document.getElementById("birthdayAudio");
const box = document.getElementById("surpriseBox");
const balloons = document.querySelector(".balloons");

// Tạo bóng bay
function createBalloon() {
    const balloon = document.createElement("img");
    balloon.src = "balloon.png"; 
    balloon.classList.add("balloon-img");

    // Random vị trí ngang
    balloon.style.left = Math.random() * 100 + "vw";

    // Random tốc độ bay
    balloon.style.animationDuration = (4 + Math.random() * 5) + "s";

    // Random kích thước (từ 0.7 → 1.2)
    const scale = 0.7 + Math.random() * 0.5;
    balloon.style.transform = `scale(${scale})`;

    document.getElementById("balloon-container").appendChild(balloon);

    // Xóa sau khi kết thúc
    setTimeout(() => balloon.remove(), 9000);
}

// Tạo bóng bay liên tục
setInterval(createBalloon, 1500);


// CSS cho bóng bay
const style = document.createElement("style");
style.innerHTML = `
.balloon {
    width: 80px;
    position: absolute;
    bottom: -150px;
    animation: floatUp linear infinite;
}
@keyframes floatUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-120vh); }
}
`;
document.head.appendChild(style);

// Nhấn nút
btn.onclick = () => {
    // hiện hộp ảnh + lời chúc
    box.classList.remove("hidden");

    // ẩn nút
    btn.style.display = "none";

    // nhạc
    audio.play();

    // bóng bay + pháo hoa
    createBalloons();
    startFireworks();
};

/* ---- Pháo hoa ---- */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 7;
        this.speedY = (Math.random() - 0.5) * 7;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.alpha = 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function startFireworks() {
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.4;
        for (let i = 0; i < 30; i++) particles.push(new Particle(x, y));
    }, 600);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

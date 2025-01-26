const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 设置画布尺寸为窗口大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 小球类
class Ball {
    constructor() {
        this.radius = 20;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.dx = (Math.random() - 0.5) * 8;
        this.dy = (Math.random() - 0.5) * 8;
        this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(mouseX, mouseY) {
        // 边界碰撞检测
        if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            this.dx = -Math.abs(this.dx);
        } else if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.dx = Math.abs(this.dx);
        }

        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.dy = -Math.abs(this.dy);
        } else if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.dy = Math.abs(this.dy);
        }

        // 计算与鼠标的距离
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 鼠标互动范围
        const interactionRadius = 150;
        if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            this.dx -= (dx / distance) * force * 0.5;
            this.dy -= (dy / distance) * force * 0.5;
        }

        // 更新位置
        this.x += this.dx;
        this.y += this.dy;

        // 添加一些摩擦力
        this.dx *= 0.995;
        this.dy *= 0.995;
    }
}

// 创建小球
const ball = new Ball();

// 鼠标位置
let mouseX = 0;
let mouseY = 0;
canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 动画循环
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.update(mouseX, mouseY);
    ball.draw();
    requestAnimationFrame(animate);
}

animate(); 
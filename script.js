// Sample projects data with prices
const projects = [
    { 
        title: "<b>E-commerce Platform</b>", 
        tech: "<b>Html, Css, Javascript, Php, MySQL</b>", 
        type: "<b>Type: Website+Database</b>",
        price: "1500TK"
    },
    { 
        title: "<b>Online Food Order Platform</b>", 
        tech: "<b>Html, Css, Javascript, Php, MySQL</b>", 
        type: "<b>Type: Website+Database</b>",
        price: "1500TK"
    },
    { 
        title: "<b>Face Recognition System</b>", 
        tech: "<b>Python, CNN, Tensorflow, CV2</b>", 
        type: "<b>Type: Machine learning</b>",
        price: "3000TK"
    },
    { 
        title: "<b>Hand sign Recognition System</b>", 
        tech: "<b>Python, tensorflow, CV2</b>", 
        type: "<b>Type: Machine learning</b>",
        price: "3000TK"
    }
];

// Populate projects
const projectContainer = document.getElementById('projectContainer');
projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.tech}</p>
        <div class="service-price">${project.price}</div>
        <span class="type-tag">${project.type}</span>
    `;
    projectContainer.appendChild(projectCard);
});
// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent successfully! We will contact you soon.');
    this.reset();
});

// Service card hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseout', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Scroll animation
window.addEventListener('scroll', () => {
    document.querySelectorAll('.service-card, .project-card').forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.contact').appendChild(particlesContainer);

    for (let i = 0; i < 200; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position within container
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Size between 1-4px
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Animation duration between 5-15 seconds
        const duration = Math.random() * 800 + 5;
        particle.style.animation = `float ${duration}s linear infinite`;
        
        particlesContainer.appendChild(particle);
    }
}
// Call after DOM content loads
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// Input hover effects
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('mouseenter', () => {
        input.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('mouseleave', () => {
        if (document.activeElement !== input) {
            input.style.transform = 'scale(1)';
        }
    });
});

// Form submission animation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const button = this.querySelector('button');
    button.style.transform = 'scale(0.9)';
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        button.style.opacity = '1';
        this.reset();
        alert('Message transmitted successfully!');
    }, 1000);
});


// Add to your script.js
function createSpiderweb() {
    const canvas = document.getElementById('spiderweb');
    const ctx = canvas.getContext('2d');
    let mousePos = { x: 0, y: 0 };
    let isHovering = false;

    // Set canvas size
    function setSize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    setSize();
    window.addEventListener('resize', setSize);

    // Create web nodes
    const nodes = [];
    const nodeCount = 20;
    const connectionDistance = 150;

    class Node {
        constructor() {
            this.pos = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            };
            this.velocity = {
                x: Math.random() * 2 - 1,
                y: Math.random() * 2 - 1
            };
        }
        
        update() {
            if(isHovering) {
                const dx = mousePos.x - this.pos.x;
                const dy = mousePos.y - this.pos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const force = 0.1;
                
                if(dist < 500) {
                    this.pos.x += dx * force;
                    this.pos.y += dy * force;
                }
            }
            
            this.pos.x += this.velocity.x;
            this.pos.y += this.velocity.y;
            
            if(this.pos.x > canvas.width) this.pos.x = 0;
            if(this.pos.x < 0) this.pos.x = canvas.width;
            if(this.pos.y > canvas.height) this.pos.y = 0;
            if(this.pos.y < 0) this.pos.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#64ffda';
            ctx.fill();
        }
    }

    // Create nodes
    for(let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.update();
            node.draw();
        });
        
        // Draw connections
        nodes.forEach((node1, i) => {
            nodes.slice(i).forEach(node2 => {
                const dx = node1.pos.x - node2.pos.x;
                const dy = node1.pos.y - node2.pos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if(dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(node1.pos.x, node1.pos.y);
                    ctx.lineTo(node2.pos.x, node2.pos.y);
                    ctx.strokeStyle = `rgba(100, 255, 218, ${1 - dist/connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }

    // Mouse events
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = e.clientX - rect.left;
        mousePos.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    canvas.addEventListener('mouseleave', () => {
        isHovering = false;
    });

    animate();
}

// Initialize when document loads
document.addEventListener('DOMContentLoaded', createSpiderweb);
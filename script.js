document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    const cursorFollower = document.querySelector('.cursor-follower');
    const tipCards = document.querySelectorAll('.tip-card');
    const responseArea = document.querySelector('.response-area');
    const poorResponse = document.querySelector('.poor-response');
    const goodResponse = document.querySelector('.good-response');
    const meterFill = document.querySelector('.meter-fill');
    
    // Back button handler
    backButton.addEventListener('click', function() {
        window.location.href = 'https://www.youtube.com';
    });
    
    // Custom cursor follower
    document.addEventListener('mousemove', function(e) {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
        
        // Check if hovering over interactive elements
        const hoveringInteractive = e.target.closest('.tip-card, .back-button, .logo');
        if (hoveringInteractive) {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            cursorFollower.style.mixBlendMode = 'overlay';
        } else {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            cursorFollower.style.mixBlendMode = 'screen';
        }
    });
    
    // Initialize tip cards
    tipCards.forEach(card => {
        const detail = card.querySelector('.tip-detail');
        detail.textContent = card.getAttribute('data-tip-detail');
        
        card.addEventListener('mouseenter', function() {
            const lightningElement = document.createElement('div');
            lightningElement.classList.add('card-lightning');
            lightningElement.style.cssText = `
                position: absolute;
                top: -20px;
                left: ${Math.random() * 100}%;
                width: 2px;
                height: 30px;
                background: linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,0,0.7));
                filter: blur(1px);
                opacity: 0.7;
            `;
            card.appendChild(lightningElement);
            
            setTimeout(() => {
                lightningElement.remove();
            }, 300);
        });
    });
    
    // Interactive scenario
    responseArea.addEventListener('mousemove', function(e) {
        const rect = responseArea.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const percentage = (x / rect.width) * 100;
        
        meterFill.style.width = percentage + '%';
        
        if (percentage < 40) {
            poorResponse.style.transform = 'scale(1.05)';
            poorResponse.style.boxShadow = '0 0 15px rgba(255, 100, 100, 0.5)';
            goodResponse.style.transform = 'scale(0.95)';
            goodResponse.style.boxShadow = 'none';
        } else if (percentage > 60) {
            goodResponse.style.transform = 'scale(1.05)';
            goodResponse.style.boxShadow = '0 0 15px rgba(100, 255, 100, 0.5)';
            poorResponse.style.transform = 'scale(0.95)';
            poorResponse.style.boxShadow = 'none';
        } else {
            poorResponse.style.transform = 'scale(1)';
            goodResponse.style.transform = 'scale(1)';
            poorResponse.style.boxShadow = 'none';
            goodResponse.style.boxShadow = 'none';
        }
    });
    
    responseArea.addEventListener('mouseleave', function() {
        meterFill.style.width = '50%';
        poorResponse.style.transform = 'scale(1)';
        goodResponse.style.transform = 'scale(1)';
        poorResponse.style.boxShadow = 'none';
        goodResponse.style.boxShadow = 'none';
    });
    
    // Add more dynamic electricity animations
    function createLightning() {
        const content = document.querySelector('.content');
        const lightning = document.createElement('div');
        lightning.classList.add('dynamic-lightning');
        
        // Random position
        const posX = Math.random() * content.offsetWidth;
        const posY = Math.random() * content.offsetHeight;
        
        // Random size and opacity
        const size = 3 + Math.random() * 3;
        const height = 40 + Math.random() * 60;
        const opacity = 0.5 + Math.random() * 0.5;
        
        lightning.style.cssText = `
            position: absolute;
            left: ${posX}px;
            top: ${posY}px;
            width: ${size}px;
            height: ${height}px;
            background: linear-gradient(to bottom, rgba(255,255,255,${opacity}), rgba(255,255,0,${opacity * 0.7}));
            filter: blur(1px);
            border-radius: ${size/2}px;
            transform: rotate(${Math.random() * 30 - 15}deg);
            z-index: 1;
        `;
        
        content.appendChild(lightning);
        
        // Animate and remove
        setTimeout(() => {
            lightning.style.opacity = '0';
            setTimeout(() => {
                lightning.remove();
            }, 300);
        }, 300);
    }
    
    // Generate lightning periodically
    setInterval(createLightning, 2000);
    
    // Easter egg - keyboard command
    let konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiPosition = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konami[konamiPosition]) {
            konamiPosition++;
            
            if (konamiPosition === konami.length) {
                activateSuperMode();
                konamiPosition = 0;
            }
        } else {
            konamiPosition = 0;
        }
    });
    
    function activateSuperMode() {
        document.body.style.animation = 'rainbow-bg 5s infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow-bg {
                0% { background: linear-gradient(135deg, #ff0000, #0000ff); }
                20% { background: linear-gradient(135deg, #ff00ff, #00ff00); }
                40% { background: linear-gradient(135deg, #00ffff, #ffff00); }
                60% { background: linear-gradient(135deg, #ffff00, #00ffff); }
                80% { background: linear-gradient(135deg, #00ff00, #ff00ff); }
                100% { background: linear-gradient(135deg, #0000ff, #ff0000); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 5000);
    }
});
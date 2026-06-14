/**
 * Flow AiOS - AnaBoost Engine Pro v2.0
 * Intelligent FPS-Adaptive Liquid Glass Optimization
 */

const AnaBoost = {
    fpsTracker: {
        lastTime: performance.now(),
        frames: 0,
        currentFps: 60,
        dropCounter: 0
    },
    
    settings: {
        criticalFpsThreshold: 48, // Bu FPS'in altına düşerse glass efektleri kapatılır
        recoveryFpsThreshold: 55, // Cihaz kendine gelirse glass efektleri geri açılır
        checkInterval: 500       // Her yarım saniyede bir cihazı kokla (ms)
    },

    init() {
        console.log("🚀 AnaBoost Pro v2.0 Ateşlendi: Ultra Akıcı Mod Aktif.");
        this.injectHardwareStyles();
        this.startEngine();
        this.setupVirtualScrolling();
    },

    // Tarayıcı motoruna render kurallarını enjekte eder
    injectHardwareStyles() {
        if (document.getElementById("anaboost-core-v2")) return;
        
        const style = document.createElement('style');
        style.id = "anaboost-core-v2";
        style.innerHTML = `
            /* GPU Zorlama ve Katman Ayrıştırma Kuralları */
            .custom-created-app, .app-icon-squircle, .bottom-dock-container {
                will-change: transform, opacity;
                transform: translate3d(0,0,0) !important;
                -webkit-transform: translate3d(0,0,0) !important;
                backface-visibility: hidden !important;
                -webkit-backface-visibility: hidden !important;
            }

            /* 🚫 ULTRA PERFORMANS MODU: Ağır blur filtrelerini iptal eder, kasma anında sıfırlanır */
            .ultra-perf-mode .app-icon-squircle {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: rgba(255, 255, 255, 0.15) !important;
                border: 1px solid rgba(255, 255, 255, 0.25) !important;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            }

            .ultra-perf-mode .bottom-dock-container {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: rgba(20, 20, 25, 0.85) !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
            }
            
            /* Kaydırma esnasında geçici deaktiflik sağlayan hafifletici sınıf */
            .ui-is-scrolling .app-icon-squircle {
                backdrop-filter: blur(4px) !important;
                -webkit-backdrop-filter: blur(4px) !important;
            }
        `;
        document.head.appendChild(style);
    },

    // Canlı FPS İzleme ve Dinamik Karar Motoru
    startEngine() {
        const calculateFps = () => {
            this.fpsTracker.frames++;
            const now = performance.now();
            
            if (now >= this.fpsTracker.lastTime + this.settings.checkInterval) {
                this.fpsTracker.currentFps = Math.round((this.fpsTracker.frames * 1000) / (now - this.fpsTracker.lastTime));
                
                // FPS analizi yap ve aksiyon al
                this.evaluateSystemHealth();
                
                this.fpsTracker.frames = 0;
                this.fpsTracker.lastTime = now;
            }
            requestAnimationFrame(calculateFps);
        };
        requestAnimationFrame(calculateFps);
    },

    evaluateSystemHealth() {
        const fps = this.fpsTracker.currentFps;
        const bodyClass = document.body.classList;

        if (fps < this.settings.criticalFpsThreshold) {
            this.fpsTracker.dropCounter++;
            // Eğer üst üste 2 ölçümde de cihaz kasıyorsa hemen koruma moduna geç
            if (this.fpsTracker.dropCounter >= 2 && !bodyClass.contains('ultra-perf-mode')) {
                bodyClass.add('ultra-perf-mode');
                console.warn(`⚠️ Cihaz yoruldu (${fps} FPS). Akıcılık için Liquid Glass optimize edildi.`);
            }
        } else if (fps >= this.settings.recoveryFpsThreshold) {
            if (this.fpsTracker.dropCounter > 0) this.fpsTracker.dropCounter--;
            
            if (this.fpsTracker.dropCounter === 0 && bodyClass.contains('ultra-perf-mode')) {
                bodyClass.remove('ultra-perf-mode');
                console.log(`✨ Cihaz rahatladı (${fps} FPS). Tam Glassmorphism moduna dönüldü.`);
            }
        }
    },

    // Kaydırma (Scroll) anında performansı tavan yaptırma mekanizması
    setupVirtualScrolling() {
        const grid = document.getElementById('appGrid') || document.querySelector('.apps-grid');
        if (!grid) return;

        let scrollTimeout;
        grid.addEventListener('scroll', () => {
            if (!document.body.classList.contains('ui-is-scrolling')) {
                document.body.classList.add('ui-is-scrolling');
            }
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('ui-is-scrolling');
            }, 100);
        }, { passive: true });
    }
};

// Başlatıcı
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AnaBoost.init());
} else {
    AnaBoost.init();
}

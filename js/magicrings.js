/*=============== MAGIC RINGS - FOOTER GLOW RINGS (VANILLA THREE.JS PORT) ===============*/
/* Ported from the React Bits <MagicRings /> component (React Three Fiber -> pure Three.js) */

(function () {
    'use strict';

    const container = document.getElementById('magic-rings');
    if (!container || typeof THREE === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const getCssVar = (name) => {
        const value = getComputedStyle(document.body).getPropertyValue(name).trim();
        return value || null;
    };
    const isDarkTheme = () => document.body.classList.contains('dark-theme');
    const getThemeColor = () => {
        if (isDarkTheme()) return getCssVar('--title-color') || '#f2f4f8';
        return 'hsl(207, 8%, 72%)'; // silver in light mode
    };
    const getThemeColorTwo = () => {
        if (isDarkTheme()) return 'hsl(207, 12%, 85%)'; // clearly lighter gray in dark mode
        return 'hsl(0, 0%, 96%)'; // light white accent in light mode
    };

    /*-------------- CONFIG (mirrors the component usage example, tuned for the footer) --------------*/
    const config = {
        color: getThemeColor(),
        colorTwo: getThemeColorTwo(),
        ringCount: 8,
        speed: 1,
        attenuation: 14,
        lineThickness: 6.5,
        baseRadius: 0.35,
        radiusStep: 0.1,
        scaleRate: 0.04,
        opacity: 1,
        blur: 0,
        noiseAmount: 0.05,
        rotation: 0,
        ringGap: 1.5,
        fadeIn: 0.1,
        fadeOut: 2.45,
        followMouse: false,
        mouseInfluence: 0.2,
        hoverScale: 1.3,
        parallax: 0.03,
        clickBurst: true
    };

    if (config.blur > 0) {
        container.style.filter = `blur(${config.blur}px)`;
    }

    /*-------------- SHADERS (verbatim from the component) --------------*/
    const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

    const fragmentShader = `
precision highp float;

uniform float uTime, uAttenuation, uLineThickness;
uniform float uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;
uniform float uFadeIn, uFadeOut;
uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;
uniform vec2 uResolution, uMouse;
uniform vec3 uColor, uColorTwo;
uniform int uRingCount;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation), sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;
  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
  p /= sc;
  vec3 c = vec3(0.0);
  float presence = 0.0;
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    float r = ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px);
    c = mix(c, rc, vec3(r));
    presence = max(presence, r);
  }
  c *= 1.0 + uBurst * 2.0;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;
  gl_FragColor = vec4(c, clamp(presence, 0.0, 1.0) * uOpacity);
}
`;

    /*-------------- RENDERER / SCENE / CAMERA (WebGL2 required, silent fallback) --------------*/
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch (err) {
        return;
    }
    if (!renderer.capabilities.isWebGL2) {
        renderer.dispose();
        return;
    }
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    /*-------------- UNIFORMS --------------*/
    const uniforms = {
        uTime: { value: 0 },
        uAttenuation: { value: config.attenuation },
        uResolution: { value: new THREE.Vector2() },
        uColor: { value: new THREE.Color(config.color) },
        uColorTwo: { value: new THREE.Color(config.colorTwo) },
        uLineThickness: { value: config.lineThickness },
        uBaseRadius: { value: config.baseRadius },
        uRadiusStep: { value: config.radiusStep },
        uScaleRate: { value: config.scaleRate },
        uRingCount: { value: config.ringCount },
        uOpacity: { value: config.opacity },
        uNoiseAmount: { value: config.noiseAmount },
        uRotation: { value: (config.rotation * Math.PI) / 180 },
        uRingGap: { value: config.ringGap },
        uFadeIn: { value: config.fadeIn },
        uFadeOut: { value: config.fadeOut },
        uMouse: { value: new THREE.Vector2() },
        uMouseInfluence: { value: config.followMouse ? config.mouseInfluence : 0 },
        uHoverAmount: { value: 0 },
        uHoverScale: { value: config.hoverScale },
        uParallax: { value: config.parallax },
        uBurst: { value: 0 }
    };

    const targetColor = new THREE.Color(config.color);
    const targetColorTwo = new THREE.Color(config.colorTwo);

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(quad);

    /*-------------- RESIZE (ResizeObserver + debounced window resize) --------------*/
    let resizeTimer = null;
    const resize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
        renderer.setSize(w, h);
        renderer.setPixelRatio(dpr);
        uniforms.uResolution.value.set(w * dpr, h * dpr);
    };
    resize();
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    });
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    /*-------------- POINTER (window-level so parallax works behind pointer-events:none) --------------*/
    const mouse = [0, 0];
    const smoothMouse = [0, 0];
    let burst = 0;

    const onMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        mouse[0] = (e.clientX - rect.left) / rect.width - 0.5;
        mouse[1] = -((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', (e) => {
        const t = e.touches && e.touches[0];
        if (t) {
            const rect = container.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            mouse[0] = (t.clientX - rect.left) / rect.width - 0.5;
            mouse[1] = -((t.clientY - rect.top) / rect.height - 0.5);
        }
    }, { passive: true });
    const onClick = () => {
        burst = 1;
    };
    window.addEventListener('click', onClick);
    window.addEventListener('touchend', onClick, { passive: true });

    /*-------------- THEME ADAPTATION (smooth color + glow transition) --------------*/
    const glowTarget = { attenuation: config.attenuation, thickness: config.lineThickness };
    const syncColors = () => {
        const c1 = getThemeColor();
        const c2 = getThemeColorTwo();
        if (c1) targetColor.set(c1);
        if (c2) targetColorTwo.set(c2);
        if (isDarkTheme()) {
            glowTarget.attenuation = config.attenuation; // 14
            glowTarget.thickness = config.lineThickness; // 5
        } else {
            glowTarget.attenuation = 22; // tighter glow on light bg
            glowTarget.thickness = 3.5;  // thinner, crisper line on light bg
        }
    };
    syncColors();
    const themeObserver = new MutationObserver(syncColors);
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    /*-------------- ANIMATION LOOP --------------*/
    const clock = new THREE.Clock();
    let frameId = null;

    const renderFrame = () => {
        const elapsed = clock.getElapsedTime();

        uniforms.uColor.value.lerp(targetColor, 0.08);
        uniforms.uColorTwo.value.lerp(targetColorTwo, 0.08);
        uniforms.uAttenuation.value += (glowTarget.attenuation - uniforms.uAttenuation.value) * 0.08;
        uniforms.uLineThickness.value += (glowTarget.thickness - uniforms.uLineThickness.value) * 0.08;

        smoothMouse[0] += (mouse[0] - smoothMouse[0]) * 0.08;
        smoothMouse[1] += (mouse[1] - smoothMouse[1]) * 0.08;
        burst *= 0.95;
        if (burst < 0.001) burst = 0;

        uniforms.uTime.value = elapsed * config.speed;
        uniforms.uMouse.value.set(smoothMouse[0], smoothMouse[1]);
        uniforms.uBurst.value = config.clickBurst ? burst : 0;

        renderer.render(scene, camera);
    };

    const animate = () => {
        frameId = requestAnimationFrame(animate);
        renderFrame();
    };

    /*-------------- LOOP CONTROL (pause when footer is off-screen) --------------*/
    let running = false;
    const startLoop = () => {
        if (running || prefersReducedMotion) return;
        running = true;
        clock.start();
        frameId = requestAnimationFrame(animate);
    };
    const stopLoop = () => {
        if (!running) return;
        running = false;
        cancelAnimationFrame(frameId);
        frameId = null;
    };

    /*-------------- MAIN --------------*/
    if (prefersReducedMotion) {
        renderFrame();
    } else {
        startLoop();
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) startLoop();
                    else stopLoop();
                });
            }, { threshold: 0.05 });
            io.observe(container);
        }
    }
})();

/*=============== ANTIGRAVITY - HERO PARTICLE RING (VANILLA THREE.JS PORT) ===============*/
/* Ported from the React Bits <Antigravity /> component (React Three Fiber -> pure Three.js) */

(function () {
    'use strict';

    const container = document.getElementById('antigravity');
    if (!container || typeof THREE === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const getThemeColor = () => {
        const title = getComputedStyle(document.body)
            .getPropertyValue('--title-color')
            .trim();
        return title || '#ffffff';
    };

    let isDarkTheme = document.body.classList.contains('dark-theme');

    /*-------------- CONFIG (mirrors the component usage example, tuned for the hero) --------------*/
    const config = {
        count: isMobile ? 350 : 700,
        magnetRadius: 50,
        ringRadius: 11,
        waveSpeed: 5,
        waveAmplitude: 0.3,
        particleSize: isMobile ? 0.27 : 0.3,
        lerpSpeed: 0.02,
        color: getThemeColor(),
        autoAnimate: true,
        particleVariance: 1,
        rotationSpeed: 0,
        depthFactor: 1.2,
        pulseSpeed: 2.2,
        particleShape: 'capsule',
        fieldStrength: 20
    };

    /*-------------- RENDERER / SCENE / CAMERA (with WebGL fallback) --------------*/
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (err) {
        return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);
    camera.position.set(0, 0, 50);
    camera.lookAt(0, 0, 0);

    /*-------------- GEOMETRY / MATERIAL (soft glow) --------------*/
    let geometry;
    switch (config.particleShape) {
        case 'sphere':
            geometry = new THREE.SphereGeometry(0.2, 16, 16);
            break;
        case 'box':
            geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
            break;
        case 'tetrahedron':
            geometry = new THREE.TetrahedronGeometry(0.3);
            break;
        case 'capsule':
        default:
            geometry = new THREE.CapsuleGeometry(0.1, 0.4, 4, 8);
            break;
    }
    const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.9
    });
    const targetColor = new THREE.Color(config.color);
    const mesh = new THREE.InstancedMesh(geometry, material, config.count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const dummy = new THREE.Object3D();

    /*-------------- VIEWPORT (world units visible at z=0 for camera z=50, fov 35) --------------*/
    const getViewport = () => {
        const fovRad = (35 * Math.PI) / 180;
        const distance = 50;
        const height = 2 * Math.tan(fovRad / 2) * distance;
        const aspect = renderer.domElement.width / renderer.domElement.height;
        return { width: height * aspect, height };
    };

    /*-------------- PARTICLES --------------*/
    let particles = [];
    const initParticles = () => {
        const vp = getViewport();
        const width = vp.width || 100;
        const height = vp.height || 100;
        particles = [];

        for (let i = 0; i < config.count; i++) {
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            const z = (Math.random() - 0.5) * 20;

            particles.push({
                t: Math.random() * 100,
                speed: 0.01 + Math.random() / 200,
                mx: x,
                my: y,
                mz: z,
                cx: x,
                cy: y,
                cz: z,
                randomRadiusOffset: (Math.random() - 0.5) * 2
            });
        }
    };

    /*-------------- POINTER (mouse + touch, normalized -1..1 over the hero container) --------------*/
    const lastMousePos = { x: 0, y: 0 };
    let lastMouseMoveTime = 0;
    const virtualMouse = { x: 0, y: 0 };
    let hasMouse = false;

    const setPointer = (px, py) => {
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        lastMousePos.x = ((px - rect.left) / rect.width) * 2 - 1;
        lastMousePos.y = -(((py - rect.top) / rect.height) * 2 - 1);
        lastMouseMoveTime = Date.now();
        hasMouse = true;
    };

    window.addEventListener('mousemove', (e) => setPointer(e.clientX, e.clientY), { passive: true });
    window.addEventListener('touchstart', (e) => {
        const t = e.touches && e.touches[0];
        if (t) setPointer(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
        const t = e.touches && e.touches[0];
        if (t) setPointer(t.clientX, t.clientY);
    }, { passive: true });

    /*-------------- RESIZE (debounced particle rebuild) --------------*/
    let resizeTimer = null;
    let lastW = 0;
    let lastH = 0;
    const resize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        if (w === lastW && h === lastH) return;
        lastW = w;
        lastH = h;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initParticles, 150);
    };
    window.addEventListener('resize', resize);

    /*-------------- THEME ADAPTATION (smooth color transition) --------------*/
    const syncColor = () => {
        targetColor.set(getThemeColor());
        isDarkTheme = document.body.classList.contains('dark-theme');
    };
    const themeObserver = new MutationObserver(syncColor);
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    /*-------------- ANIMATION LOOP --------------*/
    const clock = new THREE.Clock();

    const renderFrame = () => {
        const elapsed = clock.getElapsedTime();
        const v = getViewport();

        material.color.lerp(targetColor, 0.08);

        let destX = hasMouse ? (lastMousePos.x * v.width) / 2 : 0;
        let destY = hasMouse ? (lastMousePos.y * v.height) / 2 : 0;

        /* Idle: gentle orbit around the profile blob instead of a wide aimless drift */
        if (config.autoAnimate && (!hasMouse || Date.now() - lastMouseMoveTime > 2000)) {
            destX = Math.sin(elapsed * 0.3) * (v.width / 6);
            destY = Math.cos(elapsed * 0.3) * (v.height / 8);
        }

        const smoothFactor = 0.05;
        virtualMouse.x += (destX - virtualMouse.x) * smoothFactor;
        virtualMouse.y += (destY - virtualMouse.y) * smoothFactor;

        const targetX = virtualMouse.x;
        const targetY = virtualMouse.y;
        const globalRotation = elapsed * config.rotationSpeed;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.t += p.speed / 2;

            const projectionFactor = 1 - p.cz / 50;
            const projectedTargetX = targetX * projectionFactor;
            const projectedTargetY = targetY * projectionFactor;

            const dx = p.mx - projectedTargetX;
            const dy = p.my - projectedTargetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let targetPos = { x: p.mx, y: p.my, z: p.mz * config.depthFactor };

            if (dist < config.magnetRadius) {
                const angle = Math.atan2(dy, dx) + globalRotation;
                const wave = Math.sin(p.t * config.waveSpeed + angle) * (0.5 * config.waveAmplitude);
                const deviation = p.randomRadiusOffset * (5 / (config.fieldStrength + 0.1));
                const currentRingRadius = config.ringRadius + wave + deviation;

                targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
                targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
                targetPos.z = p.mz * config.depthFactor + Math.sin(p.t) * (1 * config.waveAmplitude * config.depthFactor);
            }

            p.cx += (targetPos.x - p.cx) * config.lerpSpeed;
            p.cy += (targetPos.y - p.cy) * config.lerpSpeed;
            p.cz += (targetPos.z - p.cz) * config.lerpSpeed;

            dummy.position.set(p.cx, p.cy, p.cz);
            dummy.lookAt(projectedTargetX, projectedTargetY, p.cz);
            dummy.rotateX(Math.PI / 2);

            const currentDistToMouse = Math.sqrt(
                Math.pow(p.cx - projectedTargetX, 2) + Math.pow(p.cy - projectedTargetY, 2)
            );
            const distFromRing = Math.abs(currentDistToMouse - config.ringRadius);
            let scaleFactor = 1 - distFromRing / 10;
            scaleFactor = Math.max(0, Math.min(1, scaleFactor));

            const finalScale = scaleFactor * (0.8 + Math.sin(p.t * config.pulseSpeed) * 0.2 * config.particleVariance) * config.particleSize;
            dummy.scale.set(finalScale, finalScale, finalScale);

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
        renderer.render(scene, camera);
    };

    /*-------------- LOOP CONTROL (pause when hero is off-screen) --------------*/
    let animating = false;
    const startLoop = () => {
        if (animating || prefersReducedMotion) return;
        animating = true;
        renderer.setAnimationLoop(renderFrame);
    };
    const stopLoop = () => {
        if (!animating) return;
        animating = false;
        renderer.setAnimationLoop(null);
    };

    /*-------------- MAIN --------------*/
    resize();

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

/*=============== LIGHT RAYS - SECTION SPOTLIGHT (VANILLA PORT) ===============*/
/* Ported from the React Bits <LightRays /> component (ogl, no React).         */
/* Supports multiple .light-rays-container instances; each reads its own       */
/* data-* attributes. Ray color is theme-aware via the --lightrays-color CSS   */
/* variable (data-rays-color wins when present).                               */
/* ogl is loaded at runtime via dynamic import() so this file works when the   */
/* page is opened from the local filesystem (file://), not just over a server. */
/* Usage: <div class="light-rays-container" data-rays-origin="top-center"></div> */

import('https://cdn.jsdelivr.net/npm/ogl@1.0.11/+esm')
    .then((ogl) => {
        const { Renderer, Program, Triangle, Mesh } = ogl;

        (function () {
            'use strict';

    const containers = Array.prototype.slice.call(document.querySelectorAll('.light-rays-container'));
    if (containers.length === 0) return;

    const prefersReducedMotion =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const DEFAULT_COLOR = '#ffffff';

    const hexToRgb = (hex) => {
        const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(hex).trim());
        return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
    };

    const getAnchorAndDir = (origin, w, h) => {
        const outside = 0.2;
        switch (origin) {
            case 'top-left':
                return { anchor: [0, -outside * h], dir: [0, 1] };
            case 'top-right':
                return { anchor: [w, -outside * h], dir: [0, 1] };
            case 'left':
                return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
            case 'right':
                return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
            case 'bottom-left':
                return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
            case 'bottom-center':
                return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
            case 'bottom-right':
                return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
            default:
                return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
        }
    };

    const readNum = (el, key, fallback) => {
        const v = el.getAttribute(key);
        const n = v === null || v === '' ? NaN : parseFloat(v);
        return isNaN(n) ? fallback : n;
    };

    const readBool = (el, key, fallback) => {
        const v = el.getAttribute(key);
        return v === null || v === '' ? fallback : v === 'true';
    };

    const readStr = (el, key, fallback) => {
        const v = el.getAttribute(key);
        return v === null || v === '' ? fallback : v;
    };

    const cssVar = (name, fallback) => {
        const val = window.getComputedStyle(document.body).getPropertyValue(name).trim();
        return val === '' ? fallback : val;
    };

    const instances = containers.map((container) => ({
        container,
        config: {
            raysOrigin: readStr(container, 'data-rays-origin', 'top-center'),
            raysColor: readStr(container, 'data-rays-color', cssVar('--lightrays-color', DEFAULT_COLOR)),
            raysSpeed: readNum(container, 'data-rays-speed', 1.5),
            lightSpread: readNum(container, 'data-light-spread', 0.8),
            rayLength: readNum(container, 'data-ray-length', 1.2),
            pulsating: readBool(container, 'data-pulsating', false),
            fadeDistance: readNum(container, 'data-fade-distance', 1.0),
            saturation: readNum(container, 'data-saturation', 1.0),
            followMouse: readBool(container, 'data-follow-mouse', true),
            mouseInfluence: readNum(container, 'data-mouse-influence', 0.1),
            noiseAmount: readNum(container, 'data-noise-amount', 0.0),
            distortion: readNum(container, 'data-distortion', 0.0)
        },
        renderer: null,
        uniforms: null,
        mesh: null,
        animId: 0,
        cleanup: null,
        mouse: { x: 0.5, y: 0.5 },
        smoothMouse: { x: 0.5, y: 0.5 }
    }));

    const applyConfig = (inst) => {
        if (!inst.uniforms) return;
        const u = inst.uniforms;
        const c = inst.config;
        u.raysColor.value = hexToRgb(c.raysColor);
        u.raysSpeed.value = c.raysSpeed;
        u.lightSpread.value = c.lightSpread;
        u.rayLength.value = c.rayLength;
        u.pulsating.value = c.pulsating ? 1.0 : 0.0;
        u.fadeDistance.value = c.fadeDistance;
        u.saturation.value = c.saturation;
        u.mouseInfluence.value = c.mouseInfluence;
        u.noiseAmount.value = c.noiseAmount;
        u.distortion.value = c.distortion;
        u.iBottom.value = /^bottom/.test(c.raysOrigin) ? 1 : 0;
        updatePlacementFor(inst);
    };

    const updatePlacementFor = (inst) => {
        if (!inst.renderer || !inst.uniforms || !inst.container) return;
        inst.renderer.dpr = Math.min(window.devicePixelRatio || 1, 2);
        const wCSS = inst.container.clientWidth;
        const hCSS = inst.container.clientHeight;
        inst.renderer.setSize(wCSS, hCSS);
        const dpr = inst.renderer.dpr;
        const w = wCSS * dpr;
        const h = hCSS * dpr;
        inst.uniforms.iResolution.value = [w, h];
        const { anchor, dir } = getAnchorAndDir(inst.config.raysOrigin, w, h);
        inst.uniforms.rayPos.value = anchor;
        inst.uniforms.rayDir.value = dir;
    };

    const refreshTheme = () => {
        instances.forEach((inst) => {
            inst.config.raysColor = readStr(inst.container, 'data-rays-color', cssVar('--lightrays-color', inst.config.raysColor));
            applyConfig(inst);
        });
    };

    const initialize = (inst) => {
        if (inst.renderer || !inst.container) return;

        let renderer;
        try {
            renderer = new Renderer({
                dpr: Math.min(window.devicePixelRatio || 1, 2),
                alpha: true
            });
        } catch (e) {
            return;
        }
        inst.renderer = renderer;

        const gl = renderer.gl;
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';
        while (inst.container.firstChild) {
            inst.container.removeChild(inst.container.firstChild);
        }
        inst.container.appendChild(gl.canvas);

        const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

        const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

uniform float iBottom;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = iBottom > 0.5 ? (coord.y / iResolution.y) : (1.0 - coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`;

        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: [1, 1] },
            rayPos: { value: [0, 0] },
            rayDir: { value: [0, 1] },
            raysColor: { value: hexToRgb(inst.config.raysColor) },
            raysSpeed: { value: inst.config.raysSpeed },
            lightSpread: { value: inst.config.lightSpread },
            rayLength: { value: inst.config.rayLength },
            pulsating: { value: inst.config.pulsating ? 1.0 : 0.0 },
            fadeDistance: { value: inst.config.fadeDistance },
            saturation: { value: inst.config.saturation },
            mousePos: { value: [0.5, 0.5] },
            mouseInfluence: { value: inst.config.mouseInfluence },
            noiseAmount: { value: inst.config.noiseAmount },
            distortion: { value: inst.config.distortion },
            iBottom: { value: 0 }
        };
        inst.uniforms = uniforms;
        applyConfig(inst);

        const geometry = new Triangle(gl);
        const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
        const mesh = new Mesh(gl, { geometry, program });
        inst.mesh = mesh;

        const handleMouseMove = (e) => {
            if (!inst.container) return;
            const rect = inst.container.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) return;
            inst.mouse.x = (e.clientX - rect.left) / rect.width;
            inst.mouse.y = (e.clientY - rect.top) / rect.height;
        };

        const onResize = () => updatePlacementFor(inst);

        const loop = (t) => {
            if (!inst.renderer || !inst.uniforms || !inst.mesh) return;
            inst.uniforms.iTime.value = t * 0.001;

            if (inst.config.followMouse && inst.config.mouseInfluence > 0.0) {
                const smoothing = 0.92;
                inst.smoothMouse.x = inst.smoothMouse.x * smoothing + inst.mouse.x * (1 - smoothing);
                inst.smoothMouse.y = inst.smoothMouse.y * smoothing + inst.mouse.y * (1 - smoothing);
                inst.uniforms.mousePos.value = [inst.smoothMouse.x, inst.smoothMouse.y];
            }

            try {
                inst.renderer.render({ scene: inst.mesh });
                inst.animId = requestAnimationFrame(loop);
            } catch (e) {
                /* stop silently */
            }
        };

        window.addEventListener('resize', onResize);
        if (inst.config.followMouse) window.addEventListener('mousemove', handleMouseMove);
        updatePlacementFor(inst);

        if (prefersReducedMotion) {
            inst.uniforms.iTime.value = 0;
            try {
                inst.renderer.render({ scene: inst.mesh });
            } catch (e) {
                /* ignore */
            }
        } else {
            inst.animId = requestAnimationFrame(loop);
        }

        inst.cleanup = () => {
            if (inst.animId) {
                cancelAnimationFrame(inst.animId);
                inst.animId = 0;
            }
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (inst.renderer) {
                try {
                    const loseCtx = inst.renderer.gl.getExtension('WEBGL_lose_context');
                    if (loseCtx) loseCtx.loseContext();
                    const canvas = inst.renderer.gl.canvas;
                    if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
                } catch (e) {
                    /* ignore */
                }
            }
            inst.renderer = null;
            inst.uniforms = null;
            inst.mesh = null;
        };
    };

    const visibilityObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const inst = instances.find((i) => i.container === entry.target);
                if (!inst) return;
                if (entry.isIntersecting) {
                    if (!inst.renderer) initialize(inst);
                }
            });
        },
        { threshold: 0.01, rootMargin: '200px 0px' }
    );
    instances.forEach((inst) => visibilityObserver.observe(inst.container));

    const themeObserver = new MutationObserver(refreshTheme);
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        })();
    })
    .catch(function (err) {
        console.error('[LightRays] failed to load ogl:', err);
    });

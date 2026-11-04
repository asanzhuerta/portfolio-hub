"use client";

import { useEffect, useRef } from "react";

// Ink swirling in water: domain-warped fBm around a vortex. The scroll drives it:
// scrolling down carries the ink upwards, winds the vortex and, the faster you
// scroll, stirs the warp harder. Without scrolling it barely drifts. Cobalt only
// shows in the thin, bright filaments.
const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll; // scroll position, in viewport heights
uniform float uStir;   // smoothed scroll speed, 0..1
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = rot * p * 2.02 + 17.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  vec2 d = uv - vec2(0.2, 0.05);
  float r = length(d);
  float angle = atan(d.y, d.x) + 1.6 / (r + 0.35) + uScroll * 0.9 + uTime * 0.006;
  vec2 p = vec2(cos(angle), sin(angle)) * r * 2.2;
  // The ink field itself moves up with the page, a little slower than the content.
  p.y -= uScroll * 1.1;

  float t = uTime * 0.01;
  float stir = 3.5 + uStir * 2.0;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 w = vec2(fbm(p + stir * q + vec2(1.7, 9.2) + uScroll * 0.5),
                fbm(p + stir * q + vec2(8.3, 2.8)));
  float f = fbm(p + 3.0 * w);

  // Dense black ink over a slightly lighter, smoky water; the bright edges where the
  // warp folds back on itself read as the thin filaments of ink in water.
  float ink = smoothstep(0.42, 0.72, f);
  float fold = smoothstep(0.32, 0.5, f * length(w));
  float filament = fold * (1.0 - ink);

  vec3 water = vec3(0.075, 0.078, 0.09);
  vec3 col = mix(water, vec3(0.006, 0.007, 0.009), ink);
  col += vec3(0.17, 0.175, 0.19) * filament * smoothstep(0.3, 0.7, q.x);
  col += vec3(0.03, 0.11, 0.42) * filament * smoothstep(0.45, 0.75, q.y);

  // Vignette and grain keep the centre readable and avoid banding.
  col *= 1.0 - 0.55 * smoothstep(0.4, 1.4, length(uv));
  col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * 0.018;
  outColor = vec4(col, 1.0);
}`;

const VERTEX = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "shader compile failed");
  }
  return shader;
}

export function InkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", { antialias: false, powerPreference: "low-power" });
    if (!canvas || !gl) return;

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    } catch {
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uScroll = gl.getUniformLocation(program, "uScroll");
    const uStir = gl.getUniformLocation(program, "uStir");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Ink is soft: half resolution is invisible and four times cheaper.
    const scale = Math.min(window.devicePixelRatio, 2) * 0.5;

    const resize = () => {
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const scrollTarget = () => window.scrollY / window.innerHeight;

    let scroll = scrollTarget();
    let stir = 0;
    const start = performance.now();
    const draw = (time: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uScroll, scroll);
      gl.uniform1f(uStir, stir);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();
    draw(0);
    canvas.dataset.ready = "true";

    let frame = 0;
    const loop = () => {
      // Ease towards the scroll position so the ink lags behind like a fluid, and
      // let the stirring decay slowly once the reader stops.
      const step = (scrollTarget() - scroll) * 0.08;
      scroll += step;
      stir = Math.min(1, stir * 0.95 + Math.abs(step) * 6);
      draw((performance.now() - start) / 1000);
      frame = requestAnimationFrame(loop);
    };

    const onResize = () => {
      resize();
      if (reduceMotion) draw(0);
    };
    // With reduced motion the ink still follows the page, but only on scroll events.
    const onScroll = () => {
      scroll = scrollTarget();
      draw(0);
    };
    window.addEventListener("resize", onResize);
    if (reduceMotion) window.addEventListener("scroll", onScroll, { passive: true });
    if (!reduceMotion) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100"
    />
  );
}

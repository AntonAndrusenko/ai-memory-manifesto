/**
 * Atmospheric WebGL shader background
 * Inspired by sunset gradients and liquid metal aesthetics
 * Tuned to the AI Memory Manifesto color palette
 */
(function () {
  var canvas = document.getElementById('shader-bg');
  if (!canvas) return;

  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return; // Fallback to CSS gradient mesh

  // Hide the CSS gradient mesh since shader replaces it
  function hideMesh() {
    var mesh = document.querySelector('.gradient-mesh');
    if (mesh) mesh.style.display = 'none';
  }
  hideMesh();
  // Also try after DOM is ready (in case script loads before mesh element)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideMesh);
  }

  // Vertex shader — full-screen quad
  var vertSrc = [
    'attribute vec2 a_pos;',
    'void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }'
  ].join('\n');

  // Fragment shader — flowing atmospheric gradient
  var fragSrc = [
    'precision mediump float;',
    'uniform float u_time;',
    'uniform vec2 u_res;',
    'uniform float u_dark;', // 1.0 for dark theme, 0.0 for light

    // Simplex-ish noise
    'vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }',
    'vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }',
    'vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }',

    'float snoise(vec2 v) {',
    '  const vec4 C = vec4(0.211324865405187, 0.366025403784439,',
    '                     -0.577350269189626, 0.024390243902439);',
    '  vec2 i = floor(v + dot(v, C.yy));',
    '  vec2 x0 = v - i + dot(i, C.xx);',
    '  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);',
    '  vec4 x12 = x0.xyxy + C.xxzz;',
    '  x12.xy -= i1;',
    '  i = mod289(i);',
    '  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));',
    '  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);',
    '  m = m*m; m = m*m;',
    '  vec3 x = 2.0 * fract(p * C.www) - 1.0;',
    '  vec3 h = abs(x) - 0.5;',
    '  vec3 ox = floor(x + 0.5);',
    '  vec3 a0 = x - ox;',
    '  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);',
    '  vec3 g;',
    '  g.x = a0.x * x0.x + h.x * x0.y;',
    '  g.yz = a0.yz * x12.xz + h.yz * x12.yw;',
    '  return 130.0 * dot(m, g);',
    '}',

    // Fractal Brownian Motion
    'float fbm(vec2 p) {',
    '  float f = 0.0;',
    '  f += 0.5000 * snoise(p); p *= 2.02;',
    '  f += 0.2500 * snoise(p); p *= 2.03;',
    '  f += 0.1250 * snoise(p); p *= 2.01;',
    '  f += 0.0625 * snoise(p);',
    '  return f / 0.9375;',
    '}',

    'void main() {',
    '  vec2 uv = gl_FragCoord.xy / u_res;',
    '  float aspect = u_res.x / u_res.y;',
    '  vec2 p = vec2(uv.x * aspect, uv.y);',

    '  float t = u_time * 0.08;', // Slow movement

    // Multiple flowing noise layers
    '  float n1 = fbm(p * 1.2 + vec2(t * 0.3, t * 0.15));',
    '  float n2 = fbm(p * 0.8 - vec2(t * 0.2, t * 0.25) + vec2(5.2, 1.3));',
    '  float n3 = fbm(p * 1.5 + vec2(n1 * 0.5, n2 * 0.5));', // Warped noise

    // Dark theme colors (matching manifesto palette)
    '  vec3 dark_bg    = vec3(0.024, 0.020, 0.039);',  // #06050a
    '  vec3 dark_rust  = vec3(0.886, 0.361, 0.243);',  // #e8654a — warm rust
    '  vec3 dark_ember = vec3(0.600, 0.150, 0.080);',  // Deep ember
    '  vec3 dark_plum  = vec3(0.280, 0.100, 0.360);',  // Purple tint
    '  vec3 dark_deep  = vec3(0.060, 0.040, 0.120);',  // Deep void

    // Light theme colors
    '  vec3 light_bg   = vec3(0.965, 0.957, 0.941);',  // #f6f4f0
    '  vec3 light_rust = vec3(0.710, 0.224, 0.129);',  // #b53921
    '  vec3 light_warm = vec3(0.920, 0.860, 0.800);',  // Warm cream
    '  vec3 light_cool = vec3(0.880, 0.900, 0.920);',  // Cool tint
    '  vec3 light_deep = vec3(0.940, 0.930, 0.910);',  // Subtle depth

    // Build gradient based on noise and position
    '  float grad_y = uv.y;',
    '  float warp = n3 * 0.35;',

    // Orb-like concentrations
    '  float orb1 = smoothstep(0.7, 0.0, length(p - vec2(aspect * 0.2, 0.8) + vec2(sin(t) * 0.3, cos(t * 0.7) * 0.2)));',
    '  float orb2 = smoothstep(0.9, 0.0, length(p - vec2(aspect * 0.75, 0.3) + vec2(cos(t * 0.6) * 0.4, sin(t * 0.5) * 0.3)));',
    '  float orb3 = smoothstep(0.6, 0.0, length(p - vec2(aspect * 0.5, 0.1) + vec2(sin(t * 0.4) * 0.2, cos(t * 0.3) * 0.15)));',

    // Dark theme composition
    '  vec3 dark_col = dark_bg;',
    '  dark_col = mix(dark_col, dark_deep, n1 * 0.5 + 0.2);',
    '  dark_col = mix(dark_col, dark_plum, orb2 * 0.35);',
    '  dark_col = mix(dark_col, dark_ember, orb1 * 0.25);',
    '  dark_col = mix(dark_col, dark_rust, orb3 * 0.15);',
    '  dark_col += dark_rust * warp * 0.06;', // Subtle rust noise
    '  dark_col = mix(dark_col, dark_bg, smoothstep(0.0, 1.0, grad_y) * 0.3);', // Darken top

    // Light theme composition
    '  vec3 light_col = light_bg;',
    '  light_col = mix(light_col, light_deep, n1 * 0.3);',
    '  light_col = mix(light_col, light_cool, orb2 * 0.15);',
    '  light_col = mix(light_col, light_warm, orb1 * 0.12);',
    '  light_col = mix(light_col, light_rust, orb3 * 0.05);',
    '  light_col += light_rust * warp * 0.02;',

    // Mix based on theme
    '  vec3 col = mix(light_col, dark_col, u_dark);',

    '  gl_FragColor = vec4(col, 1.0);',
    '}',
  ].join('\n');

  // Compile shader
  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  var vs = compile(gl.VERTEX_SHADER, vertSrc);
  var fs = compile(gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) return;

  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program error:', gl.getProgramInfoLog(prog));
    return;
  }
  gl.useProgram(prog);

  // Full-screen quad
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  var aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // Uniforms
  var uTime = gl.getUniformLocation(prog, 'u_time');
  var uRes = gl.getUniformLocation(prog, 'u_res');
  var uDark = gl.getUniformLocation(prog, 'u_dark');

  function resize() {
    // Use lower resolution for performance (shader is blurry anyway)
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = window.innerWidth * dpr;
    var h = window.innerHeight * dpr;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    gl.viewport(0, 0, w, h);
  }

  resize();
  window.addEventListener('resize', resize);

  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light' ? 1.0 : 0.0;
  }

  var startTime = performance.now();
  var frame = 0;

  function render() {
    frame++;
    // Render every 2nd frame for performance (background doesn't need 60fps)
    if (frame % 2 === 0) {
      var t = (performance.now() - startTime) / 1000.0;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uDark, isDark());
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    requestAnimationFrame(render);
  }

  render();
})();

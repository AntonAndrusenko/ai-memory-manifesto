/**
 * WebGL shader background
 * Dark theme: Simple Sunset — warm flowing gradients
 * Light theme: Liquid Silver — metallic reflective ripples
 */
(function () {
  var canvas = document.getElementById('shader-bg');
  if (!canvas) return;

  var glOpts = { preserveDrawingBuffer: true, alpha: false, antialias: false };
  var gl = canvas.getContext('webgl', glOpts) || canvas.getContext('experimental-webgl', glOpts);
  if (!gl) return;

  // Hide CSS gradient mesh fallback
  function hideMesh() {
    var mesh = document.querySelector('.gradient-mesh');
    if (mesh) mesh.style.display = 'none';
  }
  hideMesh();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideMesh);
  }

  var vertSrc = 'attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }';

  var fragSrc = [
    'precision highp float;',
    'uniform float u_time;',
    'uniform vec2 u_res;',
    'uniform float u_dark;',
    'uniform vec2 u_mouse;',  // 0..1 normalized mouse position

    // Simplex noise
    'vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}',
    'float snoise(vec2 v){',
    '  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);',
    '  vec2 i=floor(v+dot(v,C.yy));',
    '  vec2 x0=v-i+dot(i,C.xx);',
    '  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);',
    '  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;',
    '  i=mod289(i);',
    '  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));',
    '  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);',
    '  m=m*m; m=m*m;',
    '  vec3 x=2.0*fract(p*C.www)-1.0;',
    '  vec3 h=abs(x)-0.5;',
    '  vec3 ox=floor(x+0.5);',
    '  vec3 a0=x-ox;',
    '  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);',
    '  vec3 g;',
    '  g.x=a0.x*x0.x+h.x*x0.y;',
    '  g.yz=a0.yz*x12.xz+h.yz*x12.yw;',
    '  return 130.0*dot(m,g);',
    '}',

    'float fbm(vec2 p){',
    '  float f=0.0;',
    '  f+=0.5000*snoise(p); p*=2.02;',
    '  f+=0.2500*snoise(p); p*=2.03;',
    '  f+=0.1250*snoise(p); p*=2.01;',
    '  f+=0.0625*snoise(p);',
    '  return f/0.9375;',
    '}',

    'void main(){',
    '  vec2 uv=gl_FragCoord.xy/u_res;',
    '  float aspect=u_res.x/u_res.y;',
    '  vec2 p=vec2(uv.x*aspect, uv.y);',
    '  float t=u_time*0.06;',

    // ===== DARK THEME: Simple Sunset =====
    // Layered flowing noise for organic movement
    '  float n1=fbm(p*1.0+vec2(t*0.4, t*0.2));',
    '  float n2=fbm(p*0.7-vec2(t*0.3, t*0.35)+vec2(5.2,1.3));',
    '  float n3=fbm(p*1.8+vec2(n1*0.6, n2*0.6));',
    '  float n4=fbm(p*0.5+vec2(t*0.15, -t*0.1)+vec2(n3*0.3, 0.0));',

    // Sunset color palette
    '  vec3 s_deep   = vec3(0.02, 0.01, 0.04);',   // Near-black void
    '  vec3 s_night  = vec3(0.06, 0.02, 0.10);',   // Deep purple-black
    '  vec3 s_plum   = vec3(0.18, 0.04, 0.22);',   // Rich plum
    '  vec3 s_wine   = vec3(0.35, 0.06, 0.15);',   // Dark wine
    '  vec3 s_ember  = vec3(0.55, 0.12, 0.06);',   // Deep ember
    '  vec3 s_rust   = vec3(0.85, 0.30, 0.12);',   // Rust/orange
    '  vec3 s_amber  = vec3(0.95, 0.55, 0.15);',   // Warm amber
    '  vec3 s_glow   = vec3(1.00, 0.75, 0.30);',   // Hot glow

    // Vertical gradient: dark top to warm bottom
    '  float grad = pow(1.0 - uv.y, 1.5);',        // Concentrated at bottom

    // Build the sunset
    '  vec3 dark_col = s_deep;',

    // Base atmosphere with vertical gradient
    '  dark_col = mix(dark_col, s_night, smoothstep(0.0, 0.5, grad));',
    '  dark_col = mix(dark_col, s_plum, smoothstep(0.2, 0.7, grad) * 0.7);',

    // Flowing warm bands
    '  float band1 = smoothstep(0.3, 0.6, grad + n1 * 0.25) * smoothstep(0.9, 0.6, grad + n2 * 0.2);',
    '  dark_col = mix(dark_col, s_wine, band1 * 0.8);',

    '  float band2 = smoothstep(0.4, 0.7, grad + n2 * 0.2) * smoothstep(1.0, 0.7, grad + n1 * 0.15);',
    '  dark_col = mix(dark_col, s_ember, band2 * 0.6);',

    // Concentrated warm glow areas
    '  float glow1 = smoothstep(0.8, 0.0, length(p - vec2(aspect*0.3, 0.15) + vec2(sin(t*0.7)*0.3, cos(t*0.5)*0.1)));',
    '  dark_col = mix(dark_col, s_rust, glow1 * 0.4);',

    '  float glow2 = smoothstep(0.6, 0.0, length(p - vec2(aspect*0.7, 0.08) + vec2(cos(t*0.4)*0.2, sin(t*0.6)*0.08)));',
    '  dark_col = mix(dark_col, s_amber, glow2 * 0.25);',

    // Noise-driven wisps of warmth
    '  float wisps = max(0.0, n3) * grad;',
    '  dark_col += s_rust * wisps * 0.15;',
    '  dark_col += s_glow * pow(max(0.0, n4), 3.0) * grad * 0.2;',

    // Mouse interaction — warm light that gently follows the cursor
    '  vec2 mp = vec2(u_mouse.x * aspect, u_mouse.y);',
    '  float mDist = length(p - mp);',
    '  float mGlow = smoothstep(0.55, 0.0, mDist);',
    '  dark_col = mix(dark_col, dark_col * 1.4 + s_rust * 0.08, mGlow * 0.35);',
    '  dark_col += s_amber * pow(mGlow, 2.5) * 0.06;',

    // Subtle top-area purple nebula
    '  float nebula = smoothstep(0.7, 0.0, length(p - vec2(aspect*0.6, 0.85) + vec2(sin(t*0.3)*0.4, 0.0)));',
    '  dark_col = mix(dark_col, s_plum, nebula * 0.3);',

    // ===== LIGHT THEME: Liquid Silver =====
    '  float ln1 = fbm(p * 1.5 + vec2(t * 0.5, t * 0.3));',
    '  float ln2 = fbm(p * 2.0 - vec2(t * 0.4, t * 0.45) + vec2(3.7, 8.1));',
    '  float ln3 = fbm(p * 3.0 + vec2(ln1 * 0.8, ln2 * 0.8));',

    // Silver/mercury palette
    '  vec3 l_base    = vec3(0.94, 0.93, 0.91);',  // Warm off-white
    '  vec3 l_cool    = vec3(0.88, 0.90, 0.93);',  // Cool steel tint
    '  vec3 l_silver  = vec3(0.82, 0.84, 0.87);',  // Silver mid
    '  vec3 l_reflect = vec3(0.97, 0.97, 0.96);',  // Bright reflection
    '  vec3 l_shadow  = vec3(0.78, 0.77, 0.75);',  // Soft shadow
    '  vec3 l_accent  = vec3(0.85, 0.82, 0.78);',  // Warm accent

    // Base with flowing cool/warm shifts
    '  vec3 light_col = l_base;',
    '  light_col = mix(light_col, l_cool, (ln1 * 0.5 + 0.5) * 0.3);',
    '  light_col = mix(light_col, l_accent, (ln2 * 0.5 + 0.5) * 0.15);',

    // Liquid ripple highlights
    '  float ripple = sin(ln3 * 6.0 + t * 2.0) * 0.5 + 0.5;',
    '  light_col = mix(light_col, l_reflect, ripple * 0.2 * smoothstep(-0.2, 0.3, ln1));',

    // Flowing shadow pools
    '  float shadow = smoothstep(0.1, -0.3, ln1 + ln2 * 0.5);',
    '  light_col = mix(light_col, l_shadow, shadow * 0.3);',

    // Mercury-like caustic reflections
    '  float caustic = pow(max(0.0, sin(ln3 * 8.0 + ln1 * 4.0 + t * 1.5)), 4.0);',
    '  light_col += (l_reflect - l_base) * caustic * 0.15;',

    // Mouse interaction — soft light pool that follows cursor
    '  vec2 lmp = vec2(u_mouse.x * aspect, u_mouse.y);',
    '  float lmDist = length(p - lmp);',
    '  float lmGlow = smoothstep(0.5, 0.0, lmDist);',
    '  light_col = mix(light_col, l_reflect, lmGlow * 0.25);',
    '  light_col = mix(light_col, l_shadow, pow(lmGlow, 3.0) * 0.1);',

    // Subtle silver shimmer
    '  float shimmer = pow(max(0.0, snoise(p * 5.0 + vec2(t * 0.8, t * 0.6))), 3.0);',
    '  light_col = mix(light_col, l_silver, shimmer * 0.2);',

    // Mix based on theme
    '  vec3 col = mix(light_col, dark_col, u_dark);',
    '  gl_FragColor = vec4(col, 1.0);',
    '}',
  ].join('\n');

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

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  var aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  var uTime = gl.getUniformLocation(prog, 'u_time');
  var uRes = gl.getUniformLocation(prog, 'u_res');
  var uDark = gl.getUniformLocation(prog, 'u_dark');
  var uMouse = gl.getUniformLocation(prog, 'u_mouse');

  // Smooth mouse tracking
  var mouseX = 0.5, mouseY = 0.5; // Current (smoothed)
  var targetX = 0.5, targetY = 0.5; // Target (raw)

  window.addEventListener('mousemove', function (e) {
    targetX = e.clientX / window.innerWidth;
    targetY = 1.0 - (e.clientY / window.innerHeight); // Flip Y for GL
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    var touch = e.touches[0];
    targetX = touch.clientX / window.innerWidth;
    targetY = 1.0 - (touch.clientY / window.innerHeight);
  }, { passive: true });

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
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
    // Smooth mouse interpolation (ease toward target)
    mouseX += (targetX - mouseX) * 0.06;
    mouseY += (targetY - mouseY) * 0.06;

    if (frame % 2 === 0) {
      gl.uniform1f(uTime, (performance.now() - startTime) / 1000.0);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uDark, isDark());
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    requestAnimationFrame(render);
  }

  render();
})();

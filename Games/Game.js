let gl;

let vertSrc =
"precision mediump float;" +

"attribute vec3 vertPos;" +
"attribute vec3 vertColor;" +

"uniform mat4 world;" +
"uniform mat4 view;" +
"uniform mat4 proj;" +

"varying vec4 fragColor;" +

"void main()" +
"{" +
"    fragColor = vec4(vertColor, 1);" +
"    gl_Position = proj * view * world * vec4(vertPos, 1);" +
"}";

let fragSrc =
"precision mediump float;" +

"varying vec4 fragColor;" +

"void main()" +
"{" +
"    gl_FragColor = fragColor;" +
"}";


let identity;
let world;
let view;
let proj;

let program;
let worldUnifLoc;
let viewUnifLoc;
let projUnifLoc;

let indDat;

window.onload = function()
{
    Engine.init(window.innerWidth, window.innerHeight, 60, true);
    Engine.canvas.style.touchAction = "none";
    gl = Engine.context;
    
    vertShader = gl.createShader(gl.VERTEX_SHADER);
    fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(vertShader, vertSrc);
    gl.shaderSource(fragShader, fragSrc);
    
    gl.compileShader(vertShader);
    gl.compileShader(fragShader);
    
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS))
    {
        console.error("Vert Error!", gl.getShaderInfoLog(vertShader));
        return;
    }
    
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS))
    {
        console.error("Frag Error!", gl.getShaderInfoLog(fragShader));
        return;
    }
    
    program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
        console.error("Link Error!", gl.getProgramInfoLog(program));
        return;
    }
    
    gl.validateProgram(program);
    
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
    {
        console.error("Validate Error!", gl.getProgramInfoLog(program));
        return;
    }
    
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);
    
    gl.useProgram(program);
    
    // Triangle Definition
    
    let vertDat =
    [ // X, Y, Z           R, G, B
		// Top
		-1.0, 1.0, -1.0,   1, 0, 0,
		-1.0, 1.0, 1.0,    1, 0, 0,
		1.0, 1.0, 1.0,     1, 0, 0,
		1.0, 1.0, -1.0,    1, 0, 0,

		// Left
		-1.0, 1.0, 1.0,    0, 1, 0,
		-1.0, -1.0, 1.0,   0, 1, 0,
		-1.0, -1.0, -1.0,  0, 1, 0,
		-1.0, 1.0, -1.0,   0, 1, 0,

		// Right
		1.0, 1.0, 1.0,    0, 0, 1,
		1.0, -1.0, 1.0,   0, 0, 1,
		1.0, -1.0, -1.0,  0, 0, 1,
		1.0, 1.0, -1.0,   0, 0, 1,

		// Front
		1.0, 1.0, 1.0,    1, 1, 0,
		1.0, -1.0, 1.0,   1, 1, 0,
		-1.0, -1.0, 1.0,  1, 1, 0,
		-1.0, 1.0, 1.0,   1, 1, 0,

		// Back
		1.0, 1.0, -1.0,   1, 0, 1,
		1.0, -1.0, -1.0,  1, 0, 1,
		-1.0, -1.0, -1.0, 1, 0, 1,
		-1.0, 1.0, -1.0,  1, 0, 1,

		// Bottom
		-1.0, -1.0, -1.0, 0, 1, 1,
		-1.0, -1.0, 1.0,  0, 1, 1,
		1.0, -1.0, 1.0,   0, 1, 1,
		1.0, -1.0, -1.0,  0, 1, 1
	];
    
    indDat =
	[
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];
    
    let vertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertDat), gl.STATIC_DRAW);
    
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indDat), gl.STATIC_DRAW);
    
    let posAttribLoc = gl.getAttribLocation(program, "vertPos");
    let colorAttribLoc = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(posAttribLoc, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(colorAttribLoc, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    
    gl.enableVertexAttribArray(posAttribLoc);
    gl.enableVertexAttribArray(colorAttribLoc);
    
    worldUnifLoc = gl.getUniformLocation(program, "world");
    viewUnifLoc = gl.getUniformLocation(program, "view");
    projUnifLoc = gl.getUniformLocation(program, "proj");
    
    identity =
    [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
    
    world =
    [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
    
    view =
    [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
    
    proj =
    [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
    
    lookAt(view, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
    perspective(proj, 60 * Math.PI / 180, Engine.canvas.width / Engine.canvas.height, 0.1, 1000);
    
    gl.uniformMatrix4fv(worldUnifLoc, gl.FALSE, new Float32Array(world));
    gl.uniformMatrix4fv(viewUnifLoc, gl.FALSE, new Float32Array(view));
    gl.uniformMatrix4fv(projUnifLoc, gl.FALSE, new Float32Array(proj));
};

let angle = 0;

function onUpdate()
{
    angle = Date.now() / 10000 * 2 * Math.PI;
    
    multiply(world,
    [
        Math.cos(angle), 0, Math.sin(angle), 0,
        0, 1, 0, 0,
        -Math.sin(angle), 0, Math.cos(angle), 0,
        0, 0, 0, 1
    ],
    [
        1, 0, 0, 0,
        0, Math.cos(angle), -Math.sin(angle), 0,
        0, Math.sin(angle), Math.cos(angle), 0,
        0, 0, 0, 1
    ]);
    
    multiply(world, world,
    [
        Math.cos(angle), -Math.sin(angle), 0, 0,
        Math.sin(angle), Math.cos(angle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);

    gl.uniformMatrix4fv(worldUnifLoc, gl.FALSE, new Float32Array(world));
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indDat.length, gl.UNSIGNED_SHORT, 0);
}

function multiply(out, a, b)
{
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  // Cache only the current line of the second matrix
  let b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
  out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
  out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
  out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  return out;
}

function perspective(out, fovy, aspect, near, far)
{
  let f = 1.0 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = (2 * far * near) * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}

function lookAt(out, eye, center, up)
{
  let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  let eyex = eye[0];
  let eyey = eye[1];
  let eyez = eye[2];
  let upx = up[0];
  let upy = up[1];
  let upz = up[2];
  let centerx = center[0];
  let centery = center[1];
  let centerz = center[2];
  if (Math.abs(eyex - centerx) < 0.000001 &&
      Math.abs(eyey - centery) < 0.000001 &&
      Math.abs(eyez - centerz) < 0.000001)
  {
    return out = identity;
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }
  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
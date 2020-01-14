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

window.onload = function()
{
    Engine.init(240, 180, 60, true);
    //Engine.canvas.style.touchAction = "none";
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
    
    gl.clearColor(0.5, 0.5, 1.0, 1.0);
    gl.useProgram(program);
    
    // Triangle Definition
    
    let vertDat =
    [
       //   X,    Y,    Z, R, G, B
          0.0,  0.5,  0.0, 1, 0, 0,
         -0.5, -0.5,  0.0, 0, 1, 0,
          0.5, -0.5,  0.0, 0, 0, 1,
    ];
    
    let vertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertDat), gl.STATIC_DRAW);
    
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
        1, 0, 0, 0,
        0, Math.cos(angle/10), -Math.sin(angle/10), 0,
        0, Math.sin(angle/10), Math.cos(angle/10), 0,
        0, 0, 0, 1
    ],
    [
        Math.cos(angle), 0, Math.sin(angle), 0,
        0, 1, 0, 0,
        -Math.sin(angle), 0, Math.cos(angle), 0,
        0, 0, 0, 1
    ]);

    gl.uniformMatrix4fv(worldUnifLoc, gl.FALSE, new Float32Array(world));
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function multiply(out, a, b) {
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
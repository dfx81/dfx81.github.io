let Engine =
{
    fps : 60,
    webgl : false,
    canvas : document.createElement("canvas"),
    gameLoop : undefined,
    
    init : function (width, height, fps, webgl)
    {
        this.running = true;
        this.canvas.width = width;
        this.canvas.height = height;
        this.fps = fps;
        this.webgl = webgl;
        this.context = (webgl) ?
            this.canvas.getContext("webgl") :
            this.canvas.getContext("2d");
        
        document.body.insertBefore(this.canvas,
            document.body.childNodes[0]);
        
        this.start();
    },
    
    start : function()
    {
        Time.timeInit = Date.now() / 1000;
        
        this.gameLoop = window.requestAnimationFrame(this.update);
        if (!this.gameLoop)
            Engine.gameLoop = window.setInterval(this.update, 1000 / this.fps);
    },

    update : function()
    {
        Time.timeNow = Date.now() / 1000;
        Time.deltaTime = Time.timeNow - Time.timeInit;
        Time.timeInit = Time.timeNow;
        
        if (Engine.running)
        {
            Engine.clear();
            onUpdate();
            window.setTimeout(function()
            {
                window.requestAnimationFrame(Engine.update);
            }, 1000 / Engine.fps);
        }
    },
        
    stop : function()
    {
        if (!window.requestAnimationFrame)
            window.clearInterval(this.gameLoop);
        this.running = false;
        console.log("End of execution");
    },
    
    clear : function()
    {
        if (!this.webgl)
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

let Input =
{
    touch : undefined,
    keys : undefined,
    mouse : undefined,
    
    bindTouch : function()
    {
        Engine.canvas.addEventListener("touchstart", touchEvt);
        Engine.canvas.addEventListener("touchmove", touchEvt);
        Engine.canvas.addEventListener("touchend", touchEvt);
        
        function touchEvt(evt)
        {
            Input.touch = evt.touches[0];
        };
    },
    
    bindKey : function()
    {
        Engine.canvas.addEventListener("keydown", key);
        Engine.canvas.addEventListener("keyup", key);
        
        function key(evt)
        {
            Input.keys = evt;
        }
    },
    
    bindMouse : function()
    {
        Engine.canvas.addEventListener("mousedown", cursor);
        Engine.canvas.addEventListener("mouseup", cursor);
        Engine.canvas.addEventListener("mousemove", cursor);
        
        function cursor(evt)
        {
            Input.mouse = evt;
        }
    }
};

let Time =
{
    timeInit : 0,
    timeNow : 0,
    deltaTime : 0
};

function GameObject(offX, offY, width, height, color)
{
    this.offX = offX;
    this.offY = offY;
    this.width = width;
    this.height = height;
    this.color = color;
    
    this.render = function()
    {
        Engine.context.fillStyle = this.color;
        Engine.context.fillRect(this.offX, this.offY, this.width, this.height);
    }
};
const Vector = p5.Vector;
const MAX_HEIGHT = 600;
const MAX_WIDTH = 600;
const MAX_ITERATIONS = 100;
const mandelbrot = new Mandelbrot(MAX_ITERATIONS);


function setup() 
{
    createCanvas(
        clamp(windowWidth, 500, MAX_WIDTH), 
        clamp(windowHeight, 500, MAX_HEIGHT)
    );
    pixelDensity(1);
    frDiv = createDiv('');
    //colorMode(HSB, 255);
}

function draw() 
{
    loadPixels();
    for(let x = 0; x < width; x++)
    {
        for(let y = 0; y < height; y++)
        {
            const point = mandelbrot.calcPoint(
                x,
                y
            );
            const i = (x + y * width) * 4;
            if(point.isInSet) {
                setPixel(pixels, i, 0, 0, 0);
            } else {
                const h = map(point.iterations, 0, MAX_ITERATIONS, 0, 255);
                setPixel(
                    pixels, 
                    i, 
                    ...HSLToRGB(h, 255, 127)
                );
            }
            
        }
    }
    mandelbrot.zoom+=20;

    updatePixels();

    stroke(255, 255, 255)
    strokeWeight(10)
    point(mandelbrot.centerX, mandelbrot.centerY)
}

function setPixel(arr, baseIndex, r, g, b)
{
    arr[baseIndex] = r;
    arr[baseIndex + 1] = g;
    arr[baseIndex + 2] = b;
    arr[baseIndex + 3] = 255;
}

function clamp(n, min, max)
{
    return Math.max(min, Math.min(n, max));
}
function HSLToRGB(h, s, l) 
{
    s /= 255;
    l /= 255;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
};
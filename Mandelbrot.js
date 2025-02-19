const LIMIT = 16;

function Mandelbrot(maxIterations)
{
    this.MAX_ITERATIONS = maxIterations;
    this.zoom = 200;
    this.centerX = -0.75;
    this.centerY = 0.1;

    this.calcPoint = function(x, y)
    {
        // scale coordinates based on zoom and center
        x = map(x, 
                0, width, 
                (this.centerX - width / (2 * this.zoom)), (this.centerX + width / (2 * this.zoom)));
        y = map(y, 0, height, (this.centerY - height / (2 * this.zoom)), (this.centerY + height / (2 * this.zoom)));

        // equation:
        // z_(n+1) = (z_n)^2 + c
        // where z_0 = c
        const c = new Complex(x, y);
        let z = new Complex(x, y);
        let i = 0;
        do
        {
            z = z.square().add(c);
        } while(z.abs() < LIMIT && z.isFinite() && ++i < this.MAX_ITERATIONS);

        return {
            iterations: i,
            isInSet: z.abs() < LIMIT
        };
    };

    this.setCenter = function(x, y)
    {
        this.centerX = x;
        this.centerY = y;
    };

    this.addZoom = function(zoom)
    {
        this.zoom += zoom;
    };

    this.subZoom = function(zoom)
    {
        this.zoom -= zoom;
    };

    this.setZoom = function(zoom)
    {
        this.zoom = zoom;
    };
}

function Complex(a, b)
{
    this.real = a;
    this.imaginary = b;

    this.add = function(n)
    {
        return new Complex(
            this.real + n.real,
            this.imaginary + n.imaginary
        );
    }

    this.square = function()
    {
        return new Complex(
            this.real * this.real - this.imaginary * this.imaginary,
            2 * this.real * this.imaginary
        );
    }

    this.abs = function()
    {
        return sqrt(this.real * this.real + this.imaginary * this.imaginary);
    }

    this.isFinite = function()
    {
        return isFinite(this.real) && isFinite(this.imaginary);
    }
}
import { useRef, useEffect, useState } from 'react';

/**
 * Squares - An interactive grid background inspired by ReactBits.
 * Features customizable grid size, color, and hover effects.
 */
const Squares = ({
    direction = 'right',
    speed = 1,
    borderColor = '#94C2DA',
    squareSize = 40,
    hoverFillColor = '#E84797',
    className = '',
}) => {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const numSquaresX = useRef();
    const numSquaresY = useRef();
    const gridOffset = useRef({ x: 0, y: 0 });
    const [hoveredSquare, setHoveredSquare] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
            numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Apply slow movement based on direction
            if (direction === 'right') gridOffset.current.x = (gridOffset.current.x + speed) % squareSize;
            if (direction === 'left') gridOffset.current.x = (gridOffset.current.x - speed + squareSize) % squareSize;
            if (direction === 'down') gridOffset.current.y = (gridOffset.current.y + speed) % squareSize;
            if (direction === 'up') gridOffset.current.y = (gridOffset.current.y - speed + squareSize) % squareSize;
            if (direction === 'diagonal') {
                gridOffset.current.x = (gridOffset.current.x + speed) % squareSize;
                gridOffset.current.y = (gridOffset.current.y + speed) % squareSize;
            }

            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 0.5;

            for (let x = 0; x < numSquaresX.current; x++) {
                for (let y = 0; y < numSquaresY.current; y++) {
                    const posX = x * squareSize + gridOffset.current.x;
                    const posY = y * squareSize + gridOffset.current.y;

                    ctx.strokeRect(posX, posY, squareSize, squareSize);

                    if (hoveredSquare && hoveredSquare.x === x && hoveredSquare.y === y) {
                        ctx.fillStyle = hoverFillColor + '20'; // 20 is low opacity hex
                        ctx.fillRect(posX, posY, squareSize, squareSize);
                    }
                }
            }

            requestRef.current = requestAnimationFrame(draw);
        };

        requestRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(requestRef.current);
        };
    }, [direction, speed, borderColor, squareSize, hoveredSquare, hoverFillColor]);

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left - gridOffset.current.x) / squareSize);
        const y = Math.floor((e.clientY - rect.top - gridOffset.current.y) / squareSize);
        setHoveredSquare({ x, y });
    };

    const handleMouseLeave = () => {
        setHoveredSquare(null);
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`block w-full h-full pointer-events-none ${className}`}
        />
    );
};

export default Squares;

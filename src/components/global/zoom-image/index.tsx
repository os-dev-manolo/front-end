/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
    useRef,
    useMemo,
    useEffect,
    useState,
    useCallback,
} from "react";

const SCROLL_SENSITIVITY = 0.0005;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.1;

interface ZoomImageProps {
    image: string;
}

export const ZoomImage: React.FC<ZoomImageProps> = ({ image }) => {
    const [offset, setOffset] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [zoom, setZoom] = useState<number>(1);
    const [draggind, setDragging] = useState(false);

    const touch = useRef({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const observer = useRef<ResizeObserver>(null);
    const background = useMemo(() => new Image(), []);

    const clamp = (num: number, min: number, max: number) =>
        Math.min(Math.max(num, min), max);

    const handleWheel = (event: any) => {
        const { deltaY } = event;
        if (!draggind) {
            setZoom(
                clamp(
                    zoom + deltaY * SCROLL_SENSITIVITY * -1,
                    MIN_ZOOM,
                    MAX_ZOOM
                )
            );
        }
    };

    const handleMouseMove = (event: any) => {
        if (draggind) {
            const { x, y } = touch.current;
            const { clientX, clientY } = event;
            setOffset({
                x: offset.x + (x - clientX),
                y: offset.y + (y - clientY),
            });
            touch.current = { x: clientX, y: clientY };
        }
    };

    const handleMouseDown = (event: any) => {
        const { clientX, clientY } = event;
        touch.current = { x: clientX, y: clientY };
        setDragging(true);
    };

    const handleMouseUp = () => setDragging(false);

    const draw = useCallback(() => {
        if (canvasRef.current) {
            const { width, height } = canvasRef.current;
            const context = canvasRef.current.getContext("2d");

            // Set canvas dimensions
            canvasRef.current.width = width;
            canvasRef.current.height = height;

            // Clear canvas and scale it
            if (context) {
                context.translate(-offset.x, -offset.y);
                context.scale(zoom, zoom);
                context.clearRect(0, 0, width, height);

                // Make sure we're zooming to the center
                const x = (context.canvas.width / zoom - background.width) / 2;
                const y =
                    (context.canvas.height / zoom - background.height) / 2;

                // Draw image
                context.drawImage(background, x, y);
            }
        }
    }, [background, offset, zoom]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        observer.current = new ResizeObserver((entries) => {
            entries.forEach(({ target }) => {
                const { width, height } = background;
                // If width of the container is smaller than image, scale image down
                if (target.clientWidth < width) {
                    // Calculate scale
                    const scale = target.clientWidth / width;

                    // Redraw image

                    if (canvasRef.current) {
                        canvasRef.current.width = width * scale;
                        canvasRef.current.height = height * scale;

                        canvasRef.current
                            .getContext("2d")
                            ?.drawImage(
                                background,
                                0,
                                0,
                                width * scale,
                                height * scale
                            );
                    }
                }
            });
        });

        const conatiner = containerRef.current as HTMLDivElement;
        observer.current?.observe(conatiner);

        return () => observer.current?.unobserve(conatiner);
    }, [background]);

    useEffect(() => {
        background.src = image;

        if (canvasRef.current) {
            background.onload = () => {
                // Get the image dimensions
                const { width, height } = background;

                if (canvasRef.current) {
                    canvasRef.current.width = width;
                    canvasRef.current.height = height;

                    canvasRef.current
                        .getContext("2d")
                        ?.drawImage(background, 0, 0);
                }
            };
        }
    }, [background, image]);

    useEffect(() => {
        draw();
    }, [draw]);

    return (
        <div ref={containerRef}>
            <canvas
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onWheel={handleWheel}
                onMouseMove={handleMouseMove}
                ref={canvasRef}
            />
        </div>
    );
};

import { useEffect, useState } from 'react';

export const useMousePosition = () => {
    const [ x, setX ] = useState(-1);
    const [ y, setY ] = useState(-1);

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            setX(ev.pageX);
            setY(ev.pageY);
        };

        document.addEventListener('mousemove', updateMousePosition);

        return () => {
            document.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return { x, y };
};

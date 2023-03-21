import React, { ReactNode, useContext, useRef } from 'react';
import { createContext, useEffect, useState } from 'react';
import { useMousePosition } from './useMousePosition';

const highlightContext = createContext({
    isHighlighting: false,
    setHighlighting: (e: boolean) => {},
    text: '',
    setText: (e: string) => {},
});

export const HighlightProvider = (props: { children: ReactNode }) => {

    const [ isHighlighting, setHighlighting ] = useState(false);
    const [ text, setText ] = useState('');

    return (
        <highlightContext.Provider value={{
            text,
            setText,
            isHighlighting,
            setHighlighting,
        }}>
            {props.children}
        </highlightContext.Provider>
    );
}

export const useHighlight = () => {

    const context = useContext(highlightContext);
    const ref = useRef({
        x: -1,
        y: -1,
    });
    const [ localX, setLocalX ] = useState(-1);
    const [ localY, setLocalY ] = useState(-1);

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            ref.current.x = ev.pageX;
            ref.current.y = ev.pageY;
        };

        document.addEventListener('mousemove', updateMousePosition);

        return () => {
            document.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    useEffect(() => {
        if (ref.current.x && ref.current.y && context.isHighlighting) {
            setLocalX(ref.current.x);
            setLocalY(ref.current.y);
        }
    }, [context.isHighlighting, context.text]);

    useEffect(() => {
        const func = (e: MouseEvent) => {
            const tmp = window.getSelection()?.toString();

            context.setHighlighting(!!tmp);

            if (tmp) {
                context.setText(tmp || '');
            }
        };

        document.addEventListener('mouseup', func);

        return () => {
            document.removeEventListener('mouseup', func);
        };
    }, []);

    return {
        isHighlighting: context.isHighlighting,
        text: context.text,
        x: localX,
        y: localY,
    };
};

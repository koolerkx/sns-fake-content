import React, { useEffect, useState } from 'react';

const isNode = (e: EventTarget | null): e is Node => {
    if (!e || !("nodeType" in e)) {
        return false;
    }
    return true;
}

export const useOutsideAlerter = (ref: React.MutableRefObject<HTMLDivElement | null>) => {

    const [ isInside, setInside ] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target;
            if (isNode(target) && ref.current && !ref.current.contains(target)) {
                setInside(false);
            } else {
                setInside(true);
            }
        }
        // bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return {
        isInside,
        isOutside: !isInside,
    };
}

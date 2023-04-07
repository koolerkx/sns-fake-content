import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { HighlightProvider, useHighlight } from './hooks/useHighlight';
import { useOutsideAlerter } from './hooks/useOutsideAlerter';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import { detect } from '../api/detect';
import { FaMicroscope } from 'react-icons/fa';

const App = () => {
    // ref of the main app
    const ref = useRef<HTMLDivElement>(null);
    // some states
    const { isHighlighting, text, x, y } = useHighlight();
    const { isInside } = useOutsideAlerter(ref);

    const paddedX = useMemo(() => x + 8, [x]);
    const paddedY = useMemo(() => y + 8, [y]);

    const { mutate, data, isLoading, reset, isError, error } = useMutation('detect', detect);

    useEffect(() => {
        if (!isInside) {
            setTimeout(() => {
                reset();
            }, 500);
        }
    }, [isInside]);

    return (
        <div ref={ref} style={{
            // fading effect
            opacity: isHighlighting || isInside ? 1 : 0,
            // position
            position: 'absolute',
            left: `${paddedX}px`,
            top: isHighlighting || isInside ? `${paddedY}px` : `${paddedY + 16}px`,
            // on top of everything
            zIndex: 1000,
        }}>
            <div style={{
                backgroundColor: 'white',
                border: '4px solid #fc5185',
                borderRadius: '4px',
                padding: '8px',
                color: "#fc5185",
                fontSize: "16px",
            }} >
                {
                    isError && error ? (
                        <div>
                            error: {(error as Error).message}
                        </div>
                    ): data ? (
                        <div>
                            The creditability of this message is <b>{(data.data * 100).toFixed(2)}%</b>.
                            Hence It should be a <b>{data.data > .5 ? "true" : "false"}</b> message.
                        </div>
                    ) : isLoading ? (
                        <div>
                            loading...
                        </div>
                    ): (
                        <div
                            onClick={() => mutate(text)}
                            style={{ cursor: 'pointer' }}
                        >
                            <FaMicroscope width={32} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

// wrapper

const queryClient = new QueryClient();

export default () => {
    return (
        <HighlightProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </HighlightProvider>
    );
}
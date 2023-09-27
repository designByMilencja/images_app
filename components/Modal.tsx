'use client'

import React, {ReactNode, useCallback, useRef} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

const Modal = ({children}: { children: ReactNode }) => {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.push('/')
    }, [router]);

    const handleClick = useCallback((e: React.MouseEvent) => {
        if ((e.target === overlay.current) && onDismiss) {
            onDismiss()
        }
    }, [onDismiss, overlay]);


    return (
        <div ref={overlay} className="modal" onClick={handleClick}>
            <button type="button" onClick={onDismiss} className='absolute top-[.7%] right-8'>
                <Image src="/icons/bug-outline.svg" width={17} height={17} alt="close" className="bg-white"/>
            </button>
            <div ref={wrapper} className="modal_wrapper">
                {children}
            </div>
        </div>
    );
}

export default Modal;

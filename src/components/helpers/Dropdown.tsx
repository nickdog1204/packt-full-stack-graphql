import React, {PropsWithChildren, PropsWithRef, RefObject, useEffect, useRef, useState} from "react";


interface IDropdownProps extends PropsWithChildren {
    trigger: string | JSX.Element
}

const Dropdown: React.FC<IDropdownProps> = ({children, trigger}) => {
    const [show, setShow] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideClick<HTMLDivElement>(wrapperRef);

    function useOutsideClick<T extends HTMLElement>(ref: RefObject<T>) {
        useEffect(() => {
            function clickOutsideHandler(event: MouseEvent) {
                const cur = ref.current
                if (cur) {
                    const contains = cur.contains(event.target as Node)
                    if (!contains) {
                        setShow(false);
                    } else {
                    }
                }
            }
            document.addEventListener('mousedown', clickOutsideHandler)
            return () => {
                document.removeEventListener('mousedown', clickOutsideHandler)
            }
        }, [ref])

    }

    return (
        <div className="dropdown">
            <div>
                <div className="trigger" onClick={
                    () => {
                        // setShow(prevState => {
                        //     return !prevState
                        // })
                        setShow(true)
                    }
                }>
                    {trigger}
                </div>
                <div ref={wrapperRef}>
                    {show &&
                        (
                            <div className="content">
                                {children}
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )

}
export default Dropdown;
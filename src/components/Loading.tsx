import React from "react";

export interface ILoadingProps {
    color?: string;
    size?: number;
}

export interface IStyle {
    backgroundColor: string;
    width: number;
    height: number;
    color?: string;
}

const Loading: React.FC<ILoadingProps> = ({color, size}) => {
    const style: IStyle = {
        backgroundColor: '#6ca6fd',
        width: 40,
        height: 40
    }
    if (typeof color !== typeof undefined) {
        style.color = color;
    }
    if (size) {
        style.width = size;
        style.height = size
    }
    return (
        <div className='bouncer' style={style}/>
    )
}

export default Loading;
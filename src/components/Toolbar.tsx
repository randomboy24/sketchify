"use client"
import { Rect } from "konva/lib/shapes/Rect";
import { useState } from "react"
import { Circle } from "react-konva";

export const Toolbar = ({isDrawing,setIsDrawing}:any) => {

    return (
        <div className="flex justify-center mt-20">
            <div className="grid grid-cols-8 gap-4 bg-gray-800 w-4/12 pl-9 rounded-md h-14 pt-2">
                <div>
                    <button className="border-2 h-9 w-9 rounded-lg border-white" title="rectangle" onClick={() => setIsDrawing({...isDrawing,rect:true}) }></button>
                </div>
                <div>
                    <button className="border-2 h-9 w-9 rounded-full border-white
                    " title="ellipse" onClick={() => {
                        setIsDrawing({...isDrawing,ellipse:true})
                    }}></button>
                </div>
                <div>
                    <button className="h-9 w-9 text-5xl flex flex-col justify-end text-white" title="arrow">&rarr;</button>
                </div>
                <div>
                    <button className="h-9 w-9 text-4xl flex flex-col justify-end pl-2 pt-2 mt-1 text-white" title="line" onClick={() => {
                        setIsDrawing({...isDrawing,line:true})
                    }}>&#9472;</button>
                </div>
                <div>
                    <button className="h-9 w-9 text-2xl pt-2 text-white" title="draw"> 	
                    &#128393;</button>
                </div>
                <div>
                    <button className="h-9 w-9 text-4xl font-serif text-white" title="text">T</button>
                </div>
                <div>
                    <button className="h-9 w-9 text-3xl" title="insert image">&#128247;</button>
                </div>
                <div>
                    <button className="h-9 w-9 text-3xl pt-1 text-white" title="eraser">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.01 4.01 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0M4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53l-4.95-4.95z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}


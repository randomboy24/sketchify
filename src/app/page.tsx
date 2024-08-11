"use client"

import { Toolbar } from "@/components/Toolbar"
import { useState } from "react"
import { Ellipse, Layer, Line, Rect, Stage } from "react-konva"

interface ShapeTypes {
  x: number,
  y: number,
  width?: number,
  height?: number,
  radiusx?:number,
  radiusy?:number,
  fill?: string,
  stroke?: string,
  strokeWidth?: number,
  points?:number[]
}

interface LineTypes{
  points:number[]
  stroke:string,
  strokeWidth:number
}

const Home = () => {
  const [rects, setRect] = useState<ShapeTypes[]>([]);
  const [ellipse,setEllipse] = useState<ShapeTypes[]>([]);
  const [lines,setLines] = useState<LineTypes[]>([])
  const [isDrawing, setIsDrawing] = useState({
    rect:false,
    ellipse:false,
    arrow:false,
    line:false,
    draw:false,
    text:false
  });
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseDown = (event: any) => {
    if (isDrawing.rect) {
      setIsClicked(true);
      const stage = event.target.getStage();
      const { x, y } = stage.getPointerPosition();
      setRect(rects => [...rects, {
        x,
        y,
        width: 0,
        height: 0,
        stroke: "white"
      }]);
    }
    if(isDrawing.ellipse){
      setIsClicked(true);
      const stage = event.target.getStage();
      const  { x, y } = stage.getPointerPosition();
      setEllipse(ellipse => [...ellipse,{
        x,
        y,
        radiusx:0,
        radiusy:0,
        stroke:"white"
      }])
    }
    if(isDrawing.line){
      setIsClicked(true)
      const stage = event.target.getStage();
      const{ x, y } = stage.getPointerPosition();
      setLines(lines => [...lines,{
        points:[x,y],
        stroke:"white",
        strokeWidth:3
      }])
    }
  };
  

  const handleMouseMove = (event: any) => {
    if (isClicked && isDrawing.rect) {
      const stage = event.target.getStage();
      const { x, y } = stage.getPointerPosition();
      setRect(rects => {
        const newRects = [...rects];
        const lastRect = newRects[newRects.length - 1];
        if (lastRect) {
          lastRect.width = x - lastRect.x;
          lastRect.height = y - lastRect.y;
          newRects[newRects.length - 1] = lastRect;
        }
        return newRects;
      });
    }
    if(isClicked && isDrawing.ellipse){
      const stage = event.target.getStage();
      const { x, y } = stage.getPointerPosition();
      setEllipse(ellipse => {
        const newEllipses = [...ellipse];
        const lastEllipse = newEllipses[newEllipses.length -1];
        if(lastEllipse){
          lastEllipse.radiusx = Math.abs(x -lastEllipse.x);
          lastEllipse.radiusy = Math.abs(y -lastEllipse.y);
          newEllipses[newEllipses.length -1] = lastEllipse;
        }
        return newEllipses;
      })
    }
    if(isClicked && isDrawing.line){
      const stage = event.target.getStage();
      const { x, y } = stage.getPointerPosition();
      setLines(lines => {
        const newLines = [...lines];
        const lastLine = newLines[newLines.length -1];
        if(lastLine){
          lastLine.points = [...lastLine.points,x,y];
          newLines[newLines.length -1] = lastLine;
        }
        return newLines;
      })
    }
  };

  const handleMouseUp = () => {
    setIsClicked(false);
    setIsDrawing({...isDrawing,rect:false,ellipse:false,line:false})
  };

  return (
    <div>
      <div className="bg-[var(--custom-color)] w-screen h-screen">
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {rects.map((rect, index) => (
              <Rect
                key={index}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                stroke={rect.stroke}
                strokeWidth={rect.strokeWidth}
              />
            ))}
            {ellipse.map((ellipse,index) => (
              <Ellipse
                key={index}
                x={ellipse.x}
                y={ellipse.y}
                radiusX={ellipse.radiusx as number}
                radiusY={ellipse.radiusy as number}
                stroke={ellipse.stroke}
                />
            ))}
           {lines.map((line,index) => (
            <Line
              key={index}
              points={line.points}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              tension={0}
              />
           ))}
          </Layer>
        </Stage>
      </div>
      <div className="absolute top-8 left-14 min-w-full">
        <Toolbar isDrawing={isDrawing} setIsDrawing={setIsDrawing} />
      </div>
    </div>
  );
}

export default Home;

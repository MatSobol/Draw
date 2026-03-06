import { useEffect } from "react";

export const useRoom = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  channelRef: React.RefObject<RTCDataChannel>,
) => {
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!canvas || !container) {
      alert("canvas did not initialized");
      return;
    }

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    channelRef.current.onmessage = (e) => {
      const position = JSON.parse(e.data);
      drawLine(position[0], position[1], canvas);
    };
  }, []);
};

export const drawLine = (
  startPoint: { x: number; y: number },
  endPoint: { x: number; y: number },
  canvas: HTMLCanvasElement,
) => {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    alert("canvas has no context");
    return;
  }

  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(endPoint.x, endPoint.y);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
};

export const useHandleMouseMove = (
  e: MouseEvent,
  canvasRef: React.RefObject<HTMLCanvasElement | null>, 
  sendData: (data: string) => Promise<void>,
  latestPoint: React.RefObject<{
    x: number;
    y: number;
  }>,
) => {
  const canvas = canvasRef.current;
  
  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  const current = {
    x: e.clientX,
    y: e.clientY,
  };

  const startPoint = latestPoint.current;

  sendData(JSON.stringify([startPoint, current]));
  drawLine(startPoint, current, canvas);

  latestPoint.current = current;
};

export const handlePointerDown = (
  e: React.PointerEvent<HTMLCanvasElement>,
  latestPoint: React.RefObject<{
    x: number;
    y: number;
  }>,
  handleMouseMove: (e: MouseEvent) => void,
) => {
  latestPoint.current = { x: e.clientX, y: e.clientY };
  window.addEventListener("mousemove", handleMouseMove);
};

export const handlePointerUp = (handleMouseMove: (e: MouseEvent) => void) => {
  window.removeEventListener("mousemove", handleMouseMove);
};

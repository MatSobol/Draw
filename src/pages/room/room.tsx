import { useRef } from "react";
import styles from "./room.module.css";
import { useWebrtc } from "../../context/webrtcContext";
import {
  handlePointerDown,
  handlePointerUp,
  useHandleMouseMove,
  useRoom,
} from "./useRoom";

export const Room = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const latestPoint = useRef({ x: 0, y: 0 });

  const { sendData, channelRef } = useWebrtc();

  if (!channelRef || !channelRef.current) {
    return <div>WEBRTC CONNECTION NOT INITIALIZED</div>;
  }

  useRoom(
    containerRef,
    canvasRef,
    channelRef as React.RefObject<RTCDataChannel>,
  );

  const handleMouseMove = (e: MouseEvent) =>
    useHandleMouseMove(e, canvasRef, sendData, latestPoint);

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas
        onPointerDown={(e) =>
          handlePointerDown(e, latestPoint, handleMouseMove)
        }
        onPointerUp={() => handlePointerUp(handleMouseMove)}
        ref={canvasRef}
        className={styles.drawArea}
      ></canvas>
    </div>
  );
};

import { createContext, useContext, useRef, type ReactNode } from "react";
import {
  acceptAnswer,
  acceptOffer,
  createOffer,
  sendData,
} from "../utility/webrtc";

export type WebrtcContextType = {
  createOffer: () => Promise<string>;
  acceptOffer: (
    offer: string,
    handleOnMessage: (e: MessageEvent) => void,
  ) => Promise<string>;
  acceptAnswer: (answer: string) => Promise<void>;
  sendData: (data: string) => Promise<void>;
  channelRef: React.RefObject<RTCDataChannel | null>;
};

export const WebrtcContext = createContext<WebrtcContextType | null>(null);

export const WebrtcProvider = ({ children }: { children: ReactNode }) => {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });
  const channelRef = useRef<RTCDataChannel | null>(null);

  const value: WebrtcContextType = {
    createOffer: async () => createOffer(pc, channelRef),
    acceptOffer: async (
      offert: string,
      handleOnMessage: (e: MessageEvent) => void,
    ) => acceptOffer(pc, channelRef, handleOnMessage, offert),
    acceptAnswer: async (answer: string) => acceptAnswer(pc, answer),
    sendData: (data: string) => sendData(channelRef, data),
    channelRef: channelRef,
  };

  return (
    <WebrtcContext.Provider value={value}>{children}</WebrtcContext.Provider>
  );
};

export const useWebrtc = () => {
  const context = useContext(WebrtcContext);

  if (!context) {
    throw new Error("useWebrtc must be used inside WebrtcProvider");
  }

  return context;
};

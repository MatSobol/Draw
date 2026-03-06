export const createOffer = async (
  pc: RTCPeerConnection,
  channelRef: React.RefObject<RTCDataChannel | null>,
) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      channelRef.current = pc.createDataChannel("chat");

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      pc.onicecandidate = (e) => {
        if (!e.candidate) {
          resolve(JSON.stringify(pc.localDescription));
        }
      };
    } catch (err) {
      reject("Issue with creating context");
    }
  });
};

export const acceptOffer = async (
  pc: RTCPeerConnection,
  channelRef: React.RefObject<RTCDataChannel | null>,
  handleOnMessage: (e: MessageEvent) => void,
  offer: string,
) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      pc.ondatachannel = (event) => {
        channelRef.current = event.channel;
        channelRef.current.onmessage = handleOnMessage;
      };

      await pc.setRemoteDescription(JSON.parse(offer));

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      pc.onicecandidate = (e) => {
        if (!e.candidate) {
          resolve(JSON.stringify(pc.localDescription));
        }
      };
    } catch (err) {
      reject("Issue with accepting offer");
    }
  });
};

export const acceptAnswer = async (pc: RTCPeerConnection, answer: string) => {
  const remoteDesc = new RTCSessionDescription(JSON.parse(answer));
  await pc.setRemoteDescription(remoteDesc);
};

export const sendData = async (
  channelRef: React.RefObject<RTCDataChannel | null>,
  message: string,
) => {
  channelRef.current?.send(message);
};

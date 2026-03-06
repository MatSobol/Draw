import { useWebrtc } from "../../context/webrtcContext";
import { Copy } from "../../components/copy";
import { Paste } from "../../components/paste";

import { ButtonIcon } from "../../components/buttonIcon";
import { useNavigate } from "react-router-dom";

export const CreateRoom = () => {
  const navigate = useNavigate();

  const { createOffer, acceptAnswer, sendData } = useWebrtc();

  return (
    <div className="container" style={{ gap: "20px" }}>
      <ButtonIcon
        func={async () => {
          const offer = await createOffer();
          navigator.clipboard.writeText(offer);
        }}
        type="secondary"
        text="Offer"
        hint="Copy to clipboard"
        Icon={Copy}
      />

      <ButtonIcon
        type="secondary"
        text="Answer"
        hint="Click to give answer from clipboard"
        func={async () => {
          const answer = await navigator.clipboard.readText();
          try {
            await acceptAnswer(answer);
          } catch (err) {
            alert(err);
          }
        }}
        Icon={Paste}
      />

      <button
        className="primary"
        onClick={() => {
          sendData("Hello");
          navigate("/room");
        }}
      >
        Start
      </button>
    </div>
  );
};

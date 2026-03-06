import { useWebrtc } from "../../context/webrtcContext";
import { ButtonIcon } from "../../components/buttonIcon";

import { Paste } from "../../components/paste";
import { useNavigate } from "react-router-dom";

export const JoinRoom = () => {
  const { acceptOffer } = useWebrtc();

  const navigate = useNavigate();

  return (
    <div className="container">
      <ButtonIcon
        type="secondary"
        text="Offer"
        hint="Click to give offer from clipboard"
        func={async () => {
          const offer = await navigator.clipboard.readText();
          try {
            const answer = await acceptOffer(offer, () => navigate("/room"));
            navigator.clipboard.writeText(answer);
          } catch (err) {
            alert(err);
          }
        }}
        Icon={Paste}
      />
    </div>
  );
};

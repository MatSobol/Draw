
# Draw
Website that uses webrtc to connect two users and allow them to draw real time.

## Tutorial

A user can create a room, while another can join the room. The host clicks Offer, which copies the offer to the clipboard. The client then clicks Offer, which reads the offer from the clipboard and generates an Answer, also copied to the clipboard. The host clicks the Answer button to read the answer from the clipboard. Once both the offer and answer are set, the host can click Start to begin the drawing session.

If the client and host are not on the same computer, the offer and answer must be shared through a third party.
## Appearance

Home page:

<img width="900" height="600" alt="image" src="https://github.com/user-attachments/assets/5e2efb6f-669b-4145-a48f-25fa82013b43" />

Create room:

<img width="521" height="524" alt="image" src="https://github.com/user-attachments/assets/1c7860ba-b241-4cf9-919d-5db52d1f4b2a" />

Join room:

<img width="408" height="254" alt="image" src="https://github.com/user-attachments/assets/5cda5913-e70a-4e88-8367-b82a4fe38c24" />

Drawing on both host and user:

<img width="900" height="600" alt="image" src="https://github.com/user-attachments/assets/7143c4a8-5a76-4353-a17b-3129dd3fbb1e" />

## Not Supported

- Mobile devices
- Different canvas sizes between users
- Rescaling or moving the canvas


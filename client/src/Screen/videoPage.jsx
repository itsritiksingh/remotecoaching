import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";

let socket;

export const VideoPage = () => {
  useEffect(() => {
    //get it from last of the url
    const ROOM_ID = window.location.href.split("/").splice(-1)[0];

    socket = io("",{
      transports:['websocket', 'polling']
  });
    const videoGrid = document.getElementById("view-grid");
    const myPeer = new Peer(undefined, {
      host: "peerserver-afd4ezae2q-uc.a.run.app",
      path:"/myapp"
    });
    const myVideo = document.createElement("video");
    myVideo.muted = true;
    const peers = {};

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio:true
      })
      .then((stream) => {
        addVideoStream(myVideo, stream);
        socket.on("user-connected", (userId) => {
          connectToNewUser(userId, stream);
        });
        socket.on("user-disconnected", (userId) => {
          if (peers[userId]) peers[userId].close();
        });
        myPeer.on("call", (call) => {
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (uservideostream) => {
            addVideoStream(video, uservideostream);
          });
        });
      });
    myPeer.on("open", (id) => {
      socket.emit("join-room", ROOM_ID, id);
    });
    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream);
      const video = document.createElement("video");
      call.on("stream", (uservideostream) => {
        addVideoStream(video, uservideostream);
      });
      call.on("close", () => {
        video.remove();
      });
      peers[userId] = call;
    }
    function addVideoStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      videoGrid.append(video);
    }
  }, []);

  return (
    <>
      <div
        id="view-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 300px)",
          gridAutoRows: "300px",
          gap: "10px",
          padding: "1rem"
        }}
      ></div>
      <div className="options"></div>
      <div className="rightMenu"></div>
    </>
  );
};

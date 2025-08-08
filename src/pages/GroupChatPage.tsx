import React, { useEffect, useState } from "react";
import type { Datas } from "../data/interfaces";
import data from "../data/dummy_response.json";
import { NavLink } from "react-router-dom";
import { customAlphabet } from "nanoid";

function GroupChatPage() {
  const [response, setResponse] = useState<Datas>();
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const roomId = window.location.pathname.split('/').pop();
  const nanoid = customAlphabet('1234567890', 8);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      data.results[0].comments.push({
        id: Number(nanoid()),
        type: "text",
        message: message,
        sender: userId
      })
      setResponse(data);
      setMessage("");
    }
  }

  useEffect(() => {
    const handleFetchData = () => {
      setResponse(data);
    };

    handleFetchData();

    if (response) {
      setUserId(response.results[0].room.participant[1].id);
    }
  }, [response]);

  return (
    <div className="h-screen">
      <nav className="flex items-center justify-between bg-white p-4 top-0 sticky">
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="fill-black hover:fill-celadon-blue hover:cursor-pointer transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
          </NavLink>
          <NavLink className={"flex items-center space-x-4"} to={`/group/${roomId}/detail`}>
            <img
              src={response?.results[0].room.image_url}
              alt={response?.results[0].room.name}
              className="w-12 h-12 rounded-full space-x-4"
            />
            <div>
              <p className="font-bold">{response?.results[0].room.name}</p>
              <ul className="flex">
                {response?.results[0].room.participant.map((participant) => (
                  <li key={participant.id} className="text-sm text-gray-600">
                    {participant.name}{participant.id !== response?.results[0].room.participant[response?.results[0].room.participant.length - 1].id ? ', ' : ''}
                  </li>
                ))}
              </ul>
            </div>
          </NavLink>
        </div>
        <div>
          <button className="hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </svg>
          </button>
        </div>
      </nav>

      <ul className="flex flex-col p-4 space-y-2 h-[calc(100vh-10rem)] overflow-y-auto">
        {
          response?.results[0].comments.map((message) => (
            <li key={message.id} className={`${message.sender === userId ? 'bg-iguana-green text-black place-self-end' : 'bg-neutral text-black place-self-start'} max-w-2/3 rounded-lg p-2`}>
              {
                message.sender !== userId && (
                  <p className="font-bold text-sm">{message.sender}</p>
                )
              }
              <p>{message.message}</p>
            </li>
          ))
        }
      </ul>

      <footer className="bg-white p-4 flex bottom-0 w-full sticky">
        <form onSubmit={handleSendMessage} className="w-full flex justify-between items-end space-x-2">
          <div className="h-auto w-full min-h-12 pl-4 py-2 bg-gray-200 flex items-end rounded-4xl">

            <textarea name="message" id="message" placeholder="Type message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full focus:outline-none field-sizing-content min-h-8 max-h-40"></textarea>

            <input id="file" type="file" accept="image/*, video/*, .pdf" hidden />
            <label htmlFor="file" className="mx-4 hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z" /></svg>

            </label>
          </div>
          <button className="bg-dollar-bill px-3 w-12 h-12 flex items-center justify-center rounded-full hover:bg-celadon-blue hover:cursor-pointer transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>
          </button>
        </form>
      </footer>
    </div>
  )
}

export default GroupChatPage;
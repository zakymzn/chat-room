import { useEffect, useState } from "react";
import type { Datas, UploadedFile } from "../data/interfaces";
import data from "../data/dummy_response_extended.json";
import { NavLink } from "react-router-dom";
import vector from "../assets/select_chat.svg";
import { customAlphabet } from "nanoid";
import RenderFile from "../components/RenderFile";

function HomePage() {
  const [response, setResponse] = useState<Datas>();
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<number>(0);
  const [showGroupDetail, setShowGroupDetail] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [sentFile, setSentFile] = useState<UploadedFile[]>([]);
  const nanoid = customAlphabet('1234567890', 8);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      data.results[0].comments.push({
        id: Number(nanoid()),
        type: selectedFile ? "attachment" : "text",
        message: message,
        sender: userId,
        file: selectedFile ? [selectedFile] : []
      })
      setResponse(data);
      if (selectedFile) {
        setSentFile([...sentFile, selectedFile]);
      }
      setMessage("");
      setSelectedFile(null);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0]
    if (file) {
      const id = Number(nanoid());
      const url = URL.createObjectURL(file);
      const type = file.type;
      setSelectedFile({ id, file, url, type });
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
    <div className="flex">
      {/* Chat List */}
      <div className="lg:w-1/3 w-full h-screen overflow-y-auto">
        <nav className="flex items-center justify-between bg-white p-4 top-0 sticky">
          <div className="">
            <p className="text-2xl text-celadon-blue font-bold">Chat Room</p>
          </div>
          <div className="space-x-8">
            <button className="hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M120-160v-600q0-33 23.5-56.5T200-840h480q33 0 56.5 23.5T760-760v203q-10-2-20-2.5t-20-.5q-10 0-20 .5t-20 2.5v-203H200v400h283q-2 10-2.5 20t-.5 20q0 10 .5 20t2.5 20H240L120-160Zm160-440h320v-80H280v80Zm0 160h200v-80H280v80Zm400 280v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM200-360v-400 400Z" />
              </svg>
            </button>
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

        <ul>
          {
            response?.results.map((item) => (
              <li key={item.room.id} onClick={() => setSelectedRoom(item.room.id)} className="p-4 border-t border-b border-gray-200 hover:cursor-pointer hover:bg-gray-100 transition-all duration-200">
                <NavLink to={`/group/${item.room.id}`} className="lg:hidden flex items-center space-x-4" end>
                  <img
                    src={item.room.image_url}
                    alt={item.room.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="w-full">
                    <p className="text-lg font-semibold">{item.room.name}</p>
                    <p>{item.comments[item.comments.length - 1].sender}: {item.comments[item.comments.length - 1].message}</p>
                  </div>
                </NavLink>
                <div className="lg:flex items-center space-x-4 hidden">
                  <img
                    src={item.room.image_url}
                    alt={item.room.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="w-full">
                    <p className="text-lg font-semibold">{item.room.name}</p>
                    <p>{item.comments[item.comments.length - 1].sender === userId ? 'You' : item.comments[item.comments.length - 1].sender}: {item.comments[item.comments.length - 1].message}</p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>

      {/* Group Chat */}
      <div className={`h-screen hidden lg:w-2/3 lg:block`}>
        {
          selectedRoom && response?.results.find(item => item.room.id === selectedRoom) ? (
            <div className="h-screen">
              <nav className="flex items-center justify-between bg-white p-4 top-0 sticky">
                <div onClick={() => setShowGroupDetail(!showGroupDetail)} className="flex items-center space-x-4 hover:cursor-pointer">
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
                    <li key={message.id} className={`${message.sender === userId ? 'bg-iguana-green text-black place-self-end' : 'bg-neutral text-black place-self-start'} max-w-4/5 rounded-lg p-2`}>
                      {
                        message.sender !== userId && (
                          <p className="font-bold text-sm">{message.sender}</p>
                        )
                      }
                      {
                        message.file.length > 0 && sentFile && (
                          <div>
                            {
                              message.file.map((f, index) => (<RenderFile key={index} file={f.file} id={f.id} url={f.url} type={f.type} />))
                            }
                          </div>
                        )
                      }
                      <p>{message.message}</p>
                    </li>
                  ))
                }
              </ul>

              <footer className="bg-white p-4 flex bottom-0 w-full">
                {
                  selectedFile && (
                    <div className="bg-gray-200 p-4 w-fit rounded-2xl bottom-20 fixed flex justify-center mb-2">
                      <RenderFile file={selectedFile.file} id={selectedFile.id} url={selectedFile.url} type={selectedFile.type} />
                    </div>
                  )
                }
                <form onSubmit={handleSendMessage} className="w-full flex justify-between items-end space-x-2">
                  <div className="h-auto w-full min-h-12 pl-4 py-2 bg-gray-200 flex items-end rounded-4xl">
                    <textarea name="message" id="message" placeholder="Type message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full focus:outline-none field-sizing-content min-h-8 max-h-40"></textarea>
                    <input id="file" type="file" accept="image/*, video/*, .pdf" onChange={handleFileChange} hidden />
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
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <img src={vector} alt="No chat selected" className="w-1/4 h-auto mb-4" />
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          )
        }
      </div>

      {/* Group Detail */}
      <div className={`w-1/3 ${showGroupDetail ? 'lg:block' : ''} hidden h-screen overflow-y-auto`}>
        <nav className="flex items-center justify-between p-4 top-0 sticky">
          <button onClick={() => setShowGroupDetail(false)} className="hover:cursor-pointer hover:fill-celadon-blue transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
          </button>
          <p className="text-lg font-bold">Group Info</p>
          <div className="space-x-8">
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

        <div>
          <img
            src={response?.results[0].room.image_url}
            alt={response?.results[0].room.name}
            className="w-36 h-36 object-cover rounded-full mx-auto my-4"
          />
          <div>
            <h1 className="text-2xl font-bold text-center">{response?.results[0].room.name}</h1>
            <p className="text-center">{response?.results[0].room.participant.length} members</p>
            <p className="text-xl font-semibold px-4">Member list</p>
            <ul className="mt-2 space-y-4 px-4">
              <li className="flex justify-between items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 20 20" height="48px" viewBox="0 0 20 20" width="48px" fill="#B7B7B7"><g><rect fill="none" height="20" width="20" /></g><g><g><path d="M10 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3.5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 11c-2.05 0-3.87-.95-5.07-2.44 1.45-.98 3.19-1.56 5.07-1.56s3.62.58 5.07 1.56c-1.2 1.49-3.02 2.44-5.07 2.44z" /></g></g></svg>
                  <p className="font-bold">You</p>
                </div>
                <p className="border border-iguana-green text-dollar-bill text-xs px-2 py-1 rounded-lg">Group Admin</p>
              </li>
              {response?.results[0].room.participant.map((participant) => (
                <li key={participant.id}>
                  {
                    participant.id !== userId && (
                      <div className="flex justify-between items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 20 20" height="48px" viewBox="0 0 20 20" width="48px" fill="#B7B7B7"><g><rect fill="none" height="20" width="20" /></g><g><g><path d="M10 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3.5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 11c-2.05 0-3.87-.95-5.07-2.44 1.45-.98 3.19-1.56 5.07-1.56s3.62.58 5.07 1.56c-1.2 1.49-3.02 2.44-5.07 2.44z" /></g></g></svg>
                          <p className="font-bold line-clamp-1">{participant.name}</p>
                        </div>
                        {
                          (participant.role == 0 || participant.role == 1) && (
                            <p className="border border-iguana-green text-dollar-bill text-xs px-2 py-1 rounded-lg">Group Admin</p>
                          )
                        }
                      </div>
                    )
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
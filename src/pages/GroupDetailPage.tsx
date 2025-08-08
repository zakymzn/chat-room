import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import type { Datas } from "../data/interfaces";
import data from "../data/dummy_response_extended.json";

function GroupDetailPage() {
  const [response, setResponse] = useState<Datas>();
  const [userId, setUserId] = useState("");
  const roomId = window.location.pathname.split('/').pop();

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
    <div>
      <nav className="flex items-center justify-between p-4 top-0 sticky">
        <NavLink to={`/group/${response?.results[0].room.id}`} className="fill-black hover:fill-celadon-blue hover:cursor-pointer transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
        </NavLink>
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
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="48px" viewBox="0 0 20 20" width="48px" fill="#B7B7B7"><g><rect fill="none" height="20" width="20" /></g><g><g><path d="M10 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3.5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 11c-2.05 0-3.87-.95-5.07-2.44 1.45-.98 3.19-1.56 5.07-1.56s3.62.58 5.07 1.56c-1.2 1.49-3.02 2.44-5.07 2.44z" /></g></g></svg>
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
  )
}

export default GroupDetailPage;
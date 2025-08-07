import { useEffect, useState } from "react";
import type { Datas } from "../data/interfaces";
import data from "../data/dummy_response.json";
import { NavLink } from "react-router-dom";

function HomePage() {
  const [response, setResponse] = useState<Datas>();

  useEffect(() => {
    const handleFetchData = () => {
      setResponse(data);
    };

    handleFetchData();
  });

  return (
    <div>
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
            <li key={item.room.id} className="p-4 border-t border-b border-gray-200 hover:cursor-pointer hover:bg-gray-100 transition-all duration-200">
              <NavLink to={`/group/${item.room.id}`} className="flex items-center space-x-4" end>
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
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default HomePage;
import React, { useState, useEffect } from "react";
import './App.css';
function App() {
  console.log("something")
  console.log("test")
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [body, setbody] = useState();
  const [selectedPost, setSelectedPost] = useState({});
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);
  const handleDelete = id => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPosts(prevUsers => prevUsers.filter(user => user.id !== id));
      })
      .catch((error) => console.log("Here is some error", error));
  };
  const handleUpdate = user => {
    setShowModal(!showModal);
    setSelectedPost(user);
    setId(user.id);
    setTitle(user.title);
    setbody(user.body);
  };

  const idFunc = event => {
    setId(event.target.value);
  };

  const titleFunc = event => {
    setTitle(event.target.value);
  };
  const useremail = event => {
    setbody(event.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, title, body }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then(() => {
        setPosts(prevPosts =>
          prevPosts.map(p =>
            p.id === selectedPost.id
              ? { ...p, id, title, body }
              : p
          )
        );
        setShowModal(false);
      })
      .catch((error) => console.log("Error updating post", error));
  };
  return (
    <>
      <center>
        <div className="absolute z-10 bg-gray-300 rounded-md">
          {showModal && (
            <div className=" relative w-[500px] h-[300px] borber border border-gray-400 rounded-md flex flex-col justify-center items-center">
              <div className="flex flex-col justify-start items-start w-full pl-2">
                <p className="text-base pl-1">Id:</p>
                <input type="text" className="text-xs border border-gray-500 w-[30%] pl-2 py-2 rounded-md" onChange={idFunc} value={id} />
              </div>
               <div className="flex flex-col justify-start items-start w-full pl-2">
                <p className="text-base pl-1">Title:</p>
                <input type="text" className="text-xs border border-gray-500 w-[70%] pl-2 py-2 rounded-md" onChange={titleFunc} value={title} />
              </div>
               <div className="flex flex-col justify-start items-start w-full pl-2">
                <p className="text-base pl-1">Body:</p>
                <input type="text" className="text-xs border border-gray-500 w-[70%] pl-2 py-2 rounded-md" onChange={useremail} value={body} />
              </div>
               <div className="flex flex-col justify-start items-start w-full pl-2 mt-2">
                <button type="submit" className="text-xs border border-gray-500 rounded-md px-2 py-1 bg-blue-500 text-white hover:bg-green-400" onClick={handleSubmit}>Submit</button>
              </div>
              
              
            </div>
          )}
        </div>
      </center>
    
      <div className="bg-gray-100 flex justify-center items-center">
        <div className='flex flex-wrap justify-center items-center gap-2 w-11/12'>
          {posts &&
            posts.map((user) => (
              <div className="flex flex-col bg-purple-300 w-[30%]  px-2 py-3 rounded-md border border-gray-500 relative">
                <div className='flex flex-col  justify-center items-start gap-2'>
                  <div className="flex rounded-lg bg-blue-600 p-2">
                    <p className="flex justify-start text-white text-xs font-bold">Id:{user.id}</p>
                  </div>
                  
                  <div className="flex justify-start items-start flex-col pl-4">
                    <p className="text-base font-semibold">Title:</p>
                    <p className="flex text-sm font-normal pl-8 text-gray-800">{user.title}</p>
                  </div>
                   <div className="flex justify-start items-start flex-col pl-4">
                    <p className="text-base font-semibold">Body:</p>
                    <p className="flex text-sm font-normal pl-8 text-gray-800">{user.body}</p>
                  </div>
                  <div className='flex justify-start pl-4 gap-2'>
                      <div>
                        <button type='button' className="bg-red-500 px-2 py-1 text-sm text-white rounded-md" onClick={() => handleDelete(user.id)}>delete</button>
                      </div>
                    <div>
                      <button type="button" className="bg-blue-500 px-2 py-1 text-sm text-white rounded-md" onClick={() => handleUpdate(user)}>update</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default App;
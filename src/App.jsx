import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(()=>{
   const  userLocal = localStorage.getItem("user")
    console.log(JSON.parse(userLocal).token)
    setUser(JSON.parse(userLocal))
  },[])
  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await blogService.login({ username, password });
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };


  if (user === null) {
    return (
      <>
        <LoginForm
          handelSubmit={handelSubmit}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </>
    );
  }
  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

};

export default App;

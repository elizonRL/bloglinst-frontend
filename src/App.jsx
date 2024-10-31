import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/addblogfrom';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      const user = JSON.parse(userLocal);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await blogService.login({ username, password });
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };
  const handelLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
      <p>{user.name} logged in <button type='submit' onClick={handelLogout}>logout</button></p>
      <AddBlogForm/>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default App;

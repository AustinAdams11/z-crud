import { useContext, useState, useEffect } from 'react';
import { AppContext } from './App'

export default function Login() {
    const [items, setItems] = useState([]);
    const { username, setUsername, isLoggedIn, setIsLoggedIn } = useContext(AppContext);

    useEffect(() => {
        fetch('http://localhost:8000/coffee')
        .then(res => res.json())
        .then(json => setItems(json))
    }, []);

    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const handleLoginChange = (e) => {
      setLoginForm({...loginForm, [e.target.name]:e.target.value});
    };
    const handleLoginClick = () => {
      fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setIsLoggedIn(true);
          setUsername(data.username);
          alert('Login Successful');
        } else {
          alert('Login Failed');
        }
      });
    };
  
return (
  <div style={{ padding: '2rem' }}>
    <h1>Adams Coffee Supply</h1>

    <h2>Login</h2>
    <input 
    name="username"
    placeholder="Username" 
    value={loginForm.username} 
    onChange={handleLoginChange}/>
    <input
    name="password"
    type="password"
    placeholder="Password"
    value={loginForm.password}
    onChange={handleLoginChange}/>
    <button onClick={handleLoginClick}>Login</button>

    <h2>Register</h2>
    <form>
       <input name="first_name" placeholder="First Name" />
      <input name="last_name" placeholder="Last Name" />
      <input name="username" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>

    <h2>All Coffee Items</h2>
    <ul>
      {items.map(item => (
        <li key={item.id}>
            {item.item_name}, {item.description}, {item.quantity}
        </li>
      ))}
    </ul>
  </div>
)}

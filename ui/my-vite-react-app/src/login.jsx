import { useState, useContext } from 'react';
import { AppContext } from './App';
import { useNavigate, Link } from 'react-router-dom';

function HomePage() {

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const { setIsLoggedIn, setUsername, setUserId } = useContext(AppContext);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("login button clicked")
    console.log("Current loginUsername:", loginUsername);
    console.log("Current loginPassword:", loginPassword);
    if (!loginUsername || !loginPassword) {
      alert('Please enter both username and password');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      const data = await res.json();
      console.log('Login response:', data);

      if (data.id) {
        setIsLoggedIn(true);
        setUsername(data.username);
        setUserId(data.id);
        alert(`Hello, ${data.username}!`);

        setLoginUsername('');
        setLoginPassword('');

        navigate('/inventory');
      } else {
        alert(data.message || 'Invalid login');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !registerUsername || !registerPassword) {
      alert('Please fill in all registration fields');
      return;
    }
    try {
      const res = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: registerUsername,
          password: registerPassword,
        }),
      });

      const data = await res.json();
      console.log('Register response:', data);

      if (data.id) {
        alert(`Account created for ${data.username}!`);

        setFirstName('');
        setLastName('');
        setRegisterUsername('');
        setRegisterPassword('');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Adams Coffee Supply</h1>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ color: ' rgb(160, 28, 28)' }}>Log In</button>
      </form>

      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ color: ' rgb(160, 28, 28)' }}>Sign Up</button>
      </form>
      <p><button><Link to="/guest" style={{ color: ' rgb(160, 28, 28)' }}>Guest View</Link></button></p>
    </div>
  );
}

export default HomePage;
import React, { useState } from 'react';

const AUTH_BASE = process.env.REACT_APP_AUTH_BASE;

const AuthForm = ({ onAuth, mode = 'login' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = mode === 'register' ? 'register' : 'login';
    const url = `${AUTH_BASE}/${endpoint}`;

    try {
      const payload = mode === 'register'
        ? { name, email, password }
        : { email, password };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Auth failed');

      if (mode === 'login') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.name);     
        localStorage.setItem('displayName', data.name); 
        onAuth(data.name);
      } else {
        setMessage('✅ Registration successful. You can now log in.');
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default AuthForm;

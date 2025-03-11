import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserApi from '../data/user.api';

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await UserApi.createUser(formData);
      navigate('/');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={styles.input}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.showPasswordButton}>
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={!isFormValid || loading} style={isFormValid ? styles.button : styles.buttonDisabled}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p style={styles.linkText}>
        Already have an account? <a href="/" style={styles.link}>Login here</a>
      </p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '350px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    width: '100%',
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  showPasswordButton: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s',
  },
  buttonDisabled: {
    padding: '10px',
    backgroundColor: '#cccccc',
    color: '#666',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  linkText: {
    fontSize: '14px',
    marginTop: '10px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default RegistrationPage;

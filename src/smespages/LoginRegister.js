import React, { useState } from 'react';
import './LoginRegister.css';
import { Mail, Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginRegister() {
  const navigate = useNavigate(); // ✅ Correctly placed inside the component

  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = () => {
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Invalid email address';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setCodeSent(true);
    }
  };

  const handleVerify = () => {
    if (verificationCode.trim() === '') {
      setErrors({ verificationCode: 'Please enter the code sent to your email' });
      return;
    }
    setErrors({});
    navigate('/dashboard'); // ✅ Navigates without page reload
  };

  const handleLogin = () => {
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Invalid email address';
    if (password === '') newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      navigate('/dashboard'); // ✅ Navigates without page reload
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'Register as SME/BUSINESS' : 'Login as SME/BUSINESS'}</h2>
      <div className="form-box">
        {isRegistering ? (
          codeSent ? (
            <div className="form-step">
              <label>Enter Code Sent to Your Email</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className={errors.verificationCode ? 'input-error' : ''}
              />
              {errors.verificationCode && <p className="error-text">{errors.verificationCode}</p>}
              <button onClick={handleVerify}><CheckCircle size={16} /> Verify Email</button>
            </div>
          ) : (
            <div className="form-step">
              <div className={`input-group ${errors.email ? 'input-error' : ''}`}>
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <p className="error-text">{errors.email}</p>}
              <div className={`input-group ${errors.password ? 'input-error' : ''}`}>
                <Lock size={16} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && <p className="error-text">{errors.password}</p>}
              <div className={`input-group ${errors.confirmPassword ? 'input-error' : ''}`}>
                <Lock size={16} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              <button onClick={handleRegister}>Register</button>
              <p className="switch-link">Already have an account? <span onClick={() => setIsRegistering(false)}>Login</span></p>
            </div>
          )
        ) : (
          <div className="form-step">
            <div className={`input-group ${errors.email ? 'input-error' : ''}`}>
              <Mail size={16} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}
            <div className={`input-group ${errors.password ? 'input-error' : ''}`}>
              <Lock size={16} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
            <button onClick={handleLogin}>Login</button>
            <p className="switch-link">
              Don't have an account? <span onClick={() => setIsRegistering(true)}>Register</span>
            </p>
            <p className="forgot-password">Forgot Password?</p>
          </div>
        )}
      </div>
    </div>
  );
}

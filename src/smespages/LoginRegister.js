import React, { useState } from 'react';
import './LoginRegister.css';
import { Mail, Lock, CheckCircle, Rocket, Smile, User, Briefcase, HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function LoginRegister() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Oops! Wrong email';
    if (password.length < 6) newErrors.password = 'Make it longer (at least 6 characters)';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords don\'t match!';
    if (!role) newErrors.role = 'What\'s your superpower?';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setAuthError('');

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role,
        createdAt: new Date()
      });

     setIsRegistering(false);
     setIsVerifying(true);
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError(error.message);
    }
  };

  const handleVerify = () => {
    if (verificationCode.trim() === '') {
      setErrors({ verificationCode: 'We sent you a magic code - enter it here!' });
      return;
    }
    setErrors({});
    navigate('/dashboard');
  };

  const handleLogin = async () => {
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Enter your email!';
    if (password === '') newErrors.password = 'Enter your password!';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setAuthError('');

    try {
    
      await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setRole(userDocSnap.data().role || 'No role set');
        if(role === 'Investor') {
          navigate('/investor-dashboard');
        }

        else if(role === 'SME/BUSINESS') {
          navigate('/dashboard');
        }
         else if(role === 'Support Program') {
          navigate('/support-dashboard');
        }
        
       
      } else {
        console.log('Not Registered!');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(error.message);
    }
  };

  const getRoleIcon = (roleValue) => {
    switch(roleValue) {
      case 'SME/BUSINESS': return <Briefcase size={16} />;
      case 'Investor': return <Rocket size={16} />;
      case 'Support Program': return <User size={16} />;
      default: return <Smile size={16} />;
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="form-side">
          <div className="form-header">
            {authError && <div className="auth-error">{authError}</div>}
            <h2>{isRegistering ? 'Create Your Account!' : 'Welcome Back!'}</h2>
            <div className={`icon-container ${isRegistering ? 'register' : 'login'}`}>
              {isRegistering ? <Rocket size={24} /> : <Smile size={24} />}
            </div>
          </div>
          
          <div className="form-box">
            {isRegistering ? (
              codeSent ? (
                <div className="form-step">
                  <div className="verification-message">
                    <p>✨ We sent a secret code to your email! ✨</p>
                  </div>
                  <div className={`input-group ${errors.verificationCode ? 'input-error' : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter your secret code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  </div>
                  {errors.verificationCode && <p className="error-text">{errors.verificationCode}</p>}
                  <button 
                    className="primary-btn verify-btn"
                    onClick={handleVerify}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <CheckCircle size={16} /> 
                    {isHovering ? 'Open Sesame!' : 'Verify Email'}
                    {isHovering && <span className="sparkle">✨</span>}
                  </button>
                </div>
              ) : (
                <div className="form-step">
                  <div className={`input-group ${errors.email ? 'input-error' : ''}`}>
                    <div className="input-icon">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="error-text">{errors.email}</p>}

                  <div className={`input-group ${errors.password ? 'input-error' : ''}`}>
                    <div className="input-icon">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {errors.password && <p className="error-text">{errors.password}</p>}

                  <div className={`input-group ${errors.confirmPassword ? 'input-error' : ''}`}>
                    <div className="input-icon">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      placeholder="confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

                  <div className={`input-group select-group ${errors.role ? 'input-error' : ''}`}>
                    <div className="input-icon">
                      {getRoleIcon(role)}
                    </div>
                    <select 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)}
                      className={role ? 'has-value' : ''}
                    >
                      <option value="">I am a </option>
                      <option value="SME/BUSINESS">SMSE</option>
                      <option value="Investor">Investor</option>
                      <option value="Support Program">Support Program</option>
                     
                    </select>
                  </div>
                  {errors.role && <p className="error-text">{errors.role}</p>}

                  <button 
                    className="primary-btn" 
                    onClick={handleRegister}
                  >
                    Create Account <Rocket size={16} />
                  </button>
                  <p className="switch-link">
                    Already part of us? <span onClick={() => setIsRegistering(false)}>Login</span>
                  </p>
                </div>
              )
            ) : (
              <div className="form-step">
                <div className={`input-group ${errors.email ? 'input-error' : ''}`}>
                  <div className="input-icon">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <p className="error-text">{errors.email}</p>}

                <div className={`input-group ${errors.password ? 'input-error' : ''}`}>
                  <div className="input-icon">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {isVerifying && <a>make sure email is verified</a>}
                {errors.password && <p className="error-text">{errors.password}</p>}
                
                <button 
                  className="primary-btn" 
                  onClick={handleLogin}
                >
                  Login! <Smile size={16} />
                </button>
                <p className="switch-link">
                  New to the family? <span onClick={() => setIsRegistering(true)}>Join us!</span>
                </p>
                <p className="forgot-password">
                  <span>Forgot your password?</span>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="welcome-side">
          <div className="welcome-content">
            <h1>Welcome Home!</h1>
            <p>Delivering integrated solutions through expert consulting, market access, investor connections, and impactful community engagement.</p>
            
            <div className="welcome-features">
              <div className="welcome-feature">
                <Rocket size={20} className="feature-icon" />
                <span>BIG on Ideas</span>
              </div>
              <div className="welcome-feature">
                <HeartHandshake size={20} className="feature-icon" />
                <span>BIG on Growth</span>
              </div>
              <div className="welcome-feature">
                <Briefcase size={20} className="feature-icon" />
                <span>BIG on Impact</span>
              </div>
            </div>
            
            <div className="floating-icons">
              <Rocket className="floating-icon rocket" />
              <Briefcase className="floating-icon briefcase" />
              <HeartHandshake className="floating-icon heart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
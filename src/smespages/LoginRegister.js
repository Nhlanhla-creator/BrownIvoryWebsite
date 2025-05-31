import React, { useState, useEffect } from 'react';
import './LoginRegister.css';
import { Mail, Lock, CheckCircle, Rocket, Smile, User, Briefcase, HeartHandshake, Loader2, Building2, TrendingUp, Users, Handshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useLocation } from 'react-router-dom';
import NDASignupPopup from '../NDAsign';
import TermsConditionsCheckbox from './Ts&cs';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginRegister() {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const initialMode = new URLSearchParams(location.search).get('mode');
  const [isRegistering, setIsRegistering] = useState(initialMode !== 'login');

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // Added username field
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showNDA, setShowNDA] = useState(false);
  const [ndaComplete, setNdaComplete] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const roleCards = [
    {
      id: 'SME/BUSINESS',
      title: 'SMSEs',
      icon: <Briefcase size={24} />,
      description: 'Small and Medium Enterprises looking to scale and grow their business',
      hoverInfo: 'Access funding opportunities, mentorship, and business development resources to accelerate your growth journey.'
    },
    {
      id: 'Investor',
      title: 'Funders / Investors',
      icon: <TrendingUp size={24} />,
      description: 'Investment professionals and funding organizations',
      hoverInfo: 'Discover vetted investment opportunities, connect with promising startups, and build your investment portfolio.'
    },
    {
      id: 'Service Provider',
      title: 'Service Providers',
      icon: <Users size={24} />,
      description: 'Professional service providers and consultants',
      hoverInfo: 'Offer your expertise to growing businesses, expand your client base, and build strategic partnerships.'
    },
    {
      id: 'Support Program',
      title: 'Corporates / Accelerators / Incubators',
      icon: <Building2 size={24} />,
      description: 'Corporate partners, accelerators, and incubation programs',
      hoverInfo: 'Connect with innovative startups, provide mentorship, and drive corporate innovation initiatives.'
    }
  ];

  const handleRoleSelect = (roleId) => {
    setRole(roleId);
    setErrors(prev => ({ ...prev, role: '' })); // Clear role error when selected
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const newErrors = {};
    
    if (!validateEmail(email)) newErrors.email = 'Enter your email';
    if (username.trim() === '') newErrors.username = 'Enter your username'; // Validate username
    if (password.length < 6) newErrors.password = 'Password should be (at least 6 characters)';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match!';
    if (!role) newErrors.role = 'What\'s your role?';
    if (!agreeToTerms) newErrors.terms = 'Please agree to the Terms & Conditions';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setErrors({});
    setAuthError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const ndaData = {
        email: email,
        username: username, // Include username instead of company
        role: role,
        password: password,
        uid: user.uid,
        termsAccepted: true,
        termsAcceptedDate: new Date().toISOString()
      };
      
      setRegistrationData(ndaData);
      setShowNDA(true);
      
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationComplete = async (ndaData) => {
    if (ndaData.cancelled) {
      setShowNDA(false);
      if (auth.currentUser) {
        try {
          await auth.currentUser.delete();
          setAuthError('Registration cancelled');
        } catch (error) {
          console.error('Error deleting user account:', error);
        }
      }
      return;
    }

    try {
      if (!auth.currentUser) {
        setAuthError('User authentication lost. Please try again.');
        return;
      }

      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        email: email,
        username: username, // Store username instead of company
        role: role,
        ndaSigned: true,
        ndaSignedDate: new Date().toISOString(),
        termsAccepted: agreeToTerms,
        termsAcceptedDate: new Date().toISOString(),
        createdAt: new Date(),
        ndaInfo: {
          pdfUrl: ndaData.pdfUrl || null,
          signatureUrl: ndaData.signatureUrl || null,
          userId: ndaData.userId || auth.currentUser.uid
        },
        termsVersion: "1.0",
        termsContent: "BIG Marketplace Platform Terms & Conditions"
      });

      setNdaComplete(true);
      setShowNDA(false);
      
      if (role === 'Investor') {
        navigate('/investor-profile');
      } else if (role === 'SME/BUSINESS') {
        navigate('/profile');
      } else if (role === 'Support Program') {
        navigate('/profile');
      } else {
        navigate('/profile');
      }
      
    } catch (error) {
      console.error('Error saving user data:', error);
      setAuthError('Failed to complete registration. Please try again.');
    }
  };
  
  const handleVerify = () => {
    if (verificationCode.trim() === '') {
      setErrors({ verificationCode: 'We sent you a magic code - enter it here!' });
      return;
    }
    setErrors({});
    
    if (role === 'Investor') {
      navigate('/investor-profile');
    } else if (role === 'SME/BUSINESS') {
      navigate('/profile');
    } else if (role === 'Support Program') {
      navigate('/profile');
    } else {
      navigate('/profile');
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Enter your email!';
    if (password === '') newErrors.password = 'Enter your password!';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setErrors({});
    setAuthError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userRole = userDocSnap.data().role || 'No role set';
        setRole(userRole);

        const userData = userDocSnap.data();
        
        if (userRole === 'Investor') {
          navigate('/investor-profile');
        } else if (userRole === 'SME/BUSINESS') {
          navigate('/profile');
        } else if (userRole === 'Support Program') {
          navigate('/profile');
        } else {
          navigate('/profile');
        }
      } else {
        console.log('User document not found!');
        setAuthError('User profile not found. Please contact support.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
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
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} /> 
                        {isHovering ? 'Open Sesame!' : 'Verify Email'}
                        {isHovering && <span className="sparkle">✨</span>}
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="form-step" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  width: '100%'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Email */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--background)',
                      border: `2px solid ${errors.email ? 'var(--error)' : 'var(--secondary)'}`,
                      borderRadius: '12px',
                      padding: '0 15px',
                      height: '50px',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    }}>
                      <div style={{ marginRight: '12px', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center' }}>
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          flex: 1,
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          fontSize: '15px',
                          color: 'var(--text)',
                          height: '100%',
                          fontFamily: 'Quicksand, sans-serif',
                        }}
                      />
                    </div>
                    {errors.email && <p className="error-text">{errors.email}</p>}

                    {/* Username - Added instead of company name */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--background)',
                      border: `2px solid ${errors.username ? 'var(--error)' : 'var(--secondary)'}`,
                      borderRadius: '12px',
                      padding: '0 15px',
                      height: '50px',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    }}>
                      <div style={{ marginRight: '12px', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center' }}>
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="Your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                          flex: 1,
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          fontSize: '15px',
                          color: 'var(--text)',
                          height: '100%',
                          fontFamily: 'Quicksand, sans-serif',
                        }}
                      />
                    </div>
                    {errors.username && <p className="error-text">{errors.username}</p>}

                    {/* Password */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--background)',
                      border: `2px solid ${errors.password ? 'var(--error)' : 'var(--secondary)'}`,
                      borderRadius: '12px',
                      padding: '0 15px',
                      height: '50px',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                    }}>
                      <div style={{
                        marginRight: '12px',
                        color: 'var(--primary-dark)',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Lock size={18} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          flex: 1,
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          fontSize: '15px',
                          color: 'var(--text)',
                          height: '100%',
                          fontFamily: 'Quicksand, sans-serif'
                        }}
                      />
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          cursor: 'pointer',
                          marginLeft: '12px',
                          color: 'var(--primary-dark)',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </div>
                    </div>
                    {errors.password && (
                      <p style={{
                        color: 'var(--error)',
                        fontSize: '0.8125rem',
                        marginTop: '4px',
                        marginBottom: '0'
                      }}>
                        {errors.password}
                      </p>
                    )}

                    {/* Confirm Password */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--background)',
                      border: `2px solid ${errors.confirmPassword ? 'var(--error)' : 'var(--secondary)'}`,
                      borderRadius: '12px',
                      padding: '0 15px',
                      height: '50px',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                    }}>
                      <div style={{
                        marginRight: '12px',
                        color: 'var(--primary-dark)',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Lock size={18} />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                          flex: 1,
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          fontSize: '15px',
                          color: 'var(--text)',
                          height: '100%',
                          fontFamily: 'Quicksand, sans-serif'
                        }}
                      />
                      <div
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          cursor: 'pointer',
                          marginLeft: '12px',
                          color: 'var(--primary-dark)',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </div>
                    </div>
                    {errors.confirmPassword && (
                      <p style={{
                        color: 'var(--error)',
                        fontSize: '0.8125rem',
                        marginTop: '4px',
                        marginBottom: '0'
                      }}>
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                {/* Role Cards - Improved layout */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--text)',
                      fontFamily: 'Quicksand, sans-serif'
                    }}>
                      I am a:
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px',
                      marginBottom: '8px'
                    }}>
                      {roleCards.map((card) => (
                        <div
                          key={card.id}
                          onClick={() => handleRoleSelect(card.id)}
                          onMouseEnter={() => setHoveredCard(card.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                          style={{
                            position: 'relative',
                            padding: '12px',
                            borderRadius: '12px',
                            border: `2px solid ${role === card.id ? '#8B4513' : '#D2B48C'}`,
                            backgroundColor: role === card.id ? '#F5E6D3' : '#FAF7F2',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: hoveredCard === card.id ? 'translateY(-2px)' : 'translateY(0)',
                            boxShadow: hoveredCard === card.id ? '0 8px 25px rgba(139, 69, 19, 0.15)' : '0 2px 8px rgba(139, 69, 19, 0.08)',
                            minHeight: '90px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{
                            color: role === card.id ? '#8B4513' : '#A0522D',
                            marginBottom: '6px',
                            transition: 'color 0.3s ease'
                          }}>
                            {card.icon}
                          </div>
                          <h4 style={{
                            margin: '0 0 2px 0',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: role === card.id ? '#8B4513' : '#654321',
                            fontFamily: 'Quicksand, sans-serif',
                            lineHeight: '1.2'
                          }}>
                            {card.title}
                          </h4>
                          
                          {/* Hover Info Overlay - Dark Brown with White Text */}
                          {hoveredCard === card.id && (
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(135deg, #3E2723 0%, #4E342E 50%, #5D4037 100%)',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '10px',
                              animation: 'fadeIn 0.3s ease',
                              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)'
                            }}>
                              <p style={{
                                margin: 0,
                                fontSize: '11px',
                                color: '#FFFFFF',
                                fontFamily: 'Quicksand, sans-serif',
                                lineHeight: '1.4',
                                textAlign: 'center',
                                fontWeight: '500',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                              }}>
                                {card.hoverInfo}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {errors.role && (
                      <p style={{
                        color: 'var(--error)',
                        fontSize: '0.8125rem',
                        marginTop: '4px',
                        marginBottom: '0'
                      }}>
                        {errors.role}
                      </p>
                    )}
                  </div>

                  <TermsConditionsCheckbox
                    agreeToTerms={agreeToTerms}
                    setAgreeToTerms={setAgreeToTerms}
                    error={errors.terms}
                  />
                  <button 
                    className="primary-btn" 
                    onClick={handleRegister}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account <Rocket size={16} />
                      </>
                    )}
                  </button>
                  <p className="switch-link">
                    Already part of us? <span onClick={() => setIsRegistering(false)}>Login</span>
                  </p>
                </div>
              )
            ) : (
              <div className="form-step" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                width: '100%'
              }}>
                {/* Email Input */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--background)',
                  border: `2px solid ${errors.email ? 'var(--error)' : 'var(--secondary)'}`,
                  borderRadius: '12px',
                  padding: '0 15px',
                  height: '50px',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                }}>
                  <div style={{
                    marginRight: '12px',
                    color: 'var(--primary-dark)',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '15px',
                      color: 'var(--text)',
                      height: '100%',
                      fontFamily: 'Quicksand, sans-serif'
                    }}
                  />
                </div>
                {errors.email && (
                  <p style={{
                    color: 'var(--error)',
                    fontSize: '0.8125rem',
                    marginTop: '4px',
                    marginBottom: '0'
                  }}>
                    {errors.email}
                  </p>
                )}

                {/* Password Input */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--background)',
                  border: `2px solid ${errors.password ? 'var(--error)' : 'var(--secondary)'}`,
                  borderRadius: '12px',
                  padding: '0 15px',
                  height: '50px',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  position: 'relative'
                }}>
                  <div style={{
                    marginRight: '12px',
                    color: 'var(--primary-dark)',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      flex: 1,
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '15px',
                      color: 'var(--text)',
                      height: '100%',
                      fontFamily: 'Quicksand, sans-serif'
                    }}
                  />
                  <div
                    style={{
                      cursor: 'pointer',
                      color: 'var(--primary-dark)',
                      marginLeft: '12px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>

                {errors.password && (
                  <p style={{
                    color: 'var(--error)',
                    fontSize: '0.8125rem',
                    marginTop: '4px',
                    marginBottom: '0'
                  }}>
                    {errors.password}
                  </p>
                )}

                {isVerifying && <a>make sure email is verified</a>}
                
                <button 
                  className="primary-btn" 
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login! <Smile size={16} />
                    </>
                  )}
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

        {/* Updated welcome-side with conditional alignment */}
        <div className={`welcome-side ${isRegistering ? 'top-aligned' : ''}`}>
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
          </div>
        </div>
      </div>

      {/* NDA Popup Component */}
      {showNDA && registrationData && (
        <NDASignupPopup
          registrationData={registrationData}
          onRegistrationComplete={handleRegistrationComplete}
        />
      )}

      {/* Custom CSS for animations and hover effects */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
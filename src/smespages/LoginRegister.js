import React, { useState, useEffect } from 'react';
import './LoginRegister.css';
import { Mail, Lock, CheckCircle, Rocket, Smile, User, Briefcase, HeartHandshake, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import NDASignupPopup from '../NDAsign';
import TermsConditionsCheckbox from './Ts&cs';

export default function LoginRegister() {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState('');
  const [company, setCompany] = useState(''); // Added company field
  const [isHovering, setIsHovering] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showNDA, setShowNDA] = useState(false);
  const [ndaComplete, setNdaComplete] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for buttons

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

   const handleRegister = async () => {

  setIsLoading(true); // Start loading
  const newErrors = {};
  
  // Validate email
  if (!validateEmail(email)) newErrors.email = 'Oops! Wrong email';
  
  // Validate password
  if (password.length < 6) newErrors.password = 'Make it longer (at least 6 characters)';
  
  // Validate password confirmation
  if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords don\'t match!';
  
  // Validate role selection
  if (!role) newErrors.role = 'What\'s your role?';
  
  // Validate company name
  if (!company) newErrors.company = 'Please enter your company name';
  
  // Validate terms and conditions agreement
  if (!agreeToTerms) newErrors.terms = 'Please agree to the Terms & Conditions';

  // If there are validation errors, stop and display them
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setIsLoading(false); // Stop loading if validation fails
    return;
  }

  // Clear any previous errors
  setErrors({});
  setAuthError('');

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Prepare complete data for NDA
    const ndaData = {
      email: email,
      role: role,
      company: company,
      password: password, // Include password for the NDA component
      uid: user.uid,
      termsAccepted: true, // Include terms acceptance status
      termsAcceptedDate: new Date().toISOString() // Include timestamp of acceptance
    };
    
    // Set registration data and show NDA
    setRegistrationData(ndaData);
    setShowNDA(true);
    
  } catch (error) {
    console.error('Registration error:', error);
    setAuthError(error.message);
  } finally {
    setIsLoading(false); // Stop loading in any case
  }
};
  // Handle NDA completion
   const handleRegistrationComplete = async (ndaData) => {
    // Check if the process was cancelled
    if (ndaData.cancelled) {
      setShowNDA(false);
      // Optionally delete the user account if they cancel
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
      // Make sure we have user data
      if (!auth.currentUser) {
        setAuthError('User authentication lost. Please try again.');
        return;
      }

      // Create user document in Firestore with NDA status and all returned data
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
      email: email,
      role: role,
      company: company,
      ndaSigned: true,
      ndaSignedDate: new Date().toISOString(),
      termsAccepted: agreeToTerms,
      termsAcceptedDate: new Date().toISOString(), // Timestamp of acceptance
      createdAt: new Date(),
      // Include data from NDA signing
      ndaInfo: {
        pdfUrl: ndaData.pdfUrl || null,
        signatureUrl: ndaData.signatureUrl || null,
        userId: ndaData.userId || auth.currentUser.uid
      },
      // Include terms version or identifier if needed
      termsVersion: "1.0", // Update this when terms change
      termsContent: "BIG Marketplace Platform Terms & Conditions" // Optional
    });

    // ... rest of the existing code ...


      setNdaComplete(true);
      setShowNDA(false);
      
      // Redirect based on role after NDA completion
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
    
    // Redirect based on role after verification
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
    setIsLoading(true); // Start loading
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Enter your email!';
    if (password === '') newErrors.password = 'Enter your password!';


   
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false); // Stop loading if validation fails
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
   
      
      // Check if terms were accepted (optional)
      // if (!userData.termsAccepted) {
      //   setAuthError('Please accept the latest Terms & Conditions');
      //   // You could force them to accept terms here
      //   return;
      // }
        
        // Redirect based on role - NDA check removed
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
      setIsLoading(false); // Stop loading in any case
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
  {/* Email Input */}
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: errors.email ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
    borderRadius: '8px',
    transition: 'all 0.3s',
    backgroundColor: '#fff',
    ':hover': {
      borderColor: errors.email ? '#ff4d4f' : '#6e8efb'
    }
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem'
    }}>
      <div style={{
        marginRight: '0.75rem',
        color: errors.email ? '#ff4d4f' : '#372C27',
        display: 'flex',
        alignItems: 'center'
      }}>
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
          outline: 'none',
          fontSize: '0.9375rem',
          '::placeholder': {
            color: '#bfbfbf'
          }
        }}
      />
    </div>
  </div>
  {errors.email && <p style={{
    color: '#ff4d4f',
    fontSize: '0.8125rem',
    marginTop: '-0.75rem',
    marginBottom: '-0.5rem'
  }}>{errors.email}</p>}

  {/* Password Input */}
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: errors.password ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
    borderRadius: '8px',
    transition: 'all 0.3s',
    backgroundColor: '#fff',
    ':hover': {
      borderColor: errors.password ? '#ff4d4f' : '#6e8efb'
    }
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem'
    }}>
      <div style={{
        marginRight: '0.75rem',
        color: errors.password ? '#ff4d4f' : '#372C27',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Lock size={18} />
      </div>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          fontSize: '0.9375rem',
          '::placeholder': {
            color: '#bfbfbf'
          }
        }}
      />
    </div>
  </div>
  {errors.password && <p style={{
    color: '#ff4d4f',
    fontSize: '0.8125rem',
    marginTop: '-0.75rem',
    marginBottom: '-0.5rem'
  }}>{errors.password}</p>}

  {/* Confirm Password Input */}
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: errors.confirmPassword ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
    borderRadius: '8px',
    transition: 'all 0.3s',
    backgroundColor: '#fff',
    ':hover': {
      borderColor: errors.confirmPassword ? '#ff4d4f' : '#6e8efb'
    }
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem'
    }}>
      <div style={{
        marginRight: '0.75rem',
        color: errors.confirmPassword ? '#ff4d4f' : '#372C27',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Lock size={18} />
      </div>
      <input
        type="password"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          fontSize: '0.9375rem',
          '::placeholder': {
            color: '#bfbfbf'
          }
        }}
      />
    </div>
  </div>
  {errors.confirmPassword && <p style={{
    color: '#ff4d4f',
    fontSize: '0.8125rem',
    marginTop: '-0.75rem',
    marginBottom: '-0.5rem'
  }}>{errors.confirmPassword}</p>}

  {/* Company Input */}
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: errors.company ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
    borderRadius: '8px',
    transition: 'all 0.3s',
    backgroundColor: '#fff',
    ':hover': {
      borderColor: errors.company ? '#ff4d4f' : '#6e8efb'
    }
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem'
    }}>
      <div style={{
        marginRight: '0.75rem',
        color: errors.company ? '#ff4d4f' : '#372C27',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Briefcase size={18} />
      </div>
      <input
        type="text"
        placeholder="Your company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          fontSize: '0.9375rem',
          '::placeholder': {
            color: '#bfbfbf'
          }
        }}
      />
    </div>
  </div>
  {errors.company && <p style={{
    color: '#ff4d4f',
    fontSize: '0.8125rem',
    marginTop: '-0.75rem',
    marginBottom: '-0.5rem'
  }}>{errors.company}</p>}

  {/* Role Select */}
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: errors.role ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
    borderRadius: '8px',
    transition: 'all 0.3s',
    backgroundColor: '#fff',
    ':hover': {
      borderColor: errors.role ? '#ff4d4f' : '#6e8efb'
    }
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem'
    }}>
      <div style={{
        marginRight: '0.75rem',
        color: errors.role ? '#ff4d4f' : '#372C27',
        display: 'flex',
        alignItems: 'center'
      }}>
        {getRoleIcon(role)}
      </div>
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          fontSize: '0.9375rem',
          backgroundColor: 'transparent',
          color: role ? '#333' : '#bfbfbf',
          appearance: 'none',
          cursor: 'pointer'
        }}
      >
        <option value="">I am a </option>
        <option value="SME/BUSINESS"> Small and Medium Social Enterprise</option>
        <option value="Investor">Investor</option>
        <option value="Support Program">Support Program</option>
      </select>
    </div>
  </div>
  {errors.role && <p style={{
    color: '#ff4d4f',
    fontSize: '0.8125rem',
    marginTop: '-0.75rem',
    marginBottom: '-0.5rem'
  }}>{errors.role}</p>}

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
    flexDirection: 'column',
    position: 'relative',
    border: errors.email ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
    borderRadius: '8px',
    transition: 'all 0.3s',
    backgroundColor: '#fff',
    ':hover': {
      borderColor: errors.email ? '#ff4d4f' : '#6e8efb'
    }
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem'
    }}>
      <div style={{
        marginRight: '0.75rem',
        color: errors.email ? '#ff4d4f' : '#372C27',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Mail size={18} />
      </div>
      <input
        type="email"
        placeholder="enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          fontSize: '0.9375rem',
          '::placeholder': {
            color: '#bfbfbf'
          }
        }}
      />
    </div>
  </div>
  {errors.email && <p style={{
    color: '#ff4d4f',
    fontSize: '0.8125rem',
    marginTop: '-0.75rem',
    marginBottom: '-0.5rem'
  }}>{errors.email}</p>}

  {/* Password Input */}
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: errors.password ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
    borderRadius: '8px',
    transition: 'all 0.3s',
    backgroundColor: '#fff',
    ':hover': {
      borderColor: errors.password ? '#ff4d4f' : '#6e8efb'
    }
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem'
    }}>
      <div style={{
        marginRight: '0.75rem',
        color: errors.password ? '#ff4d4f' : '#372C27',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Lock size={18} />
      </div>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          fontSize: '0.9375rem',
          '::placeholder': {
            color: '#bfbfbf'
          }
        }}
      />
    </div>
  </div>
  {errors.password && <p style={{
    color: '#ff4d4f',
    fontSize: '0.8125rem',
    marginTop: '-0.75rem',
    marginBottom: '-0.5rem'
  }}>{errors.password}</p>}

                {isVerifying && <a>make sure email is verified</a>}
                {errors.password && <p className="error-text">{errors.password}</p>}
                
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

      {/* NDA Popup Component */}
      {showNDA && registrationData && (
        <NDASignupPopup
          registrationData={registrationData}
          onRegistrationComplete={handleRegistrationComplete}
        />
      )}
      
    </div>
  );
}
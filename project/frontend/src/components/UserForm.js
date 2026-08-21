import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    grade: '',
    school: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [testHistory, setTestHistory] = useState([]);
  const navigate = useNavigate();

  // Check API connection
  useEffect(() => {
    const checkApi = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/health`);
        setApiStatus(res.ok ? 'connected' : 'error');
      } catch {
        setApiStatus('error');
      }
    };
    checkApi();
  }, []);

  // Fetch test history when email changes in login mode
  useEffect(() => {
    const fetchHistory = async () => {
      if (isLogin && formData.email && /^\S+@\S+\.\S+$/.test(formData.email)) {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/user/${formData.email}`
          );
          if (res.ok) {
            const data = await res.json();
            setTestHistory(data.user.testResults || []);
          } else {
            setTestHistory([]);
          }
        } catch (err) {
          console.error('Failed to fetch test history:', err);
          setTestHistory([]);
        }
      } else {
        setTestHistory([]);
      }
    };
    
    const timer = setTimeout(() => {
      fetchHistory();
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.email, isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (!isLogin && !formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!isLogin && !formData.grade) {
      setError('Please select a grade');
      return false;
    }
    if (!isLogin && !formData.school.trim()) {
      setError('School name is required');
      return false;
    }
    setError('');
    return true;
  };

  const hasPassedAllRequiredTests = (history) => {
    const requiredTestTypes = ['math', 'grammar', 'reading'];
    const testResults = {};
    
    // Initialize all required tests as not passed
    requiredTestTypes.forEach(test => {
      testResults[test] = false;
    });

    // Check each test result
    history.forEach(test => {
      requiredTestTypes.forEach(reqTest => {
        if (test.testType.toLowerCase().includes(reqTest) && test.details.percentage >= 70) {
          testResults[reqTest] = true;
        }
      });
    });

    // Return true only if all required tests have ≥70%
    return requiredTestTypes.every(test => testResults[test]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Deny login only if all three academic tests have ≥70% score
      if (isLogin && testHistory.length > 0 && hasPassedAllRequiredTests(testHistory)) {
        setError('Access denied: You have scored 70% or above in all academic tests (Math, Reading, and Grammar).');
        setIsSubmitting(false);
        return;
      }

      const endpoint = isLogin ? '/api/login' : '/api/register';
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${endpoint}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (isLogin ? 'Login failed' : 'Registration failed'));
      }

      // Save user data and redirect
      sessionStorage.setItem('userData', JSON.stringify(data.user));
      sessionStorage.setItem('grade', data.user.grade);
      navigate('/tests');

    } catch (error) {
      console.error('Form submission error:', error);
      setError(error.message);
      if (error.message.includes('already registered')) {
        setIsLogin(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      {apiStatus === 'error' && (
        <div className="api-error">
          ⚠️ Could not connect to server. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-header">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <div className="form-toggle">
            <button
              type="button"
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
            <button
              type="button"
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {!isLogin && (
          <>
            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="5"
                max="18"
                disabled={isSubmitting}
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        {!isLogin && (
          <>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                disabled={isSubmitting}
              />
              <small>10 digits only</small>
            </div>

            <div className="form-group">
              <label>Grade Level*</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                <option value="">Select Grade</option>
                {[1, 2, 3, 4, 5, 6, 7].map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>School Name*</label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting || apiStatus === 'error'}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              {isLogin ? 'Logging in...' : 'Registering...'}
            </>
          ) : (
            isLogin ? 'Login' : 'Register'
          )}
        </button>
      </form>

      {isLogin && testHistory.length > 0 && (
        <div className="test-history">
          <h3>Your Test History</h3>
          <div className="history-grid">
            {testHistory.map((test, index) => (
              <div key={index} className="test-card">
                <h4>{test.testType.replace('-', ' ').toUpperCase()}</h4>
                <p>Score: {test.score}/{test.details.totalQuestions}</p>
                <p>{test.details.percentage}%</p>
                <small>{new Date(test.details.date).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLogin && testHistory.length === 0 && formData.email && /^\S+@\S+\.\S+$/.test(formData.email) && (
        <div className="test-history">
          <p>No test history found for this email.</p>
        </div>
      )}
    </div>
  );
};

export default UserForm;
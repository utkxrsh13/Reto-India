import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signUpUser } from "../../API/api";
import { useAuth } from "../../Context/AuthContext";
import "./Signup.css";
import LottieAnimation from "../LottieAnimation/LottieAnimation";
import ArtisticAnimation from "../../Lottie/Animation_artistic_3.json";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNo: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (user) => signUpUser(user),
    onSuccess: (response) => {
      console.log("Signup successful - onSuccess triggered", response);

      setTimeout(() => {
        setShowAnimation(false);
        setUser({ fullName: "", email: "", password: "", phoneNo: "" });

        if (!response.token) {
          console.error("Signup response missing required fields:", response);
          toast.error("Signup failed. Please try again.", { position: "top-center" });
          return;
        }

        toast.success("Signup successful", { position: "top-center" });

        login(response.token, { fullName: user.fullName, email: user.email });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }, 2000);
    },
    onError: (error) => {
      console.error("Error signing up:", error.message);
      setTimeout(() => {
        setShowAnimation(false);
        toast.error("Signup failed. Please try again.", { position: "top-center" });
      }, 2000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.fullName || !user.email || !user.password || !user.phoneNo) {
      toast.warn("Please fill out all fields!", { position: "top-center" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      toast.warn("Invalid email format", { position: "top-center" });
      return;
    }
    if (!/^\d{10}$/.test(user.phoneNo)) {
      toast.warn("Invalid phone number format", { position: "top-center" });
      return;
    }
    if (user.password.length < 6) {
      toast.warn("Password must be at least 6 characters long", { position: "top-center" });
      return;
    }
    setShowAnimation(true);
    console.log(user);
    mutate(user);
  };

  const handleGoogleSignup = () => {
    window.location.href = "https://reto-india-backend.onrender.com/auth/google";
  };

  return (
    <div className="signup-page-container">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-content-wrapper">
            <ToastContainer />
            <h1 className="signup-heading">Create Your Account</h1>
            <p className="signup-subheading">Join us to access exclusive services</p>
            
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <input
                  type="text"
                  id="username"
                  value={user.fullName}
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleOnChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  name="email"
                  placeholder="Email Address"
                  onChange={handleOnChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  id="phoneNo"
                  value={user.phoneNo}
                  name="phoneNo"
                  placeholder="Phone Number"
                  onChange={handleOnChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group password-group">
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={user.password}
                    name="password"
                    placeholder="Password"
                    onChange={handleOnChange}
                    className="form-input password-input"
                  />
                  <IconButton
                    aria-label={showPassword ? "hide the password" : "display the password"}
                    onClick={handleClickShowPassword}
                    edge="end"
                    className="password-toggle"
                    sx={{
                      position: 'absolute',
                      right: '8px',
                      padding: '4px'
                    }}
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </div>
              </div>
              
              <div className="form-footer">
                <NavLink to="/auth/login" className="login-link">
                  Already have an account? <span>Login</span>
                </NavLink>
              </div>
              
              <button
                type="submit"
                className="signup-button"
                disabled={isLoading || showAnimation}
              >
                {isLoading || showAnimation ? (
                  <span className="button-loading">Signing Up...</span>
                ) : (
                  <>
                    Sign Up <span className="arrow">→</span>
                  </>
                )}
              </button>
              
              <div className="divider">
                <span className="divider-line"></span>
                <span className="divider-text">OR</span>
                <span className="divider-line"></span>
              </div>
              
              <button 
                type="button" 
                className="google-signup-button"
                onClick={handleGoogleSignup}
              >
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>
            </form>
          </div>
          
          {showAnimation && (
            <div className="full-screen-loader">
              <LottieAnimation animationData={ArtisticAnimation} className="full-screen-animation" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
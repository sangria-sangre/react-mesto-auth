import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js'
import MyProfile from './MyProfile.js'
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from '../utils/apiAuth.js';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            handleLogin();
            navigate("/profile", { replace: true })
          }
        }).catch(err => {
          console.log(err);
        });
    }
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  return (

    <div className="body">
      <div className="page">
        <Routes>
          <Route path="/" element={<ProtectedRoute element={loggedIn ? MyProfile : Login} loggedIn={loggedIn} />} />
          <Route path="/profile" element={<ProtectedRoute element={MyProfile} loggedIn={loggedIn} />} />
          <Route path="/sign-in" element={<Login login={handleLogin} />} />
          <Route path="/sign-up" element={<Register />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
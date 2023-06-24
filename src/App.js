import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Landing from './pages/Landing';
import Profile from './components/LandingPage/Profile';
import AboutUs from './components/LandingPage/AboutUs';
import Navbar from './components/LandingPage/Navbar';
import ProfileMenu from './components/LandingPage/ProfileMenu';
import ProfileUpdate from './components/LandingPage/ProfileUpdate';
import VerificationPage from './components/LandingPage/VerificationPage';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import {AuthReducer} from './Redux/Reducer/AuthReducer';
import SignTest from './components/LandingPage/SignTest';
import ForgotPassword from './components/LandingPage/ForgotPassword';

import store from './Redux/store';

// Menggabungkan semua reducer

  // Tambahkan reducer lain di sini jika ada

// Membuat store Redux

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/profilemenu" element={<ProfileMenu />} />
          <Route path="/profileupdate" element={<ProfileUpdate />} />
          <Route path="/verification/:token" element={<VerificationPage />} />
          <Route path='/signtest' element={<SignTest/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
        </Routes>
      </ChakraProvider>
    </Provider>
  );
};

export default App;

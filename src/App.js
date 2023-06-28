import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Landing from './pages/Landing';
import Profile from './components/LandingPage/Profile';
import AboutUs from './components/LandingPage/AboutUs';
import Navbar from './components/LandingPage/Navbar';
import ProfilePage from './components/LandingPage/ProfilePage';
import ProfileUpdate from './components/LandingPage/ProfileUpdate';
import VerificationPage from './components/LandingPage/VerificationPage';
import { Provider } from 'react-redux';
import SignTest from './components/LandingPage/SignTest';
import ForgotPassword from './components/LandingPage/ForgotPassword';

import store from './Redux/store';
import AfterForgot  from './components/LandingPage/AfterForgot';
import ChangePassword from './components/LandingPage/ChangePassword';
import ChangeUserName from './components/LandingPage/ChangeUserName';
import ChangeEmail from './components/LandingPage/ChangeEmail';
import ChangeEmailVerification from './components/LandingPage/ChangeEmailVerifikasi';
import ChangePhoneNumber from './components/LandingPage/ChangePhoneNumber';
import WriteBlog from './components/LandingPage/WriteBlog';
import MyArtikel from './components/LandingPage/MyArtikels';
import PopularArticles from './components/LandingPage/PopulerArticles';


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
          <Route path="/profilpage" element={<ProfilePage />} />
          <Route path="/profileupdate" element={<ProfileUpdate />} />
          <Route path="/verification/:token" element={<VerificationPage />} />
          <Route path='/signtest' element={<SignTest/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/reset-password/:token' element={<AfterForgot />} />
          <Route path='/afterforgot' element={<AfterForgot/>} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/changeusername" element={<ChangeUserName />} />
          <Route path='/changeemail' element={<ChangeEmail />} />
          <Route path='/verification-change-email/:token' element={<ChangeEmailVerification />} />
          <Route path='/changephonenumber' element={<ChangePhoneNumber />} />
          <Route path='/verification-change-email/:token' element={<ChangeEmailVerification />} />
          <Route path='/writeblog' element={<WriteBlog />} />
          <Route path='/myartikel' element={<MyArtikel />} />
          <Route path='/populerarticles' element= {<PopularArticles />} />
        </Routes>

      </ChakraProvider>
    </Provider>
  );
};

export default App;

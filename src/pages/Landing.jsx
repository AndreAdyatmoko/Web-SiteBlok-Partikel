import React from 'react'
import NavBar from '../components/LandingPage/Navbar'
import Footer from '../components/LandingPage/Footers'
import Content from '../components/LandingPage/Content'
import ShowArticles from '../components/LandingPage/ShowArticles'







const Landing = () => {
  return (
    <>
      <NavBar />
      <Content />
      <ShowArticles />
      <Footer/>
    </>
  )
}

export default Landing
import React from 'react'
import NavBar from '../components/LandingPage/Navbar'
import Footer from '../components/LandingPage/Footers'
import Content from '../components/LandingPage/Content'
import NewsArticle from '../components/LandingPage/NewsArticle'







const Landing = () => {
  return (
    <>
      <NavBar />
      <Content />
      <NewsArticle />
      <Footer/>
    </>
  )
}

export default Landing
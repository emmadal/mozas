import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';

//Import Components
import Navbar from "./Navbar/Navbar"
import Section from "./HeroSection/Section"
import CardsMini from "./HeroSection/cards-mini"
import AboutUs from "./AboutUs/about-us"
import ChooseUs from "./ChooseUs/choose-us"
import Pricing from "./Pricing/pricing"
// import Features from "./Features/features"
import RoadMap from "./RoadMap/road-map"
// import OurTeam from "./Team/our-team"
import Blog from "./Blog/blog"
import FAQs from "./Faqs/FAQs"
import Footer from "./Footer/footer"

const Home = () => {
  const [imglight, setimglight] = useState(true)
  const [navClass, setnavClass] = useState("")

  // Use ComponentDidMount
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true)
  },[])

  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop
    if (scrollup > 80) {
      setimglight(false)
      setnavClass("nav-sticky")
    } else {
      setimglight(true)
      setnavClass("")
    }
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Mozah Invest | Plateforme innovante d&#39;investissement participative
          sur des projets couplée à la finance digitale
        </title>
      </MetaTags>
      {/* import navbar */}
      <Navbar navClass={navClass} imglight={imglight} />

      {/* Hero section */}
      <Section />

      {/* mini cards */}
      <CardsMini />

      {/* aboutus */}
      <AboutUs />

      {/* chooseus */}
      <ChooseUs />

      {/* features */}
      {/* <Features /> */}

      {/* blog */}
      <Blog />

      {/* pricing */}
      <Pricing />

      {/* roadmap*/}
      {/* <RoadMap /> */}

      {/* our team */}
      {/* <OurTeam /> */}

      {/* faqs */}
      <FAQs />

      {/* footer */}
      <Footer />
    </React.Fragment>
  )
}

export default Home

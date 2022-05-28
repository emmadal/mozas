import React, { useContext, useEffect, useRef, useState } from "react"

//Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { Link } from "react-router-dom"
import { UserContext } from "App"

//Navigation
import {useLocation} from 'react-router-dom'

const SidebarContent = props => {
  const ref = useRef()
  const { user } = useContext(UserContext)
  const [usertype, setUserType] = useState('')
  const location = useLocation()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = location.pathname
    // const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  useEffect(() => {
    setUserType(user?.type)
  }, [])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {usertype === "admin" ? (
              <>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="bx bx-home-circle"></i>
                    <span>Tableau de bord</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/dashboard">Accueil</Link>
                    </li>
                    <li>
                      <Link to="/dashboard-crypto">Crypto</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="bx bx-bitcoin"></i>
                    <span>Investissement</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/crypto-wallet">Wallet</Link>
                    </li>
                    <li>
                      <Link to="/crypto-buy-sell">Achats/Ventes</Link>
                    </li>
                    <li>
                      <Link to="/crypto-exchange">Echanges</Link>
                    </li>
                    <li>
                      <Link to="/crypto-lending">Prêt</Link>
                    </li>
                    <li>
                      <Link to="/crypto-orders">Commandes</Link>
                    </li>
                    <li>
                      <Link to="/crypto-kyc-application">KYC</Link>
                    </li>
                    <li>
                      <Link to="/crypto-ico-landing">ICO Landing</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="bx bx-briefcase-alt-2"></i>
                    <span>Projets</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/projects-grid">Grille des projets</Link>
                    </li>
                    <li>
                      <Link to="/projects-list">Liste des projets</Link>
                    </li>
                    <li>
                      <Link to="/projects-create">Nouveau projet</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="bx bx-user"></i>
                    <span>Investisseurs</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/investors-list">Liste des investisseurs</Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="bx bx-bitcoin"></i>
                    <span>Investissement</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/crypto-wallet">Wallet</Link>
                    </li>
                    <li>
                      <Link to="/crypto-buy-sell">Achats/Ventes</Link>
                    </li>
                    <li>
                      <Link to="/crypto-exchange">Echanges</Link>
                    </li>
                    <li>
                      <Link to="/crypto-lending">Prêt</Link>
                    </li>
                    <li>
                      <Link to="/crypto-orders">Commandes</Link>
                    </li>
                    <li>
                      <Link to="/crypto-kyc-application">KYC</Link>
                    </li>
                    <li>
                      <Link to="/crypto-ico-landing">ICO Landing</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow ">
                    <i className="bx bx-briefcase-alt-2"></i>
                    <span>Projets</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/projects-grid">Grille des projets</Link>
                    </li>
                    <li>
                      <Link to="/projects-list">Liste des projets</Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

export default SidebarContent

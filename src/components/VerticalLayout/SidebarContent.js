import React, { useContext, useEffect, useRef } from "react"

//Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"

// react-router-dom components
import { Link } from "react-router-dom"

//Navigation
import {useLocation} from 'react-router-dom'

// App Context
import AuthContext from "context/AuthContext"

const SidebarContent = () => {
  const { state } = useContext(AuthContext)
  const location = useLocation()
  const ref = useRef()

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

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = location.pathname

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
    }
    initMenu()
  }, [location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          {state?.type === "admin" ? (
            <ul className="metismenu list-unstyled" id="side-menu">
              <li>
                <Link to="/dashboard" className="">
                  <i className="bx bx-home-circle"></i>
                  <span>TABLEAU DE BORD</span>
                </Link>
              </li>

              <li>
                <Link to="/projects-create" className="">
                  <i className="bx bx-add-to-queue"></i>
                  <span>AJOUTER UN PROJET</span>
                </Link>
              </li>

              <li>
                <Link to="/projects-list" className="">
                  <i className="bx bx-briefcase-alt-2"></i>
                  <span>LISTE DES PROJETS</span>
                </Link>
              </li>

              <li>
                <Link to="/projects-grid" className="">
                  <i className="bx bx-bulb"></i>
                  <span>PROJETS MIS EN AVANT</span>
                </Link>
              </li>

              <li>
                <Link to="/investors-list" className="">
                  <i className="bx bx-user"></i>
                  <span>LISTE DES INVESTISSEURS</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="metismenu list-unstyled" id="side-menu">
              <li>
                <Link to="/dashboard" className="">
                  <i className="bx bx-home-circle"></i>
                  <span>TABLEAU DE BORD</span>
                </Link>
              </li>

              <li>
                <Link to="/projects-list" className="">
                  <i className="bx bx-briefcase-alt-2"></i>
                  <span>LISTE DES PROJETS</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

export default SidebarContent

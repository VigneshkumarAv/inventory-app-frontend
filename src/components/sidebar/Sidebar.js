import React, { useState } from 'react'
import './sidebar.scss'
import { PiCodesandboxLogoThin } from "react-icons/pi";
import { HiMenuAlt3 } from "react-icons/hi";
import menu from '../header/sidebar';
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({children}) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/")
    }

  return (
    <div className='layout'>
      <div class="sidebar" style={{width: isOpen ? "230px": "60px"}}>
        <div className='top_section'>
            <div class="logo" style={{display: isOpen ? "block": "none"}}>
            <PiCodesandboxLogoThin size={35} style={{cursor: "pointer"}} onClick={goHome}/>
            </div>
            <div className='bars' style={{marginLeft: isOpen ? "100px": "0px"}} onClick={toggle}>
                <HiMenuAlt3 style={{cursor: "pointer"}}/>
            </div>
        </div>

        {menu.map((item,index)=> {
            return <SidebarItem key={index} item={item} isOpen={isOpen} />
        })}

      </div>
      <main style={{paddingLeft: isOpen ? "230px":"60px", transition: "all .5s"}}>
        {children}
      </main>
    </div>
  )
}

export default Sidebar

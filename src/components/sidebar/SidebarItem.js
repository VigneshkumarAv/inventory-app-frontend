import React, { useState } from 'react'
import "./sidebar.scss"
import {MdKeyboardArrowRight} from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const activeLink =({isActive})=> (isActive ? "active" : "link")
const activeSubLink =({isActive})=> (isActive ? "active" : "link")

const SidebarItem = (props) => {
  const {item, isOpen} =props;

  const [expandMenu, setExpandMenu] = useState(false)

  if(item.childrens) {
    return (
      <div class={`sidebar-item s-parent ${expandMenu ? "open":""}`}>
        <div class="sidebar-title">
          <span>
            {item.icon && <div className='icon'>{item.icon} </div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight size={25} className='arrow-icon' onClick={()=>{setExpandMenu
          (!expandMenu)}}/>
        </div>

        <div class="sidebar-content">
          {item.childrens.map((child, index)=> {
              return (
                <div key={index} className='s-child'>
                  <NavLink to={child.path} className={activeSubLink} >
                    <div class="sidebar-item">
                      <div className='sidebar-title'>
                        {child.icon && <div className='icon'>{child.icon}</div>}
                        {isOpen && <div>{child.title}</div>}
                      </div>
                    </div>
                  </NavLink>
                </div>
              )
          })}
        </div>
      </div>
    )
  } else {
    return (
      <NavLink to={item.path} className={activeLink} >
        <div class="sidebar-item s-parent">
          <div className='sidebar-title'>
            <span>{item.icon && <div className='icon'>{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    )
  }
  
}

export default SidebarItem

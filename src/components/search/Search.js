import React from 'react'
import styles from './Search.module.scss'
import { BiSearch } from "react-icons/bi";
const Search = (props) => {
    const {value, onChange} = props;
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input type="text" placeholder='Search Products' value={value} onChange={onChange}/>
    </div>
  )
}

export default Search

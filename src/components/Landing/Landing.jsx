import React from 'react'
import style from '../Styles/Landing.module.css'
import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>MovieShop</h1>
      <Link className={style.link} to='/home'>Entrar</Link>
    </div>
  )
}


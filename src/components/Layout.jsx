import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Hero from './Hero'

export default function Layout() {
  return (
    <>
        <Header />
        <main>
        <Hero />
        <Outlet />
        </main>
        <Footer />
    </>
  )
}

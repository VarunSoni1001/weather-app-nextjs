import Link from 'next/link'
import React from 'react'

import { BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';

const Header = () => {

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={'/'} className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">KnowYourWeather</Link>
        <div className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <Link href={'https://twitter.com/Varunsoni1001'} rel="noopener noreferrer" className="ml-3 text-gray-500 hover:text-blue-500 transition-colors duration-500" target='_blank'>
        <FaXTwitter />
      </Link>
      <Link href={'https://www.instagram.com/varunsoni.dev'} rel="noopener noreferrer" className="ml-3 text-gray-500 hover:text-blue-500 transition-colors duration-500" target='_blank'>
        <BsInstagram />
      </Link>
      <Link href={'https://www.linkedin.com/in/varunsoni1001'} rel="noopener noreferrer" className="ml-3 text-gray-500 hover:text-blue-500 transition-colors duration-500" target='_blank'>
        <BsLinkedin />
      </Link>
      <Link href={'https://github.com/VarunSoni1001'} rel="noopener noreferrer" className="ml-3 text-gray-500 hover:text-blue-500 transition-colors duration-500" target='_blank'>
        <BsGithub />
      </Link>
    </div>
        </div>
      </header>
    </>
  )
}

export default Header

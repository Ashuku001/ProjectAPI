import React from 'react'
import NavLinks from './NavLinks'
import DarkModeButton from './DarkModeButton'
import MerchantsLogo from './MerchantsLogo'
import { LoginFormProps } from '../../../types'

function Header() {
    return (
        <header className='h-[12vh]'>
            <div className='flex items-center justify-between pt-1'>
                <h1 className='text-3xl font-serif font-bold'>
                    CRM
                </h1>
                <MerchantsLogo/>
                <DarkModeButton/>
            </div>
            <NavLinks />
            <hr className='my-1 bg-wh' />
        </header>
    )
}

export default Header
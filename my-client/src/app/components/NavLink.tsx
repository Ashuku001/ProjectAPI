'use client'
import Link from 'next/link'
import React from 'react'

type Props = {
    path: string;
    is_active: boolean;
}

function NavLink({path, is_active}: Props) {
  return (
    <Link href={`/${path}`} className={`navLink ${is_active && "underline decoration-orange-400"} uppercase p-0`}>
        {path.replace('-', ' ')}
    </Link>
  )
}

export default NavLink
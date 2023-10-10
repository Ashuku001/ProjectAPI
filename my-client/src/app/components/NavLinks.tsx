'use client'
import { links } from '../../../constants'
import {usePathname} from 'next/navigation'
import NavLink from "./NavLink"

function NavLinks() {
    const pathname = usePathname()

    const is_active = (path: string) => {
        return pathname?.split('/').pop() === path
    }

    return (
        <nav className="flex space-x-4 font-bold text-[16px]">
            {links.map((path, i) => (
                <NavLink key={i} path={path} is_active={is_active(path)}/>
            ))}
        </nav>
    )
}

export default NavLinks
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
        <nav className="text-[18px] text-left">
            {links.map((path, i) => (
                <NavLink key={i} path={path} is_active={is_active(path)}/>
            ))}
        </nav>
    )
}

export default NavLinks
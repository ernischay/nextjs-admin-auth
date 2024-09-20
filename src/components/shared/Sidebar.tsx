"use client"

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { X, LogOutIcon, LucideArrowDownWideNarrow } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation'

export default function Sidebar() {
    const [width, setWidth] = useState<number>(window.innerWidth)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const router = useRouter()

    const pathname = usePathname()

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const showSidebar = (width < 768 && isOpen) || width >= 768

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.status === 200) {
                window.location.href = "/login"; // Redirect after successful login
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className='flex items-center flex-[0.2] flex-col text-white h-screen bg-[#18181B] text-[24px]'>
            <div className="flex items-center h-[70px] md:h-[100px] md:p-[10px] mt-[10px]">
                <Logo />
            </div>
            {isOpen ? (
                <X className='flex mr-[25px] mb-[10px] ml-auto md:hidden' fill='#fff' width='24px' height='24px' onClick={() => setIsOpen(!isOpen)} />
            ) : (
                <LucideArrowDownWideNarrow className='flex mr-[25px] mb-[10px] ml-auto md:hidden' fill='#fff' width='24px' height='24px' onClick={() => setIsOpen(!isOpen)} />
            )}
            {showSidebar && (
                <ul className='w-full px-8 mt-[10px] flex flex-col gap-y-2'>
                    <li
                        className={
                            pathname === '/dashboard'
                                ? 'text-base cursor-pointer text-primary px-[25px] py-[10px] bg-[white] hover:bg-[white] font-medium transition-colors hover:text-primary'
                                : 'flex text-base items-center cursor-pointer px-[25px] py-[10px] hover:bg-[white] hover:text-primary'
                        }
                        onClick={() => router.push('/dashboard')}
                    >
                        <p className='flex ml-[15px] items-center'>Dashboard</p>
                    </li>
                    <li
                        className={
                            pathname === '/projects'
                                ? 'text-base cursor-pointer text-primary px-[25px] py-[10px] bg-[white] hover:bg-[white] font-medium transition-colors hover:text-primary'
                                : 'flex text-base items-center cursor-pointer px-[25px] py-[10px] hover:bg-[white] hover:text-primary'
                        }
                        onClick={() => router.push('/projects')}
                    >
                        <p className='flex ml-[15px] items-center'>Projects</p>
                    </li>
                    <li
                        className={
                            pathname === '/settings'
                                ? 'text-base cursor-pointer text-primary px-[25px] py-[10px] bg-[white] hover:bg-[white] font-medium transition-colors hover:text-primary'
                                : 'flex text-base items-center cursor-pointer px-[25px] py-[10px] hover:bg-[white] hover:text-primary'
                        }
                        onClick={() => router.push('/settings')}
                    >
                        <p className='flex ml-[15px] items-center'>Settings</p>
                    </li>
                    <li className='flex text-base items-center cursor-pointer px-[25px] py-[10px] md:bottom-[48px] md:absolute' onClick={() => handleLogout()}>
                        <LogOutIcon fill='#fff' width='24px' height='24px' />
                        <p className='flex ml-[15px] items-center'>Logout</p>
                    </li>
                </ul>
            )}
        </div>
    )
}
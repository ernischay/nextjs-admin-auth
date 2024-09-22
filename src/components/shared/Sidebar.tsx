"use client"

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { X, LogOutIcon, LucideArrowDownWideNarrow } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

export default function Sidebar() {
    const [width, setWidth] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    const router = useRouter()

    const pathname = usePathname()

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
        setWidth(window.innerWidth)
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
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
                router.refresh()
                router.push("/login")
            }
        } catch (err) {
            console.log(err)
        }
    };

    const navVariants = {
        hidden: {
            opacity: 0,
            transition: {
                staggerChildren: 0.1, // Adds stagger for child elements during exit
                staggerDirection: -1, // Reverse the direction on exit
            },
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className='flex items-center flex-[0.2] flex-col text-white h-screen bg-[#18181B] text-[24px]'>
            <div className="flex w-full justify-center items-center">
                <div className="flex ml-6 items-center h-[70px] w-full md:h-[100px] md:p-[10px] mt-[10px]">
                    <Logo />
                </div>
                <div className="flex h-full items-end mb-6">
                    {isOpen ? (
                        <X className='flex cursor-pointer mr-[25px] mb-[10px] ml-auto md:hidden' fill='#fff' width='24px' height='24px' onClick={() => setIsOpen(!isOpen)} />
                    ) : (
                        <LucideArrowDownWideNarrow className='flex cursor-pointer mr-[25px] mb-[10px] ml-auto md:hidden' fill='#fff' width='24px' height='24px' onClick={() => setIsOpen(!isOpen)} />
                    )}
                </div>
            </div>
            <AnimatePresence>
                {showSidebar && (
                    isMobile ?
                        <motion.aside
                            className="w-full top-0 left-0 bg-background"
                            initial={{ height: 0 }}  // Start with height 0
                            animate={{ height: isOpen ? 'auto' : 0 }} // Animate to auto when open, back to 0 when closed
                            exit={{ height: 0 }}
                            transition={{ duration: 0.8 }}  // Smooth transition
                        >
                            <motion.ul initial="hidden"
                                animate="visible"
                                exit="hidden"
                                transition={{ duration: 0.8 }}
                                variants={navVariants} className='w-full px-8 mt-[10px] pb-8 flex flex-col gap-y-2'>
                                <motion.li
                                    variants={itemVariants}
                                    className={
                                        pathname === '/dashboard'
                                            ? 'text-base cursor-pointer text-primary px-[25px] py-[10px] bg-[white] hover:bg-[white] font-medium transition-colors hover:text-primary'
                                            : 'flex text-base items-center cursor-pointer px-[25px] py-[10px] hover:bg-[white] hover:text-primary'
                                    }
                                    onClick={() => {
                                        router.refresh()
                                        router.push('/dashboard')
                                    }}
                                >
                                    <p className='flex ml-[15px] items-center'>Dashboard</p>
                                </motion.li>
                                <motion.li
                                    variants={itemVariants}
                                    className={
                                        pathname === '/projects'
                                            ? 'text-base cursor-pointer text-primary px-[25px] py-[10px] bg-[white] hover:bg-[white] font-medium transition-colors hover:text-primary'
                                            : 'flex text-base items-center cursor-pointer px-[25px] py-[10px] hover:bg-[white] hover:text-primary'
                                    }
                                    onClick={() => {
                                        router.refresh()
                                        router.push('/projects')
                                    }}
                                >
                                    <p className='flex ml-[15px] items-center'>Projects</p>
                                </motion.li>
                                <motion.li
                                    variants={itemVariants}
                                    className={
                                        pathname === '/settings'
                                            ? 'text-base cursor-pointer text-primary px-[25px] py-[10px] bg-[white] hover:bg-[white] font-medium transition-colors hover:text-primary'
                                            : 'flex text-base items-center cursor-pointer px-[25px] py-[10px] hover:bg-[white] hover:text-primary'
                                    }
                                    onClick={() => {
                                        router.refresh()
                                        router.push('/settings')
                                    }}
                                >
                                    <p className='flex ml-[15px] items-center'>Settings</p>
                                </motion.li>
                                <motion.li variants={itemVariants} className='flex text-base items-center cursor-pointer px-[25px] py-[10px] md:bottom-[48px] md:absolute' onClick={() => handleLogout()}>
                                    <LogOutIcon fill='#fff' width='24px' height='24px' />
                                    <p className='flex ml-[15px] items-center'>Logout</p>
                                </motion.li>
                            </motion.ul>
                        </motion.aside>
                        :
                        <ul className='w-full px-8 mt-[10px] pb-8 flex flex-col gap-y-2'>
                            <li
                                className={
                                    pathname === '/dashboard'
                                        ? 'text-base cursor-pointer text-primary px-[25px] py-[10px] bg-[white] hover:bg-[white] font-medium transition-colors hover:text-primary'
                                        : 'flex text-base items-center cursor-pointer px-[25px] py-[10px] hover:bg-[white] hover:text-primary'
                                }
                                onClick={() => {
                                    router.refresh()
                                    router.push('/dashboard')
                                }}
                            >
                                <p className='flex ml-[15px] items-center'>Dashboard</p>
                            </li>
                            <li
                                className={
                                    pathname === '/projects'
                                        ? 'text-base cursor-pointer text-primary px-[25px] py-[10px] bg-[white] hover:bg-[white] font-medium transition-colors hover:text-primary'
                                        : 'flex text-base items-center cursor-pointer px-[25px] py-[10px] hover:bg-[white] hover:text-primary'
                                }
                                onClick={() => {
                                    router.refresh()
                                    router.push('/projects')
                                }}
                            >
                                <p className='flex ml-[15px] items-center'>Projects</p>
                            </li>
                            <li
                                className={
                                    pathname === '/settings'
                                        ? 'text-base cursor-pointer text-primary px-[25px] py-[10px] bg-[white] hover:bg-[white] font-medium transition-colors hover:text-primary'
                                        : 'flex text-base items-center cursor-pointer px-[25px] py-[10px] hover:bg-[white] hover:text-primary'
                                }
                                onClick={() => {
                                    router.refresh()
                                    router.push('/settings')
                                }}
                            >
                                <p className='flex ml-[15px] items-center'>Settings</p>
                            </li>
                            <li className='flex text-base items-center cursor-pointer px-[25px] py-[10px] md:bottom-[48px] md:absolute' onClick={() => handleLogout()}>
                                <LogOutIcon fill='#fff' width='24px' height='24px' />
                                <p className='flex ml-[15px] items-center'>Logout</p>
                            </li>
                        </ul>
                )}
            </AnimatePresence>
        </div >
    )
}
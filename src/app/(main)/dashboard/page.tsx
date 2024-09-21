'use client'

import RecentActivity from "@/components/shared/RecentActivity";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

import { DashboardData } from "@/types/dashboard";
import { useEffect, useState } from "react";


export default function Dashboard() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<DashboardData | null>(null)
    const fetchDetails = async () => {
        try {
            setLoading(true)
            setTimeout(async () => {
                const response = await fetch("/api/dashboard", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setLoading(false)
                if (response) {
                    const data: DashboardData = await response.json();
                    setData(data)
                }
            }, 2000)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    return (
        <div className='flex flex-1 md:flex-[0.8] flex-col text-[#121212] overflow-y-auto mb-[48px] p-[40px]'>
            <div className="flex flex-col gap-y-6 ">
                <div className="flex flex-col gap-y-8">
                    <h2 className="text-3xl font-medium tracking-tight">Dashboard</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {
                            <>
                                <Card className="w-34">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Projects
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {loading ? <Skeleton className="h-[15px] w-1/2" /> : <div className="text-2xl font-bold">{data?.totalProjects}</div>}
                                    </CardContent>
                                </Card>
                                <Card className="w-34">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Compliance Score
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {loading ? <Skeleton className="h-[15px] w-1/2" /> : <div className="text-2xl font-bold">{data?.overallComplianceScore}</div>}
                                    </CardContent>
                                </Card>
                            </>
                        }
                    </div>
                </div>
                <Card className="w-auto sm:w-full lg:w-2/4 ">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            {loading ? <Skeleton className="h-[15px] w-1/2" /> : <span>You have made {data?.recentActivities.length} changes.</span>}
                        </CardDescription>
                    </CardHeader>
                    {loading ?
                        <>
                            <div className="grid gap-4 p-4 col-span-1">
                                <Skeleton className="h-[15px] w-34" />
                                <Skeleton className="h-[15px] w-34" />
                            </div>
                        </> :
                        <CardContent>
                            <RecentActivity activities={data?.recentActivities || []} />
                        </CardContent>
                    }
                </Card>
            </div>
        </div>
    )
}
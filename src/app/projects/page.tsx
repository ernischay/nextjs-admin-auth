import Sidebar from "@/components/shared/Sidebar";

export default async function Projects() {
    return (
        <div className='flex flex-col bg-[white] overflow-hidden h-screen md:flex-row'>
            <Sidebar />
            <div className='flex flex-1 md:flex-[0.8] flex-col text-[#121212] overflow-y-auto mb-[48px] p-[40px]'>
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-medium tracking-tight">Projects</h2>
                </div>
            </div>
        </div>
    )
}
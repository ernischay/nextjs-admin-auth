import Sidebar from "@/components/shared/Sidebar";

export default async function Main({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className='flex flex-col bg-[white] overflow-hidden h-screen md:flex-row'>
            <Sidebar />
            {children}
        </div>
    );

}

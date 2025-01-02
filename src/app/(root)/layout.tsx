import LeftSidebar from "@/components/LeftSidebar"
import MobileFooter from "@/components/MobileFooter"
import MobileNavbar from "@/components/MobileNavbar"
import RightSidebar from "@/components/RightSidebar"
import { headers } from "next/headers"



const homeLayout = async ({ children }: { children: React.ReactNode }) => {
    console.log('root layout runnubgn')

    //@ts-ignore
    const pathname = await headers().get('x-current-path')

return (
        <main className={` bg-dark-1 flex flex-col sm:flex-row justify-between min-h-screen`}>
            <MobileNavbar />
            <div className="fixed left-0 top-0 h-screen overflow-y-auto">
                <LeftSidebar />
            </div>
            <div className="w-full flex-1 sm:ml-[272px] xl:mr-[465px] p-4 sm:p-6 md:p-8 lg:p-10 relative z-10">
                {children}
            </div>
            <div className="hidden xl:flex fixed right-0 top-0">
                <RightSidebar pathname={pathname}/>
            </div>
            <MobileFooter />
        </main>
    )
}

export default homeLayout

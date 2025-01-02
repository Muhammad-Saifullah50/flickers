import LeftSidebar from "@/components/LeftSidebar"
import MobileFooter from "@/components/MobileFooter"
import MobileNavbar from "@/components/MobileNavbar"
import RightSidebar from "@/components/RightSidebar"
import { Inter } from "next/font/google"
import { headers } from "next/headers"

const inter = Inter({
    weight: ['300', '400', '500', '600', '700'],
    variable: "--font-inter",
})

const rootlayout = async ({ children }: { children: React.ReactNode }) => {

    const pathname = await (await headers()).get('x-current-path');

console.log(pathname , 'pathname')
    return (
        <main className={`${inter.className} bg-dark-1 flex flex-col sm:flex-row justify-between min-h-screen`}>
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

export default rootlayout

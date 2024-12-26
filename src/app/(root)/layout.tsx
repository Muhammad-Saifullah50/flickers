import LeftSidebar from "@/components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"
import { Inter } from "next/font/google"

const inter = Inter({
    weight: ['300', '400', '500', '600', '700'],
    variable: "--font-inter",
})

const rootlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className={`${inter.className} bg-dark-1 flex justify-between min-h-screen`}>
            {/* mobile navbar */}
            <div className="fixed left-0 top-0 h-screen overflow-y-auto">
                <LeftSidebar />
            </div>
            <div className="w-full flex-1 sm:ml-[272px] xl:mr-[465px] p-10 ">
                {children}
            </div>            <div className="hidden xl:flex fixed right-0 top-0">
                <RightSidebar />
            </div>
        </main>
    )
}

export default rootlayout

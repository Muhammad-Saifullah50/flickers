import LeftSidebar from "@/components/LeftSidebar"
import MobileFooter from "@/components/MobileFooter"
import MobileNavbar from "@/components/MobileNavbar"
import RightSidebar from "@/components/RightSidebar"



const homeLayout = async ({ children, postmodal }: { children: React.ReactNode, postmodal: React.ReactNode }) => {

    return (
        <main className={` bg-dark-1 flex flex-col sm:flex-row justify-between min-h-screen`}>

            <MobileNavbar />
            <div className="fixed left-0 top-0 h-screen overflow-y-auto">
                <LeftSidebar />
            </div>
            <div className="w-full flex-1 sm:ml-[272px] xl:mr-[420px] p-4 sm:p-6 md:p-8 lg:p-10 relative z-10 ">
                <div className="mx-auto max-w-4xl">
                        {children}
                        {postmodal}
                </div>
            </div>
            <div className="hidden xl:flex fixed right-0 top-0">
                <RightSidebar />
            </div>
            <MobileFooter />
        </main>
    )
}

export default homeLayout

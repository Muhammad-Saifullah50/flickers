import LeftSidebar from "@/components/LeftSidebar"
import Sidebar from "@/components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"

const rootlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="bg-dark-1 flex justify-between min-h-screen ">
            <div className="fixed left-0 top-0">
                <LeftSidebar />
            </div>
            <div className="flex-1 w-full ml-[270px] mr-[465px]">
                {children}
            </div>
            <div className="hidden xl:flex fixed right-0 top-0">
                <RightSidebar />
            </div>
        </main>
    )
}

export default rootlayout

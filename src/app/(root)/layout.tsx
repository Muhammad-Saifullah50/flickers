import LeftSidebar from "@/components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"

const rootlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="bg-dark-1 flex justify-between min-h-screen ">
            <div className="fixed left-0 top-0 h-screen overflow-y-auto">
                <LeftSidebar />
            </div>
            <div className="w-full flex-1 ml-[272px] xl:mr-[465px] p-10 ">
                {children}
            </div>            <div className="hidden xl:flex fixed right-0 top-0">
                <RightSidebar />
            </div>
        </main>
    )
}

export default rootlayout
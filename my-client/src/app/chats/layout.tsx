import ChatList from "./components/ChatList"
import ChatSearchBar from "./components/ChatSearchBar"
import Uppernav from "./components/Uppernav"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-[88vh] overflow-y-hidden bg-red-50 flex flex-row">
            <div className="left bg-[#ffffff] dark:bg-gray-800 h-full w-[300px] md:w-[350px]">
                <div className="sticky flex flex-col border-r border-slate-400">
                    <Uppernav />
                    <ChatSearchBar />
                    <hr className="h-[0.01px] bg-slate-100 dark:bg-gray-500"></hr>
                    <div className="overflow-y-scroll">
                        <ChatList />
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-slate-300 dark:bg-slate-800 h-full">
                {children}
            </div>
        </div>
    )
}
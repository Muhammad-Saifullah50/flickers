import React from 'react'

const HomeFeedSkeleton = () => {
    return (
        <>
            <section className="flex flex-col md:flex-row w-full h-full">
                <div className="flex flex-1 md:hidden w-1/2 animate-pulse">
                    {/* <!-- PostCarousel goes here --> */}
                    <div className="h-32 bg-gray-200 rounded-lg"></div>
                </div>

                <div className="flex flex-1 md:w-full w-1/2 animate-pulse">
                    {/* <!-- PostInfoCard goes here --> */}
                    <div className="h-32 bg-gray-200 rounded-lg"></div>
                </div>
            </section>

            <div className="h-32 bg-gray-200 rounded-lg"></div>
        </>)
}

export default HomeFeedSkeleton
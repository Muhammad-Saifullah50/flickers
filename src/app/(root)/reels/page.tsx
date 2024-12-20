import Heading from '@/components/Heading'
import QueryForm from '@/components/QueryForm'
import React from 'react'

const ReelsPage = async ({ params }: { params: { reels_query: string } }) => {

    const usableParams = await params;

    return (
        <main>
            <section>
                <Heading icon='/icons/reels-white.svg' text='Search Reels' className={'justify-center'}/>

                <QueryForm
                    name={'reels_query'}
                    query={usableParams.reels_query}
                    action='/reels' />
            </section>
        </main>
    )
}

export default ReelsPage
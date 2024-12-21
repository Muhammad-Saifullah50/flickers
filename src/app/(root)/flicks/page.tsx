import Heading from '@/components/Heading'
import QueryForm from '@/components/QueryForm'
import React from 'react'

const FlicksPage = async ({ params }: { params: { flicks_query: string } }) => {

    const usableParams = await params;

    return (
        <main>
            <section>
                <Heading icon='/icons/flicks-white.svg' text='Search Flicks' className={'justify-center'}/>

                <QueryForm
                    name={'flicks_query'}
                    query={usableParams.flicks_query}
                    action='/flicks' />
            </section>
        </main>
    )
}

export default FlicksPage
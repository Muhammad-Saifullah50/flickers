import Flicks from '@/components/Flicks';
import HashtagBox from '@/components/HashtagBox';
import Heading from '@/components/Heading'
import QueryForm from '@/components/QueryForm'
import React from 'react'

const FlicksPage = async ({ searchParams }: { searchParams: { flicks_query: string } }) => {

    const usableParams = await searchParams;

    return (
        <main >
            <section>
                <Heading icon='/icons/flicks-white.svg' text='Search Flicks' className={'justify-center'} />

                <QueryForm
                    name={'flicks_query'}
                    query={usableParams.flicks_query}
                    action='/flicks'
                    icon='/icons/search.svg' />

                <div className='flex justify-center gap-4'>
                    <HashtagBox text='webdevelopment' />
                    <HashtagBox text='mountains' />
                    <HashtagBox text='sunrise' />
                    <HashtagBox text='funny' />
                </div>
            </section>

            <section className='pt-10  gap-8 '>
               <Flicks query={usableParams.flicks_query}/>
            </section>
        </main>
    )
}

export default FlicksPage
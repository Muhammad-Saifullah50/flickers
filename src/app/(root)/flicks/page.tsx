import Flicks from '@/components/Flicks';
import HashtagBox from '@/components/HashtagBox';
import Heading from '@/components/Heading'
import QueryForm from '@/components/forms/QueryForm'
import FlickSkeleton from '@/components/skeletons/FlickSkeleton';
import React, { Suspense } from 'react'

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

                <div className='flex justify-center flex-wrap gap-4'>
                    <HashtagBox text='webdevelopment' />
                    <HashtagBox text='mountains' />
                    <HashtagBox text='sunrise' />
                    <HashtagBox text='funny' />
                </div>
            </section>

            <section className='pt-10  gap-8 '>
                <Suspense fallback={
                    <FlickSkeleton />
                }>
                    <Flicks query={usableParams.flicks_query} />
                </Suspense>

            </section>
        </main>
    )
}

export default FlicksPage
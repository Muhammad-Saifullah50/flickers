import { getFlicks } from '@/actions/flick.actions';
import Flicks from '@/components/Flicks';
import HashtagBox from '@/components/HashtagBox';
import Heading from '@/components/Heading'
import QueryForm from '@/components/QueryForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react'

const FlicksPage = async ({ searchParams }: { searchParams: { flicks_query: string } }) => {

    const usableParams = await searchParams;

    const flicks = await getFlicks(usableParams.flicks_query);          

    return (
        <main className=''>
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

            <section className='pt-10'>
               <Flicks flicks={flicks}/>
            </section>
        </main>
    )
}

export default FlicksPage
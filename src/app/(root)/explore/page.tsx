import Flicks from '@/components/Flicks';
import HashtagBox from '@/components/HashtagBox';
import Heading from '@/components/Heading'
import PostsGrid from '@/components/PostsGrid';
import QueryForm from '@/components/QueryForm'
import React from 'react'

const ExplorePage = async ({ searchParams }: { searchParams: { hashtag_query: string } }) => {

  const usableParams = await searchParams;
  
  let posts;

   posts = await getPopularTodayPosts() 


    return (
        <main className=''>
            <section>
                <Heading icon='/icons/flicks-white.svg' text='Search Hashtags' className={'justify-center'} />

                <QueryForm
                    name={'hashtag_query'}
                    query={usableParams.hashtag_query}
                    action='/flicks'
                    icon='/icons/search.svg' />

                <div className='flex justify-center gap-4'>
                    <HashtagBox text='webdevelopment' />
                    <HashtagBox text='mountains' />
                    <HashtagBox text='sunrise' />
                    <HashtagBox text='funny' />
                </div>
            </section>

            <section className='pt-10 flex flex-wrap gap-8'>
          <PostsGrid posts={posts} />
            </section>
        </main>
    )
}

export default ExplorePage
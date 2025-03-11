import { getPopularTodayPostsAndFlicks, getPostsandFlicksByHashtags } from '@/actions/post.actions';
import HashtagBox from '@/components/HashtagBox';
import Heading from '@/components/Heading'
import PostsGrid from '@/components/PostsGrid';
import QueryForm from '@/components/forms/QueryForm'
import GridSkeleton from '@/components/skeletons/GridSkeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Explore',
    description: 'Discover popular posts and flicks by hashtags or see what is trending today.',
}

const ExplorePage = async  ({ searchParams }: { searchParams: { hashtag_query: string } }) => {

    const usableParams = await searchParams;

    let itemsPromise;

    if (usableParams.hashtag_query) {
        itemsPromise = getPostsandFlicksByHashtags(usableParams.hashtag_query);
    } else {
        itemsPromise = getPopularTodayPostsAndFlicks()
    }

    return (
        <main className=''>
            <section>
                <Heading icon='/icons/flicks-white.svg' text='Search Hashtags' className={'justify-center'} />

                <QueryForm
                    name={'hashtag_query'}
                    query={usableParams.hashtag_query}
                    action='/explore'
                    icon='/icons/search.svg' />

                <div className='flex justify-center gap-4'>
                    <HashtagBox text='webdevelopment' />
                    <HashtagBox text='mountains' />
                    <HashtagBox text='sunrise' />
                    <HashtagBox text='funny' />
                </div>
            </section>

            <Heading text='Most Popular' className='pt-4 !text-xl font-semibold' />

            <Suspense fallback={<GridSkeleton />}>
                <section className='pt-10 '>
                    <PostsGrid itemsPromise={itemsPromise} query={usableParams.hashtag_query} />
                </section>
            </Suspense>
        </main>
    )
}

export default ExplorePage
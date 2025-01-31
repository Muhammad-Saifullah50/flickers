
import React from 'react'
import PostForm from '@/components/PostForm'
import Heading from '@/components/Heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FlickForm from '@/components/FlickForm'
import Image from 'next/image'

export const createPage = () => {
console.log('Create being rendered')
  return (
    <section>
      <Heading text='Create a Post' icon='/icons/create-white.svg' />

      <Tabs defaultValue="post" className='mt-4'>
        <TabsList>
          <TabsTrigger value="post">
            <Image
              src={'/icons/create.svg'}
              width={20}
              height={20}
              alt="Create Post"
              className='pr-2'
            />
            Create Post
          </TabsTrigger>
          <TabsTrigger value="flick">
            <Image
              src={'/icons/flicks.svg'}
              width={20}
              height={20}
              alt="Create Post"
              className='pr-2'
            />
            Create Flick</TabsTrigger>
        </TabsList>

        <TabsContent value="post">
          <PostForm />
        </TabsContent>

        <TabsContent value="flick">
          <FlickForm/>
        </TabsContent>
      </Tabs>

    </section>
  )
}

export default createPage
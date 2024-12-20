import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import PostForm from '@/components/PostForm'
import Heading from '@/components/Heading'
import { getCurrentUserFromDb } from '@/actions/user.actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ReelForm from '@/components/ReelForm'

export default async function CreatePost() {

  const user = await getCurrentUserFromDb();

  return (
    <section>
      <Heading text='Create a Post' icon='/icons/create-white.svg' />

      <Tabs defaultValue="post">
        <TabsList>
          <TabsTrigger value="post">Create Post</TabsTrigger>
          <TabsTrigger value="reel">Create Reel</TabsTrigger>
        </TabsList>

        <TabsContent value="post">
          <PostForm user={user} />
        </TabsContent>

        <TabsContent value="reel">
          <ReelForm user={user}/>
        </TabsContent>
      </Tabs>

    </section>
  )
}

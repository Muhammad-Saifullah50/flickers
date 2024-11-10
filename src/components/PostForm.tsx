import Form from 'next/form'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'

const PostForm = () => {
    return (
        <Form action={async () => {
            'use server'
        }}>
            <div className='py-10 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='caption'>Caption</Label>
                    <Textarea name='caption' rows={5} />
                </div>
                <div>
                    {/* todo: add file input */}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='altText'>Photo/Video Alt Text</Label>
                    <Input name='altText' />
                </div>
            </div>

        </Form>
    )
}

export default PostForm

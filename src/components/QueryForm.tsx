
import Form from 'next/form'
import { Input } from './ui/input'
import Image from 'next/image'

type QueryFormProps = {
    name: string
    query: string
    action: string
    icon:string
}
const QueryForm = ({ name, action, icon }: QueryFormProps) => {
    return (
        <Form action={action} className='py-6 relative flex justify-center  max-w-[500px] mx-auto '>    
            <Image src={icon} width={20} height={20} alt='search' className='relative left-8'/>
            <Input name={name}
                type='text'
                placeholder='Search for flicks by creators or hashtags'
                className='!bg-dark-3 focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0 placeholder:!text-purple-tertiary p-5 rounded-lg pl-10 '
            />
        </Form>
    )
}

export default QueryForm
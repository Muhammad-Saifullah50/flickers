
import Form from 'next/form'
import { Input } from './ui/input'

type QueryFormProps = {
    name: string
    query: string
    action: string
}
const QueryForm = ({ name, action }: QueryFormProps) => {
    return (
        <Form action={action} className='py-6'>
            <Input name={name}
                type='text'
                placeholder='Search for flicks by creators'
                className='!bg-dark-3 pr-10 focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0 max-w-[500px] mx-auto placeholder:text-purple-tertiary '
            />
        </Form>
    )
}

export default QueryForm
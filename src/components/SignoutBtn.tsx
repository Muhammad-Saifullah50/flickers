'use client'
import { useState } from 'react'
import { Button } from './ui/button'
import Loader from './Loader'
import { useToast } from '@/hooks/use-toast'
import { signoutOnServer } from '@/actions/auth.actions'
import Image from 'next/image'

const SignoutBtn = () => {

    const [loading, setloading] = useState(false)

    const handleClick = async () => {
        try {
            setloading(true)

            await signoutOnServer();

            toast({
                description: 'Signed out successfully'
            })
        } catch (error) {
            console.error('Error signin out', error)
            setloading(false)
        }
    }

    const { toast } = useToast();
    return (
        <Button
            onClick={handleClick}
            className='!bg-[#FF5A5A]'>
            {loading ? (
                <Loader variant='white' />
            ) : (
                <span className='flex items-center justify-center gap-4'>
                    <Image src={'/icons/logout-white.svg'}
                        width={25}
                        height={25}
                        alt='logout' />
                    <p>Logout</p>
                </span>)}
        </Button>
    )
}

export default SignoutBtn
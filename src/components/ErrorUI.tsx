'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Adjust path as needed

interface ErrorUIProps {
  error?: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorUI({ error, reset }: ErrorUIProps) {
  const router = useRouter();

  useEffect(() => {
    error &&
    console.error('Error:', error);
  }, [error && error]);

  return (
    <div className="flex flex-col gap-4 min-h-[95vh] items-center justify-center ">
     
        <h1 className="text-7xl font-bold text-gray-900 dark:text-white">Oh No!</h1>
        <h2 className="text-xl  text-gray-400">
          Something went wrong
        </h2>
       
        
        <div className="mt-6 flex justify-center gap-4">
          <Button variant="secondary" onClick={() => router.push('/')}>
            Go Home
          </Button>
          <Button onClick={reset}>Try Again</Button>
        
      </div>
    </div>
  );
}

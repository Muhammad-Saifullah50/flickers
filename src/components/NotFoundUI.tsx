'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; 

export default function NotFoundUI() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-[95vh] items-center justify-center ">
     
        <h1 className="text-7xl font-bold text-gray-900 dark:text-white">404</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Oops! The page you are looking for doesn't exist.
        </p>
        <Button
          className="mt-6 px-6 py-2 text-lg"
          onClick={() => router.push('/')}
        >
          Go Home
        </Button>
    </div>
  );
}

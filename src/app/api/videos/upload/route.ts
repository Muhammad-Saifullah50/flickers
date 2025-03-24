

import { auth } from '@/lib/auth';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';


export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    try {
        let uploadedBlobUrl = '';
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async () => {

                const session = await auth();

                if (!session) {
                    throw new Error('Unauthorized');
                }

                return {
                    allowedContentTypes: ['video/*'],
                    tokenPayload: JSON.stringify({
                        userId: session?.user?.id
                    }),
                };
            },
            onUploadCompleted: async ({ blob }) => {

                console.log('blob upload completed', blob);
                uploadedBlobUrl = blob.url
            },
        });

        return NextResponse.json(jsonResponse)
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 },
        );
    }
}
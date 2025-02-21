import Ably from 'ably';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {

    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get('clientId');

        const client = new Ably.Realtime(process.env.ABLY_PRIVATE_KEY!);
        
        const tokenRequestData = await client.auth.createTokenRequest({ clientId: userId as string});

        return NextResponse.json(tokenRequestData);
        
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }

}
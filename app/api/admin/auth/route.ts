import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const PB_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL ||
  'http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const pb = new PocketBase(PB_URL);
    pb.autoCancellation(false);

    // Authenticate as PocketBase Admin / Superuser
    let authData: any;
    try {
      authData = await pb.admins.authWithPassword(email, password);
    } catch {
      // Fallback for newer PB collections if needed
      authData = await pb.collection('_superusers').authWithPassword(email, password);
    }

    return NextResponse.json({
      success: true,
      token: authData?.token,
      admin: {
        id: authData?.record?.id || authData?.admin?.id || 'admin',
        email: authData?.record?.email || authData?.admin?.email || email,
      },
    });
  } catch (error: any) {
    console.error('Admin Auth Error:', error);
    return NextResponse.json(
      { error: error?.message || 'فشل تسجيل الدخول. يرجى التحقق من صحة البيانات.' },
      { status: 401 }
    );
  }
}

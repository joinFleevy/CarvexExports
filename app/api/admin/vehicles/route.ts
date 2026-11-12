import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const PB_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL ||
  'http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io';

const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'namaagrowthagency@gmail.com';
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || 'fDTHzV3HhhiaTFy@';

async function getAuthenticatedPb(authHeader?: string | null) {
  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    pb.authStore.save(token, null);
    if (pb.authStore.isValid) {
      return pb;
    }
  }

  // Fallback to server admin login
  try {
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  } catch {
    await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  }
  return pb;
}

// 1. GET: Fetch list of vehicles
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const branch = searchParams.get('branch');
    const status = searchParams.get('status');
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    const pb = await getAuthenticatedPb(request.headers.get('authorization'));

    const filters: string[] = [];
    if (!includeDeleted) {
      filters.push('is_deleted != true');
    }
    if (branch && branch !== 'all') {
      filters.push(`branch = "${branch}"`);
    }
    if (status && status !== 'all') {
      filters.push(`status = "${status}"`);
    }

    const records = await pb.collection('vehicles').getFullList({
      filter: filters.length > 0 ? filters.join(' && ') : undefined,
      expand: 'branch',
      sort: '-created',
    });

    return NextResponse.json({ success: true, items: records });
  } catch (error: any) {
    console.error('Failed to fetch vehicles:', error);
    return NextResponse.json(
      { error: error?.message || 'فشل جلب قائمة السيارات' },
      { status: 500 }
    );
  }
}

// 2. POST: Create a new vehicle
export async function POST(request: Request) {
  try {
    const pb = await getAuthenticatedPb(request.headers.get('authorization'));
    const formData = await request.formData();

    // Clean up empty relation values so PocketBase does not complain
    const branchValue = formData.get('branch');
    if (!branchValue || branchValue === 'none' || branchValue === '') {
      formData.delete('branch');
    }

    const newRecord = await pb.collection('vehicles').create(formData, {
      expand: 'branch',
    });

    return NextResponse.json({ success: true, item: newRecord }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create vehicle:', error);
    return NextResponse.json(
      { error: error?.data?.message || error?.message || 'فشل إنشاء سجل السيارة' },
      { status: 500 }
    );
  }
}

// 3. PUT: Update an existing vehicle
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    const pb = await getAuthenticatedPb(request.headers.get('authorization'));
    const contentType = request.headers.get('content-type') || '';

    let updatedRecord;
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const branchValue = formData.get('branch');
      if (branchValue === 'none' || branchValue === '') {
        formData.set('branch', '');
      }
      updatedRecord = await pb.collection('vehicles').update(id, formData, {
        expand: 'branch',
      });
    } else {
      const body = await request.json();
      if (body.branch === 'none' || body.branch === '') {
        body.branch = '';
      }
      updatedRecord = await pb.collection('vehicles').update(id, body, {
        expand: 'branch',
      });
    }

    return NextResponse.json({ success: true, item: updatedRecord });
  } catch (error: any) {
    console.error('Failed to update vehicle:', error);
    return NextResponse.json(
      { error: error?.data?.message || error?.message || 'فشل تحديث بيانات السيارة' },
      { status: 500 }
    );
  }
}

// 4. DELETE: Soft delete or permanent delete
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const permanent = searchParams.get('permanent') === 'true';

    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    const pb = await getAuthenticatedPb(request.headers.get('authorization'));

    if (permanent) {
      await pb.collection('vehicles').delete(id);
      return NextResponse.json({ success: true, message: 'تم الحذف النهائي للسيارة بنجاح' });
    } else {
      // Soft delete
      const updated = await pb.collection('vehicles').update(id, {
        is_deleted: true,
        deleted_at: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, message: 'تم أرشفة السيارة ونقلها للمهملات', item: updated });
    }
  } catch (error: any) {
    console.error('Failed to delete vehicle:', error);
    return NextResponse.json(
      { error: error?.data?.message || error?.message || 'فشل حذف السيارة' },
      { status: 500 }
    );
  }
}

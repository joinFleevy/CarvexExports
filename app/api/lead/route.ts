import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      client_name,
      client_phone,
      branch = 'الجزائر العاصمة',
      vehicle = 'غير محدد',
      customs_regime = 'غير محدد',
      estimated_price = '',
      notes = '',
    } = body;

    // Build Telegram alert message
    const telegramMessage = `
🚗 <b>طلب استفسار / حجز جديد — CARVEX EXPORT</b>
━━━━━━━━━━━━━━━━━━
👤 <b>اسم الزبون:</b> ${client_name || 'غير مذكور'}
📞 <b>رقم الهاتف:</b> <code>${client_phone || 'غير مذكور'}</code>
📍 <b>الصالة المطلوبة:</b> ${branch}
🚘 <b>المركبة:</b> ${vehicle}
📑 <b>النظام الجمركي:</b> ${customs_regime}
💰 <b>السعر / التقدير:</b> ${estimated_price || 'غير محدد'}
💬 <b>ملاحظة إضافية:</b> ${notes || 'لا توجد'}
━━━━━━━━━━━━━━━━━━
⏰ <i>${new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' })}</i>
    `.trim();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    // Collect recipient user IDs
    const targetChatIds = new Set<string>();

    // 1. From environment variable (supports comma or space separated list)
    if (process.env.TELEGRAM_CHAT_ID) {
      process.env.TELEGRAM_CHAT_ID.split(/[\s,]+/)
        .map((id) => id.trim())
        .filter(Boolean)
        .forEach((id) => targetChatIds.add(id));
    }

    // 2. From PocketBase telegram_users collection (dynamic database-managed users)
    try {
      const activeUsers = await pb.collection('telegram_users').getFullList({
        filter: 'is_active = true && receive_alerts = true',
      });

      // Map branch text to branch codes if needed
      const branchLower = (branch || '').toLowerCase();
      let targetCode = 'all';
      if (branchLower.includes('جيجل') || branchLower.includes('jijel')) targetCode = 'jijel';
      else if (branchLower.includes('ورقلة') || branchLower.includes('ouergla')) targetCode = 'ouergla';
      else if (branchLower.includes('عاصمة') || branchLower.includes('alger')) targetCode = 'alger';

      for (const user of activeUsers) {
        if (user.branch === 'all' || user.branch === targetCode) {
          if (user.user_id) targetChatIds.add(String(user.user_id).trim());
        }
      }
    } catch (pbErr) {
      console.log('PocketBase telegram_users lookup fallback:', pbErr);
    }

    // Default fallback to primary admin ID if no target found
    if (targetChatIds.size === 0) {
      targetChatIds.add('8209658134');
    }

    // Send notifications to all authorized IDs
    if (botToken && targetChatIds.size > 0) {
      const promises = Array.from(targetChatIds).map(async (chatId) => {
        try {
          return await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramMessage,
              parse_mode: 'HTML',
            }),
          });
        } catch (err) {
          console.error(`Failed to send telegram message to ${chatId}:`, err);
        }
      });

      await Promise.allSettled(promises);
    } else {
      console.log('Lead data logged (Bot token not provided):', {
        client_name,
        client_phone,
        branch,
        vehicle,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'تم تسجيل طلبك بنجاح، سيتواصل معك مستشار المبيعات قريباً.',
    });
  } catch (error) {
    console.error('Lead route error:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء معالجة الطلب' },
      { status: 500 }
    );
  }
}

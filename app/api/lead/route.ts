import { NextResponse } from 'next/server';

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
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
            parse_mode: 'HTML',
          }),
        });
      } catch (tgError) {
        console.error('Telegram notification error:', tgError);
      }
    } else {
      console.log('Telegram Bot Token/Chat ID not configured. Lead data:', {
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

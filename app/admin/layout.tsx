import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'لوحة التحكم المركزية | CARVEX EXPORT Admin',
  description: 'لوحة إدارة أسطول السيارات وحساب الضرائب والجمارك لشركة Carvex Export',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-[#00A2E8] selection:text-black [cursor:default]">
      {children}
    </div>
  );
}

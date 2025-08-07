"use client";

import { usePathname } from 'next/navigation';
import HeaderSection from './header-section';

export default function ConditionalHeader() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
    return null;
  }

  return <HeaderSection />;
}

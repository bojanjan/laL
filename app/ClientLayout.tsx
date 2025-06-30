"use client";

import { I18nProvider } from '../lib/i18n';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}
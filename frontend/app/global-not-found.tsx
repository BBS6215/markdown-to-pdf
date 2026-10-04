import './globals.css';
import NotFound from './not-found';
import { DocumentShell, siteMetadata } from '@/lib/layout/document-shell';

// Next 15 global-not-found bypasses route layouts and must emit a full document.
export const metadata = { ...siteMetadata, title: '404 — Page not found', robots: { index: false, follow: false } };
export default function GlobalNotFound() {
  return <DocumentShell><NotFound /></DocumentShell>;
}

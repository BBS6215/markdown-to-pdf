import '../globals.css';
import { DocumentShell, siteMetadata } from '@/lib/layout/document-shell';

export const metadata = siteMetadata;
export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <DocumentShell>{children}</DocumentShell>;
}

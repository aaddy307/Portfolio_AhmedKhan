export const metadata = {
  title: 'Admin - Portfolio',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <main id="main-content">{children}</main>;
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <div className="flex-1">{children}</div>
    </div>
  );
}

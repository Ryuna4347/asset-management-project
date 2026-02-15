export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Phase 4에서 구현 */}
      <aside className="hidden w-60 border-r border-border bg-sidebar md:block">
        <div className="flex h-16 items-center px-6">
          <span className="text-lg font-bold text-sidebar-foreground">
            자산 관리
          </span>
        </div>
        <nav className="space-y-1 px-3 py-2">
          {/* 네비게이션 항목은 Phase 4에서 추가 */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-6">{children}</div>
      </main>

      {/* Mobile Bottom Tab - Phase 4에서 구현 */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-background md:hidden">
        <div className="flex h-16 items-center justify-around">
          {/* 모바일 탭 항목은 Phase 4에서 추가 */}
        </div>
      </nav>
    </div>
  );
}

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          자산 관리
        </h1>
        <p className="mt-2 text-muted-foreground">
          개인 투자자를 위한 자산 관리 애플리케이션
        </p>
      </div>
      <Link
        href="/dashboard"
        className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        대시보드로 이동
      </Link>
    </div>
  );
}

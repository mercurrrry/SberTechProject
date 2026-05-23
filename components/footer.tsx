export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Мониторинг кредитных сделок. Все права защищены.
          </p>
          <p className="text-sm text-muted-foreground">
            Версия 1.0 | Данные защищены
          </p>
        </div>
      </div>
    </footer>
  );
}

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR">
      <body>

        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

          <div className="container">

            <Link
              href="/"
              className="navbar-brand"
            >
              Catálogo
            </Link>

            <Link
              href="/novo"
              className="nav-link text-white"
            >
              Novo
            </Link>

          </div>

        </nav>

        {children}

      </body>
    </html>
  );
}
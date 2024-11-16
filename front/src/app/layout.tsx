import "./globals.css";
import ApolloProviderWrapper from "./components/ApolloProviderWrapper"; // 분리된 컴포넌트 임포트
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <ApolloProviderWrapper>
          <Header />
          <main className="flex-grow container mx-auto py-6">{children}</main>
          <Footer />
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
import "./globals.css";
import ApolloProviderWrapper from "./components/ApolloProviderWrapper"; // 분리된 컴포넌트 임포트
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProviderWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
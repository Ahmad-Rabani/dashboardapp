import StyledComponentsRegistry from "../../registry";
import Header from "@/common_components/Header/Header";
import Footer from "@/common_components/Footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body style={{ backgroundColor: "#e6e6e6" }}>
        <StyledComponentsRegistry>
          <Header />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

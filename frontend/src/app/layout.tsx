import type { Metadata } from 'next';
import '@rainbow-me/rainbowkit/styles.css';
import '@/ui/styles/globals.css';
import { ChakaraCusProviders } from '@/providers/ChakaraCusProviders';
import { Flex } from '@chakra-ui/react';
import Header from '@/ui/layouts/Header';
import Footer from '@/ui/layouts/Footer';
import DoNotAccessModal from '@/ui/components/Modals/DoNotAccessModal';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakaraCusProviders>
          <Header />
          <Flex flexDirection="column" flex={1}>
            {children}
          </Flex>
          <Footer />
          <DoNotAccessModal />
        </ChakaraCusProviders>
      </body>
    </html>
  );
}

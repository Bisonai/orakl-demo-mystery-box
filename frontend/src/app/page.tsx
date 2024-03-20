'use client';
import AppWrapper from '@/ui/components/AppWrapper';
import { Card, TabLine } from '@/ui/components';
import BoxItem from '@/ui/views/Commons/BoxItem';
import NFTItem from '@/ui/views/Commons/NFTItem';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppSelector } from '@/lib/reduxs/hooks';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useMysteryNFTContract from '@/lib/hooks/useMysteryNFTContract';

export default function Home() {
  const { isConnected } = useAccount();
  const [tab, setTab] = useState('1');
  const { boxBalanceOf, nfts } = useAppSelector(p => p.account);
  const {} = useMysteryNFTContract();
  return (
    <AppWrapper gap="20px">
      <Flex w="full" mt="50px">
        <Flex w="full">
          <TabLine
            w="full"
            tabs={[
              {
                label: 'Claim Box',
                value: '1',
              },
              {
                label: 'Inventory',
                value: '2',
              },
            ]}
            value={tab}
            onTabSelect={v => setTab(v as string)}
          />
        </Flex>
      </Flex>
      {tab === '1' && (
        <Card w="full" my="20px" type="light" isBorder>
          <SimpleGrid columns={3} gap={20}>
            <BoxItem />
            <BoxItem />
            <BoxItem />
          </SimpleGrid>
        </Card>
      )}

      {tab === '2' && (
        <Card w="full" my="20px" type="light" isBorder>
          {!isConnected && <ConnectButton />}
          <SimpleGrid columns={3} gap={20}>
            {Boolean(boxBalanceOf) && <BoxItem btnLabel="Open Box" isOpenBox />}
            {nfts.map(nft => (
              <NFTItem key={nft.name} nft={nft} />
            ))}
          </SimpleGrid>
        </Card>
      )}
    </AppWrapper>
  );
}

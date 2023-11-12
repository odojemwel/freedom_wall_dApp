"use client"
import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import NotesList from '@/components/NotesList';

export default function Home() {

  const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
  );

  return (
    <Box className="flex flex-col min-h-screen" bgGradient="linear(to-r, blue.900, purple.900)">
      <div className="flex items-center justify-between w-full px-20 py-8 bg-opacity-50 nav-bar bg-gray-950">
        <header className="text-5xl font-bold text-sky-300">📝Freedom Wall in the Web3</header>
        <WalletMultiButtonDynamic />
      </div>
      <NotesList />
    </Box>
  )
}

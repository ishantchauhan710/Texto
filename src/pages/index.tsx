import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Button } from '@mui/material'
import NavBar from '@/components/NavBar'
import TextEditor from '@/components/TextEditor'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Texto</title>
        <meta name="description" content="An AI based content generation tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <NavBar />
        <TextEditor />
      </main>
    </>
  )
}

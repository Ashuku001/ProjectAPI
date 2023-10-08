import './globals.css'
import type { Metadata } from 'next'
import { ApolloWrapper } from '../lib/graphql/ApolloWrapper'
import Header from './components/Header'
import Providers from '../providers/Providers'
import AuthGuard from './components/AuthGuard'
import {ToastContainer} from 'react-toastify'


export const metadata: Metadata = {
  title: 'CRM',
  description: 'CRM Enterprise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={` min-h-screen grid  bg-fixed text-slate-600 dark:text-slate-200  bg-slate-200 dark:bg-black px-2 md:px-10`}>
        <Providers>
          <ApolloWrapper>
            <AuthGuard>
              <main className='relative flex-auto flex-grow-none h-full'>
                <ToastContainer className={''}/>
                <Header/>
                {children}
              </main>
            </AuthGuard>
          </ApolloWrapper>
        </Providers>
      </body>
    </html>
  )
}

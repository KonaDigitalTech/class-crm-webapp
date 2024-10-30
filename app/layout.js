'use client'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/store'
import { ToastContainer } from 'react-toastify'
import localFont from "next/font/local"
import "./globals.css"
import 'react-toastify/dist/ReactToastify.css'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Create store instance outside component
const store = makeStore()

// Create StoreProvider component
function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          {children}
          <ToastContainer/>
        </StoreProvider>
      </body>
    </html>
  );
}
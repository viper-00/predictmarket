import localFont from 'next/font/local';

export const walletFont = localFont({
  src: [
    {
      path: './core/Satoshi-Regular.woff2',
      weight: '400',
    },
    {
      path: './core/Satoshi-Medium.woff2',
      weight: '500',
    },
    {
      path: './core/Satoshi-Bold.woff2',
      weight: '700',
    },
  ],
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
  variable: '--font-tape',
});

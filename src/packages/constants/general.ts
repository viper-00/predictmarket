export const PRED_APP_NAME = 'PREDICTMARKET';
export const PRED_APP_DESCRIPTION =
  "Building the world's best cryptocurrency wallet tool, providing developers with the finest learning toolkits to help reduce learning costs and facilitate knowledge acquisition.";

export const PRED_ENV = process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'mainnet';
export const IS_MAINNET = PRED_ENV === 'mainnet';

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION = !IS_DEVELOPMENT;

export const STATIC_ASSETS = 'https://static.predictmarket.xyz';
export const WA_WEBSITE_URL = IS_MAINNET ? '' : '';

export const PRED_ADDRESS = '0x0000000000000000000000000000000000000000';

// walletconnect
export const WC_PROJECT_ID = '29db29d9b55f7729f8c061b43fda1bb5';

// error messages
export const ERROR_MESSAGE = 'Oops, something went wrong!';
export const SIGN_IN_REQUIRED = 'Login to continue';

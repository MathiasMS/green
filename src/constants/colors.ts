import colors from 'tailwindcss/colors';

type Theme = 'light' | 'dark' | 'system' | undefined;

const getAppBackgroundColor = (theme: Theme = 'light') => {
  return theme === 'light' ? colors.white : colors.gray[900];
};

const getAppTextColor = (theme: Theme = 'light') => {
  return theme === 'light' ? colors.gray[900] : colors.white;
};

const getHeaderTintColor = (theme: Theme = 'light') => {
  return theme === 'light' ? colors.gray[900] : colors.white;
};

export { getAppBackgroundColor, getAppTextColor, getHeaderTintColor };

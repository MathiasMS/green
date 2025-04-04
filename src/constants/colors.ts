import colors from 'tailwindcss/colors';

type Theme = 'light' | 'dark' | 'system' | undefined;

const getAppBackgroundColor = (theme: Theme = 'light') => {
  return theme === 'light' ? colors.white : colors.gray[800];
};

const getAppTextColor = (theme: Theme = 'light') => {
  return theme === 'light' ? colors.gray[800] : colors.white;
};

export { getAppBackgroundColor, getAppTextColor };

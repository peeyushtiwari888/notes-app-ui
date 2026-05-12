const lightTheme = {
  background: '#F0F2FA',
  card: '#FFFFFF',
  cardBorder: 'rgba(91,99,240,0.08)',
  text: '#13172B',
  secondaryText: '#5C6280',
  tertiaryText: '#9EA5C0',
  placeholder: '#B0B8D4',
  primary: '#5B63F0',
  primaryLight: '#EEF0FF',
  onPrimary: '#FFFFFF',
  statusBarStyle: 'dark-content',
  searchBg: '#FFFFFF',
  divider: '#E4E7F5',
  fabShadow: '#5B63F0',
  headerGradientStart: '#5B63F0',
  headerGradientEnd: '#7B63F0',
  inputBg: '#F6F7FF',
  danger: '#FF5C77',
};

const darkTheme = {
  background: '#0D0F1C',
  card: '#181C2E',
  cardBorder: 'rgba(110,124,255,0.12)',
  text: '#ECEFFE',
  secondaryText: '#9AA3CC',
  tertiaryText: '#636B90',
  placeholder: '#4A5070',
  primary: '#6E7CFF',
  primaryLight: '#1A1F3A',
  onPrimary: '#FFFFFF',
  statusBarStyle: 'light-content',
  searchBg: '#181C2E',
  divider: '#1F2340',
  fabShadow: '#6E7CFF',
  headerGradientStart: '#1A1D35',
  headerGradientEnd: '#12152A',
  inputBg: '#0F1222',
  danger: '#FF5C77',
};

// Accent colors for note cards
const cardAccents = [
  { bg: '#FFF3F5', dot: '#FF5C77', darkBg: '#21141A', darkDot: '#FF5C77' },
  { bg: '#FFF8EC', dot: '#FFB340', darkBg: '#201A0F', darkDot: '#FFB340' },
  { bg: '#F0FFF6', dot: '#34C97A', darkBg: '#0F1E16', darkDot: '#34C97A' },
  { bg: '#F0F2FF', dot: '#5B63F0', darkBg: '#111328', darkDot: '#6E7CFF' },
  { bg: '#FDF0FF', dot: '#B963F0', darkBg: '#1A1124', darkDot: '#C577FF' },
  { bg: '#F0FBFF', dot: '#38C4E8', darkBg: '#0E1B22', darkDot: '#38C4E8' },
];

export { lightTheme, darkTheme, cardAccents };

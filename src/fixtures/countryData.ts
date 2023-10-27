import { country } from '@/constants/icon';

const {
  Algeria,
  Angola,
  Benin,
  Ghana,
  Nigeria,
  Senegal,
  SouthAfrica,
  SierraLeone,
} = country;

const countryData = [
  { label: 'Algeria', value: 'Algeria', icon: Algeria, countryCode: 'DZ', dialCode: '213' },
  { label: 'Angola', value: 'Angola', icon: Angola, countryCode: 'AO', dialCode: '244' },
  { label: 'Benin', value: 'Benin', icon: Benin, countryCode: 'BJ', dialCode: '229' },
  { label: 'Ghana', value: 'Ghana', icon: Ghana, countryCode: 'GH', dialCode: '233' },
  { label: 'Nigeria', value: 'Nigeria', icon: Nigeria, countryCode: 'NG', dialCode: '234' },
  { label: 'Senegal', value: 'Senegal', icon: Senegal, countryCode: 'SN', dialCode: '221' },
  { label: 'SouthAfrica', value: 'SouthAfrica', icon: SouthAfrica, countryCode: 'ZA', dialCode: '27' },
  { label: 'SierraLeone', value: 'SierraLeone', icon: SierraLeone, countryCode: 'SL', dialCode: '232' },
];

export default countryData;

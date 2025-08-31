import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
];

export const useLanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage =
    SUPPORTED_LANGUAGES.find(lang => lang.code === i18n.language) ||
    SUPPORTED_LANGUAGES[0];

  const showLanguageSelector = () => {
    const options = SUPPORTED_LANGUAGES.map(lang => ({
      text: `${lang.nativeName} (${lang.name})`,
      onPress: () => changeLanguage(lang.code),
    }));

    Alert.alert(
      t('settings.language.title') || 'Select Language',
      t('settings.language.subtitle') || 'Choose your preferred language',
      [
        ...options,
        {
          text: t('common.cancel') || 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const changeLanguage = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return {
    currentLanguage,
    showLanguageSelector,
    changeLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
};

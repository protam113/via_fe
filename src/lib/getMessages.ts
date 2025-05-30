export const getMessages = async (locale: string) => {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (e) {
    return (await import(`../../messages/en.json`)).default;
  }
};

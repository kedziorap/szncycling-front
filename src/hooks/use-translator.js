import { useTranslation } from "react-i18next";

const useTranslator = (text) => {
  const { t, ready } = useTranslation();
  return ready ? t(text, { returnObjects: true }) : '...'
}

export default useTranslator;
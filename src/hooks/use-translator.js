import { useTranslation } from "react-i18next";

const useTranslator = (text, data) => {
  const { t, ready } = useTranslation();
  return ready ? t(text, data, { returnObjects: true }) : '...'
}

export default useTranslator;
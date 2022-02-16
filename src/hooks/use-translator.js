import { useTranslation } from "react-i18next";

const useTranslator = (text) => {
  const { t, ready } = useTranslation();
  return ready ? t(text) : <span className="skeleton-translate" />
}

export default useTranslator;
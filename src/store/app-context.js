import React, { useState } from 'react';

const AppContext = React.createContext({
  mobileMode: true,
  menuIsVisible: false
});

export const AppContextProvider = (props) => {
  const [isMobile, setIsMobile] = useState(true);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const setMobileIsActive = () => setIsMobile(true);
  const setMobileIsNotActive = () => setIsMobile(false);

  return (
    <AppContext.Provider
      value={{
        mobileMode: isMobile,
        setMobileIsActive,
        setMobileIsNotActive,
        menuIsVisible,
        setMenuIsVisible,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContext;

import { useEffect, useState } from 'react';

const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    setIsMobile(/Mobi/.test(navigator.userAgent));
  }, []);

  return isMobile;
};

export default useMobileDetect;

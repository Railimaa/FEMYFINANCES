import { useEffect, useState } from 'react';

export function useWindowHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleHeightResize() {
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleHeightResize);

    return () => window.removeEventListener('resize', handleHeightResize);
  }, []);

  return height;
}

import React, { useEffect, useState } from 'react';
import { useTheme } from '../../utils/themeProvider';

interface Props {
  username: string;
}

export const Ps1: React.FC<Props> = ({ username }) => {
  const [hostname, setHostname] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window !== undefined) {
      setHostname(window.location.hostname);
    }
  }, []);

  return (
    <div>
      <span
        style={{
          color: theme.yellow,
        }}
      >
        {username === undefined ? 'guest' : username}
      </span>
      <span
        style={{
          color: theme.white,
        }}
      >
        @
      </span>
      <span
        style={{
          color: theme.green,
        }}
      >
        {hostname}
      </span>
      <span
        style={{
          color: theme.white,
        }}
      >
        :$ ~
      </span>
    </div>
  );
};

export default Ps1;


import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  useRecoilState
} from 'recoil';
import { themeState } from '../atoms';


export default function ToggleColorMode() {
  const themeMUI = useTheme();
  const [theme, setTheme] = useRecoilState<'light' | 'dark'>(themeState);
  const onChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton sx={{ ml: 0, color: theme === 'light' ? 'text.primary' : 'common.white' }} onClick={onChange} color="inherit">
      {themeMUI.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}


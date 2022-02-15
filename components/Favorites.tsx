import * as React from 'react';
import {
  IconButton,
  Box,
  Fade,
  Badge,
  Popper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Grid,
  ClickAwayListener,
  CardMedia,
  Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { favoritesState, themeState } from '../atoms';
import useSWR from 'swr';
import { fetcher } from '../utils';
import * as _ from 'lodash';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Favorites() {

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [favorites, setFavorites] = useRecoilState<string[]>(favoritesState);
  const theme = useRecoilValue<'light' | 'dark'>(themeState);
  const { data, error } = useSWR('/api/product', fetcher);
  const [toastOpen, setToastOpen] = React.useState(false);

  const favoritesBoxStyles = {
    color: theme === 'light' ? 'text.primary' : 'common.white',
    bgcolor: theme === 'light' ? 'grey.200' : 'grey.900',
    width: '400px',
    p: 1,
    boxShadow: 5
  };

  React.useEffect(() => {
    // close drawer when cart's empty
    if (!favorites.length) {
      setOpen(false);
    }
  }, [favorites]);


  const handleToastClick = () => {
    setToastOpen(true);
  };

  const handleToastClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };


  const handleClick =
    () =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
      };

  const handleClickAway = () => setOpen(false);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleToastClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const renderNoItemsInCartToast = () => {
    return (
      <Snackbar
        open={toastOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleToastClose}
        message="There are no Favorite items. Add Some!"
        action={action}
      />
    );
  };

  const renderFavoritesList = () => {
    return (
      <Box sx={favoritesBoxStyles}>
        {favorites.map((itemID, k) => {
          const productInfo = data[_.findIndex(data, ['id', itemID])];
          return (
            <List key={k}>
              <ListItem disablePadding>
                <ListItemButton>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Link href={`/product/[slug]`} as={`/product/${productInfo.slug}`}>
                        <a>
                          <CardMedia
                            component="img"
                            alt={productInfo.name}
                            height="60"
                            image={productInfo.images[0].url}
                            sx={{ bgcolor: '#FFFFFF' }}
                          />
                        </a>
                      </Link>
                    </Grid>
                    <Grid item xs={6}>
                      <Link href={`/product/[slug]`} as={`/product/${productInfo.slug}`}>
                        <a>
                          <Box sx={{ display: 'flex', alignItems: 'center' }} >
                            <Typography variant="body2">
                              {productInfo.name}
                            </Typography>
                          </Box>
                        </a>
                      </Link>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        disableRipple
                        onClick={() => {
                          const favoriteIndex = favorites.indexOf(productInfo.id);
                          const tempArray = [...favorites];
                          tempArray.splice(favoriteIndex, 1)
                          setFavorites(tempArray);
                        }}
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItemButton>
              </ListItem>
            </List>
          )
        })}
      </Box>
    );
  }

  return (
    <>
      <IconButton size="large" color="inherit" onClick={favorites.length ? handleClick() : handleToastClick}
        sx={{ color: theme === 'light' ? 'text.primary' : 'common.white' }}>
        <Badge badgeContent={favorites.length} color="secondary">
          <FavoriteIcon />
        </Badge>
      </IconButton>
      <Popper open={open} anchorEl={anchorEl} placement={'bottom'} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={350}>
              {renderFavoritesList()}
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
      {renderNoItemsInCartToast()}
    </>
  )
}
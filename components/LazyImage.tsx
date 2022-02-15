import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function LazyImage({ url, height, width }: any) {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const handleImageLoaded = () => {
    console.log('laoded');
    
    setLoaded(true);
  }

  return (
    <div>
      {!loaded &&
        <Skeleton variant="rectangular" width={Number(width)} height={Number(height)} />
      }
      <img src={url} onLoad={handleImageLoaded} height={height} width={width} />
    </div>
  );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard({imageLink,productId,productName,productDescription,key,viewBtnFn}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={productName}
        height="140"
        image={imageLink}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {productName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {productDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{viewBtnFn(productId)}}>Learn More</Button>
      </CardActions>
    </Card>
  );
}

import { Grid } from "@mui/material";
import Gallery from "./Gallery";
import Pic1 from '../../images/pic1.jpg';
import Bid from '../../images/bid-2.jpg';
import Sell from '../../images/buynsell-3.jpg';
import front from '../../images/front-1.jpg';

const images = [
  {
      src: front,
      caption: 'Welcome!!!',
    },
    {
      src: Bid,
      caption: 'Bid the product of your choice',
    },
    {
      src: Sell,
      caption: 'Auction your product here',
    },
];
const Home = () => {
  
  return <>
    <Grid container justifyContent='center'>
        <Grid item sm={10}>
          {/* <h1>Home Page</h1>
          <hr /> */}
          <p><Gallery caption={images}/> </p>
        </Grid>
      </Grid>
    </>; 
}

export default Home;

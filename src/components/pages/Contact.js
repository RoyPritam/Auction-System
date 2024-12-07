import { Grid } from "@mui/material";

const Contact = () => {
  return <>
    <Grid container justifyContent='center'>
      <Grid item sm={10}>
        <h1>Contact Us</h1>
        <hr />
        <h2>We're here for you</h2>
        <p>For all enquries, please contact us.</p>
        <p>
          <span>Address:</span> 19B Ground Floor Laxmi Appartment, Delhi 110013
        </p>
        <p>
          <span>Phone:</span>
          <a href="tel://123456789"> +9199 2355 98</a>
        </p>
        <p>
          <span>Email:</span>
          <a href="mailto:aucsystem@gmail.com"> aucsystem@gamil.com</a>
        </p>
      </Grid>
      <Grid item sm={6}>
      <p> &copy; 2022 auctionsystem</p>
      </Grid>
    </Grid>
  </>;
};

export default Contact;

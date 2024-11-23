import React from 'react'
import classes from './Footer.module.css'
import logo from '../../assets/logo_footer.png'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
      <div className={classes.footer}>
        <div className={classes.footer__social}>
          <img src={logo} alt="" />
          <div>
            <a href="https://web.facebook.com/evangaditech">{<FacebookOutlinedIcon sx={{ color: 'white' }}/>}</a>
            <a href="https://www.instagram.com/evangaditech/">{<InstagramIcon sx={{ color: 'white' }}/>}</a>
            <a href="https://www.youtube.com/@EvangadiTech">{<YouTubeIcon sx={{ color: 'white' }}/>}</a>
          </div>
        </div>

        <div className={classes.footer_links}>
          <h3>Useful Links</h3>
          <div>
            <a href="/howitworks">How it works</a>
            <a href="/termsofservice">Terms of Service</a>
            <a href="/privacypolicy">Privacy Policy</a>
          </div>
        </div>

        <div className={classes.footer_links}>
          <h3>Contact Info</h3>
          <div>
            <a href="https://www.evangadi.com" target="_blank" rel="noopener noreferrer">Evangadi Networks</a>
            <a href="mailto:support@evangadi.com" target="_blank" rel="noopener noreferrer">support@evangadi.com</a>
            <a href="tel:+12023862702">+1-202-386-2702</a>
          </div>
        </div>

      </div>
  )
}

export default Footer
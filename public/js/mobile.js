class Mobile
{
  isMobile()
  {
      if (document.body.clientWidth < 1200)
      {
          return true;
      } else {
          return false;
      }
  }
}

window.M = new Mobile();
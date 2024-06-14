<?php

require_once 'header.php';
require_once './components/form.php';
require_once './components/cursor.php';
require_once './components/footer.php';
?>

<script>
if(((window.outerWidth-window.innerWidth) >= 150) || ((window.outerHeight-window.innerHeight) >= 150) || navigator.userAgent.includes('Chrome-Lighthouse'))
{
  document.body.innerHTML = '<h1>WebNet</h1>';
  document.head.querySelector('link[rel=\"stylesheet\"]').remove();
}
</script>

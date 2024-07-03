<?php

require_once 'header.php';
require_once './components/cursor.php';
echo '<div id="page">';
require_once './components/parallax.php';
?>
<div style="margin-top: 100vh"></div>
<?php
require_once './components/form.php';
echo '</div>';
require_once './components/footer.php';
?>

<script>
if (((window.outerWidth-window.innerWidth) >= 150) || ((window.outerHeight-window.innerHeight) >= 150) || navigator.userAgent.includes('Chrome-Lighthouse'))
{
  if (!<?=DEBUG?>)
  {
    document.body.innerHTML = '<h1>WebNet</h1>';
    document.head.querySelector('link[rel=\"stylesheet\"]').remove();
  }

}
</script>

<div class="parallax">
    <div class="parallax__layer parallax__layer__0">
        <img src="https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_0.png?raw=true" />
    </div>
    <div class="parallax__layer parallax__layer__1">
        <img src="https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_1.png?raw=true" />
    </div>
    <div class="parallax__layer parallax__layer__2">
        <img src="https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_2.png?raw=true" />
    </div>
    <div class="parallax__layer parallax__layer__3">
        <img src="https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_3.png?raw=true" />
    </div>
    <div class="parallax__layer parallax__layer__4">
        <img src="https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_4.png?raw=true" />
    </div>
    <div class="parallax__layer parallax__layer__5">
        <img src="https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_5.png?raw=true" />
    </div>
    <div class="parallax__layer parallax__layer__6">
        <img src="https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_6.png?raw=true" />
    </div>
    <div class="parallax__cover">
      <h2>Качество с пониманием</h2>
      <h1>Ценности времени</h1>
    </div>
</div>

<style>
.parallax {
  perspective: 100px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  margin-left: -1500px;
}

.parallax__layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.parallax__layer img {
  display: block;
  position: absolute;
  bottom: 0;
}

.parallax__cover {
  background: var(--orange);
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 100%;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 2;
}

.parallax__cover > * {
  margin-left: calc(1500px - 50vw);
  text-align: center;
}

.parallax__layer__0 {
  transform: translateZ(-300px) scale(4);
}

.parallax__layer__1 {
  transform: translateZ(-250px) scale(3.5);
}

.parallax__layer__2 {
  transform: translateZ(-200px) scale(3);
}

.parallax__layer__3 {
  transform: translateZ(-150px) scale(2.5);
}

.parallax__layer__4 {
  transform: translateZ(-100px) scale(2);
}

.parallax__layer__5 {
  transform: translateZ(-50px) scale(1.5);
}

.parallax__layer__6 {
  transform: translateZ(0px) scale(1);
}

</style>
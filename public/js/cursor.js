document.body.innerHTML += '<div class="cursor-dot-outline"></div>';
document.body.innerHTML += '<div class="cursor-dot"></div>';

let cursor = {
    delay: 2,
    _x: 0,
    _y: 0,
    endX: window.innerWidth / 2,
    endY: window.innerHeight / 2,
    cursorVisible: true,
    cursorEnlarged: false,
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-dot-outline'),

    init: function () {
        this.dotSize = this.dot.offsetWidth;
        this.outlineSize = this.outline.offsetWidth;

        this.setupEventListeners();
        this.animateDotOutline();
    },

    setupEventListeners: function () {
        let self = this;

        document.querySelectorAll('a').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function () {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });

        document.addEventListener('mousedown', function () {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });

        document.addEventListener('mouseup', function () {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });

        document.addEventListener('mousemove', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            self.endX = e.clientX;
            self.endY = e.clientY;
            self.dot.style.top = self.endY + 'px';
            self.dot.style.left = self.endX + 'px';
        });

        document.addEventListener('mouseenter', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.dot.style.opacity = 1;
            self.outline.style.opacity = 1;
        });

        document.addEventListener('mouseleave', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.dot.style.opacity = 0;
            self.outline.style.opacity = 0;
        });

        document.querySelectorAll('button').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function () {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });

    },

    animateDotOutline: function () {
        let self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.outline.style.top = self._y + 'px';
        self.outline.style.left = self._x + 'px';

        requestAnimationFrame(self.animateDotOutline.bind(self));
    },

    toggleCursorSize: function () {
        let self = this;

        if (self.cursorEnlarged) {
            self.dot.style.transform = 'translate(-50%, -50%) scale(2.00)';
            self.outline.style.transform = 'translate(-50%, -50%) scale(0)'; self.dot.style.boxShadow = '0 0 10px black';
        }
        else {
            self.dot.style.boxShadow = 'none!important';
            self.dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorVisibility: function () {
        let self = this;

        if (self.cursorVisible) {
            self.dot.style.opacity = 1;
            self.outline.style.opacity = 1;
        }
        else {
            self.dot.style.opacity = 0;
            self.outline.style.opacity = 0;
        }
    },
};

cursor.init();

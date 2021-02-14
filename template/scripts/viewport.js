function lockScroll() {
	document.body.classList.add('is_locked');
}

function unlockScroll() {
	document.body.classList.remove('is_locked');
}

function fixViewportHeight() {
	document.documentElement.style.setProperty('--vh', (window.innerHeight / 100) + 'px');
}

window.addEventListener('DOMContentLoaded', fixViewportHeight);
window.addEventListener('orientationchange', fixViewportHeight);
window.addEventListener('resize', fixViewportHeight);
window.addEventListener('load', fixViewportHeight);
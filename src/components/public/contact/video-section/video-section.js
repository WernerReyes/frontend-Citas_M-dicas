import './video-section.css';

const videoSection = () => {
    const section = document.createElement('section');
    section.classList.add('video');
    section.innerHTML = `
    <div class="overlay"> </div>
    <video autoplay muted loop>
      <source src="/assets/video/contsctanos02.webm" type="video/webm">
    </video>
    `;
    return section;
};

export default videoSection;

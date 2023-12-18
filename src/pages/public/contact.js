import { topBar } from "../../components/common";
import { footerPublic, formContactSection, headerPublic, preloader, videoSection } from "../../components/public";
import { mainScript } from "../../utils/scripts";

const contactPage = container => {
  // Create the topbar and header components
  const topbar = topBar();
  const header = headerPublic();

  // <--! Content -->
  const video = videoSection();
  const formContact = formContactSection(); // In this section we send the contact form to the backend
  // --> Content <--
 
  // Create the footer component
  const footer = footerPublic();

  // Create the preloader component
  const preload = preloader();

  // Create a document fragment
  const fragment = document.createDocumentFragment();
  fragment.appendChild(topbar);
  fragment.appendChild(header);
  fragment.appendChild(video);
  fragment.appendChild(formContact);
  fragment.appendChild(footer);
  fragment.appendChild(preload);

  // Load scripts
  document.body.appendChild(mainScript());

  // Append content to container
  container.appendChild(fragment);

};

export default contactPage;

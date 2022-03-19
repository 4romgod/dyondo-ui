import "../components/Footer/footer.css";
import "../components/Header/nav.css";
import "../components/Header/navtopics.css";
import "../components/Loader/loader.css";
import "../components/Checkbox/checkbox.css";
import "../components/blog/SmallCard/smallCard.css";
import "../node_modules/nprogress/nprogress.css";
import "../node_modules/react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import "highlight.js/styles/an-old-hope.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
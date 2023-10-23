import { withPluginApi } from "discourse/lib/plugin-api";
import { defaultHomepage } from "discourse/lib/utilities";

export default {
  name: "smooth-scroll",

  initialize() {
    withPluginApi("0.8.13", (api) => {
      const site = api.container.lookup("site:main");

      if (site.desktopView && !settings.enable_on_desktop) {
        return;
      }
      
      if (site.mobileView && !settings.enable_on_mobile) {
        return;
      }
      
      function smoothScroll() {
        document.documentElement.classList.add("scroll-top");
        window.addEventListener("scroll", function(){
          if (window.scrollY < 100) {
            document.documentElement.classList.remove("scroll-top");
          }
        });
        if (window.pageYOffset < 100) {
          document.documentElement.classList.remove("scroll-top");
        }
      }
      
      api.onPageChange((url, title) => {
        const router = api.container.lookup('service:router');
        const routeDiscovery = router.currentRouteName === `discovery.${defaultHomepage()}`;
        const siteLogo = document.querySelector("#site-logo");
        const siteTextLogo = document.querySelector("#site-text-logo");
        
        if (routeDiscovery) {
          siteTextLogo?.addEventListener("click", smoothScroll, true);
          siteLogo?.addEventListener("click", smoothScroll, true);
        } else {
          siteTextLogo?.removeEventListener("click", smoothScroll, true);
          siteLogo?.removeEventListener("click", smoothScroll, true);
        }
      });
    });
  },
};

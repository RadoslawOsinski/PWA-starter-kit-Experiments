Experimenting with PWA from Google
---
I am slightly disappointed with this website template. Using webcomponents with material design goodies feels bad.
I felt very unproductive in comparison to good old JSP.

In my opinion web components are great for delivering small self contained website parts. 
WebComponents usage would be great for attaching "google maps" on website.
But defining entire website layouts by WebComponents felt cumbersome because duplicating CSS/SCSS styles between DOM and shadow DOM.

This website fragment is not compiling, building. This project is just a reminder of my experiment.

---
**THIS EXPERIMENT IS NOT PRODUCTION READY!**

Lessons learned during experiments:
---
* https://github.com/ahmetb/gke-letsencrypt is a great way to obtain SSL certificates from LetsEncrypt on kubernetes without HELM instalation. It works!
* I would definitely recommend polymer WebComponents for delivering plugins for external websites.
* I didn't knew I was using "Redux". It was just a natural way to separate JS model from JS actions.
* ES 6 imports are "must have" in a new project. "RequireJs" is no longer necessary.
* jQuery is useless today. When choosing additional tools for JS try to avoid dependencies to jQuery. Coding with plain browser standards is easier to maintain.
* Still I don't know how to write pretty gui and layouts. I am doomed for cooperation with frontend developers.

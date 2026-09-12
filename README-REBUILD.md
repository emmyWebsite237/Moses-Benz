# Moses Benz Auto Care — clean frontend rebuild

This rebuild uses one lightweight public `index.html` with hash-based navigation instead of a large collection of public HTML pages and competing page-transition scripts.

- Public content renders immediately; Supabase is hydrated in the background.
- Existing Mercedes-Benz catalogue remains in `cars/` and `js/cars.js`.
- Existing Supabase and Cloudinary configuration files are retained.
- Three vehicle previews, inventory search, vehicle details, blog, reviews, careers, Find Us, appointment form, contact controls and floating Call/WhatsApp controls remain.
- Search accepts compact model spellings such as `c300` and `g63`.
- The existing private admin portal files are preserved separately.

AppDeploy deployment was blocked by the deployment tool safety layer in this chat, so this ZIP is the completed build artifact rather than a claim that it was published by AppDeploy.

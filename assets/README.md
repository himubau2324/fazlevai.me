# Assets Folder

This folder is set up to hold locally-hosted images, icons, logos, and fonts —
but the code-generation sandbox used to restructure this site has **no network
access**, so the external images already used by the site could not be
downloaded automatically.

## What's still loading from an external URL

**Testimonial avatars** (in `index.html`):
- https://i.postimg.cc/G3FNRBgB/images.jpg (Tanvir Ahmed)
- https://i.postimg.cc/8z0X4Lcw/images.jpg (Sadia Karim)
- https://i.postimg.cc/PJTSJ4VD/images.jpg (Robiul Hasan)

**Product images** (in `js/products-data.js`, used on the homepage grid and
each product's detail page):
- Amazon Prime Video — https://i.postimg.cc/8PshH9vS/images.jpg
- Gemini AI — https://i.ibb.co.com/j9w6TRvt/images.jpg
- Apple Music — https://i.ibb.co.com/ynLPTHZq/images.png
- Google One — https://i.ibb.co.com/DHB5YP4f/images.png
- Neon NZ Subscription — https://i.postimg.cc/HLtcH9M2/images.jpg
- CapCut Pro — https://i.postimg.cc/k5PK75hH/images.jpg
- Canva Pro — https://i.postimg.cc/kGHRzMSP/images.jpg
- ChatGPT Plus — https://i.postimg.cc/L8Kn1b3d/images.jpg
- Nord VPN — https://i.ibb.co.com/RTrXPY6t/images.jpg
- Express VPN — https://i.ibb.co.com/mrQKFZGG/images.jpg
- Crave Subscription — https://i.postimg.cc/wTSskvHT/images.jpg
- Tidal Music — https://i.ibb.co.com/QLx8tWm/images.jpg
- HBO Max — https://i.ibb.co.com/kTYzbXK/images.png
- Crunchyroll — https://i.ibb.co.com/TM5xbDrm/images.png

The remaining product icons (Spotify, Netflix, YouTube, LinkedIn, ChatGPT Go,
Adobe Creative Cloud) are already fully self-contained inline SVGs — no
download needed for those.

**Google Fonts** ("Plus Jakarta Sans") is still loaded from
`fonts.googleapis.com` in every page's `<head>`. This is standard practice
and generally fine to leave external, but it can also be self-hosted if you
want a fully offline-capable site.

## How to finish localizing these

1. Download each image above and save it into this `assets/images/` folder
   (suggested names: `testimonial-tanvir.jpg`, `product-amazon-prime.jpg`,
   etc.).
2. In `js/products-data.js`, replace each `<img src="https://...">` with the
   local path, e.g. `assets/images/product-amazon-prime.jpg` (root pages) —
   the path is the same for both `index.html` and every `/products/*.html`
   page because the browser resolves `<img>` `src` attributes written into
   the shared `js/products-data.js` file relative to whichever page renders
   them, so keep this consistent by testing both contexts after the swap.
3. In `index.html`, update the three testimonial `<img src="...">` tags the
   same way.
4. (Optional) Download the Plus Jakarta Sans font files and self-host them
   in `assets/fonts/`, then swap the `<link href="https://fonts.googleapis...">`
   tag for a local `@font-face` rule in `css/style.css`.

## Favicon / logo note

The original site never had a real logo image file — its "logo" is just an
inline 🛒 emoji rendered via an SVG data URI, which is already fully
self-contained (no download needed). Because there's no source logo image,
no `favicon.ico` / `favicon-16x16.png` / `favicon-32x32.png` /
`apple-touch-icon.png` files were fabricated, and `site.webmanifest`'s
`icons` array is left empty. If you'd like a proper multi-size favicon set
and manifest icons, provide (or design) a square logo image and it can be
generated from that.

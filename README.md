# MAA BIDRI MOTORS DHODRA(HONDA) — Nabarangpur

A responsive, mobile-first website for MAA BIDRI MOTORS DHODRA(HONDA), built to the design brief in
*"Maa Bidri Showroom, Dhodra — Website Research and Claude Design Prompt"* (the source
document's own title still says "Showroom" — the site itself now reads "Motors").

It is a static site with no build step and no dependencies. Open `index.html` in a browser,
or serve the folder with any static host (GitHub Pages, Netlify, Vercel, or the showroom's
existing hosting).

```
index.html              the full homepage
privacy.html            privacy policy
terms.html              terms of use
robots.txt              TEMPORARY — blocks search engines, delete before launch
assets/css/style.css    design system + all layout
assets/js/main.js       navigation, category tabs, enquiry form → WhatsApp
```

## ⚠ This deploy is blocked from search engines

`robots.txt` disallows every crawler, and `index.html` carries
`<meta name="robots" content="noindex, nofollow">`. Both are deliberate: the live pages carry
sample prices and placeholder testimonials, and neither belongs in Google under the showroom's
name.

**Before real launch, do both of these:**

1. Delete `robots.txt`
2. Remove the `<meta name="robots" content="noindex, nofollow">` tag from `index.html`
   (leave the `noindex` on `privacy.html` and `terms.html` — those are meant to stay unindexed)

Miss either one and the showroom stays invisible on Google. Do them only *after* the sample
prices and testimonials are replaced with real content.

## Content status

Every bracketed placeholder is now filled. What is real and what is invented:

| | |
| --- | --- |
| Phone, WhatsApp, hours, map link | supplied by the owner |
| PIN code 764073 | corroborated — the owner's map pin falls in the Umerkote subdivision |
| Landmark "Main Road, Dhodra — near the bus stop" | **invented** — replace with the real landmark |
| Models, specs, prices | from the owner's *Honda Bikes Model & Price Guide* |
| Testimonials | **invented**, with fictional names |
| Offer copy | deliberately non-specific — it points riders at the team instead of naming a discount, so it stays true between campaigns |
| Service list | genuine parts and trained technicians confirmed by the owner; pickup/drop removed at their instruction |
| Service area | Dhodra, Umerkote, Papadahandi, Jharigam — confirmed by the owner |
| Social links | dummy `#` links |
| Showroom exterior, service bay | **real photos** supplied by the owner |
| Product photos, photo strip | not supplied — illustrations and "Photo coming soon" boxes stand in |

### Confirmed contact details

These are live on the page:

| | |
| --- | --- |
| Phone | +91 99376 01505 |
| WhatsApp | +91 99376 01505 (same number) |
| Opening hours | Monday – Saturday, 10:00 AM – 7:00 PM · Sunday closed |
| Map pin | 19.598010 N, 82.252288 E — coordinate embed supplied by the owner |

They appear both as visible text in `index.html` and as `tel:` / `wa.me` / Maps hrefs. To
change them later, edit the block at the top of `assets/js/main.js` — it overrides every
matching link on the page at load:

```js
const SHOWROOM = {
  phone: "+919937601505",
  whatsapp: "919937601505",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=19.598010%2C82.252288"
};
```

Note that the *visible* number and hours are plain text in `index.html`, so update those too.

### The map is a live embed

The location section holds Google's own coordinate-pinned iframe, supplied by the showroom
owner from Google Maps → Share → Embed a map. It centres on **19.598010 N, 82.252288 E**
(19°35'52.8"N 82°15'17.5"E), needs no API key, and cannot drift the way a name search can.

The `5e1` in the `pb` string sets **satellite view**. Change it to `5e0` for the standard road
map, which is usually easier to navigate by.

The four Get Directions buttons — hero quick-action, location block, mobile bar, and the
enquiry-adjacent link — all point at `maps/dir/?api=1&destination=19.598010,82.252288`, the
same coordinates the frame is centred on, so the map and the directions cannot disagree. The
old `maps.app.goo.gl` short link is gone from the project; its target was never verifiable from
here, and the reviews attached to it looked like the Maa Bidri *temple* rather than the
showroom.

The frame carries no caption or link bar of its own, at the owner's request — the Get
Directions button in the address column beside it covers that job.

**Privacy note.** The frame loads with the page, so every visitor's browser contacts Google
directly and Google may set cookies — this is not a click-only handoff. `privacy.html` says so
plainly. If that tradeoff is unwanted, the map can become a click-to-load panel that only
contacts Google once the visitor taps it.

### Product models and photos

The bikes section lists four models the showroom sells, plus a "New arrivals & electric"
card that invites an enquiry rather than naming a model:

| Tab | Models |
| --- | --- |
| Commuter Bikes | Shine 100, Shine 125, SP 125, Unicorn 160 |
| Sporty Bikes | SP 160, Hornet 2.0 |
| Scooters | Activa 6G, Activa 125, Dio / Dio 125 |
| Premium & Adventure | CB300F / CB300R, ADV160 |

Every model, specification, and price comes from the owner's *Honda Bikes Model & Price
Guide* — nothing here is invented.

Prices are shown as the guide's ranges (e.g. ₹82,000 – ₹98,000) with an "ex-showroom*" marker,
and the note under the grid carries the guide's own caveat: approximate ex-showroom estimates,
with local taxes, RTO charges, insurance, and accessories extra.

**The fourth tab was renamed** from "Electric / New Arrivals" to **"Premium & Adventure"**. The
guide lists no electric model, so the old label had nothing to show.

**Models from the guide that are *not* on the page:** CB350 / H'ness / CB350RS, Rebel 300 /
500, NX500, Transalp 750, CB750 Hornet, CBR1000RR-R Fireblade, and Gold Wing Tour. These are
Honda BigWing models, sold through a separate dealership network, and listing them on a
standard dealership's site would invite enquiries the showroom cannot fulfil. Say the word if
the showroom does handle any of them.

**Shine 125 and SP 125 have separate cards.** The price guide groups them on one line, so both
carry its ₹82,000 – ₹98,000 range, but they are different bikes and the owner supplied a photo
of each.

**The CBR250R is deliberately absent.** The owner sent a photo of one, but it is not in the
price guide and is discontinued in India, so listing it would draw enquiries the showroom
cannot fill.

Cards otherwise use line illustrations. Three — Shine 125, SP 125, and Dio — are wired for
photographs that have not been supplied yet; see `assets/img/README.md`.

**Dummy social links.** The Facebook, Instagram, and YouTube icons in the footer point at `#`
— they go nowhere rather than to someone else's page. Swap the `href` for the real profile
URLs when the showroom has them.

### Sample data — must be replaced before this site is public

The testimonials are invented, at the owner's request, so the layout can be evaluated with
realistic content. They are marked as samples on the page itself.

**Testimonials.** The three reviews, their names (Suresh M., Laxmi P., Rabi N.), their areas,
and their star ratings are all written for the demo. No real customer said any of it. The
section carries a visible "Sample content — placeholder reviews shown for design preview"
badge above the cards.

Deliberately, these are *not* the reviewers from the showroom's Google listing. Those reviews
("Good", "Drive", a devotional line about Bidri Maa) read as reviews of the Maa Bidri temple
rather than the showroom, and attributing invented sentences to named real people would
misrepresent them.

Publishing invented reviews as though they were genuine customer feedback is misleading
advertising, and in India it falls under the Consumer Protection Act and ASCI's guidelines on
fake reviews. Before this site goes public, either replace these with real, consented customer
reviews or delete the three cards and let the "Read our Google reviews" link stand on its own.


### Legal pages

`privacy.html` and `terms.html` share the site's header, footer, and stylesheet. Both are
`noindex`, since thin legal pages are not worth indexing.

The privacy policy describes what the site actually does, which is very little: no cookies, no
analytics, no backend, and an enquiry form that hands off to WhatsApp without sending anything
itself. It also names the two places data does leave — Google Fonts (an IP address, as with any
request) and the Google Maps links.

The terms cover indicative pricing, offers, finance and insurance being the lender's decision,
test rides, and manufacturer trade marks. They are written for this showroom rather than copied
from a generic template, but **they are not legal advice** — have someone qualified read them
before launch, particularly the governing-law and liability sections.

### Placeholder imagery

Two real photographs of the premises are in place, both supplied by the owner:

- `assets/img/showroom-exterior.jpg` — the hero panel
- `assets/img/service-bay.jpg` — the service section

Both were EXIF-rotated, resized to 1080px wide, and saved as progressive JPEG at quality 82
(210KB and 261KB). The hero carries a soft tonal scrim rather than the old line pattern, which
read as a net over a photograph. The service photo shows its full portrait frame, uncropped, so
the Honda sign, the tool board, the workbench, and the bike on the lift are all visible.

Still illustrations: the product-card fallbacks. Still labelled boxes: the photo strip below
the testimonials — it wants the team, a delivery moment, and a wider exterior shot.

## The enquiry form goes to WhatsApp

Submitting the form opens WhatsApp with the enquiry already written out, addressed to the
showroom's number. The rider presses send from their own account. Nothing is stored, posted,
or emailed by the page — there is no backend and no third-party form service.

The message the showroom receives:

```
New enquiry from the MAA BIDRI MOTORS DHODRA(HONDA) website

Name: Ramesh Kumar
Mobile: +91 9876543210
Interested in: Booking a test ride
Prefers: WhatsApp
Message: I would like to know more about Honda CBR250R.
```

The "Interested in" line follows the dropdown, which the Enquire / Book Test Ride / Ask for
Price / Book a Service buttons preselect, so the rider's route through the page carries into
the message. The mobile number is normalised to `+91` plus ten digits, so it is tappable in
WhatsApp for the call back. The last line is omitted when the rider leaves the message box
empty.

Worth knowing about this approach:

- **The rider must press send.** Closing WhatsApp without sending means the showroom never
  hears about it — the page cannot detect this.
- **It reveals the rider's own WhatsApp number** to the showroom, which is the point, but it
  also means riders without WhatsApp cannot use the form. The call button and the phone number
  in the success panel cover them.
- **No record is kept on the site.** The showroom's WhatsApp is the only log of enquiries.

To change the destination number, edit `whatsapp` in the `SHOWROOM` block at the top of
`assets/js/main.js` — the form, the header, the footer, and the mobile bar all follow it.

If the showroom later wants enquiries in an inbox or a sheet as well, the submit handler in
`assets/js/main.js` is the single place to add a `fetch()` to a form service alongside the
WhatsApp handoff.

## ElevenLabs chat widget

A conversational AI agent sits in the bottom-right corner. Two lines in `index.html`:

```html
<!-- in <head> -->
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>

<!-- last element in <body>, before main.js -->
<elevenlabs-convai agent-id="agent_9201m22tkmwceyg9njp9xqnw03hw"></elevenlabs-convai>
```

Everything else — greeting, voice, language, what the agent knows about the showroom — is
configured in the ElevenLabs dashboard against that agent ID, not here.

**It is lifted above the mobile bar.** `.mobile-bar` is fixed to the bottom of the screen
below 960px, which is the same corner the widget wants. `assets/css/style.css` offsets the
widget by 64px there and returns it to the corner at ≥960px. If a future version of the
widget positions its own launcher inside its shadow root, that offset stops applying —
check the bottom-right corner on a phone after any widget update.

**The script URL is not version-pinned.** `unpkg.com/@elevenlabs/convai-widget-embed`
resolves to whatever the latest release is, so an upstream breaking change reaches the live
site with no warning. To pin it, find the current version on
[npm](https://www.npmjs.com/package/@elevenlabs/convai-widget-embed) and add it:

```html
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed@1.2.3" async type="text/javascript"></script>
```

**Voice replies need a microphone.** The browser prompts the visitor on first use, and only
grants it over HTTPS — fine on Netlify, which serves HTTPS by default. If a
`Content-Security-Policy` or `Permissions-Policy` header is ever added (via `netlify.toml`
or a `_headers` file — neither exists today), it has to allow `microphone=(self)` plus the
ElevenLabs script, connect and media origins, or the widget will fail silently.

## Design system

Taken directly from the brief.

| Token | Colour | Used for |
| --- | --- | --- |
| Maa Bidri red | `#A92D24` | primary buttons, active states, key accents |
| Saffron gold | `#E5A52F` | offers, badges, icons, secondary highlights |
| Charcoal | `#202326` | headings, navigation, footer |
| Warm cream | `#F7F2E8` | page background |
| Stone | `#E5DED1` | borders, muted surfaces, inputs |
| White | `#FFFFFF` | cards, forms, product panels |
| Success green | `#2F7D55` | verified / available / service states only |

Manrope for headings, Plus Jakarta Sans for body, both with system-sans fallbacks. 8px
spacing increments, 16–28px card radii, soft shadows, 44px minimum tap targets, single-column
mobile layout expanding to a 3-column desktop grid at 960px.

The identity is deliberately its own: no manufacturer logo, slogan, colour system, imagery,
or proprietary layout is copied.

## Page structure

Header · split hero · quick-action strip · tabbed bikes and scooters · why choose Maa Bidri ·
offers and finance · service · testimonials and photo strip · Dhodra location · enquiry form ·
footer · floating mobile action bar (call, WhatsApp, directions, enquire).

## Before launch

Phone, WhatsApp, opening hours, and the map pin are confirmed. Still needed:

- **The four product photos**, into `assets/img/` (see `assets/img/README.md`)
- **Real social profile URLs** to replace the dummy `#` links
- **Replace the sample testimonials** — see "Sample data" above. This is the one item that
  cannot ship as-is.
- **Verify the landmark line** in the address block — it is still invented
- **Have the legal pages reviewed** by someone qualified
- **Photographs** for the photo strip — exterior, team, a delivery moment, the service bay.
  Use the showroom's own photos; Google Maps photos are uploaded by other people and are not
  the showroom's to republish.
- PIN code, nearest landmark, finance partners, service capabilities, and current offers

Once those are supplied the remaining placeholders can be replaced without changing the
visual system.

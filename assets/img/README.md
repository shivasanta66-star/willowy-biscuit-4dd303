# Images

## Logo

| File | Where |
| --- | --- |
| `logo.png` | 256px — brand mark in the header and footer of all three pages |
| `favicon.png` | 64px — browser tab icon on all three pages |

Both are cut from the owner's supplied artwork. **That original needed cleaning
before use:** it was keyed against a green screen and shipped with green
fringing along every edge plus a faint green wash over the whole "transparent"
area (corner pixels read alpha 3–12 with RGB around `(0,191,0)`), which would
have haloed the mark on the cream header and the charcoal footer alike.

Alpha in the source was cleanly bimodal — ~306k fully transparent pixels, ~93k
opaque, ~10k contaminated in between — so the fix was to drop everything below
alpha 128 and snap what remained to the two flat brand colours, red
`#C91E21` and saffron `#F0A000`, splitting them on the green channel (the
saffron carries real green, the red almost none). The result is hard-edged at
full resolution, which is fine: downscaling 1342px artwork to a 48px mark
regenerates the anti-aliasing.

Regenerate from the original rather than from `logo.png` if a larger size is
ever needed — the trimmed master measures 1342×1597 before squaring.

| File | Where |
| --- | --- |
| `showroom-exterior.jpg` | hero panel |
| `service-bay.jpg` | service section |

Both are the showroom's own photographs — EXIF-rotated, resized to 1080px wide,
saved as progressive JPEG at quality 82.

## Product photos — 10 files covering all 11 cards

| File | Card |
| --- | --- |
| `honda-shine.jpg` | Honda Shine 100 **and** Honda Shine 125 |
| `honda-sp-125.jpg` | Honda SP 125 |
| `honda-unicorn-160.jpg` | Honda Unicorn 160 |
| `honda-sp-160.jpg` | Honda SP 160 |
| `honda-hornet.jpg` | Honda Hornet 2.0 |
| `honda-activa-6g.jpg` | Honda Activa 6G |
| `honda-activa-125.jpg` | Honda Activa 125 |
| `honda-dio.jpg` | Honda Dio / Dio 125 |
| `honda-cb300.jpg` | Honda CB300F / CB300R |
| `honda-adv160.jpg` | Honda ADV160 |

Cropped from Honda's own official product catalog images (supplied by the
owner as a reference PDF), padded to a consistent 16:10 frame against each
photo's own background tone, capped at 900px wide.

`honda-shine.jpg` is the exception: it comes from a full-resolution Honda press
shot the owner supplied separately, so it is sharper than the rest. That
original carried a Honda wing logo top-left and a "Shine 100/125" wordmark
top-right, both masked out before cropping so the card matches the clean
bike-only treatment of the other ten. The masks are keyed to measured bounds —
above y=160 the bike never passes x=1025, and from y=160–215 never past
x=1053 — so they take the overlays and nothing else.

**Both Shine cards share this one file**, at the owner's instruction — Honda
markets the shot as "Shine 100/125". Worth knowing that the bike in it is
badged **125** on its side panel, so the Shine 100 card shows a 125. Give the
Shine 100 its own file and repoint that card's `data-src` if that ever matters.

**Copyright note:** these are Honda's manufacturer product photography, not
the showroom's own photographs. Displaying them is common practice for an
authorised dealer, but strictly they should come from Honda's official dealer
media kit under the dealership agreement rather than a screenshot/collage. If
that's not confirmed, swap in the dealer-kit versions before a public launch.

`showroom-front.jpg` is still expected for the "showroom exterior" tile in the
photo strip — not yet supplied — and shows at its own aspect ratio (a wide
shopfront panorama displayed whole, not cropped to a tile) once it arrives.

`main.js` loads a file first and only reveals the photo once it has arrived,
hiding the illustration at that point — so a wrong filename leaves the
illustration in place rather than a broken image. While a file is missing the
browser console logs a 404 for it; that clears once the file exists.

## Adding a photo to any other card

Add an `<img>` beside that card's `<svg>` in `index.html`:

```html
<img class="bike-photo" data-src="assets/img/honda-activa-6g.jpg"
     alt="Honda Activa 6G" hidden>
```

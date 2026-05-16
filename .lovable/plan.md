# Add Tamika Steffenauer to the About team grid

Replace the "Now hiring" placeholder (4th slot) on `/about` with Tamika as Office Manager, using the uploaded portrait.

## Changes
- Copy `user-uploads://image-13.png` → `src/assets/tamika-hero.jpg`
- In `src/routes/about.tsx`:
  - Import the new asset
  - Add a 4th entry to the `team` array:
    - **Name:** Tamika Steffenauer
    - **Role:** Office Manager
    - **Bio:** "Tamika is the glue. She makes sure we take our breaks, get on-site on time, keeps everyone fed, pays the bills, and writes the checks. Nothing at Digital Solution runs without her."
    - **Quote:** "“Somebody's gotta keep these guys fed, on time, and paid. Turns out that somebody is me — and I wouldn't have it any other way.”"
  - Remove the dashed "Now hiring" placeholder card

No home page changes (team grid only lives on About).

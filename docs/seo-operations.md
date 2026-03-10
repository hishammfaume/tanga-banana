# SEO Operations Checklist

## Before launch
- Set `NEXT_PUBLIC_SERVER_URL` to the live custom domain with no trailing slash.
- Confirm `robots.txt` and `sitemap.xml` resolve from the production domain and contain no `localhost` URLs.
- Verify the homepage, about, experiences, and contact pages render the correct canonical, title, description, and JSON-LD.
- Verify the phone numbers and business hours in `src/utilities/constants/common.tsx` are correct before publishing structured data that includes them.

## Search Console
- Add the live custom domain to Google Search Console.
- Submit `https://<your-domain>/sitemap.xml`.
- Inspect and request indexing for `/`, `/about`, `/experiences`, and `/contact`.
- Recheck coverage after the next crawl to confirm canonical selection and sitemap fetch success.

## Google Business Profile
- Align the business name, address, phone number, business hours, and website URL with the values shown on the site.
- Upload current farm, coffee, and visitor photos that match the on-site experience.
- Keep the primary category aligned with the business offer and add relevant secondary categories where appropriate.

## 30-day measurement loop
- Review Search Console weekly for impressions, clicks, CTR, and average position.
- Track branded vs non-branded queries for farm tours in Tanga, coffee tasting in Tanga, school visits, and cultural farm experiences.
- Compare which of the four optimized pages earns the strongest CTR and identify queries that do not yet have a dedicated page.
- Use contact form submissions and booking requests as the main conversion signal for organic traffic.

## Phase 2 trigger
- Create dedicated landing pages when Search Console shows repeated impressions or clicks for intents not fully served by the current four pages.
- Prioritize new pages for farm tours in Tanga, coffee tasting in Tanga, school trips, cultural tours, and Tanga attraction combination searches.

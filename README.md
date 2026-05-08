# ePoster Help Center — Custom Zendesk Guide Theme

A custom Zendesk Guide theme built on top of Copenhagen for the ePoster help center. Designed to match the ePoster product UI so customers experience a seamless transition between the app and support.

## Brand Tokens

| Token | Value | Usage |
|---|---|---|
| `eposter-500` | `#F19D11` | Primary brand orange |
| `eposter-400` | `#f5aa2a` | Hover state |
| `nav-dark` | `#1a1f2e` | Header/nav background |
| Font | Poppins | All text |
| Border radius | 8px | Cards, buttons, inputs |

## File Structure

```
eposter-zendesk-theme/
├── manifest.json          # Theme config, settings, version
├── style.css              # All custom styles
├── script.js              # Mobile nav, sidebar, interactions
├── README.md
├── templates/
│   ├── document_head.hbs  # Meta tags, font import, CSS
│   ├── header.hbs         # Dark nav bar
│   ├── footer.hbs         # Minimal footer
│   ├── home_page.hbs      # Hero + category grid
│   ├── category_page.hbs  # Section cards within a category
│   ├── section_page.hbs   # Article list within a section
│   ├── article_page.hbs   # Article with sidebar nav
│   ├── search_results.hbs # Search results page
│   ├── new_request_page.hbs
│   ├── request_page.hbs
│   ├── requests_page.hbs
│   ├── contributions_page.hbs
│   ├── community_post_page.hbs
│   ├── community_post_list_page.hbs
│   ├── community_topic_page.hbs
│   ├── user_profile_page.hbs
│   └── 404.hbs
└── assets/                # Optional logo, icons
```

## How to Upload to Zendesk

### Option 1: Upload as a ZIP (Recommended)

1. Zip the entire `eposter-zendesk-theme` folder.
2. In Zendesk Admin, go to **Guide > Customize design**.
3. Click **Add theme** in the sidebar.
4. Select **Import theme** and upload your ZIP file.
5. Click **Publish** when ready to go live.

### Option 2: Use the Zendesk CLI (ZCLI)

1. Install ZCLI: `npm install -g @zendesk/zcli`
2. Authenticate: `zcli login -i`
3. Preview locally: `zcli themes:preview` (from inside the theme folder)
4. Import: `zcli themes:import`
5. Publish from the Zendesk Guide admin panel.

### Option 3: GitHub Integration

1. Push this repo to GitHub.
2. In Zendesk Guide, go to **Customize design > Add theme > Add from GitHub**.
3. Authorize and select your repo.
4. Zendesk will sync changes from the `main` branch.

## Customization

Theme settings (colors, hero text) are configurable in Zendesk Guide's theme editor without editing code. The `manifest.json` defines these settings:

- **Brand color** — primary orange
- **Brand color hover** — lighter orange
- **Navigation background** — dark nav color
- **Text color** — primary text
- **Background color** — page background
- **Show hero banner** — toggle on/off
- **Hero title** — customize the heading text

## What's Styled

- Dark `#1a1f2e` header/nav matching the product
- Hero section with search bar (orange focus ring)
- White rounded cards for categories and sections
- Clean article pages with Poppins typography
- Sidebar navigation with orange active states
- Breadcrumb navigation
- Form inputs with orange focus states
- Primary (orange fill) and secondary (white outline) buttons
- Request/ticket tables with status badges
- Mobile responsive at 1024px, 768px, and 480px breakpoints
- Minimal dark footer

## Notes

- The theme uses Google Fonts (Poppins) loaded via CSS import.
- All colors reference CSS custom properties for easy global changes.
- The `{{asset}}` Handlebars helper loads `style.css` and `script.js`.
- Zendesk helpers like `{{request_form}}` and `{{request_comment_form}}` render their built-in forms. The CSS styles these forms to match the theme.

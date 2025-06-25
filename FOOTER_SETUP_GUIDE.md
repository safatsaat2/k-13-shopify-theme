# SA Footer Setup Guide

## Overview
The SA Footer section is a fully dynamic Shopify footer that allows you to customize all content, including contact information, link lists, and social media icons with SVG support.

## Features
- ✅ Dynamic contact information with custom SVG icons
- ✅ Configurable link lists with menu integration
- ✅ Social media links with predefined icons or custom SVG
- ✅ License card with customizable text
- ✅ Responsive design
- ✅ Scroll to top functionality
- ✅ Customizable background color
- ✅ Logo upload support

## Setup Instructions

### 1. Add the Section to Your Theme
1. Go to your Shopify admin → Online Store → Themes
2. Click "Customize" on your active theme
3. Navigate to the page where you want to add the footer
4. Click "Add section" and select "SA Footer"

### 2. Configure Global Settings

#### Background Color
- Choose the background color for the footer
- Default: `#041D38` (dark blue)

#### Logo
- Upload your footer logo
- Recommended size: 100x40px
- If no logo is uploaded, a placeholder will be shown

#### Copyright Text
- Enter your copyright information
- Supports line breaks (use `\n` for new lines)
- Default includes sample legal information

#### License Card
- Toggle to show/hide the license card
- Customize the license text
- Default: "State license"

#### Social Links & Scroll Top
- Toggle to show/hide social media links
- Toggle to show/hide scroll to top button

### 3. Add Contact Information Blocks

1. Click "Add block" → "Contact Information"
2. Configure each contact item:
   - **Icon SVG Code**: Paste your SVG icon code
   - **Main Text**: Primary contact information (e.g., phone number)
   - **Sub Text**: Secondary information (e.g., "free in Russia")

#### Example SVG Icons for Contact Information

**Phone Icon:**
```svg
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 3a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V3zm2 0v14h12V3H4z" fill="currentColor"/>
  <path d="M8 15h4v2H8v-2z" fill="currentColor"/>
</svg>
```

**Email Icon:**
```svg
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" fill="currentColor"/>
  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" fill="currentColor"/>
</svg>
```

**Location Icon:**
```svg
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" fill="currentColor"/>
</svg>
```

### 4. Add Link List Blocks

1. Click "Add block" → "Link List"
2. Configure each link list:
   - **Title**: Section title (e.g., "School 'InternetUrok'")
   - **Menu**: Select a navigation menu from your theme

3. Create the corresponding menu in Shopify admin:
   - Go to Online Store → Navigation
   - Create a new menu or use existing one
   - Add menu items with appropriate links

### 5. Add Bottom Link List Blocks

1. Click "Add block" → "Bottom Link List"
2. Configure similar to regular link lists
3. These appear in the bottom section of the footer

### 6. Add Social Media Links

1. Click "Add block" → "Social Media Link"
2. Configure each social link:
   - **Social Media URL**: Your social media profile URL
   - **Social Platform**: Choose from predefined options or "Custom SVG"
   - **Custom Social Icon SVG Code**: Only used when "Custom SVG" is selected

#### Predefined Social Media Icons
The section includes built-in icons for:
- Facebook
- Twitter/X
- Instagram
- YouTube
- LinkedIn
- TikTok
- Telegram
- VKontakte

#### Custom SVG Icons
If you choose "Custom SVG", paste your SVG code. Example:

**Custom Icon:**
```svg
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="currentColor"/>
  <path d="M10 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" fill="currentColor"/>
</svg>
```

## SVG Icon Guidelines

### For Contact Icons:
- **Size**: 20x20px recommended
- **Color**: Use `fill="currentColor"` to inherit the background color
- **Style**: Simple, recognizable icons work best

### For Social Media Icons:
- **Size**: 20x20px recommended
- **Color**: Use `fill="currentColor"` for white color
- **Style**: Match the platform's official icon style

## Best Practices

1. **Contact Information**: Keep main text concise, use sub text for additional details
2. **Link Lists**: Organize related links together
3. **Social Media**: Use official platform URLs
4. **SVG Icons**: Use optimized SVG code for better performance
5. **Responsive Design**: Test on mobile devices

## Troubleshooting

### Icons Not Displaying
- Check that SVG code is valid
- Ensure `fill="currentColor"` is used for proper color inheritance
- Verify SVG has proper `width` and `height` attributes

### Links Not Working
- Verify menu items are properly configured in Shopify admin
- Check that social media URLs are correct
- Ensure menu is published and active

### Layout Issues
- Check responsive breakpoints
- Verify content fits within container
- Test on different screen sizes

## Customization Examples

### Custom Background Color
```css
/* In theme customizer, set background color to: */
#1a1a1a  /* Dark gray */
#2c3e50  /* Blue gray */
#34495e  /* Dark blue gray */
```

### Custom SVG Icon with Animation
```svg
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 2L12.09 8.26L20 9L12.09 9.74L10 16L7.91 9.74L0 9L7.91 8.26L10 2Z" fill="currentColor">
    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
  </path>
</svg>
```

## Support

For additional help or custom modifications, refer to:
- Shopify Liquid documentation
- SVG optimization tools
- Theme customization guides 
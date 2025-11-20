# Theme Documentation - Recruitment Platform

This document provides a comprehensive overview of all themes, styling, and design tokens used throughout the recruitment platform application.

## Table of Contents
1. [Ant Design Theme](#ant-design-theme)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Styling](#component-styling)
6. [Icons](#icons)
7. [Global CSS](#global-css)
8. [Custom Inline Styles](#custom-inline-styles)

---

## Ant Design Theme

### Version
- **Ant Design**: 5.29.1
- **Theme System**: Ant Design 5.x Design Tokens

### Current Configuration
The application uses Ant Design's default theme configuration via `ConfigProvider` in `app/layout.js`. No custom theme tokens are currently applied, meaning all components use Ant Design's default styling.

```jsx
// app/layout.js
<ConfigProvider>
  {children}
</ConfigProvider>
```

### Available Theme Tokens (Not Currently Customized)
Ant Design 5.x provides extensive theme customization through design tokens. The following tokens are available but currently use default values:

- **Color Tokens**: Primary, Success, Warning, Error, Info colors
- **Typography Tokens**: Font family, font sizes, line heights, font weights
- **Spacing Tokens**: Padding, margin, border radius
- **Component Tokens**: Individual component styling tokens

---

## Color Palette

### Primary Colors
- **Primary Blue**: `#1677ff` (Ant Design default primary color)
- **Background Gray**: `#f0f2f5` (used in login page and home page)
- **White**: `#ffffff` (card backgrounds, form backgrounds)

### Status Colors
- **Success/Green**: `#52c41a` (Ant Design default success color)
  - Used for: Accepted status tags, success messages
- **Warning/Orange**: `#faad14` (Ant Design default warning color)
  - Used for: Pending status tags
- **Error/Red**: `#ff4d4f` (Ant Design default error color)
  - Used for: Error messages, reject buttons, danger actions

### Semantic Colors
- **Info Blue**: `#1677ff` (Ant Design default info color)
- **Text Primary**: `#171717` (default text color)
- **Text Secondary**: `#8c8c8c` (secondary text, placeholders)

### Tag Colors
- **Pending Tag**: `orange` (maps to `#faad14`)
- **Accepted Tag**: `green` (maps to `#52c41a`)

### Dark Mode Support
The application includes dark mode CSS variables in `globals.css`:
- **Dark Background**: `#0a0a0a`
- **Dark Foreground**: `#ededed`

---

## Typography

### Font Families

#### Primary Fonts (Geist)
- **Geist Sans**: Variable font (GeistVF.woff)
  - Weight range: 100-900
  - CSS Variable: `--font-geist-sans`
  - Used for: Body text, UI elements

- **Geist Mono**: Variable font (GeistMonoVF.woff)
  - Weight range: 100-900
  - CSS Variable: `--font-geist-mono`
  - Used for: Monospace text (if needed)

#### Fallback Fonts
- **Arial, Helvetica, sans-serif**: Fallback in `globals.css`

### Font Sizes
Ant Design default typography scale:
- **Heading 1**: 38px
- **Heading 2**: 30px
- **Heading 3**: 24px
- **Heading 4**: 20px
- **Body**: 14px (default)
- **Small**: 12px

### Font Weights
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

---

## Spacing & Layout

### Container Spacing

#### Padding
- **Page Padding**: `40px` (CandidatePage)
- **Page Padding**: `24px` (RecruiterPage)
- **Page Padding**: `20px` (LoginPage)
- **Card Padding**: Default Ant Design card padding

#### Margins
- **Card Margin Bottom**: `40px` (CandidatePage)
- **Space Between Elements**: `large` (Ant Design Space component)

### Container Widths
- **Max Width (Candidate)**: `1200px`
- **Max Width (Success View)**: `800px`
- **Card Width (Login)**: `400px`
- **Modal Width (Details)**: `600px`

### Border Radius
- **Card Border Radius**: Default Ant Design (8px)
- **Button Border Radius**: Default Ant Design (6px)
- **Input Border Radius**: Default Ant Design (6px)

### Box Shadows
- **Card Shadow (Login)**: `0 4px 12px rgba(0,0,0,0.1)`
- **Card Shadow (Candidate)**: `0 4px 8px rgba(0,0,0,0.1)`

---

## Component Styling

### Buttons

#### Primary Button
- **Type**: `primary`
- **Color**: Ant Design primary blue (`#1677ff`)
- **Width**: `100%` (in forms)
- **States**: Default, hover, active, disabled

#### Default Button
- **Type**: `default`
- **Color**: Ant Design default gray
- **Usage**: Secondary actions, student mode button

#### Danger Button
- **Type**: `danger`
- **Color**: Ant Design error red (`#ff4d4f`)
- **Usage**: Remove/reject actions

#### Button Sizes
- **Default**: Medium
- **Small**: Used in list actions
- **Large**: Used in student mode button

### Forms

#### Form Layout
- **Layout**: `vertical` (all forms)
- **Label Position**: Top (vertical layout default)

#### Input Fields
- **Prefix Icons**: UserOutlined, LockOutlined
- **Placeholder Text**: Translated based on language
- **Validation**: Real-time validation with error messages

#### Date Picker
- **Component**: `DatePicker` from Ant Design
- **Usage**: Birth date field in candidate form

### Cards

#### Card Styling
- **Size**: `small` (CandidatePage title card)
- **Default**: Standard size (other cards)
- **Shadow**: Custom box-shadow for elevation
- **Title**: Centered text (LoginPage)

### Lists

#### Candidate List
- **Layout**: `horizontal`
- **Pagination**: 5 items per page
- **Show Size Changer**: Yes
- **Show Total**: Yes (with translation)

#### List Item Meta
- **Avatar**: Generated from DiceBear API
- **Title**: Candidate name + status tag
- **Description**: Email, grade, city

### Modals

#### Candidate Details Modal
- **Width**: `600px`
- **Footer**: Close button only
- **Content**: Vertical space layout with candidate information

### Tags

#### Status Tags
- **Pending**: Orange color (`orange`)
- **Accepted**: Green color (`green`)
- **Text**: Translated (EN/FR)

### Upload Component

#### CV Upload
- **Accept**: `.pdf,.doc,.docx`
- **Max Size**: 5MB
- **Validation**: File type and size validation
- **Icon**: UploadOutlined
- **Local Storage**: Uses `URL.createObjectURL()` for file preview

### Result Component

#### Success State
- **Icon**: SmileOutlined
- **Title**: Translated success message
- **Subtitle**: Translated follow-up message
- **Action**: Button to submit another application

### Float Button

#### Language Toggle
- **Icon**: GlobalOutlined
- **Shape**: `square`
- **Position**: `right: 24px`
- **Description**: Current language (EN/FR)
- **Tooltip**: Language switch hint

### Tooltip
- **Placement**: `left` (for float button)
- **Content**: Translated language switch message

### Messages/Notifications
- **Success**: Green notification
- **Error**: Red notification
- **Info**: Blue notification
- **Duration**: Default Ant Design duration

---

## Icons

All icons are from `@ant-design/icons` package (version 5.6.1).

### Icons Used by Page

#### LoginPage
- `UserOutlined` - Username input prefix
- `LockOutlined` - Password input prefix
- `TeamOutlined` - Student mode button
- `GlobalOutlined` - Language toggle

#### CandidatePage
- `UploadOutlined` - CV upload button
- `SmileOutlined` - Success result icon
- `GlobalOutlined` - Language toggle

#### RecruiterPage
- `EyeOutlined` - View details button
- `CheckOutlined` - Accept button
- `CloseOutlined` - Remove/reject button
- `FileTextOutlined` - CV file link
- `GlobalOutlined` - Language toggle

---

## Global CSS

### File: `app/globals.css`

#### CSS Variables
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

#### Base Styles
- **Box Sizing**: `border-box` (all elements)
- **Padding/Margin Reset**: `0` (all elements)
- **Max Width**: `100vw` (html, body)
- **Overflow**: `hidden` on x-axis
- **Font Smoothing**: Antialiased (WebKit and Mozilla)

#### Link Styles
- **Color**: Inherit from parent
- **Text Decoration**: None

#### Dark Mode
- **Color Scheme**: Dark (when system preference is dark)

---

## Custom Inline Styles

### LoginPage (`app/login/page.jsx`)

#### Container
```jsx
{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: '#f0f2f5',
  padding: '20px'
}
```

#### Card
```jsx
{
  width: 400,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
}
```

#### Title Div
```jsx
{
  textAlign: 'center'
}
```

### CandidatePage (`app/candidate/page.jsx`)

#### Main Container
```jsx
{
  padding: '40px',
  maxWidth: '1200px',
  margin: '0 auto',
  minHeight: '100vh'
}
```

#### Success View Container
```jsx
{
  padding: '40px',
  maxWidth: '800px',
  margin: '0 auto',
  minHeight: '100vh'
}
```

#### Card
```jsx
{
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
}
```

#### Space Container
```jsx
{
  display: 'flex',
  marginBottom: '40px'
}
```

#### Float Button
```jsx
{
  right: 24
}
```

### RecruiterPage (`app/recruiter/page.jsx`)

#### Main Container
```jsx
{
  padding: '24px'
}
```

#### Float Button
```jsx
{
  right: 24
}
```

### HomePage (`app/page.js`)

#### Container
```jsx
{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: '#f0f2f5'
}
```

#### Text Container
```jsx
{
  textAlign: 'center'
}
```

---

## Responsive Design

### Current Implementation
- **Fixed Widths**: Most containers use fixed max-widths
- **Padding**: Responsive padding on smaller screens (20px on login)
- **No Breakpoints**: Currently no media queries for responsive behavior

### Recommended Breakpoints (Not Currently Implemented)
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## Theme Customization Recommendations

### Potential Customizations

1. **Primary Color**: Customize to match brand identity
2. **Typography**: Adjust font sizes and weights
3. **Spacing**: Standardize spacing scale
4. **Border Radius**: Consistent border radius values
5. **Shadows**: Standardized elevation system
6. **Responsive**: Add breakpoints for mobile/tablet

### Example Custom Theme Configuration

```javascript
// theme/antd-theme.js (not currently used)
export const customTheme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 8,
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 6,
    },
    Card: {
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
  },
};
```

---

## Summary

### Current State
- Uses Ant Design default theme (no custom tokens)
- Custom inline styles for layout and spacing
- Consistent use of Ant Design components
- Multi-language support with translated UI text
- Dark mode CSS variables defined but not actively used

### Key Design Elements
- **Color Scheme**: Blue primary, green success, orange warning, red error
- **Typography**: Geist Sans variable font
- **Spacing**: 20px-40px padding, 24px-40px margins
- **Layout**: Centered containers with max-widths
- **Components**: Ant Design 5.x component library

### Files Referenced
- `app/globals.css` - Global styles and CSS variables
- `app/layout.js` - ConfigProvider setup
- `app/login/page.jsx` - Login page styles
- `app/candidate/page.jsx` - Candidate form styles
- `app/recruiter/page.jsx` - Recruiter dashboard styles
- `app/page.js` - Home page styles

---

**Last Updated**: 2024
**Ant Design Version**: 5.29.1
**Next.js Version**: 14.2.33


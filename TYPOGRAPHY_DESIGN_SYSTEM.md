# Typography Design System

## 📖 Overview

Dokumentasi ini menjelaskan sistem tipografi yang digunakan dalam aplikasi HRIS Mobile. Sistem ini dirancang untuk konsistensi visual dan readability yang optimal di berbagai platform.

---

## 🔤 Font Family

### Primary Font: Plus Jakarta Sans

**Plus Jakarta Sans** adalah font utama yang digunakan dalam seluruh aplikasi.

| Weight | Name | CSS/React Native Value | Figma Value |
|--------|------|------------------------|-------------|
| 300 | Light | `PlusJakartaSans-Light` | Plus Jakarta Sans Light |
| 400 | Regular | `PlusJakartaSans-Regular` | Plus Jakarta Sans Regular |
| 500 | Medium | `PlusJakartaSans-Medium` | Plus Jakarta Sans Medium |
| 600 | SemiBold | `PlusJakartaSans-SemiBold` | Plus Jakarta Sans SemiBold |
| 700 | Bold | `PlusJakartaSans-Bold` | Plus Jakarta Sans Bold |
| 800 | ExtraBold | `PlusJakartaSans-ExtraBold` | Plus Jakarta Sans ExtraBold |

### Font Source
- **Google Fonts URL**: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap`
- **Figma Font**: Plus Jakarta Sans (tersedia di Google Fonts plugin Figma)

---

## 📏 Font Sizes

### Mobile Typography Scale

| Token | Size (px) | Size (pt) | Use Case |
|-------|-----------|-----------|----------|
| `xs` | 11px | 8.25pt | Helper text, captions, error messages |
| `sm` | 13px | 9.75pt | Labels, secondary text, links |
| `base` | 15px | 11.25pt | Body text, input text, paragraphs |
| `lg` | 17px | 12.75pt | Subheadings, app name, emphasis |
| `xl` | 20px | 15pt | Section titles |
| `2xl` | 24px | 18pt | Card titles, stat values |
| `3xl` | 30px | 22.5pt | Main headings, page titles |

### Figma Setup
```
xs:   11px / Auto
sm:   13px / Auto
base: 15px / Auto
lg:   17px / Auto
xl:   20px / Auto
2xl:  24px / Auto
3xl:  30px / Auto
```

---

## 📐 Line Heights

| Token | Value | Multiplier | Use Case |
|-------|-------|------------|----------|
| `tight` | 1.2 | 120% | Headings, titles |
| `normal` | 1.5 | 150% | Body text, paragraphs |
| `relaxed` | 1.7 | 170% | Long-form content, descriptions |

### Figma Line Height Examples
| Font Size | Tight (1.2) | Normal (1.5) | Relaxed (1.7) |
|-----------|-------------|--------------|---------------|
| 11px (xs) | 13px | 17px | 19px |
| 13px (sm) | 16px | 20px | 22px |
| 15px (base) | 18px | 23px | 26px |
| 17px (lg) | 20px | 26px | 29px |
| 20px (xl) | 24px | 30px | 34px |
| 24px (2xl) | 29px | 36px | 41px |
| 30px (3xl) | 36px | 45px | 51px |

---

## 📝 Letter Spacing

| Token | Value | Use Case |
|-------|-------|----------|
| `tight` | -0.5px | Large headings (3xl, 2xl) |
| `normal` | 0px | Body text, general content |
| `wide` | 0.5px | Labels, buttons, uppercase text |

---

## 🎨 Typography Styles (Preset)

### Headings

#### Display / Page Title
```
Font: Plus Jakarta Sans Bold
Size: 30px (3xl)
Line Height: 36px (tight)
Letter Spacing: -0.5px
Color: #18181b (light) / #fafafa (dark)
```

#### Section Title
```
Font: Plus Jakarta Sans Bold
Size: 24px (2xl)
Line Height: 29px (tight)
Letter Spacing: -0.5px
Color: #18181b (light) / #fafafa (dark)
```

#### Subsection Title
```
Font: Plus Jakarta Sans SemiBold
Size: 20px (xl)
Line Height: 24px (tight)
Letter Spacing: 0px
Color: #18181b (light) / #fafafa (dark)
```

#### Card Title
```
Font: Plus Jakarta Sans SemiBold
Size: 17px (lg)
Line Height: 20px (tight)
Letter Spacing: 0px
Color: #18181b (light) / #fafafa (dark)
```

### Body Text

#### Body Large
```
Font: Plus Jakarta Sans Regular
Size: 17px (lg)
Line Height: 26px (normal)
Letter Spacing: 0px
Color: #18181b (light) / #fafafa (dark)
```

#### Body Default
```
Font: Plus Jakarta Sans Regular
Size: 15px (base)
Line Height: 23px (normal)
Letter Spacing: 0px
Color: #18181b (light) / #fafafa (dark)
```

#### Body Small
```
Font: Plus Jakarta Sans Regular
Size: 13px (sm)
Line Height: 20px (normal)
Letter Spacing: 0px
Color: #71717a (light) / #a1a1aa (dark)
```

### Labels & UI Elements

#### Button Text
```
Font: Plus Jakarta Sans SemiBold
Size: 15px (base)
Line Height: 18px (tight)
Letter Spacing: 0.5px
Color: Varies by button type
```

#### Input Label
```
Font: Plus Jakarta Sans Medium
Size: 13px (sm)
Line Height: 16px (tight)
Letter Spacing: 0px
Color: #18181b (light) / #fafafa (dark)
```

#### Input Text
```
Font: Plus Jakarta Sans Regular
Size: 15px (base)
Line Height: 23px (normal)
Letter Spacing: 0px
Color: #18181b (light) / #fafafa (dark)
```

#### Helper Text / Caption
```
Font: Plus Jakarta Sans Regular
Size: 11px (xs)
Line Height: 17px (normal)
Letter Spacing: 0px
Color: #71717a (light) / #a1a1aa (dark)
```

#### Error Text
```
Font: Plus Jakarta Sans Regular
Size: 11px (xs)
Line Height: 17px (normal)
Letter Spacing: 0px
Color: #ef4444
```

#### Navigation Tab Label
```
Font: Plus Jakarta Sans Medium
Size: 11px (xs)
Line Height: 13px (tight)
Letter Spacing: 0px
Color: #71717a (inactive) / #a3e635 (active)
```

---

## 🎯 Usage Guidelines

### Font Weight Usage

| Weight | Token | Primary Use Cases |
|--------|-------|-------------------|
| 700 | `bold` | Page titles, main headings, emphasis, stat values |
| 600 | `semiBold` | App name, button text, card titles, subheadings |
| 500 | `medium` | Input labels, navigation items, links |
| 400 | `regular` | Body text, paragraphs, input values, descriptions |

### Hierarchy Examples

```
┌─────────────────────────────────────┐
│ Dashboard                           │ ← Bold 30px (3xl)
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Attendance                      │ │ ← SemiBold 17px (lg)
│ │ 08:30 AM                        │ │ ← Bold 24px (2xl)
│ │ On Time                         │ │ ← Regular 13px (sm)
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Recent Activity                 │ │ ← SemiBold 17px (lg)
│ │                                 │ │
│ │ Meeting with HR                 │ │ ← Medium 15px (base)
│ │ Today, 10:00 AM                 │ │ ← Regular 13px (sm)
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 📱 Figma Component Setup

### Text Styles to Create

1. **Display/Title**
   - Name: `Display/Title`
   - Font: Plus Jakarta Sans Bold, 30px, Line Height 36px

2. **Heading/H1**
   - Name: `Heading/H1`
   - Font: Plus Jakarta Sans Bold, 24px, Line Height 29px

3. **Heading/H2**
   - Name: `Heading/H2`
   - Font: Plus Jakarta Sans SemiBold, 20px, Line Height 24px

4. **Heading/H3**
   - Name: `Heading/H3`
   - Font: Plus Jakarta Sans SemiBold, 17px, Line Height 20px

5. **Body/Large**
   - Name: `Body/Large`
   - Font: Plus Jakarta Sans Regular, 17px, Line Height 26px

6. **Body/Default**
   - Name: `Body/Default`
   - Font: Plus Jakarta Sans Regular, 15px, Line Height 23px

7. **Body/Small**
   - Name: `Body/Small`
   - Font: Plus Jakarta Sans Regular, 13px, Line Height 20px

8. **Label/Default**
   - Name: `Label/Default`
   - Font: Plus Jakarta Sans Medium, 13px, Line Height 16px

9. **Label/Small**
   - Name: `Label/Small`
   - Font: Plus Jakarta Sans Medium, 11px, Line Height 13px

10. **Button/Default**
    - Name: `Button/Default`
    - Font: Plus Jakarta Sans SemiBold, 15px, Line Height 18px

11. **Caption/Default**
    - Name: `Caption/Default`
    - Font: Plus Jakarta Sans Regular, 11px, Line Height 17px

---

## 🔧 Implementation Reference

### CSS (Web)
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

:root {
  --font-family: 'Plus Jakarta Sans', sans-serif;
  
  /* Font Sizes */
  --font-size-xs: 11px;
  --font-size-sm: 13px;
  --font-size-base: 15px;
  --font-size-lg: 17px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  
  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;
  
  /* Letter Spacing */
  --letter-spacing-tight: -0.5px;
  --letter-spacing-normal: 0px;
  --letter-spacing-wide: 0.5px;
}
```

### React Native
```typescript
export const typography = {
  family: {
    regular: 'PlusJakartaSans-Regular',
    medium: 'PlusJakartaSans-Medium',
    semiBold: 'PlusJakartaSans-SemiBold',
    bold: 'PlusJakartaSans-Bold',
  },
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};
```

---

## 📋 Checklist for Figma Setup

- [ ] Install Plus Jakarta Sans font (from Google Fonts)
- [ ] Create Local Styles for all typography presets
- [ ] Create Text Components for reusable text patterns
- [ ] Set up Light/Dark mode variants
- [ ] Document color pairings in component library

---

## 🎨 Color Pairing Reference

| Text Type | Light Mode | Dark Mode |
|-----------|------------|-----------|
| Primary Text | `#18181b` (zinc-900) | `#fafafa` (zinc-50) |
| Secondary Text | `#71717a` (zinc-500) | `#a1a1aa` (zinc-400) |
| Tertiary Text | `#a1a1aa` (zinc-400) | `#71717a` (zinc-500) |
| Error Text | `#ef4444` (red-500) | `#ef4444` (red-500) |
| Success Text | `#a3e635` (lime-400) | `#a3e635` (lime-400) |
| Link Text | `#60a5fa` (blue-400) | `#60a5fa` (blue-400) |

---

*Last updated: January 25, 2026*
*Version: 1.0*

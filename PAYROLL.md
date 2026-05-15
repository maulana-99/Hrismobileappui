# Payslip Detail Screen — Design Specification

> Referensi gambar: Payslip Summary screen dengan donut chart, earning details, dan pagination dots.
> Semua token mengacu pada design system yang sudah ada di `mobile.css` dan `tokens.ts`.

---

## 1. App Bar

### 1.1 Back Button
| Property | Value | Token |
|----------|-------|-------|
| Size | 44×44px | `--min-touch-target` |
| Border Radius | 12px | `--radius-md` |
| Border | 1px solid | `--border-light` / `--border-dark` |
| Background | `#ffffff` / `#18181b` | `--surface-light` / `--surface-dark` |
| Icon | `←` arrow, 20px | `--text-xl` |
| Icon Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |

### 1.2 Screen Title
| Property | Value | Token |
|----------|-------|-------|
| Font | Plus Jakarta Sans SemiBold | `--font-semibold`, weight 600 |
| Size | 17px | `--text-lg` |
| Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |
| Position | Center of app bar row | — |

### 1.3 More Options Button (⋮)
| Property | Value | Token |
|----------|-------|-------|
| Size | 44×44px | `--min-touch-target` |
| Border Radius | 12px | `--radius-md` |
| Border | 1px solid | `--border-light` / `--border-dark` |
| Background | `#ffffff` / `#18181b` | `--surface-light` / `--surface-dark` |
| Icon | Vertical dots, 20px | — |
| Icon Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |

### Layout
```
┌─────────────────────────────────────────┐
│  [←]     Payslip Summary          [⋮]  │
│  44px         center              44px  │
└─────────────────────────────────────────┘
  padding: 16px 24px (--space-md --space-lg)
  height: 56px (--header-height)
  flex-direction: row
  align-items: center
  justify-content: space-between
```

---

## 2. Payslip Summary Card (Donut Chart Section)

### 2.1 Description Text
| Property | Value | Token |
|----------|-------|-------|
| Font | Plus Jakarta Sans Regular | `--font-regular`, weight 400 |
| Size | 15px | `--text-base` |
| Color | `#71717a` / `#a1a1aa` | `--text-secondary-light` / `--text-secondary-dark` |
| Text | "You have earned gross pay of **June** month" | — |
| Bold Word | Plus Jakarta Sans Bold, `#18181b` | `--font-bold`, `--text-primary-light` |
| Alignment | center | — |
| Margin Top | 24px | `--space-lg` |

### 2.2 Donut Chart
| Property | Value | Token/Note |
|----------|-------|------------|
| Outer Diameter | 200px | Custom |
| Inner Diameter | 140px | Custom (stroke width ~30px) |
| Earnings Arc Color | `#5B4CC4` (Indigo/Violet) | Closest: `--status-completed` (#a78bfa) or custom `#5B4CC4` |
| Deductions Arc Color | `#F5C542` (Golden Yellow) | Closest: `--color-warning` (#fbbf24) or custom `#F5C542` |
| Background Ring | `#e4e4e7` | `--border-light` |
| Container | centered, padding 32px | `--space-xl` |

### 2.3 Donut Chart Center Text
| Property | Value | Token |
|----------|-------|-------|
| Currency Symbol + Amount | "₹82,500" | — |
| Font | Plus Jakarta Sans Bold | `--font-bold`, weight 700 |
| Size | 30px | `--text-3xl` |
| Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |
| Sub Label | "Gross Pay" | — |
| Sub Label Font | Plus Jakarta Sans Regular | `--font-regular`, weight 400 |
| Sub Label Size | 13px | `--text-sm` |
| Sub Label Color | `#a1a1aa` | `--text-tertiary-light` |

### 2.4 Legend Items
```
┌───────────────────────────────────────┐
│  ● ₹ 70,000.00       ● ₹ 12,500.00  │
│    Earnings              Deductions   │
└───────────────────────────────────────┘
```

| Property | Value | Token |
|----------|-------|-------|
| Layout | flex-direction: row, justify-content: center, gap: 32px | `--space-xl` |
| Dot Size | 10×10px, border-radius: full | `--radius-full` |
| Earnings Dot Color | `#5B4CC4` (Indigo/Violet) | Custom / `--status-completed` |
| Deductions Dot Color | `#F5C542` (Golden Yellow) | Custom / `--color-warning` |
| Amount Font | Plus Jakarta Sans SemiBold | `--font-semibold`, weight 600 |
| Amount Size | 15px | `--text-base` |
| Amount Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |
| Label Font | Plus Jakarta Sans Regular | `--font-regular`, weight 400 |
| Label Size | 13px | `--text-sm` |
| Label Color | `#71717a` / `#a1a1aa` | `--text-secondary-light` / `--text-secondary-dark` |
| Margin Top | 24px | `--space-lg` |

### Card Container
| Property | Value | Token |
|----------|-------|-------|
| Background | `#ffffff` / `#18181b` | `--surface-light` / `--surface-dark` |
| Border Radius | 20px | `--radius-xl` |
| Padding | 24px | `--space-lg` |
| Shadow | `0 2px 4px rgba(0,0,0,0.1)` | card-elevated shadow |
| Margin | 0 24px | `--space-lg` horizontal |

---

## 3. Period Filter Section

### 3.1 Section Title
| Property | Value | Token |
|----------|-------|-------|
| Font | Plus Jakarta Sans SemiBold | `--font-semibold`, weight 600 |
| Size | 15px | `--text-base` |
| Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |
| Margin Bottom | 16px | `--space-md` |

### 3.2 Year Selector Dropdown
| Property | Value | Token |
|----------|-------|-------|
| Height | 48px | `--input-height` |
| Background | `#f4f4f5` / `rgba(39,39,42,0.5)` | `--surface-secondary-light` / `--surface-secondary-dark` |
| Border | 1px solid | `--border-light` / `--border-dark` |
| Border Radius | 16px | `--radius-lg` |
| Padding | 0 16px | `--space-md` |
| Font | Plus Jakarta Sans Medium | `--font-medium`, weight 500 |
| Size | 15px | `--text-base` |
| Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |
| Chevron Icon | 16px, right aligned | — |
| Margin Bottom | 16px | `--space-md` |

### 3.3 Month Tabs Selector
| Property | Value | Token |
|----------|-------|-------|
| Layout | flex-direction: row, overflow-x: auto, gap: 8px | `--space-sm` |
| Scroll | horizontal, hide scrollbar | `-webkit-overflow-scrolling: touch` |

#### Active Month Item
| Property | Value | Token |
|----------|-------|-------|
| Background | `#a3e635` | `--color-primary` |
| Text Color | `#18181b` | `--text-primary-light` |
| Font | Plus Jakarta Sans SemiBold | `--font-semibold`, weight 600 |
| Size | 13px | `--text-sm` |
| Padding | 8px 16px | `--space-sm` `--space-md` |
| Border Radius | 9999px | `--radius-full` |
| Min Width | fit-content | — |

#### Inactive Month Item
| Property | Value | Token |
|----------|-------|-------|
| Background | transparent | — |
| Border | 1px solid | `--border-light` / `--border-dark` |
| Text Color | `#71717a` / `#a1a1aa` | `--text-secondary-light` / `--text-secondary-dark` |
| Font | Plus Jakarta Sans Medium | `--font-medium`, weight 500 |
| Size | 13px | `--text-sm` |
| Padding | 8px 16px | `--space-sm` `--space-md` |
| Border Radius | 9999px | `--radius-full` |
| Min Width | fit-content | — |

---

## 4. Salary Breakdown Card

### Card Container
| Property | Value | Token |
|----------|-------|-------|
| Background | `#ffffff` / `#18181b` | `--surface-light` / `--surface-dark` |
| Border Radius | 20px | `--radius-xl` |
| Padding | 24px | `--space-lg` |
| Shadow | `0 2px 4px rgba(0,0,0,0.1)` | card-elevated shadow |
| Margin | 0 24px | `--space-lg` horizontal |

### Section Header (e.g. "Earning Details")
| Property | Value | Token |
|----------|-------|-------|
| Font | Plus Jakarta Sans SemiBold | `--font-semibold`, weight 600 |
| Size | 17px | `--text-lg` |
| Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |
| Margin Bottom | 16px | `--space-md` |
| Layout | flex-direction: row, align-items: center | — |

### 4.1 Income Section

#### Section Label
| Property | Value | Token |
|----------|-------|-------|
| Text | "Earning Details" | — |
| Font | Plus Jakarta Sans SemiBold | `--font-semibold`, weight 600 |
| Size | 17px | `--text-lg` |
| Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |

#### Salary Item Row
```
┌───────────────────────────────────────┐
│  Basic Pay                 ₹ 30,000.00│
│  HRA                      ₹ 15,000.00│
│  Other Allowance           ₹ 10,000.00│
│  SPL Allowance             ₹ 15,000.00│
├───────────────────────────────────────┤
│  Total Earnings            ₹ 70,000.00│  ← brand color
└───────────────────────────────────────┘
```

| Property | Value | Token |
|----------|-------|-------|
| Container | border: 1px solid, border-radius: 16px | `--border-light`, `--radius-lg` |
| Row Padding | 16px | `--space-md` |
| Row Divider | 1px solid `--border-light` (between rows) | — |
| Item Label Font | Plus Jakarta Sans Regular | `--font-regular`, weight 400 |
| Item Label Size | 15px | `--text-base` |
| Item Label Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |
| Item Amount Font | Plus Jakarta Sans SemiBold | `--font-semibold`, weight 600 |
| Item Amount Size | 15px | `--text-base` |
| Item Amount Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |
| Layout per Row | flex-direction: row, justify-content: space-between, align-items: center | — |

#### Total Income Row
| Property | Value | Token |
|----------|-------|-------|
| Label Font | Plus Jakarta Sans Bold | `--font-bold`, weight 700 |
| Label Size | 15px | `--text-base` |
| Label Color | `#5B4CC4` (Indigo/Violet) | Custom payroll accent |
| Amount Font | Plus Jakarta Sans Bold | `--font-bold`, weight 700 |
| Amount Size | 15px | `--text-base` |
| Amount Color | `#5B4CC4` (Indigo/Violet) | Custom payroll accent |
| Border Top | 1px solid `--border-light` | — |
| Background | subtle highlight or same as container | — |

### 4.2 Deduction Section

#### Section Label
| Property | Value | Token |
|----------|-------|-------|
| Text | "Deduction Details" | — |
| Same style as Income Section Label | — | — |

#### Deduction Item Row
| Property | Value | Token |
|----------|-------|-------|
| Same structure as Salary Item Row | — | — |
| Amount Color | `#ef4444` (red) for deductions | `--color-error` |

#### Total Deduction Row
| Property | Value | Token |
|----------|-------|-------|
| Label + Amount Color | `#F5C542` (Golden Yellow) | Custom payroll accent |
| Same structure as Total Income Row | — | — |

### 4.3 BPJS Contribution Section

#### Section Label
| Property | Value | Token |
|----------|-------|-------|
| Text | "BPJS Contributions" | — |
| Same style as Section Label | — | — |

#### Sub-section Headers (Employee / Employer)
| Property | Value | Token |
|----------|-------|-------|
| Font | Plus Jakarta Sans Medium | `--font-medium`, weight 500 |
| Size | 13px | `--text-sm` |
| Color | `#71717a` / `#a1a1aa` | `--text-secondary-light` / `--text-secondary-dark` |
| Text Transform | uppercase | — |
| Letter Spacing | 0.5px | `--letter-spacing-wide` |
| Margin | 16px 0 8px | `--space-md` top, `--space-sm` bottom |

#### Contribution Items
| Property | Value | Token |
|----------|-------|-------|
| Same structure as Salary Item Row | — | — |

### 4.4 Attendance & Prorate Section

#### Section Label
| Property | Value | Token |
|----------|-------|-------|
| Same style as Section Label | — | — |

#### Info Row (Working Days / Prorate %)
| Property | Value | Token |
|----------|-------|-------|
| Layout | flex-direction: row, justify-content: space-between | — |
| Label Font | Plus Jakarta Sans Regular | `--font-regular`, weight 400 |
| Label Size | 15px | `--text-base` |
| Label Color | `#71717a` | `--text-secondary-light` |
| Value Font | Plus Jakarta Sans SemiBold | `--font-semibold`, weight 600 |
| Value Size | 15px | `--text-base` |
| Value Color | `#18181b` | `--text-primary-light` |
| Row Padding | 12px 0 | custom |
| Divider | 1px solid `--border-light` | — |

---

## 5. Net & Gross Summary Card

### Card Container
| Property | Value | Token |
|----------|-------|-------|
| Background | `#ffffff` / `#18181b` | `--surface-light` / `--surface-dark` |
| Border Radius | 20px | `--radius-xl` |
| Padding | 24px | `--space-lg` |
| Shadow | `0 2px 4px rgba(0,0,0,0.1)` | card-elevated shadow |

### Card Header Row
```
┌───────────────────────────────────────┐
│  Summary               [June 2024]   │
└───────────────────────────────────────┘
```

| Property | Value | Token |
|----------|-------|-------|
| Title Font | Plus Jakarta Sans SemiBold | `--font-semibold`, weight 600 |
| Title Size | 17px | `--text-lg` |
| Title Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |
| Layout | flex-direction: row, justify-content: space-between, align-items: center | — |

#### Selected Period Badge
| Property | Value | Token |
|----------|-------|-------|
| Background | `rgba(163, 230, 53, 0.1)` | `--color-primary` with 10% opacity |
| Text Color | `#84cc16` | `--color-primary-dark` |
| Font | Plus Jakarta Sans Medium | `--font-medium`, weight 500 |
| Size | 11px | `--text-xs` |
| Padding | 4px 12px | `--space-xs` vertical, custom horizontal |
| Border Radius | 9999px | `--radius-full` |

### 5.1 Net Salary Box
| Property | Value | Token |
|----------|-------|-------|
| Background | `#f4f4f5` / `rgba(39,39,42,0.5)` | `--surface-secondary-light` / `--surface-secondary-dark` |
| Border Radius | 16px | `--radius-lg` |
| Padding | 16px | `--space-md` |
| Margin Top | 16px | `--space-md` |

| Element | Style |
|---------|-------|
| Label "Net Salary" | Regular 13px `--text-sm`, color `--text-secondary-light` |
| Amount "₹57,500" | Bold 24px `--text-2xl`, color `--text-primary-light` |
| Status Text "After all deductions" | Regular 11px `--text-xs`, color `--text-tertiary-light` |

### 5.2 Gross Salary Box
| Property | Value | Token |
|----------|-------|-------|
| Background | `#f4f4f5` / `rgba(39,39,42,0.5)` | `--surface-secondary-light` / `--surface-secondary-dark` |
| Border Radius | 16px | `--radius-lg` |
| Padding | 16px | `--space-md` |
| Margin Top | 8px | `--space-sm` |

| Element | Style |
|---------|-------|
| Label "Gross Salary" | Regular 13px `--text-sm`, color `--text-secondary-light` |
| Amount "₹82,500" | Bold 24px `--text-2xl`, color `--text-primary-light` |
| Description "Before deductions" | Regular 11px `--text-xs`, color `--text-tertiary-light` |

### 5.3 Download Slip Button
| Property | Value | Token |
|----------|-------|-------|
| Background | `#a3e635` | `--color-primary` |
| Text Color | `#18181b` | dark text on lime |
| Font | Plus Jakarta Sans SemiBold | `--font-semibold`, weight 600 |
| Size | 15px | `--text-base` |
| Letter Spacing | 0.5px | `--letter-spacing-wide` |
| Height | 48px | `--min-touch-target` / `--input-height` |
| Border Radius | 16px | `--radius-lg` |
| Padding | 16px 24px | `--space-md` `--space-lg` |
| Width | 100% | full width |
| Margin Top | 16px | `--space-md` |
| Icon | Download ↓ icon, 20px, left of text | — |

---

## 6. Pagination Dots (Swipeable Indicator)

| Property | Value | Token |
|----------|-------|-------|
| Layout | flex-direction: row, justify-content: center, gap: 8px | `--space-sm` |
| Active Dot Size | 8×8px | — |
| Active Dot Color | `#18181b` / `#fafafa` | `--text-primary-light` / `--text-primary-dark` |
| Active Dot Radius | 9999px | `--radius-full` |
| Inactive Dot Size | 8×8px | — |
| Inactive Dot Color | `#d4d4d8` | `--neutral-300` |
| Inactive Dot Radius | 9999px | `--radius-full` |
| Margin Top | 24px | `--space-lg` |
| Margin Bottom | 16px | `--space-md` |

---

## 7. Full Screen Layout

```
┌─────────────────────────────────────────┐
│  APP BAR (56px)                         │
│  [←]    Payslip Summary           [⋮]  │
├─────────────────────────────────────────┤
│                                         │
│  SCROLL VIEW                            │
│  ┌─────────────────────────────────┐    │
│  │  Description Text (center)      │    │
│  │                                 │    │
│  │       ┌─────────────┐          │    │
│  │       │  Donut Chart │          │    │
│  │       │   ₹82,500   │          │    │
│  │       │  Gross Pay   │          │    │
│  │       └─────────────┘          │    │
│  │                                 │    │
│  │  ● Earnings    ● Deductions    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  Earning Details                │    │
│  │  ┌─────────────────────────┐   │    │
│  │  │ Basic Pay     ₹30,000  │   │    │
│  │  │ HRA           ₹15,000  │   │    │
│  │  │ Other Allow.  ₹10,000  │   │    │
│  │  │ SPL Allow.    ₹15,000  │   │    │
│  │  ├─────────────────────────┤   │    │
│  │  │ Total         ₹70,000  │   │    │
│  │  └─────────────────────────┘   │    │
│  └─────────────────────────────────┘    │
│                                         │
│          ●  ○  (pagination dots)        │
│                                         │
└─────────────────────────────────────────┘
  Background: --bg-light (#fafafa)
  Padding horizontal: 24px (--space-lg)
  Gap between sections: 24px (--space-lg)
```

---

## 8. Reusable Components Summary

| Component | Description | Existing? |
|-----------|-------------|-----------|
| **Card Container** | Rounded card with elevation/outlined/filled variants | ✅ `Card.tsx` |
| **Section Header** | Title row with optional icon | ✅ `.section-header` |
| **Info Row** | Label-value horizontal pair | 🆕 New |
| **Amount Row** | Label + currency amount with optional color | 🆕 New |
| **Badge** | Pill-shaped label (period, status) | ✅ `.status-badge` (extend) |
| **Tab Button** | Pill-shaped toggle (active/inactive month) | 🆕 New |
| **Primary Button** | Full-width CTA button | ✅ `Button.tsx` |
| **Icon Button** | Square icon-only button (back, more) | ✅ `.header-action` |
| **Divider** | 1px horizontal line | 🆕 New (simple `<hr>`) |
| **Scroll Container** | Vertical scroll with hidden scrollbar | ✅ `.scroll-view` |
| **Donut Chart** | SVG-based ring chart with center text | 🆕 New |
| **Legend Item** | Colored dot + label + amount | 🆕 New |
| **Pagination Dots** | Dot indicators for swipeable views | 🆕 New |

---

## 9. Color Palette — Payroll Specific

| Name | Hex | Usage |
|------|-----|-------|
| Earnings (Indigo/Violet) | `#5B4CC4` | Donut arc, total earnings text |
| Deductions (Golden Yellow) | `#F5C542` | Donut arc, total deductions text |
| Brand Primary (Lime) | `#a3e635` | Active tabs, CTA button, badges |
| Error (Red) | `#ef4444` | Deduction amounts (optional) |
| Surface | `#ffffff` / `#18181b` | Card backgrounds |
| Background | `#fafafa` / `#0a0a0a` | Screen background |

---

## 10. Spacing Reference

| Area | Value | Token |
|------|-------|-------|
| Screen horizontal padding | 24px | `--space-lg` |
| Section gap (vertical) | 24px | `--space-lg` |
| Card internal padding | 24px | `--space-lg` |
| Row internal padding | 16px | `--space-md` |
| Small gaps (dots, items) | 8px | `--space-sm` |
| Micro gaps (label to value) | 4px | `--space-xs` |
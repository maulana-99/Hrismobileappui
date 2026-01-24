# HRIS Color System Documentation

## Overview
Sistem warna aplikasi HRIS menggunakan CSS Variables untuk konsistensi dan mudah maintenance. Semua warna sudah didefinisikan di `/src/styles/theme.css`.

## Brand Colors
Warna utama brand aplikasi HRIS:

```css
/* Primary Brand - Lime Green */
bg-[--color-brand-primary]      /* #a3e635 - lime-400 */
text-[--color-brand-primary]

/* Secondary Brand - Emerald */
bg-[--color-brand-secondary]    /* #34d399 - emerald-400 */
text-[--color-brand-secondary]

/* Tertiary Brand - Blue */
bg-[--color-brand-tertiary]     /* #60a5fa - blue-400 */
text-[--color-brand-tertiary]
```

## Status Colors
Warna untuk berbagai status dan states:

```css
/* Success State */
bg-[--color-status-success]     /* #34d399 - emerald-400 */
text-[--color-status-success]

/* Warning State */
bg-[--color-status-warning]     /* #fb923c - orange-400 */
text-[--color-status-warning]

/* Error State */
bg-[--color-status-error]       /* #f87171 - red-400 */
text-[--color-status-error]

/* Info State */
bg-[--color-status-info]        /* #60a5fa - blue-400 */
text-[--color-status-info]

/* Working State (Clock In) */
bg-[--color-status-working]     /* #06b6d4 - cyan-400 */
text-[--color-status-working]

/* Completed State (Clock Out) */
bg-[--color-status-completed]   /* #a78bfa - violet-400 */
text-[--color-status-completed]
```

## Neutral Colors
Warna netral untuk backgrounds, borders, dan text:

```css
/* Light Grays */
bg-[--color-neutral-50]         /* #fafafa - Soft white (background utama) */
bg-[--color-neutral-100]        /* #f4f4f5 */
bg-[--color-neutral-200]        /* #e4e4e7 */
bg-[--color-neutral-300]        /* #d4d4d8 */

/* Mid Grays */
bg-[--color-neutral-400]        /* #a1a1aa */
bg-[--color-neutral-500]        /* #71717a */
bg-[--color-neutral-600]        /* #52525b */

/* Dark Grays */
bg-[--color-neutral-700]        /* #3f3f46 */
bg-[--color-neutral-800]        /* #27272a */
bg-[--color-neutral-900]        /* #18181b */
bg-[--color-neutral-950]        /* #09090b */
```

## Usage Examples

### Button dengan Brand Primary
```tsx
<button className="bg-[--color-brand-primary] text-[--color-neutral-900] hover:brightness-110">
  Clock In
</button>
```

### Card Background
```tsx
<div className="bg-[--color-neutral-50] dark:bg-[--color-neutral-900] border border-[--color-neutral-200] dark:border-[--color-neutral-800]">
  Card content
</div>
```

### Status Badge
```tsx
<div className="bg-[--color-status-success] text-white">
  Approved
</div>
```

### Gradient dengan Brand Colors
```tsx
<div className="bg-gradient-to-br from-[--color-brand-primary] to-[--color-brand-secondary]">
  Gradient background
</div>
```

## Migration Guide

### Before (Hardcoded)
```tsx
className="bg-lime-400 text-zinc-900"
```

### After (CSS Variables)
```tsx
className="bg-[--color-brand-primary] text-[--color-neutral-900]"
```

### Before (Dark Mode)
```tsx
className="bg-zinc-50 dark:bg-zinc-900"
```

### After (CSS Variables)
```tsx
className="bg-[--color-neutral-50] dark:bg-[--color-neutral-900]"
```

## Notes
- Semua variabel sudah support dark mode otomatis
- Variabel `--color-neutral-50` dan `--color-neutral-900` akan di-invert di dark mode
- Background utama aplikasi menggunakan `--color-neutral-50` (#fafafa) untuk mengurangi eye strain
- Shadow colors bisa pakai opacity: `shadow-[--color-brand-primary]/20`

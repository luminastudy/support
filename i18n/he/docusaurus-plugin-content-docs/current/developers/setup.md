---
sidebar_position: 1
---

# הגדרת מפתחים

התחל בפיתוח עבור פלטפורמת Lumina Study.

## דרישות קדם

לפני שאתה מתחיל, ודא שיש לך:

- **Node.js** >=18.0.0 (השתמש ב-`.nvmrc` לניהול גרסאות)
- **pnpm** >=10.0.0 (נאכף בקפדנות - npm/yarn חסומים)
- **Docker & Docker Compose** (למסד נתונים מקומי)
- **Git** לבקרת גרסאות

### התקנת pnpm

```bash
# התקן את pnpm גלובלית
npm install -g pnpm

# או השתמש ב-corepack (מומלץ)
corepack enable
corepack prepare pnpm@10 --activate
```

## מבנה הפרויקט

Lumina Study היא **monorepo פוליגלוט** המכילה:

- **אפליקציות** - לקוח, פלטפורמת קורסים, אתר תמיכה
- **ספריות** - חבילות npm מפורסמות (סקופ @lumina-study)
- **כלים** - תוסף VS Code, כלי עזר
- **תוכן** - חבילות קורס

## התחלה מהירה

### 1. שכפול המאגר

```bash
git clone <repository-url>
cd luminastudy
```

### 2. התקנת תלויות

```bash
# התקן את כל התלויות בכל החבילות
pnpm install
```

### 3. בחר את המיקוד שלך

#### פלטפורמת הסטודנט (Client)

```bash
cd client
pnpm dev  # הפעל ב-http://localhost:5173
```

#### פלטפורמת קורסים

```bash
cd courses

# הפעל תשתית
pnpm docker:up       # PostgreSQL + Redis

# הרץ מיגרציות
pnpm db:migrate

# הפעל את כל השירותים
pnpm dev
# - Frontend: http://localhost:3000
# - Backend: http://localhost:3001
# - API Docs: http://localhost:3001/api
```

#### ספריית Blocks Graph

```bash
cd blocks-graph
pnpm build
pnpm storybook  # פיתוח רכיבים
```

## תהליך עבודת פיתוח

### פיתוח מונחה מפרט (Spec-Driven Development)

Lumina משתמשת ב-**Kiro-style AI-DLC** (מחזור חיי פיתוח AI):

```bash
# אתחול מפרט תכונה חדשה
/kiro:spec-init "תיאור תכונה"

# יצירת דרישות
/kiro:spec-requirements feature-name

# שלב עיצוב
/kiro:spec-design feature-name

# יצירת משימות
/kiro:spec-tasks feature-name

# יישום
/kiro:spec-impl feature-name

# בדיקת סטטוס
/kiro:spec-status feature-name
```

### איכות קוד

```bash
# לינטינג
pnpm lint
pnpm lint:fix

# בדיקת טיפוסים
pnpm type-check

# בדיקות
pnpm test
pnpm test:watch
pnpm test:coverage

# עיצוב
pnpm format
pnpm format:check

# רגרסיה ויזואלית (רכיבי UI)
pnpm loki:test
pnpm loki:update
```

## ארכיטקטורה

### עיצוב מונחה תחום (Domain-Driven Design)

הלקוח עוקב אחר עקרונות DDD:

```
domain/
├── services/          # לוגיקה עסקית (בלתי תלויה בפריימוורק)
│   ├── Service.ts
│   └── Service.spec.ts
├── hooks/            # שכבת אינטגרציה עם React
│   └── useService.ts
├── components/       # רכיבי הצגה
└── types/           # טיפוסי תחום
```

### מחסנית טכנולוגיה

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **Backend**: NestJS, Prisma, PostgreSQL, Redis
- **State**: Redux Toolkit, RTK Query
- **Testing**: Vitest, Playwright, Loki
- **Build**: Vite, esbuild, Rollup

## משימות נפוצות

### הוספת תלויות

```bash
# הוסף לחבילה ספציפית
pnpm --filter @lumina/client add package-name

# הוסף לשורש workspace
pnpm add -w package-name
```

### הרצת בדיקות

```bash
# בדיקות יחידה
pnpm test

# בדיקות E2E
pnpm test:e2e

# רגרסיה ויזואלית
pnpm loki:test
```

### פעולות מסד נתונים

```bash
cd courses

# Prisma Studio (GUI)
pnpm db:studio

# איפוס מסד נתונים
pnpm db:reset

# יצירת Prisma client
pnpm db:generate
```

### יצירת SDK

```bash
cd courses

# יצירת מפרט OpenAPI מ-NestJS
pnpm openapi:generate

# יצירת TypeScript SDK
pnpm sdk:generate

# עשה את שניהם
pnpm sdk:sync
```

## פיתוח חבילות

### פרסום ל-npm

חבילות תחת `@lumina-study` ניתן לפרסם:

```bash
# בנה חבילה
pnpm build

# הרץ שחרור (משתמש ב-release-it)
pnpm release patch   # 0.1.0 -> 0.1.1
pnpm release minor   # 0.1.0 -> 0.2.0
pnpm release major   # 0.1.0 -> 1.0.0
```

### פיתוח חבילה מקומית

השתמש בפרוטוקול workspace לפיתוח מקומי:

```json
{
  "dependencies": {
    "@lumina-study/blocks-graph": "workspace:*"
  }
}
```

## פתרון בעיות

### קונפליקטים בפורטים

```bash
# בדוק מה משתמש בפורט
lsof -i :3000

# הרוג תהליך
kill -9 <PID>
```

### בעיות pnpm

```bash
# נקה את מטמון pnpm
pnpm store prune

# התקן הכל מחדש
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### בעיות Docker

```bash
# הפעל מחדש קונטיינרים
pnpm docker:restart

# נקה והפעל מחדש
pnpm docker:clean
pnpm docker:up
```

## השלבים הבאים

תיעוד נוסף למפתחים יתווסף בקרוב על ארכיטקטורה, APIs ופרטי חבילות. לעת עתה, חקור את קוד המקור והתייחס ל-README של כל חבילה.

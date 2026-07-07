# Агаар — Утаанаас сэргийлэх систем

Иргэдэд утаа, агаарын бохирдлоос урьдчилан сэргийлэх мэдээ, зөвлөгөө, агаарын чанарын индексийг хүргэх вебсайт болон админ удирдлагын систем.

## Технологи

- **Frontend/Backend:** Next.js 16 (App Router)
- **Database:** SQLite (хөгжүүлэлт), PostgreSQL руу шилжих боломжтой
- **ORM:** Prisma 7
- **Auth:** NextAuth.js v5 (Credentials)
- **UI:** Tailwind CSS 4

## Эхлүүлэх

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run db:seed
npm run dev
```

Вебсайт: [http://localhost:3000](http://localhost:3000)  
Админ: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Анхны админ нэвтрэх:**
- Нэвтрэх нэр: `admin`
- Нууц үг: `admin123`

## Бүтэц

### Нийтийн хэсэг
- Нүүр хуудас (AQI, зөвлөмж, мэдээ, үйлчилгээ)
- Бидний тухай, Үйлчилгээ, Нээлттэй мэдээлэл
- Заавар зөвлөгөө, Мэдээ, Агаарын чанар
- Холбоо барих маягт, Хайлт

### Админ хэсэг
- Dashboard (статистик)
- Мэдээ CRUD
- Зөвлөгөө, AQI, холбоо барих мессеж харах
- Хэрэглэгч удирдах (Super Admin)

### Эрхийн түвшин
| Эрх | Боломж |
|-----|--------|
| Super Admin | Бүх зүйл + хэрэглэгч |
| Admin | Контент удирдах |
| Editor | Мэдээ, зөвлөгөө нэмэх/засах |

## Өгөгдлийн сан

`prisma/schema.prisma` файлд Users, News, Categories, AirQuality, Pages, ContactMessages болон Guidelines, Services, OpenInfo, ActivityLog, Settings хүснэгтүүд тодорхойлогдсон.

## Цаашид хөгжүүлэх

- [ ] AQI API автомат таталт
- [ ] Excel/CSV импорт
- [ ] Файл upload (зураг, PDF, DOCX)
- [ ] Push notification, SMS
- [ ] Газрын зураг дээр AQI харуулах
- [ ] PostgreSQL production deploy

## Аюулгүй байдал

Production орчинд:
1. `AUTH_SECRET` солих
2. Админ нууц үг солих
3. HTTPS идэвхжүүлэх
4. PostgreSQL ашиглах

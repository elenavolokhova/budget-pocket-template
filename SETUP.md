# Власний сайт — 20 хвилин

Це спосіб для тих, хто хоче вести бюджет удвох з різних телефонів із входом через Google. Простіші способи — у [README](README.md#три-способи-запустити).

Знадобляться акаунти Google (для Firebase і входу), GitHub і Vercel (можна увійти через GitHub). Усе безкоштовно.

## 1. Свій репозиторій
1. На сторінці шаблону натисніть **Use this template → Create a new repository**.
2. Назва будь-яка, наприклад `budget`. Видимість — **Private**.

## 2. Налаштування під себе — `config.js`
Відкрийте `config.js` у своєму репозиторії (олівець → редагувати) і змініть:
- `title` — назву;
- `people` — хто веде бюджет (`[]`, якщо ви самі);
- `allowances` — скільки на місяць на забаганки кожному і на спільні;
- `currencies`, `rateBase`, `rates` — валюти рахунків і стартові курси;
- `income`, `savings`, `cushion` — дохід, скільки відкладати, подушка;
- `categories` — свої категорії з ролями (звичайна / забаганка / фонд) і сумами.

Найпростіше — попросити Claude: промпт у [README](README.md#налаштувати-під-себе-з-допомогою-claude). Натисніть **Commit changes**.

## 3. Firebase — база і вхід
1. https://console.firebase.google.com → **Create a new Firebase project**. Gemini і Google Analytics можна вимкнути.
2. **Databases & Storage → Firestore → Create database** → Standard → регіон поруч із вами (наприклад `eur3`) → **production mode** → Create.
3. Firestore → вкладка **Rules** → вставте вміст `firestore.rules`, впишіть свої Gmail-адреси → **Publish**. Лише ці адреси зможуть відкрити дані.
4. **Security → Authentication → Get started → Google → Enable**, виберіть support email → Save.
5. Шестерня → **Project settings → Your apps → `</>`** (Web), назва будь-яка, Hosting не потрібен. Скопіюйте значення з `firebaseConfig` у `firebase-config.js` свого репозиторію → Commit.

## 4. Vercel — сайт
1. https://vercel.com/new → **Import** свій репозиторій. Framework Preset: **Other**, решту не чіпати → **Deploy**.
2. Vercel покаже адресу на кшталт `budget-xxx.vercel.app`.
3. Поверніться у Firebase: **Authentication → Settings → Authorized domains → Add domain** → впишіть цю адресу.

Відтепер кожна зміна в репозиторії за хвилину з’являється на сайті.

## 5. Перший запуск
1. Відкрийте сайт, увійдіть через Google.
2. Відкриється **Дані → Налаштування**: додайте рахунки з поточними залишками і курси валют → **Зберегти**.
3. На вкладці **Бюджет** перевірте суми — їх можна виправляти прямо там.
4. Телефон: Safari → «Поділитися» → **На екран «Додому»** (Android: Chrome → ⋮ → Додати на головний екран). Інші члени родини роблять те саме зі своїми Gmail із правил.

## Якщо вхід на iPhone не спрацьовує
Safari іноді блокує вхід через чужий домен `*.firebaseapp.com`, особливо в застосунку з екрана «Додому». Це лікується тим, що вхід іде через вашу власну адресу:
1. У `vercel.json` додайте (замініть `ваш-проєкт` на projectId із Firebase):
   ```json
   "rewrites": [
     { "source": "/__/auth/:path*", "destination": "https://ваш-проєкт.firebaseapp.com/__/auth/:path*" },
     { "source": "/__/firebase/:path*", "destination": "https://ваш-проєкт.firebaseapp.com/__/firebase/:path*" }
   ],
   ```
2. У `firebase-config.js` замініть `authDomain` на адресу сайту (`budget-xxx.vercel.app`).
3. https://console.cloud.google.com → виберіть проєкт → **APIs & Services → Credentials → Web client (auto created by Google Service)**:
   - Authorized JavaScript origins: `https://budget-xxx.vercel.app`
   - Authorized redirect URIs: `https://budget-xxx.vercel.app/__/auth/handler`
   → Save.

## Резервна копія
**Дані → Завантажити копію** — раз на місяць, файл зберігайте на Google Диску або в iCloud. З нього ж можна відновити все в новому проєкті.

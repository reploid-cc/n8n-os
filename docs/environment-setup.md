# Environment Setup Guide

## Tổng Quan

Hướng dẫn chi tiết thiết lập môi trường phát triển cho dự án n8n-os. Tuân thủ quy tắc quản lý environment variables trong `cursor_ai_rules.mdc`.

## 🚨 Quy Tắc Environment Variables

### Theo cursor_ai_rules.mdc:

1. **KHÔNG tự ý tạo hoặc sửa** file `.env.local`
2. **Chỉ cập nhật** `env.local.txt` (template file)
3. **Báo người dùng** để cập nhật `.env.local` chính thức
4. **Tạm dừng workflow** cho đến khi `.env.local` được cập nhật và xác nhận

### File Structure:

- `env.local.txt` - Template (commit được)
- `.env.local` - Actual config (không commit, user quản lý)

## 🛠️ Prerequisites

### System Requirements

- **Node.js**: 18.0+ (LTS recommended)
- **npm**: 9.0+ hoặc **yarn**: 1.22+
- **Git**: Latest version
- **OS**: Windows 10+, macOS 10.15+, Ubuntu 20.04+

### External Services

- **Firebase Project** - Cho authentication
- **n8n Instance** - Backend automation platform
- **PostgreSQL** - Database (managed by n8n)

## 📋 Step-by-Step Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd n8n-os
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Configuration

#### 3.1 Copy Template File

```bash
cp env.local.txt .env.local
```

#### 3.2 Configure Required Variables

Mở `.env.local` và cập nhật các giá trị sau:

##### A. Next.js Configuration

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

##### B. n8n Backend Integration

```bash
# URL của n8n instance (quan trọng nhất)
NEXT_PUBLIC_API_BASE_URL=http://localhost:5678

# Webhook base URL (thường giống API_BASE_URL)
N8N_WEBHOOK_BASE_URL=http://localhost:5678
```

##### C. Firebase Authentication

Lấy từ Firebase Console > Project Settings > General:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
```

##### D. Security Secrets

```bash
# Generate strong random strings
JWT_SECRET=your_jwt_secret_minimum_32_characters
CSRF_SECRET=your_csrf_secret_here
```

### 4. Firebase Setup

#### 4.1 Create Firebase Project

1. Đi đến [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Nhập project name: `n8n-os-[your-name]`
4. Enable Google Analytics (optional)
5. Create project

#### 4.2 Enable Authentication

1. Trong Firebase Console, đi đến Authentication
2. Click "Get started"
3. Trong tab "Sign-in method", enable:
   - Email/Password
   - Google (optional)

#### 4.3 Get Configuration

1. Đi đến Project Settings (gear icon)
2. Scroll down đến "Your apps"
3. Click "Add app" → Web app
4. Register app với nickname: `n8n-os-frontend`
5. Copy configuration values vào `.env.local`

### 5. n8n Backend Setup

#### 5.1 Local n8n Instance

```bash
# Using Docker (recommended)
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Or using npm
npm install n8n -g
n8n start
```

#### 5.2 Verify n8n Connection

```bash
# Test n8n is running
curl http://localhost:5678/healthz

# Should return: {"status":"ok"}
```

### 6. Development Server

```bash
# Start development server
npm run dev

# Or with yarn
yarn dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 🔧 Configuration Details

### Environment Variables Explained

#### Public Variables (NEXT*PUBLIC*\*)

- Được expose đến browser
- Có thể được user nhìn thấy
- Chỉ dùng cho non-sensitive data

#### Private Variables

- Chỉ available ở server-side
- Dùng cho secrets, API keys
- Không bao giờ expose đến browser

### Port Configuration

| Service    | Port | Purpose                    |
| ---------- | ---- | -------------------------- |
| Frontend   | 3000 | Next.js development server |
| n8n        | 5678 | Backend API và webhooks    |
| PostgreSQL | 5432 | Database (if local)        |
| Storybook  | 6006 | Component development      |

Chi tiết xem [docs/ports-urls.md](ports-urls.md)

## 🐳 Docker Setup (Optional)

### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NEXT_PUBLIC_API_BASE_URL=http://n8n:5678
    env_file:
      - .env.local
    depends_on:
      - n8n

  n8n:
    image: n8nio/n8n
    ports:
      - '5678:5678'
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n_os_db
      - DB_POSTGRESDB_USER=n8n_user
      - DB_POSTGRESDB_PASSWORD=n8n_password
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_DB=n8n_os_db
      - POSTGRES_USER=n8n_user
      - POSTGRES_PASSWORD=n8n_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Run with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ✅ Verification Checklist

### Environment Setup

- [ ] `.env.local` file created từ template
- [ ] Tất cả required variables đã được set
- [ ] Firebase project created và configured
- [ ] n8n instance running và accessible

### Development Server

- [ ] `npm run dev` chạy thành công
- [ ] Frontend accessible tại http://localhost:3000
- [ ] No console errors trong browser
- [ ] API connection đến n8n working

### Firebase Integration

- [ ] Firebase config variables correct
- [ ] Authentication methods enabled
- [ ] Test login/signup working

### n8n Integration

- [ ] n8n accessible tại configured URL
- [ ] Webhook endpoints responding
- [ ] Database connection working

## 🚨 Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

```bash
# Kill process using port
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

#### 2. Firebase Configuration Error

```bash
Error: Firebase configuration object is invalid
```

**Solution:**

- Verify all Firebase config values trong `.env.local`
- Check Firebase project settings
- Ensure authentication methods are enabled

#### 3. Cannot Connect to n8n

```bash
Error: connect ECONNREFUSED 127.0.0.1:5678
```

**Solution:**

- Check n8n is running: `curl http://localhost:5678/healthz`
- Verify `NEXT_PUBLIC_API_BASE_URL` trong `.env.local`
- Check firewall/network settings

#### 4. Environment Variables Not Loading

```bash
Error: process.env.NEXT_PUBLIC_API_BASE_URL is undefined
```

**Solution:**

- Restart development server
- Check variable names (case-sensitive)
- Ensure `.env.local` is in root directory

### Debug Commands

```bash
# Check environment variables
npm run env:check

# Test API connectivity
npm run test:api

# Validate Firebase config
npm run test:firebase

# Check all services
npm run health:check
```

## 📝 Environment Management Workflow

### Adding New Variables

1. **Update Template First**

   ```bash
   # Edit env.local.txt
   echo "NEW_VARIABLE=default_value" >> env.local.txt
   ```

2. **Document in This File**

   - Add to configuration section
   - Explain purpose và usage
   - Add to verification checklist

3. **Notify Team**
   - Update README.md
   - Add to deployment docs
   - Inform team members

### Production Deployment

1. **Create Production Environment File**

   ```bash
   cp env.local.txt .env.production
   ```

2. **Update Production Values**

   - Change URLs to production domains
   - Use production Firebase project
   - Set strong secrets
   - Disable debug flags

3. **Deploy with Environment**
   - Upload `.env.production` to server
   - Configure hosting platform environment variables
   - Test production configuration

## 🔒 Security Considerations

### Sensitive Data

- **Never commit** `.env.local` to git
- **Use strong secrets** for JWT_SECRET, CSRF_SECRET
- **Rotate secrets** regularly
- **Use HTTPS** in production

### Firebase Security

- **Enable App Check** for production
- **Configure security rules** for Firestore (if used)
- **Monitor authentication** for suspicious activity

### n8n Security

- **Use authentication** for n8n instance
- **Configure CORS** properly
- **Rate limit** webhook endpoints
- **Monitor logs** for abuse

---

**⚠️ QUAN TRỌNG**: Luôn tuân thủ quy tắc environment management trong `cursor_ai_rules.mdc`

**Last Updated**: December 2024  
**Next Review**: Before RFC-001 implementation

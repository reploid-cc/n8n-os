# Port & URL Configuration

## Tổng Quan

Tài liệu này định nghĩa tất cả ports và URLs được sử dụng trong dự án n8n-os. **QUAN TRỌNG**: File này phải được cập nhật mỗi khi thêm service mới hoặc thay đổi port để tránh conflicts.

## 🚨 Lưu Ý Quan Trọng

- **Luôn kiểm tra file này** trước khi thêm service mới
- **Cập nhật ngay lập tức** khi thay đổi port
- **Đồng bộ với Docker** nếu sử dụng containerization
- **Kiểm tra conflicts** với các service khác trên hệ thống

## 📊 Port Allocation Table

| Service                | Development Port | Production Port | Docker Port | Status      | Notes                 |
| ---------------------- | ---------------- | --------------- | ----------- | ----------- | --------------------- |
| **Frontend (Next.js)** | 3000             | 80/443          | 3000        | 🟢 Active   | Main application      |
| **n8n Backend**        | 5678             | 5678            | 5678        | 🟢 Active   | User managed          |
| **PostgreSQL**         | 5432             | 5432            | 5432        | 🟢 Active   | User managed          |
| **Redis (optional)**   | 6379             | 6379            | 6379        | 🟡 Optional | For rate limiting     |
| **Storybook**          | 6006             | -               | -           | 🟡 Dev only | Component development |
| **Jest Debug**         | 9229             | -               | -           | 🟡 Dev only | Testing debug         |

## 🌐 URL Configuration

### Development URLs

```bash
# Frontend Application
http://localhost:3000

# n8n Backend (User Managed)
http://localhost:5678

# Storybook (when running)
http://localhost:6006

# Database (local connection)
postgresql://localhost:5432/n8n_os_db
```

### Production URLs

```bash
# Frontend Application
https://your-domain.com

# n8n Backend (User Managed)
https://your-n8n-domain.com

# Database (production connection)
postgresql://your-db-host:5432/n8n_os_db
```

## 🐳 Docker Configuration

### docker-compose.yml Example

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NEXT_PUBLIC_API_BASE_URL=http://n8n:5678
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

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    command: redis-server --appendonly yes
```

### Docker Network Configuration

```bash
# Create custom network
docker network create n8n_os_network

# Services communicate via network
frontend -> http://n8n:5678
n8n -> postgresql://postgres:5432
```

## 🔗 API Endpoints Mapping

### Frontend Routes → Backend Endpoints

| Frontend Route           | Backend Endpoint             | Port | Method   | Purpose          |
| ------------------------ | ---------------------------- | ---- | -------- | ---------------- |
| `/`                      | `/api/homepage`              | 5678 | GET      | Homepage data    |
| `/workflows`             | `/api/workflows`             | 5678 | GET      | Workflow listing |
| `/workflows/[slug]`      | `/api/workflows/{slug}`      | 5678 | GET      | Workflow detail  |
| `/workflows/[slug]/demo` | `/api/workflows/{slug}/demo` | 5678 | POST     | Demo execution   |
| `/blog`                  | `/api/blogs`                 | 5678 | GET      | Blog listing     |
| `/blog/[slug]`           | `/api/blogs/{slug}`          | 5678 | GET      | Blog detail      |
| `/auth/login`            | `/api/auth/login`            | 5678 | POST     | Authentication   |
| `/profile`               | `/api/user/profile`          | 5678 | GET/POST | User profile     |

### Webhook Endpoints (n8n)

```bash
# Demo execution webhooks
POST http://localhost:5678/webhook/demo/{workflow-slug}

# User management webhooks
POST http://localhost:5678/webhook/user/create
POST http://localhost:5678/webhook/user/update

# Content management webhooks
GET http://localhost:5678/webhook/workflows/list
GET http://localhost:5678/webhook/blogs/list
```

## 🔧 Environment Variables

### Port-Related Variables

```bash
# Frontend port
PORT=3000

# API base URL (points to n8n)
NEXT_PUBLIC_API_BASE_URL=http://localhost:5678

# Database connection
DATABASE_URL=postgresql://localhost:5432/n8n_os_db

# Redis connection (optional)
REDIS_URL=redis://localhost:6379

# Docker-specific
DOCKER_APP_PORT=3000
DOCKER_N8N_PORT=5678
DOCKER_DB_PORT=5432
```

## 🚨 Conflict Prevention

### Common Port Conflicts

| Port | Common Conflicts                   | Solution                     |
| ---- | ---------------------------------- | ---------------------------- |
| 3000 | React apps, other Next.js projects | Use PORT=3001                |
| 5678 | n8n default, some dev servers      | Change n8n port to 5679      |
| 5432 | PostgreSQL default                 | Use different port like 5433 |
| 6379 | Redis default                      | Use port 6380                |

### Checking Port Availability

```bash
# Check if port is in use (Linux/Mac)
lsof -i :3000
netstat -tulpn | grep :3000

# Check if port is in use (Windows)
netstat -ano | findstr :3000
```

### Resolving Conflicts

```bash
# Kill process using port
kill -9 $(lsof -t -i:3000)

# Or change port in configuration
PORT=3001 npm run dev
```

## 🔄 Development Workflow

### Starting Services in Order

```bash
# 1. Start database (if local)
docker run -d -p 5432:5432 postgres:15

# 2. Start n8n backend
docker run -d -p 5678:5678 n8nio/n8n

# 3. Start frontend
npm run dev
```

### Health Checks

```bash
# Check frontend
curl http://localhost:3000/api/health

# Check n8n backend
curl http://localhost:5678/healthz

# Check database
pg_isready -h localhost -p 5432
```

## 📝 Maintenance

### Regular Tasks

1. **Weekly**: Review port allocation table
2. **Before new features**: Check for new port requirements
3. **Before deployment**: Verify production URLs
4. **After Docker updates**: Update docker-compose.yml

### Documentation Updates

Khi thêm service mới:

1. Cập nhật Port Allocation Table
2. Thêm vào docker-compose.yml example
3. Cập nhật environment variables
4. Thêm health check commands
5. Update conflict prevention section

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   Error: listen EADDRINUSE: address already in use :::3000
   ```

   **Solution**: Kill process or change port

2. **Cannot connect to backend**

   ```bash
   Error: connect ECONNREFUSED 127.0.0.1:5678
   ```

   **Solution**: Check n8n is running, verify URL

3. **Docker port conflicts**

   ```bash
   Error: port is already allocated
   ```

   **Solution**: Stop conflicting containers

4. **CORS errors**
   ```bash
   Error: CORS policy blocked
   ```
   **Solution**: Check API_BASE_URL matches n8n instance

### Debug Commands

```bash
# List all listening ports
netstat -tulpn

# Check Docker containers
docker ps

# Check Docker networks
docker network ls

# Test connectivity
telnet localhost 3000
curl -I http://localhost:5678
```

---

**⚠️ REMINDER**: Always update this file when making port/URL changes!

**Last Updated**: December 2024  
**Next Review**: Before RFC-001 implementation

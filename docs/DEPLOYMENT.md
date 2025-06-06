# 部署说明 - 解决 SPA 路由问题

## 问题描述
单页应用（SPA）在部署后，直接访问子路由（如 `/rewise/overview`）会出现 Nginx 404 错误，因为服务器无法找到对应的物理文件。

## 解决方案

### 1. Nginx 服务器配置（推荐）

将项目根目录下的 `nginx.conf` 文件内容添加到您的 Nginx 配置中：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为您的域名
    
    root /var/www/html;  # 替换为您的服务器根目录
    index index.html;
    
    # 处理 /rewise/ 路径下的 SPA 路由
    location /rewise/ {
        alias /var/www/html/rewise/;  # 替换为您的实际部署路径
        try_files $uri $uri/ /rewise/index.html;
        
        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

**配置步骤：**
1. 编辑 Nginx 配置文件：`sudo nano /etc/nginx/sites-available/default`
2. 添加上述配置内容
3. 测试配置：`sudo nginx -t`
4. 重启 Nginx：`sudo systemctl reload nginx`

### 2. Apache 服务器配置

如果使用 Apache 服务器，`dist` 目录中的 `.htaccess` 文件会自动处理路由回退。

确保 Apache 启用了 `mod_rewrite` 模块：
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### 3. 其他静态托管服务

对于 Netlify、Vercel 等服务，`dist` 目录中的 `_redirects` 文件会自动生效。

## 部署流程

1. **构建项目**：
   ```bash
   npm run build:prod
   ```

2. **上传文件**：
   将 `dist/` 目录下的所有文件上传到服务器的 `/rewise/` 目录

3. **配置服务器**：
   根据您的服务器类型应用相应的配置

4. **测试**：
   - 直接访问：`http://your-domain.com/rewise/`
   - 子路由访问：`http://your-domain.com/rewise/overview`
   - 刷新页面测试：在任意页面刷新浏览器

## 核心原理

当用户直接访问 `http://your-domain.com/rewise/overview` 时：

1. **没有配置时**：Nginx 尝试寻找 `/rewise/overview` 文件，找不到返回 404
2. **配置后**：Nginx 使用 `try_files` 指令，如果找不到文件就返回 `/rewise/index.html`
3. **React Router 接管**：前端路由系统解析 URL 并渲染正确的组件

这样就实现了：
- ✅ 直接访问任意路由都能正常工作
- ✅ 页面刷新不会出现 404 错误
- ✅ 前进后退按钮正常工作
- ✅ 分享链接直接可用 
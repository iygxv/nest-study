# build stage
FROM node:18 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]

# 通过 FROM 继承镜像的时候，给当前镜像指定一个名字，比如 build-stage。

# 然后第一个镜像执行 build。

# 之后再通过 FROM 继承 node 镜像创建一个新镜像。

# 通过 COPY --from-build-stage 从那个镜像内复制 /app/dist 的文件到当前镜像的 /app 下。

# 还要把 package.json 也复制过来，然后切到 /app 目录执行 npm install --production 只安装 dependencies 依赖

# 这个生产阶段的镜像就指定容器跑起来执行 node /app/main.js 就好了。

# 执行 docker build，打上 second 标签：
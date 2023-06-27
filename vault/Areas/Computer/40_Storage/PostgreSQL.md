---
created: 2024-04-22T20:39
modified: 2024-05-21T16:59
url:
  - https://www.postgresql.org/docs/current/
---

## 安装

[服务端](https://www.postgresql.org/download/)
- [EDB](https://www.enterprisedb.com/docs/supported-open-source/postgresql/)
    - 卸载: `open /Library/PostgreSQL/<version>/uninstall-postgresql.app`
- [Postgres.app – the easiest way to get started with PostgreSQL on the Mac](https://postgresapp.com/)
- `brew install postgresql@16`

[客户端](https://wiki.postgresql.org/wiki/PostgreSQL_Clients)
- [pgAdmin4](https://www.pgadmin.org/download/): 支持 arm64
- DBeaver
- [beekeeper-studio](https://github.com/beekeeper-studio/beekeeper-studio): 较简陋
- [GitHub - xo/usql: Universal command-line interface for SQL databases](https://github.com/xo/usql)

## 配置

- 添加用户
- 准备数据目录
- 创建数据库集簇 initdb -D (配置文件也在此目录)

## 命令

```
cct               gdalinfo          pg_amcheck        pg_waldump
clusterdb         gdallocationinfo  pg_archivecleanup pgbench
createdb          gdalmanage        pg_basebackup     pgsql2shp
createuser        gdalmdiminfo      pg_checksums      pgtopo_export
cs2cs             gdalmdimtranslate pg_config         pgtopo_import
dropdb            gdalsrsinfo       pg_controldata    postgres
dropuser          gdaltindex        pg_ctl            postmaster
ecpg              gdaltransform     pg_dump           proj
gdal-config       gdalwarp          pg_dumpall        projinfo
gdal_contour      geod              pg_isready        projsync
gdal_create       initdb            pg_receivewal     psql
gdal_grid         invgeod           pg_recvlogical    raster2pgsql
gdal_rasterize    invproj           pg_resetwal       reindexdb
gdal_translate    nearblack         pg_restore        shp2pgsql
gdal_viewshed     ogr2ogr           pg_rewind         vacuumdb
gdaladdo          ogrinfo           pg_test_fsync     vacuumlo
gdalbuildvrt      ogrlineref        pg_test_timing
gdaldem           ogrtindex         pg_upgrade
gdalenhance       oid2name          pg_verifybackup
```

```shell
# 切换用户
sudo -u postgres -i
# 执行 psql
sudo -u postgres psql
# 执行 pg_ctl
sudo -u postgres pg_ctl -D $PGDATA status/start/stop/restart/reload
```

## psql

```sql
select version();
select current_date();
```

## 对象

- 用户和角色
- 表空间
    - pg_default
    - pg_global
- 数据库
    - 模式
    - 表
    - 视图
    - 索引
    - 序列
    - 函数
    - 存储过程
    - 触发器、事件触发器

## 数据类型

standard SQL types: int, smallint, real, double precision, char(N), varchar(N), date, time, timestamp, and interval
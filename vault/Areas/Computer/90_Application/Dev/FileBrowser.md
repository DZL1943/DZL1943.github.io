## 原版

https://www.filebrowser.cn/

## Quantum

https://filebrowserquantum.com/en/docs/

https://github.com/gtsteffaniak/filebrowser/blob/main/frontend/public/config.generated.yaml
```yaml
server:
    port: 8080
    sources:
        - path: "d:\\Workspace"
            config:
                defaultEnabled: true  # should be added as a default source for new users?
        - path: "d:\\Private"
            config:
                denyByDefault: true
                private: true
        - path: "d:\\Home"
            config:
                defaultEnabled: true
                createUserDir: true
auth:
    password:
        enabled: true
        signup: true
userDefaults:
    darkMode: false
    locale: "zh"
    singleClick: true
    stickySidebar: false
    permissions:
        api: false                            # allow api access
        admin: false                          # allow admin access
        modify: false                         # allow modifying files
        share: false                          # allow sharing files
        realtime: false                       # allow realtime updates
        delete: false                         # allow deleting files
        create: false                         # allow creating or uploading files
        download: true                        # allow downloading files

```

[Access Control](https://filebrowserquantum.com/en/docs/access-control/rules/)

- User scope: User’s won’t see any info or access for a source without adding a source scope for the user. You must enable a user to have access to a source. This can be default for new users via defaultEnabled: true in source config, or by manually adding a source for a user via user management.
- DenyByDefault config: When a user has a source scope, by default all files are accessible unless denyByDefault: true is set. If denyByDefault is set, a user can still see metadata about the source, but won’t have access to browse or modify files.
- Access rules: The “user/group” access rule logic applies as mentioned below.
    - Allow
    - Deny
    - DenyAll

用户目录相关的两个关键配置
- defaultUserScope: This is the directory path that a user is given access to by default. This is also the parent directory path used if you enable `createUserDir`. For example if the source is `/`, and you configure `defaultUserScope: /users` and also enable `createUserDir`, then a user named `graham` will have a scope directory created at `/users/graham` and that will be their root directory. Defaults to root of index `/`. Should match folders under path. Used when `createUserDir` is `false`. This restricts where new users can access within the source. Include the leading slash.
- createUserDir: Create a user directory for each user under `defaultUserScope` + `/`+ `username`. Default: `false`. When enabled:
    - Creates `{defaultUserScope}/{username}` on user creation
    - Updates user scope to their personal directory
    - Directory persists even if user is deleted

> [!NOTE] 用户权限设计
> - 不(自动)创建用户目录: 例如仅限 Inbox 目录都有完整权限
> - 创建用户目录: 这将导致用户只能看到自己的目录?
>     - 在 source 外创建
>     - 在 source 中创建
>     - 在 source/Users 中创建
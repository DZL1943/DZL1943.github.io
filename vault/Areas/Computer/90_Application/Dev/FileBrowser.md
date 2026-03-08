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
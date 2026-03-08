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
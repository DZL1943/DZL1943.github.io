---
created: "2024-04-22 20:39"
modified: "2024-05-21 16:59"
---

[Ansible Documentation](https://docs.ansible.com/)

## inventory

## ansible 命令 (ad-hoc)

`ansible -i 'localhost,' all -m shell -a '{{cmd}} {{arg}}' -e "cmd=ls arg='-l ~'" -c local`

## playbook

### role

## module

- command (默认, 不支持管道)
- shell
- script
- copy
- file
- fetch
- gather_facts

## plugin
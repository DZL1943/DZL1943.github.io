---
created: 2026-01-06T20:53
modified: 2026-01-11T20:26
---

## v4

- A 0 + 7b + 22b | 1.0.0.0 ~ 127.255.255.255
- B 10 + 14b + 16b | 128.0.0.0 ~ 191.255.255.255
- C 110 + 21b + 8b | 192.0.0.0 ~ 223.255.255.255
- D 1110 + 28b | 224.0.0.0 ~ 239.255.255.255
- E 11110 | 240.0.0.0 ~ 247.255.255.255

![1761259187597-381450](<../../../Attachments/1761259187597-381450.png>)

特殊地址:
```text
Address Block       Present Use                Reference
------------------------------------------------------------------
0.0.0.0/8           "This" NetworkRFC 1122, Section 3.2.1.3
10.0.0.0/8          Private-Use NetworksRFC 1918
127.0.0.0/8         LoopbackRFC 1122, Section 3.2.1.3
169.254.0.0/16      Link LocalRFC 3927
172.16.0.0/12       Private-Use NetworksRFC 1918
192.0.0.0/24        IETF Protocol AssignmentsRFC 5736
192.0.2.0/24        TEST-NET-1RFC 5737
192.88.99.0/24      6to4 Relay AnycastRFC 3068
192.168.0.0/16      Private-Use NetworksRFC 1918
198.18.0.0/15       Network Interconnect Device Benchmark TestingRFC 2544
198.51.100.0/24     TEST-NET-2RFC 5737
203.0.113.0/24      TEST-NET-3RFC 5737
224.0.0.0/4         MulticastRFC 3171
240.0.0.0/4         Reserved for Future UseRFC 1112, Section 4
255.255.255.255/32  Limited BroadcastRFC 919, Section 7RFC 922, Section 7
```

## v6
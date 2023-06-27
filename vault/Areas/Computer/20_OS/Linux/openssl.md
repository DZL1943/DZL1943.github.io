---
created: 2025-11-03T20:39
modified: 2025-11-03T20:39
---

```
help:

Standard commands
asn1parse         ca                ciphers           cmp               
cms               configutl         crl               crl2pkcs7         
dgst              dhparam           dsa               dsaparam          
ec                ecparam           enc               engine            
errstr            fipsinstall       gendsa            genpkey           
genrsa            help              info              kdf               
list              mac               nseq              ocsp              
passwd            pkcs12            pkcs7             pkcs8             
pkey              pkeyparam         pkeyutl           prime             
rand              rehash            req               rsa               
rsautl            s_client          s_server          s_time            
sess_id           skeyutl           smime             speed             
spkac             srp               storeutl          ts                
verify            version           x509              

Message Digest commands (see the `dgst' command for more details)
blake2b512        blake2s256        md4               md5               
mdc2              rmd160            sha1              sha224            
sha256            sha3-224          sha3-256          sha3-384          
sha3-512          sha384            sha512            sha512-224        
sha512-256        shake128          shake256          sm3               

Cipher commands (see the `enc' command for more details)
aes-128-cbc       aes-128-ecb       aes-192-cbc       aes-192-ecb       
aes-256-cbc       aes-256-ecb       aria-128-cbc      aria-128-cfb      
aria-128-cfb1     aria-128-cfb8     aria-128-ctr      aria-128-ecb      
aria-128-ofb      aria-192-cbc      aria-192-cfb      aria-192-cfb1     
aria-192-cfb8     aria-192-ctr      aria-192-ecb      aria-192-ofb      
aria-256-cbc      aria-256-cfb      aria-256-cfb1     aria-256-cfb8     
aria-256-ctr      aria-256-ecb      aria-256-ofb      base64            
bf                bf-cbc            bf-cfb            bf-ecb            
bf-ofb            camellia-128-cbc  camellia-128-ecb  camellia-192-cbc  
camellia-192-ecb  camellia-256-cbc  camellia-256-ecb  cast              
cast-cbc          cast5-cbc         cast5-cfb         cast5-ecb         
cast5-ofb         des               des-cbc           des-cfb           
des-ecb           des-ede           des-ede-cbc       des-ede-cfb       
des-ede-ofb       des-ede3          des-ede3-cbc      des-ede3-cfb      
des-ede3-ofb      des-ofb           des3              desx              
idea              idea-cbc          idea-cfb          idea-ecb          
idea-ofb          rc2               rc2-40-cbc        rc2-64-cbc        
rc2-cbc           rc2-cfb           rc2-ecb           rc2-ofb           
rc4               rc4-40            seed              seed-cbc          
seed-cfb          seed-ecb          seed-ofb          sm4-cbc           
sm4-cfb           sm4-ctr           sm4-ecb           sm4-ofb           

```

## enc

```
Usage: enc [options]

General options:
 -help               Display this summary
 -list               List ciphers
 -ciphers            Alias for -list
 -e                  Encrypt
 -d                  Decrypt
 -p                  Print the iv/key
 -P                  Print the iv/key and exit
 -engine val         Use engine, possibly a hardware device

Input options:
 -in infile          Input file
 -k val              Passphrase
 -kfile infile       Read passphrase from file

Output options:
 -out outfile        Output file
 -pass val           Passphrase source
 -v                  Verbose output
 -a                  Base64 encode/decode, depending on encryption flag
 -base64             Same as option -a
 -A                  Used with -[base64|a] to specify base64 buffer as a single line

Encryption options:
 -nopad              Disable standard block padding
 -salt               Use salt in the KDF (default)
 -nosalt             Do not use salt in the KDF
 -debug              Print debug info
 -bufsize val        Buffer size
 -K val              Raw key, in hex
 -S val              Salt, in hex
 -iv val             IV in hex
 -md val             Use specified digest to create a key from the passphrase
 -iter +int          Specify the iteration count and force the use of PBKDF2
                     Default: 10000
 -pbkdf2             Use password-based key derivation function 2 (PBKDF2)
                     Use -iter to change the iteration count from 10000
 -none               Don't encrypt
 -saltlen +int       Specify the PBKDF2 salt length (in bytes)
                     Default: 16
 -skeyopt val        Key options as opt:value for opaque symmetric key handling
 -skeymgmt val       Symmetric key management name for opaque symmetric key handling
 -*                  Any supported cipher

Random state options:
 -rand val           Load the given file(s) into the random number generator
 -writerand outfile  Write random data to the specified file

Provider options:
 -provider-path val  Provider load path (must be before 'provider' argument if required)
 -provider val       Provider to load (can be specified multiple times)
 -provparam val      Set a provider key-value parameter
 -propquery val      Property query used when fetching algorithms
```

加密: `openssl enc -aes-256-cbc -salt -in filename -out filename.enc`

解密: `openssl enc -aes-256-cbc -d -in filename.enc -out filename`
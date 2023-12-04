# Palace Application

## Summary

Notes app application with markdown in cards

## How to Run
```bash
# install dependencies
npm i

# get submodule files
git submodule init
git submodule update

# generate certification
cd certs 
mkcert localhost

# run with webpack on https://localhost:4000/
npm run dev
```

to deploy dont forget to setup the private submodule
https://github.com/beeinger/vercel-private-submodule

# Architecture
Clean Architecture with shareable frontend core, these are the layers:
- domain (definition of entities and use cases)
- application (controllers: implementation of use cases)
- infrastructure (third technologies around the application (web, DBs, ...))
- presentation (views structure by atomic design)
 

## frontend
```
use cases --> entities
     
          A
          | 

 controllers <-  framework [controller <- UI -> css]
 
          |
          V
 API <- repository
```

## backend
```
use cases --> entities

     A
     |
 controllers
       
    A     A     A      A     A
    |     |     |      |     |
  REST   BD  GraphQl  CLI  Terceros
```
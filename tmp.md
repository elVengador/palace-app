// frontend
use cases --> entities
     
          A
          | 

 controllers <-  framework [controller <- UI -> css]
 
          |
          V
 API <- repository

// backend
use cases --> entities

     A
     |
 controllers
       
    A     A     A      A     A
    |     |     |      |     |
  REST   BD  GraphQl  CLI  Terceros

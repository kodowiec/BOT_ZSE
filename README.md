# BOT autoreader do dziennika Vulcan

Bot do działania potrzebuje jedynie zainstalowanego Node.JS oraz NPM, wszystko chodzi lokalnie na waszym kompie


# UWAGA
**Program używasz na własną odpowiedzialność, nie ponoszę odpowiedzialności za niepoprawne działanie programu lub za wszelkie szkody które mogą powstać w związku z jego użytkowaniem!**



# Instrukcja

> **Instalacja node.js: najlepiej wersji LTS** https://nodejs.org/en/download/

> **Sprawdzenie poprawności instalacji (instrukcja dla opornych)** https://phoenixnap.com/kb/install-node-js-npm-on-windows

> **Pobranie Bota z GIT-a git clonem lub po prostu .zip i wypakowanie** https://github.com/A4kon/BOT_ZSE

> **Instalacja zależności :** Komenda ``` npm i --s```
Powinniście zobaczyć wylistowane pliki CPP
[Imgur](https://imgur.com/QlCril0)
Jeśli tego nie macie
```npm rebulid``` i poszukajcie w necie dlaczego macie ten błąd, zazwyczaj brak pythona w ścieżce systemowej, ale mogą być też inne powody ;) Jeśli brakuje modułu ```npm i @wulkanowy/uonet-request-signer-node --s``` potem ```npm rebulid``` 
> **Opcjonalnie jeżeli chcecie żeby chodził w tle instalujecie pm2 (globalnie)**  ``` npm i pm2 --g```

> **W edzienniku dodajecie urządzenie mobilne, następnie w pliku .env uzupełniacie odpowiednie pola (symbol,pin,token)**

> **Pobieracie certyfikat** ``` node getCert.js```
> >**Teraz w edzienniku powinno pojawić się urządzenie SAMSUNG BOOMBOOM**
> >**Uzupełniacie dane w pliku .env zgodnie z tym co otrzymaliście w konsoli**

> **Pobieracie Usera** ``` node getAccount.js```
> **Uzupełniacie resztę danych w pliku .env zgodnie z tym co otrzymaliście w konsoli**>

> **Jak wszystko dobrze zrobiliście odpalacie bota** ```node app.js``` **i patrzycie czy nie wysypał błędu**

> **Ewentualnie prosicie kumpla, żeby wam odpowiedział na waszą wiadomość w edzienniku, tylko nie wiem czy dyrektor nie ma do nich podglądu XD**

> **W pliku .env dodatkowo możecie ustawić czas odświeżania, lub wybrać od którego jedynie nauczyciela mają się wyświetlać, zmieniamy ```wszyscy = nie``` i wpisujemy nazwisko imię/imie nazwisko (zależy jak wasza szkoła ustawiła)**

> **Jak chcecie żeby bot chodził nawet po zamknięciu konsoli to zapraszam do lektury dokumentacji pm2 bo nie będę pisać drugi raz tego samego** https://www.npmjs.com/package/pm2

# FAQ
**Pytania zadawajcie w formie ticketów na gicie :D, na wiadomości, że nie potrafie zainstalować itd będzie #SOA1 lub #SOA8 lub #SOA16** ( https://blog.piotrsajdak.pl/soa-standardowa-odpowiedz-administratora/)

###### Lib based on docs avaible here: https://gitlab.com/erupcja and https://www.npmjs.com/package/uonet-js
###### Jeżeli będziecie kopiować/modyfikować kod dajcie jakąś adnotację do mnie, dzięki

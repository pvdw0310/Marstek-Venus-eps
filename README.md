# Venus EPS Noodstroom / Emergency Power App

🇳🇱 Nederlands | [🇬🇧 English below](#-english)

\---

## 🇳🇱 Nederlands

> \*\*🚀 Direct starten:\*\* open \*\*\[https://pvdw0310.github.io/Marstek-Venus-eps/](https://pvdw0310.github.io/Marstek-Venus-eps/)\*\* in Chrome of Edge
> \*(let op de hoofdletter V — het adres is hoofdlettergevoelig)\*

Een lichtgewicht web-app (PWA) om het **backup-stopcontact (EPS)** van een **Marstek Venus E** thuisbatterij aan of uit te schakelen via **Bluetooth (BLE)** — rechtstreeks vanaf je Android-telefoon of PC, zonder de Marstek-app, zonder cloud en zonder internet.

Gemaakt voor het scenario waarvoor EPS bedoeld is: een stroomuitval. De app opent volledig offline (service worker), gebruikt een donker thema dat leesbaar is in het donker, en praat rechtstreeks via BLE met de batterij.

### Functies

* ✅ EPS/backup-uitgang **aan- en uitschakelen** met één tik
* 🔌 Grote stopcontact-knop met duidelijke statuskleuren (groen = levert stroom)
* 📴 **Werkt volledig offline** na de eerste keer openen (PWA met service worker)
* 🔍 Technische log met alle verzonden/ontvangen BLE-frames (hex)
* 🔋 Ondersteunt meerdere batterijen: bij het verbinden kies je welke Venus je bedient
* 🚫 Geen cloud, geen account, geen tracking — alles blijft lokaal

### Vereisten

* Marstek Venus E (getest op **Venus E 3.0**, firmware v148)
* **Chrome of Edge** op Android of PC — Firefox, Safari en iPhone ondersteunen geen Web Bluetooth
* De pagina moet via **HTTPS** geladen worden (GitHub Pages regelt dat automatisch)

### Installatie op Android

1. Open [https://pvdw0310.github.io/Marstek-Venus-eps/](https://pvdw0310.github.io/Marstek-Venus-eps/) in Chrome
2. Menu **⋮** → **App installeren** (of "Toevoegen aan startscherm")
3. Open de app één keer met internet zodat de offline-cache gevuld wordt
4. Klaar — de app opent voortaan ook zonder enige verbinding

### Gebruik

1. **Sluit de officiële Marstek app volledig af** — de batterij accepteert maar één BLE-verbinding tegelijk
2. Tik op **"Verbind met batterij"** en kies je Venus (naam begint met `MST\_`)
3. Tik **"EPS aan"** — het backup-stopcontact levert nu stroom
4. Het stopcontact-icoon zelf werkt daarna als toggle

### Hoe het werkt (protocol)

De app stuurt HM-protocol frames over BLE service `0xFF00` (write op `0xFF01`, notificaties op `0xFF02`):

```
EPS aan:  73 07 23 0F 01 59
EPS uit:  73 07 23 0F 00 58
          │  │  │  │  │  └─ XOR-checksum
          │  │  │  │  └──── payload (01=aan, 00=uit)
          │  │  │  └─────── command 0x0F (EPS)
          │  │  └────────── vast 0x23
          │  └───────────── lengte-byte
          └──────────────── header 0x73
```

### Waarschuwing

⚠️ Gebruik op eigen risico. Dit is een onofficiële tool op basis van reverse engineering en is niet verbonden aan of goedgekeurd door Marstek. Het inschakelen van EPS wijzigt het gedrag van je batterij (er wordt capaciteit gereserveerd voor noodstroom).

### Met dank aan

Het BLE-protocol is uitgezocht door [Remko Weijnen](https://github.com/rweijnen/marstek-venus-monitor) — zijn test tool is ook de aanrader om zelf met het protocol te experimenteren.

\---

## 🇬🇧 English

> \*\*🚀 Launch directly:\*\* open \*\*\[https://pvdw0310.github.io/Marstek-Venus-eps/](https://pvdw0310.github.io/Marstek-Venus-eps/)\*\* in Chrome or Edge
> \*(note the capital V — the address is case-sensitive)\*

A lightweight web app (PWA) to switch the **backup outlet (EPS)** of a **Marstek Venus E** home battery on or off via **Bluetooth (BLE)** — straight from your Android phone or PC, without the Marstek app, without cloud, and without internet.

Built for the exact scenario EPS exists for: a power outage. The app opens fully offline (service worker), uses a dark theme that's readable in the dark, and talks to the battery directly over BLE.

### Features

* ✅ Switch the EPS/backup output **on and off** with one tap
* 🔌 Large socket-shaped button with clear status colors (green = supplying power)
* 📴 **Works fully offline** after the first visit (PWA with service worker)
* 🔍 Technical log showing all sent/received BLE frames (hex)
* 🔋 Multiple batteries supported: pick which Venus to control when connecting
* 🚫 No cloud, no account, no tracking — everything stays local

### Requirements

* Marstek Venus E (tested on **Venus E 3.0**, firmware v148)
* **Chrome or Edge** on Android or PC — Firefox, Safari, and iPhone do not support Web Bluetooth
* The page must be served over **HTTPS** (GitHub Pages handles this automatically)

### Install on Android

1. Open [https://pvdw0310.github.io/Marstek-Venus-eps/](https://pvdw0310.github.io/Marstek-Venus-eps/) in Chrome
2. Menu **⋮** → **Install app** (or "Add to home screen")
3. Open the app once while online so the offline cache gets populated
4. Done — the app now opens without any connection at all

### Usage

1. **Fully close the official Marstek app** — the battery accepts only one BLE connection at a time
2. Tap **"Verbind met batterij"** (Connect) and pick your Venus (name starts with `MST\_`)
3. Tap **"EPS aan"** (EPS on) — the backup outlet now supplies power
4. The socket icon itself acts as a toggle from then on

### How it works (protocol)

The app sends HM-protocol frames over BLE service `0xFF00` (write on `0xFF01`, notifications on `0xFF02`):

```
EPS on:   73 07 23 0F 01 59
EPS off:  73 07 23 0F 00 58
          │  │  │  │  │  └─ XOR checksum
          │  │  │  │  └──── payload (01=on, 00=off)
          │  │  │  └─────── command 0x0F (EPS)
          │  │  └────────── fixed 0x23
          │  └───────────── length byte
          └──────────────── header 0x73
```

### Disclaimer

⚠️ Use at your own risk. This is an unofficial tool based on reverse engineering and is not affiliated with or endorsed by Marstek. Enabling EPS changes your battery's behavior (capacity is reserved for emergency power).

### Credits

The BLE protocol was reverse engineered by [Remko Weijnen](https://github.com/rweijnen/marstek-venus-monitor) — his test tool is also the recommended way to experiment with the protocol yourself.


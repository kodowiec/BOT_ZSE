require('dotenv').config()
const got_1 = require("got");
const { v4: uuidv4 } = require('uuid')
const date_fns_1 = require("date-fns");
const time = (plus = 0) => date_fns_1.getUnixTime(new Date()) + plus;
const dateString = (date) => date_fns_1.format(date, 'yyyy-MM-dd');
const uonet_request_signer_node_1 = require("@wulkanowy/uonet-request-signer-node");
const credentials = {
  symbol:process.env.symbol,
  pin:process.env.pin,
  token:process.env.token
}
const AdresBazowyRestApi= process.env.AdresBazowyRestApi
const CertyfikatPfx = process.env.CertyfikatPfx
const CertyfikatKlucz = process.env.CertyfikatKlucz
const JednostkaSprawozdawczaSymbol = process.env.JednostkaSprawozdawczaSymbol
const DATA = {
  CertyfikatKlucz: process.env.CertyfikatKlucz,
  CertyfikatKluczSformatowanyTekst: process.env.CertyfikatKluczSformatowanyTekst,
  CertyfikatDataUtworzenia: process.env.CertyfikatDataUtworzenia,
  CertyfikatDataUtworzeniaSformatowanyTekst: process.env.CertyfikatDataUtworzeniaSformatowanyTekst,
  CertyfikatPfx: process.env.CertyfikatPfx,
  GrupaKlientow: process.env.GrupaKlientow,
  AdresBazowyRestApi: process.env.AdresBazowyRestApi,
  UzytkownikLogin: process.env.UzytkownikLogin,
  UzytkownikNazwa: process.env.UzytkownikNazwa,
  TypKonta: null
}
const LoginId = process.env.LoginId;
const IdUczen = process.env.IdUczen;
const IdOkresKlasyfikacyjny = process.env.IdOkresKlasyfikacyjny;
const settingWszyscy = process.env.wszyscyNauczyciele;
const settingNauczyciel = process.env.wybranyNauczyciel;
const settingOdswiezanie = process.env.czasOdswiezania;
let DataPoczatkowa = 1577836800;
let DataKoncowa = '';
let WiadomoscId = '';
const asyncIntervals = [];

const runAsyncInterval = async (cb, interval, intervalIndex) => {
  await cb();
  if (asyncIntervals[intervalIndex]) {
    setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval);
  }
};

const setAsyncInterval = (cb, interval) => {
  if (cb && typeof cb === "function") {
    const intervalIndex = asyncIntervals.length;
    asyncIntervals.push(true);
    runAsyncInterval(cb, interval, intervalIndex);
    return intervalIndex;
  } else {
    throw new Error('Callback must be a function');
  }
};

const clearAsyncInterval = (intervalIndex) => {
  if (asyncIntervals[intervalIndex]) {
    asyncIntervals[intervalIndex] = false;
  }
};
class ACCOUNT {
    constructor(data, students) {
        this.data = data;
        this.students = students.map(student => new PROFILE(student, this));
    }
    async basicRequest(method, data) {
        const path = `/mobile-api/Uczen.v3.UczenStart/${method}`;
        const body = JSON.stringify(Object.assign({}, {
            RemoteMobileTimeKey: time(),
            TimeKey: time(-1),
            RequestId: uuidv4(),
            RemoteMobileAppVersion: "18.4.1.388",
            RemoteMobileAppName: "VULCAN-Android-ModulUcznia",
        }, data));
        const headers = {
            RequestCertificateKey: CertyfikatKlucz,
            RequestSignatureValue: await uonet_request_signer_node_1.signContent("CE75EA598C7743AD9B0B7328DED85B06", CertyfikatPfx, body),
            'User-Agent': "MobileUserAgent",
            'Content-Type': "application/json; charset=UTF-8",
        };
        const request = await got_1.post(path, { body, headers, baseUrl: AdresBazowyRestApi });
        return JSON.parse(request.body).Data;
    }
    async reloadStudents() {
        this.students = (await this.basicRequest('ListaUczniow', {}))
            .map((student) => {
              new PROFILE(student, this);
            })
    }
    export() {
        return {
            account: this.data,
            students: this.students.map(stu => stu.export()),
        };
    }
}

class PROFILE {
    constructor(data, context) {
        this.data = data;
        this.context = context;
    }
    async basicRequest(method, data) {
        const path = `/${JednostkaSprawozdawczaSymbol}/mobile-api/Uczen.v3.Uczen/${method}`;
        const body = JSON.stringify(Object.assign({}, {
          RemoteMobileTimeKey: time(),
          TimeKey: time(-1),
          RequestId: uuidv4(),
          RemoteMobileAppVersion: "18.4.1.388",
          RemoteMobileAppName: "VULCAN-Android-ModulUcznia"
        }, data));
        const headers = {
            RequestCertificateKey: CertyfikatKlucz,
            RequestSignatureValue: await uonet_request_signer_node_1.signContent("CE75EA598C7743AD9B0B7328DED85B06", CertyfikatPfx, body),
            'User-Agent': "MobileUserAgent",
            'Content-Type': "application/json; charset=UTF-8",
        };
        const request = await got_1.post(path, { body, headers, baseUrl: AdresBazowyRestApi });
        return JSON.parse(request.body).Data;
    }
    async getMessages() {
        return this.basicRequest('WiadomosciOdebrane', {
            LoginId:LoginId,
            IdUczen: IdUczen,
            DataPoczatkowa: DataPoczatkowa,
            DataKoncowa: DataKoncowa,
        });
    }
    async updateStatus() {
        return this.basicRequest('ZmienStatusWiadomosci', {
          WiadomoscId: WiadomoscId,
          FolderWiadomosci: "Odebrane",
          Status: "Widoczna",
          LoginId: LoginId,
          IdUczen: IdUczen,
        });
    }
    async getGrades() {
        return this.basicRequest('Oceny', {
            IdOkresKlasyfikacyjny:IdOkresKlasyfikacyjny,
            IdUczen: IdUczen,
        });
    }
    export() {
        return this.data;
    }
}
async function BOT() {
      if (settingWszyscy == "nie") console.log(`Bot startuje. Nauczyciel brany pod uwagę: ${settingNauczyciel}`);
      else console.log(`Bot startuje. Uwzględnianie wszystkich nauczycieli`);
      const baseUrls = await got_1.get('https://komponenty.vulcan.net.pl/UonetPlusMobile/RoutingRules.txt');
      const [, baseUrl] = baseUrls.body.split('\n').map(line => line.replace('\r', '').split(','))
           .find(line => line[0] === credentials.token.substring(0, 3)) || [, 'http://api.fakelog.cf'];
      const headers = {
          RequestMobileType: 'RegisterDevice',
          'User-Agent': 'MobileUserAgent',
          'Content-Type': 'application/json',
      };
      const body = JSON.stringify({
          PIN: credentials.pin,
          TokenKey: credentials.token,
          AppVersion: '18.4.1.388',
          DeviceId: uuidv4(),
          DeviceName: `SAMSUNG#BOOMBOOM`,
          DeviceNameUser: '',
          DeviceDescription: '',
          DeviceSystemType: 'Android',
          DeviceSystemVersion: "6.0.1",
          RemoteMobileTimeKey: time(),
          TimeKey: time(-1),
          RequestId: uuidv4(),
          RemoteMobileAppVersion: '18.4.1.388',
          RemoteMobileAppName: 'VULCAN-Android-ModulUcznia',
      });
      const certRes = await got_1.post(`/${credentials.symbol}/mobile-api/Uczen.v3.UczenStart/Certyfikat`, { baseUrl, headers, body })
          .then((res) =>{
            JSON.parse(res.body).TokenCert
          });
          const account = new ACCOUNT(certRes, []);
          let x = await account.reloadStudents();
          const student = new PROFILE();
          let odswiezanie = 10;
          if(!isNaN(settingOdswiezanie)) odswiezanie = Number(settingOdswiezanie);
          setAsyncInterval(async () => {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            console.log(`[${dateTime}] Odświeżam`)
            DataKoncowa = Math.round((new Date()).getTime() / 1000);
            let y = await student.getMessages()
            y.forEach(async(item)=>{
              if(!item.DataPrzeczytania){
                if(settingWszyscy == "nie" && settingNauczyciel != null) {
                  if (item.Nadawca == settingNauczyciel) {
                    console.log(`Zmieniam status wiadomości od ${item.Nadawca} o tytule "${item.Tytul}", wysłana ${item.DataWyslania} o ${item.GodzinaWyslania}`)
                    WiadomoscId = item.WiadomoscId
                    let z = await student.updateStatus();
                    console.log(z)
                  } else console.log(`Nieprzeczytana wiadomość od ${item.Nadawca} o tytule "${item.Tytul}", wysłana ${item.DataWyslania} o ${item.GodzinaWyslania}, pomijam (ustawienie: ${settingNauczyciel})`);
                } else {
                  console.log(`Zmieniam status wiadomości od ${item.Nadawca} o tytule "${item.Tytul}", wysłana ${item.DataWyslania} o ${item.GodzinaWyslania}`)
                  WiadomoscId = item.WiadomoscId
                  let z = await student.updateStatus()
                  console.log(z)
                }
              }
            })
          }, 1000*60*odswiezanie);
}

BOT()

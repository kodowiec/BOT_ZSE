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
console.log(credentials)
async function install() {
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
              console.log(JSON.parse(res.body).TokenCert)
          });
}
install()

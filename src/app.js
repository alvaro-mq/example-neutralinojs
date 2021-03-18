import {AppLib} from './app-core/lib';
import { authenticator } from 'otplib';
import QRCodeStyling from 'qr-code-styling';
import './mycss.css';
import './mycss2.css';

let appLib = new AppLib();

let myapp = {
    getRemaining: () => {
        const remaining = authenticator.timeRemaining();
        document.getElementById('count').innerHTML =  `Actualizando en ${remaining} segundos`;
        document.getElementById('myBar').style.width = `${remaining * 100 / 30}%`;
    },
    setTotp: (secret) => {
        const token = authenticator.generate(secret);
        document.getElementById('otp').innerHTML = token;
    },
    setDate: () => {
        document.getElementById('date').innerHTML = new Date();
    },
    generateSecret: () => {
        const secret1 = authenticator.generateSecret();
        document.getElementById('secret').innerHTML = secret1;
        return secret1;
    },
    generateQr: (secret) => {
        document.getElementById('canvas').innerHTML = null;
        const qrCode = new QRCodeStyling({
            width: 300,
            height: 300,
            data: secret,
            // image: '',
            dotsOptions: {
                color: "#4267b2",
                type: "rounded"
            },
            backgroundOptions: {
                color: "#e9ebee",
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 20
            }
        });
        qrCode.append(document.getElementById('canvas'));
        // document.getElementById('canvas').innerHTML = qrCode;

    }
};
    

Neutralino.init({
    load: function() {
        let intervalCounter;
        // set date
        myapp.setDate();
        setInterval(() => {
          myapp.setDate();
        }, 1000);

        // button generate secret
        document.getElementById('generate-secret').onclick = function () {
            clearInterval(intervalCounter);
            const secret = myapp.generateSecret();
            myapp.generateQr(secret);
            myapp.setTotp(secret);
            myapp.getRemaining();
            intervalCounter = setInterval(() => {
                myapp.setTotp(secret);
                myapp.getRemaining();
            }, 1000);
        }
    },
    pingSuccessCallback : function() {

    },
    pingFailCallback : function() {

    }
});

function generate() {
    alert(authenticator.generateSecret());
};
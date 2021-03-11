import {AppLib} from './app-core/lib';
import { authenticator } from 'otplib';
import './mycss.css';
import './mycss2.css';

let appLib = new AppLib();

let myapp = {
    myfunction : function () { document.getElementById('info').innerHTML = NL_NAME + " is running on port " +
                    NL_PORT + " inside " + NL_OS + "<br/><br/>" + "<span>v" + NL_VERSION + "</span>"; }
};
    

Neutralino.init({
    load: function() {
        //alert(authenticator.generateSecret());
        document.getElementById('generate-secret').onclick = function () {
            const secret = authenticator.generateSecret();
            document.getElementById('secret').innerHTML = secret;
        }
        //myapp.myfunction();
        //appLib.showSettings();
    },
    pingSuccessCallback : function() {

    },
    pingFailCallback : function() {

    }
});

function generate() {
    alert(authenticator.generateSecret());
};
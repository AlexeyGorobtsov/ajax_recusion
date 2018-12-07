import './index.css';

class Form {
    constructor(form, button) {
        this.obj = {};
        this.form = document.querySelectorAll(form);
        this.button = document.querySelector(button);
        this.time = '';
        this.count = 0;
        this.start = true;
        this.str = {
            condition: true,
            arr: [],
        };
    }

    getObject(arr) {
        arr.forEach(item => {
            this.obj[item.id] = item.value.trim();
        });
        return this.obj;
    }

    timer() {
        if (this.start) {
            this.start = false;
            this.time = new Date();
            this.count = ++this.count;
        }
    }

    startTimer() {
        this.form.forEach(item => {
            item.addEventListener('change', () => {
                this.timer();
            });
        });
    }

    cleanObject(arr) {
        arr.forEach(item => {
            item.value = '';
        });
    }

    sendData() {
        return this.getObject(Array.from(this.form));
    }

    ajax(url, data) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if(this.readyState === 4 && this.status === 200) {
                //console.log()
            }
        };
        xhttp.open('POST', url, true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhttp.send(this.getNewStr(data));
    }

    getPars(obj, v, str = '') {
        if(this.str.condition) {
            this.str[`${JSON.stringify(obj)}`] ='';
        }
        if (this.str[`${JSON.stringify(obj)}`] === '') {
            str += `${v}=${obj[v]}`;
        } else {
            str = `${this.str[`${JSON.stringify(obj)}key`]}%5B${v}%5D=${obj[v]}`;
        }
        this.str.arr.push(str);
        console.log(this.str);
    }

    getNewStr(obj) {
        for (let v in obj) {
            if(typeof obj[v] === 'object') {
                this.str[`${JSON.stringify(obj[v])}`] = v;
                if(this.str.condition === true) {
                    this.str.condition = false;
                    this.str[`${JSON.stringify(obj[v])}key`] =
                        this.str[`${JSON.stringify(obj)}`]+v;
                } else {
                    this.str[`${JSON.stringify(obj[v])}key`] =
                        this.str[`${JSON.stringify(obj)}key`]+`%5B${v}%5D`;
                }
                this.getNewStr(obj[v]);
            } else {
                this.getPars(obj, v);
            }
        }
        return this.str.arr.join('&');
    }

    addHandler() {
        this.button.addEventListener('click', e => {
            e.preventDefault();
            this.start = true;
            this.data = {
                count: this.count,
                seconds: this.time.getSeconds(),
                data: this.sendData()
            };
            this.cleanObject(this.form);
            console.log(this.data);
            this.ajax('./server.php', {a: 1, b: {z: 1, x: {v:1, z : {t:1}}, c: 3}, z: 3});
            this.str = {
                condition: true,
                arr: [],
            };
        });
    }
}

const formPassport = new Form('form input', '#data-dc');
formPassport.addHandler();
formPassport.startTimer();
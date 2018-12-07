class Helpers {
    constructor() {
        this.helpers = {};
    }

    /**
     *
     * @param value
     * @returns {Array}
     */

    check(value) {
        return value ? value : [];
    }

    /**
     *
     * @param selector
     * @returns {NodeListOf<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>}
     */
    queryAll(selector) {
        return document.querySelectorAll(selector);
    }

    /**
     *
     * @param selector
     * @returns {*}
     */

    query(selector) {
        return this.check(document.querySelectorAll(selector)['0']);
    }

    /**
     * returns an object of all classes in DOM
     */

    static getAllClasses() {
        document.addEventListener('DOMContentLoaded', () => {
            const obj = {};
            const arr = [];
            document.querySelectorAll('*').forEach(item => {
                arr.push(item.classList);
            });
            arr.forEach(it => {
                obj[it] = `.${it}`;
            });
            document.write(JSON.stringify(obj));
            return obj;

        });

    }

    /**
     * returns an object of all id in DOM
     */

    static getAllId() {
        document.addEventListener('DOMContentLoaded', () => {
            const obj = {};
            const arr = [];
            document.querySelectorAll('*').forEach(item => {
                arr.push(item.id);
            });
            arr.forEach(it => {
                obj[it] = `#${it}`;
            });
            document.write(JSON.stringify(obj));
            return obj;
        });
    }

    /**
     * checks if the value is an element DOM
     * @param value
     * @param func
     * @return {*}
     */

    static checkNodeType(value, func) {
        if (value.nodeType === 1) {
            return func();
        }
    }

    /**
     * sets the active menu class depending on the scrollTop
     * @param selector (css selector class - makes scrollTop simple for every div that specifies this class)
     */

    scrollspy(selector) {

        const section = this.queryAll(selector);
        const sections = {};
        let i = 0;

        Array.prototype.forEach.call(section, e => {
            sections[e.id] = e.offsetTop;
        });

        window.onscroll = function () {
            const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

            for (i in sections) {
                if (sections[i] <= scrollPosition) {
                    document.querySelector('.active').setAttribute('class', ' ');
                    document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
                }
            }
        };

    }

    /**
     * smooth scrolling
     * @param menu (selector css) contains all menu links(example: '.inner-wrap-menu h2 a')
     * @param sections (selector css) all div with id menu links (example: '.section')
     */

    smoothScrolling(menu, sections) {
        const hrefArray = this.queryAll(menu);
        const elArray = this.queryAll(sections);

        /**
         * determines the location of the element on the page (Height)
         * @param el
         * @returns {number}
         */

        const offset = (el) => {
            const rect = el.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return rect.top + scrollTop;
        };

        /**
         * on each link puts scrollTop (Height)
         * @returns {void}
         */

        const getScroll = () => {
            for (let i = 0; i < elArray.length; i++) {
                if (elArray[i]) {
                    hrefArray[i].addEventListener('click', e => {
                        e.preventDefault();
                        window.scroll({
                            top: offset(elArray[i]),
                            behavior: 'smooth'
                        });
                    });
                }
            }
        };
        getScroll();
    }

    /**
     * empty the contents
     * @param el (element Dom)
     * @return {void}
     */

    deletingDomElement(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }
}

export default Helpers;
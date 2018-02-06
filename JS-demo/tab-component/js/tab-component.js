function nTab(ct){
    this.ct = ct;
    this.init();
    this.bind();
}
nTab.prototype = {
    init(){
        this.cliTab = this.ct.querySelectorAll('.tab_nav li');
        this.cliCont = this.ct.querySelectorAll('.tab_cont li');
    },
    bind(){
        this.cliTab.forEach((cTab) => {
            var _this = this;
            cTab.onclick = function(e){
                let target = e.target;
                let index = [].indexOf.call(_this.cliTab,target);
                _this.cliTab.forEach((li) => {
                    li.classList.remove('active');
                });
                target.classList.add('active');
                _this.cliCont.forEach(li => {
                    li.classList.remove('active');
                });
                _this.cliCont[index].classList.add('active');
            }
        });
    }
}
var tab = new nTab(document.querySelector('.tab'));
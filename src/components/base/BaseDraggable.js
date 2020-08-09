export default{
    props: ['width', 'height', 'ratiox', 'ratioy', 'max', 'sig', 'noinit'],
    data () {
        return{
            dragging: false,
            position: {x: 0, y: 0},
            offset: {x: 0, y: 0},
            uniqueID: 'element-' + Math.random().toString().split('.').join('') + '-' + Math.random().toString().split('.').join('') + '-' + Math.random().toString().split('.').join(''),
            componentPosition: {x: 0, y: 0},
            positionRatio: {x: 0, y: 0}
        }
    },
    methods: {
        initDrag: function (e) {
            this.calculateComponentPosition();
            const ofs = this.processMouseEvent(e);
            const targetPos = {x: e.currentTarget.getBoundingClientRect().left, y: e.currentTarget.getBoundingClientRect().top};
            this.$data.offset = {x: ofs.x - targetPos.x, y: ofs.y - targetPos.y};
            const pos = ofs;
            this.$data.position = this.processPosition(pos.x - this.$data.offset.x, pos.y - this.$data.offset.y);
        },
        processDrag: function (e) {
            const pos = this.processMouseEvent(e);
            this.$data.position = this.processPosition(pos.x - this.$data.offset.x, pos.y - this.$data.offset.y);
            this.$data.positionRatio = {x: this.width ? (this.$data.position.x - this.$data.componentPosition.x) / this.width : this.$data.position.x - this.$data.componentPosition.x, y: this.height ? (this.$data.position.y - this.$data.componentPosition.y) / this.height : this.$data.position.y - this.$data.componentPosition.y};
            const total = this.max ? this.max : 1;
            this.$emit('slider-moved', {x: this.$data.positionRatio.x * total, y: this.$data.positionRatio.y * total, sig: this.sig});
        },
        onDown: function (e) {
            // console.log('onDown start');
            this.$data.dragging = true;
            this.initDrag(e);
            // this.calculateComponentPosition();
            // const ofs = this.processMouseEvent(e);
            // const targetPos = {x: e.currentTarget.getBoundingClientRect().left, y: e.currentTarget.getBoundingClientRect().top};
            // this.$data.offset = {x: ofs.x - targetPos.x, y: ofs.y - targetPos.y};
            // const pos = ofs;
            // this.$data.position = this.processPosition(pos.x - this.$data.offset.x, pos.y - this.$data.offset.y);
            // console.log('onDown end');
        },
        onUp: function () {
            this.$data.dragging = false;
        },
        onMove: function (e) {
            if(this.$data.dragging){
                this.processDrag(e);   
            }
        },
        processPosition: function (x, y) {
            let xVal = x;
            let yVal = y;
            if(this.width){
                if(x < this.$data.componentPosition.x){
                    xVal = this.$data.componentPosition.x;
                }
                else if (x > this.width + this.$data.componentPosition.x){
                    xVal = this.width + this.$data.componentPosition.x;
                }
            }
            if(this.height){
                if(y < this.$data.componentPosition.y){
                    yVal = this.$data.componentPosition.y;
                }
                else if (y > this.height + this.$data.componentPosition.y){
                    yVal = this.height + this.$data.componentPosition.y;
                }
            }
            return {x: xVal, y: yVal};
        },
        processMouseEvent: function (e) {
            return {x: e.pageX, y: e.pageY};
        },
        calculateComponentPosition: function () {
            this.$data.componentPosition = {x: document.querySelector(`#${this.$data.uniqueID}`).getBoundingClientRect().left, y: document.querySelector(`#${this.$data.uniqueID}`).getBoundingClientRect().top};
        },
        refactorPosition: function (r, size) {
            console.log(this.max);
            const total = this.max ? this.max : 1;
            return size * (r / total);
        }
    },
    watch: {
        ratiox: function (){
            console.log('updated ratiox');
            this.$data.positionRatio.x = this.ratiox;
            this.$data.position.x = this.width ? this.refactorPosition(this.$data.positionRatio.x, this.width) + document.querySelector(`#${this.$data.uniqueID}`).getBoundingClientRect().left : this.$data.positionRatio.x;
        },
        ratioy: function(){
            this.$data.positionRatio.y = this.ratioy;
            this.$data.position.y = this.height ? this.refactorPosition(this.$data.positionRatio.y, this.height) + document.querySelector(`#${this.$data.uniqueID}`).getBoundingClientRect().top : this.$data.positionRatio.y;
        }
    },
    mounted: function () {
        setTimeout(() => {
            // const xPos = bounds.left+((this.ratiox/this.max)*this.width);
            const targetElement = document.querySelector(`div#${this.$data.uniqueID} > div:first-child`);
            const bounds = targetElement.getBoundingClientRect();
            console.log(this.sig, bounds.left+((this.ratiox/this.max)*this.width));
            this.initDrag({pageX: bounds.left, pageY: bounds.top, currentTarget: targetElement});
            this.processDrag({pageX: bounds.left+((this.ratiox/this.max)*this.width), pageY: bounds.top+((this.ratioy/this.max)*this.height), currentTarget: targetElement});
            this.$forceUpdate();
            // this.onUp();
        }, 10);
    }
}
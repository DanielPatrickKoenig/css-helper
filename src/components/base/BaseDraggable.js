export default{
    props: ['width', 'height', 'ratiox', 'ratioy', 'max', 'sig', 'noinit', 'disabled'],
    data () {
        return{
            dragging: false,
            mDragging: false,
            position: {x: 0, y: 0},
            offset: {x: 0, y: 0},
            uniqueID: 'element-' + Math.random().toString().split('.').join('') + '-' + Math.random().toString().split('.').join('') + '-' + Math.random().toString().split('.').join(''),
            componentPosition: {x: 0, y: 0},
            positionRatio: {x: 0, y: 0},
            dragged: false
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
            this.dispatchMoveEvent();
            // this.$emit('slider-moved', {x: this.$data.positionRatio.x * total, y: this.$data.positionRatio.y * total, sig: this.sig});
        },
        onDown: function (e) {
            // console.log('onDown start');
            e.preventDefault();
            if(!this.disabled){
                this.$data.dragging = true;
                this.$data.mDragging = !e.touches;
                this.initDrag(e);
            }
            // this.calculateComponentPosition();
            // const ofs = this.processMouseEvent(e);
            // const targetPos = {x: e.currentTarget.getBoundingClientRect().left, y: e.currentTarget.getBoundingClientRect().top};
            // this.$data.offset = {x: ofs.x - targetPos.x, y: ofs.y - targetPos.y};
            // const pos = ofs;
            // this.$data.position = this.processPosition(pos.x - this.$data.offset.x, pos.y - this.$data.offset.y);
            // console.log('onDown end');
        },
        dispatchMoveEvent: function () {
            const total = this.max ? this.max : 1;
            this.$emit('slider-moved', {x: this.$data.positionRatio.x * total, y: this.$data.positionRatio.y * total, sig: this.sig});
        },
        onUp: function () {
            this.$data.dragging = false;
            this.$data.mDragging = false;
        },
        onMove: function (e) {
            if(this.$data.dragging){
                this.$data.dragged = true;
                console.log('touch', e);
                e.preventDefault();
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
            return {x: e.touches ? e.touches[0].pageX : e.pageX, y: e.touches ? e.touches[0].pageY : e.pageY};
        },
        calculateComponentPosition: function () {
            this.$data.componentPosition = {x: document.querySelector(`#${this.$data.uniqueID}`).getBoundingClientRect().left, y: document.querySelector(`#${this.$data.uniqueID}`).getBoundingClientRect().top};
        },
        refactorPosition: function (r, size) {
            console.log(this.max);
            const total = this.max ? this.max : 1;
            return size * (r / total);
        },
        getComponentOffset: function () {
            return this.dragged ? document.querySelector(`#${this.$data.uniqueID}`).getBoundingClientRect() : {left: 0, top: 0};
        }
    },
    watch: {
        ratiox: function (){
            console.log('updated ratiox');
            this.$data.positionRatio.x = this.ratiox;
            this.$data.position.x = this.width ? this.refactorPosition(this.$data.positionRatio.x, this.width) + this.getComponentOffset().left : this.$data.positionRatio.x;
        },
        ratioy: function(){
            this.$data.positionRatio.y = this.ratioy;
            this.$data.position.y = this.height ? this.refactorPosition(this.$data.positionRatio.y, this.height) + this.getComponentOffset().top : this.$data.positionRatio.y;
        }
    }
}